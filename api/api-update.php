<?php
 include 'config.php';
 include 'db.php';

    $data = json_decode(file_get_contents("php://input"), true);
    
    $student_id = $data['id'];
    $student_name = $data['name'];
    $studdent_age = $data['age'];
    $student_email = $data['email'];
    $student_mobile = $data['mobile'];
    $student_cource = strtoupper($data['course']);
    $studdent_status = $data['status'];

    $sql = "UPDATE students SET name='{$student_name}', age='{$studdent_age}',
                                email='{$student_email}', mobile='{$student_mobile}',
                                course='{$student_cource}', status='{$studdent_status}' WHERE id = {$student_id}";
                                
    if(mysqli_query($conn, $sql)){
        echo json_encode(array('message' => 'Student Updated Successfully.', 'status' => true));
    } else {
        echo json_encode(array('message' => 'Failed to update student.', 'status' => false));
    }