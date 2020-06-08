import React, {useState} from 'react'
import 'date-fns';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import {makeStyles} from '@material-ui/core/styles'
import {Link, Redirect} from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {GoalApi} from "../../services/TenboApiService";
import {Dialog} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: "black",
        fontSize: '1em'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    filename: {
        marginLeft: '10px'
    }
}));

export default function CreateGoalForm(props: any) {
    const classes = useStyles();
    const {open, onClose} = props;

    const [error, SetError] = useState("");
    const [name, SetName] = useState("");
    const [motivation, SetMotivation] = useState("");
    const [purpose, SetPurpose] = useState("");
    const [startDate, SetStartDate] = useState(new Date());
    const handleChange = (name: any) => (event: any) => {
        switch (name) {
            case "name":
                SetName(event.target.value);
                break;
            case "motivation":
                SetMotivation(event.target.value);
                break;
            case "purpose":
                SetPurpose(event.target.value);
                break;
            case "startDate":
                SetStartDate(event);
                break;
            default:
                SetError(`name ${name} does not exist`);
                break;
        }
    };

    const clickSubmit = async () => {


        const api = await GoalApi();
        console.log(api);
        api.PostGoal({id: 1}, {
            requestBody: {
                name: name,
                motivation: motivation,
                purpose: purpose,
                startDate: startDate
            },
            server: window.location.origin, 
        }).then((resp: any) => {
                console.log(resp);
                window.location.reload();

            }
        ).catch((err: any) => {
            console.error(err)
            SetError("check console for errors")
        });
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component="h2" className={classes.title}>
                            Nieuw doel
                        </Typography>
                        <br/>

                        <TextField id="name" label="Goal Name" className={classes.textField} value={name}
                                   onChange={handleChange('name')} margin="normal"/><br/>
                        <TextField
                            id="multiline-flexible"
                            label="Motivation"
                            multiline
                            rows="1"
                            value={motivation}
                            onChange={handleChange('motivation')}
                            className={classes.textField}
                            margin="normal"
                        /><br/>
                        <TextField
                            id="multiline-flexible"
                            label="Purpose"
                            multiline
                            rows="1"
                            value={purpose}
                            onChange={handleChange('purpose')}
                            className={classes.textField}
                            margin="normal"
                        /><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM-dd-yyyy"
                                value={startDate}
                                onChange={handleChange('startDate')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /></MuiPickersUtilsProvider>

                        {
                            error && (<Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>error</Icon>
                                {error}</Typography>)
                        }
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="contained" onClick={clickSubmit}
                                className={classes.submit}>Submit</Button>
                        <Button className={classes.submit} onClick={onClose} variant="contained">Cancel</Button>
                    </CardActions>
                </Card>
            </div>
        </Dialog>)
}