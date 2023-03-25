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




$sql= "	SELECT 	 prm_grp.site_cd,   
				 prm_grp.prm_grp_grp_cd,   
				 prm_grp.prm_grp_desc, 
				 prm_grp.prm_grp_disable_flag,     
				 prm_grp.audit_user,   
				 prm_grp.audit_date,   				 
				 prm_grp.column1,   
				 prm_grp.column2,   
				 prm_grp.column3,   
				 prm_grp.column4,   
				 prm_grp.column5,   
				 prm_grp.RowID 
				 
		FROM 	prm_grp (NOLOCK)
		WHERE 	prm_grp.site_cd = '".$site_cd."'
		and 	prm_grp.RowID='".$RowID."'ORDER BY prm_grp_grp_cd";

	$stmt_prm_grp= sqlsrv_query( $conn, $sql);

	if( !$stmt_prm_grp ) {
		 $error_message = "Error selecting table (prm_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $GroupMaster = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_prm_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $GroupMaster[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_prm_grp) );
	
	
returnData($GroupMaster);

sqlsrv_free_stmt($stmt_prm_grp);
sqlsrv_close($conn);

function returnData($GroupMaster)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$GroupMaster
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