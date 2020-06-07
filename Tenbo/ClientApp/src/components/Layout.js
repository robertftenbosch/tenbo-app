import React from 'react';
import {NavMenu} from './NavMenu';
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/makeStyles";
import TenboFooter from "./TenboFooter";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = withStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        minHeight: '86vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

}));

export function Layout(props) {
    const classes = useStyles();
    return (
        <div>
            <CssBaseline />
            <NavMenu/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    {props.children}
                </Container>

            </main>
            <TenboFooter/>
        </div>
    );
}
