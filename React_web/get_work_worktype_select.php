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




$sql= "	SELECT 	 wrk_typ.site_cd,   
				 wrk_typ.wrk_typ_typ_cd,   
				 wrk_typ.wrk_typ_desc, 
				 wrk_typ.wrk_typ_disable_flag,      
				 wrk_typ.audit_user,   
				 wrk_typ.audit_date,   				 
				 wrk_typ.column1,   
				 wrk_typ.column2,   
				 wrk_typ.column3,   
				 wrk_typ.column4,   
				 wrk_typ.column5,   
				 wrk_typ.RowID 
				 
		FROM 	wrk_typ (NOLOCK)
		WHERE 	wrk_typ.site_cd = '".$site_cd."'
		and 	wrk_typ.RowID='".$RowID."'ORDER BY wrk_typ_typ_cd";

	$stmt_wrk_typ = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_typ ) {
		 $error_message = "Error selecting table (wrk_typ Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkType = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_typ, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkType[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_typ) );
	
	
returnData($WorkType);

sqlsrv_free_stmt($stmt_wrk_typ);
sqlsrv_close($conn);

function returnData($WorkType)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkType
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