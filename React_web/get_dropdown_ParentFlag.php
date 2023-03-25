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


$key[0] = "ast_mst_asset_no";
$key[1] = "ast_mst_cost_center";
$key[2] = "ast_mst_asset_type";
$key[3] = "ast_mst_asset_grpcode";
$key[4] = "ast_mst_asset_status";
$key[5] = "ast_mst_asset_shortdesc";
$key[6] = "ast_mst_asset_longdesc";
$key[7] = "ast_mst_work_area";
$key[7] = "ast_mst_asset_locn";
$key[8] = "ast_mst_perm_id";
$key[9] = "ast_det_cus_code";



$site_cd = $_REQUEST['site_cd'];
$ast_mst_asset_no = $_REQUEST['ast_mst_asset_no'];


if (!empty($ast_mst_asset_no)){	
	$where_ast_mst_asset_no = " AND ast_mst_asset_no <> '%".$ast_mst_asset_no. "%' ";	
}else{	
	$where_ast_mst_asset_no = "";	
}



$sql= "	SELECT * 
			FROM 		ast_mst (NOLOCK),  				ast_det (NOLOCK),  				ast_sts (NOLOCK)  
			WHERE (	ast_mst.site_cd = ast_det.site_cd  
			AND			ast_mst.RowID = ast_det.mst_RowID  
			AND			ast_mst.site_cd = ast_sts.site_cd 
			AND			ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status 
			AND			ast_sts.ast_sts_typ_cd NOT IN ('AWA-DISPOSED', 'DISPOSED', 'OUT-OF-SERVICE')) 
			AND ast_mst.site_cd = '".$site_cd."' 
			and ast_mst_parent_flag='1'".
			$where_ast_mst_asset_no." ORDER BY ast_mst_asset_no , ast_mst_asset_shortdesc ";

	$stmt_ParentFlag = sqlsrv_query( $conn, $sql);

	if( !$stmt_ParentFlag ) {
		 $error_message = "Error selecting table (Parent Flag Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $row_end = [];
     $header_end = [];

	do {
		 while ($row = sqlsrv_fetch_array($stmt_ParentFlag, SQLSRV_FETCH_ASSOC)) {	
		 
			    $row_result["col1"] = $row[$key[0]];
			    $row_result["col2"] = $row[$key[1]];
				$row_result["col3"] = $row[$key[2]];
				$row_result["col4"] = $row[$key[3]];
				$row_result["col5"] = $row[$key[4]];
				$row_result["col6"] = $row[$key[5]];
				$row_result["col7"] = $row[$key[6]];
				$row_result["col8"] = $row[$key[7]];
				$row_result["col9"] = $row[$key[8]];
				
				array_push($row_end, $row_result);
				 $result = [];
		
		 }
	} while ( sqlsrv_next_result($stmt_ParentFlag) );
	
	 $final_result["result"] = $row_end;
	 
	 for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_header  from cf_label (NOLOCK) where column_name ='" .
            $key[$x] .
            "' and language_cd ='DEFAULT'";

        $stmt = sqlsrv_query($conn, $sql);

        if (!$stmt) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $header_result["Header"] = $row["customize_header"];
                $header_result["accessor"] = "col" . ($x + 1);

                array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt));

        $final_headername["header"] = $header_end;
    }
	
	
returnData($final_headername, $final_result);

sqlsrv_free_stmt($stmt_ParentFlag);
sqlsrv_close($conn);

function returnData($final_headername, $final_result)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
    ];

    $returnData["data"] = array_merge($final_headername, $final_result);

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