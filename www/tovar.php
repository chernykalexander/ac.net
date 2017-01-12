<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Справочник товаров';
            require_once('template/head.php'); 
        ?>

    </head>

    <body>        

        <?php 
            require_once('template/header.php'); 
        ?>        
        

        <div class="MainClass">

            <?php 
                require_once('template/sidebar.php'); 
            ?>        
     
            <div class="ContentClass">            

            <h1><?php $page_title ?></h1>


            <?php 
                $dbHost = 'localhost'; // чаще всего это так, но иногда требуется прописать ip адрес базы данных
                $dbUser = 'user_magazine'; // пользователь базы данных
                $dbPass = 'line9dom5'; // пароль пользователя
                $dbName = 'db_magazine'; // название вашей базы
                
                /*
                $myConnect = mysql_connect($dbHost, $dbUser, $dbPass));
                mysql_select_db($dbName, $myConnect);
                */

                // Пытаемся подключиться к БД
                $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
                if ($mysqli->connect_errno) {
                    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
                }
                echo $mysqli->host_info . "<br>";                

                // Самый 100%ый код для 100%ого UTF-8 :D
                /*
                mysql_query("SET NAMES 'utf8'"); 
                mysql_query("SET CHARACTER SET 'utf8'");
                mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");
                */

                // Выбираем из таблицы mgz_tovar
                $res = $mysqli->query("SELECT id, descr, price FROM mgz_tovar ORDER BY id ASC");

                echo "<table>";
                //  Перемещает указатель результата на выбранную строку
                $res->data_seek(0);
                while ($row = $res->fetch_assoc()) 
                {
                    echo " id = " . $row['id'] . "<br>";
                }
                echo "</table>";
                $mysqli->close();
            ?>                               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>