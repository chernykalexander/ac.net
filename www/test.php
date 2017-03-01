<?php 

// function getByIndex($array, $index) {
// $values = Array ( 'id' => 1, 'descr' => 'Молоко', 'price' => 15 );
// return $values[$index];
// }

// function getByIndex($array, $index) {
// $value = array_slice($array, $index, 1);
// return $value[0];
// }

// $MyArray = Array ( 'id' => 1, 'descr' => 'Молоко', 'price' => 15 );

// // Так НЕ нужно
// // echo $MyArray[ 'descr' ];

// // Нужно вот так
// $tmp = array_slice($MyArray, 2, -1);
// echo printf( $tmp['price'] );


// $arr = ['id' => 1, 'descr' => 'Молоко', 'price' => 15];

// echo $arr[ array_keys($arr)[1] ];


exit;

require( 'satellite/setup.php' );

$MagIndex = new ClassMagazine();



$MagIndex->ConnectDB();
$MagIndex->SetQueryDB ('
	select 
	    t.id, 
	    t.descr, 
	    t.price 
	from mgz_tovar t 
	order by t.id ');

$ResultMyTable = $MagIndex->GetTable();

echo $ResultMyTable;

$MagIndex->DisconnectDB();

?>