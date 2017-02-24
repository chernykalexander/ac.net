<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Справочник магазинов';
            require_once('template/head.php'); 
        ?>

        <script src="js/01magazine_edit.js"></script>

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

            <h1>Справочник магазинов</h1>


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
                                                      m.id, 
                                                      m.descr, 
                                                      m.adresphone  
                                                    from
                                                      mgz_magazine m
                                                    order by m.id;
                                                ");

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Справочник магазинов</caption>";
                echo "<tbody>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>descr</th>";
                echo "<th>adresphone</th>";                
                echo "</tr>";

                //  Перемещает указатель результата на выбранную строку
                $res_tovar_list->data_seek(0);
                while ($row = $res_tovar_list->fetch_assoc()) 
                {
                    echo "<tr>";
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['descr'] . "</td>";
                    echo "<td>" . $row['adresphone'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</tbody>";
                echo "</table>";
                $mysqli->close();

                echo "<pre class='code'>";
                echo "select <br>";
                echo "  m.id, <br>"; 
                echo "  m.descr, <br>";
                echo "  m.adresphone <br>";
                echo "from <br>";
                echo "  magazine m <br>";
                echo "order by m.id; <br>";
                echo "</pre>";                
            ?>                               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>