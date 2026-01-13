<?php
include 'config.php';
include 'db.php';

$sql = "SELECT name, course, created_at
        FROM students
        ORDER BY id DESC
        LIMIT 5";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo json_encode([
        "status" => true,
        "data" => mysqli_fetch_all($result, MYSQLI_ASSOC)
    ]);
} else {
    echo json_encode([
        "status" => false,
        "data" => []
    ]);
}
