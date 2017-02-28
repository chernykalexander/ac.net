<?php

// require_once( SMARTY_DIR . 'lib/smarty/Smarty.class.php' );
require_once( 'lib/smarty/Smarty.class.php' );

$smarty = new Smarty();

$smarty->template_dir = 'build/templates/';
$smarty->compile_dir = 'build/templates_c/';
$smarty->config_dir = 'build/configs/';
$smarty->cache_dir = 'build/cache/';

$smarty->assign('name', 'Катруська');

//** раскомментируйте следующую строку для отображения отладочной консоли
//$smarty->debugging = true;

$smarty->display('index.tpl');

exit;

?>



<!DOCTYPE html>
<html>

    <head>

        <?php
            $page_title = 'Система управления магазином';
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

            <h1>Структура базы данных</h1>

            <p>               
               <img id="ImgStructira" src="img/shema_struct2.png" align="center" alt="Структура базы данных">
            </p>

            <!-- This text -->
            <?php
                require_once( 'lib/smarty/Smarty.class.php' );
                $smarty = new Smarty();
            ?>

            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>