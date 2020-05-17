import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Apply from '../Apply';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Body() {
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Apply />
        </Container>
      </React.Fragment>
      <Copyright />
    </div>
  );
}
