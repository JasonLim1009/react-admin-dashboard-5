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
$prm_fcd_freq_code = $data['prm_fcd_freq_code'];
$prm_fcd_freq_type = $data['prm_fcd_freq_type'];
$prm_fcd_desc = $data['prm_fcd_desc'];
$prm_fcd_cal_days = $data['prm_fcd_cal_days'];
$prm_fcd_band = $data['prm_fcd_band'];
$prm_fcd_lead_pct = $data['prm_fcd_lead_pct'];
$prm_fcd_usg = $data['prm_fcd_usg'];
$prm_fcd_usg_uom = $data['prm_fcd_usg_uom'];
$prm_fcd_dayofweek = $data['prm_fcd_dayofweek'];
$prm_fcd_dayofmonth = $data['prm_fcd_dayofmonth'];
$prm_fcd_weekofmonth = $data['prm_fcd_weekofmonth'];
$prm_fcd_disable_flag = $data['prm_fcd_disable_flag'];
$audit_user = $data['audit_user'];


$sql_insert_prm_fcd = "INSERT INTO prm_fcd
						( 		site_cd, 				prm_fcd_freq_code, 			prm_fcd_freq_type, 			prm_fcd_desc, 
								prm_fcd_cal_days,		prm_fcd_band,				prm_fcd_lead_pct,   		prm_fcd_usg,
								prm_fcd_usg_uom,		prm_fcd_dayofweek,			prm_fcd_dayofmonth,			prm_fcd_weekofmonth,
								prm_fcd_disable_flag,	audit_user, 				audit_date,     			column1,				
								column2,				column3,					column4, 					column5 ) 
								
									
									
				VALUES (		?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					?,						?,
								?,						?,					GetDate(),				NULL,
								NULL,					NULL,				NULL,  					NULL) ";
							
												
							
								
								
$params_prm_fcd = array(		$site_cd,		 	 	$prm_fcd_freq_code,			$prm_fcd_freq_type,			$prm_fcd_desc,
								$prm_fcd_cal_days,	 	$prm_fcd_band,				$prm_fcd_lead_pct,			$prm_fcd_usg,	
								$prm_fcd_usg_uom,	 	$prm_fcd_dayofweek,			$prm_fcd_dayofmonth,		$prm_fcd_weekofmonth,
								$prm_fcd_disable_flag,	$audit_user,	);	
								
$stmt_prm_fcd = sqlsrv_query( $conn, $sql_insert_prm_fcd,$params_prm_fcd);	
if( !$stmt_prm_fcd ) {
	$error_message = "Error insert table (INSERT Table prm_fcd)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_prm_fcd);	



	
	
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