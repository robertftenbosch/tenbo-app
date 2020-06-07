import React, {Fragment, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TenboTitle from "../Misc/TenboTitle";
import {Button, Typography} from "@material-ui/core";
import {TenboInfoApi} from "../../services/TenboApiService";
import CreateGoalForm from "./CreateGoalForm";


const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function CreateGoal() {
    const classes = useStyles();
    const [numberOfGoals, setNumberOfGoals] = useState(0);
    const [numberOfActiveGoals, setNumberOfActiveGoals] = useState(0);
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        getInfo().catch(err => {
            console.error(err);
        })
    },[]);
    async function getInfo(){
        const api =await TenboInfoApi();
        const response = await api.GetGoalsInfo();
        setNumberOfGoals(response.body.numberOfGoals);
        setNumberOfActiveGoals(response.body.numberOfActiveGoals)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <Fragment>
            <Typography component="p" variant="h4">
                Actieve doelen {numberOfActiveGoals}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                van totaal aantal doelen {numberOfGoals}
            </Typography>
            <TenboTitle>Maak een doel</TenboTitle>

            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Maak
            </Button>
            <CreateGoalForm open={open} onClose={handleClose}/>
        </Fragment>
    );
}
