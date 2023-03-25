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


/* Begin the transaction. */
if ( sqlsrv_begin_transaction( $conn ) === false ) {
     die( print_r( sqlsrv_errors(), true ));
}

 
$site_cd = $_REQUEST['site_cd'];
$type = $_REQUEST['type'];



switch ($type) {
    case 'All':
	
			//CostCenter
			$sql= "	SELECT 	cf_cost_center.costcenter,
							cf_cost_center.descs    
					FROM 	cf_cost_center (NOLOCK)  
					WHERE (	cf_cost_center.disable_flag = 0  ) 
					AND 	cf_cost_center.site_cd = '".$site_cd."' 
					AND 	disable_flag = '0'ORDER BY costcenter ASC";

			$stmt_CostCenter = sqlsrv_query( $conn, $sql);

			if( !$stmt_CostCenter ) {
				 $error_message = "Error selecting table (Cost Center)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$CostCenter = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_CostCenter, SQLSRV_FETCH_ASSOC)) {		
					$CostCenter[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_CostCenter) );



			//Cf_Account
			$sql="	SELECT 	cf_account.account, cf_account.descs        
					FROM 	cf_account (NOLOCK)     
					WHERE 	cf_account.site_cd = '".$site_cd."' 
					AND 	disable_flag = '0'ORDER BY cf_account.account ASC";
					
			$stmt_Cf_Account = sqlsrv_query( $conn, $sql);

			if( !$stmt_Cf_Account ) {
				 $error_message = "Error selecting table (Account list)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$account = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_Cf_Account, SQLSRV_FETCH_ASSOC)) {		
					$account[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_Cf_Account) );


			//FaultCode
			$sql= "SELECT 	wrk_flt.wrk_flt_fault_cd,wrk_flt.wrk_flt_desc  
					FROM 	wrk_flt (NOLOCK) 
					WHERE 	wrk_flt.site_cd = '".$site_cd."' 
					AND 	wrk_flt.wrk_flt_disable_flag = '0' ORDER BY wrk_flt_fault_cd ASC";
			$stmt_FaultCode = sqlsrv_query( $conn, $sql);

			if( !$stmt_FaultCode ) {
				 $error_message = "Error selecting table (Fault Code)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$FaultCode = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_FaultCode, SQLSRV_FETCH_ASSOC)) {		
					$FaultCode[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_FaultCode) );



			//Priority
			$sql= "	SELECT 	wrk_pri.wrk_pri_pri_cd,  
							wrk_pri.wrk_pri_desc,  
							wrk_pri.wrk_pri_due_date_count  
					FROM 	wrk_pri   (NOLOCK)
					WHERE 	wrk_pri.site_cd = '".$site_cd."'
					AND 	wrk_pri.wrk_pri_disable_flag = '0'ORDER BY wrk_pri_pri_cd ASC";
			$stmt_Priority = sqlsrv_query( $conn, $sql);

			if( !$stmt_Priority ) {
				 $error_message = "Error selecting table (Priority)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$Priority = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_Priority, SQLSRV_FETCH_ASSOC)) {		
					$Priority[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_Priority) );



			//Work ActionCode
			$sql= "	SELECT 	wrk_act.wrk_act_action_cd, 
							wrk_act.wrk_act_desc        
					FROM 	wrk_act (NOLOCK)  
					WHERE 	wrk_act.site_cd = '".$site_cd."' 
					AND 	wrk_act.wrk_act_disable_flag ='0' ORDER BY wrk_act_action_cd ASC";
					
			$stmt_ActionCode = sqlsrv_query( $conn, $sql);

			if( !$stmt_ActionCode ) {
				 $error_message = "Error selecting table (wrk_act)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$ActionCode = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ActionCode, SQLSRV_FETCH_ASSOC)) {		
					$ActionCode[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_ActionCode) );


			//WorkArea
			$sql= "SELECT mst_war.mst_war_work_area,mst_war.mst_war_desc 
					FROM mst_war (NOLOCK)
					WHERE (mst_war.mst_war_disable_flag = 0     ) 
					AND mst_war.site_cd = '".$site_cd."'ORDER BY mst_war_work_area ";


			$stmt_WorkArea = sqlsrv_query( $conn, $sql);

			if( !$stmt_WorkArea ) {
				 $error_message = "Error selecting table (Work Area)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));	 
			}

			$WorkArea = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_WorkArea, SQLSRV_FETCH_ASSOC)) {		
					$WorkArea[] = $row;	
				 }
			} while ( sqlsrv_next_result($stmt_WorkArea) );



			//WorkCasuseCode
			$sql= "	SELECT 	wrk_ccd.wrk_ccd_cause_cd,
							wrk_ccd.wrk_ccd_desc      
					FROM 	wrk_ccd (NOLOCK)      
					WHERE 	wrk_ccd.site_cd = '".$site_cd."' 
					AND 	wrk_ccd.wrk_ccd_disable_flag ='0' ORDER BY wrk_ccd_cause_cd ASC";
					
			$stmt_CasuseCode = sqlsrv_query( $conn, $sql);

			if( !$stmt_CasuseCode ) {
				 $error_message = "Error selecting table (wrk_ccd)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$CasuseCode = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_CasuseCode, SQLSRV_FETCH_ASSOC)) {		
					$CasuseCode[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_CasuseCode) );


			//WorkClass
			$sql= "	SELECT 	wrk_cls.wrk_cls_cls_cd,
							wrk_cls.wrk_cls_desc  
					FROM 	wrk_cls (NOLOCK)       
					WHERE 	wrk_cls.site_cd = '".$site_cd."' 
					AND 	wrk_cls.wrk_cls_disable_flag ='0' ORDER BY wrk_cls_cls_cd ASC";
					
			$stmt_WorkClass = sqlsrv_query( $conn, $sql);

			if( !$stmt_WorkClass ) {
				 $error_message = "Error selecting table (wrk_cls)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$WorkClass = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_WorkClass, SQLSRV_FETCH_ASSOC)) {		
					$WorkClass[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_WorkClass) );


			//wrk_group
			$sql="	SELECT 	wrk_grp_grp_cd,wrk_grp_desc 
					from 	wrk_grp 
					where 	site_cd = '".$site_cd."'";
					
			$stmt_wrk_group = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_group ) {
				 $error_message = "Error selecting table (Account list)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wrk_group = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_group, SQLSRV_FETCH_ASSOC)) {		
					$wrk_group[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_group) );


			//Workorder Status
			$sql= "	SELECT 	wrk_sts.wrk_sts_status,  wrk_sts.wrk_sts_typ_cd,    wrk_sts.wrk_sts_desc,  wrk_sts.wrk_sts_email_flag  
					FROM 	wrk_sts  (NOLOCK)
					WHERE  (wrk_sts.wrk_sts_disable_flag = 0  ) 
					AND 	wrk_sts.site_cd = '".$site_cd."'";
					
			$stmt_WorkorderStatus = sqlsrv_query( $conn, $sql);

			if( !$stmt_WorkorderStatus ) {
				 $error_message = "Error selecting table (Workorder Status)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$WorkorderStatus = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_WorkorderStatus, SQLSRV_FETCH_ASSOC)) {		
					$WorkorderStatus[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_WorkorderStatus) );



			//WorkType
			$sql= "	SELECT  wrk_typ.wrk_typ_typ_cd ,
							wrk_typ.wrk_typ_desc, 
							wrk_typ_option,  
							wrk_typ_pm_option  
					FROM 	wrk_typ  (NOLOCK)     
					WHERE 	wrk_typ.site_cd = '".$site_cd."' 
					AND 	wrk_typ.wrk_typ_disable_flag ='0'ORDER BY wrk_typ_typ_cd ASC";
					
			$stmt_WorkType = sqlsrv_query( $conn, $sql);

			if( !$stmt_WorkType ) {
				 $error_message = "Error selecting table (wrk_typ)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$WorkType = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_WorkType, SQLSRV_FETCH_ASSOC)) {		
					$WorkType[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_WorkType) );




			//AssetCode
			$sql= "	SELECT 	ast_cod.ast_cod_ast_cd, ast_cod.ast_cod_desc        
					FROM 	ast_cod  (NOLOCK)      
					WHERE (	ast_cod.ast_cod_disable_flag = 0  ) 
					AND 	ast_cod.site_cd = '".$site_cd."'ORDER BY ast_cod_ast_cd";


			$stmt_AssetCode = sqlsrv_query( $conn, $sql);

			if( !$stmt_AssetCode ) {
				 $error_message = "Error selecting table (Asset Code)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$Assetcode = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_AssetCode, SQLSRV_FETCH_ASSOC)) {		
					$Assetcode[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_AssetCode) );



			//CriticalFactor
			$sql= "SELECT 	ast_cri.ast_cri_cri_factor,ast_cri.ast_cri_desc    
					FROM 	ast_cri  (NOLOCK)
					WHERE (	ast_cri.ast_cri_disable_flag = 0  ) 
					AND ast_cri.site_cd = '".$site_cd."'ORDER BY ast_cri_cri_factor";


			$stmt_CriticalFactor = sqlsrv_query( $conn, $sql);

			if( !$stmt_CriticalFactor ) {
				 $error_message = "Error selecting table (Critical Factor)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));	 
			}

			$CriticalFactor = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_CriticalFactor, SQLSRV_FETCH_ASSOC)) {		
					$CriticalFactor[] = $row;	
				 }
			} while ( sqlsrv_next_result($stmt_CriticalFactor) );



			//AssetGroupCode
			$sql= "SELECT 	ast_grp.ast_grp_grp_cd, ast_grp.ast_grp_desc ,ast_grp_option
					FROM 	ast_grp  (NOLOCK)
					WHERE (	ast_grp.ast_grp_disable_flag =0  ) 
					AND ast_grp.site_cd = '".$site_cd."'ORDER BY ast_grp_grp_cd";


			$stmt_ast_grp = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_grp ) {
				 $error_message = "Error selecting table (Asset Group Code)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$AssetGroupCode = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_grp, SQLSRV_FETCH_ASSOC)) {		
					$AssetGroupCode[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_ast_grp) );


			//Level
			$sql= "SELECT 	ast_lvl.ast_lvl_ast_lvl, ast_lvl.ast_lvl_desc    
					FROM 	ast_lvl    (NOLOCK)
					WHERE (	ast_lvl.ast_lvl_disable_flag = 0)
					AND ast_lvl.site_cd = '".$site_cd."'ORDER BY ast_lvl_ast_lvl";


			$stmt_ast_lvl = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_lvl ) {
				 $error_message = "Error selecting table (Level)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));	 
			}

			$AssetLevel = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_lvl, SQLSRV_FETCH_ASSOC)) {		
					$AssetLevel[] = $row;	
				 }
			} while ( sqlsrv_next_result($stmt_ast_lvl) );



			//AssetLocation
			$sql= "SELECT 	ast_loc.ast_loc_ast_loc,ast_loc.ast_loc_desc,ast_loc.ast_loc_wr_option,ast_loc.ast_loc_wo_option, ast_loc.ast_loc_pm_option  
					FROM 	ast_loc     (NOLOCK)
					WHERE (	ast_loc.ast_loc_disable_flag = 0      ) 
					AND ast_loc.site_cd = '".$site_cd."'ORDER BY ast_loc_ast_loc";


			$stmt_ast_loc = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_loc ) {
				 $error_message = "Error selecting table (Asset Location)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));	 
			}

			$AssetLocation = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_loc, SQLSRV_FETCH_ASSOC)) {		
					$AssetLocation[] = $row;	
				 }
			} while ( sqlsrv_next_result($stmt_ast_loc) );



			//AssetStatus
			$sql= "SELECT ast_sts_status,ast_sts_desc		
					FROM 	ast_sts (NOLOCK)
					WHERE	ast_sts.site_cd = '".$site_cd."'
					 ORDER BY ast_sts_status";


			$stmt_ast_sts = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_sts ) {
				 $error_message = "Error selecting table (Asset Status)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$AssetStatus = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_sts, SQLSRV_FETCH_ASSOC)) {		
					$AssetStatus[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_ast_sts) );
			
			
			
			//AssetStatus_IN-SERVICE
			$sql= "select ast_sts_status,ast_sts_desc from ast_sts where site_cd ='".$site_cd."' and ast_sts_count_dwn_time ='1' and ast_sts_typ_cd='IN-SERVICE'";


			$stmt_ast_sts_in_service = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_sts_in_service ) {
				 $error_message = "Error selecting table (Asset Status In Service)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$AssetStatus_In_service = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_sts_in_service, SQLSRV_FETCH_ASSOC)) {		
					$AssetStatus_In_service[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_ast_sts_in_service) );
			
			
			//AssetStatus_OUT-OF-SERVICE
			$sql= "select ast_sts_status,ast_sts_desc from ast_sts where site_cd ='".$site_cd."' and ast_sts_count_dwn_time ='1' and ast_sts_typ_cd='OUT-OF-SERVICE'";


			$stmt_ast_sts_out_of_service = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_sts_out_of_service ) {
				 $error_message = "Error selecting table (Asset Status Out of Service)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$AssetStatus_Out_of_service = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_sts_out_of_service, SQLSRV_FETCH_ASSOC)) {		
					$AssetStatus_Out_of_service[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_ast_sts_out_of_service) );



			//AssetType
			$sql= "SELECT ast_type.ast_type_cd, ast_type.ast_type_descs 
					FROM ast_type (NOLOCK)
					WHERE (ast_type.ast_type_disable_flag = 0  ) 
					AND ast_type.site_cd = '".$site_cd."'ORDER BY ast_type_cd";


			$stmt_ast_type = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_type ) {
				 $error_message = "Error selecting table (Asset Type)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$AssetType = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_type, SQLSRV_FETCH_ASSOC)) {		
					$AssetType[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_ast_type) );


			//Employee
			$sql= "SELECT  emp_mst.emp_mst_empl_id,     		
					emp_mst_title = COALESCE(emp_mst_title,''), 
					emp_mst.emp_mst_name,emp_mst_emg_phone = COALESCE(emp_mst_emg_phone,''),
					emp_det_craft = COALESCE(emp_det_craft+':'+crf_mst_desc,''),
					emp_ls1_charge_rate = COALESCE(emp_ls1.emp_ls1_charge_rate,0)		
			From 	emp_mst (NOLOCK)

					LEFT 
					OUTER 
					JOIN	emp_sts (NOLOCK) 
					ON		emp_mst.site_cd = emp_sts.site_cd  
					and     emp_mst.emp_mst_status = emp_sts.emp_sts_status  	
					And		emp_sts.emp_sts_typ_cd = 'ACTIVE'

					LEFT 
					OUTER 
					JOIN	emp_det (NOLOCK) 
					ON		emp_mst.site_cd = emp_det.site_cd		
					And		emp_mst.rowid = emp_det.mst_rowid
					
					LEFT 
					OUTER 
					JOIN	emp_ls1 (NOLOCK) 
					ON		emp_det.mst_rowid = emp_ls1.mst_rowid	
					And		emp_det.site_cd = emp_ls1.site_cd	
					AND		emp_det.emp_det_craft = emp_ls1.emp_ls1_craft
					
					LEFT 
					OUTER 
					JOIN	crf_mst (NOLOCK) 
					ON		emp_det.site_cd = crf_mst.site_cd		
					AND		emp_det.emp_det_craft = crf_mst.crf_mst_crf_cd	
					
					
			WHERE	emp_mst.site_cd = '".$site_cd."' And emp_sts.emp_sts_typ_cd = 'ACTIVE' ORDER BY emp_mst.emp_mst_empl_id ASC";


			 $stmt_emp_mst = sqlsrv_query( $conn, $sql);


			if( !$stmt_emp_mst ) {
				 $error_message = "Error selecting table (emp_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$Employee = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {
					$row['emp_mst_name'] =  utf8_encode($row['emp_mst_name']);
					$Employee[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_emp_mst) );


			//Asset_Auto_Numnering
			$sql="	SELECT 	cnt_mst_numbering , 
							cnt_mst_option ,
							cnt_mst_module_cd 
					FROM 	cnt_mst  (NOLOCK)
					WHERE  	cnt_mst.site_cd ='".$site_cd."'
					AND 	cnt_mst_module_cd =  'AST'";

			$stmt_cnt_mst = sqlsrv_query( $conn, $sql);
			 
			 
			if( !$stmt_cnt_mst ) {
				
				 $error_message = "Error selecting table (cnt_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}
			$Auto_Numnering = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_cnt_mst, SQLSRV_FETCH_ASSOC)) {		
					$Auto_Numnering[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_cnt_mst) );




			//WorkOrder_Auto_Numnering
			$sql= "	Select 	cnt_mst_numbering ,
							cnt_mst_option ,
							cnt_mst_module_cd 
					From 	cnt_mst (NOLOCK) 
					Where 	site_cd ='".$site_cd."' 
					And cnt_mst_module_cd ='WKO'";

			$stmt_wko_cnt_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_wko_cnt_mst ) {
				 $error_message = "Error selecting table (cnt_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$Wko_Auto_numbering = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wko_cnt_mst, SQLSRV_FETCH_ASSOC)) {		
					$Wko_Auto_numbering[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wko_cnt_mst) );


			//RatingQuestion
			$sql="select column_name = CASE WHEN column_name =  'wko_det_rating1' Then '1'
						WHEN column_name =  'wko_det_rating2' Then '2'
						WHEN column_name =  'wko_det_rating3' Then '3' End
						, * from cf_label(NOLOCK) where table_name = 'wko_det' and language_cd = 'DEFAULT' and column_name IN ('wko_det_rating1','wko_det_rating2','wko_det_rating3')";	
							
				//echo $sql;
				//$params = array($site_cd,$mst_RowID);					
									
				$stmt_RatingQuestion = sqlsrv_query( $conn, $sql);

						if( !$stmt_RatingQuestion ) {
							$error_message = "Error SELECT Table (wko_ls8)";
							returnError($error_message);
							die( print_r( sqlsrv_errors(), true));
						}

						$RatingQuestion= array();

						do {
							 while ($row = sqlsrv_fetch_array($stmt_RatingQuestion, SQLSRV_FETCH_ASSOC)) {	
							 
								$RatingQuestion[] = $row;		
							
							 }
						} while ( sqlsrv_next_result($stmt_RatingQuestion) );
						
						
						
			//MRStockno			
			$sql="SELECT DISTINCT  
					itm_mst.itm_mst_stockno, 
					itm_mst_costcenter,
					itm_mst_mstr_locn,
					itm_mst.itm_mst_desc, 
					itm_mst_ext_desc = COALESCE(cast(itm_mst.itm_mst_ext_desc as varchar(2000)),'' ),
					itm_mst.itm_mst_type,   
					itm_mst.itm_mst_com_code, 
					itm_mst.itm_mst_itm_grp,
					itm_mst_issue_uom,
					itm_mst_account,
					itm_mst_rec_supplier,
					itm_det_issue_price,
					itm_mst_partno = COALESCE(itm_mst_partno,''),
					itm_mst.itm_mst_ttl_oh
					
					FROM 		itm_mst(NOLOCK), itm_det(NOLOCK),  itm_sts(NOLOCK),  				
					itm_loc  WHERE (	( itm_mst.site_cd = itm_det.site_cd )  
					AND			( itm_mst.RowID = itm_det.mst_RowID ) 
					AND			( itm_mst.site_cd = itm_loc.site_cd )  
					AND			( itm_mst.RowID = itm_loc.mst_RowID )  
					AND			( itm_det.site_cd = itm_sts.site_cd ) 
					AND			( itm_det.itm_det_part_deac_status = itm_sts.itm_sts_status )  
					AND			( itm_sts_typ_cd = 'ACTIVE' )) 
					AND itm_mst.site_cd = '".$site_cd."'" ;
					
				$stmt_MRStockno = sqlsrv_query( $conn, $sql);

				if( !$stmt_MRStockno ) {
					 $error_message = "Error selecting table (MR Stockno)";
					 returnError($error_message);
					 die( print_r( sqlsrv_errors(), true));
					 
				}

				$MRStockno = array();

				do {
					 while ($row = sqlsrv_fetch_array($stmt_MRStockno, SQLSRV_FETCH_ASSOC)) {		
						$MRStockno[] = $row;	
					
					 }
				} while ( sqlsrv_next_result($stmt_MRStockno) );


			//Time card houres
			$sql="SELECT hours_type_cd = hours_type_cd+' : '+ hours_type_desc,  hours_type.hours_type_multiplier, hours_type.hours_type_adder    FROM hours_type (NOLOCK)   
					WHERE hours_type.site_cd = ?";
					
			//echo $sql;
			$params = array($site_cd);		
			$stmt_hours_type = sqlsrv_query( $conn, $sql,$params);

				if( !$stmt_hours_type ) {
					$error_message = "Error selecting table (Hours Type)";
					returnError($error_message);
					die( print_r( sqlsrv_errors(), true));
							 
				}

				$HoursType= array();

				do {
					while ($row = sqlsrv_fetch_array($stmt_hours_type, SQLSRV_FETCH_ASSOC)) {	
							 
					$HoursType[] = $row;		
							
					}
				}
				while ( sqlsrv_next_result($stmt_hours_type) );
				


			//Time craft
			$sql="	SELECT 	emp_ls1_craft = emp_ls1_craft+' : '+crf_mst_desc, emp_ls1.emp_ls1_charge_rate,emp_mst.emp_mst_empl_id       
					FROM 	crf_mst (NOLOCK) , 	emp_ls1(NOLOCK),  	emp_mst(NOLOCK)  
					WHERE 	(crf_mst.site_cd = emp_ls1.site_cd  
					AND		crf_mst.crf_mst_crf_cd = emp_ls1.emp_ls1_craft  
					AND		crf_mst.site_cd = emp_mst.site_cd  
					AND		emp_ls1.mst_rowid = emp_mst.rowid) 
					AND 	emp_mst.site_cd = ?";	
					
				//echo $sql;
				$params = array($site_cd);					
									
				$stmt_crf_mst = sqlsrv_query( $conn, $sql,$params);

						if( !$stmt_crf_mst ) {
							$error_message = "Error SELECT Table (crf_mst)";
							returnError($error_message);
							die( print_r( sqlsrv_errors(), true));
						}

						$TimeCraft= array();

						do {
							 while ($row = sqlsrv_fetch_array($stmt_crf_mst, SQLSRV_FETCH_ASSOC)) {	
							 
								$TimeCraft[] = $row;		
							
							 }
						} while ( sqlsrv_next_result($stmt_crf_mst) );

						
			//supplier			
			$sql= "SELECT 	sup_mst.sup_mst_supplier_cd,   
							sup_mst.sup_mst_desc,  
							sup_mst.sup_mst_status  
					FROM 	sup_mst (NOLOCK), sup_sts (NOLOCK)
					WHERE (sup_mst.site_cd = sup_sts.site_cd  
					AND			sup_mst.sup_mst_status = sup_sts.sup_sts_status  
					AND			sup_sts.sup_sts_typ_cd NOT IN ('DEACTIVATE')) 
					AND sup_mst.site_cd = '".$site_cd."' ORDER BY sup_mst_supplier_cd ASC";
			$stmt_supplier = sqlsrv_query( $conn, $sql);

			if( !$stmt_supplier ) {
				 $error_message = "Error selecting table (sup_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$supplier = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_supplier, SQLSRV_FETCH_ASSOC)) {		
					$supplier []= $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_supplier) );



			//UOM
			$sql= "SELECT 	uom_mst.uom_mst_uom,  uom_mst.uom_mst_desc  FROM uom_mst(NOLOCK)  
					WHERE 	uom_mst.site_cd = '".$site_cd."' 
					AND 	uom_mst_type = 'SERVICE' 
					AND 	uom_mst_disable_flag = '0' ORDER BY uom_mst_uom ASC ";
			$stmt_uom = sqlsrv_query( $conn, $sql);

			if( !$stmt_uom ) {
				 $error_message = "Error selecting table (Mydefault values)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$uom = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_uom, SQLSRV_FETCH_ASSOC)) {		
					$uom[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_uom) );


			//Tax code
			$sql= "	SELECT 	tax_mst.tax_mst_tax_cd, 
							tax_mst.tax_mst_desc, 
							tax_mst.tax_mst_tax_rate  
					FROM 	tax_mst (NOLOCK)    
					WHERE (	tax_mst.tax_mst_disable_flag = '0') 
					AND tax_mst.site_cd = '".$site_cd."' 
					AND tax_mst_type IN ('A', 'P') 
					AND tax_mst_disable_flag = '0' ORDER BY tax_mst_tax_cd ASC";
			$stmt_tax_cd = sqlsrv_query( $conn, $sql);

			if( !$stmt_tax_cd ) {
				 $error_message = "Error selecting table (Priority)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$tax_cd = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_tax_cd, SQLSRV_FETCH_ASSOC)) {		
					$tax_cd[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_tax_cd) );
			
			
			//Customer Code
			$sql= "	SELECT 	cus_mst.cus_mst_customer_cd,    
							cus_mst.cus_mst_desc,  
							cus_mst.cus_mst_status   
							 
					FROM 	cus_mst (NOLOCK),  cus_sts (NOLOCK)  					
					WHERE (	cus_mst.site_cd = cus_sts.site_cd  ) 
					AND		cus_mst.cus_mst_status = cus_sts.cus_sts_status  
					AND		cus_sts.cus_sts_typ_cd NOT IN ('DEACTIVATE')
					AND 	cus_mst.site_cd = '".$site_cd."' ORDER BY cus_mst_customer_cd ASC";
					
			$stmt_customer_cd = sqlsrv_query( $conn, $sql);

			if( !$stmt_customer_cd ) {
				 $error_message = "Error selecting table (Customer Code)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$customer_cd = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_customer_cd, SQLSRV_FETCH_ASSOC)) {		
					$customer_cd[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_customer_cd) );
			
			
			
			
			//Emp status----JASON
			$sql= "	SELECT 	emp_sts.emp_sts_status,   
							emp_sts.emp_sts_typ_cd,     			
							emp_sts.emp_sts_desc    
					FROM 	emp_sts     
					WHERE (	emp_sts.emp_sts_disable_flag = 0) 
					AND     emp_sts.site_cd = '".$site_cd."'";
					
			$stmt_emp_sts = sqlsrv_query( $conn, $sql);

			if( !$stmt_emp_sts ) {
				 $error_message = "Error selecting table (emp_sts)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$emp_sts = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_emp_sts, SQLSRV_FETCH_ASSOC)) {		
					$emp_sts[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_emp_sts) );
			
			//Emp user group----JASON
			$sql= "	SELECT	usr_grp.usr_grp_usr_grp,              
							usr_grp.usr_grp_desc        
					FROM	usr_grp        
					WHERE ( usr_grp.usr_grp_disable_flag = 0) 
					AND 	usr_grp.site_cd = '".$site_cd."'";
					
			$stmt_usr_grp = sqlsrv_query( $conn, $sql);

			if( !$stmt_usr_grp ) {
				 $error_message = "Error selecting table (usr_grp)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$usr_grp = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_usr_grp, SQLSRV_FETCH_ASSOC)) {		
					$usr_grp[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_usr_grp) );
			
			//Emp login id----JASON
			$sql= "	SELECT 	cf_user.empl_id,     			
							cf_user.name    
					FROM 	cf_user		
					WHERE ( cf_user.empl_id NOT IN ( 
					SELECT	emp_mst_login_id 
					FROM	emp_mst		
					WHERE	emp_mst.site_cd = '".$site_cd."' 
					AND		emp_mst_login_id 
					IS NOT NULL  AND emp_mst_login_id <> '' ))";
					
			$stmt_cf_user = sqlsrv_query( $conn, $sql);

			if( !$stmt_cf_user ) {
				 $error_message = "Error selecting table (cf_user)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$cf_user = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_cf_user, SQLSRV_FETCH_ASSOC)) {		
					$cf_user[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_cf_user) );
			
			//Emp work area----JASON
			$sql= "	SELECT	mst_war.mst_war_work_area,              
							mst_war.mst_war_desc        
					FROM	mst_war      
					WHERE ( mst_war.mst_war_disable_flag = 0     ) 
					AND		mst_war.site_cd = '".$site_cd."'";
					
			$stmt_mst_war = sqlsrv_query( $conn, $sql);

			if( !$stmt_mst_war ) {
				 $error_message = "Error selecting table (mst_war)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$mst_war = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_mst_war, SQLSRV_FETCH_ASSOC)) {		
					$mst_war[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_mst_war) );
			
			//Emp supervisor id----JASON
			$sql= "	SELECT 	emp_mst.emp_mst_empl_id,     			
							emp_mst.emp_mst_name,     			
							emp_mst.emp_mst_title    
					FROM	emp_mst,  			
							emp_det,  			
							emp_sts  
					WHERE ( emp_mst.site_cd = emp_det.site_cd  
					AND		emp_mst.RowID = emp_det.mst_rowid  
					AND		emp_mst.site_cd = emp_sts.site_cd  
					AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
					AND		emp_sts.emp_sts_typ_cd = 'ACTIVE'  
					AND		emp_det.emp_det_supervisor 
					IS NOT NULL  
					AND		emp_det.emp_det_supervisor = '1') 
					AND		emp_mst.site_cd = '".$site_cd."'order by emp_mst_empl_id ASC "; 
					
			$stmt_emp_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_emp_mst ) {
				 $error_message = "Error selecting table (emp_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$emp_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
					$emp_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_emp_mst) );
			
			//Emp primary craft----JASON
			$sql= "	SELECT 	crf_mst.crf_mst_crf_cd,     			
							crf_mst.crf_mst_desc,     			
							crf_mst.crf_mst_crf_est_rate    
					FROM 	crf_mst     
					WHERE (	crf_mst.crf_mst_disable_flag = 0) 
					AND		crf_mst.site_cd = '".$site_cd."'";
					
			$stmt_crf_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_crf_mst ) {
				 $error_message = "Error selecting table (crf_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$crf_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_crf_mst, SQLSRV_FETCH_ASSOC)) {		
					$crf_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_crf_mst) );
			
			//Emp work group----JASON
			$sql= "	SELECT 	wrk_grp.wrk_grp_grp_cd,     				
							wrk_grp.wrk_grp_desc    
					FROM	wrk_grp     
					WHERE ( wrk_grp_disable_flag = '0'  ) 
					AND		wrk_grp.site_cd = '".$site_cd."'
					AND		wrk_grp.wrk_grp_disable_flag ='0'"; 
					
			$stmt_wrk_grp = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_grp ) {
				 $error_message = "Error selecting table (wrk_grp)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wrk_grp = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_grp, SQLSRV_FETCH_ASSOC)) {		
					$wrk_grp[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_grp) );
			
			
			
			//WKO Original Periority----JASON
			$sql= "	SELECT 	wrk_pri.wrk_pri_pri_cd,   
							wrk_pri.wrk_pri_desc,     			
							wrk_pri.wrk_pri_due_date_count
					FROM 	wrk_pri     
					WHERE (	wrk_pri.wrk_pri_disable_flag = 0) 
					AND     wrk_pri.site_cd = '".$site_cd."' order by wrk_pri_pri_cd ASC";
					
			$stmt_wrk_pri = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_pri ) {
				 $error_message = "Error selecting table (wrk_pri)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wrk_pri = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_pri, SQLSRV_FETCH_ASSOC)) {		
					$wrk_pri[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_pri) );
	
			//WKO Status----JASON
			$sql= "	SELECT 	wrk_sts.wrk_sts_status,   
							wrk_sts.wrk_sts_typ_cd,     			
							wrk_sts.wrk_sts_desc,
							wrk_sts.wrk_sts_email_flag
					FROM 	wrk_sts     
					WHERE (	wrk_sts.wrk_sts_disable_flag = 0) 
					AND		wrk_sts.wrk_sts_typ_cd NOT IN ( 'COMPLETE', 'CLOSE', 'CANCEL', 'FORCE-CLOSE' )
					AND     wrk_sts.site_cd = '".$site_cd."' order by wrk_sts_status ASC";
					
			$stmt_wrk_sts = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_sts ) {
				 $error_message = "Error selecting table (wrk_sts)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wrk_sts = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_sts, SQLSRV_FETCH_ASSOC)) {		
					$wrk_sts[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_sts) );
			
			//WKO Asset No----JASON
			$sql= "	SELECT 		ast_mst.ast_mst_asset_no,			ast_mst.ast_mst_cost_center,		ast_mst.ast_mst_asset_type,			ast_mst.ast_mst_asset_grpcode,  				
								ast_mst.ast_mst_asset_status,		ast_mst.ast_mst_asset_shortdesc,	ast_mst.ast_mst_asset_longdesc,		ast_mst.ast_mst_work_area,      				
								ast_mst.ast_mst_asset_locn,			ast_mst.ast_mst_perm_id,  			ast_det.ast_det_cus_code  
					FROM 		ast_mst (NOLOCK),  					ast_det (NOLOCK),  					ast_sts (NOLOCK)  
					WHERE (		ast_mst.site_cd = ast_det.site_cd  
					AND			ast_mst.RowID = ast_det.mst_RowID  
					AND			ast_mst.site_cd = ast_sts.site_cd  
					AND			ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status  
					AND			ast_sts.ast_sts_typ_cd 
					NOT IN (	'AWA-DISPOSED', 'DISPOSED', 'OUT-OF-SERVICE')) 
					AND			ast_mst.site_cd = '".$site_cd."' ";
					
			$stmt_ast_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_ast_mst ) {
				 $error_message = "Error selecting table (ast_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$ast_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_ast_mst, SQLSRV_FETCH_ASSOC)) {		
					$ast_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_ast_mst) );
			
			//WKO Work Area----JASON
			$sql= "	SELECT 	mst_war.mst_war_work_area,   
							mst_war.mst_war_desc
					FROM 	mst_war     
					WHERE (	mst_war.mst_war_disable_flag = 0) 
					AND     mst_war.site_cd = '".$site_cd."'";
					
			$stmt_mst_war = sqlsrv_query( $conn, $sql);

			if( !$stmt_mst_war ) {
				 $error_message = "Error selecting table (wko_mst_war)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wko_mst_war = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_mst_war, SQLSRV_FETCH_ASSOC)) {		
					$wko_mst_war[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_mst_war) );
			
			//WKO Originator----JASON
			$sql= "	SELECT 	emp_mst.emp_mst_empl_id,   
							emp_mst.emp_mst_name,
							emp_mst.emp_mst_emg_phone
					FROM 	emp_mst,
							emp_sts
					WHERE	(	emp_mst.site_cd = emp_sts.site_cd  
					AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status
					AND		emp_sts.emp_sts_typ_cd = 'ACTIVE')
					AND		emp_mst.site_cd = '".$site_cd."'";
					
			$stmt_emp_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_emp_mst ) {
				 $error_message = "Error selecting table (wko_emp_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wko_emp_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
					$wko_emp_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_emp_mst) );
			
			//WKO ProjectID----JASON
			$sql= "	SELECT 	prj_mst.prj_mst_prj_cd,   
							prj_mst.prj_mst_desc,
							prj_mst.prj_mst_approved
					FROM 	prj_mst
					WHERE 	prj_mst.site_cd = '".$site_cd."'
					AND 	prj_mst.prj_mst_disable_flag = '0' ";
					
			$stmt_prj_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_prj_mst ) {
				 $error_message = "Error selecting table (prj_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$prj_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_prj_mst, SQLSRV_FETCH_ASSOC)) {		
					$prj_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_prj_mst) );
			
			//WKO Delay Code----JASON
			$sql= "	SELECT 	wrk_dcd.wrk_dcd_delay_cd,   
							wrk_dcd.wrk_dcd_desc
					FROM 	wrk_dcd
					WHERE 	wrk_dcd.site_cd = '".$site_cd."'";
					
			$stmt_wrk_dcd = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_dcd ) {
				 $error_message = "Error selecting table (wrk_dcd)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wrk_dcd = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_dcd, SQLSRV_FETCH_ASSOC)) {		
					$wrk_dcd[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_dcd) );
			
			//WKO Work Type----JASON
			$sql= "	SELECT 	wrk_typ.wrk_typ_typ_cd,   
							wrk_typ.wrk_typ_desc,
							wrk_typ_option,
							wrk_typ_pm_option
					FROM 	wrk_typ
					WHERE 	wrk_typ.site_cd = '".$site_cd."'
					AND 	wrk_typ.wrk_typ_disable_flag ='0' ";
					
			$stmt_wrk_typ = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_typ ) {
				 $error_message = "Error selecting table (wrk_typ)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wrk_typ = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_typ, SQLSRV_FETCH_ASSOC)) {		
					$wrk_typ[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_typ) );
			
			//WKO Work Class----JASON
			$sql= "	SELECT 	wrk_cls.wrk_cls_cls_cd,   
							wrk_cls.wrk_cls_desc
					FROM 	wrk_cls
					WHERE 	wrk_cls.site_cd = '".$site_cd."'
					AND 	wrk_cls.wrk_cls_disable_flag ='0' ";
					
			$stmt_wrk_cls = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_cls ) {
				 $error_message = "Error selecting table (wrk_cls)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wrk_cls = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_cls, SQLSRV_FETCH_ASSOC)) {		
					$wrk_cls[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_cls) );
			
			//WKO Work Group----JASON
			$sql= "	SELECT 	wrk_grp.wrk_grp_grp_cd,   
							wrk_grp.wrk_grp_desc
					FROM 	wrk_grp
					WHERE 	 (wrk_grp_disable_flag = '0'  ) 
					AND 	wrk_grp.site_cd = '".$site_cd."'
					AND 	wrk_grp.wrk_grp_disable_flag ='0' ";
					
			$stmt_wrk_grp = sqlsrv_query( $conn, $sql);

			if( !$stmt_wrk_grp ) {
				 $error_message = "Error selecting table (wko_wrk_grp)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wko_wrk_grp = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_wrk_grp, SQLSRV_FETCH_ASSOC)) {		
					$wko_wrk_grp[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_wrk_grp) );
			
			//WKO Planner----JASON
			$sql= "	SELECT 	emp_mst.emp_mst_empl_id,   
							emp_mst.emp_mst_name,
							emp_mst.emp_mst_title
					FROM 	emp_mst,
							emp_det,
							emp_sts
					WHERE (	emp_mst.site_cd = emp_det.site_cd  
					AND		emp_mst.RowID = emp_det.mst_rowid  
					AND	 	emp_mst.site_cd = emp_sts.site_cd  
					AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
					AND		emp_sts.emp_sts_typ_cd = 'ACTIVE') 
					AND 	emp_mst.site_cd = '".$site_cd."'
					AND 	emp_det_planner = '1' ";
					
			$stmt_emp_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_emp_mst ) {
				 $error_message = "Error selecting table (wko_planner_emp_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wko_planner_emp_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
					$wko_planner_emp_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_emp_mst) );
			
			//WKO Approver----JASON
			$sql= "	SELECT 	emp_mst.emp_mst_empl_id,   
							emp_mst.emp_mst_name,
							emp_mst.emp_mst_title
					FROM 	emp_mst,
							emp_det,
							emp_sts
					WHERE (	emp_mst.site_cd = emp_det.site_cd  
					AND		emp_mst.RowID = emp_det.mst_rowid  
					AND	 	emp_mst.site_cd = emp_sts.site_cd  
					AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
					AND		emp_sts.emp_sts_typ_cd = 'ACTIVE') 
					AND 	emp_mst.site_cd = '".$site_cd."'";
					
			$stmt_emp_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_emp_mst ) {
				 $error_message = "Error selecting table (wko_approver_emp_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wko_approver_emp_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
					$wko_approver_emp_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_emp_mst) );
			
			//WKO AssignTO----JASON
			$sql= "	SELECT  	emp_mst.emp_mst_empl_id,		
								emp_mst.emp_mst_name,		
								emp_det.emp_det_work_grp,		
								emp_det.emp_det_ira_idno,  			
						TotalWO = ( 	SELECT 		COUNT(wko_mst_wo_no)  								
					FROM		wko_mst (NOLOCK),		
								wko_det (NOLOCK),		
								wrk_sts (NOLOCK)  								
					WHERE		wko_mst.site_cd = wko_det.site_cd  								
					AND			wko_mst.RowID = wko_det.mst_RowID  								
					AND			wko_mst.site_cd = wrk_sts.site_cd  								
					AND			wko_mst.wko_mst_status = wrk_sts.wrk_sts_status  								
					AND			wrk_sts.wrk_sts_typ_cd 
					NOT IN ('CANCEL', 'FORCE-CLOSE', 'CLOSE')  								
					AND			wko_det.wko_det_assign_to = emp_mst.emp_mst_empl_id )    
					FROM 	emp_mst (NOLOCK),  			
							emp_det (NOLOCK),  			
							emp_sts (NOLOCK)  
					WHERE (	emp_mst.site_cd = emp_det.site_cd 
					AND		emp_mst.RowID = emp_det.mst_RowID  
					AND		emp_mst.site_cd = emp_sts.site_cd  
					AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
					AND		emp_sts.emp_sts_typ_cd = 'ACTIVE'  
					AND		emp_det.emp_det_foreman = '1') 
					AND		emp_mst.site_cd = '".$site_cd."' 
					AND		emp_det_foreman = '1' 
					AND ( emp_det.emp_det_work_grp = 'MAINTENANCE' OR emp_det.emp_det_ira_idno = 'MAINTENANCE') ";
					
			$stmt_emp_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_emp_mst ) {
				 $error_message = "Error selecting table (wko_assignto_emp_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$wko_assignto_emp_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
					$wko_assignto_emp_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_emp_mst) );
			
			//WKO Labor Account----JASON
			$sql= "	SELECT  	cf_account.account,		
								cf_account.descs
					FROM 		cf_account
					WHERE		cf_account.site_cd = '".$site_cd."'
					AND 		disable_flag = '0' "; 
					
			$stmt_cf_account = sqlsrv_query( $conn, $sql);

			if( !$stmt_cf_account ) {
				 $error_message = "Error selecting table (cf_account)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$cf_account = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_cf_account, SQLSRV_FETCH_ASSOC)) {		
					$cf_account[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_cf_account) );
			
			//ITM Commodity Code----JASON
			$sql= "	SELECT	com_mst.com_mst_com_code,              
							com_mst.com_mst_desc        
					FROM	com_mst     
					WHERE	(com_mst_disable_flag = '0'  ) 
					AND		com_mst.site_cd = '".$site_cd."' "; 
					
			$stmt_com_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_com_mst ) {
				 $error_message = "Error selecting table (com_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$com_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_com_mst, SQLSRV_FETCH_ASSOC)) {		
					$com_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_com_mst) );
			
			//ITM Stock Group----JASON
			$sql= "	SELECT 	itm_grp.itm_grp_cd,     			
							itm_grp.itm_grp_desc    
					FROM 	itm_grp     
					WHERE (	itm_grp_disable_flag = '0'  ) 
					AND		itm_grp.site_cd = '".$site_cd."' 
					AND		itm_grp_disable_flag = '0' "; 
					
			$stmt_itm_grp = sqlsrv_query( $conn, $sql);

			if( !$stmt_itm_grp ) {
				 $error_message = "Error selecting table (itm_grp)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$itm_grp = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_itm_grp, SQLSRV_FETCH_ASSOC)) {		
					$itm_grp[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_itm_grp) );
			
			//ITM Master Location----JASON
			$sql= "	SELECT 	loc_mst.loc_mst_stk_loc,     			
							loc_mst.loc_mst_desc,  			
							loc_mst.loc_mst_mst_loc_cd,     			
							loc_mst.loc_mst_area_loc_cd,     			
							loc_mst.loc_mst_bin_id  
					FROM 	loc_mst (NOLOCK)  
					WHERE (loc_mst.loc_mst_disable_flag = '0') 
					AND		loc_mst.site_cd = '".$site_cd."' 
					AND		loc_mst_storage_type <> 'CONSIGNMENT' "; 
					
			$stmt_loc_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_loc_mst ) {
				 $error_message = "Error selecting table (loc_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$loc_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_loc_mst, SQLSRV_FETCH_ASSOC)) {		
					$loc_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_loc_mst) );
			
			//ITM Order Rule----JASON
			$sql= "	SELECT	odr_mst.odr_mst_odr,              
							odr_mst.odr_mst_desc        
					FROM	odr_mst     
					WHERE (odr_mst_disable_flag = '0') 
					AND		odr_mst.site_cd = '".$site_cd."' "; 
					
			$stmt_odr_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_odr_mst ) {
				 $error_message = "Error selecting table (odr_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$odr_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_odr_mst, SQLSRV_FETCH_ASSOC)) {		
					$odr_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_odr_mst) );

			//ITM Account----JASON
			$sql= "	SELECT	cf_account.account,              
							cf_account.descs        
					FROM	cf_account       
					WHERE	cf_account.site_cd = '".$site_cd."' 
					AND		disable_flag = '0' "; 
					
			$stmt_cf_cf_account = sqlsrv_query( $conn, $sql);

			if( !$stmt_cf_cf_account ) {
				 $error_message = "Error selecting table (cf_account)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$cf_account = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_cf_cf_account, SQLSRV_FETCH_ASSOC)) {		
					$cf_account[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_cf_cf_account) );
			
			//ITM Part Deac Status----JASON
			$sql= "	SELECT	itm_sts.itm_sts_status,     		
							itm_sts.itm_sts_typ_cd,                       
							itm_sts.itm_sts_desc        
					FROM	itm_sts     
					WHERE (itm_sts_disable_flag = '0') 
					AND		itm_sts.site_cd = '".$site_cd."' "; 
					
			$stmt_itm_sts = sqlsrv_query( $conn, $sql);

			if( !$stmt_itm_sts ) {
				 $error_message = "Error selecting table (itm_sts)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$itm_sts = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_itm_sts, SQLSRV_FETCH_ASSOC)) {		
					$itm_sts[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_itm_sts) );
			
			//ITM Issue UOM----JASON
			$sql= "	SELECT	uom_mst.uom_mst_uom,              
							uom_mst.uom_mst_desc        
					FROM	uom_mst      
					WHERE	uom_mst.site_cd = '".$site_cd."' 
					AND		uom_mst_type = 'MATERIAL' 
					AND		uom_mst_disable_flag = '0' "; 
					
			$stmt_uom_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_uom_mst ) {
				 $error_message = "Error selecting table (uom_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$uom_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_uom_mst, SQLSRV_FETCH_ASSOC)) {		
					$uom_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_uom_mst) );
			
			//ITM Storage Type----JASON
			$sql= "	SELECT	stt_mst.stt_mst_stt,              
							stt_mst.stt_mst_desc        
					FROM	stt_mst     
					WHERE (stt_mst_disable_flag = '0'  ) 
					AND		stt_mst.site_cd = '".$site_cd."' "; 
					
			$stmt_stt_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_stt_mst ) {
				 $error_message = "Error selecting table (stt_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$stt_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_stt_mst, SQLSRV_FETCH_ASSOC)) {		
					$stt_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_stt_mst) );
			
			//ITM Tax Code----JASON
			$sql= "	SELECT 	tax_mst.tax_mst_tax_cd,     			
							tax_mst.tax_mst_desc,     			
							tax_mst.tax_mst_tax_rate  
					FROM 	tax_mst     
					WHERE (	tax_mst.tax_mst_disable_flag = '0') 
					AND		tax_mst.site_cd = '".$site_cd."' 
					AND		tax_mst_type 
					IN		('A', 'P') 
					AND		tax_mst_disable_flag = '0' "; 
					
			$stmt_tax_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_tax_mst ) {
				 $error_message = "Error selecting table (tax_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$tax_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_tax_mst, SQLSRV_FETCH_ASSOC)) {		
					$tax_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_tax_mst) );
			
			//Default MR Status----JASON
			$sql= "	SELECT 	mtr_sts.mtr_sts_status,             		
							mtr_sts.mtr_sts_status_type,     			
							mtr_sts.mtr_sts_description,  			
							mtr_sts.mtr_sts_email_flag  
					FROM 	mtr_sts  
					WHERE (mtr_sts.mtr_sts_disable_flag = 0  ) 
					AND 	mtr_sts.site_cd = '".$site_cd."' "; 
					
			$stmt_mtr_sts = sqlsrv_query( $conn, $sql);

			if( !$stmt_mtr_sts ) {
				 $error_message = "Error selecting table (mtr_sts)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$mtr_sts = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_mtr_sts, SQLSRV_FETCH_ASSOC)) {		
					$mtr_sts[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_mtr_sts) );
			
			//Default PR Status----JASON
			$sql= "	SELECT 	pur_sts.pur_sts_status,     			
							pur_sts.pur_sts_status_type,     			
							pur_sts.pur_sts_description,  			
							pur_sts.pur_sts_email_flag  
					FROM 	pur_sts     
					WHERE (	pur_sts.pur_sts_disable_flag = 0  ) 
					AND 	pur_sts.site_cd = '".$site_cd."' "; 
					
			$stmt_pur_sts = sqlsrv_query( $conn, $sql);

			if( !$stmt_pur_sts ) {
				 $error_message = "Error selecting table (pur_sts)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$pur_sts = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_pur_sts, SQLSRV_FETCH_ASSOC)) {		
					$pur_sts[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_pur_sts) );
			
			//Default PO Status----JASON
			$sql= "	SELECT 	puo_sts.puo_sts_status,            		
							puo_sts.puo_sts_status_type,             		
							puo_sts.puo_sts_description,  			
							puo_sts.puo_sts_email_flag  
					FROM 	puo_sts    
					WHERE (	puo_sts.puo_sts_disable_flag = '0'      ) 
					AND 	puo_sts.site_cd = '".$site_cd."' 
					AND 	puo_sts_status_type NOT IN ('CLOSE', 'CANCEL' ) "; 
					
			$stmt_puo_sts = sqlsrv_query( $conn, $sql);

			if( !$stmt_puo_sts ) {
				 $error_message = "Error selecting table (puo_sts)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$puo_sts = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_puo_sts, SQLSRV_FETCH_ASSOC)) {		
					$puo_sts[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_puo_sts) );
			
			//Default PO Currency Code----JASON
			$sql= "	SELECT 	cur_mst.cur_mst_cur_code,     			
							cur_mst.cur_mst_desc,     			
							cur_mst.cur_mst_base_cur,  			
							cur_mst.cur_mst_exchange_rate  
					FROM 	cur_mst    
					WHERE 	cur_mst.site_cd = '".$site_cd."' "; 
					
			$stmt_cur_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_cur_mst ) {
				 $error_message = "Error selecting table (cur_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$cur_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_cur_mst, SQLSRV_FETCH_ASSOC)) {		
					$cur_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_cur_mst) );
			
			//ITM Manufacturer----JASON
			$sql= "	SELECT	mfg_mst.mfg_mst_mfg_cd,              	
							mfg_mst.mfg_mst_company  
					FROM 	mfg_mst 
					WHERE 	mfg_mst.site_cd = '".$site_cd."' "; 
					
			$stmt_mfg_mst = sqlsrv_query( $conn, $sql);

			if( !$stmt_mfg_mst ) {
				 $error_message = "Error selecting table (mfg_mst)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$mfg_mst = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_mfg_mst, SQLSRV_FETCH_ASSOC)) {		
					$mfg_mst[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_mfg_mst) );
			
			//ITM StockLocation----JASON
			$sql= "	SELECT 	DISTINCT   			itm_loc.itm_loc_stk_loc,     			
												itm_loc_oh_qty,  			
						Ava_Qty = 	CASE WHEN ( itm_loc.itm_loc_oh_qty - itm_loc_hard_resrv ) >= 0   							
						THEN ( 					itm_loc.itm_loc_oh_qty - itm_loc_hard_resrv )   							
						ELSE 0 END  
						FROM 					itm_loc,  			
												itm_mst  
						WHERE (					itm_mst.site_cd = itm_loc.site_cd  
						AND 					itm_mst.RowID = itm_loc.mst_RowID  
						AND						itm_loc_inc_ttloh = '1'  
						AND						itm_loc_lockout4count = '0') 
						AND 					itm_mst.site_cd = '".$site_cd."' 
						AND 					itm_mst.itm_mst_stockno = '' "; 
					
			$stmt_itm_loc = sqlsrv_query( $conn, $sql);

			if( !$stmt_itm_loc ) {
				 $error_message = "Error selecting table (itm_loc)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$itm_loc = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_itm_loc, SQLSRV_FETCH_ASSOC)) {		
					$itm_loc[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_itm_loc) );
			
			
			




			$json_All = array();
			
			if( $stmt_CostCenter 				&& $stmt_Cf_Account 			&& $stmt_FaultCode 		&& $stmt_Priority 
				&& $stmt_ActionCode 			&& $stmt_WorkArea 				&& $stmt_CasuseCode 	&& $stmt_WorkClass 
				&& $stmt_wrk_group 				&&$stmt_WorkorderStatus 		&& $stmt_WorkType 		&& $stmt_AssetCode 		
				&& $stmt_CriticalFactor 		&& $stmt_ast_grp 				&& $stmt_ast_lvl 		&& $stmt_ast_loc 
				&& $stmt_ast_sts 				&& $stmt_ast_type 				&&$stmt_emp_mst 		&&$stmt_cnt_mst
				&& $stmt_wko_cnt_mst 			&& $stmt_RatingQuestion 		&& $stmt_MRStockno 		&& $stmt_hours_type 
				&& $stmt_crf_mst 				&& $stmt_supplier 				&& $stmt_uom 			&& $stmt_tax_cd 
				&& $stmt_ast_sts_in_service		&& $stmt_ast_sts_out_of_service && $stmt_customer_cd	&& $emp_sts) {
					
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 $json_All['CostCenter'] = $CostCenter;				 
				 $json_All['account'] = $account;
				 $json_All['FaultCode'] = $FaultCode;
				 $json_All['Priority'] = $Priority;
				 $json_All['ActionCode'] = $ActionCode;
				 $json_All['WorkArea'] = $WorkArea;
				 $json_All['CasuseCode'] = $CasuseCode;
				 $json_All['WorkClass'] = $WorkClass;
				 $json_All['wrk_group'] = $wrk_group;
				 $json_All['WorkorderStatus'] = $WorkorderStatus;
				 $json_All['WorkType'] = $WorkType;
				 $json_All['Assetcode'] = $Assetcode;
				 $json_All['CriticalFactor'] = $CriticalFactor;
				 $json_All['AssetGroupCode'] = $AssetGroupCode;
				 $json_All['AssetLevel'] = $AssetLevel;
				 $json_All['AssetLocation'] = $AssetLocation;
				 $json_All['AssetStatus'] = $AssetStatus;
				 $json_All['AssetType'] = $AssetType;
				 $json_All['Employee'] = $Employee;
				 $json_All['Auto_Numnering'] = $Auto_Numnering;
				 $json_All['Wko_Auto_numbering'] = $Wko_Auto_numbering;
				 $json_All['RatingQuestion'] = $RatingQuestion;
				 $json_All['MRStockno'] = $MRStockno;
				 $json_All['HoursType'] = $HoursType;
				 $json_All['TimeCraft'] = $TimeCraft;
				 $json_All['supplier'] = $supplier;
				 $json_All['uom'] = $uom;
				 $json_All['tax_cd'] = $tax_cd;		 
				 $json_All['Customer_code'] = $customer_cd;
				 $json_All['AssetInService'] = $AssetStatus_In_service;	
				 $json_All['AssetOutOfService'] = $AssetStatus_Out_of_service;	
				 
				 $json_All['Employee_Status'] = $emp_sts;
				 $json_All['Employee_User_Group'] = $usr_grp;
				 $json_All['Employee_Login_Id'] = $cf_user;	
				 $json_All['Employee_Work_Id'] = $mst_war;	
				 $json_All['Employee_Supervisor_Id'] = $emp_mst;
				 $json_All['Employee_Primary_Craft'] = $crf_mst;			
				 $json_All['Employee_Work_Group'] = $wrk_grp;		

				 $json_All['WKO_Original_Periority'] = $wrk_pri;		
				 $json_All['WKO_Status'] = $wrk_sts;	
				 $json_All['WKO_Asset_No'] = $ast_mst;
				 $json_All['WKO_Work_Area'] = $wko_mst_war;			
				 $json_All['WKO_Originator'] = $wko_emp_mst;
				 $json_All['WKO_ProjectID'] = $prj_mst;
				 $json_All['WKO_Delay_Code'] = $wrk_dcd;
				 $json_All['WKO_Work_Type'] = $wrk_typ;
				 $json_All['WKO_Work_Class'] = $wrk_cls;
				 $json_All['WKO_Work_Group'] = $wko_wrk_grp;
				 $json_All['WKO_Planner'] = $wko_planner_emp_mst;
				 $json_All['WKO_Approver'] = $wko_approver_emp_mst;
				 $json_All['WKO_AssignTO'] = $wko_assignto_emp_mst;
				 $json_All['WKO_Labor_Account'] = $cf_account;
				 
				 $json_All['ITM_Commodity_Code'] = $com_mst;
				 $json_All['ITM_Stock_Group'] = $itm_grp;
				 $json_All['ITM_Master_Location'] = $loc_mst;
				 $json_All['ITM_Order_Rule'] = $odr_mst;
				 $json_All['ITM_Part_Deac_Status'] = $itm_sts;
				 $json_All['ITM_Issue_UOM'] = $uom_mst;
				 $json_All['ITM_Storage_Type'] = $stt_mst;
				 $json_All['ITM_Tax_Code'] = $tax_mst;
				 $json_All['Default_MR_Status'] = $mtr_sts;
				 $json_All['Default_PR_Status'] = $pur_sts;
				 $json_All['Default_PO_Status'] = $puo_sts;
				 $json_All['Default_PO_Currency_Code'] = $cur_mst;
				 $json_All['ITM_Manufacturer'] = $mfg_mst;
				 $json_All['ITM_StockLocation'] = $itm_loc;
				 
			
			 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
    case 'CostCenter':
	
			//CostCenter
			$sql= "	SELECT 	cf_cost_center.costcenter,
							cf_cost_center.descs    
					FROM 	cf_cost_center (NOLOCK)  
					WHERE (	cf_cost_center.disable_flag = 0  ) 
					AND 	cf_cost_center.site_cd = '".$site_cd."' 
					AND 	disable_flag = '0'ORDER BY costcenter ASC";

			$stmt_CostCenter = sqlsrv_query( $conn, $sql);

			if( !$stmt_CostCenter ) {
				 $error_message = "Error selecting table (Cost Center)";
				 returnError($error_message);
				 die( print_r( sqlsrv_errors(), true));
				 
			}

			$CostCenter = array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_CostCenter, SQLSRV_FETCH_ASSOC)) {		
					$CostCenter[] = $row;	
				
				 }
			} while ( sqlsrv_next_result($stmt_CostCenter) );
			if($stmt_CostCenter) {
					 sqlsrv_commit( $conn );
					 sqlsrv_close( $conn);	
					
					 $json_All['CostCenter'] = $CostCenter;				 
						 
					
					returnData($json_All);		
				} else {
					 sqlsrv_rollback( $conn );
					 $error_message = "Transaction rolled back.<br />";
					 returnError($error_message);
				}
    break;
    case 'account':
	
		//Cf_Account
		$sql="	SELECT 	cf_account.account, cf_account.descs        
				FROM 	cf_account (NOLOCK)     
				WHERE 	cf_account.site_cd = '".$site_cd."' 
				AND 	disable_flag = '0'ORDER BY cf_account.account ASC";
				
		$stmt_Cf_Account = sqlsrv_query( $conn, $sql);

		if( !$stmt_Cf_Account ) {
			 $error_message = "Error selecting table (Account list)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$account = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_Cf_Account, SQLSRV_FETCH_ASSOC)) {		
				$account[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_Cf_Account) );
		if( $stmt_Cf_Account ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
							 
				 $json_All['account'] = $account;
					 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'FaultCode':
		//FaultCode
		$sql= "SELECT 	wrk_flt.wrk_flt_fault_cd,wrk_flt.wrk_flt_desc  
				FROM 	wrk_flt (NOLOCK) 
				WHERE 	wrk_flt.site_cd = '".$site_cd."' 
				AND 	wrk_flt.wrk_flt_disable_flag = '0' ORDER BY wrk_flt_fault_cd ASC";
		$stmt_FaultCode = sqlsrv_query( $conn, $sql);

		if( !$stmt_FaultCode ) {
			 $error_message = "Error selecting table (Fault Code)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$FaultCode = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_FaultCode, SQLSRV_FETCH_ASSOC)) {		
				$FaultCode[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_FaultCode) );
        if( $stmt_FaultCode ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				
				 $json_All['FaultCode'] = $FaultCode;
				 		 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'Priority':
	
		//Priority
		$sql= "	SELECT 	wrk_pri.wrk_pri_pri_cd,  
						wrk_pri.wrk_pri_desc,  
						wrk_pri.wrk_pri_due_date_count  
				FROM 	wrk_pri   (NOLOCK)
				WHERE 	wrk_pri.site_cd = '".$site_cd."'
				AND 	wrk_pri.wrk_pri_disable_flag = '0'ORDER BY wrk_pri_pri_cd ASC";
		$stmt_Priority = sqlsrv_query( $conn, $sql);

		if( !$stmt_Priority ) {
			 $error_message = "Error selecting table (Priority)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$Priority = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_Priority, SQLSRV_FETCH_ASSOC)) {		
				$Priority[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_Priority) );
       if( $stmt_Priority ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				
				 $json_All['Priority'] = $Priority;
				  
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'ActionCode':
	
		//Work ActionCode
		$sql= "	SELECT 	wrk_act.wrk_act_action_cd, 
						wrk_act.wrk_act_desc        
				FROM 	wrk_act (NOLOCK)  
				WHERE 	wrk_act.site_cd = '".$site_cd."' 
				AND 	wrk_act.wrk_act_disable_flag ='0' ORDER BY wrk_act_action_cd ASC";
				
		$stmt_ActionCode = sqlsrv_query( $conn, $sql);

		if( !$stmt_ActionCode ) {
			 $error_message = "Error selecting table (wrk_act)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$ActionCode = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_ActionCode, SQLSRV_FETCH_ASSOC)) {		
				$ActionCode[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_ActionCode) );
        if( $stmt_ActionCode ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['ActionCode'] = $ActionCode;
						 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'WorkArea':
	
		//WorkArea
		$sql= "SELECT mst_war.mst_war_work_area,mst_war.mst_war_desc 
				FROM mst_war (NOLOCK)
				WHERE (mst_war.mst_war_disable_flag = 0     ) 
				AND mst_war.site_cd = '".$site_cd."'ORDER BY mst_war_work_area ";


		$stmt_WorkArea = sqlsrv_query( $conn, $sql);

		if( !$stmt_WorkArea ) {
			 $error_message = "Error selecting table (Work Area)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));	 
		}

		$WorkArea = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_WorkArea, SQLSRV_FETCH_ASSOC)) {		
				$WorkArea[] = $row;	
			 }
		} while ( sqlsrv_next_result($stmt_WorkArea) );
		if( $stmt_WorkArea ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['WorkArea'] = $WorkArea;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'CasuseCode':
	
	//WorkCasuseCode
		$sql= "	SELECT 	wrk_ccd.wrk_ccd_cause_cd,
						wrk_ccd.wrk_ccd_desc      
				FROM 	wrk_ccd (NOLOCK)      
				WHERE 	wrk_ccd.site_cd = '".$site_cd."' 
				AND 	wrk_ccd.wrk_ccd_disable_flag ='0' ORDER BY wrk_ccd_cause_cd ASC";
				
		$stmt_CasuseCode = sqlsrv_query( $conn, $sql);

		if( !$stmt_CasuseCode ) {
			 $error_message = "Error selecting table (wrk_ccd)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$CasuseCode = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_CasuseCode, SQLSRV_FETCH_ASSOC)) {		
				$CasuseCode[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_CasuseCode) );

        if( $stmt_CasuseCode ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['CasuseCode'] = $CasuseCode;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'WorkClass':
	
		//WorkClass
		$sql= "	SELECT 	wrk_cls.wrk_cls_cls_cd,
						wrk_cls.wrk_cls_desc  
				FROM 	wrk_cls (NOLOCK)       
				WHERE 	wrk_cls.site_cd = '".$site_cd."' 
				AND 	wrk_cls.wrk_cls_disable_flag ='0' ORDER BY wrk_cls_cls_cd ASC";
				
		$stmt_WorkClass = sqlsrv_query( $conn, $sql);

		if( !$stmt_WorkClass ) {
			 $error_message = "Error selecting table (wrk_cls)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$WorkClass = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_WorkClass, SQLSRV_FETCH_ASSOC)) {		
				$WorkClass[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_WorkClass) );
        if(  $stmt_WorkClass) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['WorkClass'] = $WorkClass;
				 		 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'wrk_group':
	
	//wrk_group
		$sql="	SELECT 	wrk_grp_grp_cd,wrk_grp_desc 
				from 	wrk_grp 
				where 	site_cd = '".$site_cd."'";
				
		$stmt_wrk_group = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_group ) {
			 $error_message = "Error selecting table (Account list)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wrk_group = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_group, SQLSRV_FETCH_ASSOC)) {		
				$wrk_group[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_group) );
        if( $stmt_wrk_group) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['wrk_group'] = $wrk_group;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'WorkorderStatus':
	
		//Workorder Status
		$sql= "	SELECT 	wrk_sts.wrk_sts_status,  wrk_sts.wrk_sts_typ_cd,    wrk_sts.wrk_sts_desc,  wrk_sts.wrk_sts_email_flag  
				FROM 	wrk_sts  (NOLOCK)
				WHERE  (wrk_sts.wrk_sts_disable_flag = 0  ) 
				AND 	wrk_sts.site_cd = '".$site_cd."'";
				
		$stmt_WorkorderStatus = sqlsrv_query( $conn, $sql);

		if( !$stmt_WorkorderStatus ) {
			 $error_message = "Error selecting table (Workorder Status)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$WorkorderStatus = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_WorkorderStatus, SQLSRV_FETCH_ASSOC)) {		
				$WorkorderStatus[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_WorkorderStatus) );
        if( $stmt_WorkorderStatus) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				
				 $json_All['WorkorderStatus'] = $WorkorderStatus;
					 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'WorkType':
	
		//WorkType
		$sql= "	SELECT  wrk_typ.wrk_typ_typ_cd ,
						wrk_typ.wrk_typ_desc, 
						wrk_typ_option,  
						wrk_typ_pm_option  
				FROM 	wrk_typ  (NOLOCK)     
				WHERE 	wrk_typ.site_cd = '".$site_cd."' 
				AND 	wrk_typ.wrk_typ_disable_flag ='0'ORDER BY wrk_typ_typ_cd ASC";
				
		$stmt_WorkType = sqlsrv_query( $conn, $sql);

		if( !$stmt_WorkType ) {
			 $error_message = "Error selecting table (wrk_typ)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$WorkType = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_WorkType, SQLSRV_FETCH_ASSOC)) {		
				$WorkType[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_WorkType) );
        if( $stmt_WorkType) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				
				 $json_All['WorkType'] = $WorkType;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'Assetcode':
	
		//AssetCode
		$sql= "	SELECT 	ast_cod.ast_cod_ast_cd, ast_cod.ast_cod_desc        
				FROM 	ast_cod  (NOLOCK)      
				WHERE (	ast_cod.ast_cod_disable_flag = 0  ) 
				AND 	ast_cod.site_cd = '".$site_cd."'ORDER BY ast_cod_ast_cd";


		$stmt_AssetCode = sqlsrv_query( $conn, $sql);

		if( !$stmt_AssetCode ) {
			 $error_message = "Error selecting table (Asset Code)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$Assetcode = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_AssetCode, SQLSRV_FETCH_ASSOC)) {		
				$Assetcode[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_AssetCode) );

        if( $stmt_AssetCode) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['Assetcode'] = $Assetcode;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'CriticalFactor':
	
			//CriticalFactor
		$sql= "SELECT 	ast_cri.ast_cri_cri_factor,ast_cri.ast_cri_desc    
				FROM 	ast_cri  (NOLOCK)
				WHERE (	ast_cri.ast_cri_disable_flag = 0  ) 
				AND ast_cri.site_cd = '".$site_cd."'ORDER BY ast_cri_cri_factor";


		$stmt_CriticalFactor = sqlsrv_query( $conn, $sql);

		if( !$stmt_CriticalFactor ) {
			 $error_message = "Error selecting table (Critical Factor)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));	 
		}

		$CriticalFactor = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_CriticalFactor, SQLSRV_FETCH_ASSOC)) {		
				$CriticalFactor[] = $row;	
			 }
		} while ( sqlsrv_next_result($stmt_CriticalFactor) );
       if( $stmt_CriticalFactor ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['CriticalFactor'] = $CriticalFactor;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'AssetGroupCode':
	
		//AssetGroupCode
		$sql= "SELECT 	ast_grp.ast_grp_grp_cd, ast_grp.ast_grp_desc ,ast_grp_option
				FROM 	ast_grp  (NOLOCK)
				WHERE (	ast_grp.ast_grp_disable_flag =0  ) 
				AND ast_grp.site_cd = '".$site_cd."'ORDER BY ast_grp_grp_cd";


		$stmt_ast_grp = sqlsrv_query( $conn, $sql);

		if( !$stmt_ast_grp ) {
			 $error_message = "Error selecting table (Asset Group Code)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$AssetGroupCode = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_ast_grp, SQLSRV_FETCH_ASSOC)) {		
				$AssetGroupCode[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_ast_grp) );
        if( $stmt_ast_grp ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['AssetGroupCode'] = $AssetGroupCode;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'AssetLevel':
	
		//Level
		$sql= "SELECT 	ast_lvl.ast_lvl_ast_lvl, ast_lvl.ast_lvl_desc    
				FROM 	ast_lvl    (NOLOCK)
				WHERE (	ast_lvl.ast_lvl_disable_flag = 0)
				AND ast_lvl.site_cd = '".$site_cd."'ORDER BY ast_lvl_ast_lvl";


		$stmt_ast_lvl = sqlsrv_query( $conn, $sql);

		if( !$stmt_ast_lvl ) {
			 $error_message = "Error selecting table (Level)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));	 
		}

		$AssetLevel = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_ast_lvl, SQLSRV_FETCH_ASSOC)) {		
				$AssetLevel[] = $row;	
			 }
		} while ( sqlsrv_next_result($stmt_ast_lvl) );
        if(  $stmt_ast_lvl) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['AssetLevel'] = $AssetLevel;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'AssetLocation':
	
		//AssetLocation
		$sql= "SELECT 	ast_loc.ast_loc_ast_loc,ast_loc.ast_loc_desc,ast_loc.ast_loc_wr_option,ast_loc.ast_loc_wo_option, ast_loc.ast_loc_pm_option  
				FROM 	ast_loc     (NOLOCK)
				WHERE (	ast_loc.ast_loc_disable_flag = 0      ) 
				AND ast_loc.site_cd = '".$site_cd."'ORDER BY ast_loc_ast_loc";


		$stmt_ast_loc = sqlsrv_query( $conn, $sql);

		if( !$stmt_ast_loc ) {
			 $error_message = "Error selecting table (Asset Location)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));	 
		}

		$AssetLocation = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_ast_loc, SQLSRV_FETCH_ASSOC)) {		
				$AssetLocation[] = $row;	
			 }
		} while ( sqlsrv_next_result($stmt_ast_loc) );
        if( $stmt_ast_loc ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				
				 $json_All['AssetLocation'] = $AssetLocation;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'AssetStatus':
		//AssetStatus
		$sql= "SELECT ast_sts_status,ast_sts_desc		
				FROM 	ast_sts (NOLOCK)
				WHERE	ast_sts.site_cd = '".$site_cd."'
				ORDER BY ast_sts_status";


		$stmt_ast_sts = sqlsrv_query( $conn, $sql);

		if( !$stmt_ast_sts ) {
			 $error_message = "Error selecting table (Asset Status)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$AssetStatus = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_ast_sts, SQLSRV_FETCH_ASSOC)) {		
				$AssetStatus[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_ast_sts) );
        if(  $stmt_ast_sts) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['AssetStatus'] = $AssetStatus;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'AssetType':
	
		//AssetType
		$sql= "SELECT ast_type.ast_type_cd, ast_type.ast_type_descs 
				FROM ast_type (NOLOCK)
				WHERE (ast_type.ast_type_disable_flag = 0  ) 
				AND ast_type.site_cd = '".$site_cd."'ORDER BY ast_type_cd";


		$stmt_ast_type = sqlsrv_query( $conn, $sql);

		if( !$stmt_ast_type ) {
			 $error_message = "Error selecting table (Asset Type)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$AssetType = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_ast_type, SQLSRV_FETCH_ASSOC)) {		
				$AssetType[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_ast_type) );
		if( $stmt_ast_type) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['AssetType'] = $AssetType;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'Employee':
	
		//Employee
		$sql= "SELECT  emp_mst.emp_mst_empl_id,     		
				emp_mst_title = COALESCE(emp_mst_title,''), 
				emp_mst.emp_mst_name,emp_mst_emg_phone = COALESCE(emp_mst_emg_phone,''),
				emp_det_craft = COALESCE(emp_det_craft+':'+crf_mst_desc,''),
				emp_ls1_charge_rate = COALESCE(emp_ls1.emp_ls1_charge_rate,0)		
		From 	emp_mst (NOLOCK)

				LEFT 
				OUTER 
				JOIN	emp_sts (NOLOCK) 
				ON		emp_mst.site_cd = emp_sts.site_cd  
				and     emp_mst.emp_mst_status = emp_sts.emp_sts_status  	
				And		emp_sts.emp_sts_typ_cd = 'ACTIVE'

				LEFT 
				OUTER 
				JOIN	emp_det (NOLOCK) 
				ON		emp_mst.site_cd = emp_det.site_cd		
				And		emp_mst.rowid = emp_det.mst_rowid
				
				LEFT 
				OUTER 
				JOIN	emp_ls1 (NOLOCK) 
				ON		emp_det.mst_rowid = emp_ls1.mst_rowid	
				And		emp_det.site_cd = emp_ls1.site_cd	
				AND		emp_det.emp_det_craft = emp_ls1.emp_ls1_craft
				
				LEFT 
				OUTER 
				JOIN	crf_mst (NOLOCK) 
				ON		emp_det.site_cd = crf_mst.site_cd		
				AND		emp_det.emp_det_craft = crf_mst.crf_mst_crf_cd	
				
				
		WHERE	emp_mst.site_cd = '".$site_cd."' And emp_sts.emp_sts_typ_cd = 'ACTIVE' ORDER BY emp_mst.emp_mst_empl_id ASC";


		 $stmt_emp_mst = sqlsrv_query( $conn, $sql);


		if( !$stmt_emp_mst ) {
			 $error_message = "Error selecting table (emp_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$Employee = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {
				$row['emp_mst_name'] =  utf8_encode($row['emp_mst_name']);
				$Employee[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_emp_mst) );
        if( $stmt_emp_mst ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['Employee'] = $Employee;
				 		 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'Auto_Numnering':
	
			//Asset_Auto_Numnering
		$sql="	SELECT 	cnt_mst_numbering , 
						cnt_mst_option ,
						cnt_mst_module_cd 
				FROM 	cnt_mst  (NOLOCK)
				WHERE  	cnt_mst.site_cd ='".$site_cd."'
				AND 	cnt_mst_module_cd =  'AST'";

		$stmt_cnt_mst = sqlsrv_query( $conn, $sql);
		 
		 
		if( !$stmt_cnt_mst ) {
			
			 $error_message = "Error selecting table (cnt_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}
		$Auto_Numnering = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_cnt_mst, SQLSRV_FETCH_ASSOC)) {		
				$Auto_Numnering[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_cnt_mst) );
        if(  $stmt_cnt_mst) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				
				 $json_All['Auto_Numnering'] = $Auto_Numnering;
				 		 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'Wko_Auto_numbering':
	
			//WorkOrder_Auto_Numnering
		$sql= "	Select 	cnt_mst_numbering ,
						cnt_mst_option ,
						cnt_mst_module_cd 
				From 	cnt_mst (NOLOCK) 
				Where 	site_cd ='".$site_cd."' 
				And cnt_mst_module_cd ='WKO'";

		$stmt_wko_cnt_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_wko_cnt_mst ) {
			 $error_message = "Error selecting table (cnt_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$Wko_Auto_numbering = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wko_cnt_mst, SQLSRV_FETCH_ASSOC)) {		
				$Wko_Auto_numbering[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wko_cnt_mst) );
        if(  $stmt_wko_cnt_mst ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['Wko_Auto_numbering'] = $Wko_Auto_numbering;
				 		 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'RatingQuestion':
	
	//RatingQuestion
			$sql="select column_name = CASE WHEN column_name =  'wko_det_rating1' Then '1'
			WHEN column_name =  'wko_det_rating2' Then '2'
			WHEN column_name =  'wko_det_rating3' Then '3' End
			, * from cf_label(NOLOCK) where table_name = 'wko_det' and language_cd = 'DEFAULT' and column_name IN ('wko_det_rating1','wko_det_rating2','wko_det_rating3')";	
				
	//echo $sql;
	//$params = array($site_cd,$mst_RowID);					
						
		$stmt_RatingQuestion = sqlsrv_query( $conn, $sql);

			if( !$stmt_RatingQuestion ) {
				$error_message = "Error SELECT Table (wko_ls8)";
				returnError($error_message);
				die( print_r( sqlsrv_errors(), true));
			}

			$RatingQuestion= array();

			do {
				 while ($row = sqlsrv_fetch_array($stmt_RatingQuestion, SQLSRV_FETCH_ASSOC)) {	
				 
					$RatingQuestion[] = $row;		
				
				 }
			} while ( sqlsrv_next_result($stmt_RatingQuestion) );
        if( $stmt_RatingQuestion ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['RatingQuestion'] = $RatingQuestion;
				 		 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'MRStockno':
	
		//MRStockno			
		$sql="SELECT DISTINCT  
			itm_mst.itm_mst_stockno, 
			itm_mst_costcenter,
			itm_mst_mstr_locn,
			itm_mst.itm_mst_desc, 
			itm_mst_ext_desc = COALESCE(cast(itm_mst.itm_mst_ext_desc as varchar(2000)),'' ),
			itm_mst.itm_mst_type,   
			itm_mst.itm_mst_com_code, 
			itm_mst.itm_mst_itm_grp,
			itm_mst_issue_uom,
			itm_mst_account,
			itm_mst_rec_supplier,
			itm_det_issue_price,
			itm_mst_partno = COALESCE(itm_mst_partno,''),
			itm_mst.itm_mst_ttl_oh
			
			FROM 		itm_mst(NOLOCK), itm_det(NOLOCK),  itm_sts(NOLOCK),  				
			itm_loc  WHERE (	( itm_mst.site_cd = itm_det.site_cd )  
			AND			( itm_mst.RowID = itm_det.mst_RowID ) 
			AND			( itm_mst.site_cd = itm_loc.site_cd )  
			AND			( itm_mst.RowID = itm_loc.mst_RowID )  
			AND			( itm_det.site_cd = itm_sts.site_cd ) 
			AND			( itm_det.itm_det_part_deac_status = itm_sts.itm_sts_status )  
			AND			( itm_sts_typ_cd = 'ACTIVE' )) 
			AND itm_mst.site_cd = '".$site_cd."'" ;
			
		$stmt_MRStockno = sqlsrv_query( $conn, $sql);

		if( !$stmt_MRStockno ) {
			 $error_message = "Error selecting table (MR Stockno)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$json = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_MRStockno, SQLSRV_FETCH_ASSOC)) {		
				$MRStockno[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_MRStockno) );
        if( $stmt_MRStockno ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['MRStockno'] = $MRStockno;
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'HoursType':
	
		//Time card houres
		$sql="SELECT hours_type_cd = hours_type_cd+' : '+ hours_type_desc,  hours_type.hours_type_multiplier, hours_type.hours_type_adder    FROM hours_type (NOLOCK)   
				WHERE hours_type.site_cd = ?";			
		
		$params = array($site_cd);		
		$stmt_hours_type = sqlsrv_query( $conn, $sql,$params);

		if( !$stmt_hours_type ) {
			$error_message = "Error selecting table (Hours Type)";
			returnError($error_message);
			die( print_r( sqlsrv_errors(), true));
					 
		}

		$HoursType= array();

		do {
			while ($row = sqlsrv_fetch_array($stmt_hours_type, SQLSRV_FETCH_ASSOC)) {	
					 
			$HoursType[] = $row;		
					
			}
		}
		while ( sqlsrv_next_result($stmt_hours_type) );																					
        if( $stmt_hours_type ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				
				 $json_All['HoursType'] = $HoursType;
				 	 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'TimeCraft':
	
		//Time craft
		$sql="	SELECT 	emp_ls1_craft = emp_ls1_craft+' : '+crf_mst_desc, emp_ls1.emp_ls1_charge_rate,emp_mst.emp_mst_empl_id       
				FROM 	crf_mst (NOLOCK) , 	emp_ls1(NOLOCK),  	emp_mst(NOLOCK)  
				WHERE 	(crf_mst.site_cd = emp_ls1.site_cd  
				AND		crf_mst.crf_mst_crf_cd = emp_ls1.emp_ls1_craft  
				AND		crf_mst.site_cd = emp_mst.site_cd  
				AND		emp_ls1.mst_rowid = emp_mst.rowid) 
				AND 	emp_mst.site_cd = ?";	
				
		//echo $sql;
		$params = array($site_cd);					
							
		$stmt_crf_mst = sqlsrv_query( $conn, $sql,$params);

				if( !$stmt_crf_mst ) {
					$error_message = "Error SELECT Table (crf_mst)";
					returnError($error_message);
					die( print_r( sqlsrv_errors(), true));
				}

				$TimeCraft= array();

				do {
					 while ($row = sqlsrv_fetch_array($stmt_crf_mst, SQLSRV_FETCH_ASSOC)) {	
					 
						$TimeCraft[] = $row;		
					
					 }
				} while ( sqlsrv_next_result($stmt_crf_mst) );
		if( $stmt_crf_mst) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				
				 
				 $json_All['TimeCraft'] = $TimeCraft;
				 
				
				returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
    break;
	case 'supplier':
	
		//supplier			
		$sql= "SELECT 	sup_mst.sup_mst_supplier_cd,   
						sup_mst.sup_mst_desc,  
						sup_mst.sup_mst_status  
				FROM 	sup_mst (NOLOCK), sup_sts (NOLOCK)
				WHERE (sup_mst.site_cd = sup_sts.site_cd  
				AND			sup_mst.sup_mst_status = sup_sts.sup_sts_status  
				AND			sup_sts.sup_sts_typ_cd NOT IN ('DEACTIVATE')) 
				AND sup_mst.site_cd = '".$site_cd."' ORDER BY sup_mst_supplier_cd ASC";
		$stmt_supplier = sqlsrv_query( $conn, $sql);

		if( !$stmt_supplier ) {
			 $error_message = "Error selecting table (sup_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$supplier = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_supplier, SQLSRV_FETCH_ASSOC)) {		
				$supplier []= $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_supplier) );
		if( $stmt_supplier ) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);
				 $json_All['supplier'] = $supplier;
				 returnData($json_All);		
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}				
    break;
	case 'uom':
	
		//UOM
		$sql= "SELECT 	uom_mst.uom_mst_uom,  uom_mst.uom_mst_desc  FROM uom_mst(NOLOCK)  
				WHERE 	uom_mst.site_cd = '".$site_cd."' 
				AND 	uom_mst_type = 'SERVICE' 
				AND 	uom_mst_disable_flag = '0' ORDER BY uom_mst_uom ASC ";
		$stmt_uom = sqlsrv_query( $conn, $sql);

		if( !$stmt_uom ) {
			 $error_message = "Error selecting table (Mydefault values)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$uom = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_uom, SQLSRV_FETCH_ASSOC)) {		
				$uom[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_uom) );
		if( $stmt_uom ) {
			
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);
				 $json_All['uom'] = $uom;
				 returnData($json_All);	
				 
			} else {
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
			
    break;		
	case 'tax_cd':
	
		//Tax code
		$sql= "	SELECT 	tax_mst.tax_mst_tax_cd, 
						tax_mst.tax_mst_desc, 
						tax_mst.tax_mst_tax_rate  
				FROM 	tax_mst (NOLOCK)    
				WHERE (	tax_mst.tax_mst_disable_flag = '0') 
				AND tax_mst.site_cd = '".$site_cd."' 
				AND tax_mst_type IN ('A', 'P') 
				AND tax_mst_disable_flag = '0' ORDER BY tax_mst_tax_cd ASC";
		$stmt_tax_cd = sqlsrv_query( $conn, $sql);

		if( !$stmt_tax_cd ) {
			 $error_message = "Error selecting table (Priority)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$tax_cd = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_tax_cd, SQLSRV_FETCH_ASSOC)) {		
				$tax_cd[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_tax_cd) );
			
		if($stmt_tax_cd) {
				 sqlsrv_commit( $conn );
				 sqlsrv_close( $conn);	
				 
				 $json_All['tax_cd'] = $tax_cd;
				 returnData($json_All);	
				 
			} else {
				
				 sqlsrv_rollback( $conn );
				 $error_message = "Transaction rolled back.<br />";
				 returnError($error_message);
			}
				
	break;

	case 'Employee_Status':
	
		//Emp status----JASON
		$sql= "	SELECT 	emp_sts.emp_sts_status,   
						emp_sts.emp_sts_typ_cd,     			
						emp_sts.emp_sts_desc    
				FROM 	emp_sts     
				WHERE (	emp_sts.emp_sts_disable_flag = 0) 
				AND     emp_sts.site_cd = '".$site_cd."'";
				
		$stmt_emp_sts = sqlsrv_query( $conn, $sql);

		if( !$stmt_emp_sts ) {
			 $error_message = "Error selecting table (emp_sts)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$emp_sts = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_emp_sts, SQLSRV_FETCH_ASSOC)) {		
				$emp_sts[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_emp_sts) );
			
		if($stmt_emp_sts) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Employee_Status'] = $emp_sts;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;

	case 'Employee_User_Group':
	
		//Emp user group----JASON
		$sql= "	SELECT	usr_grp.usr_grp_usr_grp,              
						usr_grp.usr_grp_desc        
				FROM	usr_grp        
				WHERE (	usr_grp.usr_grp_disable_flag = 0) 
				AND		usr_grp.site_cd = '".$site_cd."' ";
				
		$stmt_usr_grp = sqlsrv_query( $conn, $sql);

		if( !$stmt_usr_grp ) {
			 $error_message = "Error selecting table (usr_grp)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$usr_grp = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_usr_grp, SQLSRV_FETCH_ASSOC)) {		
				$usr_grp[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_usr_grp) );
			
		if($stmt_usr_grp) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Employee_User_Group'] = $usr_grp;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;	
	
	case 'Employee_Login_Id':
	
		//Emp login id----JASON
		$sql= "	SELECT 	cf_user.empl_id,     			
						cf_user.name    
				FROM 	cf_user		
				WHERE ( cf_user.empl_id NOT IN ( 
				SELECT	emp_mst_login_id 
				FROM	emp_mst		
				WHERE	emp_mst.site_cd = '".$site_cd."' 
				AND		emp_mst_login_id 
				IS NOT NULL  AND emp_mst_login_id <> '' ))";
				
		$stmt_cf_user = sqlsrv_query( $conn, $sql);

		if( !$stmt_cf_user ) {
			 $error_message = "Error selecting table (cf_user)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$cf_user = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_cf_user, SQLSRV_FETCH_ASSOC)) {		
				$cf_user[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_cf_user) );
			
		if($stmt_cf_user) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Employee_Login_Id'] = $cf_user;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;	
	
	case 'Employee_Work_Id':
	
		//Emp work area----JASON
		$sql= "	SELECT	mst_war.mst_war_work_area,              
						mst_war.mst_war_desc        
				FROM	mst_war      
				WHERE ( mst_war.mst_war_disable_flag = 0     ) 
				AND		mst_war.site_cd = '".$site_cd."'"; 
				
		$stmt_mst_war = sqlsrv_query( $conn, $sql);

		if( !$stmt_mst_war ) {
			 $error_message = "Error selecting table (mst_war)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$mst_war = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_mst_war, SQLSRV_FETCH_ASSOC)) {		
				$mst_war[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_mst_war) );
			
		if($stmt_mst_war) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Employee_Work_Id'] = $mst_war;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	case 'Employee_Supervisor_Id':
	
		//Emp supervisor id----JASON
		$sql= "	SELECT 	emp_mst.emp_mst_empl_id,     			
						emp_mst.emp_mst_name,     			
						emp_mst.emp_mst_title    
				FROM	emp_mst,  			
						emp_det,  			
						emp_sts  
				WHERE ( emp_mst.site_cd = emp_det.site_cd  
				AND		emp_mst.RowID = emp_det.mst_rowid  
				AND		emp_mst.site_cd = emp_sts.site_cd  
				AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
				AND		emp_sts.emp_sts_typ_cd = 'ACTIVE'  
				AND		emp_det.emp_det_supervisor 
				IS NOT NULL  
				AND		emp_det.emp_det_supervisor = '1') 
				AND		emp_mst.site_cd = '".$site_cd."'order by emp_mst_empl_id ASC "; 
				
		$stmt_emp_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_emp_mst ) {
			 $error_message = "Error selecting table (emp_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$emp_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
				$emp_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_emp_mst) );
			
		if($stmt_emp_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Employee_Supervisor_Id'] = $emp_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	case 'Employee_Primary_Craft':
	
		//Emp primary craft----JASON
		$sql= "	SELECT 	crf_mst.crf_mst_crf_cd,     			
						crf_mst.crf_mst_desc,     			
						crf_mst.crf_mst_crf_est_rate    
				FROM 	crf_mst     
				WHERE (	crf_mst.crf_mst_disable_flag = 0) 
				AND		crf_mst.site_cd = '".$site_cd."'"; 
				
		$stmt_crf_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_crf_mst ) {
			 $error_message = "Error selecting table (crf_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$crf_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_crf_mst, SQLSRV_FETCH_ASSOC)) {		
				$crf_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_crf_mst) );
			
		if($stmt_crf_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Employee_Primary_Craft'] = $crf_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	case 'Employee_Work_Group':
	
		//Emp work group----JASON
		$sql= "	SELECT 	wrk_grp.wrk_grp_grp_cd,     				
						wrk_grp.wrk_grp_desc    
				FROM	wrk_grp     
				WHERE ( wrk_grp_disable_flag = '0'  ) 
				AND		wrk_grp.site_cd = '".$site_cd."'
				AND		wrk_grp.wrk_grp_disable_flag ='0'"; 
				
		$stmt_wrk_grp = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_grp ) {
			 $error_message = "Error selecting table (wrk_grp)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wrk_grp = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_grp, SQLSRV_FETCH_ASSOC)) {		
				$wrk_grp[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_grp) );
			
		if($stmt_wrk_grp) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Employee_Work_Group'] = $wrk_grp;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
		
		
		
		case 'WKO_Original_Periority':
	
		//WKO Original Periority----JASON
		$sql= "	SELECT 	wrk_pri.wrk_pri_pri_cd,     				
						wrk_pri.wrk_pri_desc,
						wrk_pri.wrk_pri_due_date_count
				FROM	wrk_pri     
				WHERE ( wrk_pri_disable_flag = '0'  ) 
				AND		wrk_pri.site_cd = '".$site_cd."'
				AND		wrk_pri.wrk_pri_disable_flag ='0' order by wrk_pri_pri_cd ASC"; 
				
		$stmt_wrk_pri = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_pri ) {
			 $error_message = "Error selecting table (wrk_pri)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wrk_pri = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_pri, SQLSRV_FETCH_ASSOC)) {		
				$wrk_pri[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_pri) );
			
		if($stmt_wrk_pri) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Original_Periority'] = $wrk_pri;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	case 'WKO_Status':
	
		//WKO Status----JASON
		$sql= "	SELECT 	wrk_sts.wrk_sts_status,     				
						wrk_sts.wrk_sts_typ_cd,
						wrk_sts.wrk_sts_desc,
						wrk_sts.wrk_sts_email_flag
				FROM	wrk_sts     
				WHERE ( wrk_sts_disable_flag = '0'  ) 
				AND		wrk_sts.wrk_sts_typ_cd NOT IN ( 'COMPLETE', 'CLOSE', 'CANCEL', 'FORCE-CLOSE' )
				AND		wrk_sts.site_cd = '".$site_cd."' order by wrk_sts_status ASC";
				
		$stmt_wrk_sts = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_sts ) {
			 $error_message = "Error selecting table (wrk_sts)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wrk_sts = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_sts, SQLSRV_FETCH_ASSOC)) {		
				$wrk_sts[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_sts) );
			
		if($stmt_wrk_sts) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Status'] = $wrk_sts;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Asset No----JASON
		$sql= "	SELECT 		ast_mst.ast_mst_asset_no,			ast_mst.ast_mst_cost_center,		ast_mst.ast_mst_asset_type,			ast_mst.ast_mst_asset_grpcode,  				
							ast_mst.ast_mst_asset_status,		ast_mst.ast_mst_asset_shortdesc,	ast_mst.ast_mst_asset_longdesc,		ast_mst.ast_mst_work_area,      				
							ast_mst.ast_mst_asset_locn,			ast_mst.ast_mst_perm_id,  			ast_det.ast_det_cus_code  
				FROM 		ast_mst (NOLOCK),  					ast_det (NOLOCK),  					ast_sts (NOLOCK)  
				WHERE (		ast_mst.site_cd = ast_det.site_cd  
				AND			ast_mst.RowID = ast_det.mst_RowID  
				AND			ast_mst.site_cd = ast_sts.site_cd  
				AND			ast_mst.ast_mst_asset_status = ast_sts.ast_sts_status  
				AND			ast_sts.ast_sts_typ_cd 
				NOT IN (	'AWA-DISPOSED', 'DISPOSED', 'OUT-OF-SERVICE')) 
				AND			ast_mst.site_cd = '".$site_cd."' "; 
				
		$stmt_ast_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_ast_mst ) {
			 $error_message = "Error selecting table (ast_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$ast_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_ast_mst, SQLSRV_FETCH_ASSOC)) {		
				$ast_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_ast_mst) );
			
		if($stmt_ast_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Asset_No'] = $ast_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Work Area----JASON
		$sql= "	SELECT 	mst_war.mst_war_work_area,     				
						mst_war.mst_war_desc
				FROM	mst_war     
				WHERE ( mst_war_disable_flag = '0'  ) 
				AND		mst_war.site_cd = '".$site_cd."'"; 
				
		$stmt_mst_war = sqlsrv_query( $conn, $sql);

		if( !$stmt_mst_war ) {
			 $error_message = "Error selecting table (wko_mst_war)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wko_mst_war = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_mst_war, SQLSRV_FETCH_ASSOC)) {		
				$wko_mst_war[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_mst_war) );
			
		if($stmt_mst_war) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Work_Area'] = $wko_mst_war;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO_Originator----JASON
		$sql= "	SELECT 	emp_mst.emp_mst_empl_id,     				
						emp_mst.emp_mst_name,
						emp_mst.emp_mst_emg_phone
				FROM	emp_mst,
						emp_sts
				WHERE (	emp_mst.site_cd = emp_sts.site_cd  
				AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
				AND		emp_sts.emp_sts_typ_cd = 'ACTIVE') 
				AND		emp_mst.site_cd = '".$site_cd."'"; 
				
		$stmt_emp_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_emp_mst ) {
			 $error_message = "Error selecting table (wko_emp_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wko_emp_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
				$wko_emp_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_emp_mst) );
			
		if($stmt_emp_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Originator'] = $wko_emp_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO_ProjectID----JASON
		$sql= "	SELECT 	prj_mst.prj_mst_prj_cd,     				
						prj_mst.prj_mst_desc,
						prj_mst.prj_mst_approved
				FROM	prj_mst
				WHERE 	prj_mst.site_cd = '".$site_cd."'
				AND 	prj_mst.prj_mst_disable_flag = '0' "; 
				
		$stmt_prj_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_prj_mst ) {
			 $error_message = "Error selecting table (prj_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$prj_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_prj_mst, SQLSRV_FETCH_ASSOC)) {		
				$prj_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_prj_mst) );
			
		if($stmt_prj_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_ProjectID'] = $prj_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Delay Code----JASON
		$sql= "	SELECT 	wrk_dcd.wrk_dcd_delay_cd,     				
						wrk_dcd.wrk_dcd_desc
				FROM	wrk_dcd
				WHERE 	wrk_dcd.site_cd = '".$site_cd."'"; 
				
		$stmt_wrk_dcd = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_dcd ) {
			 $error_message = "Error selecting table (wrk_dcd)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wrk_dcd = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_dcd, SQLSRV_FETCH_ASSOC)) {		
				$wrk_dcd[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_dcd) );
			
		if($stmt_wrk_dcd) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Delay_Code'] = $wrk_dcd;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Work Type----JASON
		$sql= "	SELECT 	wrk_typ.wrk_typ_typ_cd,     				
						wrk_typ.wrk_typ_desc,
						wrk_typ_option,
						wrk_typ_pm_option
				FROM	wrk_typ
				WHERE 	wrk_typ.site_cd = '".$site_cd."'
				AND 	wrk_typ.wrk_typ_disable_flag ='0'"; 
				
		$stmt_wrk_typ = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_typ ) {
			 $error_message = "Error selecting table (wrk_typ)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wrk_typ = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_typ, SQLSRV_FETCH_ASSOC)) {		
				$wrk_typ[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_typ) );
			
		if($stmt_wrk_typ) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Work_Type'] = $wrk_typ;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Work Class----JASON
		$sql= "	SELECT 	wrk_cls.wrk_cls_cls_cd,     				
						wrk_cls.wrk_cls_desc
				FROM	wrk_cls
				WHERE 	wrk_cls.site_cd = '".$site_cd."'
				AND 	wrk_cls.wrk_cls_disable_flag ='0'"; 
				
		$stmt_wrk_cls = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_cls ) {
			 $error_message = "Error selecting table (wrk_cls)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wrk_cls = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_cls, SQLSRV_FETCH_ASSOC)) {		
				$wrk_cls[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_cls) );
			
		if($stmt_wrk_cls) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Work_Class'] = $wrk_cls;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Work Group----JASON
		$sql= "	SELECT 	wrk_grp.wrk_grp_grp_cd,     				
						wrk_grp.wrk_grp_desc
				FROM	wrk_grp
				WHERE 	 (wrk_grp_disable_flag = '0'  ) 
				AND		wrk_grp.site_cd = '".$site_cd."'
				AND 	wrk_grp.wrk_grp_disable_flag ='0'"; 
				
		$stmt_wrk_grp = sqlsrv_query( $conn, $sql);

		if( !$stmt_wrk_grp ) {
			 $error_message = "Error selecting table (wko_wrk_grp)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wko_wrk_grp = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_wrk_grp, SQLSRV_FETCH_ASSOC)) {		
				$wko_wrk_grp[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_wrk_grp) );
			
		if($stmt_wrk_grp) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Work_Group'] = $wko_wrk_grp;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Planner----JASON
		$sql= "	SELECT 	emp_mst.emp_mst_empl_id,     				
						emp_mst.emp_mst_name,
						emp_mst.emp_mst_title
				FROM	emp_mst,
						emp_det,
						emp_sts
				WHERE(	emp_mst.site_cd = emp_det.site_cd  
				AND		emp_mst.RowID = emp_det.mst_rowid  
				AND	 	emp_mst.site_cd = emp_sts.site_cd  
				AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
				AND		emp_sts.emp_sts_typ_cd = 'ACTIVE') 
				AND		emp_mst.site_cd = '".$site_cd."'
				AND 	emp_det_planner = '1' "; 
				
		$stmt_emp_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_emp_mst ) {
			 $error_message = "Error selecting table (wko_planner_emp_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wko_planner_emp_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
				$wko_planner_emp_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_emp_mst) );
			
		if($stmt_emp_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Planner'] = $wko_planner_emp_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Approver----JASON
		$sql= "	SELECT 	emp_mst.emp_mst_empl_id,     				
						emp_mst.emp_mst_name,
						emp_mst.emp_mst_title
				FROM	emp_mst,
						emp_det,
						emp_sts
				WHERE(	emp_mst.site_cd = emp_det.site_cd  
				AND		emp_mst.RowID = emp_det.mst_rowid  
				AND	 	emp_mst.site_cd = emp_sts.site_cd  
				AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
				AND		emp_sts.emp_sts_typ_cd = 'ACTIVE') 
				AND		emp_mst.site_cd = '".$site_cd."'"; 
				
		$stmt_emp_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_emp_mst ) {
			 $error_message = "Error selecting table (wko_approver_emp_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wko_approver_emp_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
				$wko_approver_emp_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_emp_mst) );
			
		if($stmt_emp_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Approver'] = $wko_approver_emp_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO AssignTO----JASON
		$sql= "	SELECT  	emp_mst.emp_mst_empl_id,		
							emp_mst.emp_mst_name,		
							emp_det.emp_det_work_grp,		
							emp_det.emp_det_ira_idno,  			
					TotalWO = ( 	SELECT 		COUNT(wko_mst_wo_no)  								
				FROM		wko_mst (NOLOCK),		
							wko_det (NOLOCK),		
							wrk_sts (NOLOCK)  								
				WHERE		wko_mst.site_cd = wko_det.site_cd  								
				AND			wko_mst.RowID = wko_det.mst_RowID  								
				AND			wko_mst.site_cd = wrk_sts.site_cd  								
				AND			wko_mst.wko_mst_status = wrk_sts.wrk_sts_status  								
				AND			wrk_sts.wrk_sts_typ_cd 
				NOT IN ('CANCEL', 'FORCE-CLOSE', 'CLOSE')  								
				AND			wko_det.wko_det_assign_to = emp_mst.emp_mst_empl_id )    
				FROM 	emp_mst (NOLOCK),  			
						emp_det (NOLOCK),  			
						emp_sts (NOLOCK)  
				WHERE (	emp_mst.site_cd = emp_det.site_cd 
				AND		emp_mst.RowID = emp_det.mst_RowID  
				AND		emp_mst.site_cd = emp_sts.site_cd  
				AND		emp_mst.emp_mst_status = emp_sts.emp_sts_status  
				AND		emp_sts.emp_sts_typ_cd = 'ACTIVE'  
				AND		emp_det.emp_det_foreman = '1') 
				AND		emp_mst.site_cd = '".$site_cd."' 
				AND		emp_det_foreman = '1' 
				AND ( emp_det.emp_det_work_grp = 'MAINTENANCE' OR emp_det.emp_det_ira_idno = 'MAINTENANCE')  "; 
				
		$stmt_emp_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_emp_mst ) {
			 $error_message = "Error selecting table (wko_assignto_emp_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$wko_assignto_emp_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_emp_mst, SQLSRV_FETCH_ASSOC)) {		
				$wko_assignto_emp_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_emp_mst) );
			
		if($stmt_emp_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_AssignTO'] = $wko_assignto_emp_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//WKO Labor Account----JASON
		$sql= "	SELECT 	cf_account.account,     				
						cf_account.descs
				FROM	cf_account
				WHERE	cf_account.site_cd = '".$site_cd."'
				AND 	disable_flag = '0' "; 
				
		$stmt_cf_account = sqlsrv_query( $conn, $sql);

		if( !$stmt_cf_account ) {
			 $error_message = "Error selecting table (cf_account)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$cf_account = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_cf_account, SQLSRV_FETCH_ASSOC)) {		
				$cf_account[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_cf_account) );
			
		if($stmt_cf_account) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['WKO_Labor_Account'] = $cf_account;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Commodity Code----JASON
		$sql= "	SELECT	com_mst.com_mst_com_code,              
						com_mst.com_mst_desc        
				FROM	com_mst     
				WHERE	(com_mst_disable_flag = '0'  ) 
				AND		com_mst.site_cd = '".$site_cd."' "; 
				
		$stmt_com_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_com_mst ) {
			 $error_message = "Error selecting table (com_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$com_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_com_mst, SQLSRV_FETCH_ASSOC)) {		
				$com_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_com_mst) );
			
		if($stmt_com_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Commodity_Code'] = $com_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Stock Group----JASON
		$sql= "	SELECT 	itm_grp.itm_grp_cd,     			
						itm_grp.itm_grp_desc    
				FROM 	itm_grp     
				WHERE (	itm_grp_disable_flag = '0'  ) 
				AND		itm_grp.site_cd = '".$site_cd."' 
				AND		itm_grp_disable_flag = '0' "; 
				
		$stmt_itm_grp = sqlsrv_query( $conn, $sql);

		if( !$stmt_itm_grp ) {
			 $error_message = "Error selecting table (itm_grp)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$itm_grp = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_itm_grp, SQLSRV_FETCH_ASSOC)) {		
				$itm_grp[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_itm_grp) );
			
		if($stmt_itm_grp) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Stock_Group'] = $itm_grp;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Master Location----JASON
		$sql= "	SELECT 	loc_mst.loc_mst_stk_loc,     			
						loc_mst.loc_mst_desc,  			
						loc_mst.loc_mst_mst_loc_cd,     			
						loc_mst.loc_mst_area_loc_cd,     			
						loc_mst.loc_mst_bin_id  
				FROM 	loc_mst (NOLOCK)  
				WHERE (loc_mst.loc_mst_disable_flag = '0') 
				AND		loc_mst.site_cd = '".$site_cd."' 
				AND		loc_mst_storage_type <> 'CONSIGNMENT' "; 
				
		$stmt_loc_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_loc_mst ) {
			 $error_message = "Error selecting table (loc_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$loc_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_loc_mst, SQLSRV_FETCH_ASSOC)) {		
				$loc_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_loc_mst) );
			
		if($stmt_loc_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Master_Location'] = $loc_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Order Rule----JASON
		$sql= "	SELECT	odr_mst.odr_mst_odr,              
						odr_mst.odr_mst_desc        
				FROM	odr_mst     
				WHERE (odr_mst_disable_flag = '0') 
				AND		odr_mst.site_cd = '".$site_cd."' "; 
				
		$stmt_odr_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_odr_mst ) {
			 $error_message = "Error selecting table (odr_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$odr_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_odr_mst, SQLSRV_FETCH_ASSOC)) {		
				$odr_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_odr_mst) );
			
		if($stmt_odr_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Order_Rule'] = $odr_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Part Deac Status----JASON
		$sql= "	SELECT	itm_sts.itm_sts_status,     		
						itm_sts.itm_sts_typ_cd,                       
						itm_sts.itm_sts_desc        
				FROM	itm_sts     
				WHERE (itm_sts_disable_flag = '0') 
				AND		itm_sts.site_cd = '".$site_cd."' "; 
				
		$stmt_itm_sts = sqlsrv_query( $conn, $sql);

		if( !$stmt_itm_sts ) {
			 $error_message = "Error selecting table (itm_sts)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$itm_sts = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_itm_sts, SQLSRV_FETCH_ASSOC)) {		
				$itm_sts[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_itm_sts) );
			
		if($stmt_itm_sts) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Part_Deac_Status'] = $itm_sts;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Issue UOM----JASON
		$sql= "	SELECT	uom_mst.uom_mst_uom,              
						uom_mst.uom_mst_desc        
				FROM	uom_mst      
				WHERE	uom_mst.site_cd = '".$site_cd."' 
				AND		uom_mst_type = 'MATERIAL' 
				AND		uom_mst_disable_flag = '0' "; 
				
		$stmt_uom_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_uom_mst ) {
			 $error_message = "Error selecting table (uom_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$uom_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_uom_mst, SQLSRV_FETCH_ASSOC)) {		
				$uom_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_uom_mst) );
			
		if($stmt_uom_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Issue_UOM'] = $uom_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Storage Type----JASON
		$sql= "	SELECT	stt_mst.stt_mst_stt,              
						stt_mst.stt_mst_desc        
				FROM	stt_mst     
				WHERE (stt_mst_disable_flag = '0'  ) 
				AND		stt_mst.site_cd = '".$site_cd."' "; 
				
		$stmt_stt_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_stt_mst ) {
			 $error_message = "Error selecting table (stt_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$stt_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_stt_mst, SQLSRV_FETCH_ASSOC)) {		
				$stt_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_stt_mst) );
			
		if($stmt_stt_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Storage_Type'] = $stt_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM Tax Code----JASON
		$sql= "	SELECT 	tax_mst.tax_mst_tax_cd,     			
						tax_mst.tax_mst_desc,     			
						tax_mst.tax_mst_tax_rate  
				FROM 	tax_mst     
				WHERE (	tax_mst.tax_mst_disable_flag = '0') 
				AND		tax_mst.site_cd = '".$site_cd."' 
				AND		tax_mst_type 
				IN		('A', 'P') 
				AND		tax_mst_disable_flag = '0' "; 
				
		$stmt_tax_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_tax_mst ) {
			 $error_message = "Error selecting table (tax_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$tax_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_tax_mst, SQLSRV_FETCH_ASSOC)) {		
				$tax_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_tax_mst) );
			
		if($stmt_tax_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Tax_Code'] = $tax_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//Default MR Status----JASON
		$sql= "	SELECT 	mtr_sts.mtr_sts_status,             		
						mtr_sts.mtr_sts_status_type,     			
						mtr_sts.mtr_sts_description,  			
						mtr_sts.mtr_sts_email_flag  
				FROM 	mtr_sts  
				WHERE (mtr_sts.mtr_sts_disable_flag = 0  ) 
				AND 	mtr_sts.site_cd = '".$site_cd."' "; 
				
		$stmt_mtr_sts = sqlsrv_query( $conn, $sql);

		if( !$stmt_mtr_sts ) {
			 $error_message = "Error selecting table (mtr_sts)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$mtr_sts = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_mtr_sts, SQLSRV_FETCH_ASSOC)) {		
				$mtr_sts[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_mtr_sts) );
			
		if($stmt_mtr_sts) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Default_MR_Status'] = $mtr_sts;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//Default PR Status----JASON
			$sql= "	SELECT 	pur_sts.pur_sts_status,     			
							pur_sts.pur_sts_status_type,     			
							pur_sts.pur_sts_description,  			
							pur_sts.pur_sts_email_flag  
					FROM 	pur_sts     
					WHERE (	pur_sts.pur_sts_disable_flag = 0  ) 
					AND 	pur_sts.site_cd = '".$site_cd."' "; 
				
		$stmt_pur_sts = sqlsrv_query( $conn, $sql);

		if( !$stmt_pur_sts ) {
			 $error_message = "Error selecting table (pur_sts)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$pur_sts = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_pur_sts, SQLSRV_FETCH_ASSOC)) {		
				$pur_sts[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_pur_sts) );
			
		if($stmt_pur_sts) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Default_PR_Status'] = $pur_sts;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//Default PO Status----JASON
			$sql= "	SELECT 	puo_sts.puo_sts_status,            		
							puo_sts.puo_sts_status_type,             		
							puo_sts.puo_sts_description,  			
							puo_sts.puo_sts_email_flag  
					FROM 	puo_sts    
					WHERE (	puo_sts.puo_sts_disable_flag = '0'      ) 
					AND 	puo_sts.site_cd = '".$site_cd."' 
					AND 	puo_sts_status_type NOT IN ('CLOSE', 'CANCEL' ) "; 
				
		$stmt_puo_sts = sqlsrv_query( $conn, $sql);

		if( !$stmt_puo_sts ) {
			 $error_message = "Error selecting table (puo_sts)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$puo_sts = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_puo_sts, SQLSRV_FETCH_ASSOC)) {		
				$puo_sts[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_puo_sts) );
			
		if($stmt_puo_sts) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Default_PR_Status'] = $puo_sts;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//Default PO Currency Code----JASON
			$sql= "	SELECT 	cur_mst.cur_mst_cur_code,     			
							cur_mst.cur_mst_desc,     			
							cur_mst.cur_mst_base_cur,  			
							cur_mst.cur_mst_exchange_rate  
					FROM 	cur_mst    
					WHERE 	cur_mst.site_cd = '".$site_cd."' "; 
				
		$stmt_cur_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_cur_mst ) {
			 $error_message = "Error selecting table (cur_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$cur_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_cur_mst, SQLSRV_FETCH_ASSOC)) {		
				$cur_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_cur_mst) );
			
		if($stmt_cur_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['Default_PO_Currency_Code'] = $cur_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
		//ITM Manufacturer----JASON
			$sql= "	SELECT	mfg_mst.mfg_mst_mfg_cd,              	
							mfg_mst.mfg_mst_company  
					FROM 	mfg_mst 
					WHERE 	mfg_mst.site_cd = '".$site_cd."' "; 
				
		$stmt_mfg_mst = sqlsrv_query( $conn, $sql);

		if( !$stmt_mfg_mst ) {
			 $error_message = "Error selecting table (mfg_mst)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$mfg_mst = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_mfg_mst, SQLSRV_FETCH_ASSOC)) {		
				$mfg_mst[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_mfg_mst) );
			
		if($stmt_mfg_mst) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_Manufacturer'] = $mfg_mst;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
	//ITM StockLocation----JASON
			$sql= "	SELECT 	DISTINCT   			itm_loc.itm_loc_stk_loc,     			
												itm_loc_oh_qty,  			
						Ava_Qty = 	CASE WHEN ( itm_loc.itm_loc_oh_qty - itm_loc_hard_resrv ) >= 0   							
						THEN ( 					itm_loc.itm_loc_oh_qty - itm_loc_hard_resrv )   							
						ELSE 0 END  
						FROM 					itm_loc,  			
												itm_mst  
						WHERE (					itm_mst.site_cd = itm_loc.site_cd  
						AND 					itm_mst.RowID = itm_loc.mst_RowID  
						AND						itm_loc_inc_ttloh = '1'  
						AND						itm_loc_lockout4count = '0') 
						AND 					itm_mst.site_cd = '".$site_cd."' 
						AND 					itm_mst.itm_mst_stockno = '' "; 
				
		$stmt_itm_loc = sqlsrv_query( $conn, $sql);

		if( !$stmt_itm_loc ) {
			 $error_message = "Error selecting table (itm_loc)";
			 returnError($error_message);
			 die( print_r( sqlsrv_errors(), true));
			 
		}

		$itm_loc = array();

		do {
			 while ($row = sqlsrv_fetch_array($stmt_itm_loc, SQLSRV_FETCH_ASSOC)) {		
				$itm_loc[] = $row;	
			
			 }
		} while ( sqlsrv_next_result($stmt_itm_loc) );
			
		if($stmt_itm_loc) {
			 sqlsrv_commit( $conn );
			 sqlsrv_close( $conn);	
			 
			 $json_All['ITM_StockLocation'] = $itm_loc;
			 returnData($json_All);	
			 
		} else {
			
			 sqlsrv_rollback( $conn );
			 $error_message = "Transaction rolled back.<br />";
			 returnError($error_message);
		}
				
	break;
	
		
}



function returnData($json_return){
	//echo $json;
	$returnData = array(												
	'status' => 'SUCCESS',
	'message' => 'Successfully',
	'data'=>$json_return);
	
	echo json_encode($returnData);
}

function returnError($error_message){
	$json = array();
	
	$returnData = array(
	'status' => 'ERROR',
	'message' => $error_message,
	'data' => $json);
	
	echo json_encode($returnData);
		
}
	

 
?>