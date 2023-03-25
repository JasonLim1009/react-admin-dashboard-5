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




$sql= "	SELECT 	 pur_sts.site_cd,   
				 pur_sts.pur_sts_st_cat,   
				 pur_sts.pur_sts_status, 
				 pur_sts.pur_sts_description,
				 pur_sts.pur_sts_status_type,
				 pur_sts.pur_sts_email_flag,
				 pur_sts.pur_sts_disable_flag, 				 
				 pur_sts.audit_user,   
				 pur_sts.audit_date,   				 
				 pur_sts.column1,   
				 pur_sts.column2,   
				 pur_sts.column3,   
				 pur_sts.column4,   
				 pur_sts.column5,   
				 pur_sts.RowID 
				 
		FROM 	pur_sts (NOLOCK)
		WHERE 	pur_sts.site_cd = '".$site_cd."'
		and 	pur_sts.RowID='".$RowID."'ORDER BY pur_sts_st_cat";

	$stmt_pur_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_pur_sts ) {
		 $error_message = "Error selecting table (pur_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $PRStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_pur_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $PRStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_pur_sts) );
	
	
returnData($PRStatus);

sqlsrv_free_stmt($stmt_pur_sts);
sqlsrv_close($conn);

function returnData($PRStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$PRStatus
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