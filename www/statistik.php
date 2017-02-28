<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Статистические отчеты';
            require_once( 'template/head.php' ); 
        ?>

    </head>

    <body>        

        <?php 
            require_once( 'template/header.php' ); 
        ?>        
        

        <div class="MainClass">

            <?php 
                require_once('template/sidebar.php'); 
            ?>        
     
            <div class="ContentClass">            

            <h1>Статистические отчеты</h1>            
           
            <?php
                echo '<h2>Самый щедрый клиент</h2>';

                include 'config.php'; 
                
                // Пытаемся подключиться к БД
                $mysqli = new mysqli( $dbHost, $dbUser, $dbPass, $dbName );
                if ($mysqli->connect_errno) {
                    echo 'Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error;
                }

                // Самый 100%ый код для 100%ого UTF-8 :D
                $mysqli->query( 'SET NAMES \'utf8\'' ); 
                $mysqli->query( 'SET CHARACTER SET \'utf8\'' );
                $mysqli->query( 'SET SESSION collation_connection = \'utf8_general_ci\'' );


                $res_money_client = $mysqli->query( '
                    select
                      c.fio,
                      sum(ch.kolichestvo * t.price) as summa
                    from
                      mgz_client c
                      right outer join mgz_pokupki p
                      on c.id = p.id_client
                      right outer join mgz_check ch
                      on p.id = ch.id_pokupki
                      left outer join mgz_tovar t
                      on ch.id_tovar = t.id
                    group by c.fio
                    order by summa desc;
                ' );

                echo '<table class=\'dbtable\' width=\'100%\' cellspacing=\'0\' border=\'1\'>';
                echo '<caption>Самый щедрый клиент</caption>';
                echo '<tr>';
                echo '<th>fio</th>';
                echo '<th>summa</th>';
                echo '</tr>';

                //  Перемещает указатель результата на выбранную строку
                $res_money_client->data_seek(0);
                while ($row = $res_money_client->fetch_assoc()) 
                {
                    echo '<tr>'; 
                    echo '<td>' . $row['fio'] . '</td>';
                    echo '<td>' . $row['summa'] . '</td>';
                    echo '</tr>';
                }
                echo '</table>';

                echo '<pre class=\'code\'>';
                echo 'select <br>';
                echo '  c.fio, <br>';
                echo '  sum(ch.kolichestvo * t.price) as summa <br>';
                echo 'from <br>';
                echo '  client c <br>';
                echo '  right outer join pokupki p <br>';
                echo '  on c.id = p.id_client <br>' 
                echo '  right outer join check ch <br>';
                echo '  on p.id = ch.id_pokupki <br>';
                echo '  left outer join tovar t <br>';
                echo '  on ch.id_tovar = t.id <br>';
                echo 'group by c.fio <br>';
                echo 'order by summa desc; <br>';
                echo '</pre>';

                // -------------------------------------------------------------------------------------------------------------
                echo '<br>';
                echo '<br>';
                echo '<br>';
                // -------------------------------------------------------------------------------------------------------------

                echo '<h2>Какой доход мы получили от каждого товара?</h2>';

                $res_dohod_tovar = $mysqli->query('
                                                    select
                                                      t.id,
                                                      t.descr,
                                                      t.price,  
                                                      (select sum(c.kolichestvo) 
                                                      from mgz_check c 
                                                      where c.id_tovar = t.id)
                                                      * t.price as summa_dohoda
                                                    from mgz_tovar t
                                                    order by summa_dohoda desc;
                                                 ');

                echo '<table class=\'dbtable\' width=\'100%\' cellspacing=\'0\' border=\'1\'>';
                echo '<caption>Какой доход мы получили от каждого товара?</caption>';
                echo '<tr>';
                echo '<th>id</th>';
                echo '<th>descr</th>';
                echo '<th>price</th>';
                echo '<th>summa_dohoda</th>';
                echo '</tr>';

                //  Перемещает указатель результата на выбранную строку
                $res_dohod_tovar->data_seek(0);
                while ($row = $res_dohod_tovar->fetch_assoc()) 
                {
                    echo '<tr>'; 
                    echo '<td>' . $row['id'] . '</td>';
                    echo '<td>' . $row['descr'] . '</td>';
                    echo '<td>' . $row['price'] . '</td>';
                    echo '<td>' . $row['summa_dohoda'] . '</td>';
                    echo '</tr>';
                }
                echo '</table>';

                echo '<pre class=\'code\'>';
                echo 'select <br>';
                echo '  t.id, <br>';
                echo '  t.descr, <br>';
                echo '  t.price, <br>';
                echo '  (select sum(c.kolichestvo) <br>';
                echo '  from mgz_check c <br>';
                echo '  where c.id_tovar = t.id) <br>';
                echo '  * t.price as summa_dohoda <br>';
                echo 'from tovar t <br>';
                echo 'order by summa_dohoda desc; <br>';
                echo '</pre>';

                // -------------------------------------------------------------------------------------------------------------
                echo '<br>';
                echo '<br>';
                echo '<br>';
                // -------------------------------------------------------------------------------------------------------------

                echo '<h2>Самый рентабельный магазин</h2>';

                $res_ren_magaz = $mysqli->query( '
                    select
                      m.descr,
                      sum(ch.kolichestvo * t.price) as summa
                    from
                      mgz_magazine m right outer join mgz_pokupki p
                      on m.id = p.id_magazine
                      right outer join mgz_check ch
                      on p.id = ch.id_pokupki
                      left outer join mgz_tovar t
                      on ch.id_tovar = t.id
                    group by m.descr
                    order by summa desc;
                ' );

                echo '<table class=\'dbtable\' width=\'100%\' cellspacing=\'0\' border=\'1\'>';
                echo '<caption>Самый рентабельный магазин</caption>';
                echo '<tr>';
                echo '<th>descr</th>';
                echo '<th>summa</th>';
                echo '</tr>';

                //  Перемещает указатель результата на выбранную строку
                $res_ren_magaz->data_seek(0);
                while ($row = $res_ren_magaz->fetch_assoc()) 
                {
                    echo '<tr>';
                    echo '<td>' . $row['descr'] . '</td>';
                    echo '<td>' . $row['summa'] . '</td>';
                    echo '</tr>';
                }
                echo '</table>';

                echo '<pre class=\'code\'>';
                echo 'select <br>';
                echo '  m.descr, <br>';
                echo '  sum(ch.kolichestvo * t.price) as summa <br>';
                echo 'from <br>';
                echo '  magazine m right outer join pokupki p <br>';
                echo '  on m.id = p.id_magazine <br>';
                echo '  right outer join check ch <br>';
                echo '  on p.id = ch.id_pokupki <br>';
                echo '  left outer join tovar t <br>';
                echo '  on ch.id_tovar = t.id <br>';
                echo 'group by m.descr <br>';
                echo 'order by summa desc; <br>';
                echo '</pre>';
            ?>

            </div>

        </div>        

<?php 
    require_once( 'template/footer.php' ); 
?>         
    </body>
</html>