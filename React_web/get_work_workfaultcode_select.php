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




$sql= "	SELECT 	 wrk_flt.site_cd,   
				 wrk_flt.wrk_flt_fault_cd,   
				 wrk_flt.wrk_flt_desc, 
				 wrk_flt.wrk_flt_disable_flag,      
				 wrk_flt.audit_user,   
				 wrk_flt.audit_date,   				 
				 wrk_flt.column1,   
				 wrk_flt.column2,   
				 wrk_flt.column3,   
				 wrk_flt.column4,   
				 wrk_flt.column5,   
				 wrk_flt.RowID 
				 
		FROM 	wrk_flt (NOLOCK)
		WHERE 	wrk_flt.site_cd = '".$site_cd."'
		and 	wrk_flt.RowID='".$RowID."'ORDER BY wrk_flt_fault_cd";

	$stmt_wrk_flt = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_flt ) {
		 $error_message = "Error selecting table (wrk_flt Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkFault = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_flt, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkFault[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_flt) );
	
	
returnData($WorkFault);

sqlsrv_free_stmt($stmt_wrk_flt);
sqlsrv_close($conn);

function returnData($WorkFault)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkFault
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