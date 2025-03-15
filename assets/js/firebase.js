// 🔹 Import Firebase Module (Versi 10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 🔥 Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAZ5XC7vvePD9uC461HnwQLTnfKMe0n06Q",
    authDomain: "utskami-63c64.firebaseapp.com",
    projectId: "utskami-63c64",
    storageBucket: "utskami-63c64.appspot.com",
    messagingSenderId: "655777103684",
    appId: "1:655777103684:web:b909138b3c943018da2111",
    measurementId: "G-PR0FTK6P64"
};

// 🔥 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// 🔥 Tes apakah Firebase berhasil dimuat
console.log("🔥 Firebase berhasil dimuat!");

// 🔹 Fungsi menambahkan laporan
async function tambahLaporan(nama, lokasi, deskripsi, fotoFile) {
    try {
        let fotoUrl = "";

        if (fotoFile) {
            const storageRef = ref(storage, `laporan/${Date.now()}_${fotoFile.name}`);
            await uploadBytes(storageRef, fotoFile);
            fotoUrl = await getDownloadURL(storageRef);
        }

        await addDoc(collection(db, "Form"), {
            nama: nama,
            lokasi: lokasi,
            deskripsi: deskripsi,
            fotoUrl: fotoUrl,
            timestamp: serverTimestamp()
        });

        alert("Laporan berhasil dikirim!");
        return true;
    } catch (error) {
        console.error("Error menyimpan data:", error);
        return false;
    }
}

// 🔹 Fungsi menampilkan laporan
async function loadLaporan() {
    const laporanList = document.getElementById("laporan-list");
    laporanList.innerHTML = "";

    const q = query(collection(db, "Form"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
        laporanList.innerHTML = "";
        snapshot.forEach((doc) => {
            let laporan = doc.data();
            let laporanItem = document.createElement("div");
            laporanItem.innerHTML = `
                <p><strong>Nama:</strong> ${laporan.nama}</p>
                <p><strong>Lokasi:</strong> ${laporan.lokasi}</p>
                <p><strong>Deskripsi:</strong> ${laporan.deskripsi}</p>
                ${laporan.fotoUrl ? `<img src="${laporan.fotoUrl}" alt="Foto Laporan" width="200">` : ""}
                <hr>
            `;
            laporanList.appendChild(laporanItem);
        });
    });
}

// Export fungsi agar bisa digunakan di file lain
export { tambahLaporan, loadLaporan };
