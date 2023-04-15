import React,{useState,useEffect} from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import APIServices from "../../services/APIServices";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import  {useLocation}  from 'react-router-dom';
import moment from 'moment';
import '../../style.css';


const System_Default_Setting = (props) => {

    const location = useLocation();

    const [Button_save, setButton_save] = useState("");

    const [RowID, setRowID] = useState("");

    const [columns, setcolumns] = useState([]);
    const [data, setdata] = useState([]);

    const [DefaultLaborAccount, setDefaultLaborAccount] = useState([]);
    const [selected_DefaultLaborAccount, setSelected_DefaultLaborAccount] = useState([]);

    const [DefaultMRStatus, setDefaultMRStatus] = useState([]);
    const [selected_DefaultMRStatus, setSelected_DefaultMRStatus] = useState([]);

    const [DefaultMaterialAccount, setDefaultMaterialAccount] = useState([]);
    const [selected_DefaultMaterialAccount, setSelected_DefaultMaterialAccount] = useState([]);

    const [DefaultPRStatus, setDefaultPRStatus] = useState([]);
    const [selected_DefaultPRStatus, setSelected_DefaultPRStatus] = useState([]);

    const [DefaultContractAccount, setDefaultContractAccount] = useState([]);
    const [selected_DefaultContractAccount, setSelected_DefaultContractAccount] = useState([]);

    const [DefaultPOStatus, setDefaultPOStatus] = useState([]);
    const [selected_DefaultPOStatus, setSelected_DefaultPOStatus] = useState([]);

    const [DefaultWRWorkPriority, setDefaultWRWorkPriority] = useState([]);
    const [selected_DefaultWRWorkPriority, setSelected_DefaultWRWorkPriority] = useState([]);

    const [DefaultWRAssetNo, setDefaultWRAssetNo] = useState([]);
    const [selected_DefaultWRAssetNo, setSelected_DefaultWRAssetNo] = useState([]);

    const [DefaultWOWorkPriority, setDefaultWOWorkPriority] = useState([]);
    const [selected_DefaultWOWorkPriority, setSelected_DefaultWOWorkPriority] = useState([]);

    const [DefaultWROriginator, setDefaultWROriginator] = useState([]);
    const [selected_DefaultWROriginator, setSelected_DefaultWROriginator] = useState([]);

    const [DefaultPMWorkPriority, setDefaultPMWorkPriority] = useState([]);
    const [selected_DefaultPMWorkPriority, setSelected_DefaultPMWorkPriority] = useState([]);

    const [DefaultWOAssetNo, setDefaultWOAssetNo] = useState([]);
    const [selected_DefaultWOAssetNo, setSelected_DefaultWOAssetNo] = useState([]);

    const [DefaultAssetStatus, setDefaultAssetStatus] = useState([]);
    const [selected_DefaultAssetStatus, setSelected_DefaultAssetStatus] = useState([]);

    const [DefaultPRApprovalType, setDefaultPRApprovalType] = useState([{label:"ROUTE",value:""},{label:"LIMIT",value:""}]);
    const [selected_DefaultPRApprovalType, setSelected_DefaultPRApprovalType] = useState([]);

    const [DefaultWOWorkStatus, setDefaultWOWorkStatus] = useState([]);
    const [selected_DefaultWOWorkStatus, setSelected_DefaultWOWorkStatus] = useState([]);

    const [DefaultMRApprovalType, setDefaultMRApprovalType] = useState([{label:"ROUTE",value:""},{label:"LIMIT",value:""}]);
    const [selected_DefaultMRApprovalType, setSelected_DefaultMRApprovalType] = useState([]);

    const [TimeCardEntryBy, setTimeCardEntryBy] = useState([{label:"All",value:""},{label:"User Group",value:""},{label:"Individual",value:""}]);
    const [selected_TimeCardEntryBy, setSelected_TimeCardEntryBy] = useState([]);

    const [DefaultPOCurrencyCode, setDefaultPOCurrencyCode] = useState([]);
    const [selected_DefaultPOCurrencyCode, setSelected_DefaultPOCurrencyCode] = useState([]);

    const [WOGracePeriod, setWOGracePeriod] = useState("");

    const [DashboardRefreshInterval, setDashboardRefreshInterval] = useState("");

    const [EOQCarryCostRate, setEOQCarryCostRate] = useState("");

    const [PMLeadDay, setPMLeadDay] = useState("");

    const [EOQPOProcessCost, setEOQPOProcessCost] = useState("");

    const [ShowDashboard, setShowDashboard] = useState(false);
    const [CheckBox_ShowDashboard, setCheckBox_ShowDashboard] = useState('0');

    const [AssetSelectionByLocation, setAssetSelectionByLocation] = useState(false);
    const [CheckBox_AssetSelectionByLocation, setCheckBox_AssetSelectionByLocation] = useState('0');

    const [MaterialReserved, setMaterialReserved] = useState(false);
    const [CheckBox_MaterialReserved, setCheckBox_MaterialReserved] = useState('0');

    const [PrintTransactionDocument, setPrintTransactionDocument] = useState(false);
    const [CheckBox_PrintTransactionDocument, setCheckBox_PrintTransactionDocument] = useState('0');

    const [MREmailNotification, setMREmailNotification] = useState(false);
    const [CheckBox_MREmailNotification, setCheckBox_MREmailNotification] = useState('0');

    const [MRApprovalRequired, setMRApprovalRequired] = useState(false);
    const [CheckBox_MRApprovalRequired, setCheckBox_MRApprovalRequired] = useState('0');

    const [DefaultMRReleaseForApproval, setDefaultMRReleaseForApproval] = useState(false);
    const [CheckBox_DefaultMRReleaseForApproval, setCheckBox_DefaultMRReleaseForApproval] = useState('0');

    const [MRApprovalClosedLoop, setMRApprovalClosedLoop] = useState(false);
    const [CheckBox_MRApprovalClosedLoop, setCheckBox_MRApprovalClosedLoop] = useState('0');

    const [EmailMRApprover, setEmailMRApprover] = useState(false);
    const [CheckBox_EmailMRApprover, setCheckBox_EmailMRApprover] = useState('0');

    const [AutoMRApprovalEmail, setAutoMRApprovalEmail] = useState(false);
    const [CheckBox_AutoMRApprovalEmail, setCheckBox_AutoMRApprovalEmail] = useState('0');

    const [EmailRequestedByMRApproved, setEmailRequestedByMRApproved] = useState(false);
    const [CheckBox_EmailRequestedByMRApproved, setCheckBox_EmailRequestedByMRApproved] = useState('0');

    const [WREmailNotification, setWREmailNotification] = useState(false);
    const [CheckBox_WREmailNotification, setCheckBox_WREmailNotification] = useState('0');

    const [DefaultWOCCtoPlanning, setDefaultWOCCtoPlanning] = useState(false);
    const [CheckBox_DefaultWOCCtoPlanning, setCheckBox_DefaultWOCCtoPlanning] = useState('0');

    const [AutoWOPlanfromWR, setAutoWOPlanfromWR] = useState(false);
    const [CheckBox_AutoWOPlanfromWR, setCheckBox_AutoWOPlanfromWR] = useState('0');

    const [GenerateWOInvoice, setGenerateWOInvoice] = useState(false);
    const [CheckBox_GenerateWOInvoice, setCheckBox_GenerateWOInvoice] = useState('0');

    const [TemporaryAssetFlag, setTemporaryAssetFlag] = useState(false);
    const [CheckBox_TemporaryAssetFlag, setCheckBox_TemporaryAssetFlag] = useState('0');

    const [PMClosedLoop, setPMClosedLoop] = useState(false);
    const [CheckBox_PMClosedLoop, setCheckBox_PMClosedLoop] = useState('0');

    const [PMScheduleDate, setPMScheduleDate] = useState(false);
    const [CheckBox_PMScheduleDate, setCheckBox_PMScheduleDate] = useState('0');

    const [DefaultPRReleaseforApproval, setDefaultPRReleaseforApproval] = useState(false);
    const [CheckBox_DefaultPRReleaseforApproval, setCheckBox_DefaultPRReleaseforApproval] = useState('0');

    const [PRApprovalClosedLoop, setPRApprovalClosedLoop] = useState(false);
    const [CheckBox_PRApprovalClosedLoop, setCheckBox_PRApprovalClosedLoop] = useState('0');

    const [EmailPRApprover, setEmailPRApprover] = useState(false);
    const [CheckBox_EmailPRApprover, setCheckBox_EmailPRApprover] = useState('0');

    const [AutoPRApprovalEmail, setAutoPRApprovalEmail] = useState(false);
    const [CheckBox_AutoPRApprovalEmail, setCheckBox_AutoPRApprovalEmail] = useState('0');

    const [EmailRequestedByPRApproved, setEmailRequestedByPRApproved] = useState(false);
    const [CheckBox_EmailRequestedByPRApproved, setCheckBox_EmailRequestedByPRApproved] = useState('0');
    
    const [OrderPointAutoGeneratePR, setOrderPointAutoGeneratePR] = useState(false);
    const [CheckBox_OrderPointAutoGeneratePR, setCheckBox_OrderPointAutoGeneratePR] = useState('0');

    const [AutoGeneratePO, setAutoGeneratePO] = useState(false);
    const [CheckBox_AutoGeneratePO, setCheckBox_AutoGeneratePO] = useState('0');

    const [AutoClosePO, setAutoClosePO] = useState(false);
    const [CheckBox_AutoClosePO, setCheckBox_AutoClosePO] = useState('0');


    const get_systemdefaultsetting_status = (site_ID, type) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)



                let DefaultLaborAccount = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs,
                    value: item.account            
                    }));
                    setDefaultLaborAccount(DefaultLaborAccount);

                let DefaultMRStatus = responseJson.data.data.Default_MR_Status.map(item => ({
                    label: item.mtr_sts_status +" : "+ item.mtr_sts_description,
                    value: item.mtr_sts_status            
                    }));
                    setDefaultMRStatus(DefaultMRStatus);

                let DefaultMaterialAccount = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs,
                    value: item.account            
                    }));
                    setDefaultMaterialAccount(DefaultMaterialAccount);

                let DefaultPRStatus = responseJson.data.data.Default_PR_Status.map(item => ({
                    label: item.pur_sts_status +" : "+ item.pur_sts_description,
                    value: item.pur_sts_status            
                    }));
                    setDefaultPRStatus(DefaultPRStatus);
                    
                let DefaultContractAccount = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs,
                    value: item.account            
                    }));
                    setDefaultContractAccount(DefaultContractAccount);

                let DefaultPOStatus = responseJson.data.data.Default_PO_Status.map(item => ({
                    label: item.puo_sts_status +" : "+ item.puo_sts_description,
                    value: item.puo_sts_status            
                    }));
                    setDefaultPOStatus(DefaultPOStatus);
 
                let DefaultWRWorkPriority = responseJson.data.data.WKO_Original_Periority.map(item => ({
                    label: item.wrk_pri_pri_cd +" : "+ item.wrk_pri_desc,
                    value: item.wrk_pri_desc            
                    }));
                    setDefaultWRWorkPriority(DefaultWRWorkPriority);

                let DefaultWRAssetNo= responseJson.data.data.WKO_Asset_No.map(item => ({
                    label: item.ast_mst_asset_no +" : "+ item.ast_mst_cost_center,
                    value: item.ast_mst_asset_no            
                    }));
                    setDefaultWRAssetNo(DefaultWRAssetNo);

                let DefaultWOWorkPriority = responseJson.data.data.WKO_Original_Periority.map(item => ({
                    label: item.wrk_pri_pri_cd +" : "+ item.wrk_pri_desc,
                    value: item.wrk_pri_desc            
                    }));
                    setDefaultWOWorkPriority(DefaultWOWorkPriority);

                let DefaultWROriginator = responseJson.data.data.WKO_Originator.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name,
                    value: item.emp_mst_empl_id            
                    }));
                    setDefaultWROriginator(DefaultWROriginator);

                let DefaultPMWorkPriority = responseJson.data.data.WKO_Original_Periority.map(item => ({
                    label: item.wrk_pri_pri_cd +" : "+ item.wrk_pri_desc,
                    value: item.wrk_pri_desc            
                    }));
                    setDefaultPMWorkPriority(DefaultPMWorkPriority);

                let DefaultWOAssetNo = responseJson.data.data.WKO_Asset_No.map(item => ({
                    label: item.ast_mst_asset_no +" : "+ item.ast_mst_cost_center,
                    value: item.ast_mst_asset_no            
                    }));
                    setDefaultWOAssetNo(DefaultWOAssetNo);

                let DefaultAssetStatus = responseJson.data.data.AssetStatus.map(item => ({
                    label: item.ast_sts_status +" : "+ item.ast_sts_desc,
                    value: item.ast_sts_status            
                    }));
                    setDefaultAssetStatus(DefaultAssetStatus);

                let DefaultWOWorkStatus = responseJson.data.data.WorkorderStatus.map(item => ({
                    label: item.wrk_sts_status +" : "+ item.wrk_sts_desc,
                    value: item.wrk_sts_status            
                    }));
                    setDefaultWOWorkStatus(DefaultWOWorkStatus);

                let DefaultPOCurrencyCode = responseJson.data.data.Default_PO_Currency_Code.map(item => ({
                    label: item.cur_mst_cur_code +" : "+ item.cur_mst_desc,
                    value: item.cur_mst_cur_code            
                    }));
                    setDefaultPOCurrencyCode(DefaultPOCurrencyCode);


                    get_systemdefaultsetting_select(site_ID);                 
                    Swal.close();
                
            }else{
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: responseJson.data.message,
                    
                  })
            }

        }).catch((e) => {
            Swal.close();
           
            Swal.fire({
              icon: 'error',
              title: 'Oops get_sitecode...',
              text: e,          
            })
          });
    }


    const get_systemdefaultsetting_select = (site_ID) => {

      
        console.log('SELECT ROWID: '+ location.state.RowID)

        APIServices.get_systemdefaultsetting_select(site_ID).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT SDS: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )


                
                setSelected_DefaultLaborAccount( {label:responseJson.data.data[index].dft_mst_lab_act} )
                setSelected_DefaultMRStatus( {label:responseJson.data.data[index].dft_mst_mtr_sts} )
                setSelected_DefaultMaterialAccount( {label:responseJson.data.data[index].dft_mst_mat_act} )
                setSelected_DefaultPRStatus( {label:responseJson.data.data[index].dft_mst_pur_sts} )
                setSelected_DefaultContractAccount( {label:responseJson.data.data[index].dft_mst_con_act} )

                setSelected_DefaultPOStatus( {label:responseJson.data.data[index].dft_mst_puo_sts} )
                setSelected_DefaultWRWorkPriority( {label:responseJson.data.data[index].dft_mst_wkr_pri} )
                setSelected_DefaultWRAssetNo( {label:responseJson.data.data[index].dft_mst_wkr_asset_no} )
                setSelected_DefaultWOWorkPriority( {label:responseJson.data.data[index].dft_mst_wko_pri} )
                setSelected_DefaultWROriginator( {label:responseJson.data.data[index].dft_mst_wkr_originator} )

                setSelected_DefaultPMWorkPriority( {label:responseJson.data.data[index].dft_mst_prm_pri} )
                setSelected_DefaultWOAssetNo( {label:responseJson.data.data[index].dft_mst_wko_asset_no} )
                setSelected_DefaultAssetStatus( {label:responseJson.data.data[index].dft_mst_ast_sts} )
                setSelected_DefaultPRApprovalType( {label:responseJson.data.data[index].dft_mst_pur_approval} )
                setSelected_DefaultWOWorkStatus( {label:responseJson.data.data[index].dft_mst_wko_sts} )

                setSelected_DefaultMRApprovalType( {label:responseJson.data.data[index].dft_mst_mtr_approval_type} )
                setSelected_TimeCardEntryBy( {label:responseJson.data.data[index].dft_mst_time_card_by} )
                setSelected_DefaultPOCurrencyCode( {label:responseJson.data.data[index].dft_mst_po_curr_code} )

                setWOGracePeriod( responseJson.data.data[index].dft_mst_grace_period )
                setDashboardRefreshInterval( responseJson.data.data[index].dft_mst_dsh_refresh )
                setEOQCarryCostRate( responseJson.data.data[index].dft_mst_eoq_carry_cost_rate )
                setPMLeadDay( responseJson.data.data[index].dft_mst_prm_led )
                setEOQPOProcessCost( responseJson.data.data[index].dft_mst_eoq_po_process_cost )


                setShowDashboard( responseJson.data.data[index].dft_mst_show_dashboard )
                setAssetSelectionByLocation( responseJson.data.data[index].dft_mst_asset_selection )
                setMaterialReserved( responseJson.data.data[index].dft_mst_itm_resv )
                setPrintTransactionDocument( responseJson.data.data[index].dft_mst_print_trx )

                setMREmailNotification( responseJson.data.data[index].dft_mst_mtr_email )
                setMRApprovalRequired( responseJson.data.data[index].dft_mst_mr_approval )
                setDefaultMRReleaseForApproval( responseJson.data.data[index].dft_mst_mr_release_for_app )
                setMRApprovalClosedLoop( responseJson.data.data[index].dft_mst_mtr_closed_loop )
                setEmailMRApprover( responseJson.data.data[index].dft_mst_mtr_email_approver )
                setAutoMRApprovalEmail( responseJson.data.data[index].dft_mst_mtr_approval_auto_send )
                setEmailRequestedByMRApproved( responseJson.data.data[index].dft_mst_mtr_email_requestor )
                
                setWREmailNotification( responseJson.data.data[index].dft_mst_wkr_email )
                setDefaultWOCCtoPlanning( responseJson.data.data[index].dft_mst_wo_default_cc )
                setAutoWOPlanfromWR( responseJson.data.data[index].dft_mst_wr_auto_plan_wo )
                setGenerateWOInvoice( responseJson.data.data[index].dft_mst_gen_inv )
                setTemporaryAssetFlag( responseJson.data.data[index].dft_mst_temp_ast )
                setPMClosedLoop( responseJson.data.data[index].dft_mst_pm_closed_loop )
                setPMScheduleDate( responseJson.data.data[index].dft_mst_pm_schedule_date )

                setDefaultPRReleaseforApproval( responseJson.data.data[index].dft_mst_pr_release_for_app )
                setPRApprovalClosedLoop( responseJson.data.data[index].dft_mst_pur_closed_loop )
                setEmailPRApprover( responseJson.data.data[index].dft_mst_pur_email_approver )
                setAutoPRApprovalEmail( responseJson.data.data[index].dft_mst_pur_approval_auto_send )
                setEmailRequestedByPRApproved( responseJson.data.data[index].dft_mst_pur_email_requestor )
                setOrderPointAutoGeneratePR( responseJson.data.data[index].dft_mst_order_point_pr )
                setAutoGeneratePO( responseJson.data.data[index].dft_mst_generate_po )
                setAutoClosePO( responseJson.data.data[index].dft_mst_po_auto_close )

              }


              Swal.close();

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: responseJson.data,
                    
                  })
            }

        }).catch((e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops get_systemdefaultsetting_select...',
              text: e,          
            })
          });

    }

    

    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        console.log('select site_ID',site_ID);
        
        get_systemdefaultsetting_status(site_ID, "All");       
       

    },[location]);



    const onClickChange = () => {
                        
        if(Button_save ==  "Save"){
            console.log("Create button clicked!");
            Update_SystemDefaultSetting();
        }
    }

    

    const Update_SystemDefaultSetting = () => {

        //Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
        //Swal.showLoading();
    
    
        let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');
    
        let site_ID = localStorage.getItem("site_ID");
        let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
        let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");
        
        let RowID = localStorage.getItem("RowID");
        console.log('get RowID here...',location.state.RowID);
    

    
            //Select Default Labor Account
            let DefaultLaborAccount, setDefaultLaborAccount;
            if(selected_DefaultLaborAccount == '' || selected_DefaultLaborAccount == null){
    
                setDefaultLaborAccount =''
            }else{
    
                DefaultLaborAccount = selected_DefaultLaborAccount.label.split(":")
                setDefaultLaborAccount = DefaultLaborAccount[0];
                console.log("DefaultLaborAccount ", DefaultLaborAccount[0])
            }

            //Select Default MR Status
            let DefaultMRStatus, setDefaultMRStatus;
            if(selected_DefaultMRStatus == '' || selected_DefaultMRStatus == null){
    
                setDefaultMRStatus =''
            }else{
    
                DefaultMRStatus = selected_DefaultMRStatus.label.split(":")
                setDefaultMRStatus = DefaultMRStatus[0];
                console.log("DefaultMRStatus ", DefaultMRStatus[0])
            }

            //Select Default Material Account
            let DefaultMaterialAccount, setDefaultMaterialAccount;
            if(selected_DefaultMaterialAccount == '' || selected_DefaultMaterialAccount == null){
    
                setDefaultMaterialAccount =''
            }else{
    
                DefaultMaterialAccount = selected_DefaultMaterialAccount.label.split(":")
                setDefaultMaterialAccount = DefaultMaterialAccount[0];
                console.log("DefaultMaterialAccount ", DefaultMaterialAccount[0])
            }

            //Select Default PR Status
            let DefaultPRStatus, setDefaultPRStatus;
            if(selected_DefaultPRStatus == '' || selected_DefaultPRStatus == null){
    
                setDefaultPRStatus =''
            }else{
    
                DefaultPRStatus = selected_DefaultPRStatus.label.split(":")
                setDefaultPRStatus = DefaultPRStatus[0];
                console.log("DefaultPRStatus ", DefaultPRStatus[0])
            }

            //Select Default Contract Account
            let DefaultContractAccount, setDefaultContractAccount;
            if(selected_DefaultContractAccount == '' || selected_DefaultContractAccount == null){
    
                setDefaultContractAccount =''
            }else{
    
                DefaultContractAccount = selected_DefaultContractAccount.label.split(":")
                setDefaultContractAccount = DefaultContractAccount[0];
                console.log("DefaultContractAccount ", DefaultContractAccount[0])
            }

            //Select Default PO Status
            let DefaultPOStatus, setDefaultPOStatus;
            if(selected_DefaultPOStatus == '' || selected_DefaultPOStatus == null){
    
                setDefaultPOStatus =''
            }else{
    
                DefaultPOStatus = selected_DefaultPOStatus.label.split(":")
                setDefaultPOStatus = DefaultPOStatus[0];
                console.log("DefaultPOStatus ", DefaultPOStatus[0])
            }

            //Select Default WR Work Priority
            let DefaultWRWorkPriority, setDefaultWRWorkPriority;
            if(selected_DefaultWRWorkPriority == '' || selected_DefaultWRWorkPriority == null){
    
                setDefaultWRWorkPriority =''
            }else{
    
                DefaultWRWorkPriority = selected_DefaultWRWorkPriority.label.split(":")
                setDefaultWRWorkPriority = DefaultWRWorkPriority[0];
                console.log("DefaultWRWorkPriority ", DefaultWRWorkPriority[0])
            }

            //Select Default WR Asset No
            let DefaultWRAssetNo, setDefaultWRAssetNo;
            if(selected_DefaultWRAssetNo == '' || selected_DefaultWRAssetNo == null){
    
                setDefaultWRAssetNo =''
            }else{
    
                DefaultWRAssetNo = selected_DefaultWRAssetNo.label.split(":")
                setDefaultWRAssetNo = DefaultWRAssetNo[0];
                console.log("DefaultWRAssetNo ", DefaultWRAssetNo[0])
            }

            //Select Default WO Work Priority
            let DefaultWOWorkPriority, setDefaultWOWorkPriority;
            if(selected_DefaultWOWorkPriority == '' || selected_DefaultWOWorkPriority == null){
    
                setDefaultWOWorkPriority =''
            }else{
    
                DefaultWOWorkPriority = selected_DefaultWOWorkPriority.label.split(":")
                setDefaultWOWorkPriority = DefaultWOWorkPriority[0];
                console.log("DefaultWOWorkPriority ", DefaultWOWorkPriority[0])
            }

            //Select Default WR Originator
            let DefaultWROriginator, setDefaultWROriginator;
            if(selected_DefaultWROriginator == '' || selected_DefaultWROriginator == null){
    
                setDefaultWROriginator =''
            }else{
    
                DefaultWROriginator = selected_DefaultWROriginator.label.split(":")
                setDefaultWROriginator = DefaultWROriginator[0];
                console.log("DefaultWROriginator ", DefaultWROriginator[0])
            }

            //Select Default PM Work Priority
            let DefaultPMWorkPriority, setDefaultPMWorkPriority;
            if(selected_DefaultPMWorkPriority == '' || selected_DefaultPMWorkPriority == null){
    
                setDefaultPMWorkPriority =''
            }else{
    
                DefaultPMWorkPriority = selected_DefaultPMWorkPriority.label.split(":")
                setDefaultPMWorkPriority = DefaultPMWorkPriority[0];
                console.log("DefaultPMWorkPriority ", DefaultPMWorkPriority[0])
            }

            //Select Default WO Asset No
            let DefaultWOAssetNo, setDefaultWOAssetNo;
            if(selected_DefaultWOAssetNo == '' || selected_DefaultWOAssetNo == null){
    
                setDefaultWOAssetNo =''
            }else{
    
                DefaultWOAssetNo = selected_DefaultWOAssetNo.label.split(":")
                setDefaultWOAssetNo = DefaultWOAssetNo[0];
                console.log("DefaultWOAssetNo ", DefaultWOAssetNo[0])
            }

            //Select Default Asset Status
            let DefaultAssetStatus, setDefaultAssetStatus;
            if(selected_DefaultAssetStatus == '' || selected_DefaultAssetStatus == null){
    
                setDefaultAssetStatus =''
            }else{
    
                DefaultAssetStatus = selected_DefaultAssetStatus.label.split(":")
                setDefaultAssetStatus = DefaultAssetStatus[0];
                console.log("DefaultAssetStatus ", DefaultAssetStatus[0])
            }

            //Select Default PR Approval Type
            let DefaultPRApprovalType, setDefaultPRApprovalType;
            if(selected_DefaultPRApprovalType == '' || selected_DefaultPRApprovalType == null){
    
                setDefaultPRApprovalType =''
            }else{
    
                DefaultPRApprovalType = selected_DefaultPRApprovalType.label.split(":")
                setDefaultPRApprovalType = DefaultPRApprovalType[0];
                console.log("DefaultPRApprovalType ", DefaultPRApprovalType[0])
            }

            //Select Default WO Work Status
            let DefaultWOWorkStatus, setDefaultWOWorkStatus;
            if(selected_DefaultWOWorkStatus == '' || selected_DefaultWOWorkStatus == null){
    
                setDefaultWOWorkStatus =''
            }else{
    
                DefaultWOWorkStatus = selected_DefaultWOWorkStatus.label.split(":")
                setDefaultWOWorkStatus = DefaultWOWorkStatus[0];
                console.log("DefaultWOWorkStatus ", DefaultWOWorkStatus[0])
            }

            //Select Default MR Approval Type
            let DefaultMRApprovalType, setDefaultMRApprovalType;
            if(selected_DefaultMRApprovalType == '' || selected_DefaultMRApprovalType == null){
    
            setDefaultMRApprovalType =''
            }else{
    
            DefaultMRApprovalType = selected_DefaultMRApprovalType.label.split(":")
                setDefaultMRApprovalType = DefaultMRApprovalType[0];
                console.log("DefaultMRApprovalType ", DefaultMRApprovalType[0])
            }

            //Select Time Card Entry By
            let TimeCardEntryBy, setTimeCardEntryBy;
            if(selected_TimeCardEntryBy == '' || selected_TimeCardEntryBy == null){
    
                setTimeCardEntryBy =''
            }else{
    
                TimeCardEntryBy = selected_TimeCardEntryBy.label.split(":")
                setTimeCardEntryBy = TimeCardEntryBy[0];
                console.log("TimeCardEntryBy ", TimeCardEntryBy[0])
            }

            //Select Default PO Currency Code
            let DefaultPOCurrencyCode, setDefaultPOCurrencyCode;
            if(selected_DefaultPOCurrencyCode == '' || selected_DefaultPOCurrencyCode == null){
    
            setDefaultPOCurrencyCode =''
            }else{
    
            DefaultPOCurrencyCode = selected_DefaultPOCurrencyCode.label.split(":")
                setDefaultPOCurrencyCode = DefaultPOCurrencyCode[0];
                console.log("DefaultPOCurrencyCode ", DefaultPOCurrencyCode[0])
            }

            //Select WO Grace Period
            console.log("WOGracePeriod ", WOGracePeriod)
      
            //Select Dashboard Refresh Interval
            console.log("DashboardRefreshInterval ", DashboardRefreshInterval)
      
            //Select EOQ Carry Cost Rate
            console.log("EOQCarryCostRate ", EOQCarryCostRate)

            //Select PM Lead Day
            console.log("PMLeadDay ", PMLeadDay)

            //Select EOQ PO Process Cost
            console.log("EOQPOProcessCost ", EOQPOProcessCost)
       

        var json_workrequest ={
    
    
            "site_cd": site_ID,
          
            "dft_mst_lab_act":setDefaultLaborAccount.trim(),
            "dft_mst_mtr_sts":setDefaultMRStatus.trim(),
            "dft_mst_mat_act":setDefaultMaterialAccount.trim(),
            "dft_mst_pur_sts":setDefaultPRStatus.trim(),
            "dft_mst_con_act":setDefaultContractAccount.trim(),

            "dft_mst_puo_sts":setDefaultPOStatus.trim(),
            "dft_mst_wkr_pri":setDefaultWRWorkPriority.trim(),
            "dft_mst_wkr_asset_no":setDefaultWRAssetNo.trim(),
            "dft_mst_wko_pri":setDefaultWOWorkPriority.trim(),
            "dft_mst_wkr_originator":setDefaultWROriginator.trim(),

            "dft_mst_prm_pri":setDefaultPMWorkPriority.trim(),
            "dft_mst_wko_asset_no":setDefaultWOAssetNo.trim(),
            "dft_mst_ast_sts":setDefaultAssetStatus.trim(),
            "dft_mst_pur_approval":setDefaultPRApprovalType.trim(),
            "dft_mst_wko_sts":setDefaultWOWorkStatus.trim(),

            "dft_mst_mtr_approval_type":setDefaultMRApprovalType.trim(),
            "dft_mst_time_card_by":setTimeCardEntryBy.trim(),
            "dft_mst_po_curr_code":setDefaultPOCurrencyCode.trim(),

            "dft_mst_grace_period": WOGracePeriod.trim(),
            "dft_mst_dsh_refresh": DashboardRefreshInterval.trim(),
            "dft_mst_eoq_carry_cost_rate": EOQCarryCostRate.trim(),
            "dft_mst_prm_led": PMLeadDay.trim(),
            "dft_mst_eoq_po_process_cost": EOQPOProcessCost.trim(),

            // "dft_mst_show_dashboard":setShowDashboard.trim(),
            // "dft_mst_asset_selection":setAssetSelectionByLocation.trim(),
            // "dft_mst_itm_resv":setMaterialReserved.trim(),
            // "dft_mst_print_trx":setPrintTransactionDocument.trim(),

            // "dft_mst_mtr_email":setMREmailNotification.trim(),
            // "dft_mst_mr_approval":setMRApprovalRequired.trim(),
            // "dft_mst_mr_release_for_app":setDefaultMRReleaseForApproval.trim(),
            // "dft_mst_mtr_closed_loop":setMRApprovalClosedLoop.trim(),
            // "dft_mst_mtr_email_approver":setEmailMRApprover.trim(),
            // "dft_mst_mtr_approval_auto_send":setAutoMRApprovalEmail.trim(),
            // "dft_mst_mtr_email_requestor":setEmailRequestedByMRApproved.trim(),

            // "dft_mst_wkr_email":setWREmailNotification.trim(),
            // "dft_mst_wo_default_cc":setDefaultWOCCtoPlanning.trim(),
            // "dft_mst_wr_auto_plan_wo":setAutoWOPlanfromWR.trim(),
            // "dft_mst_gen_inv":setGenerateWOInvoice.trim(),
            // "dft_mst_temp_ast":setTemporaryAssetFlag.trim(),
            // "dft_mst_pm_closed_loop":setPMClosedLoop.trim(),
            // "dft_mst_pm_schedule_date":setPMScheduleDate.trim(),

            // "dft_mst_pr_release_for_app":setDefaultPRReleaseforApproval.trim(),
            // "dft_mst_pur_closed_loop":setPRApprovalClosedLoop.trim(),
            // "dft_mst_pur_email_approver":setEmailPRApprover.trim(),
            // "dft_mst_pur_approval_auto_send":setAutoPRApprovalEmail.trim(),
            // "dft_mst_pur_email_requestor":setEmailRequestedByPRApproved.trim(),
            // "dft_mst_order_point_pr":setOrderPointAutoGeneratePR.trim(),
            // "dft_mst_generate_po":setAutoGeneratePO.trim(),
            // "dft_mst_po_auto_close":setAutoClosePO.trim(),


    
            "audit_user":emp_mst_login_id.trim(),
            "wkr_mst_create_by":emp_mst_login_id.trim(),
            "ast_aud_originator":emp_mst_empl_id.trim(),
            "wkr_mst_create_date":get_date,
            
    
            "RowID":location.state.RowID,
    
            
        }
    
        console.log("Update : "+JSON.stringify(json_workrequest))
    
        APIServices.update_systemdefaultsetting(JSON.stringify(json_workrequest)).then((responseJson)=>{
            if (responseJson.data.status === 'SUCCESS') { 
                Swal.close();
    
                Swal.fire({
                    icon: 'success',
                    title: responseJson.data.status,
                    text: responseJson.data.message,
                    
                  })
    
            }else{
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: responseJson.data,
                    
                  })
    
            }
        }).catch((e) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Oops get_systemdefaultsetting_select...',
              text: e,          
            })
          });
    
      }



    const handleOnChangeShowDashboard = () => {
        setShowDashboard(!ShowDashboard);
        
        if(!ShowDashboard){
            console.log('1')
            setCheckBox_ShowDashboard('1')
        }else{
            console.log('0')
            setCheckBox_ShowDashboard('0')
        }
    }

    const handleOnChangeAssetSelectionByLocation = () => {
        setAssetSelectionByLocation(!AssetSelectionByLocation);
        
        if(!AssetSelectionByLocation){
            console.log('1')
            setCheckBox_AssetSelectionByLocation('1')
        }else{
            console.log('0')
            setCheckBox_AssetSelectionByLocation('0')
        }
    }

    const handleOnChangeMaterialReserved = () => {
        setMaterialReserved(!MaterialReserved);
        
        if(!MaterialReserved){
            console.log('1')
            setCheckBox_MaterialReserved('1')
        }else{
            console.log('0')
            setCheckBox_MaterialReserved('0')
        }
    }

    const handleOnChangePrintTransactionDocument = () => {
        setPrintTransactionDocument(!PrintTransactionDocument);
        
        if(!PrintTransactionDocument){
            console.log('1')
            setCheckBox_PrintTransactionDocument('1')
        }else{
            console.log('0')
            setCheckBox_PrintTransactionDocument('0')
        }
    }

    const handleOnChangeMREmailNotification = () => {
        setMREmailNotification(!MREmailNotification);
        
        if(!MREmailNotification){
            console.log('1')
            setCheckBox_MREmailNotification('1')
        }else{
            console.log('0')
            setCheckBox_MREmailNotification('0')
        }
    }

    const handleOnChangeMRApprovalRequired = () => {
        setMRApprovalRequired(!MRApprovalRequired);
        
        if(!MRApprovalRequired){
            console.log('1')
            setCheckBox_MRApprovalRequired('1')
        }else{
            console.log('0')
            setCheckBox_MRApprovalRequired('0')
        }
    }

    const handleOnChangeDefaultMRReleaseForApproval = () => {
        setDefaultMRReleaseForApproval(!DefaultMRReleaseForApproval);
        
        if(!DefaultMRReleaseForApproval){
            console.log('1')
            setCheckBox_DefaultMRReleaseForApproval('1')
        }else{
            console.log('0')
            setCheckBox_DefaultMRReleaseForApproval('0')
        }
    }

    const handleOnChangeMRApprovalClosedLoop = () => {
        setMRApprovalClosedLoop(!MRApprovalClosedLoop);
        
        if(!MRApprovalClosedLoop){
            console.log('1')
            setCheckBox_MRApprovalClosedLoop('1')
        }else{
            console.log('0')
            setCheckBox_MRApprovalClosedLoop('0')
        }
    }

    const handleOnChangeEmailMRApprover = () => {
        setEmailMRApprover(!EmailMRApprover);
        
        if(!EmailMRApprover){
            console.log('1')
            setCheckBox_EmailMRApprover('1')
        }else{
            console.log('0')
            setCheckBox_EmailMRApprover('0')
        }
    }

    const handleOnChangeAutoMRApprovalEmail = () => {
        setAutoMRApprovalEmail(!AutoMRApprovalEmail);
        
        if(!AutoMRApprovalEmail){
            console.log('1')
            setCheckBox_AutoMRApprovalEmail('1')
        }else{
            console.log('0')
            setCheckBox_AutoMRApprovalEmail('0')
        }
    }

    const handleOnChangeEmailRequestedByMRApproved = () => {
        setEmailRequestedByMRApproved(!EmailRequestedByMRApproved);
        
        if(!EmailRequestedByMRApproved){
            console.log('1')
            setCheckBox_EmailRequestedByMRApproved('1')
        }else{
            console.log('0')
            setCheckBox_EmailRequestedByMRApproved('0')
        }
    }

    const handleOnChangeWREmailNotification = () => {
        setWREmailNotification(!WREmailNotification);
        
        if(!WREmailNotification){
            console.log('1')
            setCheckBox_WREmailNotification('1')
        }else{
            console.log('0')
            setCheckBox_WREmailNotification('0')
        }
    }

    const handleOnChangeDefaultWOCCtoPlanning = () => {
        setDefaultWOCCtoPlanning(!DefaultWOCCtoPlanning);
        
        if(!DefaultWOCCtoPlanning){
            console.log('1')
            setCheckBox_DefaultWOCCtoPlanning('1')
        }else{
            console.log('0')
            setCheckBox_DefaultWOCCtoPlanning('0')
        }
    }

    const handleOnChangeAutoWOPlanfromWR = () => {
        setAutoWOPlanfromWR(!AutoWOPlanfromWR);
        
        if(!AutoWOPlanfromWR){
            console.log('1')
            setCheckBox_AutoWOPlanfromWR('1')
        }else{
            console.log('0')
            setCheckBox_AutoWOPlanfromWR('0')
        }
    }

    const handleOnChangeGenerateWOInvoice = () => {
        setGenerateWOInvoice(!GenerateWOInvoice);
        
        if(!GenerateWOInvoice){
            console.log('1')
            setCheckBox_GenerateWOInvoice('1')
        }else{
            console.log('0')
            setCheckBox_GenerateWOInvoice('0')
        }
    }

    const handleOnChangeTemporaryAssetFlag = () => {
        setTemporaryAssetFlag(!TemporaryAssetFlag);
        
        if(!TemporaryAssetFlag){
            console.log('1')
            setCheckBox_TemporaryAssetFlag('1')
        }else{
            console.log('0')
            setCheckBox_TemporaryAssetFlag('0')
        }
    }

    const handleOnChangePMClosedLoop = () => {
        setPMClosedLoop(!PMClosedLoop);
        
        if(!PMClosedLoop){
            console.log('1')
            setCheckBox_PMClosedLoop('1')
        }else{
            console.log('0')
            setCheckBox_PMClosedLoop('0')
        }
    }

    const handleOnChangePMScheduleDate = () => {
        setPMScheduleDate(!PMScheduleDate);
        
        if(!PMScheduleDate){
            console.log('1')
            setCheckBox_PMScheduleDate('1')
        }else{
            console.log('0')
            setCheckBox_PMScheduleDate('0')
        }
    }

    const handleOnChangeDefaultPRReleaseforApproval = () => {
        setDefaultPRReleaseforApproval(!DefaultPRReleaseforApproval);
        
        if(!DefaultPRReleaseforApproval){
            console.log('1')
            setCheckBox_DefaultPRReleaseforApproval('1')
        }else{
            console.log('0')
            setCheckBox_DefaultPRReleaseforApproval('0')
        }
    }

    const handleOnChangePRApprovalClosedLoop = () => {
        setPRApprovalClosedLoop(!PRApprovalClosedLoop);
        
        if(!PRApprovalClosedLoop){
            console.log('1')
            setCheckBox_PRApprovalClosedLoop('1')
        }else{
            console.log('0')
            setCheckBox_PRApprovalClosedLoop('0')
        }
    }

    const handleOnChangeEmailPRApprover = () => {
        setEmailPRApprover(!EmailPRApprover);
        
        if(!EmailPRApprover){
            console.log('1')
            setCheckBox_EmailPRApprover('1')
        }else{
            console.log('0')
            setCheckBox_EmailPRApprover('0')
        }
    }

    const handleOnChangeAutoPRApprovalEmail = () => {
        setAutoPRApprovalEmail(!AutoPRApprovalEmail);
        
        if(!AutoPRApprovalEmail){
            console.log('1')
            setCheckBox_AutoPRApprovalEmail('1')
        }else{
            console.log('0')
            setCheckBox_AutoPRApprovalEmail('0')
        }
    }

    const handleOnChangeEmailRequestedByPRApproved = () => {
        setEmailRequestedByPRApproved(!EmailRequestedByPRApproved);
        
        if(!EmailRequestedByPRApproved){
            console.log('1')
            setCheckBox_EmailRequestedByPRApproved('1')
        }else{
            console.log('0')
            setCheckBox_EmailRequestedByPRApproved('0')
        }
    }

    const handleOnChangeOrderPointAutoGeneratePR = () => {
        setOrderPointAutoGeneratePR(!OrderPointAutoGeneratePR);
        
        if(!OrderPointAutoGeneratePR){
            console.log('1')
            setCheckBox_OrderPointAutoGeneratePR('1')
        }else{
            console.log('0')
            setCheckBox_OrderPointAutoGeneratePR('0')
        }
    }

    const handleOnChangeAutoGeneratePO = () => {
        setAutoGeneratePO(!AutoGeneratePO);
        
        if(!AutoGeneratePO){
            console.log('1')
            setCheckBox_AutoGeneratePO('1')
        }else{
            console.log('0')
            setCheckBox_AutoGeneratePO('0')
        }
    }

    const handleOnChangeAutoClosePO = () => {
        setAutoClosePO(!AutoClosePO);
        
        if(!AutoClosePO){
            console.log('1')
            setCheckBox_AutoClosePO('1')
        }else{
            console.log('0')
            setCheckBox_AutoClosePO('0')
        }
    }

                            



      return (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                   System Default Setting
                </h3>          

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <div className="template-demo">

                            <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                                <i className="mdi mdi-file-check btn-icon-prepend" ></i>  Save
                            </button>

                            <button type="button" className="btn btn-danger btn-icon-text">
                                <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i> Cancel 
                            </button>
                        
                        </div>
                    </ol>
                </nav> 

            </div> 
            <div className="card">           
                <div className="card-body">

                    <section id="tab-menus">

                        <Tabs defaultActiveKey="Default" id="uncontrolled-tab-example" className="mb-4">


                            {/* ************************************* Default **************************************** */}
                            
                            <Tab eventKey="Default" title="Default" class="nav-link active">
                            
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="row" controlId="validation_DefaultLaborAccount">
                                        <label className="col-sm-4 col-form-label down">
                                            Default Labor Account:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultLaborAccount}
                                                    value={selected_DefaultLaborAccount}
                                                    onChange={setSelected_DefaultLaborAccount} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultMRStatus">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default MR Status:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultMRStatus}
                                                    value={selected_DefaultMRStatus}
                                                    onChange={setSelected_DefaultMRStatus} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultMaterialAccount">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default Material Account:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultMaterialAccount}
                                                    value={selected_DefaultMaterialAccount}
                                                    onChange={setSelected_DefaultMaterialAccount} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultPRStatus">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default PR Status:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultPRStatus}
                                                    value={selected_DefaultPRStatus}
                                                    onChange={setSelected_DefaultPRStatus} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultContractAccount">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default Contract Account:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultContractAccount}
                                                    value={selected_DefaultContractAccount}
                                                    onChange={setSelected_DefaultContractAccount} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultPOStatus">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default PO Status:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultPOStatus}
                                                    value={selected_DefaultPOStatus}
                                                    onChange={setSelected_DefaultPOStatus} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultWRWorkPriority">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default WR Work Priority:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultWRWorkPriority}
                                                    value={selected_DefaultWRWorkPriority}
                                                    onChange={setSelected_DefaultWRWorkPriority} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultWRAssetNo">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default WR Asset No:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultWRAssetNo}
                                                    value={selected_DefaultWRAssetNo}
                                                    onChange={setSelected_DefaultWRAssetNo} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultWOWorkPriority">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default WO Work Priority:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultWOWorkPriority}
                                                    value={selected_DefaultWOWorkPriority}
                                                    onChange={setSelected_DefaultWOWorkPriority} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultWROriginator">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default WR Originator:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultWROriginator}
                                                    value={selected_DefaultWROriginator}
                                                    onChange={setSelected_DefaultWROriginator} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultPMWorkPriority">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default PM Work Priority:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultPMWorkPriority}
                                                    value={selected_DefaultPMWorkPriority}
                                                    onChange={setSelected_DefaultPMWorkPriority} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultWOAssetNo">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default WO Asset No:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultWOAssetNo}
                                                    value={selected_DefaultWOAssetNo}
                                                    onChange={setSelected_DefaultWOAssetNo} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultAssetStatus">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default Asset Status:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultAssetStatus}
                                                    value={selected_DefaultAssetStatus}
                                                    onChange={setSelected_DefaultAssetStatus} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultPRApprovalType">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default PR Approval Type:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    value={selected_DefaultPRApprovalType}
                                                    onChange={setSelected_DefaultPRApprovalType}
                                                    options={DefaultPRApprovalType}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultWOWorkStatus">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default WO Work Status:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultWOWorkStatus}
                                                    value={selected_DefaultWOWorkStatus}
                                                    onChange={setSelected_DefaultWOWorkStatus} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultMRApprovalType">
                                        <label className="col-sm-4 col-form-label top down">
                                            Default MR Approval Type:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    value={selected_DefaultMRApprovalType}
                                                    onChange={setSelected_DefaultMRApprovalType}
                                                    options={DefaultMRApprovalType}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_TimeCardEntryBy">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Time Card Entry By:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    value={selected_TimeCardEntryBy}
                                                    onChange={setSelected_TimeCardEntryBy}
                                                    options={TimeCardEntryBy}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DefaultPOCurrencyCode">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Default PO Currency Code:
                                        </label>
                                        <div className="col-sm-6">
                                                <Select  
                                                    isClearable={true}  
                                                    options={DefaultPOCurrencyCode}
                                                    value={selected_DefaultPOCurrencyCode}
                                                    onChange={setSelected_DefaultPOCurrencyCode} // using id as it is unique
                                                    required
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_WOGracePeriod">
                                        <label className="col-sm-4 col-form-label top down">
                                            WO Grace Period:
                                        </label>
                                        <div className="col-sm-6">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" placeholder="0" value={WOGracePeriod} onChange={(e) => setWOGracePeriod(e.target.value)}/>
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_DashboardRefreshInterval">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            Dashboard Refresh Interval (Minutes):
                                        </label>
                                        <div className="col-sm-6">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" placeholder="0" value={DashboardRefreshInterval} onChange={(e) => setDashboardRefreshInterval(e.target.value)}/>
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_EOQCarryCostRate">
                                        <label className="col-sm-4 col-form-label top down">
                                            EOQ Carry Cost Rate(%):
                                        </label>
                                        <div className="col-sm-6">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" placeholder="0.00" value={EOQCarryCostRate} onChange={(e) => setEOQCarryCostRate(e.target.value)}/>
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>
                                
                                <div className="row moveUpPopUp">
                                    <div className="col-md-6 EmpMoveUp-md EmpMoveUp-sm">
                                        <Form.Group className="row" controlId="validation_PMLeadDay">
                                        <label className="col-sm-4 col-form-label labelTopEmail down">
                                            PM Lead Day:
                                        </label>
                                        <div className="col-sm-6">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" placeholder="0" value={PMLeadDay} onChange={(e) => setPMLeadDay(e.target.value)}/>
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-6 moveUp-md moveUp-sm">
                                        <Form.Group className="row" controlId="validation_EOQPOProcessCost">
                                        <label className="col-sm-4 col-form-label top down">
                                            EOQ PO Process Cost:
                                        </label>
                                        <div className="col-sm-6">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" placeholder="0.00" value={EOQPOProcessCost} onChange={(e) => setEOQPOProcessCost(e.target.value)}/>
                                        </div>
                                        </Form.Group>
                                    </div>

                                </div>

                            </Tab>

                            {/* ************************************* Settings ******************************************* */}

                            <Tab eventKey="Settings" title="Settings" class="nav-link active">

                            <div className="row">
                                <div className="col-md-4 p-4 mb-3">
                                    <Form.Group className="row">
                                    <fieldset className="border p-3 w-100">
                                        <legend className="w-auto">Dashboard</legend>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label down">Show Dashboard:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={ShowDashboard}
                                                    onChange={handleOnChangeShowDashboard}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label"></label>
                                                <div className="col-sm-3 form-check">
                                                    <label className="form-check-label"></label>
                                                </div>
                                            </div>
                                    </fieldset>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4 p-4 mb-3 moveUpSetting-md moveUpSetting-sm">
                                    <Form.Group className="row">
                                    <fieldset className="border p-3 w-100">
                                        <legend className="w-auto">Asset</legend>

                                            <div className="row" controlId="validation_AssetSelectionByLocation">
                                                <label className="col-sm-9 col-form-label down">Asset Selection by Location:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AssetSelectionByLocation}
                                                    onChange={handleOnChangeAssetSelectionByLocation}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_AssetSelectionByLocation">
                                                <label className="col-sm-9 col-form-label"></label>
                                                <div className="col-sm-3 form-check">
                                                    <label className="form-check-label"></label>
                                                </div>
                                            </div>
                                    </fieldset>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4 p-4 mb-3 moveUpSetting-md moveUpSetting-sm">
                                    <Form.Group className="row">
                                    <fieldset className="border p-3 w-100">
                                        <legend className="w-auto">Inventory</legend>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label down">Material Reserved:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={MaterialReserved}
                                                    onChange={handleOnChangeMaterialReserved}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Print Transaction Document:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={PrintTransactionDocument}
                                                    onChange={handleOnChangePrintTransactionDocument}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>
                                    </fieldset>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 p-4 mb-3 moveUpSetting-md moveUpSetting-sm">
                                    <Form.Group className="row">
                                    <fieldset className="border p-3 w-100">
                                        <legend className="w-auto">Material Request</legend>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label down">MR Email Notification:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={MREmailNotification}
                                                    onChange={handleOnChangeMREmailNotification}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">MR Approval Required:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={MRApprovalRequired}
                                                    onChange={handleOnChangeMRApprovalRequired}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Default MR Release For Approval:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={DefaultMRReleaseForApproval}
                                                    onChange={handleOnChangeDefaultMRReleaseForApproval}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">MR Approval Closed Loop:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={MRApprovalClosedLoop}
                                                    onChange={handleOnChangeMRApprovalClosedLoop}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Email MR Approver:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={EmailMRApprover}
                                                    onChange={handleOnChangeEmailMRApprover}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Auto MR Approval Email:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AutoMRApprovalEmail}
                                                    onChange={handleOnChangeAutoMRApprovalEmail}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Email Requested By (MR Approved):</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={EmailRequestedByMRApproved}
                                                    onChange={handleOnChangeEmailRequestedByMRApproved}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label"></label>
                                                <div className="col-sm-3 form-check">
                                                    <label className="form-check-label"></label>
                                                </div>
                                            </div>
                                    </fieldset>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4 p-4 mb-3 moveUpSetting-md moveUpSetting-sm">
                                    <Form.Group className="row">
                                    <fieldset className="border p-3 w-100">
                                        <legend className="w-auto">Maintenance</legend>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label down">WR Email Notification:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={WREmailNotification}
                                                    onChange={handleOnChangeWREmailNotification}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Default WO CC to Planning:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={DefaultWOCCtoPlanning}
                                                    onChange={handleOnChangeDefaultWOCCtoPlanning}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>


                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Auto WO Plan from WR:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AutoWOPlanfromWR}
                                                    onChange={handleOnChangeAutoWOPlanfromWR}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>


                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Generate WO Invoice:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={GenerateWOInvoice}
                                                    onChange={handleOnChangeGenerateWOInvoice}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>


                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Temporary Asset Flag:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={TemporaryAssetFlag}
                                                    onChange={handleOnChangeTemporaryAssetFlag}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>


                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">PM Closed Loop:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={PMClosedLoop}
                                                    onChange={handleOnChangePMClosedLoop}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">PM Schedule Date:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={PMScheduleDate}
                                                    onChange={handleOnChangePMScheduleDate}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label"></label>
                                                <div className="col-sm-3 form-check">
                                                    <label className="form-check-label"></label>
                                                </div>
                                            </div>
                                    </fieldset>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4 p-4 mb-3 moveUpSetting-md moveUpSetting-sm">
                                    <Form.Group className="row">
                                    <fieldset className="border p-3 w-100">
                                        <legend className="w-auto">Purchasing</legend>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label down">Default PR Release for Approval:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={DefaultPRReleaseforApproval}
                                                    onChange={handleOnChangeDefaultPRReleaseforApproval}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">PR Approval Closed Loop:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={PRApprovalClosedLoop}
                                                    onChange={handleOnChangePRApprovalClosedLoop}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Email PR Approver:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={EmailPRApprover}
                                                    onChange={handleOnChangeEmailPRApprover}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Auto PR Approval Email:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AutoPRApprovalEmail}
                                                    onChange={handleOnChangeAutoPRApprovalEmail}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Email Requested By (PR Approved):</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={EmailRequestedByPRApproved}
                                                    onChange={handleOnChangeEmailRequestedByPRApproved}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Order Point Auto Generate PR:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={OrderPointAutoGeneratePR}
                                                    onChange={handleOnChangeOrderPointAutoGeneratePR}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Auto Generate PO:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AutoGeneratePO}
                                                    onChange={handleOnChangeAutoGeneratePO}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                            <div className="row" controlId="validation_ShowDashboard">
                                                <label className="col-sm-9 col-form-label settingTop-sm down">Auto Close PO:</label>
                                                <div className="col-sm-3 form-check settingCheckBoxLeft-sm">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AutoClosePO}
                                                    onChange={handleOnChangeAutoClosePO}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </div>

                                    </fieldset>
                                    </Form.Group>
                                </div>
                            </div>

                            </Tab>


                            {/* ************************************* Financial *************************************** */}

                            <Tab eventKey="Email" title="Email" class="nav nav-tabs nav-item nav-link active">
                                
                            </Tab>


                        </Tabs>
                    </section> 
                       
                </div>
            </div>
            <div className="page-header">
                <h3 className="page-title"></h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <div className="template-demo">
                        <button
                        type="button"
                        className="btn btn-success btn-icon-text"
                        onClick={onClickChange}
                        >
                        <i className="mdi mdi-file-check btn-icon-prepend"></i>{" "}
                            Save
                        </button>

                        <button
                        type="button"
                        className="btn btn-danger btn-icon-text"
                        >
                        <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i>{" "}
                        Cancel
                        </button>
                    </div>
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default System_Default_Setting;