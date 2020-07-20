import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { SessionContext, getSessionCookie } from './session';

const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: green[50],
    },
  },
});

function App() {
  const [session, setSession] = useState(getSessionCookie());

  return (
    <SessionContext.Provider value={session}>
      <div className="App">
        <ThemeProvider theme={AppTheme}>
          <Header />
          <Footer />
        </ThemeProvider>
      </div>
    </SessionContext.Provider>
  );
}

export default App;
