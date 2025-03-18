import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    updateDoc,
    doc
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
        let laporan = doc.data() || {}; 

        let nama = laporan.nama ? laporan.nama : "Tanpa Nama";
        let lokasi = laporan.lokasi ? laporan.lokasi : "Tanpa Lokasi";
        let deskripsi = laporan.deskripsi ? laporan.deskripsi : "Tidak ada deskripsi";
        let tanggal = laporan.timestamp ? new Date(laporan.timestamp.seconds * 1000).toLocaleString("id-ID") : "Tidak tersedia";
        let status = laporan.status ? "✅ Ditindaklanjuti" : "⏳ Belum Ditindaklanjuti";

        let laporanItem = document.createElement("div");
        laporanItem.classList.add("laporan-item");

        laporanItem.setAttribute("data-nama", nama.toLowerCase());
        laporanItem.setAttribute("data-lokasi", lokasi.toLowerCase());
  
        laporanItem.innerHTML = `
            <p><strong>Nama:</strong> ${nama}</p>
            <p><strong>Lokasi:</strong> ${lokasi}</p>
            <p><strong>Deskripsi:</strong> ${laporan.deskripsi ? laporan.deskripsi : "Tidak ada deskripsi"}</p>
            <p><strong>Tanggal:</strong> ${tanggal}</p>
            ${laporan.fotoUrl ? `<img src="${laporan.fotoUrl}" alt="Foto Laporan" width="200">` : ""}
            <p><strong>Status:</strong> ${laporan.status ? "✅ Ditindaklanjuti" : "⏳ Belum Ditindaklanjuti"}</p>
            <button onclick="hapusLaporan('${doc.id}')">🗑️ Hapus</button>
            ${!laporan.status ? `<button onclick="tandaiSelesai('${doc.id}')">✅ Tandai Selesai</button>` : ""}
            <hr>
        `;
        laporanList.appendChild(laporanItem);
      });
    });
  }
  
  async function hapusLaporan(id) {
    if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      try {
        await deleteDoc(doc(db, "Form", id));
        alert("Laporan berhasil dihapus.");
      } catch (error) {
        console.error("Gagal menghapus laporan:", error);
      }
    }
  }
  
  async function tandaiSelesai(id) {
    try {
      await updateDoc(doc(db, "Form", id), { status: "Ditindaklanjuti" });
      alert("Laporan telah ditandai sebagai Ditindaklanjuti.");
    } catch (error) {
      console.error("Gagal memperbarui status laporan:", error);
    }
  }
  
  function filterLaporan() {
    let searchValue = document.getElementById("search-box").value.toLowerCase();
    let laporanItems = document.querySelectorAll(".laporan-item");
  
    laporanItems.forEach((item) => {
      let nama = item.getAttribute("data-nama");
      let lokasi = item.getAttribute("data-lokasi");
  
      if (nama.includes(searchValue) || lokasi.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", loadLaporan);
  
  window.hapusLaporan = hapusLaporan;
  window.tandaiSelesai = tandaiSelesai;
  window.filterLaporan = filterLaporan;
  