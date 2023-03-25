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




$sql= "	SELECT 	 prj_mst.site_cd,   
				 prj_mst.prj_mst_prj_cd,   
				 prj_mst.prj_mst_desc, 
				 prj_mst.prj_mst_costcenter, 
				 prj_mst.prj_mst_laccount,
				 prj_mst.prj_mst_maccount,   
				 prj_mst.prj_mst_caccount,   
				 prj_mst.prj_mst_prj_date, 
				 prj_mst.prj_mst_due_date, 
				 prj_mst.prj_mst_budget,
				 prj_mst.prj_mst_approved,
				 prj_mst.prj_mst_disable_flag,
				 prj_mst.audit_user,   
				 prj_mst.audit_date,   				 
				 prj_mst.column1,   
				 prj_mst.column2,   
				 prj_mst.column3,   
				 prj_mst.column4,   
				 prj_mst.column5,   
				 prj_mst.RowID 
				 
		FROM 	prj_mst (NOLOCK)
		WHERE 	prj_mst.site_cd = '".$site_cd."'
		and 	prj_mst.RowID='".$RowID."'ORDER BY prj_mst_prj_cd";

	$stmt_prj_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_prj_mst) {
		 $error_message = "Error selecting table (prj_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $ProjectMaster = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_prj_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $ProjectMaster[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_prj_mst) );
	
	
returnData($ProjectMaster);

sqlsrv_free_stmt($stmt_prj_mst);
sqlsrv_close($conn);

function returnData($ProjectMaster)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$ProjectMaster
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