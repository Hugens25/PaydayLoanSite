import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: green[50],
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={AppTheme}>
        <Header />
        <Footer />
      </ThemeProvider>
      
    </div>
  );
}

export default App;
