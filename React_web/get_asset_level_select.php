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




$sql= "	SELECT 	 ast_lvl.site_cd,   
				 ast_lvl.ast_lvl_ast_lvl,   
				 ast_lvl.ast_lvl_desc, 
				 ast_lvl.ast_lvl_disable_flag,
				 ast_lvl.audit_user,   
				 ast_lvl.audit_date,   				 
				 ast_lvl.column1,   
				 ast_lvl.column2,   
				 ast_lvl.column3,   
				 ast_lvl.column4,   
				 ast_lvl.column5,   
				 ast_lvl.RowID 
				 
		FROM 	ast_lvl (NOLOCK)
		WHERE 	ast_lvl.site_cd = '".$site_cd."'
		and 	ast_lvl.RowID='".$RowID."'ORDER BY ast_lvl_ast_lvl";

	$stmt_ast_lvl = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_lvl ) {
		 $error_message = "Error selecting table (ast_lvl Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetLevel = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_lvl, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetLevel[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_lvl) );
	
	
returnData($AssetLevel);

sqlsrv_free_stmt($stmt_ast_lvl);
sqlsrv_close($conn);

function returnData($AssetLevel)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetLevel
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