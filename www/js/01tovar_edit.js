$( document ).ready( function() {
	// 
	var tovar = {
	    
	    // Поля таблицы БД
	    id: null,
	    descr: null,
	    price: null,

	    // Получить данные из текущей строки html-таблицы и записать их в объект
	    // TableToObject() {
	    //     // 
	    //     this.id = $( '.marked' ).find( 'td:eq(0)' ).html();
	    //     this.descr = $( '.marked' ).find( 'td:eq(1)' ).html();
	    //     this.price = $( '.marked' ).find( 'td:eq(2)' ).html();
	    // },
	    
	    // Получить данные из текущей строки html-таблицы и записать их в форму
	    tableToForma() {
	        // 
	        $( '#id_input' ).val( $( '.marked' ).find( 'td:eq(0)' ).html() );
	        $( '#descr_input' ).val( $( '.marked' ).find( 'td:eq(1)' ).html() );
	        $( '#price_input' ).val( $( '.marked' ).find( 'td:eq(2)' ).html() );
	    },
			    
        // Отправить данные из формы в объект
        formaToObject() {
            // 
            this.id = $( '#id_input' ).val();
            this.descr = $( '#descr_input' ).val();
            this.price = $( '#price_input' ).val();
        },

	    // Отправить данные из объекта в последнюю строку html-таблицы
	    // ObjectToTable() {            
	    //     // 
	    //     $( '#dbtable tr:last td:eq(0)' ).html( this.id );
	    //     $( '#dbtable tr:last td:eq(1)' ).html( this.descr );
	    //     $( '#dbtable tr:last td:eq(2)' ).html( this.price );
	    // },

	    // Очищаем форму
	    clearForma() {
	    	// 
	    	$( '#id_input' ).val( '' );
	    	$( '#descr_input' ).val( '' );
	    	$( '#price_input' ).val( '' );
	    },

	    // Вывести значения объекта в консоль
	    writeConsole() {
	        // 
	        console.log ( '|| ID: ' + this.id + ' DESCR: ' + this.descr + ' PRICE: ' + this.price + ' MAN: ' + this.manipulation +' ||');
	    },

        // тип операции: insert, update, delete
        manipulation: null,
        foo: null

	};


	// ------------------------------------------------------------------------------------
	// ----------------------- Проверка данных -------------------------------------------
	// ------------------------------------------------------------------------------------
	function isCheckForma() {
	    //
	    // Очищаем все <span>ы от ошибок
	    $( '.msg_error' ).text( '' );

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


	// 
	// ----------------------- При клике на строку таблицы -------------------------------------
	// 
	$( '#dbtable tr' ).not( ':first' ).click( function() {
	    
	    // Если вызвана диалоговая форма добавить/изменить/удалить
	    // то переходить на другие строки нельзя
	    if ( $( '#form_input' ).is( ':visible' ) ) {
	        return;
	    };

	    // Красим строку
	    $( '#dbtable tr' ).removeClass( 'marked' );
	    $( this ).addClass( 'marked' );

	    // поскольку строка выбрана то кнопки изменить и удалить активны
	    $( '#button_update' ).removeAttr( 'disabled' );
	    $( '#button_delete' ).removeAttr( 'disabled' );

	} );


	// 
	// ----------------------- Добавление запси -------------------------------------------
	// 
	$( '#button_insert' ).click( function() {
		
		// Записываем тип операции
		tovar.manipulation = 'insert';
		$( '#p_message' ).text = 'Форма добавления товара в БД';

		// Обнуление полей формы и объекта
		tovar.clearForma();

		// Перед показом формы, делаем только поле id неактивным
		$( '#descr_input' ).removeAttr( 'disabled' );
		$( '#price_input' ).removeAttr( 'disabled' );
		$( '#form_input' ).show();

		// Когда вызвана диалоговая форма, кнопки становятся не активными
		$( '#button_insert' ).attr( 'disabled', true );
		$( '#button_update' ).attr( 'disabled', true );
		$( '#button_delete' ).attr( 'disabled', true );

	} );


	// 
	// ----------------------- Изменение запси -------------------------------------------
	// 
	$( '#button_update' ).click( function() {
		
		// Записываем тип операции
		tovar.manipulation = 'update';
		$( '#p_message' ).text = 'Что вы хотите поменять в товаре?';

	    // Получить данные из текущей строки таблицы и записать их форму
	    tovar.tableToForma();

		// При изменении записи поля ввода делаем активными
		$( '#descr_input' ).removeAttr( 'disabled' );
		$( '#price_input' ).removeAttr( 'disabled' );
		$( '#form_input' ).show();

		// Когда вызвана диалоговая форма, кнопки становятся не активными
		$( '#button_insert' ).attr( 'disabled', true );
		$( '#button_update' ).attr( 'disabled', true );
		$( '#button_delete' ).attr( 'disabled', true );

	} );


	// 
	// ----------------------- Удаление запси -------------------------------------------
	// 
	$( '#button_delete' ).click( function() {
		
		// Записываем тип операции
		tovar.manipulation = 'delete';
		$( '#p_message' ).text = 'Вы действительно хотите удалить товар?';

		// Получить данные из текущей строки таблицы и записать их в форму
		tovar.tableToForma( this );
		
		// При удалении записи все поля неактивны
		$( '#descr_input' ).attr( 'disabled', true );
		$( '#price_input' ).attr( 'disabled', true );
		$( '#form_input' ).show();

		// Когда вызвана диалоговая форма, кнопки становятся не активными
		$( '#button_insert' ).attr( 'disabled', true );
		$( '#button_update' ).attr( 'disabled', true );
		$( '#button_delete' ).attr( 'disabled', true );

	} );   


	//  ------------------------------------------------------------------------------------
	//  ------------------------------------------------------------------------------------
	//  ------------------------------------------------------------------------------------
	//  ------------------------------------------------------------------------------------
	//  ------------------------------------------------------------------------------------


	// 
	// ----------------------- Отмена операции -------------------------------------------
	// 
	$( '#button_cancel' ).click( function() {
		
		// Прячим форму ввода
		$( '#form_input' ).hide();

		// Кнопка добавить всегда доступна
		$( '#button_insert' ).removeAttr( 'disabled' );

		// Если есть выделенная строка то кнопки изменить, удалить тоже активны
		if ( $( '#dbtable tr' ).hasClass( 'marked' ) ) {
			
			$( '#button_update' ).removeAttr( 'disabled' );
			$( '#button_delete' ).removeAttr( 'disabled' );

		};

	} );


	// 
	// ------------------- Выполнение операции ---------------------------------------------
	// 
	$( '#button_ok' ).click( function() {
		
		// Проверяем корректность данных введенных в форме
		if ( isCheckForma() !== true ) {
			return;
		};

		// Отправить данные из формы в объект 
		tovar.formaToObject()

		// Вывести в консольсодержимое объекта товар
		console.log( 'При нажатии кнопки ОК' );
		tovar.writeConsole();

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
		        // tovar.pushTable();
		    },
		    error: function( responseJSON ) { 
		        console.log( 'Попытка выполнить ajax-запрос провалилась ###' ); 
		        console.log( 'От сервера прибыли дынные: ' + responseJSON[ 'response' ] ); 
		    }
		});

		$( '#form_input' ).hide();

		if ( tovar.manipulation !== 'delete' ) {
			$( '#button_insert' ).removeAttr( 'disabled' );
			$( '#button_update' ).removeAttr( 'disabled' );
			$( '#button_delete' ).removeAttr( 'disabled' );
		} else {
			// 
			$( '#button_insert' ).removeAttr( 'disabled' );
			$( '#button_update' ).attr( 'disabled', true );
			$( '#button_delete' ).attr( 'disabled', true );
		};

	} );


	// --------------------------------------------------------------------------------------------------

	// Тестовые функции
	$( '#button_insert_test' ).click( function() {
		// 
		$( '#dbtable' ).append( '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>' );
	});


	$( '#button_update_test' ).click( function() {
		// 
		$( '.marked' ).find( 'td:eq(0)' ).html( 'Test' );
		$( '.marked' ).find( 'td:eq(1)' ).html( 'Test' );
		$( '.marked' ).find( 'td:eq(2)' ).html( 'Test' );
	});


	$( '#button_delete_test' ).click( function() {
		// 
		$( '.marked' ).remove();

	});

} );