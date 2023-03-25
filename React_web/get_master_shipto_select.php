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




$sql= "	SELECT 	 sup_shi.site_cd,   
				 sup_shi.sup_shi_shipto,   
				 sup_shi.sup_shi_address1, 
				 sup_shi.sup_shi_address2, 
				 sup_shi.sup_shi_city,
				 sup_shi.sup_shi_state,   
				 sup_shi.sup_shi_postal_code,   
				 sup_shi.sup_shi_country, 
				 sup_shi.sup_shi_phone, 
				 sup_shi.sup_shi_contact,
				 sup_shi.audit_user,   
				 sup_shi.audit_date,   				 
				 sup_shi.column1,   
				 sup_shi.column2,   
				 sup_shi.column3,   
				 sup_shi.column4,   
				 sup_shi.column5,   
				 sup_shi.RowID 
				 
		FROM 	sup_shi (NOLOCK)
		WHERE 	sup_shi.site_cd = '".$site_cd."'
		and 	sup_shi.RowID='".$RowID."'ORDER BY sup_shi_shipto";

	$stmt_sup_shi = sqlsrv_query( $conn, $sql);

	if( !$stmt_sup_shi) {
		 $error_message = "Error selecting table (sup_shi Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $ShipTo = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_sup_shi, SQLSRV_FETCH_ASSOC)) {	
		 
			   $ShipTo[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_sup_shi) );
	
	
returnData($ShipTo);

sqlsrv_free_stmt($stmt_sup_shi);
sqlsrv_close($conn);

function returnData($ShipTo)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$ShipTo
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