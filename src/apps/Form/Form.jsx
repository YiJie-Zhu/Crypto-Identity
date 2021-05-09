import React, {useRef, useState, useEffect} from 'react'
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import {useAuth} from '../contexts/AuthContext'
import './styles/Form.css'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const UseStyles = makeStyles((theme) => ({
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

export default function Form() {

  const classes = UseStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
    return (
      <Container component="main" maxWidth="m">
      <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Personal NFT Form
        </Typography>
        <Typography component="h2" variant="h5">
          Applicant's Information
        </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={5}>
          <Grid item xs={200} sm={100}>
            <TextField
              id="firstgivenname"
              label="First Given Name"
              variant="outlined"
              required
              fullWidth
              autofocus
            />  
        </Grid>
        <Grid item xs={200} sm={100}>
            <TextField
              id="othergivennames"
              label="Other Given Name"
              variant="outlined"
              fullWidth
              autofocus
            />  
        </Grid>
        <Grid item xs={200} sm={100}>
            <TextField
              id="familyname"
              label="Family Name"
              variant="outlined"
              required
              fullWidth
            />  
        </Grid>
        <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
        Month
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>January</MenuItem>
                    <MenuItem onClick={handleClose}>Feburary</MenuItem>
                    <MenuItem onClick={handleClose}>March</MenuItem>
                    <MenuItem onClick={handleClose}>April</MenuItem>
                    <MenuItem onClick={handleClose}>May</MenuItem>
                    <MenuItem onClick={handleClose}>June</MenuItem>
                    <MenuItem onClick={handleClose}>July</MenuItem>
                    <MenuItem onClick={handleClose}>August</MenuItem>
                    <MenuItem onClick={handleClose}>September</MenuItem>
                    <MenuItem onClick={handleClose}>October</MenuItem>
                    <MenuItem onClick={handleClose}>November</MenuItem>
                    <MenuItem onClick={handleClose}>December</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      
      </Grid>
    </form>
    </div>
    </Container>
    );
}
