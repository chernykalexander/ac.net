<?php 

require( 'satellite/setup.php' );

$MagCheckPokupki = new ClassMagazine();

// Дадим странице имя
$MagCheckPokupki->assign( 'page_title', 'Чек покупки' );
// Подключим скрипт JS
$MagCheckPokupki->assign( 'scriptjs', 'js/06check_pokupki_edit.js' );

// Соединяемся с БД
$MagCheckPokupki->ConnectDB();

// Запрос к БД
$MagCheckPokupki->SetQueryDB( '
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
    order by ch.id asc
' );

// Получим html-код таблицы
$MagCheckPokupki->GetTable();

// Получим текст запроса
$MagCheckPokupki->GetQueryDB();

// Получим и отрисуем управляющую форму
$MagCheckPokupki->GetFormControl();


// 
// НАЧАЛО: построение диалоговой формы
// 

// Получить шаблон - шапка диалоговой формы
$MagCheckPokupki->GetFormDialogHeader();

// Получим список товаров для тега <select><option>
$MagCheckPokupki->SetQueryDB( '
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
$MagCheckPokupki->assign( 'select_pokupki', $MagCheckPokupki->GetOptionSelect() );


// Получим список магазинов для тега <select><option>
$MagCheckPokupki->SetQueryDB( '
    select 
        t.id, 
        t.descr 
    from mgz_tovar t
    order by t.id
' );
$MagCheckPokupki->assign( 'select_tovar', $MagCheckPokupki->GetOptionSelect() );


$MagCheckPokupki->assign( 'form_dialog_element', 'build/templates/06check_pokupki_forma.tpl' );


// Получить шаблон - подвал диалоговой формы
$MagCheckPokupki->GetFormDialogFooter();

// 
// КОНЕЦ: построение диалоговой формы
// 


// Закрываем сессию с БД
$MagCheckPokupki->DisconnectDB();

// Вызываем шаблон
$MagCheckPokupki->display( 'template_main.tpl' );
// $MagCheckPokupki->display( 'form_control.tpl' );
