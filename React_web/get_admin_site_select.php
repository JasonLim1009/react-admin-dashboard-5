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




$sql= "	SELECT 	cf_site.site_cd,   
				cf_site.site_name,   
				cf_site.address1,   
				cf_site.address2,   
				cf_site.address3,   
				cf_site.post_cd,   
				cf_site.telephone_no,   
				cf_site.fax_no,   
				cf_site.email,   
				cf_site.pic_name,   
				cf_site.audit_user,   
				cf_site.audit_date,   
				cf_site.disable_flag,
				cf_site.require_offline,
				cf_site.column1,   
				cf_site.column2,   
				cf_site.column3,   
				cf_site.column4,   
				cf_site.column5,   
				cf_site.RowID   
				 
		FROM 	cf_site (NOLOCK)
		WHERE 	cf_site.RowID='".$RowID."'ORDER BY site_cd";

	$stmt_cf_site = sqlsrv_query( $conn, $sql);

	if( !$stmt_cf_site ) {
		 $error_message = "Error selecting table (cf_site Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Language0 = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_site, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Site[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_site) );
	
	
returnData($Site);

sqlsrv_free_stmt($stmt_cf_site);
sqlsrv_close($conn);

function returnData($Site)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Site
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