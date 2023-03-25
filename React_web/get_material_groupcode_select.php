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




$sql= "	SELECT 	 itm_grp.site_cd,   
				 itm_grp.itm_grp_cd,   
				 itm_grp.itm_grp_desc, 
				 itm_grp.itm_grp_disable_flag,      
				 itm_grp.audit_user,   
				 itm_grp.audit_date,   				 
				 itm_grp.column1,   
				 itm_grp.column2,   
				 itm_grp.column3,   
				 itm_grp.column4,   
				 itm_grp.column5,   
				 itm_grp.RowID 
				 
		FROM 	itm_grp (NOLOCK)
		WHERE 	itm_grp.site_cd = '".$site_cd."'
		and 	itm_grp.RowID='".$RowID."'ORDER BY itm_grp_cd";

	$stmt_itm_grp = sqlsrv_query( $conn, $sql);

	if( !$stmt_itm_grp ) {
		 $error_message = "Error selecting table (itm_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $GroupCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_itm_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $GroupCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_itm_grp) );
	
	
returnData($GroupCode);

sqlsrv_free_stmt($stmt_itm_grp);
sqlsrv_close($conn);

function returnData($GroupCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$GroupCode
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