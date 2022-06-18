import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@material-ui/core/Box";

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

//const handleChange = (event) => {
//  setMovie(event.target.value);
//};

const movies = [
  { label: "Iron Man" },
  { label: "Captain America" },
  { label: "The Hulk" },
  { label: "Harry Potter" },
  { label: "Lord of the Rings" },
];

const [movieRating, checkMovieRating] = React.useState('');



const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = (theme) => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "0vh",
    marginLeft: theme.spacing(0),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
    };
  }

  componentDidMount() {
    //this.loadUserSettings();
  }

  loadUserSettings() {
    this.callApiLoadUserSettings().then((res) => {
      //console.log("loadUserSettings returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("loadUserSettings parsed: ", parsed[0].mode);
      this.setState({ mode: parsed[0].mode });
    });
  }

  /*callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }*/

  render() {
    const { classes } = this.props;

    const mainMessage = (
      <Grid
        container
        direction="row"
        justify="flex-start"
        //alignItems="flex-start"
        pl={5}
        style={{ minHeight: "110vh" }}
        className={classes.mainMessageContainer}
      >
        <Grid
          container
          item
          direction="column"
          xs={12}
          sm={6}
          md={6}
          xl={6}
          lg={6}
          style={{ border: "1px solid black" }}
        >
          <Box pt={3} pl={3}>
            <Typography
              variant={"h3"}
              className={classes.mainMessage}
              align="flex-start"
            >
              <>Review a Movie</>
            </Typography>
            <Box
              pt={1}
              pb={2}
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}
            >
              <MovieSelection />
            </Box>
            <Box pb={2}>
              <ReviewTitle />
            </Box>
            <Box pb={2} mr={3}>
              <ReviewBody />
            </Box>
            <Box pb={2}>
              <ReviewRating />
            </Box>
            <Box mr={3}>
              <Button fullWidth color="primary" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          item
          direction="column"
          xs={6}
          sm={6}
          md={6}
          xl={6}
          lg={6}
        >
          <Box pt={3} pl={3}>
            <Typography
              variant={"h3"}
              className={classes.mainMessage}
              align="flex-start"
            >
              <>Movie Reviews</>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper className={classes.paper}>{mainMessage}</Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

/*const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
*/

const MovieSelection = (props) => {
  return (
    <div>
      <TextField
        id="outlined-select-currency"
        select
        label="Select a movie"
        value={movies}
        variant="outlined"
        //onChange={handleChange}
      >
        {movies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const ReviewTitle = (props) => {
  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Add a review title"
          variant="outlined"
        />
      </form>
    </div>
  );
};

const ReviewBody = (props) => {
  return (
    <div>
      <TextField
        fullWidth
        label="Enter a Movie Review"
        multiline
        rows={8}
        variant="outlined"
      />
    </div>
  );
};

const ReviewRating = (props) => {
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Movie Rating</FormLabel>
        <RadioGroup row aria-label="movie-rating" name="movie-rating">
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
