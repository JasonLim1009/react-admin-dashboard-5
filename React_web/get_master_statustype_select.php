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




$sql= "	SELECT 	 sts_typ.site_cd,   
				 sts_typ.sts_typ_cat_cd,   
				 sts_typ.sts_typ_typ_cd, 
				 sts_typ.sts_typ_desc,     
				 sts_typ.audit_user,   
				 sts_typ.audit_date,   				 
				 sts_typ.column1,   
				 sts_typ.column2,   
				 sts_typ.column3,   
				 sts_typ.column4,   
				 sts_typ.column5,   
				 sts_typ.RowID 
				 
		FROM 	sts_typ (NOLOCK)
		WHERE 	sts_typ.site_cd = '".$site_cd."'
		and 	sts_typ.RowID='".$RowID."'ORDER BY sts_typ_cat_cd";

	$stmt_sts_typ = sqlsrv_query( $conn, $sql);

	if( !$stmt_sts_typ ) {
		 $error_message = "Error selecting table (sts_typ Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $StatusType = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_sts_typ, SQLSRV_FETCH_ASSOC)) {	
		 
			   $StatusType[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_sts_typ) );
	
	
returnData($StatusType);

sqlsrv_free_stmt($stmt_sts_typ);
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