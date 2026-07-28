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
}

export  default  function HomeNavbar (props: HomeNavbarProps) {
   const { cartItems, onAdd, onRemove, onDelate, onDeleteAll } = props;
 
    const authMember = null ;

    const [count ,setCount] = useState<number>(0);
    const [value ,setvalue] = useState<boolean>(true);
    
    useEffect( () => {
        console.log("componentDidMount",count); // DATA olib kelamiz DB 에서,  useEffect doim bir martda ishga tushadi LEKIN [] GA malum bir qiymatni kiritsak osha qiymat ozgargan vaqt ishga tushaveradi.
         setCount(count +1)

     return () =>{
        console.log("componentWillUnmount");
     }

    }, [value]);

    /** HANDLERS **/
   const buttonHandler =() => {
      setvalue(!value)                      // qarama qarshi bolsin TRUE bolsa FOLSE , FOLSE bolsa TRUE 
   }

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
      {!authMember ? (<Box><Button variant="contained" className="login-button">Login</Button>
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
            <Box className={"service-txt"} >{count} hours service</Box>
            <Box className={"signup"}>
                {!authMember ? (
                  <Button variant={"contained"} className={"sigup-botton"} 
                  onClick={buttonHandler}> 
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
