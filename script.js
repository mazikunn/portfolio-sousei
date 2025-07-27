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

    // 入力欄をクリア
    document.getElementById("message").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("パスワードが間違っています。");
  }
});
