<?php
include 'config.php';
include 'db.php';

$sql = "SELECT course, COUNT(*) AS total
        FROM students
        GROUP BY course";

$result = mysqli_query($conn, $sql);

echo json_encode([
    "status" => true,
    "data" => mysqli_fetch_all($result, MYSQLI_ASSOC)
]);
