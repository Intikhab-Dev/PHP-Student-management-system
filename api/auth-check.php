<?php
include 'config.php';
include 'db.php';

/* get headers */
$headers = getallheaders();

/* token check */
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode([
        'status' => false,
        'message' => 'Unauthorized: Token missing'
    ]);
    exit;
}

/* extract token */
$token = trim(str_replace('Bearer', '', $headers['Authorization']));

/* validate token */
$sql = "
    SELECT user_tokens.id, user_tokens.user_id
    FROM user_tokens
    WHERE token = '$token'
      AND is_active = 1
      AND expires_at > NOW()
    LIMIT 1
";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) === 0) {
    http_response_code(401);
    echo json_encode([
        'status' => false,
        'message' => 'Unauthorized: Token expired or invalid'
    ]);
    exit;
}

/* authenticated user */
$authUser = mysqli_fetch_assoc($result);
