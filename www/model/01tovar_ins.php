<?php
    include '../config.php'; 
    
    // Пытаемся подключиться к БД
    $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($mysqli->connect_errno) {
        echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }
    //echo $mysqli->host_info . "<br>";                

    // Самый 100%ый код для 100%ого UTF-8 :D
    $mysqli->query("SET NAMES 'utf8'"); 
    $mysqli->query("SET CHARACTER SET 'utf8'");
    $mysqli->query("SET SESSION collation_connection = 'utf8_general_ci'");

    // Выбираем из таблицы mgz_tovar
    $res = $mysqli->query("
                            insert into mgz_test(firstname)
                            values('sublime')
                        ");



    if ($res) { 
        echo "<p>Товар в базу данных успешно добавлен.</p>";
        // $mysqli->close();
    } else {
        echo "<p>Ошибка.";
        echo "<br>Товар в базу данных не добавлен.</p>";
    };

    $mysqli->close();
    echo '<p>Вернуться в <a href="/01tovar.php">справочник товаров</a></p>';
?>