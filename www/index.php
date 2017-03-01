<?php 

require( 'satellite/setup.php' );

$MagIndex = new ClassMagazine();

$MagIndex->assign( 'page_title', 'Система управления магазином' );
$MagIndex->assign( 'main_text', file_get_contents( 'satellite/text_main.html' ) );

$MagIndex->display( 'template_main.tpl' );