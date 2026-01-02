<?php
 include 'config.php';
 include 'db.php';

    $data = json_decode(file_get_contents("php://input"), true);

    // $student_id = $data['s_id'];
    $student_id = isset($_GET['id']) ? $_GET['id'] : '';

    $sql = "SELECT * FROM students WHERE id = {$student_id}";

    $result = mysqli_query($conn, $sql) or die("SQL Query Failed.");

    if(mysqli_num_rows($result) > 0 ){
        $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($output);
    } else {
        echo json_encode(array('message' => 'No Records Found.', 'status' => false));
    }