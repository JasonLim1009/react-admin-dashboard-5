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


$sql= "	SELECT 	ast_loc.ast_loc_ast_loc, ast_loc.ast_loc_desc, ast_loc.ast_loc_wr_option, ast_loc.ast_loc_wo_option, ast_loc.ast_loc_pm_option 
		FROM 	ast_loc     
		WHERE (	ast_loc.ast_loc_disable_flag = 0      ) 
		AND ast_loc.site_cd = '".$site_cd."'";


	$stmt_ast_loc = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_loc ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetLocation= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_loc, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetLocation[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_loc) );
	
	
returnData($AssetLocation);

sqlsrv_free_stmt($stmt_ast_loc);
sqlsrv_close($conn);

function returnData($AssetLocation)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetLocation
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