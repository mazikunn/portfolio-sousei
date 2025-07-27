// Firebase 初期化
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 投稿処理
function postMessage() {
  const message = document.getElementById('message').value.trim();
  const password = document.getElementById('postPassword').value.trim();
  const errorEl = document.getElementById('postError');

  errorEl.textContent = '';

  if (!message) {
    errorEl.textContent = '書き込み内容を入力してください。';
    return;
  }

  if (password !== "1225") {
    errorEl.textContent = 'パスワードが違います。';
    return;
  }

  const postData = {
    message: message,
    timestamp: Date.now()
  };

  database.ref('messages').push(postData);

  // フォーム初期化
  document.getElementById('message').value = '';
  document.getElementById('postPassword').value = '';
}

// メッセージ取得・表示（新しい順に）
database.ref('messages').on('value', (snapshot) => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';

  const messages = snapshot.val();
  if (messages) {
    const messageList = Object.entries(messages).sort((a, b) => b[1].timestamp - a[1].timestamp);
    messageList.forEach(([id, data]) => {
      const div = document.createElement('div');
      div.className = 'message';
      div.innerHTML = `
        <p>${data.message}</p>
        <small>${new Date(data.timestamp).toLocaleString()}</small>
      `;
      messagesDiv.appendChild(div);
    });
  }
});
