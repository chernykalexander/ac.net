<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Спсиок покупок';
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

            <h1>Спсиок покупок</h1>


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
                                                      p.id, 
                                                      p.id_client, 
                                                      p.id_magazine, 
                                                      p.data_pokupki
                                                    from
                                                      mgz_pokupki p
                                                    order by p.id asc;
                                                ");

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Спсиок покупок</caption>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>id_client</th>";
                echo "<th>id_magazine</th>";
                echo "<th>data_pokupki</th>";
                echo "</tr>";

                //  Перемещает указатель результата на выбранную строку
                $res_tovar_list->data_seek(0);
                while ($row = $res_tovar_list->fetch_assoc()) 
                {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['id_client'] . "</td>";
                    echo "<td>" . $row['id_magazine'] . "</td>";
                    echo "<td>" . $row['data_pokupki'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</table>";
                //$mysqli->close();

                echo "<pre class='code'>";
                echo "select <br>";
                echo "  p.id, <br>";
                echo "  p.id_client, <br>"; 
                echo "  p.id_magazine, <br>";
                echo "  p.data_pokupki <br>";
                echo "from <br>";
                echo "  pokupki p <br>";
                echo "order by p.id asc; <br>";
                echo "</pre>";                
            ?>                               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>