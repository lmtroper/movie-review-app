import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import NavBar from '../Navigation/index';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import background from '../../images/le-cinema-1442829.jpeg';

const serverURL = "";

const SearchReview = () => {

  const [movieReviews, setMovieReviews] = React.useState([]);
  const [groupedReviews, setGroupedReviews] = React.useState({});
  const [movieSearchTerm, setMovieSearchTerm] = React.useState("");
  const [actorSearchTerm, setActorSearchTerm] = React.useState("");
  const [directorSearchTerm, setDirectorSearchTerm] = React.useState("");

  const handleReviewSearch = () => {
    if (movieSearchTerm != '' || actorSearchTerm != '' || directorSearchTerm != ''){
      callApiFindReviews()
        .then(res => {
          var parsed = JSON.parse(res.express);
          setMovieReviews(parsed);
        });
    } else {
      setMovieReviews([])
    };
  };

  React.useEffect(() => {
    groupReviewsByMovie();
  }, [movieReviews]);

  const groupReviewsByMovie = () => {
    let groupedObj = {};
    for (var i=0; i<movieReviews.length; i++){
      let movieID = movieReviews[i].id;
      let data = movieReviews[i];

      if (groupedObj.hasOwnProperty(movieID)){
        groupedObj[movieID].push(data);
      } else {
        groupedObj[movieID] = [data];
      };
    

    };
    console.log(groupedObj);
    setGroupedReviews(groupedObj);
  };


  const callApiFindReviews = async () => {

    const url = serverURL + "/api/findReviews";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieSearchTerm: movieSearchTerm,
        actorSearchTerm: actorSearchTerm,
        directorSearchTerm: directorSearchTerm,
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
    }

    const handleMovieSearchTerm = (searchValue) => {
      setMovieSearchTerm(searchValue);
    };

    const handleActorSearchTerm = (searchValue) => {
      setActorSearchTerm(searchValue);
    };

    const handleDirectorSearchTerm = (searchValue) => {
      setDirectorSearchTerm(searchValue);
    };

    const handleSearchButton = (event) => {
      handleReviewSearch();
    }

    const handleSearchTermReset = (event) => {
      setMovieSearchTerm('');
      setActorSearchTerm('');
      setDirectorSearchTerm('');
      setMovieReviews([]);
    };
  
    return (
      <Grid
      container
      direction="row"
      justifyContent="flex-start"
      ml={5}
      style={{ minHeight: "100", marginBottom:'100px' }}>
        <NavBar />
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={12}
          md={5}
          xl={5}
          lg={5}
          mb={3}
          justifyContent='center'
          alignContent='center'
          backgroundColor= 'rgba(255,0,0,.6)'
          style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', filter: 'opacity(80%)'}}
        >
          <Typography variant={'h3'} style={{textAlign:'center', color:"white", fontWeight:'20pt'}}>
            Find Movies To Watch Based on Reviews
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={12}
          md={7}
          xl={7}
          lg={7}
          style={{ backgroundColor:'#EBF5F8'}}
        >
          <Box pt={3} mb={3} style={{ marginLeft:'10%' }}>
            <div>
              <div>
                <Search
                label="Search by Movie Title"
                value={movieSearchTerm}
                onChange={(e) => handleMovieSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Search 
                label="Search by Actor/Actress"
                value={actorSearchTerm}
                onChange={(e) => handleActorSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Search 
                label="Search by movie director"
                value={directorSearchTerm}
                onChange={(e) => handleDirectorSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Button
                    variant="contained"
                    onClick={handleReviewSearch}
                    style={{ fontWeight:'200', minWidth:'210px', margin:'20px 10px 0 0', backgroundColor:'#003F87', color:'white'}}
                  >
                  <SearchIcon/>
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSearchTermReset}
                    ml={3}
                    style={{ fontWeight:'200', minWidth:'140px', margin:'20px 0 0 10px', backgroundColor:'#2C3333', color:'white'}}
                  >
                    Reset Filters
                  </Button>
              </div>
            </div>
          </Box>
        </Grid>
        <List reviewList={movieReviews} groupedList={groupedReviews}/> 
      </Grid>
    )

}
//<List reviewList={movieReviews}/>

const Search = ({ value, label, onSearch, onChange }) => {

  return (
    <TextField
      id="search"
      label={label}
      value={value}
      onChange={(event) => onChange(event)}
      variant="standard"
      autoComplete="off"
      color="secondary"
      style={{ width:'370px'}}
    />
  )
};

const List = ({reviewList, groupedList}) => {
  return (
    <Grid container>
      {Object.keys(groupedList).map((key, value) => (
        <>
          <Item list={groupedList[key]}/>
        </>
      ))}
    </Grid>

  )

};

const Test = ({value}) => {
  return(
    <Typography variant='h4' style={{ marginLeft:'40pt', marginTop:'20pt'}}>
      <b>{value[0].id}</b>
    </Typography>
    );
}
// <Item value={value}/>

const Item = ({list}) => {
  let sum = 0;
  for (var i=0; i<list.length; i++){
    sum += list[i].reviewScore
  }
  const avgRating = parseFloat((sum/list.length).toFixed(2));

  return (
    <Grid container>
      <Box
      component={Grid}
      container
      boxShadow={3}
      style={{ margin:'50pt 90pt 0pt 90pt', borderRadius:"15px",  boxShadow: 2}}
      >
        <Grid item container direction='column' xs={4}>
          <Typography variant='h4' style={{ marginLeft:'40pt', marginTop:'20pt'}}>
            {list.name > 1 ? (<b>{list[0][0].name}</b>) : (<b>{list[0].name}</b>)}
          </Typography>
          <Typography variant='h6' style={{ color:'rgba(0,0,0,0.3)', marginLeft:'40pt'}}>
            <b>{list[0].year}</b>
          </Typography>
          <Typography variant='h6' style={{ color:'rgba(0,0,0,0.3)', marginLeft:'40pt'}}>
            <b>Directed by {list[0].director}</b>
          </Typography>
          <Typography variant='h4' style={{ color:'rgba(0,0,0)', margin:'15pt 0pt 20pt 40pt'}}>
            <b>{avgRating}/5</b>
          </Typography>
        </Grid>
        <Grid item container direction='column' xs={8} style={{borderLeft:'1px rgba(0,0,0,0.1) solid'}}>
          {Object.values(list).map((value, index) => (
          <>
            <Typography variant='h6' style={{margin:'3pt auto 0pt auto'}}>
              <i><b>{value.reviewTitle}</b></i>
            </Typography>
            <Typography variant='h6' style={{margin:'0 auto 15pt auto'}}>
              <i>"{value.reviewContent}"</i>
            </Typography>
          </>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};


export default SearchReview;