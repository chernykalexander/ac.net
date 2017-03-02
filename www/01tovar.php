<?php 

require( 'satellite/setup.php' );

$MagTovar = new ClassMagazine();

// Дадим странице имя
$MagTovar->assign( 'page_title', 'Справочник товаров' );
// Подключим скрипт JS
$MagTovar->assign( 'scriptjs', 'js/01tovar_edit.js' );

// Соединяемся с БД
$MagTovar->ConnectDB();

// Запрос к БД
$MagTovar->SetQueryDB( '
    select 
        t.id, 
        t.descr, 
        t.price 
    from mgz_tovar t 
    order by t.id 
' );

// Получим html-код таблицы
$MagTovar->GetTable();

// Получим текст запроса
$MagTovar->GetQueryDB();

// Получим и отрисуем управляющую форму
$MagTovar->GetFormControl();


// 
// НАЧАЛО: построение диалоговой формы
// 

// Получить шаблон - шапка диалоговой формы
$MagTovar->GetFormDialogHeader();

$MagTovar->assign( 'form_dialog_element', 'build/templates/01tovar_forma.tpl' );

// $MagTovar->assign( 'form_dialog_element', file_get_contents( 'control/01tovar_forma.php' ) );

// Получить шаблон - подвал диалоговой формы
$MagTovar->GetFormDialogFooter();

// 
// КОНЕЦ: построение диалоговой формы
// 


// Закрываем сессию с БД
$MagTovar->DisconnectDB();

// Вызываем шаблон
$MagTovar->display( 'template_main.tpl' );
// $MagTovar->display( 'form_control.tpl' );
