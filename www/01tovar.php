<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Справочник товаров';
            require_once('template/head.php'); 
        ?>

    <script src="js/01tovar.js"></script>
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
                //$mysqli->close();

                echo "<pre class='code'>";
                echo "select <br>";
                echo "    t.id, <br>";
                echo "    t.descr, <br>";
                echo "    t.price <br>";
                echo "from tovar t <br>";
                echo "order by t.id <br>";
                echo "</pre>";                
            ?>                               

            <form id="control_grid">
                <input id="button_insert" type="button" value=" Добавить ">
                <input id="button_update" type="button" disabled value=" Изменить ">
                <input id="button_delete" type="button" disabled value=" Удалить ">
            </form>

            <!-- Форма добавление изменение товара -->
            <form id="form_insert_update">
                
                <p><strong>Детальное описание товара:</strong></p>
                <div>
                    <p><label for="id_input">ID: </label></p>
                    <p><input id="id_input" type="text" size="10" maxlength="10" disabled></p>
                </div>
                <div>                
                    <p><label for="descr_input">Описание: </label></p>
                    <p>
                        <input id="descr_input" type="text" size="30" maxlength="30" title="От 1 до 30 символов">
                        <span id="descr_error" class="msg_error"></span>
                    </p>
                </div>
                <div>
                    <p><label for="price_input">Цена: </label></p>
                    <p>
                        <input id="price_input" type="text" size="10" maxlength="10" title="Цена должна быть положительной">
                        <span id="price_error" class="msg_error"></span>
                    </p> 
                </div>

                <input id="button_ok" type="button"  value="    OK    ">
                <input id="button_cancel" type="button"  value=" Отмена ">
            </form>
            
            <!-- Форма удаления товара -->
            <form id="form_delete">            
                <p><strong>Вы действительно хотите удалить товар?</strong></p>
                <p id="p_delete"></p>
                <input id="button_yes" type="button"  value="  Да  ">
                <input id="button_no" type="button"  value=" Нет ">
            </form>

            </div>
        </div>        
<?php 
    require_once('template/footer.php');
?>    
    </body>
</html>