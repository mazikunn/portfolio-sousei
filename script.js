// Firebase設定（★ここをあなたのプロジェクトに合わせて書き換えてください）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const form = document.getElementById("postForm");
const messageInput = document.getElementById("message");
const passwordInput = document.getElementById("password");
const messagesList = document.getElementById("messagesList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  const password = passwordInput.value.trim();

  if (password !== "1225") {
    alert("パスワードが違います。");
    return;
  }

  if (message) {
    const newPostRef = db.ref("messages").push();
    newPostRef.set({
      text: message,
      timestamp: Date.now()
    });
    messageInput.value = "";
    passwordInput.value = "";
  }
});

function displayMessages() {
  db.ref("messages").orderByChild("timestamp").on("value", (snapshot) => {
    messagesList.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const msg = childSnapshot.val().text;
      const li = document.createElement("li");
      li.textContent = msg;
      messagesList.appendChild(li);
    });
  });
}

displayMessages();
