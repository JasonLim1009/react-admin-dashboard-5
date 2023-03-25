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




$sql= "	SELECT 	 wrk_act.site_cd,   
				 wrk_act.wrk_act_action_cd,   
				 wrk_act.wrk_act_desc, 
				 wrk_act.wrk_act_disable_flag,      
				 wrk_act.audit_user,   
				 wrk_act.audit_date,   				 
				 wrk_act.column1,   
				 wrk_act.column2,   
				 wrk_act.column3,   
				 wrk_act.column4,   
				 wrk_act.column5,   
				 wrk_act.RowID 
				 
		FROM 	wrk_act (NOLOCK)
		WHERE 	wrk_act.site_cd = '".$site_cd."'
		and 	wrk_act.RowID='".$RowID."'ORDER BY wrk_act_action_cd";

	$stmt_wrk_act = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_act ) {
		 $error_message = "Error selecting table (wrk_act Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkAction = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_act, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkAction[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_act) );
	
	
returnData($WorkAction);

sqlsrv_free_stmt($stmt_wrk_act);
sqlsrv_close($conn);

function returnData($WorkAction)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkAction
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