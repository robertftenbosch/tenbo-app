import React, {useEffect, useState} from 'react';
import GoalGrid from "./GoalGrid";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MockDataChart from "../Charts/MockDataChart";
import CreateGoal from "./CreateGoal";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    spacer: {padding:'1rem',},
}));

function Goals() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        {/*<Deposits />*/}
                        <CreateGoal/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <MockDataChart />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <div className={classes.spacer}/>
            </Grid>
            <GoalGrid/>
        </div>
    )
}

export default Goals;