import { Box, Container } from "@mui/material";
import React from "react";
import Dentists from "./Dentists";
import { Statistics } from "./Statistics";
import "../../../css/home.css"

export default function HomePage() {
  return  <div className={"homepage"}>
    <Container component="section" maxWidth={false} className="clinic-information" id="introduction" tabIndex={-1} aria-labelledby="clinic-introduction-title">
      <Box component="h2" id="clinic-introduction-title">치과 소개</Box>
      <Box component="p">서울온치과의 진료과목과 의료진, 진료 예약 정보를 확인하세요.</Box>
    </Container>
    <Statistics/>
    <Dentists/>
    <Container component="section" maxWidth={false} className="clinic-information" id="directions" tabIndex={-1} aria-labelledby="clinic-directions-title">
      <Box component="h2" id="clinic-directions-title">오시는 길</Box>
      <Box component="p">주소와 교통편은 추후 안내해 드리겠습니다.</Box>
    </Container>
    <Container component="section" maxWidth={false} className="clinic-information" id="contact" tabIndex={-1} aria-labelledby="clinic-contact-title">
      <Box component="h2" id="clinic-contact-title">전화 문의</Box>
      <Box component="p">전화번호는 추후 안내해 드리겠습니다.</Box>
    </Container>
  </div>
}
