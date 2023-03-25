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




$sql= "	SELECT 	 itm_sts.site_cd,   
				 itm_sts.itm_sts_cat_cd,   
				 itm_sts.itm_sts_typ_cd, 
				 itm_sts.itm_sts_status,
				 itm_sts.itm_sts_desc, 
				 itm_sts.itm_sts_disable_flag, 
				 itm_sts.audit_user,   
				 itm_sts.audit_date,   				 
				 itm_sts.column1,   
				 itm_sts.column2,   
				 itm_sts.column3,   
				 itm_sts.column4,   
				 itm_sts.column5,   
				 itm_sts.RowID 
				 
		FROM 	itm_sts (NOLOCK)
		WHERE 	itm_sts.site_cd = '".$site_cd."'
		and 	itm_sts.RowID='".$RowID."'ORDER BY itm_sts_cat_cd";

	$stmt_itm_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_itm_sts ) {
		 $error_message = "Error selecting table (itm_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $MaterialStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_itm_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $MaterialStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_itm_sts) );
	
	
returnData($MaterialStatus);

sqlsrv_free_stmt($stmt_itm_sts);
sqlsrv_close($conn);

function returnData($MaterialStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$MaterialStatus
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