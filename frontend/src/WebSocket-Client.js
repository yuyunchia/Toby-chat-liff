import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:4000");
//const client = new W3CWebSocket("wss://089a26641b0b.ngrok.io");

// var HOST = location.origin.replace(/^http/, 'ws')
// var client = new W3CWebSocket(HOST);


// const host = "wss://fake-tinder.herokuapp.com/"
// const client = new W3CWebSocket(host);

export default client;
