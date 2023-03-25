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




$sql= "	SELECT 	 uom_con.site_cd,   
				 uom_con.uom_con_from_uom,   
				 uom_con.uom_con_to_uom, 
				 uom_con.uom_con_factor,      
				 uom_con.audit_user,   
				 uom_con.audit_date,   				 
				 uom_con.column1,   
				 uom_con.column2,   
				 uom_con.column3,   
				 uom_con.column4,   
				 uom_con.column5,   
				 uom_con.RowID 
				 
		FROM 	uom_con (NOLOCK)
		WHERE 	uom_con.site_cd = '".$site_cd."'
		and 	uom_con.RowID='".$RowID."'ORDER BY uom_con_from_uom";

	$stmt_uom_con = sqlsrv_query( $conn, $sql);

	if( !$stmt_uom_con ) {
		 $error_message = "Error selecting table (uom_con Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $UOMConFactor = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_uom_con, SQLSRV_FETCH_ASSOC)) {	
		 
			   $UOMConFactor[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_uom_con) );
	
	
returnData($UOMConFactor);

sqlsrv_free_stmt($stmt_uom_con);
sqlsrv_close($conn);

function returnData($UOMConFactor)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$UOMConFactor
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