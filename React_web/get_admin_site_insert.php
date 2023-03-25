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
$site_name = $data['site_name'];
$address1 = $data['address1'];
$address2 = $data['address2'];
$address3 = $data['address3'];
$post_cd = $data['post_cd'];
$telephone_no = $data['telephone_no'];
$fax_no = $data['fax_no'];
$email = $data['email'];
$disable_flag = $data['disable_flag'];
$require_offline = $data['require_offline'];
$audit_user = $data['audit_user'];


$sql_insert_cf_site = "INSERT INTO cf_site
						( 		site_cd, 		site_name, 			address1,			address2,
								address3,		post_cd,			telephone_no,		fax_no,
								email,			disable_flag,		require_offline,	audit_user, 			
								audit_date	)
									
								 
									
				VALUES (		?,			?,			?,		?,
								?,			?,			?,		?,
								?,			?,			?,		?,
								GetDate()	) ";				
												
									
							
								
								
$params_cf_site = array(		$site_cd,		$site_name,			$address1,			$address2,
								$address3,		$post_cd,			$telephone_no,		$fax_no,
								$email,			$disable_flag,		$require_offline,	$audit_user,	);	
							
								
$stmt_cf_site = sqlsrv_query( $conn, $sql_insert_cf_site,$params_cf_site);	
if( !$stmt_cf_site ) {
	$error_message = "Error insert table (INSERT Table cf_site)";
	returnError($error_message);
	die( print_r( sqlsrv_errors(), true));
}	
sqlsrv_free_stmt($stmt_cf_site);	



	
	
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