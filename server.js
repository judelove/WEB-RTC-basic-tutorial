// Importing the required modules
const WebSocketServer = require('ws');
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080, maxPayload: 100000000})

var clients  = {};

var ctr = 0;

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    clients[ctr++] = ws;
    // sending message
    ws.on("message", data => {
        jsonData = JSON.parse(data);
	clients[jsonData.sender] = ws;
        console.log(`Client ${jsonData.sender} => ${JSON.stringify(jsonData)}`);
        //console.log(`Client has sent us: ${JSON.stringify(data)}`)
	if(jsonData.recipient && clients[jsonData.recipient])
	    {
	        clients[jsonData.recipient].send(data);	
	    }
	    
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");
