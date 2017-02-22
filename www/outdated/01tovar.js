$( document ).ready( function() {

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
        // тип операции: insert, update, delete
        manipulation: null,
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

        // Получить данные из текущей строки таблицы и записать их в объект товар
        tovar.getTable( this );
        // Из объекта товар записать в форму
        tovar.pushForma();

        // Вывести в консольсодержимое объекта товар
        tovar.writeConsole();
     
        // console.log( myvar );
    } );
    



    // ------------------------------------------------------------------------------------
    // ----------------------- Проверка данных -------------------------------------------
    // ------------------------------------------------------------------------------------
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


    // ------------------------------------------------------------------------------------
    // ----------------------- Добавление запси -------------------------------------------
    // ------------------------------------------------------------------------------------
    $( '#button_insert' ).click( function() {

        tovar.manipulation = 'insert';

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
        
        // Красим строку
        $( '#dbtable tr' ).removeClass( 'marked' );
        $( '#dbtable tr:last' ).addClass( 'marked' );

        console.log( JSON.stringify( tovar ) );

        $( '#button_ok' ).click( function() {
        
            if ( isCheckForma() === true ) {

                if ( tovar.manipulation !== 'insert' )
                    return;

                // Заполняем объект данными из формы
                tovar.getForma();

                console.log( JSON.stringify( tovar ) );

                // tovar.manipulation = 'insert';

                $.ajax(
                {
                    url: 'model/01tovar_manipulation.php', // Вызываем этот скрипт
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
                console.log( 'Товар успешно добавлен' );
                return;

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
    

    // ------------------------------------------------------------------------------------
    // ----------------------- Изменение запси -------------------------------------------
    // ------------------------------------------------------------------------------------
    $( '#button_update' ).click( function() {

        tovar.manipulation = 'update';

        $( '#button_insert' ).attr( 'disabled', true );
        $( '#button_update' ).attr( 'disabled', true );
        $( '#button_delete' ).attr( 'disabled', true );

        tovar.getForma();
        // tovar.pushForma();

        $( '#form_insert_update' ).show();

        $( '#button_ok' ).click( function() {
        
            console.log( 'Нажата кнопка ОК' );
            
            if ( isCheckForma() === true) {

                if ( tovar.manipulation !== 'update' )
                    return;

                // tovar.getTable();
                // Заполняем объект данными из формы
                // tovar.getForma();

                console.log( JSON.stringify( tovar ) );

                // tovar.manipulation = 'update';

                $.ajax(
                {
                    url: 'model/01tovar_manipulation.php', // Вызываем этот скрипт
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

                return;

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
    

    // ------------------------------------------------------------------------------------
    // ----------------------- Удаление запси -------------------------------------------
    // ------------------------------------------------------------------------------------
    $( '#button_delete' ).click( function() {
        
        $( '#button_insert' ).attr( 'disabled', true );
        $( '#button_update' ).attr( 'disabled', true );
        $( '#button_delete' ).attr( 'disabled', true );

        $( '#p_delete' ).text( 'id: ' + tovar.id + ', ' + tovar.descr);
        $( '#form_delete' ).show();

        $( '#button_yes' ).click( function() {
            
            tovar.manipulation = 'delete';

            $.ajax(
            {
                url: 'model/01tovar_manipulation.php', // Вызываем этот скрипт
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

} );