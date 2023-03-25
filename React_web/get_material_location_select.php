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




$sql= "	SELECT 	 loc_mst.site_cd,   
				 loc_mst.loc_mst_stk_loc,   
				 loc_mst.loc_mst_mst_loc_cd, 
				 loc_mst.loc_mst_area_loc_cd,
				 loc_mst.loc_mst_bin_id,
				 loc_mst.loc_mst_desc, 				 
				 loc_mst.loc_mst_storage_type, 
				 loc_mst.loc_mst_costcenter,
				 loc_mst.loc_mst_account,   
				 loc_mst.loc_mst_capacity,   
				 loc_mst.loc_mst_capacity_uom, 
				 loc_mst.loc_mst_onhold, 
				 loc_mst.loc_mst_supplier,
				 loc_mst.loc_mst_separator,
				 loc_mst.audit_user,   
				 loc_mst.audit_date,   				 
				 loc_mst.column1,   
				 loc_mst.column2,   
				 loc_mst.column3,   
				 loc_mst.column4,   
				 loc_mst.column5,   
				 loc_mst.RowID 
				 
		FROM 	loc_mst (NOLOCK)
		WHERE 	loc_mst.site_cd = '".$site_cd."'
		and 	loc_mst.RowID='".$RowID."'ORDER BY loc_mst_stk_loc";

	$stmt_loc_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_loc_mst) {
		 $error_message = "Error selecting table (loc_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Location = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_loc_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Location[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_loc_mst) );
	
	
returnData($Location);

sqlsrv_free_stmt($stmt_loc_mst);
sqlsrv_close($conn);

function returnData($Location)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Location
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