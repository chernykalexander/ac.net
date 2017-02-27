$( document ).ready( function() {
	
	// Объект товара в магазине
	var tovar_list = {
	    
	    // Поля таблицы БД
	    id : null,
	    id_magazine : null, // idm
	    mag_descr : null,
	    id_tovar : null, // idt
	    tov_descr : null,

	    // Получить данные из текущей строки html-таблицы и записать их в форму
	    tableToForma() {

	        $( '#input_id' ).val( $( '.marked' ).find( 'td:eq(0)' ).html() );
	        $( '#select_magazine' ).val( $( '.marked' ).find( 'td:eq(1)' ).html() );
	        $( '#select_tovar' ).val( $( '.marked' ).find( 'td:eq(3)' ).html() );

	    },
			    
        // Отправить данные из формы в объект
        formaToObject() {

            this.id = $( '#input_id' ).val();
            this.id_magazine = $( '#select_magazine' ).val();
            this.mag_descr = $( '#select_magazine option:selected' ).text();
            this.id_tovar = $( '#select_tovar' ).val();
            this.tov_descr = $( '#select_tovar option:selected' ).text();

        },

        // Очищаем форму
        ClearForma() {

        	$( '#input_id' ).val( '' );
        	$( '#select_magazine' ).val( 'none' );
        	$( '#select_tovar' ).val( 'none' );

        },

	    // Переносит данные из объекта в таблицу
	    changeTable() {
	    	
	    	// В зависимости от операции над объектом
	    	switch ( this.manipulation ) {
	    	  
	    	  // Добавляем новую строку в таблицу 
	    	  case 'insert':
	    	    
	    	    $( '#dbtable' ).append( '<tr><td>' + this.id + 
	    	    						'</td><td>' + this.id_magazine + 
	    	    						'</td><td>' + this.mag_descr + 
	    	    						'</td><td>' + this.id_tovar + 
	    	    						'</td><td>' + this.tov_descr + 
	    	    						'</td></tr>' );
	    	    break;
	    	  
	    	  // Изменяем текущую строку таблицы
	    	  case 'update':
	    	    
	    	    $( '.marked' ).find( 'td:eq(0)' ).html( this.id );
	    	    $( '.marked' ).find( 'td:eq(1)' ).html( this.id_magazine );
	    	    $( '.marked' ).find( 'td:eq(2)' ).html( this.mag_descr );
	    	    $( '.marked' ).find( 'td:eq(3)' ).html( this.id_tovar );
	    	    $( '.marked' ).find( 'td:eq(4)' ).html( this.tov_descr );
	    	    break;
	    	  
	    	  // Удаляем текущую строку таблицы
	    	  case 'delete':
	    	    
	    	    $( '.marked' ).remove();	    	    
	    	    break;

	    	};
	    },

	    // Вывести значения объекта в консоль
	    writeConsole() {
	        // 
	        console.log ( '|| ID: ' + this.id 
	        			+ ' ID_MAGAZINE: ' + this.id_magazine 
	        			+ ' MAG_DESCR: ' + this.mag_descr 
	        			+ ' ID_TOVAR: ' + this.id_tovar 
	        			+ ' TOV_DESCR: ' + this.tov_descr 
	        			+ ' MAN: ' + this.manipulation +' ||');
	    },

        // тип операции: insert, update, delete
        manipulation: null,
        foo: null

	};


	// 
	// ----------------------- Сделать кнопки доступными --------------------------------
	// 
	function buttonEnable( ControlButton ) {

		ControlButton.forEach( function( item ) {
			$( '#button_' + item ).removeAttr( 'disabled' );
		} );

	};
	

	// 
	// ----------------------- Сделать кнопки НЕ доступными --------------------------------
	// 
	function buttonDisable( ControlButton ) {

		ControlButton.forEach( function( item ) {
			$( '#button_' + item ).attr( 'disabled', true );
		} );

	};


	// 
	// ----------------------- Активировать поля ввода -------------------------------------
	// 
	function inputEnable() {

		$( '#select_magazine' ).removeAttr( 'disabled' );
		$( '#select_tovar' ).removeAttr( 'disabled' );
		
	};


	// 
	// ----------------------- ДЕактивировать поля ввода -------------------------------------
	// 
	function inputDisable() {

		$( '#select_magazine' ).attr( 'disabled', true );
		$( '#select_tovar' ).attr( 'disabled', true );

	};


	// 
	// ----------------------- Проверка данных -------------------------------------------
	// 
	function CheckForma() {

	    // Очищаем все <span>ы от ошибок
	    $( '.span_msg_err' ).text( '' );

	    // Проверка поля магазин
	    if ( $( '#select_magazine option:selected' ).val() === 'none' ) {
	        $( '#span_magazine' ).text( 'Вы не указали магазин' );
	        $( '#select_magazine' ).focus();
	        return false;
	    };

	    // Проверка поля товар
	    if ( $( '#select_tovar option:selected' ).val() === 'none' ) {
	        $( '#span_tovar' ).text( 'Вы не указали товар' );
	        $( '#select_tovar' ).focus();
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
	    if ( $( '#form_dialog' ).is( ':visible' ) ) {
	        return;
	    };

	    // Красим строку
	    $( '#dbtable tr' ).removeClass( 'marked' );
	    $( this ).addClass( 'marked' );

	    // поскольку строка выбрана то кнопки изменить и удалить сделаем активными
	    buttonEnable( ['update', 'delete'] );

	} );


	// 
	// ----------------------- Добавление запси -------------------------------------------
	// 
	$( '#button_insert' ).click( function() {
		
		// Записываем тип операции
		tovar_list.manipulation = 'insert';
		$( '#p_message' ).text = 'Форма добавления списка товара в БД';

		// Обнуление полей формы
		tovar_list.ClearForma();

		// Поля формы делаем доступными для ввода
		inputEnable();
		
		// Показываем диалоговую форму
		$( '#form_dialog' ).show();

		// Когда вызвана диалоговая форма, все кнопки становятся не активными
		buttonDisable( ['insert', 'update', 'delete'] );

	} );


	// 
	// ----------------------- Изменение запси -------------------------------------------
	// 
	$( '#button_update' ).click( function() {
		
		// Записываем тип операции
		tovar_list.manipulation = 'update';
		$( '#p_message' ).text = 'Что вы хотите поменять в списке товара?';

	    // Получить данные из текущей строки таблицы и записать их форму
	    tovar_list.tableToForma();

		// Поля формы делаем доступными для ввода
		inputEnable();
		
		// Показываем диалоговую форму
		$( '#form_dialog' ).show();

		// Когда вызвана диалоговая форма, все кнопки становятся не активными
		buttonDisable( ['insert', 'update', 'delete'] );

	} );


	// 
	// ----------------------- Удаление запси -------------------------------------------
	// 
	$( '#button_delete' ).click( function() {
		
		// Записываем тип операции
		tovar_list.manipulation = 'delete';
		$( '#p_message' ).text = 'Вы действительно хотите удалить строку из списка товара?';

		// Получить данные из текущей строки таблицы и записать их в форму
		tovar_list.tableToForma( this );
		
		// Поля формы делаем не доступными
		inputDisable();
		
		// Показываем диалоговую форму
		$( '#form_dialog' ).show();

		// Когда вызвана диалоговая форма, все кнопки становятся не активными
		buttonDisable( ['insert', 'update', 'delete'] );

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
		$( '#form_dialog' ).hide();

		// Кнопка добавить всегда доступна
		buttonEnable( ['insert'] );

		// Если есть выделенная строка то кнопки изменить, удалить тоже активны
		if ( $( '#dbtable tr' ).hasClass( 'marked' ) ) {
			buttonEnable( ['update', 'delete'] );
		};

	} );


	// 
	// ------------------- Выполнение операции ---------------------------------------------
	// 
	$( '#button_ok' ).click( function() {
		
		// Проверяем корректность данных введенных в форме
		if ( CheckForma() !== true ) {
			return;
		};

		// Отправить данные из формы в объект 
		tovar_list.formaToObject();

		// Вывести в консольсодержимое объекта товар
		console.log( 'При нажатии кнопки ОК' );
		tovar_list.writeConsole();

		$.ajax(
		{
		    url: 'model/02tovar_list_db.php', // Вызываем этот скрипт
		    data: JSON.stringify( tovar_list ), // И отправляем ему данные
		    type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
		    dataType: 'json', // В каком формате получать данные от сервера
		    success: function( responseJSON ) { 
		        console.log( 'Сервер прислал корректный json' );

		        // Если серверный скрипт выполнился без ошибок
		        if ( responseJSON[ 'error' ] === false) {
		        	
		        	console.log( 'Серверный скрипт выполнен успешно: ' + responseJSON[ 'message' ] );
			        
			        // При выполнении insert - сервер пришлет новый id
			        if ( responseJSON[ 'id' ] !== null ) {
			        	tovar_list.id = responseJSON[ 'id' ];
			        };
			        
			        tovar_list.changeTable();

		    	} else {
		    		
		    		console.log( 'Ошибка при выполнении серверного скрипта: ' 
		    			+ responseJSON[ 'message' ] );

		    	};

		    },
		    error: function( responseJSON ) { 
		        console.log( 'От сервера пришол НЕ валидный json: ' + responseJSON[ 'message' ] ); 
		    }
		});

		// Прячем диалоговую форму
		$( '#form_dialog' ).hide();

		// Если произошло добавление или редактирование то все кнопки доступны
		if ( tovar_list.manipulation !== 'delete' ) {
			
			buttonEnable( ['insert', 'update', 'delete'] );

		// а если произошло удаление то доступна только кнопка insert
		} else {

			buttonEnable( ['insert'] );
			buttonDisable( ['update', 'delete'] );

		};

	} );

} );