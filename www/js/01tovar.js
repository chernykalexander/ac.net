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
            this.id = $( '#id_input' ).val();
            this.descr = $( '#descr_input' ).val();
            this.price = $( '#price_input' ).val();
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
            $( '#dbtable tr:last td:eq(0)' ).html( this.id );
            $( '#dbtable tr:last td:eq(1)' ).html( this.descr );
            $( '#dbtable tr:last td:eq(2)' ).html( this.price );
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
        // Из объекта товар записать в форму
        tovar.pushForma();

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
        
        // Очищаем свойства объекта
        tovar.clearObj();
        // Очищаем поля формы
        tovar.clearForma();
        
        $( '#form_insert_update' ).show();

        // Добавление строки в конец таблицы
        
        $( '#dbtable' ).append( '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' );

        // $( '#dbtable tr' ).innerHTML( 'TETSTSTS' );

        // var newLi = document.createElement( 'tr' );
        // newLi.innerHTML = '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        // dbtable.appendChild(newLi);

        // $( '#dbtable' )[ 0 ].insertAdjacentHTML( 'beforeend', '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' );
        // $( '#dbtable' ).append( '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' );
        // $( '#dbtable' ).append( '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' );
        // $( '#dbtable tr:last' ).after( '<tr></tr>' );
        // $( '#dbtable tr:last' ).innerHTML = '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        // $( '#dbtable tr:last' ).innerHTML += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        // $( '#dbtable tr:last' ).after( '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' );
        // $( '#dbtable tr:last' ).append( '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' ).show();
        
        // Красим строку
        $( '#dbtable tr' ).removeClass( 'marked' );
        $( '#dbtable tr:last' ).addClass( 'marked' );

        console.log( JSON.stringify( tovar ) );

        $( '#button_ok' ).click( function() {
        
            if ( isCheckForma() === true ) {

                // Заполняем объект данными из формы
                tovar.getForma();

                console.log( JSON.stringify( tovar ) );

                $.ajax(
                {
                    url: 'model/01tovar_ins.php', // Вызываем этот скрипт
                    data: JSON.stringify( tovar ), // И отправляем ему данные
                    type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
                    dataType: 'json', // В каком формате получать данные от сервера
                    success: function( responseJSON ) { 
                        console.log( 'Ajax-запрос выполнился удачно ###' ); 
                        console.log( 'От сервера прибыли дынные: ' + responseJSON[ 'response' ] ); 
                        tovar.id = responseJSON[ 'response' ];
                        tovar.pushTable();
                    },
                    error: function( responseJSON ) { 
                        console.log( 'Попытка выполнить ajax-запрос провалилась ###' ); 
                        console.log( 'От сервера прибыли дынные: ' + responseJSON[ 'response' ] ); 
                    }
                });

                $( '#button_insert' ).removeAttr( 'disabled' );
                $( '#button_update' ).removeAttr( 'disabled' );
                $( '#button_delete' ).removeAttr( 'disabled' );
                
                // tovar.clearForma();
                // tovar.clearObj();
                $( '#form_insert_update' ).hide();

            };

        } );

        $( '#button_cancel' ).click( function() {

            $( '#button_insert' ).removeAttr( 'disabled' );
            $( '#form_insert_update' ).hide();

            // Удаляем выделение
            $( '#dbtable tr' ).removeClass( 'marked' );
            // Удалить последюю строку
            $( '#dbtable tr:last' ).remove();
        
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
            
            if ( isCheckForma() === true) {

                // Заполняем объект данными из формы
                tovar.getForma();

                console.log( JSON.stringify( tovar ) );

                $.ajax(
                {
                    url: 'model/01tovar_upd.php', // Вызываем этот скрипт
                    data: JSON.stringify( tovar ), // И отправляем ему данные
                    type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
                    dataType: 'json', // В каком формате получать данные от сервера
                    success: function( responseJSON ) { 
                        console.log( 'Ajax-запрос выполнился удачно ###' ); 
                        console.log( 'От сервера прибыли дынные: ' + responseJSON[ 'response' ] ); 
                        // tovar.id = responseJSON[ 'response' ];
                        tovar.pushTable();
                    },
                    error: function( responseJSON ) { 
                        console.log( 'Попытка выполнить ajax-запрос провалилась ###' ); 
                        console.log( 'От сервера прибыли дынные: ' + responseJSON[ 'response' ] ); 
                    }
                });

                $( '#button_insert' ).removeAttr( 'disabled' );
                $( '#button_update' ).removeAttr( 'disabled' );
                $( '#button_delete' ).removeAttr( 'disabled' );
                
                // tovar.clearForma();
                // tovar.clearObj();
                $( '#form_insert_update' ).hide();                

                console.log( 'Товар успешно изменен' );

            } else {
                console.log( 'Товар содержит ошибку' );
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
            
            $.ajax(
            {
                url: 'model/01tovar_del.php', // Вызываем этот скрипт
                data: JSON.stringify( tovar ), // И отправляем ему данные
                type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
                dataType: 'json', // В каком формате получать данные от сервера
                success: function( responseJSON ) { 
                    console.log( 'Ajax-запрос выполнился удачно ###' ); 
                    console.log( 'От сервера прибыли дынные: ' + responseJSON[ 'response' ] ); 
                },
                error: function( responseJSON ) { 
                    console.log( 'Попытка выполнить ajax-запрос провалилась ###' ); 
                    console.log( 'От сервера прибыли дынные: ' + responseJSON[ 'response' ] ); 
                }
            });
            
            $( '#form_delete' ).hide();

            $( '#button_insert' ).removeAttr( 'disabled' );
            $( '#button_update' ).attr( 'disabled', true );
            $( '#button_delete' ).attr( 'disabled', true );

            $( '.marked' ).remove();
            // $( '#dbtable tr' ).removeClass( 'marked' );

            tovar.clearObj();
            tovar.clearForma();
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