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




$sql= "	SELECT 	ast_grp.site_cd,   
				ast_grp.ast_grp_grp_cd,   
				ast_grp.ast_grp_desc,   
				ast_grp.ast_grp_disable_flag,   
				ast_grp.ast_grp_counter,
				ast_grp.ast_grp_serial,
				ast_grp.ast_grp_separator,
				ast_grp.ast_grp_option,				
				ast_grp.audit_user,   
				ast_grp.audit_date,   
				ast_grp.column1,   
				ast_grp.column2,   
				ast_grp.column3,   
				ast_grp.column4,   
				ast_grp.column5,    
				ast_grp.RowID 
				 
		FROM 	ast_grp (NOLOCK)
		WHERE 	ast_grp.site_cd = '".$site_cd."'
		and 	ast_grp.RowID='".$RowID."'ORDER BY ast_grp_grp_cd";

	$stmt_ast_grp = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_grp ) {
		 $error_message = "Error selecting table (ast_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetGroupCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetGroupCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_grp) );
	
	
returnData($AssetGroupCode);

sqlsrv_free_stmt($stmt_ast_grp);
sqlsrv_close($conn);

function returnData($AssetGroupCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetGroupCode
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