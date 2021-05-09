import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/button"
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import {useAuth} from "../contexts/AuthContext"
import {useHistory} from "react-router-dom"
import {db} from "../firebase"
import "./Styles/Dashboard.css"
import PFP from "./Images/pfp.jpg"


export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])


    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            history.pushState('/login')
        } catch(error) {
            console.log(error)
            setError("Failed to log out")
        }
    }

    async function getData(){
      const userRef = db.collection('UserInfo')
      console.log(currentUser.email)
      const querySnap = await userRef.where('email', '==', currentUser.email).get()
      let list = []
      querySnap.forEach(doc => {
        list.push(doc.data())
      })
      return list
    }

    

    useEffect( async () => {
      let list = await getData()
      console.log(list)
      setUserData(list)
      setLoading(false)
    }, [])

    if(loading){
      return(<div>
        Getting Data
      </div>)
    }
    console.log(userData)


    return (
      <>
        <Typography component="h1" variant="h5">
          My Profile
          <br/>
          <strong> Email: </strong> {currentUser.email}
          <br/>
          <strong> Name: </strong> {userData[0]["firstName"] + ' ' + userData[0]["lastName"]}
          <br/>
          <strong> Address: </strong> {userData[0]["city"]+ ', ' + userData[0]["country"]}
          <br/>
          <strong> Date of Birth: </strong> {userData[0]["dob"]}
          <br/>
          <strong> Sex: </strong> {userData[0]["sex"]}
          <br/>
          <div class="card">
            <img src={PFP} className="profile"/>
            <h1>John Doe</h1>
            <p class="title">Crypto Identification</p>
            <p>Harvard University</p>
            <div>
              <strong> Email: </strong> {currentUser.email}
            </div>
            
          </div>

        </Typography>
        {error && <Alert severity = "error"> {error} </Alert>}
        

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
