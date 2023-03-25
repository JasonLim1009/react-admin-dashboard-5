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




$sql= "	SELECT 	 com_mst.site_cd,   
				 com_mst.com_mst_com_code,   
				 com_mst.com_mst_desc, 
				 com_mst.com_mst_disable_flag,
				 com_mst.com_mst_cost_cat_id, 
				 com_mst.audit_user,   
				 com_mst.audit_date,   				 
				 com_mst.column1,   
				 com_mst.column2,   
				 com_mst.column3,   
				 com_mst.column4,   
				 com_mst.column5,   
				 com_mst.RowID 
				 
		FROM 	com_mst (NOLOCK)
		WHERE 	com_mst.site_cd = '".$site_cd."'
		and 	com_mst.RowID='".$RowID."'ORDER BY com_mst_com_code";

	$stmt_com_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_com_mst ) {
		 $error_message = "Error selecting table (com_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $CommodityCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_com_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $CommodityCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_com_mst) );
	
	
returnData($CommodityCode);

sqlsrv_free_stmt($stmt_com_mst);
sqlsrv_close($conn);

function returnData($CommodityCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$CommodityCode
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