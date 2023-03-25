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




$sql= "	SELECT 	 cur_mst.site_cd,   
				 cur_mst.cur_mst_cur_code,   
				 cur_mst.cur_mst_desc, 
				 cur_mst.cur_mst_exchange_rate,
				 cur_mst.cur_mst_label,
				 cur_mst.cur_mst_format_string,
				 cur_mst.cur_mst_exchange_rate_date, 				 
				 cur_mst.audit_user,   
				 cur_mst.audit_date,   				 
				 cur_mst.column1,   
				 cur_mst.column2,   
				 cur_mst.column3,   
				 cur_mst.column4,   
				 cur_mst.column5,   
				 cur_mst.RowID 
				 
		FROM 	cur_mst (NOLOCK)
		WHERE 	cur_mst.site_cd = '".$site_cd."'
		and 	cur_mst.RowID='".$RowID."'ORDER BY cur_mst_cur_code";

	$stmt_cur_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_cur_mst ) {
		 $error_message = "Error selecting table (cur_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $CurrencyCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cur_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $CurrencyCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cur_mst) );
	
	
returnData($CurrencyCode);

sqlsrv_free_stmt($stmt_cur_mst);
sqlsrv_close($conn);

function returnData($CurrencyCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$CurrencyCode
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