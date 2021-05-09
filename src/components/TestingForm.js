import React, {useState} from 'react'
import {db} from "../firebase"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom"
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

const TestingForm = ()  => {
    const [firstName, setfirstName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [lastName, setLastName] = useState("")
    const [familyNameAB, setFamilyNameAB] = useState("")
    const [dob, setDOB] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [sex, setSex] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [country, setCountry] = useState("")
    const [mailingAddress, setMailingAddress] = useState("")
    const history = useHistory()

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('UserInfo').add({
            firstName: firstName,
            otherName: otherName,
            lastName: lastName,
            familyNameAB: familyNameAB,
            dob: dob,
            phoneNumber: phoneNumber,
            sex: sex,
            gender: gender,
            age: age,
            city: city,
            province: province,
            country: country,
            mailingAddress: mailingAddress,
        })
        .then(() => {
            alert("Form has been submitted")
            history.push("/")
        })
        .catch(error => {
            alert(error.message)
        })
        setfirstName('')
        setOtherName('')
        setLastName('')
        setFamilyNameAB('')
        setDOB('')
        setPhoneNumber('')
        setSex('')
        setGender('')
        setAge('')
        setCity('')
        setProvince('')
        setCountry('')
        setMailingAddress('')
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate onSubmit = {handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    onChange={(e) => setfirstName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="otherName"
                    label="Other/Preferred Names"
                    id="otherName"
                    onChange={(e) => setOtherName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="familyNameAB"
                    label="Family Name at Birth"
                    id="familyNameAB"
                    onChange={(e) => setFamilyNameAB(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    id="dob"
                    onChange={(e) => setDOB(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    id="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="sex"
                    label="Sex"
                    id="sex"
                    onChange={(e) => setSex(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="gender"
                    label="Gender"
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
                    onChange={(e) => setAge(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    label="City of Birth"
                    id="city"
                    onChange={(e) => setCity(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="province"
                    label="Province/State of Birth"
                    id="province"
                    onChange={(e) => setProvince(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="country"
                    label="Country of Birth"
                    id="country"
                    onChange={(e) => setCountry(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="mailingAddress"
                    label="Mailing Address"
                    id="mailingAddress"
                    onChange={(e) => setMailingAddress(e.target.value)}
                />
                </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit = {handleSubmit}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
    )
}

export default withRouter(TestingForm)