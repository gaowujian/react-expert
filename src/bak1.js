// *使用原生实现一个counter的案例
const container = document.getElementById("root");
const btn = document.createElement("button");
btn.innerHTML = 0;
btn.addEventListener("click", function () {
  this.innerHTML = parseInt(this.innerHTML) + 1;
});
container.appendChild(btn);
