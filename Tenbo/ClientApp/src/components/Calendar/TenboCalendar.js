import React, {Component, useEffect, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function TenboCalendar(props) {
    const [myEvents, setMyEvents] = useState([]);
    const [openDate, setOpenDate] = useState(false);

    useEffect(() => {
        setMyEvents([{
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "Some title",
        }])
    }, [])

    function onEventResize(data) {
        const {start, end} = data;
        myEvents[0].start = start;
        myEvents[0].end = end;
        setMyEvents(myEvents)

    };

    function onSelectSlot(data) {
        console.log(data)
        setOpenDate(true)
        let event = {
            start: moment(data["start"]).toDate(),
            end: moment(data["start"]).add(1, "days").toDate()

        };
        // setMyEvents([...myEvents, event])
    }

    function onEventDrop(data) {
        console.log(data);
    };

    function handleClose() {
        setOpenDate(false)
    }

    return (<div>
        <DnDCalendar
            defaultDate={moment().toDate()}
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            drilldownView="agenda"
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            resizeable
            selectable={true}
            onSelectSlot={onSelectSlot}
            style={{height: 500}}
        />
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDate}>
            <DialogTitle id="simple-dialog-title">Add Event</DialogTitle>


        </Dialog>
    </div>)
}


export default TenboCalendar;