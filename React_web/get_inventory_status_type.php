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
$sts_typ_cat_cd = $_REQUEST['sts_typ_cat_cd'];


$sql= "	SELECT 	 sts_typ.sts_typ_typ_cd, sts_typ.sts_typ_desc				 
		FROM 	sts_typ (NOLOCK)
		WHERE 	sts_typ.site_cd = '".$site_cd."'
		and 	sts_typ.sts_typ_cat_cd = '".$sts_typ_cat_cd."' ORDER BY sts_typ_typ_cd";

	$stmt_ast_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_sts ) {
		 $error_message = "Error selecting table (sts_typ Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $StatusType= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $StatusType[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_sts) );
	
	
returnData($StatusType);

sqlsrv_free_stmt($stmt_ast_sts);
sqlsrv_close($conn);

function returnData($StatusType)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$StatusType
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