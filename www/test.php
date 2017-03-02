<?php 





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