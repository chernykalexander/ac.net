<?php
// if (isset($_POST['done']))
    echo "<h1>Результаты работы:</h1>";
    $strerror = "";


    if ( empty($_POST['descr']) ) {
        $strerror = "Введите название товара";
    }

    elseif ( empty($_POST['price']) ) {
        $strerror = "Укажите цену товара";
    
    } elseif ( !ctype_digit($_POST['price']) ) {
        $strerror = "Поле цена товара должно содержать только цифры";
    
    };


    if ( empty( $strerror ) ) 
    {


        include 'config.php'; 
        
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

        $result = $mysqli->query("
                                    insert into mgz_tovar(descr, price)
                                    values ('". $_POST['descr'] ."', '". $_POST['price'] . "')
                                ");


/*
        $result = $mysqli->query("
                                    insert into(descr, price)
                                    values ('Proverka', 123)
                                ");
*/

        //$result = mysql_query ("INSERT INTO dannye VALUES ('".$Pole1."', '".$Pole2."', '".$Pole3."', '".$Pole4."')");

        if ($result) { 
            echo "<p>Товар в базу данных успешно добавлен.</p>";
        };
        $mysqli->close();
    }
    else 
    {
        echo "<p>Ошибка.";
        echo $strerror;
        echo "<br>Товар в базу данных не добавлен.</p>";
    };

    echo '<p>Вернуться в <a href="/01tovar.php">справочник товаров</a></p>';
?>