import React from 'react';
import '../css/app.css';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import { HomePage } from './screens/homePage';
import { ProductPage } from './screens/producsPage';
import { OrdersPage } from './screens/ordersPage';
import { UserPage } from './screens/userPage';

function App() {
  return(
    
     <div>
        <nav>
          <ul>
            <li>
              <Link to="/">HomePage</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/member-page">UsersPage</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/products">
            <ProductPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
            <Route path="/member-page">
            <UserPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>

  );
   
}




export default App;
