<?php
// get these values from your DB.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once('config.php');
$error_message;
$valid = true;


$json = file_get_contents('php://input');
// Converts it into a PHP object
$data = json_decode($json, true);



$site_cd = $data['site_cd'];
$loc_mst_stk_loc = $data['loc_mst_stk_loc'];
$loc_mst_mst_loc_cd = $data['loc_mst_mst_loc_cd'];
$loc_mst_area_loc_cd = $data['loc_mst_area_loc_cd'];
$loc_mst_bin_id = $data['loc_mst_bin_id'];
$loc_mst_desc = $data['loc_mst_desc'];
$loc_mst_storage_type = $data['loc_mst_storage_type'];
$loc_mst_costcenter = $data['loc_mst_costcenter'];
$loc_mst_account = $data['loc_mst_account'];
$loc_mst_capacity = $data['loc_mst_capacity'];
$loc_mst_capacity_uom = $data['loc_mst_capacity_uom'];
$loc_mst_onhold = $data['loc_mst_onhold'];
$loc_mst_supplier = $data['loc_mst_supplier'];
$loc_mst_separator = $data['loc_mst_separator'];
$loc_mst_stock_cost_flag = $data['loc_mst_stock_cost_flag'];
$loc_mst_disable_flag = $data['loc_mst_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_loc_mst = "INSERT INTO loc_mst
						( 		site_cd, 				loc_mst_stk_loc, 			loc_mst_mst_loc_cd, 		loc_mst_area_loc_cd, 
								loc_mst_bin_id,			loc_mst_desc,				loc_mst_storage_type,   	loc_mst_costcenter,
								loc_mst_account,		loc_mst_capacity,			loc_mst_capacity_uom,		loc_mst_onhold,	
								loc_mst_supplier,		loc_mst_separator,			loc_mst_stock_cost_flag,	loc_mst_disable_flag,
								audit_user, 			audit_date,					column1,					column2,
								column3,				column4, 					column5 ) 
								
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					?,						?,
								?,						GetDate(),			NULL,					NULL,
								NULL,					NULL,				NULL) ";
								
								
												
							
								
								
$params_loc_mst = array(		$site_cd,			$loc_mst_stk_loc,	$loc_mst_mst_loc_cd,			$loc_mst_area_loc_cd,
								$loc_mst_bin_id,	$loc_mst_desc,		$loc_mst_storage_type,			$loc_mst_costcenter,	
								$loc_mst_account,	$loc_mst_capacity,	$loc_mst_capacity_uom,			$loc_mst_onhold,
								$loc_mst_supplier,  $loc_mst_separator,	$loc_mst_stock_cost_flag,		$loc_mst_disable_flag,
								$audit_user,);	
							
								
$stmt_loc_mst = sqlsrv_query( $conn, $sql_insert_loc_mst,$params_loc_mst);	
if( !$stmt_loc_mst ) {
	$error_message = "Error insert table (INSERT Table loc_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_loc_mst);	



	
	
if ($valid) {
	
	sqlsrv_close( $conn);	
	returnData();	
}
 
function returnData(){
	$returnData = array(
	'status' => 'SUCCESS',	
	'message' => 'Insert Successfully');

	echo json_encode($returnData);
}

function returnError($error_message){	
	
	$returnData = array(
	'status' => 'ERROR',
	'message' => $error_message);	
	echo json_encode($returnData);
	exit();
}
 
?>