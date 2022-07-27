import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import NavBar from '../Navigation/index';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import background from '../../images/le-cinema-1442829.jpeg';

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3001"; //enable for deployed mode; 

const SearchReview = () => {

  const [movieReviews, setMovieReviews] = React.useState([]);
  const [groupedReviews, setGroupedReviews] = React.useState({});
  const [movieSearchTerm, setMovieSearchTerm] = React.useState("");
  const [actorSearchTerm, setActorSearchTerm] = React.useState("");
  const [directorSearchTerm, setDirectorSearchTerm] = React.useState("");

  const handleReviewSearch = () => {
    if (movieSearchTerm !== '' || actorSearchTerm !== '' || directorSearchTerm !== ''){
      callApiSearchMovies()
        .then(res => {
          var parsed = JSON.parse(res.express);
          setMovieReviews(parsed);
        });
    } else {
      setMovieReviews([])
    };
  };

  React.useEffect(() => {
    groupFilteredMovies();
  }, [movieReviews]);

  const groupFilteredMovies = () => {
    let groupedObj = {};
    
    for (var i=0; i<movieReviews.length; i++){
      let movieID = movieReviews[i].id;
      let data = movieReviews[i];

      if (groupedObj.hasOwnProperty(movieID)){

        if ((data.reviewContent !== null ) && (!groupedObj[movieID].review_id.includes(data.reviewID))){
          groupedObj[movieID].review_id.push(data.reviewID);
          groupedObj[movieID].review.push([data.reviewTitle, data.reviewContent]);
          groupedObj[movieID].score.push(data.reviewScore);
        };

        if (!groupedObj[movieID].director.includes(data.director)){
           groupedObj[movieID].director.push(data.director)
        };
       
      } else {
        groupedObj[movieID] = {
          'movie':data.name, 
          'year':data.year,
          'review_id':[data.reviewID],
          'review':[[data.reviewTitle, data.reviewContent]],
          'score':[data.reviewScore],
          'director':[data.director]
        };
      };  
    };

    setGroupedReviews(groupedObj);
  };


  const callApiSearchMovies = async () => {

    const url = serverURL + "/api/searchMovies";
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
        <NavBar pages = {[['Landing Page', ''],['Reviews', 'reviews'],['Movie Trailers', 'movieTrailers']]}/>
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
            <Typography variant={'h3'} style={{textAlign:'left', color:"black", fontWeight:'200', marginBottom:'25px'}}>
            Search for a Movie
            </Typography>
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
};

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

const Item = ({list}) => {
  let reviews = false;

  if (list.review[0][0] != null){
    reviews = true;
  };

  let sum = 0;
  
  for (var i=0; i<list.score.length; i++){
    sum += list.score[i]
  }

  const avgRating = parseFloat((sum/list.score.length).toFixed(2));
  
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
            <b>{list.movie}</b>
          </Typography>
          <Typography variant='h6' style={{ color:'rgba(0,0,0,0.3)', marginLeft:'40pt'}}>
            <b>{list.year}</b>
          </Typography>
          <Typography variant='h6' style={{ color:'rgba(0,0,0,0.3)', marginLeft:'40pt'}}>
            {list.director.length > 1 ? (<>
              <b> Directed by </b>
              {Object.values(list.director).map((value, index) => (
                <>
                {index === (list.director.length-1) ? (
                    <b>{value}</b>
                ) :
                    <b>{value} & </b>
                }
                </>

              ))}
              
            </>) : <b>Directed by {list.director}</b>}
          </Typography>
          <Typography variant='h4' style={{ color:'rgba(0,0,0)', margin:'15pt 0pt 20pt 40pt'}}>
            { sum !== 0 ? (<b>{avgRating}/5</b>) : <b>N/A</b>}
          </Typography>
        </Grid>
          {reviews ? (<>
            <Grid item container direction='column' xs={8} style={{borderLeft:'1px rgba(0,0,0,0.1) solid', padding:'0 40pt 0 40pt'}}>
              {Object.values(list.review).map((value, index) => (<>
                <Typography variant='h6' style={{margin:'3pt auto 0pt auto'}}>
                  <i><b>{value[0]}</b></i>
                </Typography>
                <Typography variant='h6' style={{margin:'0 auto 15pt auto'}}>
                  <i>{value[1]}</i>
                </Typography>
              </>
              ))}
          </Grid></> ) : 
          <Grid item container direction='column' justifyContent='center' alignContent='center' xs={8} style={{borderLeft:'1px rgba(0,0,0,0.1) solid', fontSize:'20pt'}}>
          <b>No Reviews Yet</b></Grid>}
      </Box>
    </Grid>
  );
};


export default SearchReview;