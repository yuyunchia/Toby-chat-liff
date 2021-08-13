# Toby-chat-liff


##  To run locally
0. To get two port connected, edit the `C://user/.ngrok2/ngrok.yml` to\
`authtoken: YourAuthtoken
tunnels:
  first:
    addr: 3000
    proto: http   
  second:
    addr: 4000
    proto: http`
2. Execute `ngrok.exe`and type `ngrok start -all` , then you will get two url correspond to port 3000 and 4000 respectively.
3. Edit the `WebsocketClient.js` file. Change the line `const client = new W3CWebSocket("ws://localhost:4000");` to `const client = new W3CWebSocket("wss://089a26641b0b.ngrok.io");`. (Suppose that https://089a26641b0b.ngrok.io correspond to port 4000).
4. Replace the endpointUrl of your liff with the url correspond to port 3000.
5. In command line, `cd backend && npm run server` and `cd frontend && npm start`

## To run on Heroku
1. Edit the `WebsocketClient.js` file. Change the line `const client = new W3CWebSocket("ws://localhost:4000");` to `const client = new W3CWebSocket("wss://{YourHeokuAppname}.herokuapp.com/");`.
2. 3. Replace the endpointUrl of your liff with the `https://{YourHeokuAppname}.herokuapp.com/`

