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




$sql= "	SELECT 	 crf_mst.site_cd,   
				 crf_mst.crf_mst_crf_cd,   
				 crf_mst.crf_mst_desc, 
				 crf_mst.crf_mst_crf_est_rate,
				 crf_mst.crf_mst_change_date,
				 crf_mst.crf_mst_disable_flag,      
				 crf_mst.audit_user,   
				 crf_mst.audit_date,   				 
				 crf_mst.column1,   
				 crf_mst.column2,   
				 crf_mst.column3,   
				 crf_mst.column4,   
				 crf_mst.column5,   
				 crf_mst.RowID 
				 
		FROM 	crf_mst (NOLOCK)
		WHERE 	crf_mst.site_cd = '".$site_cd."'
		and 	crf_mst.RowID='".$RowID."'ORDER BY crf_mst_crf_cd";

	$stmt_crf_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_crf_mst ) {
		 $error_message = "Error selecting table (crf_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $CraftCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_crf_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $CraftCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_crf_mst) );
	
	
returnData($CraftCode);

sqlsrv_free_stmt($stmt_crf_mst);
sqlsrv_close($conn);

function returnData($CraftCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$CraftCode
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