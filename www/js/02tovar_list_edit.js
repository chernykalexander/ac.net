$( document ).ready( function() {
	
	var	t_id = null,
		t_id_magazine = null, // idm
		t_mag_descr = null,
		t_id_tovar = null, // idt
		t_tov_descr = null;

	$( 'tr:eq(2)' ).addClass( 'marked' );

	console.log( '02tovar_list_edit.js подключен' );

	console.log( 't_id: ' + t_id );
	console.log( 't_id_magazine: ' + t_id_magazine );
	console.log( 't_mag_descr: ' + t_mag_descr );
	console.log( 't_id_tovar: ' + t_id_tovar );
	console.log( 't_tov_descr: ' + t_tov_descr );

	console.log( '-----------------------------------------------' );

	t_id = $( '.marked' ).find( 'td:eq(0)' ).html();
	t_id_magazine = $( '.marked' ).find( 'td:eq(1)' ).html();
	t_mag_descr = $( '.marked' ).find( 'td:eq(2)' ).html();
	t_id_tovar = $( '.marked' ).find( 'td:eq(3)' ).html();
	t_tov_descr = $( '.marked' ).find( 'td:eq(4)' ).html();


	console.log( 't_id: ' + t_id );
	console.log( 't_id_magazine: ' + t_id_magazine );
	console.log( 't_mag_descr: ' + t_mag_descr );
	console.log( 't_id_tovar: ' + t_id_tovar );
	console.log( 't_tov_descr: ' + t_tov_descr );

	// $( '#input_id' ).val( t_id );
	// $( '#select_magazine' ).val( t_id_magazine );
	// $( '#select_tovar' ).val( t_id_tovar );

	$( '#button_test' ).click( function() { 
		// 
		console.log( $( '#select_magazine' ).val() );
		// if ( $( '#select_magazine' ).val() === 'none' ) {
		// 	// 
		// 	console.log( 'none' );
		// };
	} );



	// $( '#input_id' ).val( '' );
	// $( '#select_magazine' ).val( 'none' );
	// $( '#select_tovar' ).val( 'none' );

	// $( '#select_magazine' ).attr( 'disabled', true );
	// $( '#select_tovar' ).attr( 'disabled', true );

	// $( '#select_magazine option:selected' ).text( t_mag_descr );
	// $( '#select_tovar option:selected' ).text( t_tov_descr );

	return;
	
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
	        $( '#select_tovar' ).val( $( '.marked' ).find( 'td:eq(2)' ).html() );

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
	    //
	    // Очищаем все <span>ы от ошибок
	    $( '.span_msg_err' ).text( '' );

	    // Делаем валидацию для таблицы товаров
	    if ( $( '#input_descr' ).val() === '' ) {
	        $( '#span_descr' ).text( 'Описание товара не должно быть пустым' );
	        $( '#input_descr' ).focus();
	        return false;
	    };

	    if ( $( '#input_descr' ).val().length >= 30 ) {
	        $( '#span_descr' ).text( 'Описание товара не должно быть слишком длинным' );
	        $( '#input_descr' ).focus();
	        return false;
	    };

	    if ( $( '#input_price' ).val() === '' ) {
	        $( '#span_price' ).text( 'Цена товара должна быть заполнена' );
	        $( '#input_price' ).focus();
	        return false;
	    };

	    if ( ! $.isNumeric( $( '#input_price' ).val() ) )  {
	        $( '#span_price' ).text( 'Цена товара это числовое значение' );
	        $( '#input_price' ).focus();
	        return false;
	    };

	    if ( + $( '#input_price' ).val() <= 0)  {
	        $( '#span_price' ).text( 'Число должно быть положительным' );
	        $( '#input_price' ).focus();
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
		tovar.manipulation = 'insert';
		$( '#p_message' ).text = 'Форма добавления товара в БД';

		// Обнуление полей формы
		tovar.ClearForma();

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
		tovar.manipulation = 'update';
		$( '#p_message' ).text = 'Что вы хотите поменять в товаре?';

	    // Получить данные из текущей строки таблицы и записать их форму
	    tovar.tableToForma();

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
		tovar.manipulation = 'delete';
		$( '#p_message' ).text = 'Вы действительно хотите удалить товар?';

		// Получить данные из текущей строки таблицы и записать их в форму
		tovar.tableToForma( this );
		
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
		tovar.formaToObject();

		// Вывести в консольсодержимое объекта товар
		console.log( 'При нажатии кнопки ОК' );
		tovar.writeConsole();

		$.ajax(
		{
		    url: 'model/01tovar_db.php', // Вызываем этот скрипт
		    data: JSON.stringify( tovar ), // И отправляем ему данные
		    type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
		    dataType: 'json', // В каком формате получать данные от сервера
		    success: function( responseJSON ) { 
		        console.log( 'Сервер прислал корректный json' );

		        // Если серверный скрипт выполнился без ошибок
		        if ( responseJSON[ 'error' ] === false) {
		        	
		        	console.log( 'Серверный скрипт выполнен успешно: ' + responseJSON[ 'message' ] );
			        
			        // При выполнении insert - сервер пришлет новый id
			        if ( responseJSON[ 'id' ] !== null ) {
			        	tovar.id = responseJSON[ 'id' ];
			        };
			        
			        tovar.changeTable();

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
		if ( tovar.manipulation !== 'delete' ) {
			
			buttonEnable( ['insert', 'update', 'delete'] );

		// а если произошло удаление то доступна только кнопка insert
		} else {

			buttonEnable( ['insert'] );
			buttonDisable( ['update', 'delete'] );

		};

	} );

} );