import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GoalGridCard from "./GoalGridCard";
import {GoalApi} from "../../services/TenboApiService";
import {IGoal} from "../../models/Goal";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

export default function GoalGrid() {
    const classes = useStyles();

    function getRandomNumber() {
        return Math.round(Math.random() * 1000)
    }
    const [goals, setGoals ] = useState<IGoal[]>([]);
    useEffect(()=>{
        getGoals().catch(err => {
            console.error(err)
        })

    }, []);

    async function getGoals() {
        const api = await GoalApi();
        let response = await api.GetGoals();
        let goals =  response.body;
        setGoals(goals as [IGoal]);
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid container item xs={12} spacing={3}>
                {goals.map((goal) => (
                    <Grid key={goal["id"]} xs={4} item>
                        <GoalGridCard goal={goal}
                                      url={`https://picsum.photos/id/${getRandomNumber()}/200/300?`}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}