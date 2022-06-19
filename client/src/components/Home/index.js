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
import MenuItem from "@mui/material/MenuItem";
import Box from "@material-ui/core/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormHelperText from '@mui/material/FormHelperText';

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

//const fetch = require("node-fetch");

const opacityValue = 0.9;

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
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
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

    const mainMessage = <Review />;

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

const movies = [
  "Raya and the Last Dragon",
  "Encanto",
  "Turning Red",
  "Soul",
  "Luca",
];

const Review = () => {
  const initialReviews = [
    {
      movie: "Turning Red",
      title: "First Pixar movie I've disliked",
      review:
        "I'm normally a huge fan of Pixar. There hasn't ever been one that I haven't enjoyed. The movie did not feel like Pixar, it felt like I was watching anime with CGI. The animation felt like a mix of Disney and cartoon network, and it lacked the magic that makes Pixar films special. There were a few spots that made me laugh and that I found endearing, but overall I wish I could have gotten my time back.",
      rating: "2",
    },
    {
      movie: "Encanto",
      title: "Magical, but not quite enchanting as it could have been",
      review:
        "Encanto is a creative movie featuring beautiful and vibrant animation. However, the story feels a little underdeveloped. While there are some magical and emotional moments, it seems as if they didn't know how to end the movie. The lack of a strong villain also makes this movie a little less compelling. Nevertheless, the music is fun, and we enjoyed watching Encanto together as a family.",
      rating: "4",
    },
  ];

  const [movieReviews, setMovieReviews] = React.useState(initialReviews);

  React.useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(movieReviews));
  }, [movieReviews]);

  //States for movie, title, review, and rating
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [enteredTitle, setTitle] = React.useState("");
  const [enteredReview, setReview] = React.useState("");
  const [selectedRating, setRating] = React.useState("");

  const handleMovieSelection = (event) => {
    setSelectedMovie(event.target.value);
    setMovieError("");
  };

  const handleEnteredTitle = (event) => {
    setTitle(event.target.value);
    setTitleError("");
  };

  const handleEnteredReview = (event) => {
    setReview(event.target.value);
    setReviewError("");
  };

  const handleSelectedRating = (event) => {
    setRating(event.target.value);
    setRatingError("");
  };

  //States for error messages and success message
  const [movieError, setMovieError] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [reviewError, setReviewError] = React.useState("");
  const [ratingError, setRatingError] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");

  // Checks for valid inputs and submits new review
  const handleReviewSubmit = (event) => {
    event.preventDefault();
    let error = false;
    if (selectedMovie === "") {
      setMovieError("Please select a movie");
      error = true;
    }
    if (enteredTitle === "") {
      setTitleError("Please enter a title for the review");
      error = true;
    }
    if (enteredReview === "") {
      setReviewError("Please enter a review");
      error = true;
    }
    if (selectedRating === "") {
      setRatingError("Please select a rating");
      error = true;
    }

    if (error === false) {
      let review = {
        movie: selectedMovie,
        title: enteredTitle,
        review: enteredReview,
        rating: selectedRating,
      };

      setMovieReviews([...movieReviews, review]);
      setSuccessMsg("Your review has been received.");
      setSelectedMovie("");
      setTitle("");
      setReview("");
      setRating("");
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      pl={5}
      style={{ minHeight: "110vh" }}
    >
      <Grid
        item
        container
        direction="column"
        xs={12}
        sm={12}
        md={6}
        xl={6}
        lg={6}
      >
        <Box pt={3} pl={3}>
          <Typography variant={"h3"}>
            <>Review a Movie</>
          </Typography>
          {movieError}
          <MovieSelection
            value={selectedMovie}
            onChange={handleMovieSelection}
          />
          {titleError}
          <ReviewTitle value={enteredTitle} onChange={handleEnteredTitle} />
          {reviewError}
          <ReviewBody value={enteredReview} onChange={handleEnteredReview} />
          {ratingError}
          <ReviewRating
            value={selectedRating}
            onChange={handleSelectedRating}
          />
          <Box mr={3}>
            <Button
              color="primary"
              variant="contained"
              style={{ minWidth: 175 }}
              onClick={handleReviewSubmit}
            >
              <b>Submit</b>
            </Button>
          </Box>
          {successMsg}
        </Box>
      </Grid>
      <Grid
        container
        item
        direction="column"
        xs={12}
        sm={10}
        md={6}
        xl={6}
        lg={6}
      >
        <Box pt={3} pl={3}>
          <Typography variant={"h3"}>
            <>Submitted Reviews</>
          </Typography>
        </Box>
        <Box>
          {movieReviews.map((review) => (
            <Box pt={1} pb={2} pl={2}>
              <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="secondary"
                    gutterBottom
                  >
                    {review.movie}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {review.title}
                  </Typography>
                  <br />
                  <Typography variant="body2">{review.review}</Typography>
                  <br />
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <b>Overall Rating:</b> {review.rating}/5
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

const MovieSelection = (props) => (
  <Box pt={1} pb={2} component="form">
    <FormControl sx={{ m: 1, minWidth: 120 }} style={{ minWidth: 200 }}>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={props.value}
        displayEmpty
        variant="outlined"
        onChange={props.onChange}
        style={{ color: "rgb(187,187,187)" }}
      >
        <MenuItem value="" disabled>
          Select a Movie
        </MenuItem>
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie}>
            {movie}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

const ReviewTitle = (props) => {
  return (
    <Box pb={2}>
      <form>
        <TextField
          id="outlined-basic"
          label="Add a review title"
          variant="outlined"
          style={{ minWidth: 400 }}
          value={props.value}
          onChange={props.onChange}
        />
      </form>
    </Box>
  );
};

const ReviewBody = (props) => {
  return (
    <Box pb={2} mr={3}>
      <TextField
        style={{ minWidth: 400 }}
        label="Enter a Movie Review"
        multiline
        minRows={8}
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
      />
    </Box>
  );
};

const ReviewRating = (props) => {
  return (
    <Box pt={1} pb={3}>
      <FormControl component="fieldset">
        <FormLabel id="movie-rating-group-label" component="legend">
          Movie Rating
        </FormLabel>
        <RadioGroup
          row
          value={props.value}
          onChange={props.onChange}
          name="movie-rating-group"
          aria-labelledby="movie-rating-group-label"
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="1"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="2"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="3"
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="4"
          />
          <FormControlLabel
            value="5"
            control={<Radio color="primary" />}
            label="5"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
