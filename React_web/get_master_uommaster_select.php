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




$sql= "	SELECT 	 uom_mst.site_cd,   
				 uom_mst.uom_mst_type,   
				 uom_mst.uom_mst_uom, 
				 uom_mst.uom_mst_desc, 
				 uom_mst.uom_mst_disable_flag,      
				 uom_mst.audit_user,   
				 uom_mst.audit_date,   				 
				 uom_mst.column1,   
				 uom_mst.column2,   
				 uom_mst.column3,   
				 uom_mst.column4,   
				 uom_mst.column5,   
				 uom_mst.RowID 
				 
		FROM 	uom_mst (NOLOCK)
		WHERE 	uom_mst.site_cd = '".$site_cd."'
		and 	uom_mst.RowID='".$RowID."'ORDER BY uom_mst_type";

	$stmt_uom_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_uom_mst ) {
		 $error_message = "Error selecting table (uom_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $UOMMaster = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_uom_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $UOMMaster[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_uom_mst) );
	
	
returnData($UOMMaster);

sqlsrv_free_stmt($stmt_uom_mst);
sqlsrv_close($conn);

function returnData($UOMMaster)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$UOMMaster
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