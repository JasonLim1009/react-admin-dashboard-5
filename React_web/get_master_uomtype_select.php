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




$sql= "	SELECT 	 uom_type.site_cd,   
				 uom_type.uom_type_cd,   
				 uom_type.uom_type_desc, 
				 uom_type.uom_type_disable_flag,     
				 uom_type.audit_user,   
				 uom_type.audit_date,   				 
				 uom_type.column1,   
				 uom_type.column2,   
				 uom_type.column3,   
				 uom_type.column4,   
				 uom_type.column5,   
				 uom_type.RowID 
				 
		FROM 	uom_type (NOLOCK)
		WHERE 	uom_type.site_cd = '".$site_cd."'
		and 	uom_type.RowID='".$RowID."'ORDER BY uom_type_cd";

	$stmt_uom_type= sqlsrv_query( $conn, $sql);

	if( !$stmt_uom_type ) {
		 $error_message = "Error selecting table (uom_type Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $UOMType = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_uom_type, SQLSRV_FETCH_ASSOC)) {	
		 
			   $UOMType[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_uom_type) );
	
	
returnData($UOMType);

sqlsrv_free_stmt($stmt_uom_type);
sqlsrv_close($conn);

function returnData($UOMType)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$UOMType
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