import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import OtherNavbar from "./OtherNavbar";
import { useGlobals } from "../../hooks/useGlobals";

interface HomeNavbarProps {
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
   handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
   anchorEl: HTMLElement | null;
   handleCloseLogout: () => void;
   handleLogoutRequest: () => void;
}


// Bosh sahifa bannerini saqlab, umumiy sarlavhani chiqaradi.
export  default  function HomeNavbar (props: HomeNavbarProps) {
  const { setSignupOpen } = props;
  const {authMember} =useGlobals();

    return (
        <>
        <OtherNavbar {...props} />
        <div className="home-navbar">
  <Container className="navbar-container ">
    <Stack className={"header-frame"}>
        <Stack className={"detail"}>
            <Box className={"head-main-txt"}>
            World's Most Delicious Cousine
            </Box>
            <Box className={"wel-txt"} >The Choise, not just a choice</Box>
            <Box className={"service-txt"} > 23 hours service</Box>
            <Box className={"signup"}>
                {!authMember ? (
                  <Button variant={"contained"} className={"sigup-botton"} 
                  onClick={()=> setSignupOpen(true)}> 
                 SIGN UP</Button>): null}
            </Box>
        </Stack>
        <Box className={"logo-frame"}>
            <div className={"logo-img"}></div>
        </Box>       
    </Stack>
  </Container>
</div>
</>
);
}
