<?php
 include 'config.php';
 include 'db.php';

    $data = json_decode(file_get_contents("php://input"), true);
    // $student_id = $data['s_id'];
    $student_id = isset($_GET['id']) ? $_GET['id'] : '';
    
    $sql = "DELETE FROM students WHERE id = {$student_id}";

    if(mysqli_query($conn, $sql)){
        echo json_encode(array('message' => 'Student Deleted Successfully.', 'status' => true));
    } else {
        echo json_encode(array('message' => 'Failed to delete student.', 'status' => false));
    }