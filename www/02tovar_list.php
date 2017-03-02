<?php 

require( 'satellite/setup.php' );

$MagTovarList = new ClassMagazine();

// Дадим странице имя
$MagTovarList->assign( 'page_title', 'Список товаров' );
// Подключим скрипт JS
$MagTovarList->assign( 'scriptjs', 'js/02tovar_list_edit.js' );

// Соединяемся с БД
$MagTovarList->ConnectDB();

// Запрос к БД
$MagTovarList->SetQueryDB( '
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
    order by tl.id
' );

// Получим html-код таблицы
$MagTovarList->GetTable();

// Получим текст запроса
$MagTovarList->GetQueryDB();

// Получим и отрисуем управляющую форму
$MagTovarList->GetFormControl();


// 
// НАЧАЛО: построение диалоговой формы
// 

// Получить шаблон - шапка диалоговой формы
$MagTovarList->GetFormDialogHeader();

// Получим список товаров для тега <select><option>
$MagTovarList->SetQueryDB( '
    select 
        m.id, 
        m.descr 
    from mgz_magazine m
    order by m.id
' );
$MagTovarList->assign( 'select_magazine', $MagTovarList->GetOptionSelect() );


// Получим список магазинов для тега <select><option>
$MagTovarList->SetQueryDB( '
    select 
        t.id, 
        t.descr 
    from mgz_tovar t
    order by t.id
' );
$MagTovarList->assign( 'select_tovar', $MagTovarList->GetOptionSelect() );


$MagTovarList->assign( 'form_dialog_element', 'build/templates/02tovar_list_forma.tpl' );


// Получить шаблон - подвал диалоговой формы
$MagTovarList->GetFormDialogFooter();

// 
// КОНЕЦ: построение диалоговой формы
// 


// Закрываем сессию с БД
$MagTovarList->DisconnectDB();

// Вызываем шаблон
$MagTovarList->display( 'template_main.tpl' );
// $MagTovarList->display( 'form_control.tpl' );
