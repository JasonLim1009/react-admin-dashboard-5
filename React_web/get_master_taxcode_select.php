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




$sql= "	SELECT 	 tax_mst.site_cd,   
				 tax_mst.tax_mst_tax_cd,   
				 tax_mst.tax_mst_desc, 
				 tax_mst.tax_mst_tax_rate, 
				 tax_mst.tax_mst_disable_flag,      
				 tax_mst.audit_user,   
				 tax_mst.audit_date,   				 
				 tax_mst.column1,   
				 tax_mst.column2,   
				 tax_mst.column3,   
				 tax_mst.column4,   
				 tax_mst.column5,   
				 tax_mst.RowID 
				 
		FROM 	tax_mst (NOLOCK)
		WHERE 	tax_mst.site_cd = '".$site_cd."'
		and 	tax_mst.RowID='".$RowID."'ORDER BY tax_mst_tax_cd";

	$stmt_tax_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_tax_mst) {
		 $error_message = "Error selecting table (tax_mst Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $TaxCode = array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_tax_mst, SQLSRV_FETCH_ASSOC)) {	
		 
			   $TaxCode[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_tax_mst) );
	
	
returnData($TaxCode);

sqlsrv_free_stmt($stmt_tax_mst);
sqlsrv_close($conn);

function returnData($TaxCode)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$TaxCode
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