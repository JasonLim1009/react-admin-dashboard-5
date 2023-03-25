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




$sql= "	SELECT 	 mst_war.site_cd,   
				 mst_war.mst_war_work_area,   
				 mst_war.mst_war_desc, 
				 mst_war.mst_war_disable_flag,
				 mst_war.audit_user,   
				 mst_war.audit_date,   				 
				 mst_war.column1,   
				 mst_war.column2,   
				 mst_war.column3,   
				 mst_war.column4,   
				 mst_war.column5,   
				 mst_war.RowID 
				 
		FROM 	mst_war (NOLOCK)
		WHERE 	mst_war.site_cd = '".$site_cd."'
		and 	mst_war.RowID='".$RowID."'ORDER BY mst_war_work_area";

	$stmt_mst_war = sqlsrv_query( $conn, $sql);

	if( !$stmt_mst_war ) {
		 $error_message = "Error selecting table (mst_war)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AssetWorkArea = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_mst_war, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AssetWorkArea[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_mst_war) );
	
	
returnData($AssetWorkArea);

sqlsrv_free_stmt($stmt_mst_war);
sqlsrv_close($conn);

function returnData($AssetWorkArea)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AssetWorkArea
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