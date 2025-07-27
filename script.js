// メッセージをローカルストレージから読み込み
window.addEventListener("DOMContentLoaded", function () {
  const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  const messageList = document.getElementById("messages");
  savedMessages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = msg;
    messageList.appendChild(li);
  });
});

// 書き込み処理（パスワード付き）
document.getElementById("messageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const passwordInput = document.getElementById("password").value;
  const messageInput = document.getElementById("message").value;
  const correctPassword = "1225";

  if (passwordInput === correctPassword) {
    const messageList = document.getElementById("messages");
    const newItem = document.createElement("li");
    newItem.textContent = messageInput;
    messageList.appendChild(newItem);

    // 保存処理
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    savedMessages.push(messageInput);
    localStorage.setItem("messages", JSON.stringify(savedMessages));

    // 入力欄をクリア
    document.getElementById("message").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("パスワードが間違っています。");
  }
});
