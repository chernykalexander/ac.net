<?php
    // header("HTTP/1.1 404 Not Found");

    include '../config.php'; 
    
    
    // Пытаемся подключиться к БД
    $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($mysqli->connect_errno) {
        echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }
    //echo $mysqli->host_info . "<br>";                

    // Самый 100%ый код для 100%ого UTF-8 :D
    $mysqli->query(" SET NAMES 'utf8' "); 
    $mysqli->query(" SET CHARACTER SET 'utf8' ");
    $mysqli->query(" SET SESSION collation_connection = 'utf8_general_ci' ");


    // $f = fopen( 'php://input', 'r' );
    // $data_my_json = stream_get_contents($f)
    // $my_input = json_decode($f);
    

    $my_input = json_decode( file_get_contents( 'php://input' ), true );
    // $my_input = $_POST[ 'firstname' ];

    $tmp_firstname = $my_input[ 'firstname' ];
    $tmp_age = $my_input[ 'age' ];
    
    // $MyJSON = json_decode( $_POST[ 'JSONfullInfoArray' ] );
    // $tmp_firstname = $MyJSON[ 'firstname' ];
    // $tmp_age = $MyJSON[ 'age' ];
    
    // $tmp_firstname = $JSON[ 'firstname' ];
    // $tmp_age = $_POST[ 'age' ];
    
    // $tmp_firstname = $_POST['firstname']; 
    // $tmp_age = $_POST['age'];
    // $tmp_firstname = 'TestText4'; 
    // $tmp_age = 5;


    // Выбираем из таблицы mgz_tovar
    $res = $mysqli->query("
                            insert into mgz_test(firstname, age)
                            values('" . $tmp_firstname . "', " . $tmp_age . ") 
                        ");



    // if ($res) { 
    //     echo "<p>Товар в базу данных успешно добавлен.</p>";
    //     // $mysqli->close();
    // } else {
    //     echo "<p>Ошибка.";
    //     echo "<br>Товар в базу данных не добавлен.</p>";
    // };

    $mysqli->close();
    // echo '<p>Вернуться в <a href="/01tovar.php">справочник товаров</a></p>';

    // file_put_contents( 'test00.txt', $my_input );
    // file_put_contents( 'test01.txt', var_dump($my_input) );
    // file_put_contents( 'test02.txt', var_export ($my_input) );


     switch (json_last_error()) {
        case JSON_ERROR_NONE:
            $text_error_json = ' - Ошибок нет';
        break;
        case JSON_ERROR_DEPTH:
            $text_error_json = ' - Достигнута максимальная глубина стека';
        break;
        case JSON_ERROR_STATE_MISMATCH:
            $text_error_json = ' - Некорректные разряды или не совпадение режимов';
        break;
        case JSON_ERROR_CTRL_CHAR:
            $text_error_json = ' - Некорректный управляющий символ';
        break;
        case JSON_ERROR_SYNTAX:
            $text_error_json = ' - Синтаксическая ошибка, не корректный JSON';
        break;
        case JSON_ERROR_UTF8:
            $text_error_json = ' - Некорректные символы UTF-8, возможно неверная кодировка';
        break;
        default:
            $text_error_json = ' - Неизвестная ошибка';
        break;
    }

    echo '{';
    echo '  "one": "' . $text_error_json  .'",';
    echo '  "two": "Матрица. Перезагрузка",';
    echo '  "three": "Матрица. Революция"';
    echo '}';

?>