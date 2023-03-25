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




$sql= "	SELECT 	 sup_sts.site_cd,   
				 sup_sts.sup_sts_cat_cd,   
				 sup_sts.sup_sts_typ_cd, 
				 sup_sts.sup_sts_status,
				 sup_sts.sup_sts_desc,
				 sup_sts.sup_sts_disable_flag, 				 
				 sup_sts.audit_user,   
				 sup_sts.audit_date,   				 
				 sup_sts.column1,   
				 sup_sts.column2,   
				 sup_sts.column3,   
				 sup_sts.column4,   
				 sup_sts.column5,   
				 sup_sts.RowID 
				 
		FROM 	sup_sts (NOLOCK)
		WHERE 	sup_sts.site_cd = '".$site_cd."'
		and 	sup_sts.RowID='".$RowID."'ORDER BY sup_sts_cat_cd";

	$stmt_sup_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_sup_sts ) {
		 $error_message = "Error selecting table (sup_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $SupplierStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_sup_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $SupplierStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_sup_sts) );
	
	
returnData($SupplierStatus);

sqlsrv_free_stmt($stmt_sup_sts);
sqlsrv_close($conn);

function returnData($SupplierStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$SupplierStatus
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