$( document ).ready( function(){

	
	// console.log( 'Hi hi hi' );
	var myvar,
		myindex;
	var TovarID;
	var TovarDescr;
	var TovarPrice;
	
	// При клике на строку таблицы
	$( 'table.dbtable tr' ).on( 'click', 
		function() {
			// Красим строку
			$( 'table.dbtable tr' ).removeClass( 'marked' );
			$( this ).addClass( 'marked' );

			// Считываем значения из html таблицы
			TovarID = $( this ).find( 'td:eq(0)' ).html();
			TovarDescr = $( this ).find( 'td:eq(1)' ).html();
			TovarPrice = $( this ).find( 'td:eq(2)' ).html();
			myvar = String(TovarID) + " - " + String(TovarDescr) + " - " + String(TovarPrice);

			// Записываем эти значения в поля формы
			$( "input[name='id_input']" ).val( TovarID );
			$(" input[name='descr_input'] ").val( TovarDescr );
			$(" input[name='price_input'] ").val( TovarPrice );
			
			console.log( myvar );
		}
	);
	

	// При клике на кнопку добавить
	$( '#button_insert' ).on( 'click',
	    function () 
	    {
	    	
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


			console.log( 'BEGIN------------------------------------------------' );

			dataSend = { "SentFirstname": "Pascal", "SentAge": "15" };

			$.getJSON(
				'model/01tovar_ins.php',
				dataSend,
				function( dataReturned, statusReturned ) {
					console.log( 'Ajax запрос выполнился успешно' );
				}
			);

			console.log( 'END--------------------------------------------------' );

			// $.ajax( 'model/01tovar_ins.php',
			// {
			// 	type: 'POST',
			// 	dataType: 'text', // json в каком формате получать данные
			// 	data: 'firstname=Proverka2&age=16',
			// 	success: function( mydata ) { 
			// 		console.log( 'Ajax-запрос выполнился удачно ###' ); 
			// 		console.log( 'От сервера прибыли дынные: ' + mydata ); 
			// 	},
			// 	error: function( mydata ) { 
			// 		console.log( 'Попытка выполнить ajax-запрос провалилась ###' ); 
			// 		console.log( 'От сервера прибыли дынные: ' + mydata ); 
			// 	}
			// });
	    }
	);

	//alert(jQuery.fn.jquery);

	// $('table tr').on('click', function(e) {
	// 	$('table tr').removeClass('marked');
	// 	$(this).addClass('marked');
	// });
});