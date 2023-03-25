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




$sql= "	SELECT 	 puo_grp.site_cd,   
				 puo_grp.puo_grp_grp_cd,   
				 puo_grp.puo_grp_desc, 
				 puo_grp.puo_grp_disable_flag,      
				 puo_grp.audit_user,   
				 puo_grp.audit_date,   				 
				 puo_grp.column1,   
				 puo_grp.column2,   
				 puo_grp.column3,   
				 puo_grp.column4,   
				 puo_grp.column5,   
				 puo_grp.RowID 
				 
		FROM 	puo_grp (NOLOCK)
		WHERE 	puo_grp.site_cd = '".$site_cd."'
		and 	puo_grp.RowID='".$RowID."'ORDER BY puo_grp_grp_cd";

	$stmt_puo_grp = sqlsrv_query( $conn, $sql);

	if( !$stmt_puo_grp ) {
		 $error_message = "Error selecting table (puo_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $PurchasingType = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_puo_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $PurchasingType[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_puo_grp) );
	
	
returnData($PurchasingType);

sqlsrv_free_stmt($stmt_puo_grp);
sqlsrv_close($conn);

function returnData($PurchasingType)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$PurchasingType
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