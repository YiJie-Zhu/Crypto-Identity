import React, {useState, useRef, useEffect} from 'react'
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './Form.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
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

  const optionssex = [
    'Male',
    'Female',
  ];

  const optionsgender = [
    'Male',
    'Female',
    'Non-Binary', 
    'Other'
  ];

const TestingForm = ()  => {
    const [firstName, setfirstName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [lastName, setLastName] = useState("")
    const [familyNameAB, setFamilyNameAB] = useState("")
    const [dob, setDOB] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [ethnicity, setEthnicity] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [country, setCountry] = useState("")
    const [mailingAddress, setMailingAddress] = useState("")
    const history = useHistory()

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedGender, setSelectedGender] = React.useState(1);

    const handleClickListItemGender = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleGenderItemClick = (event, index) => {
      setSelectedGender(index);
      setAnchorEl(null);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('UserInfo').add({
            firstName: firstName,
            otherName: otherName,
            lastName: lastName,
            familyNameAB: familyNameAB,
            dob: dob,
            phoneNumber: phoneNumber,
            ethnicity: ethnicity,
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
        setEthnicity('')
        setGender('')
        setAge('')
        setCity('')
        setProvince('')
        setCountry('')
        setMailingAddress('')
    }

    return (
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            Personal NFT Form
          </Typography>
          <div>&nbsp;</div>
          <Typography component="h2" variant="h5" align = 'left'>
          Applicant's Information
        </Typography>
          <form className={classes.form} noValidate onSubmit = {handleSubmit}>
            <Grid container spacing={2}>
                <Grid item  xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    fullWidth
                    onChange={(e) => setfirstName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    name="otherName"
                    label="Other/Preferred Names"
                    id="otherName"
                    fullWidth
                    onChange={(e) => setOtherName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                />
                </Grid>
                <Grid item  xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    name="familyNameAB"
                    label="Family Name at Birth"
                    id="familyNameAB"
                    fullWidth
                    onChange={(e) => setFamilyNameAB(e.target.value)}
                />
                </Grid>
                <Grid item  xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    name="dob"
                    label="Date of Birth"
                    id="dob"
                    fullWidth
                    helperText='MM/DD/YYYY'
                    onChange={(e) => setDOB(e.target.value)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    name="age"
                    label="Age"
                    id="age"
                    fullWidth
                    onChange={(e) => setAge(e.target.value)}
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
                </Grid>
                <div>
              &nbsp;
              </div>
                <Typography component="h2" variant="h5" align = 'left'>
                  Gender and Ethnicity
                </Typography>
                <div>
              &nbsp;
              </div>
                <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <List component="nav" aria-label="gender">  
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-label="Gender"
                      onClick={handleClickListItemGender}
                    >
                      <ListItemText primary="Gender" secondary={optionsgender[selectedGender]} />
                    </ListItem>
                  </List>
                  <Menu
                  
                    id="gender-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {optionsgender.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedGender}
                        onClick={(event) => handleGenderItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item xs={12} sm={9}>
                <TextField
                    variant="outlined"
                    name="Ethnicity"
                    label="Ethnicity"
                    id="ethnicity"
                    fullWidth
                    onChange={(e) => setEthnicity(e.target.value)}
                />
                </Grid>
                </Grid>
                <Typography component="h2" variant="h5" align = 'left'>
                  Applicant Current and Birth Location
                </Typography>
                <div>
              &nbsp;
              </div>
                <Grid container spacing={4}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit = {handleSubmit}
          >
            Submit Form
          </Button>
          </Grid>
        </form>
      </div>
    </Container>
    )
}

export default withRouter(TestingForm)