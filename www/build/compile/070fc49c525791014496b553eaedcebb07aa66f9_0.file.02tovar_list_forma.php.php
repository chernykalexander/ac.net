<?php
/* Smarty version 3.1.30, created on 2017-03-02 20:05:28
  from "Z:\home\ac.net\www\control\02tovar_list_forma.php" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_58b842c8b51db4_28065126',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '070fc49c525791014496b553eaedcebb07aa66f9' => 
    array (
      0 => 'Z:\\home\\ac.net\\www\\control\\02tovar_list_forma.php',
      1 => 1488470718,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58b842c8b51db4_28065126 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div>
    <p><label for="select_magazine">Справочник магазинов: </label></p>
    <p> 
       <select size="1" id="select_magazine">
       <option value="none" selected disabled>Выберите магазин</option>
    
       <?php echo $_smarty_tpl->tpl_vars['main_test']->value;?>



    <?php echo '<?php

    ';?>$MagTovarList->GetQueryDB();

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

    // Выбираем из таблицы mgz_magazine
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
    <?php echo '?>';?>




    </select>
    <span id="span_magazine" class="span_msg_err"></span>
    </p>
</div>

<div>                
    <p><label for="select_tovar">Справочник товаров: </label></p>
    <p> 
       <select size="1" id="select_tovar">
       <option value="none" selected disabled>Выберите товар</option>
    <?php echo '<?php
    ';?>include 'config.php'; 

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
    <?php echo '?>';?>
    </select>
    <span id="span_tovar" class="span_msg_err"></span>
    </p>
</div><?php }
}
