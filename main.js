const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const clearInputBtn = document.getElementById("clearInputBtn");
const clearOutputBtn = document.getElementById("clearOutputBtn");
const copyBtn = document.getElementById("copyBtn");

encryptBtn.addEventListener("click", encode);
decryptBtn.addEventListener("click", decode);
clearInputBtn.addEventListener("click", clearInput);
clearOutputBtn.addEventListener("click", clearOutput);
copyBtn.addEventListener("click", copyToClipboard);

// Output textarea'daki değişiklikleri izle
outputText.addEventListener("input", toggleCopyButton);

// Sayfa yüklendiğinde kopyalama butonunun durumunu kontrol et
document.addEventListener("DOMContentLoaded", toggleCopyButton);

function clearOutput() {
  outputText.value = "";
  toggleCopyButton(); // Buton durumunu güncelle
}

function clearInput() {
  inputText.value = "";
}

function encode() {
  if (inputText.value === "") {
    outputText.value = "Lütfen bir değer giriniz.";
    toggleCopyButton();
    return;
  }

  // UTF-8 encoding için
  outputText.value = btoa(unescape(encodeURIComponent(inputText.value)));
  inputText.value = "";
  toggleCopyButton();
}

function decode() {
  if (inputText.value === "") {
    outputText.value = "Lütfen bir değer giriniz.";
    toggleCopyButton();
    return;
  }

  try {
    // UTF-8 decoding için
    outputText.value = decodeURIComponent(escape(atob(inputText.value)));
    inputText.value = "";
  } catch (e) {
    outputText.value = "Geçersiz şifrelenmiş metin!";
  }
  toggleCopyButton();
}

// Kopyalama butonu görünürlüğünü kontrol et
function toggleCopyButton() {
  if (outputText.value.trim() !== "") {
    copyBtn.classList.remove("opacity-0", "invisible");
    copyBtn.classList.add("opacity-100", "visible");
  } else {
    copyBtn.classList.add("opacity-0", "invisible");
    copyBtn.classList.remove("opacity-100", "visible");
  }
}

// Panoya kopyalama fonksiyonu
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(outputText.value);

    // Başarılı kopyalama geri bildirimi
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      Kopyalandı!
    `;
    copyBtn.classList.add("bg-green-500");
    copyBtn.classList.remove("bg-blue-500");

    // 2 saniye sonra orijinal haline döndür
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
      copyBtn.classList.remove("bg-green-500");
      copyBtn.classList.add("bg-blue-500");
    }, 2000);
  } catch (err) {
    console.error("Kopyalama başarısız:", err);
    // Fallback: eski yöntem
    outputText.select();
    document.execCommand("copy");

    // Geri bildirim
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      Kopyalandı!
    `;
    copyBtn.classList.add("bg-green-500");
    copyBtn.classList.remove("bg-blue-500");

    setTimeout(() => {
      copyBtn.innerHTML = originalText;
      copyBtn.classList.remove("bg-green-500");
      copyBtn.classList.add("bg-blue-500");
    }, 2000);
  }
}
