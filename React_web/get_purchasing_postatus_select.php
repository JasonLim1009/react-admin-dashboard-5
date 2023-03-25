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




$sql= "	SELECT 	 puo_sts.site_cd,   
				 puo_sts.puo_sts_st_cat_cd,   
				 puo_sts.puo_sts_status_type, 
				 puo_sts.puo_sts_status,
				 puo_sts.puo_sts_description,
				 puo_sts.puo_sts_email_flag,
				 puo_sts.puo_sts_disable_flag, 				 
				 puo_sts.audit_user,   
				 puo_sts.audit_date,   				 
				 puo_sts.column1,   
				 puo_sts.column2,   
				 puo_sts.column3,   
				 puo_sts.column4,   
				 puo_sts.column5,   
				 puo_sts.RowID 
				 
		FROM 	puo_sts (NOLOCK)
		WHERE 	puo_sts.site_cd = '".$site_cd."'
		and 	puo_sts.RowID='".$RowID."'ORDER BY puo_sts_st_cat_cd";

	$stmt_puo_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_puo_sts ) {
		 $error_message = "Error selecting table (puo_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $PoStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_puo_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $PoStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_puo_sts) );
	
	
returnData($PoStatus);

sqlsrv_free_stmt($stmt_puo_sts);
sqlsrv_close($conn);

function returnData($PoStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$PoStatus
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