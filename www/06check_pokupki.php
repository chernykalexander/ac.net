<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Чек покупки';
            require_once('template/head.php'); 
        ?>

    <script src="js/06check_pokupki_edit.js"></script>
    
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
                $mysqli = new mysqli( $dbHost, $dbUser, $dbPass, $dbName );
                if ( $mysqli->connect_errno ) {
                    echo 'Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error;
                }
                //echo $mysqli->host_info . "<br>";                

                // Самый 100%ый код для 100%ого UTF-8 :D
                $mysqli->query( 'SET NAMES \'utf8\'' ); 
                $mysqli->query( 'SET CHARACTER SET \'utf8\'' );
                $mysqli->query( 'SET SESSION collation_connection = \'utf8_general_ci\'' );

                // Выбираем из таблицы mgz_check
                $res_check_pokupki = $mysqli->query( '
                    select
                      ch.id as id, 
                      ch.id_pokupki as idp,
                      concat(SUBSTRING_INDEX(c.fio, \' \', 1), \'/\', m.descr) as cli_mag,
                      ch.id_tovar as idt, 
                      t.descr as des_tov,
                      ch.kolichestvo as kol
                    from 
                      mgz_check ch 
                      left outer join mgz_pokupki p
                      on ch.id_pokupki = p.id
                      left outer join mgz_client c
                      on p.id_client = c.id
                      left outer join mgz_magazine m
                      on p.id_magazine = m.id
                      left outer join mgz_tovar t
                      on ch.id_tovar = t.id
                    order by ch.id asc;
                ' );

                echo '<table id=\'dbtable\' width=\'100%\' cellspacing=\'0\' border=\'1\'>';
                echo '<caption>Чек покупки</caption>';
                echo '<tbody>';
                echo '<tr>';
                echo '<th>id</th>';
                echo '<th>idp</th>';
                echo '<th>cli_mag</th>';
                echo '<th>idt</th>';
                echo '<th>des_tov</th>';
                echo '<th>kol</th>';
                echo '</tr>';

                //  Перемещает указатель результата на выбранную строку
                $res_check_pokupki->data_seek(0);
                while ($row = $res_check_pokupki->fetch_assoc()) 
                {
                    echo '<tr>';
                    echo '<td>' . $row[ 'id' ] . '</td>';
                    echo '<td>' . $row[ 'idp' ] . '</td>';
                    echo '<td>' . $row[ 'cli_mag' ] . '</td>';
                    echo '<td>' . $row[ 'idt' ] . '</td>';
                    echo '<td>' . $row[ 'des_tov' ] . '</td>';
                    echo '<td>' . $row[ 'kol' ] . '</td>';
                    echo '</tr>';
                };
                echo '</tbody>';
                echo '</table>';
                $mysqli->close();

                echo '<pre class=\'code\'>';
                echo 'select <br>';
                echo '  ch.id as id, <br>';
                echo '  ch.id_pokupki as idp, <br>';
                echo '  concat(SUBSTRING_INDEX(c.fio, \' \', 1), \'/\', m.descr) as cli_mag, <br>';
                echo '  ch.id_tovar as idt, <br>';
                echo '  t.descr as des_tov, <br>';
                echo '  ch.kolichestvo as kol <br>';
                echo 'from  <br>';
                echo '  mgz_check ch <br>';
                echo'  left outer joi n mgz_pokupki p <br>';
                echo'  on ch.id _pokupki = p.id <br>';
                echo'  left outer jo in mgz_client c <br>';
                echo'  on p.i d_client = c.id <br>';
                echo'  left outer join  mgz_magazine m <br>';
                echo'  on p.id_ magazine = m.id <br>';
                echo'  left outer j oin mgz_tovar t <br>';
                echo'  on ch. id_tovar = t.id <br>';
                echo'orde r by ch.id asc; <br>';
                echo '</pre>';
            ?>                               

            <!-- Управление строкой -->

            <!-- Управляющие кнопки -->
            <form id="form_control">
                <input id="button_insert" type="button" value=" Добавить ">
                <input id="button_update" type="button" disabled value=" Изменить ">
                <input id="button_delete" type="button" disabled value=" Удалить ">
            </form>

            <!-- Диалоговая форма добавление изменение списка товара -->
            <form id="form_dialog">

                <strong>
                <p id="p_message"></p>
                </strong>

                <div>
                    <p><label for="input_id">ID: </label></p>
                    <p><input id="input_id" type="text" size="10" maxlength="10" disabled></p>
                </div>

                <div>                
                    <p><label for="select_pokupki">Таблица покупок: </label></p>
                    <p> 
                       <select size="1" id="select_pokupki">
                       <option value="none" selected disabled>Выберите покупку</option>
                    <?php
                    include 'config.php'; 

                    // Пытаемся подключиться к БД
                    $mysqli = new mysqli( $dbHost, $dbUser, $dbPass, $dbName );
                    if ( $mysqli->connect_errno ) {
                        echo 'Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error;
                    }
                    
                    // Самый 100%ый код для 100%ого UTF-8 :D
                    $mysqli->query( 'SET NAMES \'utf8\'' );
                    $mysqli->query( 'SET CHARACTER SET \'utf8\'' );
                    $mysqli->query( 'SET SESSION collation_connection = \'utf8_general_ci\'' );

                    // Выбираем из таблицы mgz_tovar
                    $res = $mysqli->query( '
                        select
                          p.id as id,
                          concat(SUBSTRING_INDEX(c.fio, \' \', 1), \'/\', m.descr) as descr
                        from 
                          mgz_pokupki p
                          left outer join mgz_client c
                          on p.id_client = c.id
                          left outer join mgz_magazine m
                          on p.id_magazine = m.id
                    ' );

                    //  Перемещает указатель результата на выбранную строку
                    $res->data_seek(0);
                    while ($row = $res->fetch_assoc()) 
                    {
                        echo '<option value="' . $row[ 'id' ] . '">' . $row[ 'descr' ] . '</option>';
                    }
                    $mysqli->close();
                    ?>
                    </select>
                    <span id="span_pokupki" class="span_msg_err"></span>
                    </p>
                </div>

                <div>                
                    <p><label for="select_tovar">Справочник товаров: </label></p>
                    <p> 
                       <select size="1" id="select_tovar">
                       <option value="none" selected disabled>Выберите товар</option>
                    <?php
                    include 'config.php'; 

                    // Пытаемся подключиться к БД
                    $mysqli = new mysqli( $dbHost, $dbUser, $dbPass, $dbName );
                    if ( $mysqli->connect_errno ) {
                        echo 'Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error;
                    }
                    
                    // Самый 100%ый код для 100%ого UTF-8 :D
                    $mysqli->query( 'SET NAMES \'utf8\'' );
                    $mysqli->query( 'SET CHARACTER SET \'utf8\'' );
                    $mysqli->query( 'SET SESSION collation_connection = \'utf8_general_ci\'' );

                    // Выбираем из таблицы mgz_tovar
                    $res = $mysqli->query('
                                            select 
                                                t.id, 
                                                t.descr 
                                            from mgz_tovar t
                                            order by t.id
                                        ');

                    //  Перемещает указатель результата на выбранную строку
                    $res->data_seek(0);
                    while ($row = $res->fetch_assoc()) 
                    {
                        echo '<option value="' . $row[ 'id' ] . '">' . $row[ 'descr' ] . '</option>';
                    }
                    $mysqli->close();
                    ?>
                    </select>
                    <span id="span_tovar" class="span_msg_err"></span>
                    </p>
                </div>

                <div>
                    <p><label for="input_kolichestvo">Количество: </label></p>
                    <p>
                        <input id="input_kolichestvo" type="text" size="10" maxlength="10" title="Количество товара должно быть положительным числом">
                        <span id="span_kolichestvo" class="span_msg_err"></span>
                    </p> 
                </div>

                <input id="button_ok" type="button"  value="    OK    ">
                <input id="button_cancel" type="button"  value=" Отмена ">
            </form>

            <!-- Управление строкой -->            

            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>