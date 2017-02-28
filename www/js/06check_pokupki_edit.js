$( document ).ready( function() {
	
	// Объект товара в магазине
	var check_pokupki = {
	    
	    // Поля таблицы БД
	    id : null, // id
	    id_pokupki : null, // idp
	    cli_mag : null, // cli_mag
	    id_tovar : null, // idt
	    tov_descr : null, // des_tov
	    kolichestvo : null, // kol

	    // Получить данные из текущей строки html-таблицы и записать их в форму
	    tableToForma() {

	        $( '#input_id' ).val( $( '.marked' ).find( 'td:eq(0)' ).html() );
	        $( '#select_pokupki' ).val( $( '.marked' ).find( 'td:eq(1)' ).html() );
	        $( '#select_tovar' ).val( $( '.marked' ).find( 'td:eq(3)' ).html() );
	        $( '#input_kolichestvo' ).val( $( '.marked' ).find( 'td:eq(5)' ).html() );

	    },
			    
        // Отправить данные из формы в объект
        formaToObject() {

            this.id = $( '#input_id' ).val();
            this.id_pokupki = $( '#select_pokupki' ).val();
            this.cli_mag = $( '#select_pokupki option:selected' ).text();
            this.id_tovar = $( '#select_tovar' ).val();
            this.tov_descr = $( '#select_tovar option:selected' ).text();
            this.kolichestvo = $( '#input_kolichestvo' ).val();

        },

        // Очищаем форму
        ClearForma() {

        	$( '#input_id' ).val( '' );
        	$( '#select_pokupki' ).val( 'none' );
        	$( '#select_tovar' ).val( 'none' );
        	$( '#input_kolichestvo' ).val( '' );

        },

	    // Переносит данные из объекта в таблицу
	    changeTable() {
	    	
	    	// В зависимости от операции над объектом
	    	switch ( this.manipulation ) {
	    	  
	    	  // Добавляем новую строку в таблицу 
	    	  case 'insert':

	    	    $( '#dbtable' ).append( '<tr><td>'  + this.id + 
	    	    						'</td><td>' + this.id_pokupki + 
	    	    						'</td><td>' + this.cli_mag + 
	    	    						'</td><td>' + this.id_tovar + 
	    	    						'</td><td>' + this.tov_descr + 
	    	    						'</td><td>' + this.kolichestvo + 
	    	    						'</td></tr>' );
	    	    break;
	    	  
	    	  // Изменяем текущую строку таблицы
	    	  case 'update':
	    	    
	    	    $( '.marked' ).find( 'td:eq(0)' ).html( this.id );
	    	    $( '.marked' ).find( 'td:eq(1)' ).html( this.id_pokupki );
	    	    $( '.marked' ).find( 'td:eq(2)' ).html( this.cli_mag );
	    	    $( '.marked' ).find( 'td:eq(3)' ).html( this.id_tovar );
	    	    $( '.marked' ).find( 'td:eq(4)' ).html( this.tov_descr );
	    	    $( '.marked' ).find( 'td:eq(5)' ).html( this.kolichestvo );
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
	        			  + ' ID_POKUPKI: ' + this.id_magazine 
	        			  + ' CLI_MAG: ' + this.mag_descr 
	        			  + ' ID_TOVAR: ' + this.id_tovar 
	        			  + ' TOV_DESCR: ' + this.tov_descr 
	        			  + ' KOLICHESTVO: ' + this.tov_descr 
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

	    // Проверка поля покупка
	    if ( $( '#select_pokupki option:selected' ).val() === 'none' ) {
	        $( '#span_pokupki' ).text( 'Вы не указали покупку' );
	        $( '#select_pokupki' ).focus();
	        return false;
	    };

	    // Проверка поля товар
	    if ( $( '#select_tovar option:selected' ).val() === 'none' ) {
	        $( '#span_tovar' ).text( 'Вы не указали товар' );
	        $( '#select_tovar' ).focus();
	        return false;
	    };

	    if ( $( '#input_kolichestvo' ).val() === '' ) {
	        $( '#span_kolichestvo' ).text( 'Количество товара должно быть заполнено' );
	        $( '#input_kolichestvo' ).focus();
	        return false;
	    };

	    if ( ! $.isNumeric( $( '#input_kolichestvo' ).val() ) )  {
	        $( '#span_kolichestvo' ).text( 'Количество товара это числовое значение' );
	        $( '#input_kolichestvo' ).focus();
	        return false;
	    };

	    if ( + $( '#input_kolichestvo' ).val() <= 0)  {
	        $( '#span_kolichestvo' ).text( 'Количество должно быть положительным' );
	        $( '#input_kolichestvo' ).focus();
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
		check_pokupki.manipulation = 'insert';
		$( '#p_message' ).text = 'Форма добавления чека покупки в БД';

		// Обнуление полей формы
		check_pokupki.ClearForma();

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
		check_pokupki.manipulation = 'update';
		$( '#p_message' ).text = 'Что вы хотите поменять в чеке покупки?';

	    // Получить данные из текущей строки таблицы и записать их форму
	    check_pokupki.tableToForma();

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
		check_pokupki.manipulation = 'delete';
		$( '#p_message' ).text = 'Вы действительно хотите удалить строку из чеков покупки?';

		// Получить данные из текущей строки таблицы и записать их в форму
		check_pokupki.tableToForma( this );
		
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
		check_pokupki.formaToObject();

		// Вывести в консольсодержимое объекта товар
		console.log( 'При нажатии кнопки ОК' );
		check_pokupki.writeConsole();

		$.ajax(
		{
		    url: 'model/06check_pokupki_db.php', // Вызываем этот скрипт
		    data: JSON.stringify( check_pokupki ), // И отправляем ему данные
		    type: 'POST', // HTTP запрос методом POST (например POST, GET и т.д.)
		    dataType: 'json', // В каком формате получать данные от сервера
		    success: function( responseJSON ) { 
		        console.log( 'Сервер прислал корректный json' );

		        // Если серверный скрипт выполнился без ошибок
		        if ( responseJSON[ 'error' ] === false) {
		        	
		        	console.log( 'Серверный скрипт выполнен успешно: ' + responseJSON[ 'message' ] );
			        
			        // При выполнении insert - сервер пришлет новый id
			        if ( responseJSON[ 'id' ] !== null ) {
			        	check_pokupki.id = responseJSON[ 'id' ];
			        };
			        
			        check_pokupki.changeTable();

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
		if ( check_pokupki.manipulation !== 'delete' ) {
			
			buttonEnable( ['insert', 'update', 'delete'] );

		// а если произошло удаление то доступна только кнопка insert
		} else {

			buttonEnable( ['insert'] );
			buttonDisable( ['update', 'delete'] );

		};

	} );

} );