const messages = [
  "버튼을 눌러 보세요.",
  "잘했어요! 클릭이 작동해요. 🎉",
  "JavaScript로 문장을 바꿨어요.",
  "나만의 웹페이지, 시작이 반이에요!"
];

const message = document.querySelector("#message");
const button = document.querySelector("#changeButton");
let index = 0;

button.addEventListener("click", () => {
  index = (index + 1) % messages.length;
  message.textContent = messages[index];
});
