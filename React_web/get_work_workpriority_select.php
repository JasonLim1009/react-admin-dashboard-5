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




$sql= "	SELECT 	 wrk_pri.site_cd,   
				 wrk_pri.wrk_pri_pri_cd,   
				 wrk_pri.wrk_pri_desc, 
				 wrk_pri.wrk_pri_due_date_count, 				 
				 wrk_pri.wrk_pri_disable_flag,      
				 wrk_pri.audit_user,   
				 wrk_pri.audit_date,   				 
				 wrk_pri.column1,   
				 wrk_pri.column2,   
				 wrk_pri.column3,   
				 wrk_pri.column4,   
				 wrk_pri.column5,   
				 wrk_pri.RowID 
				 
		FROM 	wrk_pri (NOLOCK)
		WHERE 	wrk_pri.site_cd = '".$site_cd."'
		and 	wrk_pri.RowID='".$RowID."'ORDER BY wrk_pri_pri_cd";

	$stmt_wrk_pri = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_pri ) {
		 $error_message = "Error selecting table (wrk_pri Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkPriority = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_pri, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkPriority[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_pri) );
	
	
returnData($WorkPriority);

sqlsrv_free_stmt($stmt_wrk_pri);
sqlsrv_close($conn);

function returnData($WorkPriority)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkPriority
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