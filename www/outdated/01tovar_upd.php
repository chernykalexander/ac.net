<?php
    // request - запрос, полученные данные сервером
    // response - ответ сервера

    //  Установка/получение внутренней кодировки скрипта
    mb_internal_encoding( 'UTF-8' );

    // Вывод на экран текущей внутренней кодировки
    // echo mb_internal_encoding();

    // отключить вывод ошибок 
    ini_set( 'display_errors', 'Off' );

    // объевлем массив который будет содержать ответ сервера для клиента
    $response_server = array(
        response => 'Ответ сервера по умолчанию'
    );
    
    // читаем, сырые данные из потока post-запроса от клиента
    $request_stream_row = file_get_contents( 'php://input' );
    // декодируем эти данные из двоичных в json-формат (php-массив)
    $request_client = json_decode( $request_stream_row, true );

    
    // читаем настройки подключения к БД
    include '../config.php';

    // пытаемся подключиться к БД
    $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

    if ( $mysqli->connect_errno ) {        
        $response_server[ response ] = 'Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ';
        exit( json_encode( $response_server ) );
    };

    // Самый 100%ый код для 100%ого UTF-8 :D
    $mysqli->query( ' SET NAMES \'utf8\' ' ); 
    $mysqli->query( ' SET CHARACTER SET \'utf8\' ' );
    $mysqli->query( ' SET SESSION collation_connection = \'utf8_general_ci\' ' );

    
    // $mysqli->query(' update mgz_tovar
    //               set descr =  \' ' . 'NNNN' . '  \' , 
    //                   price = ' . 177 . '
    //               where id = ' . 24 .'; ');

    $mysqli->query(' update mgz_tovar
                  set descr =  \' ' . $request_client[ descr ] . '  \' , 
                      price = ' . $request_client[ price ] . '
                  where id = ' . $request_client[ id ] .'; ');

    // $mysqli->query(' update mgz_tovar
    //                   set descr = \' ' . $request_client[ descr ] . ' \',  '
    //                     ' price = ' . $request_client[ price ] . 
    //                  ' where id = ' . $request_client[ id ] . '; ');

    if ( $mysqli->error ) {        
        $response_server[ response ] = 'Не удалось выполнить UPDATE: (' . $request_client[ id ] . ') ';
        exit( json_encode( $response_server ) );
    };

    // записываем последний idшник только что добавленной строки
    $response_server[ response ] = 'Запись изменена успешно';
    
    // закрываем соединение
    $mysqli->close();
    
    // переводим php-массив в формат json и отправляем его клиенту
    echo json_encode( $response_server );



    // выводим содержимое переменной в файл
    // file_put_contents( 'log.txt', print_r( $response_server, true ) );