import { Box, Button, Container, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, PersonOutline } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobals";

interface OtherNavbarProps {
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

// Barcha sahifalarda bir xil sarlavha va mavjud hisob amallarini ko‘rsatadi.
export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    anchorEl,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <Box component="header" className="clinic-header">
      <Container maxWidth={false} className="clinic-header-inner">
        <NavLink to="/" className="clinic-brand" aria-label="서울온치과 홈">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M24 10C17 3 7 5 6 15c-1 8 4 25 9 25 4 0 3-12 9-12s5 12 9 12c5 0 10-17 9-25C41 5 31 3 24 10Z" />
            <path d="m24 10 5 4" />
          </svg>
          <span>서울온치과</span>
        </NavLink>
        <Box component="nav" aria-label="주 메뉴" className="clinic-navigation">
          <Button disabled>치과 소개</Button>
          <Button disabled>진료 안내</Button>
          <Button disabled>의료진 소개</Button>
          <Button disabled>오시는 길</Button>
        </Box>
        <Box className="clinic-actions">
          <Button variant="contained" disabled className="clinic-booking">진료 예약</Button>
          {authMember ? (
            <IconButton component={NavLink} to="/member-page" aria-label="마이페이지" className="clinic-profile">
              <PersonOutline />
            </IconButton>
          ) : (
            <>
              <Button className="clinic-signup" onClick={() => setSignupOpen(true)}>회원가입</Button>
              <Button className="clinic-login" onClick={() => setLoginOpen(true)}>로그인</Button>
            </>
          )}
          <IconButton
            aria-label="더 보기"
            aria-haspopup="menu"
            aria-controls={anchorEl ? "clinic-account-menu" : undefined}
            aria-expanded={Boolean(anchorEl)}
            onClick={handleLogoutClick}
          >
            <MoreVert />
          </IconButton>
        </Box>
        <Menu id="clinic-account-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseLogout}>
          <MenuItem component={NavLink} to="/products" onClick={handleCloseLogout}>상품 목록</MenuItem>
          {authMember && <MenuItem component={NavLink} to="/orders" onClick={handleCloseLogout}>주문 내역</MenuItem>}
          <MenuItem component={NavLink} to="/help" onClick={handleCloseLogout}>도움말</MenuItem>
          <Box sx={{ px: 2 }}><Basket /></Box>
          {authMember && <MenuItem onClick={() => { handleCloseLogout(); handleLogoutRequest(); }}>로그아웃</MenuItem>}
        </Menu>
      </Container>
    </Box>
  );
}
