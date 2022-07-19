import React from 'react';
import Typography from "@material-ui/core/Typography";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@material-ui/core/Link';
import history from '../Navigation/history';
import NavBar from '../Navigation/index';

const Landing = () => {
    
    return (
        <div>
            <Typography variant="h3" color="inherit" noWrap>
                This is Landing Page
            </Typography>
            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => history.push('/Home')}
            >
                <Typography variant="h5" color="inherit" noWrap>
                    Navigate to Home Page
                </Typography>
            </Link>

            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => history.push('/SignIn')}
            >
                <Typography variant="h5" color="inherit" noWrap>
                    Navigate to SignIn Page
                </Typography>
            </Link>

        </div>
    )

}

export default Landing;