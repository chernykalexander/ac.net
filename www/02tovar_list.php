<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Список товаров';
            require_once( 'template/head.php' ); 
        ?>

    <script src="js/02tovar_list_edit.js"></script>
    
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

            <!-- Управляющие кнопки -->
            <form id="form_control">
                <input id="button_insert" type="button" value=" Добавить ">
                <input id="button_update" type="button" disabled value=" Изменить ">
                <input id="button_delete" type="button" disabled value=" Удалить ">
            </form>

            <!-- Диалоговая форма добавление изменение списка товара -->
            <form id="form_dialog" style="display: block">

                <strong>
                <p id="p_message"></p>
                </strong>

                <div>
                    <p><label for="input_id">ID: </label></p>
                    <p><input id="input_id" type="text" size="10" maxlength="10" disabled></p>
                </div>

<!--                 <div>
                    <p><label for="input_id_magazine">ID магазина </label></p>
                    <p><input id="input_id_magazine" type="text" size="10" maxlength="10" disabled></p>
                </div> -->





                <div>                
                    <p><label for="select_magazine">Справочник магазинов: </label></p>
                    <p> 
                       <select size="1" id="select_magazine">
                       <option value="none" selected disabled>Выберите магазин</option>
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

                    // Выбираем из таблицы mgz_tovar
                    $res = $mysqli->query('
                                            select 
                                                m.id, 
                                                m.descr 
                                            from mgz_magazine m
                                            order by m.id
                                        ');

                    //  Перемещает указатель результата на выбранную строку
                    $res->data_seek(0);
                    while ($row = $res->fetch_assoc()) 
                    {
                        echo '<option value="' . $row[ 'id' ] . '">' . $row[ 'descr' ] . '</option>';
                    }
                    $mysqli->close();
                    ?>
                    </select></p>
                </div>

<!--                 <div>
                    <p><label for="input_id_tovar">ID товара </label></p>
                    <p><input id="input_id_tovar" type="text" size="10" maxlength="10" disabled></p>
                </div> -->






                <div>                
                    <p><label for="select_tovar">Справочник товаров: </label></p>
                    <p> 
                       <select size="1" id="select_tovar">
                       <option value="none" selected disabled>Выберите товар</option>
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
                    </select></p>
                </div>

                <input id="button_ok" type="button"  value="    OK    ">
                <input id="button_cancel" type="button"  value=" Отмена ">
                <input id="button_test" type="button"  value=" Test ">
            </form>

            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>