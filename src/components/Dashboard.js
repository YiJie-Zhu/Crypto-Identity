import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/button"
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import {useAuth} from "../contexts/AuthContext"
import {useHistory} from "react-router-dom"


export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.pushState('/login')
        } catch(error) {
            console.log(error)
            setError("Failed to log out")
        }
    }

    return (
      <>
        <Typography component="h1" variant="h5">
          My Profile
          <br/>
          <strong> Email: </strong> {currentUser.email}
        </Typography>
        {error && <Alert severity = "error"> {error} </Alert>}
        
        <Grid container justify="center">
            <Grid item>
              <Link href="/update-profile">
                Update Profile
              </Link>
            </Grid>
          </Grid>

        <Grid container justify="center">
            <Grid item>
              <Button onClick = {handleLogout}>
                Log Out
              </Button>
            </Grid>
        </Grid>
      </>
    )
}
