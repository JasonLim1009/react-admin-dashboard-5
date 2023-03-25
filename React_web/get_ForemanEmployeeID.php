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


$sql= "	SELECT 	emp_mst.emp_mst_empl_id, emp_mst.emp_mst_name, emp_mst.emp_mst_title    
		FROM 	emp_mst (NOLOCK),  emp_det (NOLOCK), emp_sts (NOLOCK)  
		WHERE (	emp_mst.site_cd = emp_det.site_cd  
		AND		emp_mst.RowID = emp_det.mst_rowid  
		AND	 	emp_mst.site_cd = emp_sts.site_cd  
		AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
		AND		emp_sts.emp_sts_typ_cd = 'ACTIVE') 
		AND emp_mst.site_cd = '".$site_cd."' 
		AND emp_det_foreman = '1'";


	$stmt_uom_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_uom_mst ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $EMPid= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_uom_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $EMPid[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_uom_mst) );
	
	
returnData($EMPid);

sqlsrv_free_stmt($stmt_uom_mst);
sqlsrv_close($conn);

function returnData($EMPid)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$EMPid
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