<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Список товаров';
            require_once( 'template/head.php' ); 
        ?>

    </head>

    <body>        

        <?php 
            require_once( 'template/header.php' ); 
        ?>        
        

        <div class="MainClass">

            <?php 
                require_once( 'template/sidebar.php' ); 
            ?>
     
            <div class="ContentClass">            

            <h1>Список товаров</h1>


            <?php
                include 'config.php'; 
                
                // Пытаемся подключиться к БД
                $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
                if ($mysqli->connect_errno) {
                    echo 'Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error;
                }

                // Самый 100%ый код для 100%ого UTF-8 :D
                $mysqli->query( 'SET NAMES \'utf8\'' ); 
                $mysqli->query( 'SET CHARACTER SET \'utf8\'' );
                $mysqli->query( 'SET SESSION collation_connection = \'utf8_general_ci\'' );

                // Выбираем из таблицы mgz_tovar_list
                $res_tovar_list = $mysqli->query( '
                    select 
                      tl.id, 
                      tl.id_magazine as idm,
                      m.descr as mag_descr,
                      tl.id_tovar as idt,
                      t.descr as tov_descr
                    from 
                      mgz_tovar_list tl 
                      left outer join mgz_magazine m 
                      on tl.id_magazine = m.id
                      left outer join  mgz_tovar t 
                      on tl.id_tovar = t.id
                    order by tl.id; 
                ' );

                echo '<table class=\'dbtable\' width=\'100%\' cellspacing=\'0\' border=\'1\'>';
                echo '<caption>Список товаров</caption>';
                echo '<tbody>';
                echo '<tr>';
                echo '<th>id</th>';
                echo '<th>idm</th>';
                echo '<th>mag_descr</th>';                
                echo '<th>idt</th>';                
                echo '<th>tov_descr</th>';                
                echo '</tr>';

                //  Перемещает указатель результата на выбранную строку
                $res_tovar_list->data_seek(0);
                while ($row = $res_tovar_list->fetch_assoc()) 
                {
                    echo '<tr>';
                    echo '<td>' . $row[ 'id' ] . '</td>';
                    echo '<td>' . $row[ 'idm' ] . '</td>';
                    echo '<td>' . $row[ 'mag_descr' ] . '</td>';
                    echo '<td>' . $row[ 'idt' ] . '</td>';
                    echo '<td>' . $row[ 'tov_descr' ] . '</td>';
                    echo '</tr>';                    
                }
                echo '</tbody>';
                echo '</table>';
                $mysqli->close();

                echo '<pre class=\'code\'>';
                echo 'select <br>';
                echo '  tl.id, <br>';
                echo '  tl.id_magazine as idm, <br>';
                echo '  m.descr as mag_descr, <br>';
                echo '  tl.id_tovar as idt, <br>';
                echo '  t.descr as tov_descr <br>';
                echo 'from <br>';
                echo '  tovar_list tl <br>';
                echo '  left outer join  magazine m <br>';
                echo '  on tl.id_magazine = m.id <br>';
                echo '  left outer join tovar t <br>';
                echo '  on tl.id_tovar = t.id <br>';
                echo 'order by tl.id; <br>';
                echo '</pre>';

            ?>               


            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>