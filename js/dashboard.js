const API_BASE = "http://localhost/PHP-REST-APIs/api";

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
    document.getElementById("loggedUserName").innerText = user.name;
}else{
    showToast("Please login to continue", "error");
    setTimeout(() => {
        window.location.href = "auth.html";
    }, 1500);
}

// Load stats
function loadDashboardStats() {
    fetch(API_BASE + "/api-dashboard-stats.php")
    .then(res => res.json())
    .then(res => {
        if (!res.status) return;

        document.getElementById("totalStudents").innerText  = res.data.total;
        document.getElementById("activeStudents").innerText = res.data.active;
        document.getElementById("todayStudents").innerText  = res.data.today;
        document.getElementById("monthStudents").innerText  = res.data.month;
    });
}

// Load recent students
function loadRecentStudents() {
    fetch(API_BASE + "/api-dashboard-recent.php")
    .then(res => res.json())
    .then(res => {
        let html = "";

        if (res.data.length === 0) {
            html = `<tr>
                        <td colspan="3" class="text-center text-muted">
                            No recent records
                        </td>
                    </tr>`;
        } else {
            res.data.forEach(row => {
                html += `<tr>
                            <td class="ps-2">${row.name}</td>
                            <td>${row.course}</td>
                            <td>${row.status = 1 ? 'Active' : 'In-Active'}</td>
                            <td>${row.created_at}</td>
                        </tr>`;
            });
        }

        document.getElementById("recentStudents").innerHTML = html;
    });
}

let courseChartInstance = null;
function loadCourseChart() {
    fetch(API_BASE + "/api-dashboard-chart.php")
    .then(res => res.json())
    .then(res => {

        const labels = res.data.map(i => i.course);
        const values = res.data.map(i => i.total);

        const ctx = document.getElementById("courseChart").getContext("2d");

        if (courseChartInstance) {
            courseChartInstance.destroy();
        }

        // Modern color palette
        const colors = [
            "#6366F1", // indigo
            "#22C55E", // green
            "#F59E0B", // amber
            "#EF4444", // red
            "#06B6D4", // cyan
            "#A855F7", // purple
            "#EC4899"  // pink
        ];

        courseChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: labels.map((_, i) => colors[i % colors.length]),
                    borderRadius: 14,
                    barThickness: 45,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1400,
                    easing: "easeInOutQuart"
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: "#0f172a",
                        titleColor: "#fff",
                        bodyColor: "#e5e7eb",
                        padding: 12,
                        cornerRadius: 10,
                        boxPadding: 6
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: "#374151",
                            font: { weight: "600" }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: "rgba(0,0,0,0.05)"
                        },
                        ticks: {
                            precision: 0,
                            color: "#374151"
                        }
                    }
                }
            }
        });
    });
}

// let statusChartInstance = null;
// function loadStatusDonutChart() {
//     fetch(API_BASE + "/api-dashboard-stats.php")
//     .then(res => res.json())
//     .then(res => {
//         if (!res.status) return;

//         const active = parseInt(res.data.active);
//         const inactive = parseInt(res.data.inactive);

//         const ctx = document
//             .getElementById("statusDonutChart")
//             .getContext("2d");

//         if (statusChartInstance) {
//             statusChartInstance.destroy();
//         }

//         statusChartInstance = new Chart(ctx, {
//             type: "doughnut",
//             data: {
//                 labels: ["Active", "Inactive"],
//                 datasets: [{
//                     data: [active, inactive],
//                     backgroundColor: [
//                         "#22C55E", // green
//                         "#EF4444"  // red
//                     ],
//                     borderWidth: 0,
//                     hoverOffset: 10
//                 }]
//             },
//             options: {
//                 cutout: "70%",
//                 plugins: {
//                     legend: {
//                         position: "bottom",
//                         labels: {
//                             padding: 15,
//                             font: { weight: "600" }
//                         }
//                     },
//                     tooltip: {
//                         backgroundColor: "#0f172a",
//                         titleColor: "#fff",
//                         bodyColor: "#e5e7eb",
//                         padding: 10,
//                         cornerRadius: 8
//                     }
//                 },
//                 animation: {
//                     animateScale: true,
//                     animateRotate: true,
//                     duration: 1200,
//                     easing: "easeOutCirc"
//                 }
//             }
//         });
//     });
// }


document.addEventListener("DOMContentLoaded", () => {
    loadDashboardStats();
    loadRecentStudents();
    loadCourseChart();
    // loadStatusDonutChart();
});


function logoutUser() {
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

document.getElementById("year").innerText = new Date().getFullYear();

