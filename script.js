// Firebase 設定（あなたのプロジェクト情報に置き換え済み）
const firebaseConfig = {
  apiKey: "AIzaSyD-2K2C3Bd6QIqWZFmuHJ93dTZSeGy0HDI",
  authDomain: "my-bbs-project.firebaseapp.com",
  databaseURL: "https://my-bbs-project-default-rtdb.firebaseio.com",
  projectId: "my-bbs-project",
  storageBucket: "my-bbs-project.appspot.com",
  messagingSenderId: "189365424385",
  appId: "1:189365424385:web:5c226511d3ac6f9fadcb00"
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 投稿処理
document.getElementById("messageForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const message = document.getElementById("messageInput").value.trim();
  const password = document.getElementById("passwordInput").value;

  if (password !== "1225") {
    alert("パスワードが違います。");
    return;
  }

  if (message === "") return;

  const newMessageRef = db.ref("messages").push();
  newMessageRef.set({
    text: message,
    timestamp: Date.now()
  });

  document.getElementById("messageInput").value = "";
  document.getElementById("passwordInput").value = "";
});

// 表示処理
function displayMessages() {
  const container = document.getElementById("messageContainer");
  db.ref("messages").on("value", function(snapshot) {
    container.innerHTML = "";
    const messages = snapshot.val();
    if (messages) {
      const sorted = Object.entries(messages).sort((a, b) => a[1].timestamp - b[1].timestamp);
      sorted.forEach(([id, data]) => {
        const div = document.createElement("div");
        div.className = "message";
        div.textContent = data.text;
        container.appendChild(div);
      });
    }
  });
}

displayMessages();
