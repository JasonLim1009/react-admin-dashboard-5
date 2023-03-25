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



$RowID = $_REQUEST['RowID'];




$sql= "	SELECT 	cf_module.language_cd,
				cf_module.cf_module_module_cd,   
				cf_module.cf_module_desc,   
				cf_module.ico_name,   
				cf_module.cf_module_seq,   
				cf_module.audit_user,   
				cf_module.audit_date,              
				cf_module.RowID
				 
		FROM 	cf_module (NOLOCK)
		WHERE 	cf_module.RowID='".$RowID."'ORDER BY language_cd";

	$stmt_cf_module = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_module ) {
		 $error_message = "Error selecting table (cf_module Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Language0 = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_module, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Module[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_module) );
	
	
returnData($Module);

sqlsrv_free_stmt($stmt_cf_module);
sqlsrv_close($conn);

function returnData($Module)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Module
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