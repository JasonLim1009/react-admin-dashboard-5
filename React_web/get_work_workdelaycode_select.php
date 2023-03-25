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




$sql= "	SELECT 	 wrk_dcd.site_cd,   
				 wrk_dcd.wrk_dcd_delay_cd,   
				 wrk_dcd.wrk_dcd_desc, 
				 wrk_dcd.wrk_dcd_disable_flag,      
				 wrk_dcd.audit_user,   
				 wrk_dcd.audit_date,   				 
				 wrk_dcd.column1,   
				 wrk_dcd.column2,   
				 wrk_dcd.column3,   
				 wrk_dcd.column4,   
				 wrk_dcd.column5,   
				 wrk_dcd.RowID 
				 
		FROM 	wrk_dcd (NOLOCK)
		WHERE 	wrk_dcd.site_cd = '".$site_cd."'
		and 	wrk_dcd.RowID='".$RowID."'ORDER BY wrk_dcd_delay_cd";

	$stmt_wrk_dcd = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_dcd ) {
		 $error_message = "Error selecting table (wrk_dcd Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkDelay = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_dcd, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkDelay[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_dcd) );
	
	
returnData($WorkDelay);

sqlsrv_free_stmt($stmt_wrk_dcd);
sqlsrv_close($conn);

function returnData($WorkDelay)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkDelay
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