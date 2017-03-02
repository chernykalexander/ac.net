<?php 

require( 'satellite/setup.php' );

$MagMagazine = new ClassMagazine();

// Дадим странице имя
$MagMagazine->assign( 'page_title', 'Справочник магазинов' );
// Подключим скрипт JS
$MagMagazine->assign( 'scriptjs', 'js/03magazine_edit.js' );

// Соединяемся с БД
$MagMagazine->ConnectDB();

// Запрос к БД
$MagMagazine->SetQueryDB( '
    select
      m.id, 
      m.descr, 
      m.adresphone  
    from
      mgz_magazine m
    order by m.id;
' );

// Получим html-код таблицы
$MagMagazine->GetTable();

// Получим текст запроса
$MagMagazine->GetQueryDB();

// Получим и отрисуем управляющую форму
$MagMagazine->GetFormControl();


// 
// НАЧАЛО: построение диалоговой формы
// 

// Получить шаблон - шапка диалоговой формы
$MagMagazine->GetFormDialogHeader();

$MagMagazine->assign( 'form_dialog_element', 'build/templates/03magazine_forma.tpl' );

// Получить шаблон - подвал диалоговой формы
$MagMagazine->GetFormDialogFooter();

// 
// КОНЕЦ: построение диалоговой формы
// 


// Закрываем сессию с БД
$MagMagazine->DisconnectDB();

// Вызываем шаблон
$MagMagazine->display( 'template_main.tpl' );
// $MagMagazine->display( 'form_control.tpl' );
