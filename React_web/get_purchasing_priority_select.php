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




$sql= "	SELECT 	 puo_pri.site_cd,   
				 puo_pri.puo_pri_pri_cd,   
				 puo_pri.puo_pri_desc, 
				 puo_pri.puo_pri_disable_flag, 
				 puo_pri.puo_pri_req_date_count,      
				 puo_pri.audit_user,   
				 puo_pri.audit_date,   				 
				 puo_pri.column1,   
				 puo_pri.column2,   
				 puo_pri.column3,   
				 puo_pri.column4,   
				 puo_pri.column5,   
				 puo_pri.RowID 
				 
		FROM 	puo_pri (NOLOCK)
		WHERE 	puo_pri.site_cd = '".$site_cd."'
		and 	puo_pri.RowID='".$RowID."'ORDER BY puo_pri_pri_cd";

	$stmt_puo_pri = sqlsrv_query( $conn, $sql);

	if( !$stmt_puo_pri ) {
		 $error_message = "Error selecting table (puo_pri Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Priority = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_puo_pri, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Priority[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_puo_pri) );
	
	
returnData($Priority);

sqlsrv_free_stmt($stmt_puo_pri);
sqlsrv_close($conn);

function returnData($Priority)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Priority
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