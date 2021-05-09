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
import {withRouter} from "react-router-dom"


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
  }));

const ForgotPassword = () => {

    const classes = useStyles();
    // const firstnameRef = useRef()
    // const lastnameRef = useRef()
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for more instructions")
        } catch(error) {
            console.log(error)
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        {error && <Alert severity = "error"> {error} </Alert>}
        {message && <Alert severity = "success"> {error} </Alert>}
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {loading}
          >
            Reset Password
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login">
                Log in
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
    </Container>
      );
}

export default withRouter(ForgotPassword)