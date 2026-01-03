<?php
include 'config.php';
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$mobile   = trim($data['mobile'] ?? '');
$password = trim($data['password'] ?? '');

if ($name == '' || $email == '' || $mobile == '' || $password == '') {
    echo json_encode([
        'status' => false,
        'message' => 'All fields are required'
    ]);
    exit;
}

/* check email already exists */
$check = "SELECT id FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $check);

if (mysqli_num_rows($result) > 0) {
    echo json_encode([
        'status' => false,
        'message' => 'Email already registered'
    ]);
    exit;
}

/* hash password */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

/* insert user */
$sql = "INSERT INTO users (name, email, mobile, password)
        VALUES ('$name', '$email', '$mobile', '$hashedPassword')";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        'status' => true,
        'message' => 'User registered successfully'
    ]);
} else {
    echo json_encode([
        'status' => false,
        'message' => 'Registration failed'
    ]);
}
