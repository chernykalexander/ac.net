<?php 

require( 'satellite/setup.php' );

$MagIndex = new ClassMagazine();

$MagIndex->assign( 'page_title', 'Система управления магазином' );
$MagIndex->assign( 'main_text', file_get_contents( 'satellite/text_main.html' ) );

$MagIndex->display( 'template_main.tpl' );

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
                // $smarty = new Smarty();
            ?>

            </div>

        </div>        

<?php 
    require_once('template/footer.php'); 
?>         
    </body>
</html>