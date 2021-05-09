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
import Web3 from 'web3'
import PersonId from '../abis/PersonId.json'
import ExitToApp from '@material-ui/icons/ExitToApp';



export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])



    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
          logout()
            history.pushState('/login')
        } catch(error) {
            console.log(error)
            setError("Failed to log out")
        }
    }

    async function getData(){
      const userRef = db.collection('UserInfo')
      console.log(currentUser.email)
      const querySnap = await userRef.where('email', '==', 'ttt@ttt.com').get()
      let temp = []
      querySnap.forEach(doc => {
        temp.push(doc.data())
      })
      return temp
    }

  
    

    useEffect( () => {
      let list
      (async (list)=>{
        const userRef = db.collection('UserInfo')
      console.log(currentUser.email)
      const querySnap = await userRef.where('email', '==', currentUser.email).get()
      let temp = []
      querySnap.forEach(doc => {
        console.log(doc.data())
        temp.push(doc.data())
      })
      console.log(temp)
      setUserData(temp)
      })();      
      setLoading(false)
    }, [])

    if(loading || userData.length == 0){
      
      return(<div>
        Getting Data
      </div>)
    }
    console.log(userData)


    return (
      <>
        <Typography component="h1" variant="h5" className="MyProfile">
          My Profile
          {/* <br/>
          <strong> Email: </strong> {currentUser.email}
          <br/>
          <strong> Name: </strong> {userData[0]["firstName"] + ' ' + userData[0]["lastName"]}
          <br/>
          <strong> Address: </strong> {userData[0]["city"]+ ', ' + userData[0]["country"]}
          <br/>
          <strong> Date of Birth: </strong> {userData[0]["dob"]}
          <br/>
          <strong> Sex: </strong> {userData[0]["sex"]}
          <br/> */}
          <br/>
          <br/>
          <div className="card">
            <img src={PFP} className="profile"/>
            <h1>{userData[0]["firstName"] +" "+userData[0]["lastName"]}</h1>
            <p className="title">Crypto Identification</p>
            <p>{userData[0]["city"] + ", " + userData[0]["province"]}</p>
            <div className="infoField">
              <strong> Gender: </strong> Male
            </div>
            <div className="infoField">
              <strong> Date of Birth: </strong> {userData[0]["dob"]}
            </div>
            <div className="infoField">
              <strong> Address: </strong> {userData[0]["mailingAddress"]}
            </div>
            
            <div className="infoField">
              <strong> Phone Number: </strong> {userData[0]["phoneNumber"]}
            </div>
            <div className="infoField">
              <strong> Email: </strong> {currentUser.email}
            </div>
            <br/>
            
          </div>

        </Typography>
        {error && <Alert severity = "error"> {error} </Alert>}
        <br/>

        <Grid container justify="center">
            <Grid item>
            <Button
        variant="contained"
        color="secondary"
        className="MButton"
        startIcon={< ExitToApp/>}
        onClick={handleLogout}
        
      >
        Log Out
      </Button>
            </Grid>
        </Grid>
      </>
    )
}
