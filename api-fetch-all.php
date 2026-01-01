<?php
 include 'config.php';
 include 'db.php';

    $sql = "SELECT * FROM students order by id DESC";

    $result = mysqli_query($conn, $sql) or die("SQL Query Failed.");

    if(mysqli_num_rows($result) > 0 ){
        $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($output);
    } else {
        echo json_encode(array('message' => 'No Records Found.', 'status' => false));
    }