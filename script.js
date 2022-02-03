document.addEventListener("DOMContentLoaded", function () {
    console.log(`It's working`);
  
    const form = document.getElementById("form");
    const nickname = document.getElementById("nickname");
    const msg = document.getElementById("message");
    const chat = document.getElementById("chat");
    const db = firebase.firestore();
    const username = "Hamid";
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      if (nickname.value && msg.value) {
        addChat(nickname.value, msg.value);
        msg.value = "";
      }
    });
  
    function addChat(nickname, msg) {
      db.collection("Chat")
        .add({
          nickname,
          msg,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => console.log("Document written with ID:", docRef.id))
        .catch((err) => console.log("Error adding document", err));
    }
  
    function deleteChat(id) {
      db.collection("Chat")
        .doc(id)
        .delete()
        .then(() => console.log("Document successfully deleted"))
        .catch((err) => console.log("Error deleting document", err));
    }
  
    function updateChat(id, msg) {
      db.collection("Chat")
        .doc(id)
        .update({
          msg,
        })
        .then((docRef) => console.log("Document updated with ID:", docRef.id))
        .catch((err) => console.log("Error updating document", err));
    }
  
    function init() {
      db.collection("Chat")
        .orderBy("timestamp", "desc")
        .onSnapshot(function (querySnapshot) {
          chat.style = `
          list-style: none;
          padding:0
          `;
          chat.innerHTML = "";
          querySnapshot.forEach((doc) => {
            const liChat = document.createElement("li");
            liChat.innerHTML = doc.data().msg;
            liChat.classList.add(
              doc.data().nickname === username ? "chat_msg_self" : "chat_msg"
            );
  
            const spanName = document.createElement("span");
            spanName.innerHTML = doc.data().nickname.charAt(0).toUpperCase();
            spanName.classList.add("chat_msg_name");
  
            const spanDel = document.createElement("span");
            spanDel.innerHTML = "&#10005;";
            spanDel.addEventListener("click", () => deleteChat(doc.id));
            spanDel.classList.add("chat_msg_delete");
  
            liChat.appendChild(spanName);
            liChat.appendChild(spanDel);
  
            chat.appendChild(liChat);
          });
        });
    }
  
    init();
  
    // updateChat("pJaoRsK19nHCkQN8VR2M", "This is the updated message!");
  });