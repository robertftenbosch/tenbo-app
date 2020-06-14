import {useEffect, useState} from "react";
import React from "react";
import Grid from "@material-ui/core/Grid";

function Messages(props) {
    const {messages} = props;
    useEffect(() => {
        console.log(messages);
        console.log(messages[0]["username"]);
     
    }, [props]);
    return (
        <div>
            {messages[0]["username"]}
        </div>

    )
}

export default Messages;