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




$sql= "	SELECT 	 wrk_sts.site_cd,   
				 wrk_sts.wrk_sts_cat_cd,   
				 wrk_sts.wrk_sts_typ_cd,   
				 wrk_sts.wrk_sts_status,  
				 wrk_sts.wrk_sts_desc,   
				 wrk_sts.wrk_sts_wo_limit,
				 wrk_sts.wrk_sts_email_flag,   
				 wrk_sts.wrk_sts_disable_flag,   
				 wrk_sts.audit_user,   
				 wrk_sts.audit_date,   				 
				 wrk_sts.column1,   
				 wrk_sts.column2,   
				 wrk_sts.column3,   
				 wrk_sts.column4,   
				 wrk_sts.column5,   
				 wrk_sts.RowID 
				 
		FROM 	wrk_sts (NOLOCK)
		WHERE 	wrk_sts.site_cd = '".$site_cd."'
		and 	wrk_sts.RowID='".$RowID."'ORDER BY wrk_sts_cat_cd";

	$stmt_wrk_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_sts ) {
		 $error_message = "Error selecting table (wrk_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_sts) );
	
	
returnData($WorkStatus);

sqlsrv_free_stmt($stmt_wrk_sts);
sqlsrv_close($conn);

function returnData($WorkStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkStatus
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