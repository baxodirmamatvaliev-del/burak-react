import React, { useState } from 'react';
import { Box, Button, Container, Stack, Typography, useStepContext } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import  HomePage  from './screens/homePage';
import  ProductPage  from './screens/producsPage';
import  OrdersPage  from './screens/ordersPage';
import  UserPage from './screens/userPage';
import  HomeNavbar  from './components/headers/HomeNavbar';
import  OtherNavbar  from './components/headers/OtherNavbar';
import  Footer  from './components/footer';
import  HelpPage from './screens/helpPage';
import Test from './screens/Test';
import { json } from 'stream/consumers';
import useBasket from './hooks/useBasket';
import '../css/app.css';
import "../css/navbar.css";
import "../css/footer.css"; 
import AuthenticationModal from './components/auth';

function App() {
const location = useLocation();
const { cartItems, onAdd , onRemove,onDelate, onDeleteAll} = useBasket();
        
const [signupOpen , setSignupOpen] = useState<boolean>(false);
const [loginOpen, setLoginOpen] = useState<boolean>(false);

/** HANDLARS **/

const handlerSigupClose= () => setSignupOpen(false);
const handlerLoginClose= () => setLoginOpen(false);

  return (  
     <>
        {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems}
         onAdd ={onAdd}
         onRemove={onRemove}
         onDelate={onDelate} 
         onDeleteAll={onDeleteAll}
         setSignupOpen={setSignupOpen}
         setLoginOpen={setLoginOpen}
         /> // Props 
        ) : (
         <OtherNavbar cartItems={cartItems} 
          onAdd = {onAdd}
          onRemove={onRemove}
           onDelate={onDelate} 
           onDeleteAll={onDeleteAll}
           setSignupOpen={setSignupOpen}
           setLoginOpen={setLoginOpen}
           />
        )}
        <Switch>
          <Route path="/products">
            <ProductPage onAdd ={onAdd} />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
            <Route path="/member-page">
            <UserPage />
          </Route>
           <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer/>
        <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handlerLoginClose}
        handleSignupClose={handlerSigupClose}
        />
      </>

  );
   
}




export default App;
