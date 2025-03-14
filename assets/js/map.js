// Inisialisasi Peta dengan OpenStreetMap
var map = L.map('map').setView([-7.7956, 110.3695], 13); // Default: Yogyakarta

// Tambahkan tile layer dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var marker;
function getAddress(lat, lng) {
    let apiKey = "73aa548c43994c9e868977e0fd8f95e0"; // Ganti dengan API Key dari OpenCage
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}&language=id`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Response dari OpenCage API:", data); // Debugging

            if (data.results.length > 0) {
                document.getElementById("lokasi").value = data.results[0].formatted;
            } else {
                document.getElementById("lokasi").value = `${lat}, ${lng}`;
            }
        })
        .catch(error => {
            console.error("Error mendapatkan alamat:", error);
            document.getElementById("lokasi").value = `${lat}, ${lng}`;
        });
}


// Event Klik di Peta untuk Pilih Lokasi
map.on('click', function (e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    getAddress(lat, lng);

    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map);
    }
});

// Event untuk Tombol "Gunakan Lokasi Saat Ini"
document.getElementById("btn-lokasi").addEventListener("click", function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            getAddress(lat, lng);

            map.setView([lat, lng], 15);

            if (marker) {
                marker.setLatLng([lat, lng]);
            } else {
                marker = L.marker([lat, lng]).addTo(map);
            }
        }, function (error) {
            alert("Gagal mendapatkan lokasi!");
        });
    } else {
        alert("Geolocation tidak didukung di browser ini.");
    }
});

let apiKey = "73aa548c43994c9e868977e0fd8f95e0"; // Ganti dengan API Key dari OpenCage
let autocompleteTimeout; // Untuk membatasi request API

document.getElementById("lokasi").addEventListener("input", function () {
    clearTimeout(autocompleteTimeout);

    let query = this.value.trim();
    if (query.length < 3) {
        document.getElementById("autocomplete-results").innerHTML = "";
        return;
    }

    autocompleteTimeout = setTimeout(() => {
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&language=id&limit=5`)
            .then(response => response.json())
            .then(data => {
                let resultsContainer = document.getElementById("autocomplete-results");
                resultsContainer.innerHTML = ""; // Hapus hasil sebelumnya

                if (data.results.length > 0) {
                    data.results.forEach(result => {
                        let li = document.createElement("li");
                        li.textContent = result.formatted;
                        li.style.cursor = "pointer";
                        li.addEventListener("click", function () {
                            document.getElementById("lokasi").value = result.formatted;
                            resultsContainer.innerHTML = "";

                            // Pindahkan peta ke lokasi yang dipilih
                            if (result.geometry) {
                                let lat = result.geometry.lat;
                                let lng = result.geometry.lng;
                                map.setView([lat, lng], 15);

                                if (marker) {
                                    marker.setLatLng([lat, lng]);
                                } else {
                                    marker = L.marker([lat, lng]).addTo(map);
                                }
                            }
                        });
                        resultsContainer.appendChild(li);
                    });
                }
            })
            .catch(error => console.error("Error mendapatkan autocomplete:", error));
    }, 500); // Tunggu 500ms sebelum fetch
});

