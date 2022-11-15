// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJnAzxk8btIAwBfgMtM0hKRJC9DMvSg_Q",
    authDomain: "chat-app-66be0.firebaseapp.com",
    databaseURL: "https://chat-app-66be0-default-rtdb.firebaseio.com",
    projectId: "chat-app-66be0",
    storageBucket: "chat-app-66be0.appspot.com",
    messagingSenderId: "58771730972",
    appId: "1:58771730972:web:7bd4625b30a7483bfaa5d9",
    measurementId: "G-NX8PZL8H3K"
  };

firebase.initializeApp(firebaseConfig);


const db = firebase.database();

const username = prompt("Please Tell Us Your Name.");


function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }


  
  const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
