const API_BASE = "http://localhost/PHP-REST-APIs/api";

function logoutUser() {
    // if (!confirm("Are you sure you want to logout?")) return;

    const token = localStorage.getItem("auth_token");
    if (!token) {
        window.location.href = "auth.html";
        return;
    }

    fetch(API_BASE + "/api-logout.php", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {

        // clear local storage
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");

        showToast(data.message || "Logged out", "success");

        setTimeout(() => {
            window.location.href = "auth.html";
        }, 1000);
    })
    .catch(() => {
        localStorage.clear();
        window.location.href = "auth.html";
    });
}

function showToast(message, type = "success") {
    const toastEl = document.getElementById("toast");
    const toastBody = toastEl.querySelector(".toast-body");

    toastBody.innerText = message;
    if(type == "success"){
        toastEl.className = `toast align-items-center text-white border-0 bg-${type}`;
    }else{
        toastEl.className = `toast align-items-center text-white border-0 bg-danger`;
    }
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
    document.getElementById("loggedUserName").innerText = user.name;
}