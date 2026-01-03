<?php
include 'config.php';
include 'db.php';

/* get headers */
$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    echo json_encode([
        'status' => false,
        'message' => 'Token missing'
    ]);
    exit;
}

/* extract token */
$token = trim(str_replace('Bearer', '', $headers['Authorization']));

/* deactivate token */
$sql = "
    UPDATE user_tokens
    SET is_active = 0
    WHERE token = '$token'
";

if (mysqli_query($conn, $sql) && mysqli_affected_rows($conn) > 0) {
    echo json_encode([
        'status' => true,
        'message' => 'Logged out successfully'
    ]);
} else {
    echo json_encode([
        'status' => false,
        'message' => 'Invalid token'
    ]);
}
