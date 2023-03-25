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




$sql= "	SELECT 	 wrk_cls.site_cd,   
				 wrk_cls.wrk_cls_cls_cd,   
				 wrk_cls.wrk_cls_desc, 
				 wrk_cls.wrk_cls_disable_flag,      
				 wrk_cls.audit_user,   
				 wrk_cls.audit_date,   				 
				 wrk_cls.column1,   
				 wrk_cls.column2,   
				 wrk_cls.column3,   
				 wrk_cls.column4,   
				 wrk_cls.column5,   
				 wrk_cls.RowID 
				 
		FROM 	wrk_cls (NOLOCK)
		WHERE 	wrk_cls.site_cd = '".$site_cd."'
		and 	wrk_cls.RowID='".$RowID."'ORDER BY wrk_cls_cls_cd";

	$stmt_wrk_cls = sqlsrv_query( $conn, $sql);

	if( !$stmt_wrk_cls ) {
		 $error_message = "Error selecting table (wrk_cls Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $WorkClass = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_wrk_cls, SQLSRV_FETCH_ASSOC)) {	
		 
			   $WorkClass[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_wrk_cls) );
	
	
returnData($WorkClass);

sqlsrv_free_stmt($stmt_wrk_cls);
sqlsrv_close($conn);

function returnData($WorkClass)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$WorkClass
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