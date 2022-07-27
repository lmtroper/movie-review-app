import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NavBar from '../Navigation/index';

const serverURL = '';

const MyPage = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [trailers, setTrailers] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [noResultsMsg, setNoResultsMsg] = React.useState('');

    const handleTrailerSearch = () => {
        if (searchTerm != ''){
            callApiGetTrailers()
                .then(res => {
                var parsed = JSON.parse(res.express);
                setTrailers(parsed);
                if (parsed.length == 0){
                    setNoResultsMsg('No Trailers Found')
                };
                }); 
            setSearchTerm('');
            
        } else{
            setErrorMsg('Please enter a movie');
            setTrailers([]);
        };
        
    }

    const handleAllTrailerSearch = () => {
    callApiGetTrailers()
        .then(res => {
          var parsed = JSON.parse(res.express);
          setTrailers(parsed);
        }); 
    }

    const callApiGetTrailers = async () => {

    const url = serverURL + "/api/getTrailers";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: searchTerm
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
    }

    const handleSearchTerm = (searchValue) => {
        setSearchTerm(searchValue);
        setErrorMsg('');
        setNoResultsMsg('');
    }

    return (
        <Grid
        container
        direction="row"
        justifyContent="flex-start"
        ml={5}
        style={{ minHeight: "100%", marginBottom:'100px' }}>
            <NavBar />
            <Grid
            container
            direction="row"
            justifyContent='center'
            alignContent='center'
            style={{ height: "70vh", marginBottom:'70px', backgroundColor:'#EBF5FB' }}
            >
                <Box 
                textAlign='center'
                width='100%'
                style={{ backgroundColor:'#EBF5FB'}}>
                    <Typography variant={'h3'} style={{fontWeight:'200', margin:'0 0 40px 0'}}>
                        Search for a Movie Trailer
                    </Typography>
                    <Typography variant={'h6'} style={{fontWeight:'200', margin:'0px 20% 30px 20%'}}>
                        This page allows the user to search for a movie trailer. After clicking the search button, youtube videos that meet the search criteria will be embedded on the page.
                    </Typography>
                    <Typography style={{fontSize:'10pt', fontWeight:'200', margin:'0px 20% 40px 20%'}}>
                        <b>NOTE: The movie trailers included in the database are
                        12 Angry Men, Batman Begins, Finding Nemo, Forrest Gump, Gone with the Wind, Good Will Hunting, Pirates of
                        the Caribbean: The Curse of the Black Pearl, Saving Private Ryan, Stand By Me, and Toy Story.</b>
                    </Typography>
                    {errorMsg != '' ? (
                        <Typography style={{ margin:'0px 25% 0px', textAlign:'left', color: "rgb(255,0,0)" }} variant={"body2"}>
                            {errorMsg}
                        </Typography>) : ("")
                    }
                    <Search 
                    label="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => handleSearchTerm(e.target.value)}
                    />
                    
                </Box>
                <Button
                    variant="contained"
                    onClick={handleTrailerSearch}
                    ml={3}
                    style={{ fontWeight:'200', minWidth:'140px', margin:'20px 0 0 10px', marginRight:'30px', backgroundColor:'#067EC6', color:'white'}}
                    >
                    SEARCH
                </Button>
                <Button
                    variant="contained"
                    onClick={handleAllTrailerSearch}
                    ml={3}
                    style={{ fontWeight:'200', minWidth:'140px', margin:'20px 0 0 10px', marginLeft:'30px', backgroundColor:'#2C3333', color:'white'}}
                    >
                    VIEW ALL AVAILABLE TRAILERS
                </Button>
            </Grid>
            <Grid
            container
            direction='row'
            justifyContent='center'
            style={{margin:'0 100px 0 100px'}}>
            {(trailers.length > 0 && noResultsMsg =='') ? (<>
                {Object.values(trailers).map((trailer, index) => (<>
                <Box textAlign='center' style={{margin:'0 30px 40px 30px'}}>
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer.link}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="video"
                        width="560" 
                        height="315"
                    />{" "}
                </Box>
                </>
                ))}</>) : (<Typography variant={'h6'}><b>{noResultsMsg}</b></Typography>)}                
            </Grid>
            
        </Grid>
    );
}

const Search = ({ value, label, onSearch, onChange }) => {

  return (
    <TextField
      id="search"
      label={label}
      value={value}
      onChange={(event) => onChange(event)}
      variant="outlined"
      autoComplete="off"
      style={{ width:'50%', backgroundColor:'white', borderRadius:'10pt'}}
    />
  )

};

export default MyPage;