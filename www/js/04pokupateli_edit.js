$( document ).ready( function() {
	
	// Объект покупатели
	var pokupateli = {
	    
	    // Поля таблицы БД
	    id : null,
	    fio : null,

	    // Получить данные из текущей строки html-таблицы и записать их в форму
	    tableToForma() {

	        $( '#input_id' ).val( $( '.marked' ).find( 'td:eq(0)' ).html() );
	        $( '#input_fio' ).val( $( '.marked' ).find( 'td:eq(1)' ).html() );

	    },
			    
        // Отправить данные из формы в объект
        formaToObject() {

            this.id = $( '#input_id' ).val();
            this.fio = $( '#input_fio' ).val();

        },

        // Очищаем форму
        ClearForma() {

        	$( '#input_id' ).val( '' );
        	$( '#input_fio' ).val( '' );

        },

	    // Переносит данные из объекта в таблицу
	    changeTable() {
	    	
	    	// В зависимости от операции над объектом
	    	switch ( this.manipulation ) {
	    	  
	    	  // Добавляем новую строку в таблицу 
	    	  case 'insert':
	    	    
	    	    $( '#dbtable' ).append( '<tr><td>' + this.id + '</td><td>' + this.fio + '</td></tr>' );
	    	    break;
	    	  
	    	  // Изменяем текущую строку таблицы
	    	  case 'update':
	    	    
	    	    $( '.marked' ).find( 'td:eq(0)' ).html( this.id );
	    	    $( '.marked' ).find( 'td:eq(1)' ).html( this.fio );
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
	        console.log ( '|| ID: ' + this.id + ' FIO: ' + this.fio  + ' MAN: ' + this.manipulation +' ||');
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

		$( '#input_fio' ).removeAttr( 'disabled' );
		
	};


	// 
	// ----------------------- ДЕактивировать поля ввода -------------------------------------
	// 
	function inputDisable() {

		$( '#input_fio' ).attr( 'disabled', true );

	};


	// 
	// ----------------------- Проверка данных -------------------------------------------
	// 
	function CheckForma() {
	    //
	    // Очищаем все <span>ы от ошибок
	    $( '.span_msg_err' ).text( '' );

	    // Делаем валидацию для таблицы товаров
	    if ( $( '#input_fio' ).val() === '' ) {
	        $( '#span_fio' ).text( 'Поле ФИО не должно быть пустым' );
	        $( '#input_fio' ).focus();
	        return false;
	    };

	    if ( $( '#input_fio' ).val().length >= 60 ) {
	        $( '#span_fio' ).text( 'ФИО не должно быть слишком длинным' );
	        $( '#input_fio' ).focus();
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
		pokupateli.manipulation = 'insert';
		$( '#p_message' ).text = 'Форма клиента в БД';

		// Обнуление полей формы
		pokupateli.ClearForma();

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
		pokupateli.manipulation = 'update';
		$( '#p_message' ).text = 'Что вы хотите изменить в клиенте?';

	    // Получить данные из текущей строки таблицы и записать их форму
	    pokupateli.tableToForma();

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
		pokupateli.manipulation = 'delete';
		$( '#p_message' ).text = 'Вы действительно хотите удалить клиента?';

		// Получить данные из текущей строки таблицы и записать их в форму
		pokupateli.tableToForma( this );
		
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
		pokupateli.formaToObject();

		// Вывести в консольсодержимое объекта товар
		console.log( 'При нажатии кнопки ОК' );
		pokupateli.writeConsole();

		$.ajax(
		{
		    url: 'model/04pokupateli_db.php', // Вызываем этот скрипт
		    data: JSON.stringify( pokupateli ), // И отправляем ему данные
		    type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
		    dataType: 'json', // В каком формате получать данные от сервера
		    success: function( responseJSON ) { 
		        console.log( 'Сервер прислал корректный json' );

		        // Если серверный скрипт выполнился без ошибок
		        if ( responseJSON[ 'error' ] === false) {
		        	
		        	console.log( 'Серверный скрипт выполнен успешно: ' + responseJSON[ 'message' ] );
			        
			        // При выполнении insert - сервер пришлет новый id
			        if ( responseJSON[ 'id' ] !== null ) {
			        	pokupateli.id = responseJSON[ 'id' ];
			        };
			        
			        pokupateli.changeTable();

		    	} else {
		    		
		    		console.log( 'Ошибка при выполнении серверного скрипта: ' + responseJSON[ 'message' ] );

		    	};

		    },
		    error: function( responseJSON ) { 
		        console.log( 'От сервера пришол НЕ валидный json: ' + responseJSON[ 'message' ] ); 
		    }
		});

		// Прячем диалоговую форму
		$( '#form_dialog' ).hide();

		// Если произошло добавление или редактирование то все кнопки доступны
		if ( pokupateli.manipulation !== 'delete' ) {
			
			buttonEnable( ['insert', 'update', 'delete'] );

		// а если произошло удаление то доступна только кнопка insert
		} else {

			buttonEnable( ['insert'] );
			buttonDisable( ['update', 'delete'] );

		};

	} );

} );