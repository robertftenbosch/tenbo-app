import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import React, { useEffect, useState, useRef } from 'react';
import Messages from "./Messages";
import Container from "@material-ui/core/Container";
import authService from "../api-authorization/AuthorizeService";


function VideoChat() {

 
    let [hubConnection, setHubConnection] = useState(new HubConnectionBuilder().withUrl("/socket/video-chat").build());
    let [usernameIsSet, setUsernameIsSet] = useState(false);
    let [messages, setMessages] = useState([{"username":"John", "message":"test"}]);
    const userVideo = useRef();
    const partnerVideo = useRef();


    useEffect(() => {
        

        let connection = new HubConnectionBuilder().withUrl("/socket/video-chat").build();
        connection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection :('))

        setHubConnection(connection);
     
        // connection.on("ReceiveMessage",(data) =>{
        //     let jsondata = JSON.parse(data);
        //     setMessages([...messages, data]);
        // });

        return (() => {
            console.log("unmounting")
        })


    }, []);

    hubConnection.on("ReceiveMessage",(data) =>{
        let jsondata = JSON.parse(data);
        setMessages([...messages, data]);
    });
 




    return (
        <Container>
           <Messages messages={messages}/>
        </Container>
    );
}


export default VideoChat;