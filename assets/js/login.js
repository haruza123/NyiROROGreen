import { auth, loginAdmin } from "./firebase.js";

document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await loginAdmin(email, password);
        window.location.href = "index.html";
    } catch (error) {
        alert("Login gagal: " + error.message);
    }
});
