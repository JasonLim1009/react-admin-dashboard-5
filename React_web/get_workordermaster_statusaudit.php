<?php
// get these values from your DB.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once('config.php');
/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

$error_message;
$valid = true;


$site_cd = $_REQUEST['site_cd'];
$wko_sts_wo_no = $_REQUEST['wko_sts_wo_no'];

$RowID = $_REQUEST['RowID'];


$sql= "	SELECT 	wko_sts_status,	
				wko_sts_originator,
				wko_sts_duration,
				wko_sts_start_date,		
				wko_sts_end_date
		FROM 	wko_sts (NOLOCK)
		WHERE 	site_cd = '".$site_cd."' 
		AND		wko_sts_wo_no = '".$wko_sts_wo_no."'
		AND 	wko_sts.mst_RowID = '".$RowID."'";

	$stmt_wko_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_wko_sts ) {
		 $error_message = "Error selecting table (wko_sts123)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $json =array();
     

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wko_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $json[]=$row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wko_sts) );
	
	
	
returnData($json);

sqlsrv_free_stmt($stmt_wko_sts);
sqlsrv_close($conn);




function returnData($json)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$json
    ];

    echo json_encode($returnData);
}

function returnError($error_message)
{
    $json = [];

    $returnData = [
        "status" => "ERROR",
        "message" => $error_message,
        "data" => $json,
    ];

    echo json_encode($returnData);
    exit();
}

 
?>