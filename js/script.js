const API_BASE = "http://localhost/PHP-REST-APIs/api";
const limit = 10;
let currentPage = 1;
let totalPages = 1;

// Render table rows
function renderTable(students) {
    let rows = "";
    let i = 1;
    if (students) {
        students.forEach((student) => {
            rows += `
                <tr>
                    <td>${i++}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.email}</td>
                    <td>${student.mobile}</td>
                    <td>${student.course}</td>
                    <td>${student.status = 1 ? "Active" : "Inactive"}</td>
                    <td>
                        <button class="btn btn-sm btn-success"
                            onclick="openEditModal(${(student.id)})">
                            Edit
                        </button>
                        <button class="btn btn-sm btn-danger"
                            onclick="deleteStudent(${student.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        rows = `<tr><td colspan="8">No records found</td></tr>`;
    }
    document.getElementById("studentsTable").innerHTML = rows;
}

// Fetch all students
// function loadStudents() {
//     fetch(API_BASE + "/api-fetch-all.php")
//     .then(res => res.json())
//     .then(data => renderTable(data));
// }

function loadStudents(page = 1) {

    fetch(API_BASE + `/api-fetch-page.php?page=${page}&limit=${limit}`, {
        method : "GET"
    })
    .then(res => res.json())
    .then(res => {

        if (!res.status) {
            document.getElementById("studentsTable").innerHTML = "";
            return;
        }

        currentPage = res.page;
        totalPages  = res.total_pages;

        renderTable(res.data);
        renderPagination();
    })
    .catch(err => {
        console.error(err);
        showToast("Failed to load student", "error");
    });
}

function renderPagination() {

    let html = "";

    /* Prev button */
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="javascript:void(0)"
               onclick="loadStudents(${currentPage - 1})">
               < Prev
            </a>
        </li>
    `;

    /* Page numbers */
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="javascript:void(0)"
                   onclick="loadStudents(${i})">
                   ${i}
                </a>
            </li>
        `;
    }

    /* Next button */
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="javascript:void(0)"
               onclick="loadStudents(${currentPage + 1})">
               Next >
            </a>
        </li>
    `;

    document.getElementById("pagination").innerHTML = html;
}

function renderPagination() {

    let html = "";

    /* Prev button */
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="javascript:void(0)"
               onclick="loadStudents(${currentPage - 1})">
               < Prev
            </a>
        </li>
    `;

    /* Page numbers */
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="javascript:void(0)"
                   onclick="loadStudents(${i})">
                   ${i}
                </a>
            </li>
        `;
    }

    /* Next button */
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="javascript:void(0)"
               onclick="loadStudents(${currentPage + 1})">
               Next >
            </a>
        </li>
    `;

    document.getElementById("pagination").innerHTML = html;
}

// Add student
document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        name: sname.value,
        age: age.value,
        email: email.value,
        mobile: mobile.value,
        course: course.value
    };

    fetch(API_BASE + "/api-insert.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        if (response.status == true){
            showToast(response.message, "success");
        }else{
            showToast(response.message, "error");
        }
        this.reset();
        closeAddModal();
        loadStudents();
    });
});

// Delete student
function deleteStudent(id) {
    if (!confirm("Are you sure want to delete?")) return;

    fetch(API_BASE + "/api-delete.php?id=" + id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(response => {
        if (response.status == true){
            showToast(response.message, "success");
        }else{
            showToast(response.message, "error");
        }
        loadStudents();
    });
}

function openEditModal(id) {

    fetch(API_BASE + "/api-fetch-single.php?id=" + id, {
        method: "GET"
    })
    .then(res => res.json())
    .then(res => {
        let student = res;

        if (Array.isArray(res)) {
            student = res[0];
        } else if (res.data && Array.isArray(res.data)) {
            student = res.data[0];
        }

         if (!student) {
            showToast("Student data not found", "error");
            return;
        }

        edit_id.value     = student.id;
        edit_name.value   = student.name;
        edit_age.value    = student.age;
        edit_email.value  = student.email;
        edit_mobile.value = student.mobile;
        edit_course.value = student.course;

        const modalEl = document.getElementById('editModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    })
    .catch(err => {
        console.error(err);
        showToast("Failed to load student", "error");
    });
}

// Update student
function updateStudent() {
    const data = {
        id: edit_id.value,
        name: edit_name.value,
        age: edit_age.value,
        email: edit_email.value,
        mobile: edit_mobile.value,
        course: edit_course.value
    };

    fetch(API_BASE + "/api-update.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        if (response.status == true) {
            showToast(response.message, "success");
        } else {
            showToast(response.message, "error");
        }
        closeEditModal();
        loadStudents();
    });
}

function closeEditModal() {
    const modalEl = document.getElementById('editModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

let searchTimer = null;
function searchStudents() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        const keyword = document.getElementById("searchInput").value.trim();

        if (keyword.length >= 3) {
            fetch(API_BASE + "/api-search.php?keyword=" + encodeURIComponent(keyword))
            .then(res => res.json())
            .then(data => renderTable(data));
        } else {
            loadStudents();
        }
    }, 400);
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

const toggleBtn = document.getElementById("darkToggle");
// Load saved preference
if (toggleBtn){
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.innerHTML = "☀️ Light Mode";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleBtn.innerHTML = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            toggleBtn.innerHTML = "🌙 Dark Mode";
        }
    });
}


function closeAddModal() {
    const modalEl = document.getElementById('addModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

loadStudents();