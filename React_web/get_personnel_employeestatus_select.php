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




$sql= "	SELECT 	 emp_sts.site_cd,   
				 emp_sts.emp_sts_cat_cd,   
				 emp_sts.emp_sts_typ_cd, 
				 emp_sts.emp_sts_status,
				 emp_sts.emp_sts_desc,
				 emp_sts.emp_sts_disable_flag, 				 
				 emp_sts.audit_user,   
				 emp_sts.audit_date,   				 
				 emp_sts.column1,   
				 emp_sts.column2,   
				 emp_sts.column3,   
				 emp_sts.column4,   
				 emp_sts.column5,   
				 emp_sts.RowID 
				 
		FROM 	emp_sts (NOLOCK)
		WHERE 	emp_sts.site_cd = '".$site_cd."'
		and 	emp_sts.RowID='".$RowID."'ORDER BY emp_sts_cat_cd";

	$stmt_emp_sts = sqlsrv_query( $conn, $sql);

	if( !$stmt_emp_sts ) {
		 $error_message = "Error selecting table (emp_sts Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $EmployeeStatus = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_emp_sts, SQLSRV_FETCH_ASSOC)) {	
		 
			   $EmployeeStatus[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_emp_sts) );
	
	
returnData($EmployeeStatus);

sqlsrv_free_stmt($stmt_emp_sts);
sqlsrv_close($conn);

function returnData($EmployeeStatus)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$EmployeeStatus
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