<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Покупатели';
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

            <h1>Покупатели</h1>


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
                                                      c.id, 
                                                      c.fio
                                                    from
                                                      mgz_client c
                                                    order by c.id asc;
                                                ");

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Покупатели</caption>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>fio</th>";
                echo "</tr>";

                //  Перемещает указатель результата на выбранную строку
                $res_tovar_list->data_seek(0);
                while ($row = $res_tovar_list->fetch_assoc()) 
                {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['fio'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</table>";
                //$mysqli->close();

                echo "<pre class='code'>";
                echo "select <br>";
                echo "  c.id, <br>"; 
                echo "  c.fio, <br>";
                echo "from <br>";
                echo "  client c <br>";
                echo "order by c.id; <br>";
                echo "</pre>";                
            ?>                               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>