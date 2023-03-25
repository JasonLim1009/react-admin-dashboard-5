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




$sql= "	SELECT 	 ast_sts.site_cd,   
				 ast_sts.ast_sts_cat_cd,   
				 ast_sts.ast_sts_typ_cd, 
				 ast_sts.ast_sts_status,
				 ast_sts.ast_sts_desc,
				 ast_sts.ast_sts_isf_flag,
				 ast_sts.ast_sts_count_dwn_time,
				 ast_sts.ast_sts_generate_pm,
				 ast_sts.ast_sts_generate_route,
				 ast_sts.ast_sts_disable_flag,
				 ast_sts.audit_user,   
				 ast_sts.audit_date,   				 
				 ast_sts.column1,   
				 ast_sts.column2,   
				 ast_sts.column3,   
				 ast_sts.column4,   
				 ast_sts.column5,   
				 ast_sts.RowID 
				 
		FROM 	ast_sts (NOLOCK)
		WHERE 	ast_sts.site_cd = '".$site_cd."'
		and 	ast_sts.RowID='".$RowID."'ORDER BY ast_sts_cat_cd";

	$stmt_ast_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_sts ) {
		 $error_message = "Error selecting table (ast_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_sts) );
	
	
returnData($AssetStatus);

sqlsrv_free_stmt($stmt_ast_sts);
sqlsrv_close($conn);

function returnData($AssetStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetStatus
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