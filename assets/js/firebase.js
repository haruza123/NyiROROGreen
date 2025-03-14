
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage(); 

document.getElementById("laporan-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let nama = document.getElementById("nama").value;
    let lokasi = document.getElementById("lokasi").value;
    let deskripsi = document.getElementById("deskripsi").value;
    let fotoFile = document.getElementById("foto").files[0];

    if (fotoFile) {
        let storageRef = storage.ref(`laporan/${Date.now()}_${fotoFile.name}`);
        
        let uploadTask = storageRef.put(fotoFile);

        uploadTask.on("state_changed",
            function(snapshot) {

            },
            function(error) {
                console.error("Error mengunggah foto:", error);
            },
            function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    db.collection("laporan").add({
                        nama: nama,
                        lokasi: lokasi,
                        deskripsi: deskripsi,
                        fotoUrl: downloadURL, 
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        alert("Laporan berhasil dikirim!");
                        document.getElementById("laporan-form").reset();
                    }).catch((error) => {
                        console.error("Error menyimpan data:", error);
                    });
                });
            }
        );
    } else {
        db.collection("laporan").add({
            nama: nama,
            lokasi: lokasi,
            deskripsi: deskripsi,
            fotoUrl: "", 
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("Laporan berhasil dikirim!");
            document.getElementById("laporan-form").reset();
        }).catch((error) => {
            console.error("Error menyimpan data:", error);
        });
    }
});

db.collection("laporan").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    let laporanList = document.getElementById("laporan-list");
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
