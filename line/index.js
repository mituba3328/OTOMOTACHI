import express from "express";
import { Client, middleware } from "@line/bot-sdk";
import nodeWebSocketLib from "websocket";
import {RelayServer} from "../RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  };
  const client = new Client(config);  

  const PORT = process.env.PORT || 3000;
  const app = express();
  var channel;
  var sendLine = false;
  main();
  app.post("/", middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) =>
      res.json(result)
    );
  });
  
  app.listen(PORT);  

  function handleEvent(event) {
    while(true){
        sleep(1000);
        if (sendLine){
            break;
        }
    }
    return client.replyMessage(event.replyToken, {
      type: "サボっていませんか？",
      text: event.message.text,
    });
  }

async function main(){
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" );
	channel = await relay.subscribe("tottori_f");
    console.log("Relay Server Connected!!");
	channel.onmessage = getMessage;
}

function getMessage(msg){
    if(msg.data[1] == "sendLine"){
        sendLine = true;
    }
}