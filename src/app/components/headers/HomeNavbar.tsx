import { Box, Button, Container } from "@mui/material";
import { AccessTimeOutlined, CalendarMonthOutlined, EastOutlined, LocalPhoneOutlined, LocationOnOutlined } from "@mui/icons-material";
import React from "react";
import OtherNavbar from "./OtherNavbar";

interface HomeNavbarProps {
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
   handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
   anchorEl: HTMLElement | null;
   handleCloseLogout: () => void;
   handleLogoutRequest: () => void;
}


// Umumiy sarlavhani saqlab, klinika banneri va tezkor amallarni ko‘rsatadi.
export default function HomeNavbar(props: HomeNavbarProps) {
  return (
    <>
      <OtherNavbar {...props} />
      <Box component="section" className="clinic-hero" aria-labelledby="clinic-hero-title">
        <Container maxWidth={false} className="clinic-hero-content">
          <Box component="h1" id="clinic-hero-title">우리 동네, 서울온치과</Box>
          <Box component="p">진료부터 예약까지 한눈에 확인하세요.</Box>
          <Button disabled className="clinic-tour" endIcon={<EastOutlined />} title="치과 소개 페이지 준비 중">
            치과 둘러보기
          </Button>
        </Container>
      </Box>
      <Box component="nav" className="clinic-quick-actions" aria-label="진료 바로가기">
        <Button disabled className="clinic-quick-booking" title="예약 페이지 준비 중">
          <CalendarMonthOutlined /><span>진료 예약</span>
        </Button>
        <Button disabled title="진료시간 확인 후 안내 예정">
          <AccessTimeOutlined /><span>진료시간</span>
        </Button>
        <Button disabled title="전화번호 확인 후 안내 예정">
          <LocalPhoneOutlined /><span>전화 문의</span>
        </Button>
        <Button disabled title="위치 확인 후 안내 예정">
          <LocationOnOutlined /><span>오시는 길</span>
        </Button>
      </Box>
    </>
  );
}
