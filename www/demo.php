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

            <h1>Финансовые отчеты</h1>

            <h2>Финансовые отчеты</h2>
           
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
                $res = $mysqli->query("select tl.id, tl.id_magazine from mgz_tovar_list tl  ");

                /*
                $res = $mysqli->query("select
                                          tl.id, 
                                          tl.id_magazine, 
                                          m.descr_magazine,
                                          m.adresphone,
                                          tl.id_tovar,
                                          t.descr_tovar,
                                          t.price
                                        from 
                                          mgz_tovar_list tl 
                                          left outer join mgz_tovar t
                                          on tl.id_tovar = t.id
                                          left outer join mgz_magazine m 
                                          on tl.id_magazine = m.id
                                        order by tl.id"
                                    );
                */

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Таблица товаров</caption>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>id_magazine</th>";
                echo "<th>descr_magazine</th>";
                echo "<th>adresphone</th>";
                echo "<th>id_tovar</th>";
                echo "<th>descr_tovar</th>";
                echo "<th>price</th>";
                echo "</tr>";

                //  Перемещает указатель результата на выбранную строку
                $res->data_seek(0);
                while ($row = $res->fetch_assoc()) 
                {
                    echo "<tr>"; 
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['id_magazine'] . "</td>";
                    echo "<td>" . $row['descr_magazine'] . "</td>";
                    echo "<td>" . $row['adresphone'] . "</td>";
                    echo "<td>" . $row['id_tovar'] . "</td>";
                    echo "<td>" . $row['descr_tovar'] . "</td>";
                    echo "<td>" . $row['price'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</table>";
                $mysqli->close();

                echo "<pre class='code'>";
                echo "select <br>";
                echo "  tl.id, <br>";
                echo "  tl.id_magazine, <br>";
                echo "  m.descr_magazine, <br>";
                echo "  m.adresphone, <br>";
                echo "  tl.id_tovar, <br>";
                echo "  t.descr_tovar, <br>";
                echo "  t.price <br>";
                echo "from <br>";
                echo "  mgz_tovar_list tl <br>";
                echo "  left outer join mgz_tovar t <br>";
                echo "  on tl.id_tovar = t.id <br>";
                echo "  left outer join mgz_magazine m  <br>";
                echo "  on tl.id_magazine = m.id <br>";
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