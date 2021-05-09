import React, { useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Alert from "@material-ui/lab/Alert";
import { storage } from "../firebase";
import Web3 from "web3";
import PersonId from "../abis/PersonId.json";
import { useAuth } from "../contexts/AuthContext";

import "./Form.css";

var CryptoJS = require("crypto-js");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const optionsgender = ["Male", "Female", "Non-Binary", "Other"];

const Form = (facialEmotionArr) => {
  const [firstName, setfirstName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [lastName, setLastName] = useState("");
  const [familyNameAB, setFamilyNameAB] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [image, setImage] = useState(null);
  const [URL, setURL] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [totalToken, setTotalToken] = useState(0);
  const { currentUser, logout } = useAuth();

  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setDisabled(false);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setURL(url);
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(URL);
    if (
      firstName === "" ||
      lastName === "" ||
      dob === "" ||
      //gender === "" ||
      ethnicity === "" ||
      age === "" ||
      city === "" ||
      province === "" ||
      country === "" ||
      URL === ""
    ) {
      setError("Required Field(s) are incomplete");
    } else {
      var data = [
        {
          id: totalToken,
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          gender: gender,
          age: age,
          city: city,
          province: province,
          country: country,
        },
      ];
      var cipherText = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        "my-secret-key@123"
      ).toString();
      console.log(cipherText);
      mint(firstName, cipherText);
      db.collection("UserInfo")
        .add({
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
          photoUrl: URL,
          facialEmotionArr: facialEmotionArr.facialEmotionArr,
          email: currentUser.email,
          // encrpt: cipherText
        })
        .then(() => {
          alert("Form has been submitted");
          history.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
      setfirstName("");
      setOtherName("");
      setLastName("");
      setFamilyNameAB("");
      setDOB("");
      setPhoneNumber("");
      setEthnicity("");
      setGender("");
      setAge("");
      setCity("");
      setProvince("");
      setCountry("");
      setMailingAddress("");
      setURL("");
    }
  };

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = PersonId.networks[networkId];
    if (networkData) {
      const abi = PersonId.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      const person = await contract.methods.names(1).call();
      const num = await contract.methods.tokenCounter.call();
      // for (var i = 1; i <= 5; i++){
      //   const person = await contract.methods.names(i - 1).call()
      //   this.setState({names: [...this.state.names, person]})
      // }
      const count = parseInt(num, 10);

      setTotalToken(count);
    } else {
      window.alert("contract not on this nework");
    }
  }

  function mint(person, data) {
    contract.methods.mint(person, data).send({ from: account });
    let num = contract.methods.tokenCounter.call();
    console.log("ran");
  }

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    })();
    (async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const networkData = PersonId.networks[networkId];
      if (networkData) {
        const abi = PersonId.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        setContract(contract);
        const person = await contract.methods.names(1).call();
        const num = await contract.methods.tokenCounter.call();
        // for (var i = 1; i <= 5; i++){
        //   const person = await contract.methods.names(i - 1).call()
        //   this.setState({names: [...this.state.names, person]})
        // }
        const count = parseInt(num, 10);
        console.log(count);
        setTotalToken(count);
      } else {
        window.alert("contract not on this nework");
      }
    })();
    // await loadWeb3()
    // await loadBlockchainData()
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Personal NFT Form
        </Typography>
        {error && <Alert severity="error"> {error} </Alert>}
        <div>&nbsp;</div>
        <input type="file" onChange={handleChange} />
        <img src={URL} className="profileImage" />
        <div>&nbsp;</div>
        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          {" "}
          Upload Photo
        </Button>
        <div>&nbsp;</div>
        <Typography component="h2" variant="h5" align="left">
          Applicant's Information
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                name="familyNameAB"
                label="Family Name at Birth"
                id="familyNameAB"
                fullWidth
                onChange={(e) => setFamilyNameAB(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                name="dob"
                label="Date of Birth"
                id="dob"
                fullWidth
                helperText="MM/DD/YYYY"
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
          <div>&nbsp;</div>
          <Typography component="h2" variant="h5" align="left">
            Gender and Ethnicity
          </Typography>
          <div>&nbsp;</div>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <List component="nav" aria-label="gender">
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-label="Gender"
                  onClick={handleClickListItemGender}
                >
                  <ListItemText
                    primary="Gender"
                    secondary={optionsgender[selectedGender]}
                  />
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
          <Typography component="h2" variant="h5" align="left">
            Applicant Current and Birth Location
          </Typography>
          <div>&nbsp;</div>
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
              onSubmit={handleSubmit}
            >
              Submit Form
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Form);
