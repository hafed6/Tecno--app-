const API_URL = '/api/pieces';

window.onload = () => {
  loadPieces();
};

async function loadPieces() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    localStorage.setItem("pieces", JSON.stringify(data));
    renderPieces(data);
  } catch (e) {
    console.log("لا يوجد إنترنت، جلب البيانات من التخزين المحلي");
    const localData = JSON.parse(localStorage.getItem("pieces") || "[]");
    renderPieces(localData);
  }
}

function renderPieces(data) {
  const container = document.getElementById("pieces");
  container.innerHTML = "";
  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "piece";
    div.innerText = p.name;
    container.appendChild(div);
  });
}

async function addPiece() {
  const name = document.getElementById("name").value;
  if (!name) return alert("أدخل اسم القطعة");

  const piece = { name };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(piece)
    });
    loadPieces();
  } catch (e) {
    console.log("لا يوجد إنترنت، حفظ محلي");
    let localData = JSON.parse(localStorage.getItem("pieces") || "[]");
    localData.push(piece);
    localStorage.setItem("pieces", JSON.stringify(localData));
    renderPieces(localData);
  }

  document.getElementById("name").value = "";
}
