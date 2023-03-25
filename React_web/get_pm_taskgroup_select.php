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




$sql= "	SELECT 	 dts_grp.site_cd,   
				 dts_grp.dts_grp_cd,   
				 dts_grp.dts_grp_desc, 
				 dts_grp.dts_grp_disable_flag,     
				 dts_grp.audit_user,   
				 dts_grp.audit_date,   				 
				 dts_grp.column1,   
				 dts_grp.column2,   
				 dts_grp.column3,   
				 dts_grp.column4,   
				 dts_grp.column5,   
				 dts_grp.RowID 
				 
		FROM 	dts_grp (NOLOCK)
		WHERE 	dts_grp.site_cd = '".$site_cd."'
		and 	dts_grp.RowID='".$RowID."'ORDER BY dts_grp_cd";

	$stmt_dts_grp= sqlsrv_query( $conn, $sql);

	if( !$stmt_dts_grp ) {
		 $error_message = "Error selecting table (dts_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $TaskGroup = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_dts_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $TaskGroup[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_dts_grp) );
	
	
returnData($TaskGroup);

sqlsrv_free_stmt($stmt_dts_grp);
sqlsrv_close($conn);

function returnData($TaskGroup)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$TaskGroup
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