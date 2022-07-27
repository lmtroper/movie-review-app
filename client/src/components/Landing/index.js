import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NavBar from '../Navigation/index';
import { Link } from 'react-router-dom';
import background from '../../images/27112807_gr-stocks-q8P8YoR6erg-unsplash.jpeg';

const Landing = () => {
    return (
        <>
        <NavBar pages = {[['Search', 'search'],['Reviews', 'reviews'],['Movie Trailers', 'movieTrailers']]} />
        <Grid
        container
        direction="row"
        ml={5}
        style={{ minHeight: "91vh", backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', filter: 'opacity(80%)'}}>
            <Box
            style={{maxWidth:"60%", margin:'70px 0 0 30px'}}
            >
                <Typography variant={'h4'} style={{color:'rgb(2,45,80)'}}>
                    <b>Welcome to My Movie Review Site</b>
                </Typography>
                <Typography variant={'h6'} style={{maxWidth:'75%', marginBottom:'20px'}}>
                    Review your favourite movies and see what others are saying about them.
                </Typography>
                <div>
                    <Button
                    variant="contained"
                    style={{marginBottom:'20px'}}>
                        <Link to={'/reviews'} style={{textDecoration: 'none'}}>START WRITING A REVIEW</Link>
                    </Button>
                </div>
                <div>
                <Button
                variant="contained"
                style={{marginBottom:'70px'}}>
                    <Link to={'/search'} style={{textDecoration: 'none'}}>SEARCH FOR MOVIE REVIEWS</Link>
                </Button>
                </div>
                <Typography variant={'h5'} style={{maxWidth:'80%', marginBottom:'10px'}}>
                    <b>Need a movie to watch?</b>
                </Typography>
                <Typography variant={'h6'} style={{maxWidth:'80%', marginBottom:'20px'}}>
                    Check out the available movie trailers!
                </Typography>
                <Button
                variant="contained">
                    <Link to={'/movieTrailers'} style={{textDecoration: 'none'}}>MOVIE TRAILERS</Link>
                </Button>
            </Box>
        </Grid>
        </>
    )

}

export default Landing;