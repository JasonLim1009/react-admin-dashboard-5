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
$ast_aud_asset_no = $_REQUEST['ast_aud_asset_no'];

$RowID = $_REQUEST['RowID'];


	$sql= "	SELECT 	ast_aud.site_cd,   
					ast_aud.mst_RowID,   
					ast_aud.ast_aud_asset_no,   
					ast_aud.ast_aud_status,    
					ast_sts.ast_sts_desc,
					ast_aud.ast_aud_originator,   
					ast_aud.ast_aud_start_date,   
					ast_aud.ast_aud_end_date,   
					duration = DateDiff( mi, ast_aud_start_date, ast_aud_end_date ),
					ast_aud.audit_user,   
					ast_aud.audit_date,   
					ast_aud.column1,   
					ast_aud.column2,   
					ast_aud.column3,   
					ast_aud.column4,   
					ast_aud.column5,   
					ast_aud.RowID,
					ast_mst_asset_status,
					ast_mst_asset_shortdesc,
					emp_mst.emp_mst_name
		FROM		ast_mst,
					ast_aud

		LEFT 
		OUTER 
		JOIN 		ast_sts
		ON 			ast_aud.site_cd = ast_sts.site_cd 
		AND 		ast_aud.ast_aud_status = ast_sts.ast_sts_status
		
		LEFT 
		OUTER 
		JOIN 		emp_mst
		ON 			ast_aud.site_cd = emp_mst.site_cd 
		AND 		ast_aud.RowID = emp_mst.RowID

		WHERE 		ast_aud.site_cd = ast_mst.site_cd
		AND			ast_mst.RowID = ast_aud.mst_RowID
		AND			ast_mst.RowID = '".$RowID."' order by ast_aud_start_date ASC";

	$stmt_ast_aud = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_aud ) {
		 $error_message = "Error selecting table (ast_aud123)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $json =array();
     

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ast_aud, SQLSRV_FETCH_ASSOC)) {	
		 
			   $json[]=$row;
		
		 }
	} while ( sqlsrv_next_result($stmt_ast_aud) );
	
	
	
returnData($json);

sqlsrv_free_stmt($stmt_ast_aud);
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