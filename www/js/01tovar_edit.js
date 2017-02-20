$( document ).ready( function() {
	// 
	var tovar = {
	    
	    // Поля таблицы БД
	    id: null,
	    descr: null,
	    price: null,
        
	    // Получить данные из текущей строки html-таблицы и записать их в объект
	    TableToObject( currentRow ) {
	        // 
	        this.id = $( currentRow ).find( 'td:eq(0)' ).html();
	        this.descr = $( currentRow ).find( 'td:eq(1)' ).html();
	        this.price = $( currentRow ).find( 'td:eq(2)' ).html();
	    },
	    
	    // Получить данные из текущей строки html-таблицы и записать их в форму
	    TableToForma( currentRow ) {
	        // 
	        $( '#id_input' ).val( $( currentRow ).find( 'td:eq(0)' ).html() );
	        $( '#descr_input' ).val( $( currentRow ).find( 'td:eq(1)' ).html() );
	        $( '#price_input' ).val( $( currentRow ).find( 'td:eq(2)' ).html() );
	    },

        // Отправить данные из формы в объект
        FormaToObject() {
            // 
            this.id = $( '#id_input' ).val();
            this.descr = $( '#descr_input' ).val();
            this.price = $( '#price_input' ).val();
        },

	    // Отправить данные из объекта в последнюю строку html-таблицы
	    ObjectToTable() {            
	        // 
	        $( '#dbtable tr:last td:eq(0)' ).html( this.id );
	        $( '#dbtable tr:last td:eq(1)' ).html( this.descr );
	        $( '#dbtable tr:last td:eq(2)' ).html( this.price );
	    },

	    // Очищаем: форму, объект, таблицу
	    ClearFormaObject() {
	    	// Чистим форму
	    	$( '#id_input' ).val( '' );
	    	$( '#descr_input' ).val( '' );
	    	$( '#price_input' ).val( '' );

	    	// Чистим объект
	    	this.id = null;
	    	this.descr = null;
	    	this.price = null;	    	
	    	this.manipulation = null;	    	
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
	    tovar.TableToObject( this );
	    // Из объекта товар записать в форму
	    tovar.TableToForma( this );
	    
	    // Вывести в консольсодержимое объекта товар
	    console.log( 'При клике на строку таблицы' );
	    tovar.writeConsole();
	 
	} );


	// ************************************************************************************
	// *********************** Удаление запси *******************************************
	// ************************************************************************************
	$( '#button_delete' ).click( function() {
	    
	    // Пока есть диалоговое окно - все кнопки недоступны
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
	        
	        // Прячем диалоговую форму удаления записи
	        $( '#form_delete' ).hide();

	        // Запись удалили - активна только одна кнопка добавить
	        $( '#button_insert' ).removeAttr( 'disabled' );
	        $( '#button_update' ).attr( 'disabled', true );
	        $( '#button_delete' ).attr( 'disabled', true );

	        // Удаляем данные из формы и объекта
	        tovar.ClearFormaObject();
	        
	        // Удаляем выделенную запись
	        $( '.marked' ).remove();

	    });

	    $( '#button_no' ).click( function() {
	        
	        // Прячем диалоговую форму удаления записи
	        $( '#form_delete' ).hide();

	        // Отказались от удаления - записи все кнопки активны
	        $( '#button_insert' ).removeAttr( 'disabled' );
	        $( '#button_update' ).removeAttr( 'disabled' );
	        $( '#button_delete' ).removeAttr( 'disabled' );

	    });

} );