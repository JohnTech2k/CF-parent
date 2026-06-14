console.log("JS Loaded");

const firebaseConfig = {
    apiKey: "AIzaSyAEYLb-12Sy1IJt-Sw-1IG3tnmiNsKyFAg",
    authDomain: "cf-parent.firebaseapp.com",
    databaseURL: "https://cf-parent-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cf-parent",
    storageBucket: "cf-parent.firebasestorage.app",
    messagingSenderId: "496223135941",
    appId: "1:496223135941:web:da8c92a5b928aac28828ac",
    measurementId: "G-TNLFJGT1PK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function registerUser() {
    console.log("registerUser called");

    const adminId = document.getElementById("adminId").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!adminId || !password || !confirmPassword) {
        alert("All fields required");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    firebase.database().ref("admins/" + adminId).set({
        password: password
    })
        .then(() => {
            alert("Registered successfully");
        })
        .catch(err => alert(err.message));
}

// Ensure function is globally accessible
window.registerUser = registerUser;

document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", registerUser);
    }
});