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
import '../css/app.css';
import "../css/navbar.css";
import "../css/footer.css"; 
import  HelpPage from './screens/helpPage';
import Test from './screens/Test';
import { json } from 'stream/consumers';
import useBasket from './hooks/useBasket';

function App() {
const location = useLocation();
const { cartItems, onAdd , onRemove,onDelate, onDeleteAll} = useBasket();
  return (  
     <>
        {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems}
         onAdd ={onAdd}
         onRemove={onRemove}
         onDelate={onDelate} 
         onDeleteAll={onDeleteAll}
         /> // Props 
        ) : (
         <OtherNavbar cartItems={cartItems} 
          onAdd = {onAdd}
          onRemove={onRemove}
           onDelate={onDelate} 
           onDeleteAll={onDeleteAll}/>
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
      </>

  );
   
}




export default App;
