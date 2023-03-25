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




$sql= "	SELECT 	 con_sts.site_cd,   
				 con_sts.con_sts_cat_cd,   
				 con_sts.con_sts_type, 
				 con_sts.con_sts_status,
				 con_sts.con_sts_description,
				 con_sts.con_sts_email_flag,
				 con_sts.con_sts_disable_flag, 				 
				 con_sts.audit_user,   
				 con_sts.audit_date,   				 
				 con_sts.column1,   
				 con_sts.column2,   
				 con_sts.column3,   
				 con_sts.column4,   
				 con_sts.column5,   
				 con_sts.RowID 
				 
		FROM 	con_sts (NOLOCK)
		WHERE 	con_sts.site_cd = '".$site_cd."'
		and 	con_sts.RowID='".$RowID."'ORDER BY con_sts_cat_cd";

	$stmt_con_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_con_sts ) {
		 $error_message = "Error selecting table (con_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $ContractStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_con_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $ContractStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_con_sts) );
	
	
returnData($ContractStatus);

sqlsrv_free_stmt($stmt_con_sts);
sqlsrv_close($conn);

function returnData($ContractStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$ContractStatus
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