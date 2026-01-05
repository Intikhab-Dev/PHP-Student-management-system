<?php
 include 'config.php';
 include 'db.php';

    $data = json_decode(file_get_contents("php://input"), true);
    
    $student_name = $data['name'];
    $studdent_age = $data['age'];
    $student_email = $data['email'];
    $student_mobile = $data['mobile'];
    $student_cource = strtoupper($data['course']);
    $student_status = $data['status'];


    $sql = "INSERT INTO `students`( `name`, `age`, `email`, `mobile`, `course`, `status`) 
            VALUES ('{$student_name}', '{$studdent_age}', '{$student_email}', '{$student_mobile}', '{$student_cource}', '{$student_status}');";
            
    if(mysqli_query($conn, $sql)){
        echo json_encode(array('message' => 'Student Added Successfully.', 'status' => true));
    } else {
        echo json_encode(array('message' => 'Failed to add student.', 'status' => false));
    }