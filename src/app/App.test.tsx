import React from 'react';
import axios from 'axios';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { serverApi } from '../lib/config';
import App from './App';
import ContextProvider from './context/ContextProvider';

jest.mock('axios');
// Testda ikonalar paketining barcha fayllari o'rniga ishlatilganlarini yuklaydi.
jest.mock('@mui/icons-material', () => ({
  AccessTimeOutlined: require('@mui/icons-material/AccessTimeOutlined').default,
  CalendarMonthOutlined: require('@mui/icons-material/CalendarMonthOutlined').default,
  EastOutlined: require('@mui/icons-material/EastOutlined').default,
  LocalPhoneOutlined: require('@mui/icons-material/LocalPhoneOutlined').default,
  LocationOnOutlined: require('@mui/icons-material/LocationOnOutlined').default,
  MoreVert: require('@mui/icons-material/MoreVert').default,
  PersonOutline: require('@mui/icons-material/PersonOutline').default,
}));
jest.mock('../lib/sweetAlert', () => ({
  sweetErrorHandling: jest.fn(),
  sweetTopSuccessAlert: jest.fn(),
  sweetTopSmallSuccessAlert: jest.fn(),
}));
const api = axios as jest.Mocked<typeof axios>;
const member = {
  _id: 'patient-1', memberType: 'USER', memberNick: 'Clinic patient',
  memberPhone: '01000000000', memberImage: 'uploads/members/patient.png',
};
const treatment = { _id: 'treatment-1', treatmentName: 'Test treatment' };
const dentist = {
  _id: 'dentist-1', dentistName: 'Test dentist', dentistSpecialty: 'Dentistry',
  dentistIntro: 'Clinic profile', treatmentIds: [treatment._id],
};
const slot = {
  appointmentStart: '2099-01-02T00:00:00.000Z',
  appointmentEnd: '2099-01-02T00:30:00.000Z',
};
const appointment = { _id: 'appointment-1', ...slot, appointmentStatus: 'PENDING' };

function renderApp(path = '/', signedIn = false) {
  if (signedIn) {
    localStorage.setItem('memberData', JSON.stringify(member));
  }
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <ContextProvider><App /></ContextProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  window.scrollTo = jest.fn();
  api.get.mockImplementation(async (url) => {
    switch (url) {
      case `${serverApi}/treatment/all`: return { data: [treatment] };
      case `${serverApi}/dentist/all`: return { data: [dentist] };
      case `${serverApi}/appointment/all`: return { data: [appointment] };
      case `${serverApi}/appointment/availability`: return { data: [slot] };
      default: throw new Error(`Unexpected GET: ${url}`);
    }
  });
  api.post.mockImplementation(async (url) => {
    switch (url) {
      case `${serverApi}/member/login`: return { data: { member } };
      case `${serverApi}/appointment/create`: return { data: appointment };
      default: throw new Error(`Unexpected POST: ${url}`);
    }
  });
});

afterEach(() => {
  for (const [url] of [...api.get.mock.calls, ...api.post.mock.calls]) {
    expect(url).not.toMatch(/\/(products?|orders?)(\/|\?|$)|\/member\/(restaurant|top-users)/);
  }
  cleanup();
});

test('clinic home and navigation load without restaurant requests or menu entries', async () => {
  renderApp();
  expect(await screen.findByText('Test treatment')).toBeTruthy();
  expect(await screen.findByText('Test dentist')).toBeTruthy();
  expect(screen.getByRole('link', { name: '진료 안내' }).getAttribute('href')).toBe('/#treatments');
  expect(screen.getByRole('link', { name: '의료진 소개' }).getAttribute('href')).toBe('/#dentists');
  expect(screen.getAllByRole('link', { name: '진료 예약' }).length).toBeGreaterThan(0);
  fireEvent.click(screen.getByRole('button', { name: '더 보기' }));
  expect(screen.getByRole('menuitem', { name: '도움말' })).toBeTruthy();
  expect(screen.queryByText('상품 목록')).toBeNull();
  expect(screen.queryByText('주문 내역')).toBeNull();
  expect(document.querySelector('a[href^="/products"], a[href^="/orders"]')).toBeNull();
  expect(api.get).toHaveBeenCalledTimes(2);
});

test.each(['/products', '/products/old-food', '/orders'])(
  'old restaurant URL %s falls back without restaurant requests', async (path) => {
    renderApp(path);
    expect(await screen.findByText('Test dentist')).toBeTruthy();
    expect(api.get).toHaveBeenCalledTimes(2);
  }
);

test('My Page keeps profile images, settings and appointment history', async () => {
  renderApp('/member-page', true);
  expect(await screen.findByText('예약 대기')).toBeTruthy();
  expect(screen.getByText('Modify Member Details')).toBeTruthy();
  expect(screen.getByAltText('User avatar').getAttribute('src')).toBe(`${serverApi}/${member.memberImage}`);
  expect(api.get).toHaveBeenCalledWith(`${serverApi}/appointment/all`, {
    params: { page: 1, limit: 8 }, withCredentials: true,
  });
  expect(screen.getByRole('link', { name: '마이페이지' })).toBeTruthy();
});

test('guest booking retains the login prompt and does not request private history or slots', async () => {
  renderApp('/booking');
  fireEvent.click(screen.getByRole('button', { name: '로그인 후 예약' }));
  expect(await screen.findByText('Login Form')).toBeTruthy();
  await waitFor(() => expect(api.get).toHaveBeenCalledTimes(2));
  expect(api.post).not.toHaveBeenCalled();
});

test('login still uses the shared member service and opens My Page', async () => {
  renderApp();
  await screen.findByText('Test dentist');
  fireEvent.click(screen.getByRole('button', { name: '로그인' }));
  const modal = await screen.findByText('Login Form');
  const inputs = modal.parentElement!.querySelectorAll('input');
  fireEvent.change(inputs[0], { target: { value: 'Clinic patient' } });
  fireEvent.change(inputs[1], { target: { value: 'test-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Login', exact: true }));
  const profile = await screen.findByRole('link', { name: '마이페이지' });
  expect(api.post).toHaveBeenCalledWith(`${serverApi}/member/login`, {
    memberNick: 'Clinic patient', memberPassword: 'test-password',
  }, { withCredentials: true });
  fireEvent.click(profile);
  expect(await screen.findByText('예약 대기')).toBeTruthy();
});

test('signed-in booking loads slots and submits only the selected clinic appointment', async () => {
  renderApp('/booking', true);
  await screen.findByText('Test treatment');
  fireEvent.change(screen.getByLabelText(/진료과목/), { target: { value: treatment._id } });
  fireEvent.change(screen.getByLabelText(/의료진/), { target: { value: dentist._id } });
  fireEvent.change(screen.getByLabelText(/진료 날짜 \(한국 시간\)/), { target: { value: '2099-01-02' } });
  fireEvent.change(await screen.findByLabelText(/진료 시간 \(한국 시간\)/), {
    target: { value: slot.appointmentStart },
  });
  fireEvent.click(screen.getByRole('button', { name: '예약 신청', exact: true }));
  expect(await screen.findByText('예약 신청이 접수되었습니다.')).toBeTruthy();
  expect(api.get).toHaveBeenCalledWith(`${serverApi}/appointment/availability`, {
    params: { dentistId: dentist._id, treatmentId: treatment._id, date: '2099-01-02' },
  });
  expect(api.post).toHaveBeenCalledWith(`${serverApi}/appointment/create`, {
    dentistId: dentist._id, treatmentId: treatment._id, appointmentStart: slot.appointmentStart,
  }, { withCredentials: true });
});
