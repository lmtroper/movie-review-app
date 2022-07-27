import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import NavBar from '../Navigation/index';


//Deployment mode instructions
const serverURL = "";//"http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3001"; //enable for deployed mode; 

const Review = () => {

  const [movies, setMovies] = React.useState("");
  const [userID, setUserID] = React.useState(1);  
  const [movieReviews, setMovieReviews] = React.useState([]);

  //States for movie, title, review, and rating
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [enteredTitle, setTitle] = React.useState("");
  const [enteredReview, setReview] = React.useState("");
  const [selectedRating, setRating] = React.useState("");

  React.useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    callApiGetMovies()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setMovies(parsed);
    })
  };

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";

    const response = await fetch(url, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const handleMovieSelection = (event) => {
    setSelectedMovie(event.target.value);
    setMovieError(false);
    setSuccessMsg(false);
  };

  const handleEnteredTitle = (event) => {
    setTitle(event.target.value);
    setTitleError(false);
    setSuccessMsg(false);
  };

  const handleEnteredReview = (event) => {
    setReview(event.target.value);
    setReviewError(false);
    setSuccessMsg(false);
  };

  const handleSelectedRating = (event) => {
    setRating(event.target.value);
    setRatingError(false);
    setSuccessMsg(false);
  };

  //States for error messages and success message
  const [movieError, setMovieError] = React.useState(false);
  const [titleError, setTitleError] = React.useState(false);
  const [reviewError, setReviewError] = React.useState(false);
  const [ratingError, setRatingError] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState(false);

  // Checks for valid inputs and submits new review
  const handleReviewSubmit = (event) => {
    let caughtError = false;
    if (selectedMovie === "") {
      setMovieError(true);
      caughtError = true;
    }
    if (enteredTitle === "") {
      setTitleError(true);
      caughtError = true;
    }
    if (enteredReview === "") {
      setReviewError(true);
      caughtError = true;
    }
    if (selectedRating === "") {
      setRatingError(true);
      caughtError = true;
    }

    if (!caughtError) {
      let review = {
        movie: selectedMovie,
        title: enteredTitle,
        review: enteredReview,
        rating: selectedRating,
      };

      //addReview();
      setMovieReviews([...movieReviews, review]);
      setSuccessMsg(true);

      //Reset all inputs
      setSelectedMovie("");
      setTitle("");
      setReview("");
      setRating("");
    }
  };

  const addReview = () => {
    callApiAddReview()
      .then(res => {
        var parsed = JSON.parse(res.express);     
    })
  }

  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: enteredTitle,
        review: enteredReview,
        rating: selectedRating,
        userID: userID,
        movie: selectedMovie,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      pl={5}
      style={{ minHeight: "100%", marginBottom:'100px' }}
    >
    <NavBar 
    pages = {[['Home','/'], ['Search','search'], ['Movie Trailers','movieTrailers']]} />
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
        <Box pt={3} pl={5}>
          <Typography variant={"h3"} style={{fontWeight:'200'}}>
            <>Review a Movie</>
          </Typography>
          {movieError ? (
            <Typography style={{ color: "rgb(255,0,0)" }} variant={"body2"}>
              Please select a movie
            </Typography>
          ) : (
            ""
          )}
          <MovieSelection
            movieList={movies}
            value={selectedMovie}
            onChange={handleMovieSelection}
          />
          {titleError ? (
            <Typography style={{ color: "rgb(255,0,0)" }} variant={"body2"}>
              Please enter a title for the review
            </Typography>
          ) : (
            ""
          )}
          <ReviewTitle value={enteredTitle} onChange={handleEnteredTitle} />
          {reviewError ? (
            <Typography style={{ color: "rgb(255,0,0)" }} variant={"body2"}>
              Please enter a review
            </Typography>
          ) : (
            ""
          )}
          <ReviewBody value={enteredReview} onChange={handleEnteredReview} />
          {ratingError ? (
            <Typography style={{ color: "rgb(255,0,0)" }} variant={"body2"}>
              Please select a rating
            </Typography>
          ) : (
            ""
          )}
          <ReviewRating
            value={selectedRating}
            onChange={handleSelectedRating}
          />
          <Box mr={3}>
            <Button
              //color="#2C3333"
              variant="contained"
              style={{ minWidth: 175, backgroundColor:"#2C3333", color:'white' }}
              onClick={handleReviewSubmit}
            >
              <b>Submit</b>
            </Button>
          </Box>
          {successMsg ? (
            <Box mt={3} textAlign="center">
              <Typography style={{ maxWidth:'40%', padding:'5px', color: "black", fontSize:"12pt" , backgroundColor:"rgba(50, 205, 50, 0.35)", borderRadius:"5px"}} >
                Your review has been received!
              </Typography>
            </Box>
          ) : (
            ""
          )}
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
      {movieReviews.length > 0 ? (<>
        <Box pt={3} pl={4} pr={4}>
          <Typography variant={"h3"} style={{fontWeight:'200'}}>
            <>Submitted Reviews</>
          </Typography>
        </Box>
        <Box pl={2} pr={5}>
          {movieReviews.map((review) => (
            <Box pt={1} pb={2} pl={2}>
              <Card style={{backgroundColor:"#EBF5FB"}} sx={{ maxWidth: 500 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    gutterBottom
                    style={{color:'#003F87', fontSize:'16pt', fontWeight:'500'}}
                  >
                    {review.movie}
                  </Typography>
                  <Typography variant="h5" style={{color:"black"}}>
                    {review.title}
                  </Typography>
                  <br />
                  <Typography style={{color:"black"}} variant="body2">{review.review}</Typography>
                  <br />
                  <Typography sx={{ mb: 1.5 }} style={{color:"black"}}>
                    <b>Overall Rating:</b> {review.rating}/5
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box></>)
        : ""}
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
        {Object.values(props.movieList).map((value, index) => (
          <MenuItem key={value.id} value={value.name}>
            {value.name}
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
        minRows={7}
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

export default Review;
