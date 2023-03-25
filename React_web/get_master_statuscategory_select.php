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




$sql= "	SELECT 	 sts_cat.site_cd,   
				 sts_cat.sts_cat_cat_cd,   
				 sts_cat.sts_cat_desc,   
				 sts_cat.audit_user,   
				 sts_cat.audit_date,   				 
				 sts_cat.column1,   
				 sts_cat.column2,   
				 sts_cat.column3,   
				 sts_cat.column4,   
				 sts_cat.column5,   
				 sts_cat.RowID 
				 
		FROM 	sts_cat (NOLOCK)
		WHERE 	sts_cat.site_cd = '".$site_cd."'
		and 	sts_cat.RowID='".$RowID."'ORDER BY sts_cat_cat_cd";

	$stmt_sts_cat = sqlsrv_query( $conn, $sql);

	if( !$stmt_sts_cat ) {
		 $error_message = "Error selecting table (sts_cat Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $StatusCategory = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_sts_cat, SQLSRV_FETCH_ASSOC)) {	
		 
			   $StatusCategory[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_sts_cat) );
	
	
returnData($StatusCategory);

sqlsrv_free_stmt($stmt_sts_cat);
sqlsrv_close($conn);

function returnData($StatusCategory)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$StatusCategory
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