$( document ).ready( function(){

    // console.log( 'Hi hi hi' );
    var myvar = null;
    var TovarID = null;
    var TovarDescr = null;
    var TovarPrice = null;


    // При клике на строку таблицы
    $( 'table.dbtable tr' ).not( ':first' ).click( function() {
        
        // Если вызвана диалоговая форма добавить/изменить 
        // то переходить на другие строки нельзя
        if ( $( '#form_insert_update' ).is( ':visible' ) ) {
            return;
        };

        // Если задан вопрос удалять строку или нет 
        // то переходить на другие строки нельзя
        if ( $( '#form_delete' ).is( ':visible' ) ) {
            return;
        };

        // Красим строку
        $( 'table.dbtable tr' ).removeClass( 'marked' );
        $( this ).addClass( 'marked' );

        // поскольку строка выбрана то кнопки изменить и удалить активны
        $( '#button_update' ).removeAttr( 'disabled' );
        $( '#button_delete' ).removeAttr( 'disabled' );

        // Считываем значения из html таблицы
        TovarID = $( this ).find( 'td:eq(0)' ).html();
        TovarDescr = $( this ).find( 'td:eq(1)' ).html();
        TovarPrice = $( this ).find( 'td:eq(2)' ).html();
        myvar = String( TovarID ) + " - " + String( TovarDescr ) + " - " + String( TovarPrice );

        // Записываем эти значения в поля формы
        $( "input[name='id_input']" ).val( TovarID );
        $( "input[name='descr_input']" ).val( TovarDescr );
        $( "input[name='price_input']" ).val( TovarPrice );
        
        console.log( myvar );
    } );
    

    // Кнопки updata и delete активны только при выделенной записи
    // if ( $( 'table.dbtable' ).hasClass( 'marked' ) ) {
    //     console.log( 'Marked - найден' );
    //     // $( '#button_insert' ).removeAttr( 'disabled' );
    //     // $( '#button_update' ).removeAttr( 'disabled' );
    //     // $( '#button_delete' ).removeAttr( 'disabled' );
    //     $( '#button_insert' ).attr( 'disabled', false );
    //     $( '#button_update' ).attr( 'disabled', false );
    //     $( '#button_delete' ).attr( 'disabled', false );
    // } else {
    //     console.log( 'Нету маркед' );
    //     $( '#button_insert' ).attr( 'disabled', false );
    //     $( '#button_update' ).attr( 'disabled', true );
    //     $( '#button_delete' ).attr( 'disabled', true );
    // };


    // ************************************************************************************
    // *********************** Проверка данных *******************************************
    // ************************************************************************************
    function isCheckDataTovar() {
        //
        // Очищаем все <span>ы от ошибок
        $(' .msg_error ').text( '' );

        // Делаем валидацию для таблицы товаров
        if ( $( '#descr_input' ).val() === '' ) {
            $( '#descr_error' ).text( 'Описание товара не должно быть пустым' );
            $( '#descr_input' ).focus();
            return false;
        };

        if ( $( '#descr_input' ).val().length >= 30 ) {
            $( '#descr_error' ).text( 'Описание товара не должно быть слишком длинным' );
            $( '#descr_input' ).focus();
            return false;
        };

        if ( $( '#price_input' ).val() === '' ) {
            $( '#price_error' ).text( 'Цена товара должна быть заполнена' );
            $( '#price_input' ).focus();
            return false;
        };

        if ( ! $.isNumeric( $( '#price_input' ).val() ) )  {
            $( '#price_error' ).text( 'Цена товара это числовое значение' );
            $( '#price_input' ).focus();
            return false;
        };

        if ( + $( '#price_input' ).val() <= 0)  {
            $( '#price_error' ).text( 'Число должно быть положительным' );
            $( '#price_input' ).focus();
            return false;
        };

        // Все проверки пройдены
        return true;
    };


    // ************************************************************************************
    // *********************** Добавление запси *******************************************
    // ************************************************************************************
    $( '#button_insert' ).click( function() {

        $( '#button_insert' ).attr( 'disabled', true );
        $( '#button_update' ).attr( 'disabled', true );
        $( '#button_delete' ).attr( 'disabled', true );

        // Очищаем поля формы
        $( '#id_input' ).val( '' );
        $( '#descr_input' ).val( '' );
        $( '#price_input' ).val( '' );

        $( '#form_insert_update' ).show();
        
        $( '#button_ok' ).click( function() {
        
            if ( isCheckDataTovar() === true) {
                console.log( 'Товар успешно Добавлен' );
            } else {
                console.log( 'Товар содержит ошибку' );
            };

        } );

        $( '#button_cancel' ).click( function() {

            $( '#form_insert_update' ).hide();

        } );

    } );
    

    // ************************************************************************************
    // *********************** Изменение запси *******************************************
    // ************************************************************************************
    $( '#button_update' ).click( function() {

        $( '#button_insert' ).attr( 'disabled', true );
        $( '#button_update' ).attr( 'disabled', true );
        $( '#button_delete' ).attr( 'disabled', true );

        // Заполняем поля формы
        $( '#id_input' ).val( TovarID );
        $( '#descr_input' ).val( TovarDescr );
        $( '#price_input' ).val( TovarPrice );

        $( '#form_insert_update' ).show();

        $( '#button_ok' ).click( function() {
        
            console.log( 'Нажата кнопка ОК' );
            
            if ( isCheckDataTovar() === false) {
                return;
                console.log( 'Товар содержит ошибку' );
            } else {
                console.log( 'Товар успешно изменен' );
            };

        } );

        $( '#button_cancel' ).click( function() {
            console.log( 'Нажата кнопка Cancel' );
            $( '#form_insert_update' ).hide();
        } );

    } );
    

    // ************************************************************************************
    // *********************** Удаление запси *******************************************
    // ************************************************************************************
    $( '#button_delete' ).click( function() {
        
        $( '#button_insert' ).attr( 'disabled', true );
        $( '#button_update' ).attr( 'disabled', true );
        $( '#button_delete' ).attr( 'disabled', true );

        $( '#p_delete' ).text( 'id: ' + TovarID + ', ' + TovarDescr);
        $( '#form_delete' ).show();

        $( '#button_yes' ).click( function() {
            
            $( '#form_delete' ).hide();

            $( '#button_insert' ).removeAttr( 'disabled' );
            $( '#button_update' ).attr( 'disabled', true );
            $( '#button_delete' ).attr( 'disabled', true );

            $( 'table.dbtable tr' ).removeClass( 'marked' );

            TovarID = null;
            TovarDescr = null;
            TovarPrice = null;
        });

        $( '#button_no' ).click( function() {
            
            $( '#form_delete' ).hide();

            $( '#button_insert' ).removeAttr( 'disabled' );
            $( '#button_update' ).removeAttr( 'disabled' );
            $( '#button_delete' ).removeAttr( 'disabled' );

        });

    });


    // При клике на кнопку добавить
    // $( '#button_insert' ).on( 'click',
    //     function () 
    //     {
            
    //         // Очищаем все <span>ы от ошибок
    //         $(' .msg_error ').text( '' );

    //         // Делаем валидацию для таблицы товаров
    //         if ( $( '#descr_input' ).val() === '' ) {
    //             $( '#descr_error' ).text( 'Описание товара не должно быть пустым' );
    //             $( '#descr_input' ).focus();
    //             return false;
    //         };

    //         if ( $( '#descr_input' ).val().length >= 30 ) {
    //             $( '#descr_error' ).text( 'Описание товара не должно быть слишком длинным' );
    //             $( '#descr_input' ).focus();
    //             return false;
    //         };

    //         if ( $( '#price_input' ).val() === '' ) {
    //             $( '#price_error' ).text( 'Цена товара должна быть заполнена' );
    //             $( '#price_input' ).focus();
    //             return false;
    //         };

    //         if ( ! $.isNumeric( $( '#price_input' ).val() ) )  {
    //             $( '#price_error' ).text( 'Цена товара это числовое значение' );
    //             $( '#price_input' ).focus();
    //             return false;
    //         };

    //         if ( + $( '#price_input' ).val() <= 0)  {
    //             $( '#price_error' ).text( 'Число должно быть положительным' );
    //             $( '#price_input' ).focus();
    //             return false;
    //         };


            



    //         console.log( 'BEGIN------------------------------------------------' );

    //         dataSend = { "firstname": "Pascal", age: 15 };

    //         // $.ajax( {
    //         //   dataType: "json",
    //         //   url: 'model/01tovar_ins.php',
    //         //   data: JSON.stringify( dataSend ),
    //         //   success: function() {
    //         //         console.log( 'Ajax запрос выполнился успешно' );
    //         //     }
    //         // } );

    //         $.getJSON(
    //             'model/01tovar_ins.php',
    //             // { "firstname": "Pascal", "age": 15 },
    //             // Сериализация процесс перевода структуры данных в последовательность битов.
    //             // dataSend,
    //             // Сериализация процесс перевода структуры данных в последовательность битов.
    //             // dataSend,
    //             JSON.stringify( dataSend ), 
    //             function( dataReturned, statusReturned ) {
    //                 console.log( 'Ajax запрос выполнился успешно' );
    //             }
    //         )
    //             .done(function( json ) {
    //                 console.log( "JSON Data: " + json );
                    
    //                 var items = [];
    //                 $.each( json, function( key, val ) {
    //                   items.push( "<li id='" + key + "'>" + val + "</li>" );
    //                 });
                    
    //                 $( "<ul/>", {
    //                   "class": "my-new-list",
    //                   html: items.join( "" )
    //                 }).appendTo( "body" );

    //             })
    //             .fail(function( jqxhr, textStatus, error ) {
    //                 var err = textStatus + ", " + error;
    //                 console.log( "MY Request Failed: " + err );
    //                 // console.log( "Request Failed: " )
    //         });


    //         console.log( 'END--------------------------------------------------' );

    //         // $.ajax( 'model/01tovar_ins.php',
    //         // {
    //         //  type: 'POST',
    //         //  dataType: 'text', // json в каком формате получать данные
    //         //  data: 'firstname=Proverka2&age=16',
    //         //  success: function( mydata ) { 
    //         //      console.log( 'Ajax-запрос выполнился удачно ###' ); 
    //         //      console.log( 'От сервера прибыли дынные: ' + mydata ); 
    //         //  },
    //         //  error: function( mydata ) { 
    //         //      console.log( 'Попытка выполнить ajax-запрос провалилась ###' ); 
    //         //      console.log( 'От сервера прибыли дынные: ' + mydata ); 
    //         //  }
    //         // });
    //     }
    // );

    //alert(jQuery.fn.jquery);

    // $('table tr').on('click', function(e) {
    //  $('table tr').removeClass('marked');
    //  $(this).addClass('marked');
    // });
});