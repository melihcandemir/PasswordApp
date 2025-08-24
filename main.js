const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");

encryptBtn.addEventListener("click", encode);
decryptBtn.addEventListener("click", decode);

function encode() {
  if (inputText.value === "") {
    outputText.value = "Lütfen bir değer giriniz.";
    return;
  }

  outputText.value = btoa(inputText.value);
  inputText.value = "";
}

function decode() {
  if (inputText.value === "") {
    outputText.value = "Lütfen bir değer giriniz.";
    return;
  }

  outputText.value = atob(inputText.value);
  inputText.value = "";
}
