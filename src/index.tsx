import React from 'react';
import ReactDOM   from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter as Router,} from "react-router-dom";
import './css/index.css';
import ContextProvider from './app/context/ContextProvider';
import BasketProvider from './app/context/BasketContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <BasketProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
      </BasketProvider>
      </ContextProvider>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
