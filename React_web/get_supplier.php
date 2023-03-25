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


$sql= "	SELECT 	sup_mst.sup_mst_supplier_cd, sup_mst.sup_mst_desc, sup_mst.sup_mst_status  
		FROM	sup_mst, sup_sts  
		WHERE (sup_mst.site_cd = sup_sts.site_cd  
		AND	   sup_mst.sup_mst_status = sup_sts.sup_sts_status  
		AND	sup_sts.sup_sts_typ_cd NOT IN ('DEACTIVATE')) 
		AND sup_mst.site_cd = 'MSW' ";


	$stmt_sup_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_sup_mst ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Supplier= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_sup_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Supplier[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_sup_mst) );
	
	
returnData($Supplier);

sqlsrv_free_stmt($stmt_sup_mst);
sqlsrv_close($conn);

function returnData($Supplier)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Supplier
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