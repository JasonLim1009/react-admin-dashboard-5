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




$sql= "	SELECT 	 ast_loc.site_cd,   
				 ast_loc.ast_loc_ast_loc,   
				 ast_loc.ast_loc_desc,   
				 ast_loc.ast_loc_wr_option,
				 ast_loc.ast_loc_wr_prefix,
				 ast_loc.ast_loc_wr_counter,
				 ast_loc.ast_loc_wo_option,
				 ast_loc.ast_loc_wo_prefix,
				 ast_loc.ast_loc_wo_counter,
				 ast_loc.ast_loc_pm_option,
				 ast_loc.ast_loc_pm_prefix,
				 ast_loc.ast_loc_pm_counter,
				 ast_loc.ast_loc_disable_flag,   
				 ast_loc.audit_user,   
				 ast_loc.audit_date,      				 
				 ast_loc.column1,   
				 ast_loc.column2,   
				 ast_loc.column3,   
				 ast_loc.column4,   
				 ast_loc.column5,   
				 ast_loc.RowID 
				 
		FROM 	ast_loc (NOLOCK)
		WHERE 	ast_loc.site_cd = '".$site_cd."'
		and 	ast_loc.RowID='".$RowID."'ORDER BY ast_loc_ast_loc";

	$stmt_ast_loc = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_loc ) {
		 $error_message = "Error selecting table (ast_loc Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetLocation = array();

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