const express = require('express');
const app = express();


const path = require("path");
const dirname = path.resolve();

const http = require("http");
const WebSocket = require("ws");

const bodyParser = require("body-parser");
const { send } = require('process');
app.use(bodyParser.json());



const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


require("dotenv").config();

const PORT = process.env.PORT || 4000;
const myLiffId = process.env.MY_LIFF_ID;



//app.use(express.static('public'));

console.log("Server Ready!");
//console.log(myLiffId);


app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
});

// for websocket
wss.on("connection", (ws) => {

    const sendData = (data) => {
        console.log("sendData");
        ws.send(JSON.stringify(data));
    };

    // send liffId
    sendData(["send-liffId", { liffId: myLiffId }]);


    ws.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch(task){
            case "get-liffId": {
                console.log("ws.onmessage: get-liffId");

                sendData(["send-liffId", { liffId: myLiffId }]);
                // Message.find()
                //     .limit(100)
                //     .sort({ _id: 1 })
                //     .exec((err, res) => {
                //         if (err) throw err;
                //         console.log(res);
                //         sendData(["initMsg", res]);
                //     });
                break;
            }
            default:
                break;
        }

    };


});

let srv = app.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
});
srv.on('upgrade', function(req, socket, head) {
    wss.handleUpgrade(req, socket, head, function connected(ws) {
        wss.emit('connection', ws, req);
    })
});








//app.listen(port, () => console.log(`app listening on port ${port}!`));





app.use(express.static(path.join(dirname, "./frontend/build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(dirname, "./frontend/build", "index.html"));
});

