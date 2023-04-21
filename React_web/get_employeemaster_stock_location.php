<?php
// get these values from your DB.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header(
    "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
);

require_once ('config.php');
require_once ('functions.php');

$error_message;
$valid = true;


$site_cd = $_REQUEST['site_cd'];
$RowID = $_REQUEST['RowID'];


$key[0] = "loc_mst_stk_loc";
$key[1] = "loc_mst_desc";
$key[2] = "usg_itm_list";
$key[3] = "usg_itm_change";



$sql= "		SELECT 	emp_mst.emp_mst_empl_id,   
					emp_mst.emp_mst_name,
					emp_mst.RowID,
					loc_mst.loc_mst_stk_loc,
					loc_mst.loc_mst_desc,
					usg_itm_list, 
					usg_itm_change,
					usg_itm.RowID
			FROM 	emp_mst,   
					loc_mst  ,
					usg_itm
			WHERE 	( emp_mst.site_cd = loc_mst.site_cd ) 
			AND		( emp_mst.site_cd = usg_itm.site_cd ) 
			AND		( emp_mst.emp_mst_empl_id = usg_itm.usg_itm_empl_id ) 
			AND		( loc_mst.loc_mst_stk_loc = usg_itm.usg_itm_location ) 
			AND		( usg_itm.site_cd = '".$site_cd."' )
			AND		( emp_mst.RowID = '".$RowID."' )";

	$stmt_emp_mst = sqlsrv_query( $conn, $sql);

	if( !$stmt_emp_mst ) {
		 $error_message = "Error selecting table (emp_mst)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_emp_mst));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_emp_mst = sqlsrv_query($conn, $sql);

        if (!$stmt_emp_mst) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_emp_mst));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_emp_mst);
sqlsrv_close($conn);

function returnData($final_headername, $final_result,$key)
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