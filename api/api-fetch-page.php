<?php
include 'auth-check.php';
include 'config.php';
include 'db.php';

    $page  = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;

    $page  = ($page < 1) ? 1 : $page;
    $limit = ($limit < 1) ? 5 : $limit;

    $offset = ($page - 1) * $limit;

    /* Total records */
    $countSql = "SELECT COUNT(*) AS total FROM students";
    $countResult = mysqli_query($conn, $countSql);
    $countRow = mysqli_fetch_assoc($countResult);

    $totalRecords = (int)$countRow['total'];
    $totalPages   = ceil($totalRecords / $limit);

    /* Fetch paginated data */
    $sql = "SELECT * FROM students 
            ORDER BY id DESC 
            LIMIT $limit OFFSET $offset";

    $result = mysqli_query($conn, $sql) or die("SQL Query Failed.");

    if (mysqli_num_rows($result) > 0) {

        $output = mysqli_fetch_all($result, MYSQLI_ASSOC);

        echo json_encode([
            "status" => true,
            "page" => $page,
            "limit" => $limit,
            "total_records" => $totalRecords,
            "total_pages" => $totalPages,
            "data" => $output
        ]);

    } else {
        echo json_encode([
            "status" => false,
            "message" => "No Records Found.",
            "data" => []
        ]);
    }
