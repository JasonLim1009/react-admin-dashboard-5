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




$sql= "	SELECT 	 wrk_grp.site_cd,   
				 wrk_grp.wrk_grp_grp_cd,   
				 wrk_grp.wrk_grp_desc, 
				 wrk_grp.wrk_grp_disable_flag,      
				 wrk_grp.audit_user,   
				 wrk_grp.audit_date,   				 
				 wrk_grp.column1,   
				 wrk_grp.column2,   
				 wrk_grp.column3,   
				 wrk_grp.column4,   
				 wrk_grp.column5,   
				 wrk_grp.RowID 
				 
		FROM 	wrk_grp (NOLOCK)
		WHERE 	wrk_grp.site_cd = '".$site_cd."'
		and 	wrk_grp.RowID='".$RowID."'ORDER BY wrk_grp_grp_cd";

	$stmt_wrk_grp = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_grp ) {
		 $error_message = "Error selecting table (wrk_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkGroup = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkGroup[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_grp) );
	
	
returnData($WorkGroup);

sqlsrv_free_stmt($stmt_wrk_grp);
sqlsrv_close($conn);

function returnData($WorkGroup)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkGroup
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