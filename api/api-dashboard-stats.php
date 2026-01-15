<?php
include 'auth-check.php';
include 'config.php';
include 'db.php';

$data = [];
// Total students
$sql = "SELECT COUNT(*) AS total FROM students";
$data['total'] = mysqli_fetch_assoc(mysqli_query($conn, $sql))['total'];

// Active students
$sql = "SELECT COUNT(*) AS active FROM students WHERE status = 1";
$data['active'] = mysqli_fetch_assoc(mysqli_query($conn, $sql))['active'];

// Inactive students
$sql = "SELECT COUNT(*) AS inactive FROM students WHERE status = 0";
$data['inactive'] = mysqli_fetch_assoc(mysqli_query($conn, $sql))['inactive'];

// Today added
$sql = "SELECT COUNT(*) AS today 
        FROM students 
        WHERE DATE(created_at) = CURDATE()";
$data['today'] = mysqli_fetch_assoc(mysqli_query($conn, $sql))['today'];

// This month added
$sql = "SELECT COUNT(*) AS month 
        FROM students 
        WHERE MONTH(created_at) = MONTH(CURDATE())
        AND YEAR(created_at) = YEAR(CURDATE())";
$data['month'] = mysqli_fetch_assoc(mysqli_query($conn, $sql))['month'];

echo json_encode([
    "status" => true,
    "data" => $data
]);
