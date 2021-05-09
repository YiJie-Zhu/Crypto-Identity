import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useAuth} from '../contexts/AuthContext'
import {useHistory} from "react-router-dom"
import {withRouter} from "react-router-dom"
import Logo from "./Images/logo.jpg"
import { ClassOutlined } from '@material-ui/icons';
import "./Styles/Login.css"

var CryptoJS = require("crypto-js");


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    logo: {
      height: 'auto',
      width: '390px',
      maxHeight: '600px',
      maxWidth: '600px'
    },
    
  }));

const Login = () => {

    const classes = useStyles();
    // const firstnameRef = useRef()
    // const lastnameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    let history = useHistory()

    const test = () => {
      var data = [{id: 1, firstName: "Jackie", lastName: "Zhu", address: "23 Champagne Crt", gender: "Male", age: 20}];
      var cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();
      console.log(cipherText)
      var bytes = CryptoJS.AES.decrypt(cipherText, 'my-secret-key@123');
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData);
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(error) {
            console.log(error)
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
      <div className="large">

      
        <Container component="main" maxWidth="xs" >
          <img src={Logo} alt="Text" className={classes.logo}></img>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        {error && <Alert severity = "error"> {error} </Alert>}
        <form className={classes.form} noValidate onSubmit = {handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                ref = {firstnameRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                ref = {lastnameRef}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef = {emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef = {passwordRef}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {loading}
          >
            Log In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/forgot-password">
                Forgot Password? 
              </Link>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Link href="/signup">
                Don't have an Account? 
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <div>
        <Button onClick={test}>Test</Button>
      </div> */}
    </Container>
    </div>
      );
}

export default withRouter(Login)