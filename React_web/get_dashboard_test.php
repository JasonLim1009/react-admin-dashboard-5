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

$key[0] = "ast_mst_asset_no";
$key[1] = "ast_mst_asset_type";
$key[2] = "ast_mst_asset_grpcode";
$key[3] = "ast_mst_asset_status";
$key[4] = "ast_mst_work_area";
$key[5] = "ast_mst_cri_factor";
$key[6] = "ast_mst_cost_center";
$key[7] = "ast_mst_asset_locn";
$key[8] = "ast_mst_safety_rqmts";
$key[9] = "ast_mst_asset_shortdesc";
$key[10] = "ast_mst_asset_longdesc";
$key[11] = "ast_mst_perm_id";
$key[12] = "ast_mst_ast_lvl";
$key[13] = "ast_mst_parent_id";
$key[14] = "ast_mst_asset_code";
$key[15] = "ast_mst_assigned_to";
$key[16] = "ast_mst_fda_code";
$key[17] = "ast_mst_parent_flag";
$key[18] = "ast_mst_auto_no";
$key[19] = "ast_mst.audit_user";
$key[20] = "ast_mst.audit_date";
$key[21] = "ast_mst_create_by";
$key[22] = "ast_mst_create_date";
$key[23] = "ast_mst_print_count";
$key[24] = "ast_mst_wrk_grp";
$key[25] = "ast_sts_typ_cd";
$key[26] = "ast_det_asset_cost";
$key[27] = "ast_det_mtdlabcost";
$key[28] = "ast_det_mtdmtlcost";
$key[29] = "ast_det_mtdconcost";
$key[30] = "ast_det_ytdlabcost";
$key[31] = "ast_det_ytdmtlcost";
$key[32] = "ast_det_ytdconcost";
$key[33] = "ast_det_ltdlabcost";
$key[34] = "ast_det_ltdmtlcost";
$key[35] = "ast_det_ltdconcost";
$key[36] = "ast_det_warranty_date";
$key[37] = "ast_det_depr_term";
$key[38] = "ast_det_repl_cost";
$key[39] = "ast_det_l_account";
$key[40] = "ast_det_m_account";
$key[41] = "ast_det_c_account";
$key[42] = "ast_det_ent_date";
$key[43] = "ast_det_purchase_date";
$key[44] = "ast_det_depr_date";
$key[45] = "ast_det_acc_depr_cost";
$key[46] = "ast_det_net_book_value";
$key[47] = "ast_det_depr_by";
$key[48] = "ast_det_depr_method";
$key[49] = "ast_det_dispose_date";
$key[50] = "ast_det_dispose_value";
$key[51] = "ast_det_dispose_type";
$key[52] = "ast_det_dispose_by";
$key[53] = "ast_det_varchar1";
$key[54] = "ast_det_varchar2";
$key[55] = "ast_det_varchar3";
$key[56] = "ast_det_varchar4";
$key[57] = "ast_det_varchar5";
$key[58] = "ast_det_varchar6";
$key[59] = "ast_det_varchar7";
$key[60] = "ast_det_varchar8";
$key[61] = "ast_det_varchar9";
$key[62] = "ast_det_varchar10";
$key[63] = "ast_det_numeric1";
$key[64] = "ast_det_numeric2";
$key[65] = "ast_det_numeric3";
$key[66] = "ast_det_numeric4";
$key[67] = "ast_det_numeric5";
$key[68] = "ast_det_datetime1";
$key[69] = "ast_det_datetime2";
$key[70] = "ast_det_datetime3";
$key[71] = "ast_det_datetime4";
$key[72] = "ast_det_datetime5";




$sql_column_append = '';
$sql_column = '';

  for ($x = 0; $x < count($key); $x++) {
        $sql =
            "select customize_header = COALESCE(customize_header,'" .$key[$x] ."')  
				from cf_language
				LEFT JOIN cf_label (NOLOCK) ON  cf_language.language_cd = cf_label.language_cd AND column_name ='" .$key[$x] ."'
				where  cf_language.language_cd ='DEFAULT'";

        $stmt = sqlsrv_query($conn, $sql);

        if (!$stmt) {
            $error_message = "Error selecting table (dft_mst)";
            returnError($error_message);
            die(print_r(sqlsrv_errors(), true));
        }

        do {
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $header_result["Header"] = $row["customize_header"];
				$check =  $row["customize_header"];

				if($check == 'ast_mst.audit_user' ){
									//echo  $check;
									
					 if(count($key)-1 == $x && count($key) == 1 ){
						 $sql_column = '"audit_user"'."=COALESCE(" .$key[$x] .",'')";
					 }elseif(count($key)-1 == $x && count($key) > 1){
						 $sql_column = $sql_column.'"audit_user"'."=COALESCE(" .$key[$x] .",'')";
					 }elseif(count($key)-1 <> $x && count($key) > 1){
						$sql_column = $sql_column.'"audit_user"'."=COALESCE(" .$key[$x] .",''),";
					 }else{
						// $sql_column = $row["customize_header"].$sql_column."=COALESCE(" .$key[$x] .",''),";

					 }
				}else if($check == 'ast_mst.audit_date' ){
									//echo  $check;
									
					 if(count($key)-1 == $x && count($key) == 1 ){
						 $sql_column = '"audit_date"'."=COALESCE(" .$key[$x] .",'')";
					 }elseif(count($key)-1 == $x && count($key) > 1){
						 $sql_column = $sql_column.'"audit_date"'."=COALESCE(" .$key[$x] .",'')";
					 }elseif(count($key)-1 <> $x && count($key) > 1){
						$sql_column = $sql_column.'"audit_date"'."=COALESCE(" .$key[$x] .",''),";
					 }else{
						// $sql_column = $row["customize_header"].$sql_column."=COALESCE(" .$key[$x] .",''),";

					 }
				}else{
					
					 if(count($key)-1 == $x && count($key) == 1 ){
						 $sql_column = '"'.$row["customize_header"].'"'."=COALESCE(" .$key[$x] .",'')";
					 }elseif(count($key)-1 == $x && count($key) > 1){
						 $sql_column = $sql_column.'"'.$row["customize_header"].'"'."=COALESCE(" .$key[$x] .",'')";
					 }elseif(count($key)-1 <> $x && count($key) > 1){
						$sql_column = $sql_column.'"'.$row["customize_header"].'"'."=COALESCE(" .$key[$x] .",''),";
					 }else{
						// $sql_column = $row["customize_header"].$sql_column."=COALESCE(" .$key[$x] .",''),";

					 }
					
				}
				
				
				
					//$sql_column_append = $sql_column_append.$row["customize_header"]."=COALESCE(" .$key[$x] .",''),";							
					//$sql_column = $sql_column_append.$sql_column;

                array_push( $header_result);
            }
        } while (sqlsrv_next_result($stmt));

        //$final_headername["header"] = $header_end;
		
		
    }
	//echo 'Select '.$sql_column;
	
	 $sql ="	Select ".$sql_column." 
				FROM 	ast_mst(NOLOCK),
						ast_det(NOLOCK),
						ast_sts(NOLOCK)
				WHERE (ast_mst.site_cd = ast_det.site_cd)
				AND (ast_mst.rowid = ast_det.mst_rowid)
				AND (ast_mst.site_cd = ast_sts.site_cd)
				AND (ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status)
				AND (ast_mst.site_cd = '".$site_cd."')
				AND ast_mst_asset_grpcode IS NOT NULL";

    $stmt_cf_account = sqlsrv_query($conn, $sql);

  if( !$stmt_cf_account ) {
		 $error_message = "Error selecting table (FromUOM Drop Down)";
		 returnError($error_message);
		 die( print_r( sqlsrv_errors(), true));
		 
	}

	 $Account= array();

	do {
		 while ($row = sqlsrv_fetch_array($stmt_cf_account, SQLSRV_FETCH_ASSOC)) {	
		 
			   $Account[] = $row;
		
		 }
	} while ( sqlsrv_next_result($stmt_cf_account) );




	

returnData($Account);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

function returnData($Account)
{
    $returnData = [
        "status" => "SUCCESS",
        "message" => "Successfully",
		"data"=>$Account
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