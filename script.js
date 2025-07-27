// Firebase 初期化
const firebaseConfig = {
  databaseURL: "https://YOUR_PROJECT.firebaseio.com" // ←ここを自分のURLに変更
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messagesRef = database.ref("messages");

// 投稿処理
document.getElementById("messageForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = document.getElementById("messageInput").value.trim();
  const password = document.getElementById("passwordInput").value;

  if (password !== "1225") {
    alert("パスワードが違います。");
    return;
  }

  if (message === "") return;

  const newMessageRef = messagesRef.push();
  newMessageRef.set({
    text: message,
    timestamp: Date.now()
  });

  document.getElementById("messageInput").value = "";
  document.getElementById("passwordInput").value = "";
});

// メッセージ表示
function displayMessages() {
  messagesRef.orderByChild("timestamp").on("value", (snapshot) => {
    const container = document.getElementById("messagesContainer");
    container.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
      const messageData = childSnapshot.val();
      const messageId = childSnapshot.key;

      const div = document.createElement("div");
      div.className = "message";
      div.innerText = messageData.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerText = "削除";
      deleteBtn.onclick = () => {
        const pw = prompt("削除パスワードを入力してください:");
        if (pw === "1225") {
          messagesRef.child(messageId).remove();
        } else {
          alert("パスワードが違います。");
        }
      };

      div.appendChild(deleteBtn);
      container.appendChild(div);
    });
  });
}

displayMessages();
