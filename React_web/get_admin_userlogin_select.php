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



$RowID = $_REQUEST['RowID'];




$sql= "	SELECT 	cf_user.empl_id,   
				cf_user.supv_empl_id,   
				cf_user.default_site,
				cf_user.name,   
				cf_user.default_language,   
				cf_user.status,   
				cf_user.work_grp,   
				cf_user.shift,   
				cf_user.work_area,
				cf_user.sys_admin,
				cf_user.last_login_site,
				cf_user.last_login,
				cf_user.last_pwd_changed,
				cf_user.expired_date,
				cf_user.cf_user_failed_attempt,
				cf_user.cf_user_locked,
				cf_user.audit_user,
				cf_user.audit_date,
				cf_user.column1,
				cf_user.column2,
				cf_user.column3,
				cf_user.column4,
				cf_user.column5,
				cf_user.rowid  
				 
		FROM 	cf_user (NOLOCK)
		WHERE 	cf_user.RowID='".$RowID."'ORDER BY empl_id";

	$stmt_cf_user = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_user ) {
		 $error_message = "Error selecting table (cf_user Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Language0 = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_user, SQLSRV_FETCH_ASSOC)) {	
		 
			   $UserLogin[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_user) );
	
	
returnData($UserLogin);

sqlsrv_free_stmt($stmt_cf_user);
sqlsrv_close($conn);

function returnData($UserLogin)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$UserLogin
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