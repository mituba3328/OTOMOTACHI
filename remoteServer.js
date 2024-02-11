// Remote Example4 - controller
import nodeWebSocketLib from "websocket";
import {RelayServer} from "./RelayServer.js";
var relay = RelayServer("achex", "chirimenSocket" , nodeWebSocketLib, "https://chirimen.org");

var channel;
var pen0;
var pen1;
var allUsingCount;
main();

async function main(){
	// webSocketリレーの初期化
	var relay = RelayServer("chirimentest", "chirimenSocket" );
	channel = await relay.subscribe("tottori_f");
    console.log("Relay Server Connected!!");
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
    switch (msg.data[0]) {
        case "pen":
            if(msg.data[1] == 0){
                pen0 = msg.data[2];
            }else if(msg.data[1] == 1){
                pen1 = msg.data[2];
            }
            break;
    }
    if (pen0 && pen1){
        allUsingCount++;
    } else {
        allUsingCount = 0;
    }
    if (allUsingCount == 3){
        onLed();
    }
    console.log(pen1);
    console.log(pen0);
}

function onLed(){ // LED を点灯する
    let data0 = ["pen",0,"LEDon"]
    channel.send(data0);
    let data1 = ["pen",1,"LEDon"]
    channel.send(data1);
}