<?php
    // header("HTTP/1.1 404 Not Found");

    include '../config.php'; 

    $rowTovar = file_get_contents( 'php://input' ); //($_POST doesn't work here)
    $responseTovar = json_decode( $rowTovar, true ); // decoding received JSON to array

    // file_put_contents( 'log.txt', print_r( $myoutput, true ) );

  
    // Пытаемся подключиться к БД
    $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($mysqli->connect_errno) {
        echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }

    // Самый 100%ый код для 100%ого UTF-8 :D
    $mysqli->query(" SET NAMES 'utf8' "); 
    $mysqli->query(" SET CHARACTER SET 'utf8' ");
    $mysqli->query(" SET SESSION collation_connection = 'utf8_general_ci' ");

    $res = $mysqli->query("
                            insert into mgz_tovar(descr, price)
                            values('" . $responseTovar[ 'descr' ] . "', " 
                                      . $responseTovar[ 'price' ] . ") 
                        ");

    $mysqli->close();



    $mas = array(
    'two' => 'Матрица. Перезагрузка',
    'half' => 'Матрица. Революция',
    'three' => 'Матрица. Особенности'
    );
    
    // $mas = array(
    // 'two' => 'bbb',
    // 'half' => 'sss',
    // 'three' => 'sss'
    // );
    
    echo json_encode($mas);   


?>