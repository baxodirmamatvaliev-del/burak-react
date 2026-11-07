import { Box, Button, Container } from "@mui/material";
import { AccessTimeOutlined, CalendarMonthOutlined, EastOutlined, LocalPhoneOutlined, LocationOnOutlined } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
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
          <Button component={Link} to="/#introduction" className="clinic-tour" endIcon={<EastOutlined />}>
            치과 둘러보기
          </Button>
        </Container>
      </Box>
      <Box component="nav" className="clinic-quick-actions" aria-label="진료 바로가기">
        <Button component={Link} to="/booking" className="clinic-quick-booking">
          <CalendarMonthOutlined /><span>진료 예약</span>
        </Button>
        <Button component={Link} to="/#clinic-hours">
          <AccessTimeOutlined /><span>진료시간</span>
        </Button>
        <Button component={Link} to="/#contact">
          <LocalPhoneOutlined /><span>전화 문의</span>
        </Button>
        <Button component={Link} to="/#directions">
          <LocationOnOutlined /><span>오시는 길</span>
        </Button>
      </Box>
    </>
  );
}
