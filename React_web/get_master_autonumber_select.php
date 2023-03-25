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




$sql= "	SELECT 	 cnt_mst.site_cd,   
				 cnt_mst.cnt_mst_module_cd,   
				 cnt_mst.cnt_mst_prefix, 
				 cnt_mst.cnt_mst_desc,
				 cnt_mst.cnt_mst_counter,
				 cnt_mst.cnt_mst_numbering,
				 cnt_mst.cnt_mst_option, 				 
				 cnt_mst.audit_user,   
				 cnt_mst.audit_date,   				 
				 cnt_mst.column1,   
				 cnt_mst.column2,   
				 cnt_mst.column3,   
				 cnt_mst.column4,   
				 cnt_mst.column5,   
				 cnt_mst.RowID 
				 
		FROM 	cnt_mst (NOLOCK)
		WHERE 	cnt_mst.site_cd = '".$site_cd."'
		and 	cnt_mst.RowID='".$RowID."'ORDER BY cnt_mst_module_cd";

	$stmt_cnt_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_cnt_mst ) {
		 $error_message = "Error selecting table (cnt_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $AutoNumber = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cnt_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $AutoNumber[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cnt_mst) );
	
	
returnData($AutoNumber);

sqlsrv_free_stmt($stmt_cnt_mst);
sqlsrv_close($conn);

function returnData($AutoNumber)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$AutoNumber
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