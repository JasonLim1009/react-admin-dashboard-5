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


$sql= "	SELECT 	site_cd,  
				Display_Order     	= COALESCE(dsh_mst_display_order,''),		   			
				Module_Code 		= COALESCE(dsh_mst_module_cd,''),   			
				Title				= COALESCE(dsh_mst_title,''),      			
				Description			= COALESCE(dsh_mst_desc,''),     			
				Object_Name			= COALESCE(dsh_mst_object_name,''),      			    			
				Query				= COALESCE(dsh_mst_query,''),     			
				Start_Value			= COALESCE(dsh_mst_start_value,''),       			
				End_value     		= COALESCE(dsh_mst_end_value,''),
				Critical_value     = COALESCE(dsh_mst_critical_value,''),		
				Alert_value     	= COALESCE(dsh_mst_alert_value,''),	
				Target_value     	= COALESCE(dsh_mst_target_value,''),	
				Disable_flag    	= COALESCE(dsh_mst_disable_flag,''),		
				RowID    
		FROM 	dsh_mst
								
		WHERE  ( site_cd = '".$site_cd."' ) ";


	$stmt_cf_account = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_account ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Account= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_account, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Account[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_account) );
	
	
returnData($Account);

sqlsrv_free_stmt($stmt_cf_account);
sqlsrv_close($conn);

function returnData($Account)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Account
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