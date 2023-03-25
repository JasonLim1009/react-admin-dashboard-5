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




$sql= "	SELECT 	 wrk_ccd.site_cd,   
				 wrk_ccd.wrk_ccd_cause_cd,   
				 wrk_ccd.wrk_ccd_desc, 
				 wrk_ccd.wrk_ccd_disable_flag,      
				 wrk_ccd.audit_user,   
				 wrk_ccd.audit_date,   				 
				 wrk_ccd.column1,   
				 wrk_ccd.column2,   
				 wrk_ccd.column3,   
				 wrk_ccd.column4,   
				 wrk_ccd.column5,   
				 wrk_ccd.RowID 
				 
		FROM 	wrk_ccd (NOLOCK)
		WHERE 	wrk_ccd.site_cd = '".$site_cd."'
		and 	wrk_ccd.RowID='".$RowID."'ORDER BY wrk_ccd_cause_cd";

	$stmt_wrk_ccd = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_ccd ) {
		 $error_message = "Error selecting table (wrk_ccd Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkCause = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_ccd, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkCause[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_ccd) );
	
	
returnData($WorkCause);

sqlsrv_free_stmt($stmt_wrk_ccd);
sqlsrv_close($conn);

function returnData($WorkCause)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkCause
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