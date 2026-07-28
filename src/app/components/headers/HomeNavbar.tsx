import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelate: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
}

export  default  function HomeNavbar (props: HomeNavbarProps) {
   const { cartItems, onAdd, onRemove, onDelate, onDeleteAll,setSignupOpen ,setLoginOpen} = props;
 
    const authMember = null ;

    
    return (
        <div className="home-navbar">
  <Container className="navbar-container ">
    <Stack className="menu" >
      <Box>
        <NavLink to="/">
          <img className="brand-logo" src="/icons/burak.svg" />
        </NavLink>
      </Box>
      <Stack className="links">
        <Box className={"hover-line"} >
        <NavLink to="/" activeClassName={"underline"} >Home</NavLink>
      </Box>
         <Box className={"hover-line"} >
        <NavLink to="/products" activeClassName={"underline"} >products</NavLink>
      </Box> 
      {authMember ? ( 
         <Box className={"hover-line"} >
        <NavLink to="/orders" activeClassName={"underline"} >Orders</NavLink>
            </Box>
        ) : null}
    {authMember ? ( 
         <Box className={"hover-line"} >
        <NavLink to="/member-page" activeClassName={"underline"}>My page</NavLink>
            </Box>
        ) : null}
        <Box className={"hover-line"} >
        <NavLink to="/help" activeClassName={"underline"}>help</NavLink>
      </Box> 
      <Basket
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        onDelate={onDelate}
        onDeleteAll={onDeleteAll}
      />
      {!authMember ? (<Box><Button variant="contained" className="login-button" onClick={() => setLoginOpen(true)}
      >Login</Button>
      </Box>
    ) : (
    <img  className="user-avatar"
    src={"/icons/default-user.svg"}
     aria-haspopup ={"true"}
    />
    )}
      </Stack>
    </Stack>
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
);
}
