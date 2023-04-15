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
/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

$error_message;
$valid = true;


$site_cd = $_REQUEST['site_cd'];
$wko_sts_wo_no = $_REQUEST['wko_sts_wo_no'];

$RowID = $_REQUEST['RowID'];


	$sql= "	SELECT 	wko_sts.site_cd,   
					wko_sts.mst_RowID,   
					wko_sts.wko_sts_wo_no,   
					wko_sts.wko_sts_status,   
					wko_sts.wko_sts_originator,   
					wko_sts.wko_sts_start_date,   
					wko_sts.wko_sts_end_date,   
					duration = DateDiff( mi, wko_sts_start_date, wko_sts_end_date ),
					emp_mst.emp_mst_name,
					wko_sts.audit_user,   
					wko_sts.audit_date,   
					wko_sts.column1,   
					wko_sts.column2,   
					wko_sts.column3,   
					wko_sts.column4,   
					wko_sts.column5,   
					wko_sts.RowID,
					wko_mst_status,
					wko_mst_descs,
					wrk_sts.wrk_sts_desc
					
			FROM	wko_mst (NOLOCK)

	INNER 
	JOIN 			wko_sts (NOLOCK)
	ON 				wko_sts.site_cd = wko_mst.site_cd
	AND				wko_mst.RowID = wko_sts.mst_RowID

	LEFT 
	OUTER 
	JOIN 			emp_mst
	ON 				wko_sts.site_cd = emp_mst.site_cd 
	AND 			wko_sts.wko_sts_originator = emp_mst.emp_mst_login_id
	
	LEFT 
	OUTER 
	JOIN			wrk_sts (NOLOCK)
	ON				wko_sts.site_cd = wrk_sts.site_cd
	AND				wko_sts.wko_sts_status = wrk_sts.wrk_sts_status

	WHERE 	wko_mst.RowID ='".$RowID."' order by wko_sts_start_date ASC";

	$stmt_wko_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_wko_sts ) {
		 $error_message = "Error selecting table (wko_sts123)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $json =array();
     

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wko_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $json[]=$row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wko_sts) );
	
	
	
returnData($json);

sqlsrv_free_stmt($stmt_wko_sts);
sqlsrv_close($conn);




function returnData($json)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$json
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