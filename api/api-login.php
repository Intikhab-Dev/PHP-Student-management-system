<?php
include 'config.php';
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if ($email == '' || $password == '') {
    echo json_encode([
        'status' => false,
        'message' => 'Email and password are required'
    ]);
    exit;
}

/* check user exists */
$sql = "SELECT id, name, password, status FROM users WHERE email = '$email' LIMIT 1";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) === 0) {
    echo json_encode([
        'status' => false,
        'message' => 'Invalid email or password'
    ]);
    exit;
}

$user = mysqli_fetch_assoc($result);

/* check active status */
if ($user['status'] != 1) {
    echo json_encode([
        'status' => false,
        'message' => 'Account is inactive'
    ]);
    exit;
}

/* verify password */
if (!password_verify($password, $user['password'])) {
    echo json_encode([
        'status' => false,
        'message' => 'Invalid email or password'
    ]);
    exit;
}

/* generate token */
$token = bin2hex(random_bytes(32));
$expiry = date('Y-m-d 00:00:00', strtotime('+1 day'));

/* save token */
$userId = $user['id'];
$insertToken = "
    INSERT INTO user_tokens (user_id, token, expires_at)
    VALUES ('$userId', '$token', '$expiry')
";

mysqli_query($conn, $insertToken);

/* success response */
echo json_encode([
    'status' => true,
    'message' => 'Login successful',
    'token' => $token,
    'user' => [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $email
    ]
]);
