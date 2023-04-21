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


$key[0] = "ast_job_job_cd";
$key[1] = "job_mst_desc";
$key[2] = "ast_job_carry";




$sql= "		SELECT 	ast_job.site_cd,   
			ast_job.mst_RowID,   
			ast_job.ast_job_job_cd,   
			ast_job.ast_job_carry,   
			job_mst.job_mst_job_cd,   
			job_mst.job_mst_desc,   
			job_mst.RowID,
			ast_job.audit_user,   
			ast_job.audit_date,   
			ast_job.column1,   
			ast_job.column2,   
			ast_job.column3,   
			ast_job.column4,   
			ast_job.column5,   
			ast_job.RowID  
	FROM 	ast_job,   
			job_mst  
	WHERE 	( ast_job.site_cd = job_mst.site_cd ) 
	AND		( ast_job.ast_job_job_cd = job_mst.job_mst_job_cd ) 
	AND		( ast_job.site_cd = '".$site_cd."' ) 
	AND		( ast_job.mst_RowID = '".$RowID."' )";

	$stmt_ast_job = sqlsrv_query( $conn, $sql);

	if( !$stmt_ast_job ) {
		 $error_message = "Error selecting table (ast_job)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));		 
	}

    $row_end = [];
    $header_end = [];
	$header_result=[];

	do {
        while ($row = sqlsrv_fetch_array($stmt_ast_job, SQLSRV_FETCH_ASSOC)) {
			
		
		$JSON =json_encode($row);

		//echo($JSON);

			  $row_end[] = $row;
			
        }
    } while (sqlsrv_next_result($stmt_ast_job));

    $final_result["result"] = $row_end;
	 
    for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_label  from cf_label (NOLOCK) where column_name ='" .$key[$x] . "' and language_cd ='DEFAULT'";

        $stmt_ast_job = sqlsrv_query($conn, $sql);

        if (!$stmt_ast_job) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt_ast_job, SQLSRV_FETCH_ASSOC)) {
                $header_result[ $row["customize_label"]] = $row["customize_label"];
			   //$header_result[  $key[$x]] = $row["customize_header"];
               // $header_result["accessor"] = "col" . ($x + 1);
			   

                //array_push($header_end, $header_result);
            }
        } while (sqlsrv_next_result($stmt_ast_job));

        $final_headername["header"] = $header_result;
    }
	
	
returnData($final_headername, $final_result,$key);

sqlsrv_free_stmt($stmt_ast_job);
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