import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZ5XC7vvePD9uC461HnwQLTnfKMe0n06Q",
  authDomain: "utskami-63c64.firebaseapp.com",
  projectId: "utskami-63c64",
  storageBucket: "utskami-63c64.appspot.com",
  messagingSenderId: "655777103684",
  appId: "1:655777103684:web:b909138b3c943018da2111",
  measurementId: "G-PR0FTK6P64",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function loadLaporan() {
  const laporanList = document.getElementById("laporan-list");
  if (!laporanList) {
    console.error("Elemen laporan-list tidak ditemukan!");
    return;
  }

  laporanList.innerHTML = "<p>Memuat laporan...</p>";

  const q = query(collection(db, "Form"), orderBy("timestamp", "desc"));

  onSnapshot(q, (snapshot) => {
    laporanList.innerHTML = "";
    snapshot.forEach((doc) => {
      let laporan = doc.data();
      let laporanItem = document.createElement("div");
      laporanItem.classList.add("laporan-item");
      laporanItem.innerHTML = `
                <p><strong>Nama:</strong> ${laporan.nama}</p>
                <p><strong>Lokasi:</strong> ${laporan.lokasi}</p>
                <p><strong>Deskripsi:</strong> ${laporan.deskripsi}</p>
                ${
                  laporan.fotoUrl
                    ? `<img src="${laporan.fotoUrl}" alt="Foto Laporan" width="200">`
                    : ""
                }
                <hr>
            `;
      laporanList.appendChild(laporanItem);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadLaporan);
