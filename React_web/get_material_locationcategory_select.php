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




$sql= "	SELECT 	 loc_cat.site_cd,   
				 loc_cat.loc_cat_loc_cat,   
				 loc_cat.loc_cat_desc, 
				 loc_cat.loc_cat_inc_ttloh,
				 loc_cat.loc_cat_mtl_usage,
				 loc_cat.loc_cat_inc_ttl_val,
				 loc_cat.loc_cat_inc_rcv,
				 loc_cat.loc_cat_consigned,
				 loc_cat.loc_cat_disable_flag,
				 loc_cat.audit_user,   
				 loc_cat.audit_date,   				 
				 loc_cat.column1,   
				 loc_cat.column2,   
				 loc_cat.column3,   
				 loc_cat.column4,   
				 loc_cat.column5,   
				 loc_cat.RowID 
				 
		FROM 	loc_cat (NOLOCK)
		WHERE 	loc_cat.site_cd = '".$site_cd."'
		and 	loc_cat.RowID='".$RowID."'ORDER BY loc_cat_loc_cat";

	$stmt_loc_cat = sqlsrv_query( $conn, $sql);

	if( !$stmt_loc_cat ) {
		 $error_message = "Error selecting table (loc_cat Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $LocationCategory = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_loc_cat, SQLSRV_FETCH_ASSOC)) {	
		 
			   $LocationCategory[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_loc_cat) );
	
	
returnData($LocationCategory);

sqlsrv_free_stmt($stmt_loc_cat);
sqlsrv_close($conn);

function returnData($LocationCategory)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$LocationCategory
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