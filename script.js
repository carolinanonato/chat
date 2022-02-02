document.addEventListener("DOMContentLoaded", function () {
    console.log(`It's working`);
  
    const form = document.getElementById("form");
    const nickname = document.getElementById("nickname");
    const msg = document.getElementById("message");
    const chat = document.getElementById("chat");
    const db = firebase.firestore()
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      if (nickname.value && msg.value) {
        addChat(nickname.value, msg.value);
      }
    });
  
    function addChat(nickname, msg) {
        db.collection("Chat")
        .add({
           nickname,
           msg,
           timestamp: firebase.firestore.FieldValue.serverTimestamp()
       }).then((docRef) => console.log("Document written with ID:", docRef.id))
       .catch((err) => console.log("Error adding document", err));
    }

    function init () {
        db.collection("Chat")
        .orderBy("timestamp", "desc")
        .onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(doc => {
                const li = document.createElement('li')
                li.innerHTML = doc.data().msg
                chat.appendChild(li)
                
 })
})
 }

    init();

  });