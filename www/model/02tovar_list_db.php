<?php
    // request - запрос, полученные данные сервером от клиента
    // response - ответ сервера

    //  Установка/получение внутренней кодировки скрипта
    mb_internal_encoding( 'UTF-8' );

    // Вывод на экран текущей внутренней кодировки
    // echo mb_internal_encoding();

    // отключить вывод ошибок 
    ini_set( 'display_errors', 'Off' );

    // объевлем массив который будет содержать ответ сервера для клиента
    $response_server = array(
        'id' => null,
        'message' => null,
        'error' => false
    );
   
    // читаем, сырые данные из потока post-запроса от клиента
    $request_stream_row = file_get_contents( 'php://input' );
    // декодируем эти данные из двоичных в json-формат (php-массив)
    $request_client = json_decode( $request_stream_row, true );

    
    // читаем настройки подключения к БД
    include '../config.php';

    // пытаемся подключиться к БД
    $mysqli = new mysqli( $dbHost, $dbUser, $dbPass, $dbName );

    if ( $mysqli->connect_errno ) {        
        $response_server[ message ] = 'Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ';
        $response_server[ error ] = true;
        exit( json_encode( $response_server ) );
    };

    // Самый 100%ый код для 100%ого UTF-8 :D
    $mysqli->query( ' SET NAMES \'utf8\' ' ); 
    $mysqli->query( ' SET CHARACTER SET \'utf8\' ' );
    $mysqli->query( ' SET SESSION collation_connection = \'utf8_general_ci\' ' );


    // тип операции: insert, update, delete
    switch ( $request_client[ manipulation ] ) {
        
            
        case 'insert':
            
            $mysqli->query(' insert into mgz_tovar_list(id_magazine, id_tovar)
                            values(\'' . $request_client[ id_magazine ] .  '\',  '
                                       . $request_client[ id_tovar ] . '); ');

            if ( $mysqli->error ) {        
                $response_server[ message ] = 'Не удалось выполнить INSERT INTO: (' . $mysqli->error . ') ';
                $response_server[ error ] = true;
                // exit( json_encode( $response_server ) );
            } else {
                // записываем последний idшник только что добавленной строки
                $response_server[ id ] = $mysqli->insert_id;
                $response_server[ message ] = 'Добавлена новая запись с ID ' . $response_server[ id ];
            }

            break;
        
        case 'update':
            
            $mysqli->query(' update mgz_tovar_list
                          set id_magazine =  \'' . $request_client[ id_magazine ] . '\' , 
                              id_tovar = ' . $request_client[ id_tovar ] . '
                          where id = ' . $request_client[ id ] .'; ');

            if ( $mysqli->error ) {        
                $response_server[ message ] = 'Не удалось выполнить UPDATE: (' . $request_client[ id ] . ') ';
                $response_server[ error ] = true;
                // exit( json_encode( $response_server ) );
            } else {
                // записываем последний idшник только что добавленной строки
                $response_server[ message ] = 'Запись с ID ' . $request_client[ id ] . ' изменена успешно';
            };

            break;

        case 'delete':
            
            $mysqli->query(' delete from mgz_tovar_list where id = ' . $request_client[ id ] . '; ' );

            if ( $mysqli->error ) {        
                $response_server[ message ] = 'Не удалось выполнить DELETE: (' . $request_client[ id ] . ') ';
                $response_server[ error ] = true;
                // exit( json_encode( $response_server ) );
            } else {
                // записываем последний idшник только что добавленной строки
                $response_server[ message ] = 'Запись с ID ' . $request_client[ id ] . ' удалена успешно';
            };

            break;
    };
        
    // закрываем соединение
    $mysqli->close();
    
    // переводим php-массив в формат json и отправляем его клиенту
    echo json_encode( $response_server );

    // выводим содержимое переменной в файл
    // file_put_contents( 'log.txt', print_r( $response_server, true ) );
?>