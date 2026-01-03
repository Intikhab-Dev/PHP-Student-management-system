const API_BASE = "http://localhost/PHP-REST-APIs/api";
// console.log(localStorage.user);
/* REGISTER */
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name     = document.getElementById("reg_name").value.trim();
    const email    = document.getElementById("reg_email").value.trim();
    const mobile   = document.getElementById("reg_mobile").value.trim();
    const password = document.getElementById("reg_password").value.trim();

    fetch(API_BASE + "/api-register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            mobile,
            password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status) {
            showToast(data.message, "success");
            this.reset();
        } else {
            showToast(data.message, "error");
        }
    })
    .catch(err => {
        console.error(err);
        showToast("Something went wrong", "error");
    });
});

/* LOGIN */
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email    = document.getElementById("login_email").value.trim();
    const password = document.getElementById("login_password").value.trim();

    if (email === "" || password === "") {
        showToast("Email and password required", "error");
        return;
    }

    fetch(API_BASE + "/api-login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.status) {
            showToast(data.message, "error");
            return;
        }

        /* SAVE TOKEN */
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        showToast("Login successful", "success");

        // later redirect to dashboard or home page
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
        
    })
    .catch(err => {
        console.error(err);
        showToast("Server error", "error");
    });
});


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