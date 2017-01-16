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

            <h1>Справочник товаров</h1>


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

                // Выбираем из таблицы mgz_tovar
                $res = $mysqli->query("
                                        select 
                                            t.id, 
                                            t.descr, 
                                            t.price 
                                        from mgz_tovar t 
                                        order by t.id
                                    ");

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Справочник товаров</caption>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>descr</th>";
                echo "<th>price</th>";                
                echo "</tr>";
                //  Перемещает указатель результата на выбранную строку
                $res->data_seek(0);
                while ($row = $res->fetch_assoc()) 
                {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['descr'] . "</td>";
                    echo "<td>" . $row['price'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</table>";
                $mysqli->close();

                echo "<pre class='code'>";
                echo "select <br>";
                echo "    t.id, <br>";
                echo "    t.descr, <br>";
                echo "    t.price <br>";
                echo "from mgz_tovar t <br>";
                echo "order by t.id <br>";
                echo "</pre>";                
            ?>                               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>