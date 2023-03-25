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




$sql= "	SELECT 	 usr_grp.site_cd,   
				 usr_grp.usr_grp_usr_grp,   
				 usr_grp.usr_grp_desc, 
				 usr_grp.usr_grp_disable_flag,      
				 usr_grp.audit_user,   
				 usr_grp.audit_date,   				 
				 usr_grp.column1,   
				 usr_grp.column2,   
				 usr_grp.column3,   
				 usr_grp.column4,   
				 usr_grp.column5,   
				 usr_grp.RowID 
				 
		FROM 	usr_grp (NOLOCK)
		WHERE 	usr_grp.site_cd = '".$site_cd."'
		and 	usr_grp.RowID='".$RowID."'ORDER BY usr_grp_usr_grp";

	$stmt_usr_grp = sqlsrv_query( $conn, $sql);

	if( !$stmt_usr_grp ) {
		 $error_message = "Error selecting table (usr_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $UserGroup = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_usr_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $UserGroup[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_usr_grp) );
	
	
returnData($UserGroup);

sqlsrv_free_stmt($stmt_usr_grp);
sqlsrv_close($conn);

function returnData($UserGroup)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$UserGroup
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