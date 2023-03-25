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


$sql= "	SELECT 	cf_cost_center.costcenter,cf_cost_center.descs    
		FROM 	cf_cost_center (NOLOCK)  
		WHERE (	cf_cost_center.disable_flag = 0  ) 
		AND cf_cost_center.site_cd = '".$site_cd."' 
		AND disable_flag = '0' ";


	$stmt_cf_cost_center = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_cost_center ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $CostCenter= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_cost_center, SQLSRV_FETCH_ASSOC)) {	
		 
			   $CostCenter[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_cost_center) );
	
	
returnData($CostCenter);

sqlsrv_free_stmt($stmt_cf_cost_center);
sqlsrv_close($conn);

function returnData($CostCenter)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$CostCenter
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