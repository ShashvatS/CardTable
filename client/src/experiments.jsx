
// import io from 'socket.io-client';

export default function run() {

    // const socket = io();
    
    fetch("/api/helloworld").then((data) => data.json()).then((data) => {
        console.log("testing a fetch!");
        console.log(data);
    });
    
    // let access_token = null;
    
    // socket.on("get-id", (data) => {
    //     console.log(data);
    // });
    
    // socket.on("request-access-token", (token) => {
    //     access_token = token;
    // });
    
    // socket.emit("get-id", {});
    // socket.emit("request-access-token", {});
    
//     async function makeOffer(event) {
//         if (access_token == null) {
//             console.log("No access token!");
//             return;
//         }
    
//         // let a = document.getElementById("hack hack").textContent;
//         // console.log(a);
    
//         // let configuraton = {
//         //     iceServers: access_token["ice_servers"]
//         // };
    
//         // console.log("hello world!");
    
//         // let pc = new RTCPeerConnection(configuraton);
    
//         // const offer = await pc.createOffer();
//         // await pc.setLocalDescription(new RTCSessionDescription(offer));
    
//         // console.log(offer);
    
//         // socket.emit("call-user", {
//         //     to: "1234",
//         //     offer: offer
//         // });
    
//         // event.preventDefault();
//     }
    
    // console.log(socket.id);
}
