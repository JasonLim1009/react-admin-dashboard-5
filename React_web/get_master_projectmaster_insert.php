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
$prj_mst_prj_cd = $data['prj_mst_prj_cd'];
$prj_mst_desc = $data['prj_mst_desc'];
$prj_mst_costcenter = $data['prj_mst_costcenter'];
$prj_mst_laccount = $data['prj_mst_laccount'];
$prj_mst_maccount = $data['prj_mst_maccount'];
$prj_mst_caccount = $data['prj_mst_caccount'];
$prj_mst_prj_date = $data['prj_mst_prj_date'];
$prj_mst_due_date = $data['prj_mst_due_date'];
$prj_mst_budget = $data['prj_mst_budget'];
$prj_mst_approved = $data['prj_mst_approved'];
$prj_mst_disable_flag = $data['prj_mst_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_prj_mst = "INSERT INTO prj_mst
						( 		site_cd, 				prj_mst_prj_cd, 			prj_mst_desc, 			prj_mst_costcenter, 
								prj_mst_laccount,		prj_mst_maccount,			prj_mst_caccount,   	prj_mst_prj_date,
								prj_mst_due_date,		prj_mst_budget,				prj_mst_approved,		prj_mst_disable_flag,				
								audit_user, 			audit_date,     			column1,				column2,					
								column3,				column4, 					column5 ) 
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					?,						?,
								?,						GetDate(),			NULL,					NULL,	
								NULL,					NULL,  				NULL) ";	
								
												
							
								
								
$params_prj_mst = array(		$site_cd,			$prj_mst_prj_cd,	$prj_mst_desc,			$prj_mst_costcenter,
								$prj_mst_laccount,	$prj_mst_maccount,	$prj_mst_caccount,		$prj_mst_prj_date,	
								$prj_mst_due_date,	$prj_mst_budget,	$prj_mst_approved,		$prj_mst_disable_flag,			
								$audit_user,);	
								
$stmt_prj_mst = sqlsrv_query( $conn, $sql_insert_prj_mst,$params_prj_mst);	
if( !$stmt_prj_mst ) {
	$error_message = "Error insert table (INSERT Table prj_mst)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_prj_mst);	



	
	
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