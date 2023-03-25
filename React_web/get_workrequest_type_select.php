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




$sql= "	SELECT 	 ast_type.site_cd,   
				 ast_type.ast_type_cd,   
				 ast_type.ast_type_descs,   
				 ast_type.ast_type_disable_flag,  
				 ast_type.audit_user,   
				 ast_type.audit_date,   
				 ast_type.column1,   
				 ast_type.column2,   
				 ast_type.column3,   
				 ast_type.column4,   
				 ast_type.column5,   
				 ast_type.RowID 
				 
		FROM 	ast_type (NOLOCK)
		WHERE 	ast_type.site_cd = '".$site_cd."'
		and 	ast_type.RowID='".$RowID."'ORDER BY ast_type_cd";

	$stmt_asset_type = sqlsrv_query( $conn, $sql);

	if( !$stmt_asset_type ) {
		 $error_message = "Error selecting table (asset_type Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetType = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_asset_type, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetType[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_asset_type) );
	
	
returnData($AssetType);

sqlsrv_free_stmt($stmt_asset_type);
sqlsrv_close($conn);

function returnData($AssetType)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetType
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