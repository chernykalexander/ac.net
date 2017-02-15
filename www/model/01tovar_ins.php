<?php
    // header("HTTP/1.1 404 Not Found");

    include '../config.php'; 

    // $json = json_decode( $_POST[ 'data' ] );
    // file_put_contents( 'test00.txt', $json );

    // directions = json_decode($_POST['json']);
    // var_dump(directions);

    $str_json = file_get_contents( 'php://input' ); //($_POST doesn't work here)
    $response = json_decode( $str_json, true ); // decoding received JSON to array

    $tmp_firstname = $response[ 'firstname' ];
    $tmp_age = $response[ 'age' ];

    $myoutput = $response;
    // $myoutput = $response[ 'age' ];
    
    // $myoutput = json_decode( $_POST );
    // $myoutput = json_decode( $_POST[ 'json' ] );
    // $myoutput = $_POST;
    // $myoutput = $_POST[ 'json' ];


    file_put_contents( 'log.txt', print_r( $myoutput, true ) );


    // file_put_contents( 'log.txt', print_r( $_POST, true ) );
    // file_put_contents( 'test00.txt', $_POST );
    
    // Пытаемся подключиться к БД
    $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($mysqli->connect_errno) {
        echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }

    // Самый 100%ый код для 100%ого UTF-8 :D
    $mysqli->query(" SET NAMES 'utf8' "); 
    $mysqli->query(" SET CHARACTER SET 'utf8' ");
    $mysqli->query(" SET SESSION collation_connection = 'utf8_general_ci' ");

    // $tmp_firstname = $my_input[ 'firstname' ];
    // $tmp_age = $my_input[ 'age' ];

    // $my_json_php = json_decode($_POST['myJson']);

    // $tmp_firstname = $_POST[ 'firstname' ];
    // $tmp_age = $_POST[ 'age' ];

    $res = $mysqli->query("
                            insert into mgz_test(firstname, age)
                            values('" . $tmp_firstname . "', " . $tmp_age . ") 
                        ");

    $mysqli->close();



    //echo $mysqli->host_info . "<br>";
    // $f = fopen( 'php://input', 'r' );
    // $data_my_json = stream_get_contents($f)
    // $my_input = json_decode($f);
    

    // $my_input = json_decode( file_get_contents( 'php://input' ), true );
    // $my_input = $_POST[ 'firstname' ];

    
    // $MyJSON = json_decode( $_POST[ 'JSONfullInfoArray' ] );
    // $tmp_firstname = $MyJSON[ 'firstname' ];
    // $tmp_age = $MyJSON[ 'age' ];
    
    // $tmp_firstname = $JSON[ 'firstname' ];
    // $tmp_age = $_POST[ 'age' ];
    
    // $tmp_firstname = $_POST['firstname']; 
    // $tmp_age = $_POST['age'];
    // $tmp_firstname = 'TestText4'; 
    // $tmp_age = 5;




    // if ($res) { 
    //     echo "<p>Товар в базу данных успешно добавлен.</p>";
    //     // $mysqli->close();
    // } else {
    //     echo "<p>Ошибка.";
    //     echo "<br>Товар в базу данных не добавлен.</p>";
    // };

    // echo '<p>Вернуться в <a href="/01tovar.php">справочник товаров</a></p>';

    // file_put_contents( 'test00.txt', $_POST );
    // file_put_contents( 'test01.txt', var_dump($my_input) );
    // file_put_contents( 'test02.txt', var_export ($my_input) );


    //  switch (json_last_error()) {
    //     case JSON_ERROR_NONE:
    //         $text_error_json = ' - Ошибок нет';
    //     break;
    //     case JSON_ERROR_DEPTH:
    //         $text_error_json = ' - Достигнута максимальная глубина стека';
    //     break;
    //     case JSON_ERROR_STATE_MISMATCH:
    //         $text_error_json = ' - Некорректные разряды или не совпадение режимов';
    //     break;
    //     case JSON_ERROR_CTRL_CHAR:
    //         $text_error_json = ' - Некорректный управляющий символ';
    //     break;
    //     case JSON_ERROR_SYNTAX:
    //         $text_error_json = ' - Синтаксическая ошибка, не корректный JSON';
    //     break;
    //     case JSON_ERROR_UTF8:
    //         $text_error_json = ' - Некорректные символы UTF-8, возможно неверная кодировка';
    //     break;
    //     default:
    //         $text_error_json = ' - Неизвестная ошибка';
    //     break;
    // }

    // echo '{';
    // echo '  "two": "Матрица. Перезагрузка",';
    // echo '  "half": "Матрица. Революция"';
    // echo '  "three": "Матрица. Революция"';
    // echo '}';


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