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
$error_message;
$valid = true;


$site_cd = $_REQUEST['site_cd'];


$sql= "	SELECT uom_mst.uom_mst_uom, uom_mst.uom_mst_desc        
		FROM uom_mst      
		WHERE uom_mst.site_cd = '".$site_cd."' 
		AND uom_mst_type = 'MATERIAL'";


	$stmt_uom_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_uom_mst ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $CapacityUOM= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_uom_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $CapacityUOM[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_uom_mst) );
	
	
returnData($CapacityUOM);

sqlsrv_free_stmt($stmt_uom_mst);
sqlsrv_close($conn);

function returnData($CapacityUOM)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$CapacityUOM
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