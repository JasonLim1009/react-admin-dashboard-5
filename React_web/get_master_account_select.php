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




$sql= "	SELECT 	 cf_account.site_cd,   
				 cf_account.account,   
				 cf_account.descs, 
				 cf_account.disable_flag,      
				 cf_account.audit_user,   
				 cf_account.audit_date,   				 
				 cf_account.column1,   
				 cf_account.column2,   
				 cf_account.column3,   
				 cf_account.column4,   
				 cf_account.column5,   
				 cf_account.RowID 
				 
		FROM 	cf_account (NOLOCK)
		WHERE 	cf_account.site_cd = '".$site_cd."'
		and 	cf_account.RowID='".$RowID."'ORDER BY account";

	$stmt_cf_account = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_account ) {
		 $error_message = "Error selecting table (cf_account Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Account = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_account, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Account[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_account) );
	
	
returnData($Account);

sqlsrv_free_stmt($stmt_cf_account);
sqlsrv_close($conn);

function returnData($Account)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Account
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