<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Чек покупки';
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

            <h1>Чек покупки</h1>


            <?php
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

                // Выбираем из таблицы mgz_tovar_list
                $res_tovar_list = $mysqli->query("
                                                    select
                                                      ch.id, 
                                                      ch.id_pokupki, 
                                                      ch.id_tovar, 
                                                      ch.kolichestvo
                                                    from
                                                      mgz_check ch
                                                    order by ch.id asc;
                                                ");

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Чек покупки</caption>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>id_pokupki</th>";
                echo "<th>id_tovar</th>";
                echo "<th>kolichestvo</th>";
                echo "</tr>";

                //  Перемещает указатель результата на выбранную строку
                $res_tovar_list->data_seek(0);
                while ($row = $res_tovar_list->fetch_assoc()) 
                {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['id_pokupki'] . "</td>";
                    echo "<td>" . $row['id_tovar'] . "</td>";
                    echo "<td>" . $row['kolichestvo'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</table>";
                //$mysqli->close();

                echo "<pre class='code'>";

                echo "selectselect <br>";
                echo "select  ch.id, <br>";
                echo "select  ch.id_pokupki, <br>";
                echo "select  ch.id_tovar, <br>";
                echo "select  ch.kolichestvo <br>";
                echo "selectfrom <br>";
                echo "select  check ch <br>";
                echo "selectorder by ch.id asc; <br>";
                echo "</pre>";                
            ?>                               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>