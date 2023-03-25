<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);
// get these values from your DB.
require_once('config.php');
$error_message;
$valid = true;

/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

$site_cd = $_REQUEST['site_cd'];


$sql="Select *	FROM  dft_mst (NOLOCK) WHERE  site_cd = '".$site_cd."'";


$stmt_dft_mst = sqlsrv_query( $conn, $sql);

if( !$stmt_dft_mst ) {
	 $error_message = "Error selecting table (dft_mst)";
	 returnError($error_message);
	 die( print_r( sqlsrv_errors(), true));
	 
}

$json = array();

do {
	 while ($row = sqlsrv_fetch_array($stmt_dft_mst, SQLSRV_FETCH_ASSOC)) {		
		$json[] = $row;	
	//echo json_encode($row);
	
	 }
} while ( sqlsrv_next_result($stmt_dft_mst) );

 
				
//echo $json;


if( $stmt_dft_mst) {
	 sqlsrv_commit( $conn );
	 sqlsrv_close( $conn);	
	 returnData($json);
} else {
	 sqlsrv_rollback( $conn );
	 $error_message = "Transaction rolled back.<br />";
	 returnError($error_message);
} 



function returnData($json){
	
	 $json1 = json_encode($json);
	
	if(empty(json_decode($json1,1))) {
	 $returnData = array(
		'status' => 'SUCCESS',
		'message' => 'No Records found ',	
		'data' => $json);
	}else{
		$returnData = array(
		'status' => 'SUCCESS',
		'message' => 'Successfully',
		'data' => $json);
	} 	
	
	echo json_encode($returnData);
}

function returnError($error_message){
	$json = array();
	
	$returnData = array(
	'status' => 'ERROR',
	'message' => $error_message,
	'data' => $json);
	
	echo json_encode($returnData);
	exit();
		
}
	

 
?>