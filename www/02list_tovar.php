<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Список товаров';
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

            <h1>Список товаров</h1>


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
                                                      tl.id, 
                                                      tl.id_magazine, 
                                                      tl.id_tovar
                                                    from
                                                      mgz_tovar_list tl
                                                    order by tl.id;                
                                                ");

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Список товаров</caption>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>id_magazine</th>";
                echo "<th>id_tovar</th>";                
                echo "</tr>";

                //  Перемещает указатель результата на выбранную строку
                $res_tovar_list->data_seek(0);
                while ($row = $res_tovar_list->fetch_assoc()) 
                {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['id_magazine'] . "</td>";
                    echo "<td>" . $row['id_tovar'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</table>";
                $mysqli->close();

                echo "<pre class='code'>";
                echo "select <br>";
                echo "  tl.id, <br>";
                echo "  tl.id_magazine, <br>";
                echo "  tl.id_tovar <br>";
                echo "from <br>";
                echo "  tovar_list tl <br>";
                echo "order by tl.id; <br>";
                echo "</pre>";                
            ?>                               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>