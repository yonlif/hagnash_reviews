import Header from './components/Header.js';
import Footer from './components/Footer.js';
import AppRouter from './components/AppRouter.js';
import Navbar from './components/Navbar.js';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


import './App.css';

function App() {

  return (
    <div className="App">


      <div className="navbar">
        <Navbar />
      </div>

      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>

            <div dir="rtl" className="content">
              <AppRouter />
            </div>

        </ThemeProvider>
      </CacheProvider>

        <Footer />
    </div>

  );
}

export default App;
