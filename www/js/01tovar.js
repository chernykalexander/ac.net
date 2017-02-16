$( document ).ready( function() {

    // console.log( 'Hi hi hi' );
    
    // var myvar = null;
    // var TovarID = null;
    // var TovarDescr = null;
    // var TovarPrice = null;

    var tovar = {
        
        // Поля таблицы БД
        id: null,
        descr: null,
        price: null,
        
        // Очистить объект
        clearObj() {
            // 
            id = null;
            descr = null;
            price = null;
        },

        // Очистить форму
        clearForma() {
            // 
            $( '#id_input' ).val( '' );
            $( '#descr_input' ).val( '' );
            $( '#price_input' ).val( '' );
        },

        // Получить данные из формы и записать их в объект
        getForma() {
            // 
            id = $( '#id_input' ).val();
            descr = $( '#descr_input' ).val();
            price = $( '#price_input' ).val();
        },

        // Отправить данные из объекта в форму
        pushForma() {
            // 
            $( '#id_input' ).val( this.id );
            $( '#descr_input' ).val( this.descr );
            $( '#price_input' ).val( this.price );
        },

        // Проверить данные в форме
        checkForma() {
            // 
        },

        // Получить данные из текущей строки html-таблицы и записать их в объект
        getTable( currentRow ) {
            // 
            this.id = $( currentRow ).find( 'td:eq(0)' ).html();
            this.descr = $( currentRow ).find( 'td:eq(1)' ).html();
            this.price = $( currentRow ).find( 'td:eq(2)' ).html();
        },

        // Отправить данные из объекта в последнюю строку html-таблицы
        pushTable() {
            // 
        },

        // Вывести значения объекта в консоль
        writeConsole() {
            // 
            console.log ( '|| ID: ' + this.id + ' DESCR: ' + this.descr + ' PRICE: ' + this.price + ' ||');
        },
        foo: null
    };




    // При клике на строку таблицы
    $( '#dbtable tr' ).not( ':first' ).click( function() {
        
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
        $( '#dbtable tr' ).removeClass( 'marked' );
        $( this ).addClass( 'marked' );

        // поскольку строка выбрана то кнопки изменить и удалить активны
        $( '#button_update' ).removeAttr( 'disabled' );
        $( '#button_delete' ).removeAttr( 'disabled' );

        // Считываем значения из html таблицы
        // tovar.id = $( this ).find( 'td:eq(0)' ).html();
        // tovar.descr = $( this ).find( 'td:eq(1)' ).html();
        // tovar.price = $( this ).find( 'td:eq(2)' ).html();

        // Получить данные из текущей строки таблицы и записать их в объект товар
        tovar.getTable( this );

        // myvar = String( TovarID ) + " - " + String( TovarDescr ) + " - " + String( TovarPrice );

        // Вывести в консольсодержимое объекта товар
        tovar.writeConsole();

        // Записываем эти значения в поля формы
        // $( "input[name='id_input']" ).val( tovar.id );
        // $( "input[name='descr_input']" ).val( tovar.descr );
        // $( "input[name='price_input']" ).val( tovar.price );
        
        // console.log( myvar );
    } );
    

    // Кнопки updata и delete активны только при выделенной записи
    // if ( $( 'table#dbtable' ).hasClass( 'marked' ) ) {
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
    function isCheckForma() {
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
        tovar.clearForma();
        // $( '#id_input' ).val( '' );
        // $( '#descr_input' ).val( '' );
        // $( '#price_input' ).val( '' );
        
        $( '#form_insert_update' ).show();

        // Добавление строки в конец таблицы
        // $( '#dbtable' ).append( '<tr><td>my data</td><td>more data</td></tr>' );
        // $( '#dbtable tr:last' ).after( '<tr>Test new row</tr>' );
        $( '#dbtable tr:last' ).after( '<tr><td>Unreal</td><td>Unreal</td><td>Unreal</td></tr>' );


        // $( '#dbtable' ).insertBefore( '<tr>' );

        // $( '#dbtable' ).append( '<tr>' );
        // $( '#dbtable > tr:last').append( '<td>' );
        // $( '#dbtable > tr:last > td:first' ).val( 'Im a td!' );
        
        $( '#button_ok' ).click( function() {
        
            if ( isCheckForma() === true ) {

                $.ajax(
                {
                    url: 'model/01tovar_ins.php', // Вызываем этот скрипт
                    data: JSON.stringify( tovar ), // И отправляем ему данные
                    type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
                    dataType: 'json', // В каком формате получать данные от сервера
                    success: function( responseJSON ) { 
                        console.log( 'Ajax-запрос выполнился удачно ###' ); 
                        console.log( 'От сервера прибыли дынные: ' + responseJSON['two'] ); 
                    },
                    error: function( responseJSON ) { 
                        console.log( 'Попытка выполнить ajax-запрос провалилась ###' ); 
                        console.log( 'От сервера прибыли дынные: ' + responseJSON ); 
                    }
                });

            };

        } );

        $( '#button_cancel' ).click( function() {

            $( '#button_insert' ).removeAttr( 'disabled' );
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
        // $( '#id_input' ).val( tovar.id );
        // $( '#descr_input' ).val( tovar.descr );
        // $( '#price_input' ).val( tovar.price );

        tovar.pushForma();


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
            
            $( '#form_insert_update' ).hide();
            
            $( '#button_insert' ).removeAttr( 'disabled' );
            $( '#button_update' ).removeAttr( 'disabled' );
            $( '#button_delete' ).removeAttr( 'disabled' );

        } );

    } );
    

    // ************************************************************************************
    // *********************** Удаление запси *******************************************
    // ************************************************************************************
    $( '#button_delete' ).click( function() {
        
        $( '#button_insert' ).attr( 'disabled', true );
        $( '#button_update' ).attr( 'disabled', true );
        $( '#button_delete' ).attr( 'disabled', true );

        $( '#p_delete' ).text( 'id: ' + tovar.id + ', ' + tovar.descr);
        $( '#form_delete' ).show();

        $( '#button_yes' ).click( function() {
            
            $( '#form_delete' ).hide();

            $( '#button_insert' ).removeAttr( 'disabled' );
            $( '#button_update' ).attr( 'disabled', true );
            $( '#button_delete' ).attr( 'disabled', true );

            $( '#dbtable tr' ).removeClass( 'marked' );

            // tovar.id = null;
            // tovar.descr = null;
            // tovar.price = null;

            tovar.clearObj;
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
} );