import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { SystemState } from "store/system/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    bar: {
      background:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(25,38,48,0))",
      boxShadow: "none",
      zIndex: 30000
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      "&:hover": {
        color: "#FFF"
      },
      fontFamily: '"Playfair Display", sans-serif',
      fontWeight: 700
    },
    link: {
      "&:hover": {
        color: "#FFF"
      },
      marginLeft: 10
    }
  })
);

export interface NavBarProps {
  loggedIn: boolean;
  updateSession: (newSession: SystemState) => void;
}

const NavBar: React.FC<NavBarProps> = ({ loggedIn, updateSession }) => {
  const classes = useStyles();

  async function logOut() {
    updateSession({
      loggedIn: false,
      session: "",
      firstName: "",
      lastName: ""
    });
  }

  if (loggedIn) {
    return (
      <div className={classes.root}>
        <AppBar className={classes.bar}>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
              color="inherit"
            >
              <span className="emphasis taj-font" style={{ fontSize: "20px" }}>
                &lt;&nbsp;
              </span>
              <span className="main-site-title">Vancity Tech</span>
              <span className="emphasis taj-font" style={{ fontSize: "20px" }}>
                {" "}
                /&gt;
              </span>
            </Typography>
            <Button
              component={Link}
              to="/subscriptions"
              color="inherit"
              className={classes.link}
            >
              <NotificationsActiveIcon />
            </Button>
            <Button
              component={Link}
              to="/submit"
              color="inherit"
              className={classes.link}
            >
              Submit
            </Button>
            <Button onClick={logOut} color="inherit" className={classes.link}>
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar className={classes.bar}>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
              color="inherit"
            >
              <span className="emphasis taj-font" style={{ fontSize: "20px" }}>
                &lt;&nbsp;
              </span>
              <span className="main-site-title">Vancity Tech</span>
              <span className="emphasis taj-font" style={{ fontSize: "20px" }}>
                {" "}
                /&gt;
              </span>
            </Typography>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              className={classes.link}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/login"
              color="secondary"
              variant="contained"
              className={classes.link}
            >
              Sign up
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default NavBar;
