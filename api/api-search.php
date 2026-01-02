<?php
 include 'config.php';
 include 'db.php';

    $data = json_decode(file_get_contents("php://input"), true);
    
    // $search_term = $data['search'];
    $search_term = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';

    if(!empty($search_term)) {
        $sql = "SELECT * FROM students WHERE name LIKE '%{$search_term}%' OR email LIKE '%{$search_term}%' OR course LIKE '%{$search_term}%' order by id DESC limit 50";

        $result = mysqli_query($conn, $sql) or die("SQL Query Failed.");

        if(mysqli_num_rows($result) > 0 ){
            $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($output);
        } else {
            echo json_encode(array('message' => 'No Search Found.', 'status' => false));
        }
    }else{
        echo json_encode(array('message' => 'Search term is empty.', 'status' => false));
    }
