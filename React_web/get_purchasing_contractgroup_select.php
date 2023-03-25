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




$sql= "	SELECT 	 con_grp.site_cd,   
				 con_grp.con_grp_grp_cd,   
				 con_grp.con_grp_desc, 
				 con_grp.con_grp_disable_flag,      
				 con_grp.audit_user,   
				 con_grp.audit_date,   				 
				 con_grp.column1,   
				 con_grp.column2,   
				 con_grp.column3,   
				 con_grp.column4,   
				 con_grp.column5,   
				 con_grp.RowID 
				 
		FROM 	con_grp (NOLOCK)
		WHERE 	con_grp.site_cd = '".$site_cd."'
		and 	con_grp.RowID='".$RowID."'ORDER BY con_grp_grp_cd";

	$stmt_con_grp = sqlsrv_query( $conn, $sql);

	if( !$stmt_con_grp ) {
		 $error_message = "Error selecting table (con_grp Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $ContractGroup = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_con_grp, SQLSRV_FETCH_ASSOC)) {	
		 
			   $ContractGroup[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_con_grp) );
	
	
returnData($ContractGroup);

sqlsrv_free_stmt($stmt_con_grp);
sqlsrv_close($conn);

function returnData($ContractGroup)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$ContractGroup
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