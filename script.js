// script.js
const db = firebase.database();
const postRef = db.ref("posts");
const PASSWORD = "1225";

// 書き込み
document.getElementById("submitBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value || "匿名";
  const content = document.getElementById("message").value;
  const pw = prompt("4桁のパスワードを入力してください");

  if (pw !== PASSWORD) {
    alert("パスワードが違います。");
    return;
  }

  if (content.trim()) {
    const newPost = {
      name: name,
      content: content,
      timestamp: Date.now()
    };
    postRef.push(newPost);
    document.getElementById("message").value = "";
  }
});

// 表示
postRef.on("child_added", (snapshot) => {
  const data = snapshot.val();
  const key = snapshot.key;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
    <strong>${data.name}</strong>: ${data.content}<br>
    <button onclick="deletePost('${key}')">削除</button>
    <hr>
  `;
  document.getElementById("posts").prepend(post);
});

// 削除
function deletePost(key) {
  const pw = prompt("削除するにはパスワードを入力してください");
  if (pw === PASSWORD) {
    postRef.child(key).remove();
    location.reload();
  } else {
    alert("パスワードが違います。");
  }
}
