import React, {Component, Fragment, useEffect, useState} from 'react';
import authService from './AuthorizeService';
import {ApplicationPaths} from './ApiAuthorizationConstants';
import {Avatar, IconButton, Link} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple ,common} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },

    white: {
        color: theme.palette.getContrastText(common.white),
        backgroundColor: common.white,
    },
}));

export default function LoginMenu() {
    const classes = useStyles();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("hey stranger!");
    useEffect(() => {
        let subscription = authService.subscribe(() => populateState());
        populateState();

        return function cleanup() {
            authService.unsubscribe(subscription);
        }

    });

    async function populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        setIsAuthenticated(isAuthenticated)
        setUsername(user && user.name)

    }

    function Authenticated() {
        const profilePath = `${ApplicationPaths.Profile}`;
        const logoutPath = {pathname: `${ApplicationPaths.LogOut}`, state: {local: true}};
        return (
            <Fragment>
                <Avatar className={classes.white} alt={username}>
                </Avatar>
                <Link href={logoutPath.pathname}>logout</Link>
            </Fragment>
        );
    }

    function Anonymous() {
        const registerPath = `${ApplicationPaths.Register}`;
        const loginPath = `${ApplicationPaths.Login}`;
        return (
            <Fragment>
                <IconButton>
                    <Link href={registerPath}>Register</Link>
                </IconButton>
                <IconButton>
                    <Link href={loginPath}>login</Link>
                </IconButton>
            </Fragment>);
    }


    if (!isAuthenticated) {
        return Anonymous();
    } else {
        return Authenticated();
    }
}

