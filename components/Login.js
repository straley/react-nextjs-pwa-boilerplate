/* @flow */

import * as React from 'react';
import { withStyles, withTheme } from 'material-ui/styles';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { GoogleLogin } from 'react-google-login';


const styles = theme => ({
  googleLogin: {
    display: "block",
    margin: "20px 10px 6px 10px",
    padding: 0,
    border: 0,
    textAlign: "center",
  },
  buttonFrame: {
    display: "block",
    width: 240,
    height: 50,
    border: "1px solid #0000",
    backgroundColor: "#4285f4",
    color: "#fff",
    margin: 0,
    padding: 0,
  },
  logoFrame: {
    margin: 0,
    display: "block",
    float: "left",
    padding: 15,
    width: 19,
    height: 19,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: 19,
    height: 19,
    display: "block",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: "48px",
    fontFamily: "Roboto,arial,sans-serif",
    fontWeight: 500,
    letterSpacing: "0.21px",
    marginLeft: 6,
    marginRight: 6,
    verticalAlign: "top",
    color: "#fff",
  }
});

type LoginProps = {
  googleOauthClientId?: string,
  classes:Object, 
  theme:Object,
  visible: ?boolean,
  onSuccess?: Function,
  onFailure?: Function,
};

class Login extends React.Component<LoginProps> {
  
  render() {
    const { classes, theme, onSuccess, onFailure, visible } = this.props;
    
    return (
      <Dialog open={visible}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to our site.  Please sign in.
            <GoogleLogin
              className={classes.googleLogin}
              clientId=""
              onSuccess={
                (response) => {
                  if (typeof onSuccess !== "function") {
                    return;
                  }
                  onSuccess(response);
                }
              }
              onFailure={
                (response) => {
                  if (typeof onFailure !== "function") {
                    return;
                  }
                  onFailure(response);
                }
              }
            >
              <div className={classes.buttonFrame}>
                <div className={classes.logoFrame}>
                  <div className={classes.logo}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
                      <g>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <span className={classes.buttonText}>Sign in with Google</span>
              </div>
  
            </GoogleLogin>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

withStyles(styles)

export default withTheme()(withStyles(styles)(Login));
