import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Apply from '../ApplicationProcess/Apply';
import Login from '../UserPages/Login';

export default function Body() {
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          {/* <Apply /> */}
          <Login />
        </Container>
      </React.Fragment>
    </div>
  );
}
