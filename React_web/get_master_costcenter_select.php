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
$RowID = $_REQUEST['RowID'];




$sql= "	SELECT 	 cf_cost_center.site_cd,   
				 cf_cost_center.costcenter,   
				 cf_cost_center.descs, 
				 cf_cost_center.disable_flag,      
				 cf_cost_center.audit_user,   
				 cf_cost_center.audit_date,   				 
				 cf_cost_center.column1,   
				 cf_cost_center.column2,   
				 cf_cost_center.column3,   
				 cf_cost_center.column4,   
				 cf_cost_center.column5,   
				 cf_cost_center.RowID 
				 
		FROM 	cf_cost_center (NOLOCK)
		WHERE 	cf_cost_center.site_cd = '".$site_cd."'
		and 	cf_cost_center.RowID='".$RowID."'ORDER BY costcenter";

	$stmt_cf_cost_center = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_cost_center ) {
		 $error_message = "Error selecting table (cf_cost_center Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $CostCenter = array();

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