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



$RowID = $_REQUEST['RowID'];




$sql= "	SELECT 	cf_language.language_cd,           
				cf_language.descs,           
				cf_language.audit_user,           
				cf_language.audit_date,           
				cf_language.column1,           
				cf_language.column2,           
				cf_language.column3,           
				cf_language.column4,           
				cf_language.column5,           
				cf_language.RowID
				 
		FROM 	cf_language (NOLOCK)
		WHERE 	cf_language.RowID='".$RowID."'ORDER BY language_cd";

	$stmt_cf_language = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_language ) {
		 $error_message = "Error selecting table (cf_language Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Language0 = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_language, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Language[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_language) );
	
	
returnData($Language);

sqlsrv_free_stmt($stmt_cf_language);
sqlsrv_close($conn);

function returnData($Language)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Language
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