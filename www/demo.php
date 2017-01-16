<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Финансовые отчеты';
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
           
            <?php
                echo "<h2>Полный список товаров</h2>";

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


                $res_list_tovar = $mysqli->query("select
                                          tl.id, 
                                          tl.id_magazine, 
                                          m.descr as descr_magazine,
                                          m.adresphone,
                                          tl.id_tovar,
                                          t.descr as descr_tovar,
                                          t.price
                                        from 
                                          mgz_tovar_list tl 
                                          left outer join mgz_tovar t
                                          on tl.id_tovar = t.id
                                          left outer join mgz_magazine m 
                                          on tl.id_magazine = m.id
                                        order by tl.id "
                                    );

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Полный список товаров</caption>";
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
                $res_list_tovar->data_seek(0);
                while ($row = $res_list_tovar->fetch_assoc()) 
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
                //$mysqli->close();

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
                echo "  tovar_list tl <br>";
                echo "  left outer join tovar t <br>";
                echo "  on tl.id_tovar = t.id <br>";
                echo "  left outer join magazine m  <br>";
                echo "  on tl.id_magazine = m.id <br>";
                echo "order by tl.id; <br>";
                echo "</pre>";


                // -------------------------------------------------------------------------------------------------------------
                echo "<br>";                
                echo "<br>";                
                echo "<br>";                
                // -------------------------------------------------------------------------------------------------------------

                echo "<h2>Расшифровка чека покупки (только описание)</h2>";

                $res_check_pokupki = $mysqli->query("select 
                                          ch.id, 
                                          c.fio,  
                                          m.descr as descr_magaine,
                                          m.adresphone,
                                          p.data_pokupki,
                                          t.descr as descr_tovara,
                                          t.price,
                                          ch.kolichestvo
                                        from 
                                          mgz_check ch 
                                          left outer join mgz_tovar t
                                          on ch.id_tovar = t.id
                                          left outer join mgz_pokupki p
                                          on ch.id_pokupki = p.id
                                          left outer join mgz_client c
                                          on p.id_client = c.id
                                          left outer join mgz_magazine m
                                          on p.id_magazine = m.id
                                        order by ch.id; "
                                    );

                echo "<table class='dbtable' width='100%'' cellspacing='0' border='1'>";
                echo "<caption>Расшифровка чека покупки (только описание)</caption>";
                echo "<tr>";
                echo "<th>id</th>";
                echo "<th>fio</th>";
                echo "<th>descr_magazine</th>";
                // echo "<th>adresphone</th>";
                echo "<th>data_pokupki</th>";
                echo "<th>descr_tovara</th>";
                echo "<th>price</th>";
                echo "<th>kolichestvo</th>";
                echo "</tr>";

                //  Перемещает указатель результата на выбранную строку
                $res_check_pokupki->data_seek(0);
                while ($row = $res_check_pokupki->fetch_assoc()) 
                {
                    echo "<tr>"; 
                    echo "<td>" . $row['id'] . "</td>";
                    echo "<td>" . $row['fio'] . "</td>";
                    echo "<td>" . $row['descr_magaine'] . "</td>";
                    // echo "<td>" . $row['adresphone'] . "</td>";
                    echo "<td>" . $row['data_pokupki'] . "</td>";
                    echo "<td>" . $row['descr_tovara'] . "</td>";
                    echo "<td>" . $row['price'] . "</td>";
                    echo "<td>" . $row['kolichestvo'] . "</td>";
                    echo "</tr>";                    
                }
                echo "</table>";
                $mysqli->close();

                echo "<pre class='code'>";                
                echo "select <br>";
                echo "  ch.id, <br>";
                echo "  c.fio, <br>"; 
                echo "  m.descr as descr_magaine, <br>";
                // echo "  m.adresphone, <br>";
                echo "  p.data_pokupki, <br>";
                echo "  t.descr as descr_tovara, <br>";
                echo "  t.price, <br>";
                echo "  ch.kolichestvo <br>";
                echo "from <br>";
                echo "  mgz_check ch <br>";
                echo "  left outer join mgz_tovar t <br>";
                echo "  on ch.id_tovar = t.id <br>";
                echo "  left outer join mgz_pokupki p <br>";
                echo "  on ch.id_pokupki = p.id <br>";
                echo "  left outer join mgz_client c <br>";
                echo "  on p.id_client = c.id <br>";
                echo "  left outer join mgz_magazine m <br>";
                echo "  on p.id_magazine = m.id <br>";
                echo "order by ch.id; <br>";
                echo "</pre>";                
            ?>

            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>