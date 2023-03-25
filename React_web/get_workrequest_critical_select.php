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




$sql= "	SELECT 	 ast_cri.site_cd,   
				 ast_cri.ast_cri_cri_factor,   
				 ast_cri.ast_cri_min_delay, 
				 ast_cri.ast_cri_emergency,
				 ast_cri.ast_cri_desc,
				 ast_cri.ast_cri_disable_flag,
				 ast_cri.audit_user,   
				 ast_cri.audit_date,   				 
				 ast_cri.column1,   
				 ast_cri.column2,   
				 ast_cri.column3,   
				 ast_cri.column4,   
				 ast_cri.column5,   
				 ast_cri.RowID 
				 
		FROM 	ast_cri (NOLOCK)
		WHERE 	ast_cri.site_cd = '".$site_cd."'
		and 	ast_cri.RowID='".$RowID."'ORDER BY ast_cri_cri_factor";

	$stmt_ast_cri = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_cri ) {
		 $error_message = "Error selecting table (ast_cri Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetCriticalFactor = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_cri, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetCriticalFactor[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_cri) );
	
	
returnData($AssetCriticalFactor);

sqlsrv_free_stmt($stmt_ast_cri);
sqlsrv_close($conn);

function returnData($AssetCriticalFactor)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetCriticalFactor
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