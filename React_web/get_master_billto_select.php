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




$sql= "	SELECT 	 sup_bil.site_cd,   
				 sup_bil.sup_bil_billto,   
				 sup_bil.sup_bil_address1, 
				 sup_bil.sup_bil_address2, 
				 sup_bil.sup_bil_city,
				 sup_bil.sup_bil_state,   
				 sup_bil.sup_bil_postal_code,   
				 sup_bil.sup_bil_country, 
				 sup_bil.sup_bil_phone, 
				 sup_bil.sup_bil_contact,
				 sup_bil.audit_user,   
				 sup_bil.audit_date,   				 
				 sup_bil.column1,   
				 sup_bil.column2,   
				 sup_bil.column3,   
				 sup_bil.column4,   
				 sup_bil.column5,   
				 sup_bil.RowID 
				 
		FROM 	sup_bil (NOLOCK)
		WHERE 	sup_bil.site_cd = '".$site_cd."'
		and 	sup_bil.RowID='".$RowID."'ORDER BY sup_bil_billto";

	$stmt_sup_bil = sqlsrv_query( $conn, $sql);

	if( !$stmt_sup_bil) {
		 $error_message = "Error selecting table (sup_bil Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $BillTo = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_sup_bil, SQLSRV_FETCH_ASSOC)) {	
		 
			   $BillTo[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_sup_bil) );
	
	
returnData($BillTo);

sqlsrv_free_stmt($stmt_sup_bil);
sqlsrv_close($conn);

function returnData($BillTo)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$BillTo
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