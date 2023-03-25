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




$sql= "	SELECT 	 ast_cod.site_cd,   
				 ast_cod.ast_cod_ast_cd,   
				 ast_cod.ast_cod_desc, 
				 ast_cod.ast_cod_disable_flag,
				 ast_cod.audit_user,   
				 ast_cod.audit_date,   				 
				 ast_cod.column1,   
				 ast_cod.column2,   
				 ast_cod.column3,   
				 ast_cod.column4,   
				 ast_cod.column5,   
				 ast_cod.RowID 
				 
		FROM 	ast_cod (NOLOCK)
		WHERE 	ast_cod.site_cd = '".$site_cd."'
		and 	ast_cod.RowID='".$RowID."'ORDER BY ast_cod_ast_cd";

	$stmt_ast_cod = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_cod ) {
		 $error_message = "Error selecting table (ast_cod Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_cod, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_cod) );
	
	
returnData($AssetCode);

sqlsrv_free_stmt($stmt_ast_cod);
sqlsrv_close($conn);

function returnData($AssetCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetCode
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