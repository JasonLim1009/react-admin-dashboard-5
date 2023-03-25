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




$sql= "	SELECT 	 cus_sts.site_cd,   
				 cus_sts.cus_sts_cat_cd,   
				 cus_sts.cus_sts_typ_cd, 
				 cus_sts.cus_sts_status,
				 cus_sts.cus_sts_desc,
				 cus_sts.cus_sts_disable_flag, 				 
				 cus_sts.audit_user,   
				 cus_sts.audit_date,   				 
				 cus_sts.column1,   
				 cus_sts.column2,   
				 cus_sts.column3,   
				 cus_sts.column4,   
				 cus_sts.column5,   
				 cus_sts.RowID 
				 
		FROM 	cus_sts (NOLOCK)
		WHERE 	cus_sts.site_cd = '".$site_cd."'
		and 	cus_sts.RowID='".$RowID."'ORDER BY cus_sts_cat_cd";

	$stmt_cus_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_cus_sts ) {
		 $error_message = "Error selecting table (cus_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $CustomerStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cus_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $CustomerStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cus_sts) );
	
	
returnData($CustomerStatus);

sqlsrv_free_stmt($stmt_cus_sts);
sqlsrv_close($conn);

function returnData($CustomerStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$CustomerStatus
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