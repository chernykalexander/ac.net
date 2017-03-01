<?php 

$MyArray = Array ( 'id' => 1, 'descr' => 'Молоко', 'price' => 15 );

// echo $MyArray[ 'descr' ];

echo $MyArray[ 1 ];

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