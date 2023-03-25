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




$sql= "	SELECT 	 pay_med.site_cd,   
				 pay_med.pay_med_cd,   
				 pay_med.pay_med_desc, 
				 pay_med.pay_med_disable_flag,      
				 pay_med.audit_user,   
				 pay_med.audit_date,   				 
				 pay_med.column1,   
				 pay_med.column2,   
				 pay_med.column3,   
				 pay_med.column4,   
				 pay_med.column5,   
				 pay_med.RowID 
				 
		FROM 	pay_med (NOLOCK)
		WHERE 	pay_med.site_cd = '".$site_cd."'
		and 	pay_med.RowID='".$RowID."'ORDER BY pay_med_cd";

	$stmt_pay_med = sqlsrv_query( $conn, $sql);

	if( !$stmt_pay_med ) {
		 $error_message = "Error selecting table (pay_med Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $PaymentMethod = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_pay_med, SQLSRV_FETCH_ASSOC)) {	
		 
			   $PaymentMethod[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_pay_med) );
	
	
returnData($PaymentMethod);

sqlsrv_free_stmt($stmt_pay_med);
sqlsrv_close($conn);

function returnData($PaymentMethod)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$PaymentMethod
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