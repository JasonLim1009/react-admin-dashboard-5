import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import APIServices from "../services/APIServices";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import  {useLocation}  from 'react-router-dom';
import Moment from 'moment';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {useTable,useSortBy,usePagination,useRowSelect,useResizeColumns  }  from 'react-table';
import moment from 'moment';

import WorkOrderMaterial from "../tables/WorkOrderMaterial";
import WorkOrderSpecialOrder from "../tables/WorkOrderSpecialOrder";
import WorkOrderOutsourceContract from "../tables/WorkOrderOutsourceContract";
import WorkOrderTimeCard from "../tables/WorkOrderTimeCard";
import WorkOrderMisc from "../tables/WorkOrderMisc";
import WorkOrderStatusAudit from "../tables/WorkOrderStatusAudit";

const WorkOrderFrom = (props) => {

    const [validated, setValidated] = useState(false);


    const handleDragStart = (e) => e.preventDefault();

    const items = [
      <img src="../../assets/images/product_images_2/thumb_image1.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image2.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image3.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image4.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image5.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image6.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image7.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image8.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image9.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image10.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image11.jpg" onDragStart={handleDragStart} role="presentation" />,
      <img src="../../assets/images/product_images_2/thumb_image12.jpg" onDragStart={handleDragStart} role="presentation" />,
    
    ];

    const location = useLocation();
  
    const [Button_save, setButton_save] = useState("");

    const [RowID, setRowID] = useState("");

    

    const [WorkOrderNo, setWorkOrderNo] = useState("");
    const [WorkOrderNo_disabled, setWorkOrderNo_disabled] = useState(false);

    const [Asset_No, setAsset_No] = useState([]);
    const [selected_Asset_No, setSelected_Asset_No] = useState([]);

    const [Status, setStatus] = useState([]);
    const [selected_Status, setSelected_Status] = useState([]);

    const [Asset_Status, setAsset_Status] = useState([]);
    const [selected_Asset_Status, setSelected_Asset_Status] = useState([]);

    const [Plan_Priority, setPlan_Priority] = useState([]);
    const [selected_Plan_Priority, setSelected_Plan_Priority] = useState([]);

    const [Asset_Group_Code, setAsset_Group_Code] = useState([]);
    const [selected_Asset_Group_Code, setSelected_Asset_Group_Code] = useState([]);

    const [OriginationDate, setOriginationDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));

    const [Charge_Cost_Center, setCharge_Cost_Center] = useState([]);
    const [selected_Charge_Cost_Center, setSelected_Charge_Cost_Center] = useState([]);

    const [DueDate, setDueDate] = useState(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'));

    const [Work_Area, setWork_Area] = useState([]);
    const [selected_Work_Area, setSelected_Work_Area] = useState([]);

    const [Originator, setOriginator] = useState([]);
    const [selected_Originator, setSelected_Originator] = useState([]);

    const [Asset_Level, setAsset_Level] = useState([]);
    const [selected_Asset_Level, setSelected_Asset_Level] = useState([]);

    const [Phone, setPhone] = useState("");

    const [Asset_Location, setAsset_Location] = useState([]);
    const [selected_Asset_Location, setSelected_Asset_Location] = useState([]);

    const [Fault_Code, setFault_Code] = useState([]);
    const [selected_Fault_Code, setSelected_Fault_Code] = useState([]);

    const [Description, setDescription] = useState("");


    
    const [CorrectiveAction, setCorrectiveAction] = useState("");

    const [Project_ID, setProject_ID] = useState([]);
    const [selected_Project_ID, setSelected_Project_ID] = useState([]);

    const [Original_Periority, setOriginal_Periority] = useState([]);
    const [selected_Original_Periority, setSelected_Original_Periority] = useState([]);

    const [Cause_Code, setCause_Code] = useState([]);
    const [selected_Cause_Code, setSelected_Cause_Code] = useState([]);
    
    const [ScheduleDate, setScheduleDate] = useState("");

    const [Action_Code, setAction_Code] = useState([]);
    const [selected_Action_Code, setSelected_Action_Code] = useState([]);

    const [ExceptionDate, setExceptionDate] = useState("");
    
    const [Delay_Code, setDelay_Code] = useState([]);
    const [selected_Delay_Code, setSelected_Delay_Code] = useState([]);

    const [StatusChangeDate, setStatusChangeDate] = useState("");

    const [Work_Type, setWork_Type] = useState([]);
    const [selected_Work_Type, setSelected_Work_Type] = useState([]);

    const [CompletionDate, setCompletionDate] = useState("");

    const [Work_Class, setWork_Class] = useState([]);
    const [selected_Work_Class, setSelected_Work_Class] = useState([]);

    const [CloseDate, setCloseDate] = useState("");

    const [Work_Group, setWork_Group] = useState([]);
    const [selected_Work_Group, setSelected_Work_Group] = useState([]);

    const [Supervisor_ID, setSupervisor_ID] = useState([]);
    const [selected_Supervisor_ID, setSelected_Supervisor_ID] = useState([]);

    const [Planner, setPlanner] = useState([]);
    const [selected_Planner, setSelected_Planner] = useState([]);

    const [Approver, setApprover] = useState([]);
    const [selected_Approver, setSelected_Approver] = useState([]);

    const [Assign_To, setAssign_To] = useState([]);
    const [selected_Assign_To, setSelected_Assign_To] = useState([]);

    const [Permanent_ID, setPermanent_ID] = useState("");

    const [Temporary_Asset, setTemporary_Asset] = useState(false)  
    const [CheckBox_Temporary_Asset, setCheckBox_Temporary_Asset] = useState('0')  

    const [Approved, setApproved] = useState(false)  
    const [CheckBox_Approved, setCheckBox_Approved] = useState('0')  
    
    const [Safety, setSafety] = useState(false)  
    const [CheckBox_Safety, setCheckBox_Safety] = useState('0')  



    const [Customer_Code, setCustomer_Code] = useState([]);
    const [selected_Customer_Code, setSelected_Customer_Code] = useState([]); 
  
    const [Labor_Account, setLabor_Account] = useState([]);
    const [selected_Labor_Account, setSelected_Labor_Account] = useState([]); 

    const [Material_Account, setMaterial_Account] = useState([]);
    const [selected_Material_Account, setSelected_Material_Account] = useState([]); 

    const [Credit_Cost_Center, setCredit_Cost_Center] = useState([]);
    const [selected_Credit_Cost_Center, setSelected_Credit_Cost_Center] = useState([]); 

    const [Contract_Account, setContract_Account] = useState([]);
    const [selected_Contract_Account, setSelected_Contract_Account] = useState([]); 

    const [Miscellaneous_Account, setMiscellaneous_Account] = useState([]);
    const [selected_Miscellaneous_Account, setSelected_Miscellaneous_Account] = useState([]); 

    const [Columns, setColumns]=useState([]);
    const [Data, setData]=useState([]);



    const [UDFNote1, setUDFNote1] = useState("");
    const [UDFText_1, setUDFText_1] = useState("");
    const [UDFText_2, setUDFText_2] = useState("");
    const [UDFText_3, setUDFText_3] = useState("");
    const [UDFText_4, setUDFText_4] = useState("");
    const [UDFText_5, setUDFText_5] = useState("");
    const [UDFText_6, setUDFText_6] = useState("");
    const [UDFText_7, setUDFText_7] = useState("");
    const [UDFText_8, setUDFText_8] = useState("");
    const [UDFText_9, setUDFText_9] = useState("");
    const [UDFText_10, setUDFText_10] = useState("");

    const [UDFNumber_1, setUDFNumber_1] = useState("0");
    const [UDFNumber_2, setUDFNumber_2] = useState("0");
    const [UDFNumber_3, setUDFNumber_3] = useState("0");
    const [UDFNumber_4, setUDFNumber_4] = useState("0");
    const [UDFNumber_5, setUDFNumber_5] = useState("0");

    const [UDFDate_1, setUDFDate_1] = useState(new Date());
    const [UDFDate_2, setUDFDate_2] = useState(new Date());
    const [UDFDate_3, setUDFDate_3] = useState(new Date());
    const [UDFDate_4, setUDFDate_4] = useState(new Date());
    const [UDFDate_5, setUDFDate_5] = useState(new Date());

    const [AutoNumring, setAutoNumring] = useState("");

   

    const get_workorder_status = (site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


            for (var index in responseJson.data.data.Wko_Auto_numbering) {  

                if(responseJson.data.data.Wko_Auto_numbering[index].cnt_mst_numbering == "M" ){

                    setWorkOrderNo_disabled(false)
                    setAutoNumring('M')
                }else{
                    
                    setWorkOrderNo_disabled(true)
                    setAutoNumring('A')
                }              
            }


                let Original_Periority = responseJson.data.data.WKO_Original_Periority.map(item => ({
                    label: item.wrk_pri_pri_cd +" : "+ item.wrk_pri_desc,
                    value: item.wrk_pri_desc            
                    }));
                    setOriginal_Periority(Original_Periority);

                let Status = responseJson.data.data.WKO_Status.map(item => ({
                    label: item.wrk_sts_status +" : "+ item.wrk_sts_desc,
                    value: item.wrk_sts_desc            
                    }));
                    setStatus(Status);

                let Plan_Priority = responseJson.data.data.Priority.map(item => ({
                    label: item.wrk_pri_pri_cd +" : "+ item.wrk_pri_desc,
                    value: item.wrk_pri_desc            
                    }));
                    setPlan_Priority(Plan_Priority);

                let Asset_No = responseJson.data.data.WKO_Asset_No.map(item => ({
                    label: item.ast_mst_asset_no +" : "+ item.ast_mst_asset_status,
                    value: item.ast_mst_asset_no            
                    }));
                    setAsset_No(Asset_No);

                let Asset_Group_Code = responseJson.data.data.AssetGroupCode.map(item => ({
                    label: item.ast_grp_grp_cd +" : "+ item.ast_grp_desc ,
                    value: item.ast_grp_desc            
                    }));                   
                    setAsset_Group_Code(Asset_Group_Code);

                let Asset_Status = responseJson.data.data.AssetStatus.map(item => ({
                    label: item.ast_sts_status +" : "+ item.ast_sts_desc ,
                    value: item.ast_sts_desc            
                    }));
                    setAsset_Status(Asset_Status);

                let Work_Area = responseJson.data.data.WKO_Work_Area.map(item => ({
                    label: item.mst_war_work_area +" : "+ item.mst_war_desc ,
                    value: item.mst_war_desc            
                    }));
                    setWork_Area(Work_Area);


                let Charge_Cost_Center = responseJson.data.data.CostCenter.map(item => ({
                    label: item.costcenter +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setCharge_Cost_Center(Charge_Cost_Center);

                let Asset_Level = responseJson.data.data.AssetLevel.map(item => ({
                    label: item.ast_lvl_ast_lvl +" : "+ item.ast_lvl_desc ,
                    value: item.ast_lvl_desc            
                    }));                   
                    setAsset_Level(Asset_Level);

                let Fault_Code = responseJson.data.data.FaultCode.map(item => ({
                    label: item.wrk_flt_fault_cd +" : "+ item.wrk_flt_desc ,
                    value: item.wrk_flt_desc            
                    }));                   
                    setFault_Code(Fault_Code);    

                let Asset_Location = responseJson.data.data.AssetLocation.map(item => ({
                    label: item.ast_loc_ast_loc +" : "+ item.ast_loc_desc ,
                    value: item.ast_loc_desc            
                    }));                   
                    setAsset_Location(Asset_Location);    

                let Originator = responseJson.data.data.WKO_Originator.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
                    value: item.emp_mst_empl_id            
                    }));                   
                    setOriginator(Originator);   

                let Project_ID = responseJson.data.data.WKO_ProjectID.map(item => ({
                    label: item.prj_mst_prj_cd +" : "+ item.prj_mst_desc ,
                    value: item.prj_mst_desc            
                    }));                   
                    setProject_ID(Project_ID); 

                let Cause_Code = responseJson.data.data.CasuseCode.map(item => ({
                    label: item.wrk_ccd_cause_cd +" : "+ item.wrk_ccd_desc ,
                    value: item.wrk_ccd_desc            
                    }));                   
                    setCause_Code(Cause_Code);   

                let Action_Code = responseJson.data.data.ActionCode.map(item => ({
                    label: item.wrk_act_action_cd +" : "+ item.wrk_act_desc ,
                    value: item.wrk_act_desc            
                    }));                   
                    setAction_Code(Action_Code);  
                    
                let Delay_Code = responseJson.data.data.WKO_Delay_Code.map(item => ({
                    label: item.wrk_dcd_delay_cd +" : "+ item.wrk_dcd_desc ,
                    value: item.wrk_dcd_desc            
                    }));                   
                    setDelay_Code(Delay_Code);  

                let Work_Type = responseJson.data.data.WKO_Work_Type.map(item => ({
                    label: item.wrk_typ_typ_cd +" : "+ item.wrk_typ_desc ,
                    value: item.wrk_typ_desc            
                    }));                   
                    setWork_Type(Work_Type);  
                    
                let Work_Class = responseJson.data.data.WKO_Work_Class.map(item => ({
                    label: item.wrk_cls_cls_cd +" : "+ item.wrk_cls_desc ,
                    value: item.wrk_cls_desc            
                    }));                   
                    setWork_Class(Work_Class);  

                let Work_Group = responseJson.data.data.WKO_Work_Group.map(item => ({
                    label: item.wrk_grp_grp_cd +" : "+ item.wrk_grp_desc ,
                    value: item.wrk_grp_desc            
                    }));                   
                    setWork_Group(Work_Group);  

                let Supervisor_ID = responseJson.data.data.Employee_Supervisor_Id.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
                    value: item.emp_mst_name            
                    }));                   
                    setSupervisor_ID(Supervisor_ID);  

                let Planner = responseJson.data.data.WKO_Planner.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
                    value: item.emp_mst_name            
                    }));                   
                    setPlanner(Planner);  

                let Approver = responseJson.data.data.WKO_Approver.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
                    value: item.emp_mst_name            
                    }));                   
                    setApprover(Approver);  

                let Assign_To = responseJson.data.data.WKO_AssignTO.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
                    value: item.emp_mst_name            
                    }));                   
                    setAssign_To(Assign_To);  

                let Customer_Code = responseJson.data.data.Customer_code.map(item => ({
                    label: item.cus_mst_customer_cd +" : "+ item.cus_mst_desc ,
                    value: item.cus_mst_desc            
                    }));                   
                    setCustomer_Code(Customer_Code);  

                let Labor_Account = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setLabor_Account(Labor_Account);  

                let Material_Account = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setMaterial_Account(Material_Account);  

                let Credit_Cost_Center = responseJson.data.data.CostCenter.map(item => ({
                    label: item.costcenter +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setCredit_Cost_Center(Credit_Cost_Center);  

                let Contract_Account = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setContract_Account(Contract_Account);  

                let Miscellaneous_Account = responseJson.data.data.WKO_Labor_Account.map(item => ({
                    label: item.account +" : "+ item.descs ,
                    value: item.descs            
                    }));                   
                    setMiscellaneous_Account(Miscellaneous_Account);  


                    if(selected_asset == 'New_WorkOrder'){ 

                        Swal.close();
                        setButton_save("Save")
    
                    }else{
    
                        setButton_save("Update")
                        get_workordermaster_select(site_ID,selected_asset);
                      
                    }


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


    const get_workordermaster_select = () => {

      
        console.log('SELECT ROWID: '+ location.state.RowID)

        APIServices.get_workordermaster_select(location.state.RowID).then((responseJson)=>{  
            
            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT WKO: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )


                
                setWorkOrderNo(responseJson.data.data[index].wko_mst_wo_no )
                setSelected_Asset_No( {label:responseJson.data.data[index].wko_mst_assetno} )
                setSelected_Status( {label:responseJson.data.data[index].wko_mst_status} )
                setSelected_Asset_Status( {label:responseJson.data.data[index].wko_mst_asset_status} )
                setSelected_Plan_Priority( {label:responseJson.data.data[index].wko_mst_plan_priority} )
                setSelected_Asset_Group_Code( {label:responseJson.data.data[index].wko_mst_asset_group_code} )
                
                if(responseJson.data.data[index].wko_mst_org_date == null){
                    setOriginationDate('')
                }else{

                    setOriginationDate( Moment(responseJson.data.data[index].wko_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT OD: '+ Moment(responseJson.data.data[index].wko_mst_org_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_Charge_Cost_Center( {label:responseJson.data.data[index].wko_mst_chg_costcenter} )

                if(responseJson.data.data[index].wko_mst_due_date == null){
                    setDueDate('')
                }else{

                    setDueDate( Moment(responseJson.data.data[index].wko_mst_due_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DD: '+ Moment(responseJson.data.data[index].wko_mst_due_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }
                
                setSelected_Work_Area( {label:responseJson.data.data[index].wko_mst_work_area} )
                setSelected_Originator( {label:responseJson.data.data[index].wko_mst_originator} )
                setSelected_Asset_Level( {label:responseJson.data.data[index].wko_mst_asset_level} )
                setPhone( responseJson.data.data[index].wko_mst_phone )
                setSelected_Asset_Location( {label:responseJson.data.data[index].wko_mst_asset_location} )
                setSelected_Fault_Code( {label:responseJson.data.data[index].wko_mst_flt_code} )
                setDescription( responseJson.data.data[index].wko_mst_descs )


                setCorrectiveAction( responseJson.data.data[index].wko_det_corr_action )
                setSelected_Project_ID( {label:responseJson.data.data[index].wko_mst_project_id} )
                setSelected_Original_Periority( {label:responseJson.data.data[index].wko_mst_orig_priority} )
                setSelected_Cause_Code( {label:responseJson.data.data[index].wko_det_cause_code} )
                
                if(responseJson.data.data[index].wko_det_sched_date == null){
                    setScheduleDate('')
                }else{

                    setScheduleDate( Moment(responseJson.data.data[index].wko_det_sched_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT SD: '+ Moment(responseJson.data.data[index].wko_det_sched_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_Action_Code( {label:responseJson.data.data[index].wko_det_act_code} )

                if(responseJson.data.data[index].wko_det_exc_date == null){
                    setExceptionDate('')
                }else{

                    setExceptionDate( Moment(responseJson.data.data[index].wko_det_exc_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT ED: '+ Moment(responseJson.data.data[index].wko_det_exc_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_Delay_Code( {label:responseJson.data.data[index].wko_det_delay_cd} )

                if(responseJson.data.data[index].wko_det_sc_date == null){
                    setStatusChangeDate('')
                }else{

                    setStatusChangeDate( Moment(responseJson.data.data[index].wko_det_sc_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT SCD: '+ Moment(responseJson.data.data[index].wko_det_sc_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }
                
                setSelected_Work_Type( {label:responseJson.data.data[index].wko_det_work_type} )

                if(responseJson.data.data[index].wko_det_cmpl_date == null){
                    setCompletionDate('')
                }else{

                    setCompletionDate( Moment(responseJson.data.data[index].wko_det_cmpl_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT CD: '+ Moment(responseJson.data.data[index].wko_det_cmpl_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_Work_Class( {label:responseJson.data.data[index].wko_det_work_class} )

                if(responseJson.data.data[index].wko_det_clo_date == null){
                    setCloseDate('')
                }else{

                    setCloseDate( Moment(responseJson.data.data[index].wko_det_clo_date.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT CLOD: '+ Moment(responseJson.data.data[index].wko_det_clo_date.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setSelected_Work_Group( {label:responseJson.data.data[index].wko_det_work_grp} )
                setSelected_Supervisor_ID( {label:responseJson.data.data[index].wko_det_supv_id} )
                setSelected_Planner( {label:responseJson.data.data[index].wko_det_planner} )
                setSelected_Approver( {label:responseJson.data.data[index].wko_det_approver} )
                setSelected_Assign_To( {label:responseJson.data.data[index].wko_det_assign_to} )
                setPermanent_ID( responseJson.data.data[index].wko_det_perm_id )
                setTemporary_Asset( responseJson.data.data[index].wko_det_temp_asset )
                setApproved( responseJson.data.data[index].wko_det_approved )
                setSafety( responseJson.data.data[index].wko_det_safety )
                
                
                setSelected_Customer_Code( {label:responseJson.data.data[index].wko_det_customer_cd} )
                setSelected_Labor_Account( {label:responseJson.data.data[index].wko_det_laccount} )
                setSelected_Material_Account( {label:responseJson.data.data[index].wko_det_maccount} )
                setSelected_Credit_Cost_Center( {label:responseJson.data.data[index].wko_det_crd_costcenter} )
                setSelected_Contract_Account( {label:responseJson.data.data[index].wko_det_caccount} )
                setSelected_Miscellaneous_Account( {label:responseJson.data.data[index].wko_det_saccount} )


                setUDFNote1( responseJson.data.data[index].wko_det_note1 )
                setUDFText_1( responseJson.data.data[index].wko_det_varchar1 )
                setUDFText_2( responseJson.data.data[index].wko_det_varchar2 )
                setUDFText_3( responseJson.data.data[index].wko_det_varchar3 )
                setUDFText_4( responseJson.data.data[index].wko_det_varchar4 )
                setUDFText_5( responseJson.data.data[index].wko_det_varchar5 )
                setUDFText_6( responseJson.data.data[index].wko_det_varchar6 )
                setUDFText_7( responseJson.data.data[index].wko_det_varchar7 )
                setUDFText_8( responseJson.data.data[index].wko_det_varchar8 )
                setUDFText_9( responseJson.data.data[index].wko_det_varchar9 )
                setUDFText_10( responseJson.data.data[index].wko_det_varchar10 )

                setUDFNumber_1( responseJson.data.data[index].wko_det_numeric1 )
                setUDFNumber_2( responseJson.data.data[index].wko_det_numeric2 )
                setUDFNumber_3( responseJson.data.data[index].wko_det_numeric3 )
                setUDFNumber_4( responseJson.data.data[index].wko_det_numeric4 )
                setUDFNumber_5( responseJson.data.data[index].wko_det_numeric5 )
               
                if(responseJson.data.data[index].wko_det_datetime1 == null){
                    setUDFDate_1('')
                }else{

                    setUDFDate_1( Moment(responseJson.data.data[index].wko_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 1 : '+ Moment(responseJson.data.data[index].wko_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wko_det_datetime2 == null){
                    setUDFDate_2('')
                }else{

                    setUDFDate_2( Moment(responseJson.data.data[index].wko_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 2 : '+ Moment(responseJson.data.data[index].wko_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wko_det_datetime3 == null){
                    setUDFDate_3('')
                }else{

                    setUDFDate_3( Moment(responseJson.data.data[index].wko_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 3 : '+ Moment(responseJson.data.data[index].wko_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wko_det_datetime4 == null){
                    setUDFDate_4('')
                }else{

                    setUDFDate_4( Moment(responseJson.data.data[index].wko_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 4 : '+ Moment(responseJson.data.data[index].wko_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].wko_det_datetime5 == null){
                    setUDFDate_5('')
                }else{

                    setUDFDate_5( Moment(responseJson.data.data[index].wko_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT Date 5 : '+ Moment(responseJson.data.data[index].wko_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

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
              title: 'Oops get_WorkOrder_select...',
              text: e,          
            })
          });

    }
    

    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        console.log('select select',location.state.select);
        console.log('select WKOID',location.state.RowID);
    
        get_workorder_status(site_ID, "All", location.state.select);       
       

    },[location]);


    const onClickChange = () => {

        
    // if(selected_Asset_No == 0 || selected_Asset_No == null){
    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'error',
    //                 title: 'Please Select the Asset No',
    //                 showConfirmButton: false,
    //                 timer: 2000
                    
    //             })
    //         } else {
            
                if(selected_Status == 0 || selected_Status == null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Select the Status',
                        showConfirmButton: false,
                        timer: 2000,
                        
                    })
                }else{

                    if(selected_Asset_Status == 0 || selected_Asset_Status == null){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Select the Asset Status',
                            showConfirmButton: false,
                            timer: 2000
                            
                        })
                    }else{
                    
                        if(selected_Charge_Cost_Center == 0 || selected_Charge_Cost_Center == null){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Please Select the Charge Cost Center',
                                showConfirmButton: false,
                                timer: 2000
                                
                            })
                        }else{
                
                            if(selected_Fault_Code == 0 || selected_Fault_Code == null){
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Please Select the Fault Code',
                                    showConfirmButton: false,
                                    timer: 2000
                                    
                                    })
                            }else{
                    
                                if(Description == ''){
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'Please Enter the Description',
                                        showConfirmButton: false,
                                        timer: 2000
                                        
                                        })
                                }else{

                                    if(selected_Original_Periority == 0 || selected_Original_Periority == null){
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Please Select the Original Periority',
                                            showConfirmButton: false,
                                            timer: 2000
                                            
                                        })
                                    } else {
            
                                        if(selected_Work_Type == 0 || selected_Work_Type == null){
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'error',
                                                title: 'Please Select the Work Type',
                                                showConfirmButton: false,
                                                timer: 2000
                                                
                                                })
                                        }else{

                                            if(selected_Work_Group == 0 || selected_Work_Group == null){
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'error',
                                                    title: 'Please Select the Work Group',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                    
                                                    })
                                            }else{
                                    
                                                if(Button_save ==  "Save"){
            
                                                    New_WorkOrder();
                                                    console.log("Create button clicked!");
                                                    resetData();

                                                }else if(Button_save == "Update"){
            
                                                    Update_WorkOrder();
                                                    console.log("Update button clicked here!");
                                                }
                                            }
                                        
                            
                                        }
                    
                        
                                    }
                                
                    
                                }
                            
                
                            }
                        
            
                        }
                    }

                }
        // }
   
    }


    const New_WorkOrder = () => {

        Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
        Swal.showLoading();


        let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');
        console.log(get_date)

        let site_ID = localStorage.getItem("site_ID");
        let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
        let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");


        
        //Select WorkOrderNo
        console.log("WorkOrderNo: ", WorkOrderNo)

        //Select Asset No
        let Asset_No, setAsset_No;
        if(selected_Asset_No == '' || selected_Asset_No == null){

            setAsset_No=''
        }else{

            Asset_No = selected_Asset_No.label.split(":")
            setAsset_No = Asset_No[0];
            console.log("Asset_No ", Asset_No[0])
        }

        //Select Status
        let Status, setStatus;
        if(selected_Status.label == '' || selected_Status.label == null){

            setStatus=''
        }else{

            Status = selected_Status.label.split(":")
            setStatus = Status[0];
            console.log("Status: ", Status[0])
        }

        //Select Asset Status
        let Asset_Status, setAsset_Status;
        if(selected_Asset_Status == '' || selected_Asset_Status == null){

            setAsset_Status=''
        }else{

            Asset_Status = selected_Asset_No.label.split(":")
            setAsset_Status = Asset_Status[0];
            console.log("Asset_Status ", Asset_Status[0])
        }

        //Select Plan Priority
        let Plan_Priority, setPlan_Priority;
        if(selected_Plan_Priority == '' || selected_Plan_Priority == null){

            setPlan_Priority=''
        }else{

            Plan_Priority = selected_Plan_Priority.label.split(":")
            setPlan_Priority = Plan_Priority[0];
            console.log("Plan_Priority ", Plan_Priority[0])
        }

        //Select Asset Group Code
        let Asset_Group_Code, setAsset_Group_Code;
        if(selected_Asset_Group_Code.label == '' || selected_Asset_Group_Code.label == null){

            setAsset_Group_Code=''
        }else{

            Asset_Group_Code = selected_Asset_Group_Code.label.split(":")
            setAsset_Group_Code = Asset_Group_Code[0];
            console.log("Asset_Group_Code ", Asset_Group_Code[0])
        }

        //Select Origination Date
        let date_of_origination = ''
        if (OriginationDate == '' || OriginationDate == null) {

            date_of_origination = '';
        } else {

            date_of_origination = Moment(OriginationDate).utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("OD ", date_of_origination);
        }

        //Select Charge Cost Center
        let Charge_Cost_Center = selected_Charge_Cost_Center.label.split(":")
        console.log("Charge_Cost_Center: ", Charge_Cost_Center[0])

        //Select Due Date
        let date_of_due = ''
        if (DueDate == '' || DueDate == null) {

            date_of_due = '';
        } else {

            date_of_due = Moment(DueDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DD ", date_of_due);
        }

        //Select Work Area
        let Work_Area, setWork_Area;
        if(selected_Work_Area == '' || selected_Work_Area == null){

            setWork_Area=''
        }else{

            Work_Area = selected_Work_Area.label.split(":")
            setWork_Area = Work_Area[0];
            console.log("Work_Area ", Work_Area[0])
        }

        //Select Originator
        let Originator, setOriginator;
        if(selected_Originator == '' || selected_Originator == null){

            setOriginator=''
        }else{

            Originator = selected_Originator.label.split(":")
            setOriginator = Originator[0];
            console.log("Originator ", Originator[0])
        }

        //Select Asset Level
        let Asset_Level, setAsset_Level;
        if(selected_Asset_Level == '' || selected_Asset_Level == null){

            setAsset_Level=''
        }else{

            Asset_Level = selected_Asset_Level.label.split(":")
            setAsset_Level = Asset_Level[0];
            console.log("Asset_Level ", Asset_Level[0])
        }

        //Select Phone
        console.log("Phone: ", Phone)

        //Select Asset Location
        let Asset_Location, setAsset_Location;
        if(selected_Asset_Location == '' || selected_Asset_Location == null){

            setAsset_Location=''
        }else{

            Asset_Location = selected_Asset_Location.label.split(":")
            setAsset_Location = Asset_Location[0];
            console.log("Asset_Location ", Asset_Location[0])
        }
        
        //Select Fault Code
        let Fault_Code = selected_Fault_Code.label.split(":")
        console.log("Fault_Code: ", Fault_Code[0])

        //Select Description
        console.log("Description: ", Description)

        
        
        //Select Corrective Action
        console.log("CorrectiveAction: ", CorrectiveAction)

        //Select Project ID
        let Project_ID, setProject_ID;

        console.log('Project_ID', selected_Project_ID.label)
        if(selected_Project_ID.label == '' || selected_Project_ID.label == null){

            setProject_ID=''
        }else{

            Project_ID = selected_Project_ID.label.split(":")
            setProject_ID = Project_ID[0];
            console.log("Project_ID ", Project_ID[0])
        }

        //Select Original Periority
        let Original_Periority = selected_Original_Periority.label.split(":")
        console.log("Original_Periority: ", Original_Periority[0])

        //Select Cause Code
        let Cause_Code, setCause_Code;
        if(selected_Cause_Code == '' || selected_Cause_Code == null){

            setCause_Code=''
        }else{

            Cause_Code = selected_Cause_Code.label.split(":")
            setCause_Code = Cause_Code[0];
            console.log("Cause_Code ", Cause_Code[0])
        }

        //Select Schedule Date
        let date_of_schedule = ''
        if (ScheduleDate == '' || ScheduleDate == null) {

            date_of_schedule = '';
        } else {

            date_of_schedule = Moment(ScheduleDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("SD ", date_of_schedule);
        }

        //Select Action Code
        let Action_Code, setAction_Code;
        if(selected_Action_Code == '' || selected_Action_Code == null){

            setAction_Code=''
        }else{

            Action_Code = selected_Action_Code.label.split(":")
            setAction_Code = Action_Code[0];
            console.log("Action_Code ", Action_Code[0])
        }

        //Select Exception Date
        let date_of_exception = ''
        if (ExceptionDate == '' || ExceptionDate == null) {

            date_of_exception = '';
        } else {

            date_of_exception = Moment(ExceptionDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("EB ", date_of_exception);
        }

        //Select Delay Code
        let Delay_Code, setDelay_Code;
        if(selected_Delay_Code.label == '' || selected_Delay_Code.label == null){

            setDelay_Code=''
        }else{

            Delay_Code = selected_Delay_Code.label.split(":")
            setDelay_Code = Delay_Code[0];
            console.log("Delay_Code ", Delay_Code[0])
        }

        //Select Status Change Date
        let date_of_status_change = ''
        if (StatusChangeDate == '' || StatusChangeDate == null) {

            date_of_status_change = '';
        } else {

            date_of_status_change = Moment(StatusChangeDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("SCB ", date_of_status_change);
        }

        //Select Work Type
        let Work_Type = selected_Work_Type.label.split(":")
        console.log("Work_Type: ", Work_Type[0])

         //Select Completion Date
         let date_of_completion = ''
         if (CompletionDate == '' || CompletionDate == null) {
 
            date_of_completion = '';
         } else {
 
            date_of_completion = Moment(CompletionDate).format('yyyy-MM-DD HH:mm:ss').trim();
             console.log("CD ", date_of_completion);
         }

        //Select Work Class
        let Work_Class, setWork_Class;
        if(selected_Work_Class == '' || selected_Work_Class == null){

            setWork_Class=''
        }else{

            Work_Class = selected_Work_Class.label.split(":")
            setWork_Class = Work_Class[0];
            console.log("Work_Class ", Work_Class[0])
        }

        //Select Close Date
        let date_of_close = ''
        if (CloseDate == '' || CloseDate == null) {

            date_of_close = '';
        } else {

            date_of_close = Moment(CloseDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("CLOD ", date_of_close);
        }

        //Select Work Group
        let Work_Group = selected_Work_Group.label.split(":")
        console.log("Work_Group: ", Work_Group[0])

        //Select Supervisor ID
        let Supervisor_ID, setSupervisor_ID;
        if(selected_Supervisor_ID.label == '' || selected_Supervisor_ID.label == null){

            setSupervisor_ID=''
        }else{

            Supervisor_ID = selected_Supervisor_ID.label.split(":")
            setSupervisor_ID = Supervisor_ID[0];
            console.log("Supervisor_ID ", Supervisor_ID[0])
        }

        //Select Planner
        let Planner, setPlanner;
        if(selected_Planner.label == '' || selected_Planner.label == null){

            setPlanner=''
        }else{

            Planner = selected_Planner.label.split(":")
            setPlanner = Planner[0];
            console.log("Planner ", Planner[0])
        }

        //Select Approver
        let Approver, setApprover;
        if(selected_Approver.label == '' || selected_Approver.label == null){

            setApprover=''
        }else{

            Approver = selected_Approver.label.split(":")
            setApprover = Approver[0];
            console.log("Approver ", Approver[0])
        }

        //Select Assign To
        let Assign_To, setAssign_To;
        if(selected_Assign_To == '' || selected_Assign_To == null){

            setAssign_To=''
        }else{

            Assign_To = selected_Assign_To.label.split(":")
            setAssign_To = Assign_To[0];
            console.log("Assign_To ", Assign_To[0])
        }

        //Select Permanent ID
        console.log("Perm_ID: ", Permanent_ID)


        //Select WKO Customer Code
        let Customer_Code, setCustomer_Code;
        if(selected_Customer_Code.label == '' || selected_Customer_Code.label == null){

            setCustomer_Code=''
        }else{

            Customer_Code = selected_Customer_Code.label.split(":")
            setCustomer_Code = Customer_Code[0];
            console.log("Customer_Code ", Customer_Code[0])
        }

        //Select WKO Labor Account
        let Labor_Account, setLabor_Account;
        if(selected_Labor_Account.label == '' || selected_Labor_Account.label == null){

            setLabor_Account=''
        }else{

            Labor_Account = selected_Labor_Account.label.split(":")
            setLabor_Account = Labor_Account[0];
            console.log("Labor_Account ", Labor_Account[0])
        }

        //Select WKO Material Account
        let Material_Account, setMaterial_Account;
        if(selected_Material_Account.label == '' || selected_Material_Account.label == null){

            setMaterial_Account=''
        }else{

            Material_Account = selected_Material_Account.label.split(":")
            setMaterial_Account = Material_Account[0];
            console.log("Material_Account ", Material_Account[0])
        }

        //Select WKO Credit Cost Center
        let Credit_Cost_Center, setCredit_Cost_Center;
        if(selected_Credit_Cost_Center.label == '' || selected_Credit_Cost_Center.label == null){

            setCredit_Cost_Center=''
        }else{

            Credit_Cost_Center = selected_Credit_Cost_Center.label.split(":")
            setCredit_Cost_Center = Credit_Cost_Center[0];
            console.log("Credit_Cost_Center ", Credit_Cost_Center[0])
        }

        //Select WKO Contract Account
        let Contract_Account, setContract_Account;
        if(selected_Contract_Account.label == '' || selected_Contract_Account.label == null){

            setContract_Account=''
        }else{

            Contract_Account = selected_Contract_Account.label.split(":")
            setContract_Account = Contract_Account[0];
            console.log("Contract_Account ", Contract_Account[0])
        }

        //Select WKO Miscellaneous Account
        let Miscellaneous_Account, setMiscellaneous_Account;
        if(selected_Miscellaneous_Account.label == '' || selected_Miscellaneous_Account.label == null){

            setMiscellaneous_Account=''
        }else{

            Miscellaneous_Account = selected_Miscellaneous_Account.label.split(":")
            setMiscellaneous_Account = Miscellaneous_Account[0];
            console.log("Miscellaneous_Account ", Miscellaneous_Account[0])
        }


        //Select Date 1
        let date_1 = ''
        if (UDFDate_1 == '' || UDFDate_1 == null) {

            date_1 = '';
        } else {

            date_1 = Moment(UDFDate_1).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date1 ", date_1);
        }

        //Select Date 2
        let date_2 = ''
        if (UDFDate_2 == '' || UDFDate_2 == null) {

            date_2 = '';
        } else {

            date_2 = Moment(UDFDate_2).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date2 ", date_2);
        }

        //Select Date 3
        let date_3 = ''
        if (UDFDate_3 == '' || UDFDate_3 == null) {

            date_3 = '';
        } else {

            date_3 = Moment(UDFDate_3).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date3 ", date_3);
        }

        //Select Date 4
        let date_4 = ''
        if (UDFDate_4 == '' || UDFDate_4 == null) {

            date_4 = '';
        } else {

            date_4 = Moment(UDFDate_4).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date4 ", date_4);
        }

        //Select Date 5
        let date_5 = ''
        if (UDFDate_5 == '' || UDFDate_5 == null) {

            date_5 = '';
        } else {

            date_5 = Moment(UDFDate_5).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date5 ", date_5);
        }



    var json_workorder ={


        "site_cd": site_ID,
      
        "wko_mst_wo_no": WorkOrderNo.trim(),
        "wko_mst_assetno":setAsset_No.trim(),
        "wko_mst_status":setStatus.trim(),
        "wko_mst_asset_status":setAsset_Status.trim(),
        "wko_mst_plan_priority":setPlan_Priority.trim(),
        "wko_mst_asset_group_code":setAsset_Group_Code.trim(),
        "wko_mst_org_date":date_of_origination,
        "wko_mst_chg_costcenter":Charge_Cost_Center[0].trim(),
        "wko_mst_due_date":date_of_due,
        "wko_mst_work_area":setWork_Area.trim(),
        "wko_mst_originator":setOriginator.trim(),
        "wko_mst_asset_level":setAsset_Level.trim(),
        "wko_mst_phone":Phone.trim(),
        "wko_mst_asset_location":setAsset_Location.trim(),
        "wko_mst_flt_code":Fault_Code[0].trim(),
        "wko_mst_descs":Description.trim(),


        "wko_mst_project_id":setProject_ID.trim(),
        "wko_mst_orig_priority":Original_Periority[0].trim(),
        "wko_det_corr_action":CorrectiveAction.trim(),
        "wko_det_cause_code":setCause_Code.trim(),
        "wko_det_sched_date":date_of_schedule,
        "wko_det_act_code":setAction_Code.trim(),
        "wko_det_exc_date":date_of_exception,
        "wko_det_delay_cd":setDelay_Code.trim(),
        "wko_det_sc_date":date_of_status_change,
        "wko_det_work_type":Work_Type[0].trim(),
        "wko_det_cmpl_date":date_of_completion,
        "wko_det_work_class":setWork_Class.trim(),
        "wko_det_clo_date":date_of_close,
        "wko_det_work_grp":Work_Group[0].trim(),
        "wko_det_supv_id":setSupervisor_ID.trim(),
        "wko_det_planner":setPlanner.trim(),
        "wko_det_approver":setApprover.trim(),
        "wko_det_assign_to":setAssign_To.trim(),
        "wko_det_perm_id":Permanent_ID,
        "wko_det_temp_asset":CheckBox_Temporary_Asset,
        "wko_det_approved":CheckBox_Approved,
        "wko_det_safety":CheckBox_Safety,


        "wko_det_customer_cd":setCustomer_Code.trim(),
        "wko_det_laccount":setLabor_Account.trim(),
        "wko_det_maccount":setMaterial_Account.trim(),
        "wko_det_crd_costcenter":setCredit_Cost_Center.trim(),
        "wko_det_caccount":setContract_Account.trim(),
        "wko_det_saccount":setMiscellaneous_Account.trim(),     
                

        "wko_det_note1":UDFNote1,
        "wko_det_varchar1":UDFText_1,
        "wko_det_varchar2":UDFText_2,
        "wko_det_varchar3":UDFText_3,
        "wko_det_varchar4":UDFText_4,
        "wko_det_varchar5":UDFText_5,
        "wko_det_varchar6":UDFText_6,
        "wko_det_varchar7":UDFText_7,
        "wko_det_varchar8":UDFText_8,
        "wko_det_varchar9":UDFText_9,
        "wko_det_varchar10":UDFText_10,

        "wko_det_numeric1":UDFNumber_1.trim(),
        "wko_det_numeric2":UDFNumber_2.trim(),
        "wko_det_numeric3":UDFNumber_3.trim(),
        "wko_det_numeric4":UDFNumber_4.trim(),
        "wko_det_numeric5":UDFNumber_5.trim(),
       
        "wko_det_datetime1":date_1,
        "wko_det_datetime2":date_2,
        "wko_det_datetime3":date_3,
        "wko_det_datetime4":date_4,
        "wko_det_datetime5":date_5,
       

        "asset_type_ID":AutoNumring.trim(),

        "audit_user":emp_mst_login_id.trim(),
        "wko_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "wko_mst_create_date":get_date,
        "cnt_mst_numbering":AutoNumring,
        
    }

    console.log(JSON.stringify(json_workorder))

    APIServices.insert_new_workorder(JSON.stringify(json_workorder)).then((responseJson)=>{
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
          title: 'Oops get_WorkOrder_select...',
          text: e,          
        })
      });

  }

  
    const Update_WorkOrder = () => {

    //Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
    //Swal.showLoading();


    let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');

    let site_ID = localStorage.getItem("site_ID");
    let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
    let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");
    
    let RowID = localStorage.getItem("RowID");
    console.log('get RowID here...',location.state.RowID);



        //Select WorkOrderNo
        console.log("WorkOrderNo: ", WorkOrderNo)

        //Select Asset No
        let Asset_No, setAsset_No;
        if(selected_Asset_No == '' || selected_Asset_No == null){

            setAsset_No=''
        }else{

            Asset_No = selected_Asset_No.label.split(":")
            setAsset_No = Asset_No[0];
            console.log("Asset_No ", Asset_No[0])
        }

        //Select Status
        let Status, setStatus;
        if(selected_Status.label == '' || selected_Status.label == null){

            setStatus=''
        }else{

            Status = selected_Status.label.split(":")
            setStatus = Status[0];
            console.log("Status: ", Status[0])
        }

        //Select Asset Status
        let Asset_Status, setAsset_Status;
        if(selected_Asset_Status.label == '' || selected_Asset_Status.label == null){

            setAsset_Status=''
        }else{

            Asset_Status = selected_Asset_Status.label.split(":")
            setAsset_Status = Asset_Status[0];
            console.log("Asset_Status ", Asset_Status[0])
        }

        //Select Plan Priority
        let Plan_Priority, setPlan_Priority;
        if(selected_Plan_Priority.label == '' || selected_Plan_Priority.label == null){

            setPlan_Priority=''
        }else{

            Plan_Priority = selected_Plan_Priority.label.split(":")
            setPlan_Priority = Plan_Priority[0];
            console.log("Plan_Priority ", Plan_Priority[0])
        }

        //Select Asset Group Code
        let Asset_Group_Code, setAsset_Group_Code;
        if(selected_Asset_Group_Code == '' || selected_Asset_Group_Code == null){

            setAsset_Group_Code=''
        }else{

            Asset_Group_Code = selected_Asset_Group_Code.label.split(":")
            setAsset_Group_Code = Asset_Group_Code[0];
            console.log("Asset_Group_Code ", Asset_Group_Code[0])
        }
        
        //Select Origination Date
        let date_of_origination = ''
        if (OriginationDate == '' || OriginationDate == null) {

            date_of_origination = '';
        } else {

            date_of_origination = Moment(OriginationDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("OD ", date_of_origination);
        }

        //Select Charge Cost Center
        let Charge_Cost_Center, setCharge_Cost_Center;
        if(selected_Charge_Cost_Center.label == '' || selected_Charge_Cost_Center.label == null){

            setCharge_Cost_Center=''
        }else{

            Charge_Cost_Center = selected_Charge_Cost_Center.label.split(":")
            setCharge_Cost_Center = Charge_Cost_Center[0];
            console.log("Charge_Cost_Center: ", Charge_Cost_Center[0])
        }

        //Select Due Date
        let date_of_due = ''
        if (DueDate == '' || DueDate == null) {

            date_of_due = '';
        } else {

            date_of_due = Moment(DueDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DD ", date_of_due);
        }

        //Select Work Area
        let Work_Area, setWork_Area;
        if(selected_Work_Area == '' || selected_Work_Area == null){

            setWork_Area=''
        }else{

            Work_Area = selected_Work_Area.label.split(":")
            setWork_Area = Work_Area[0];
            console.log("Work_Area ", Work_Area[0])
        }

        //Select Originator
        let Originator, setOriginator;
        if(selected_Originator.label == '' || selected_Originator.label == null){

            setOriginator=''
        }else{

            Originator = selected_Originator.label.split(":")
            setOriginator = Originator[0];
            console.log("Originator ", Originator[0])
        }

        //Select Asset Level
        let Asset_Level, setAsset_Level;
        if(selected_Asset_Level == '' || selected_Asset_Level == null){

            setAsset_Level=''
        }else{

            Asset_Level = selected_Asset_Level.label.split(":")
            setAsset_Level = Asset_Level[0];
            console.log("Asset_Level ", Asset_Level[0])
        }

        //Select Phone
        console.log("Phone: ", Phone)
        
        //Select Asset Location
        let Asset_Location, setAsset_Location;
        if(selected_Asset_Location == '' || selected_Asset_Location == null){

            setAsset_Location=''
        }else{

            Asset_Location = selected_Asset_Location.label.split(":")
            setAsset_Location = Asset_Location[0];
            console.log("Asset_Location ", Asset_Location[0])
        }

        //Select Fault Code
        let Fault_Code = selected_Fault_Code.label.split(":")
        console.log("Fault_Code: ", Fault_Code[0])

        //Select Description
        console.log("Description: ", Description)



        //Select Corrective Action
        console.log("CorrectiveAction: ", CorrectiveAction)

        //Select Project ID
        let Project_ID, setProject_ID;

        console.log('Project_ID', selected_Project_ID.label)
        if(selected_Project_ID.label == '' || selected_Project_ID.label == null){

            setProject_ID=''
        }else{

            Project_ID = selected_Project_ID.label.split(":")
            setProject_ID = Project_ID[0];
            console.log("Project_ID ", Project_ID[0])
        }

        //Select Original Periority
        let Original_Periority, setOriginal_Periority;
        if(selected_Original_Periority == '' || selected_Original_Periority == null){

            setOriginal_Periority =''
        }else{

            Original_Periority = selected_Original_Periority.label.split(":")
            setOriginal_Periority = Original_Periority[0];
            console.log("Original_Periority ", Original_Periority[0])
        }

        //Select Cause Code
        let Cause_Code, setCause_Code;
        if(selected_Cause_Code.label == '' || selected_Cause_Code.label == null){

            setCause_Code=''
        }else{

            Cause_Code = selected_Cause_Code.label.split(":")
            setCause_Code = Cause_Code[0];
            console.log("Cause_Code ", Cause_Code[0])
        }

        //Select Schedule Date
        let date_of_schedule = ''
        if (ScheduleDate == '' || ScheduleDate == null) {

            date_of_schedule = '';
        } else {

            date_of_schedule = Moment(ScheduleDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("SD ", date_of_schedule);
        }

        //Select Action Code
        let Action_Code, setAction_Code;
        if(selected_Action_Code.label == '' || selected_Action_Code.label == null){

            setAction_Code=''
        }else{

            Action_Code = selected_Action_Code.label.split(":")
            setAction_Code = Action_Code[0];
            console.log("Action_Code ", Action_Code[0])
        }

        //Select Exception Date
        let date_of_exception = ''
        if (ExceptionDate == '' || ExceptionDate == null) {

            date_of_exception = '';
        } else {

            date_of_exception = Moment(ExceptionDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("EB ", date_of_exception);
        }

        //Select Delay Code
        let Delay_Code, setDelay_Code;
        if(selected_Delay_Code.label == '' || selected_Delay_Code.label == null){

            setDelay_Code=''
        }else{

            Delay_Code = selected_Delay_Code.label.split(":")
            setDelay_Code = Delay_Code[0];
            console.log("Delay_Code ", Delay_Code[0])
        }

        //Select Status Change Date
        let date_of_status_change = ''
        if (StatusChangeDate == '' || StatusChangeDate == null) {

            date_of_status_change = '';
        } else {

            date_of_status_change = Moment(StatusChangeDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("SCB ", date_of_status_change);
        }

        //Select Work Type
        let Work_Type, setWork_Type;
        if(selected_Work_Type.label == '' || selected_Work_Type.label == null){

            setWork_Type =''
        }else{

            Work_Type = selected_Work_Type.label.split(":")
            setWork_Type = Work_Type[0];
            console.log("Work_Type ", Work_Type[0])
        }

         //Select Completion Date
         let date_of_completion = ''
         if (CompletionDate == '' || CompletionDate == null) {
 
            date_of_completion = '';
         } else {
 
            date_of_completion = Moment(CompletionDate).format('yyyy-MM-DD HH:mm:ss').trim();
             console.log("CD ", date_of_completion);
         }

        //Select Work Class
        let Work_Class, setWork_Class;
        if(selected_Work_Class.label == '' || selected_Work_Class.label == null){

            setWork_Class=''
        }else{

            Work_Class = selected_Work_Class.label.split(":")
            setWork_Class = Work_Class[0];
            console.log("Work_Class ", Work_Class[0])
        }

        //Select Close Date
        let date_of_close = ''
        if (CloseDate == '' || CloseDate == null) {

            date_of_close = '';
        } else {

            date_of_close = Moment(CloseDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("CLOD ", date_of_close);
        }

        //Select Work Group
        let Work_Group, setWork_Group;
        if(selected_Work_Group.label == '' || selected_Work_Group.label == null){

            setWork_Group =''
        }else{

            Work_Group = selected_Work_Group.label.split(":")
            setWork_Group = Work_Group[0];
            console.log("Work_Group ", Work_Group[0])
        }

        //Select Supervisor ID
        let Supervisor_ID, setSupervisor_ID;
        if(selected_Supervisor_ID.label == '' || selected_Supervisor_ID.label == null){

            setSupervisor_ID=''
        }else{

            Supervisor_ID = selected_Supervisor_ID.label.split(":")
            setSupervisor_ID = Supervisor_ID[0];
            console.log("Supervisor_ID ", Supervisor_ID[0])
        }

        //Select Planner
        let Planner, setPlanner;
        if(selected_Planner.label == '' || selected_Planner.label == null){

            setPlanner=''
        }else{

            Planner = selected_Planner.label.split(":")
            setPlanner = Planner[0];
            console.log("Planner ", Planner[0])
        }

        //Select Approver
        let Approver, setApprover;
        if(selected_Approver.label == '' || selected_Approver.label == null){

            setApprover=''
        }else{

            Approver = selected_Approver.label.split(":")
            setApprover = Approver[0];
            console.log("Approver ", Approver[0])
        }

        //Select Assign To
        let Assign_To, setAssign_To;
        if(selected_Assign_To.label == '' || selected_Assign_To.label == null){

            setAssign_To=''
        }else{

            Assign_To = selected_Assign_To.label.split(":")
            setAssign_To = Assign_To[0];
            console.log("Assign_To ", Assign_To[0])
        }

        //Select Permanent ID
        console.log("Perm_ID: ", Permanent_ID)


        //Select WKO Customer Code
        let Customer_Code, setCustomer_Code;
        if(selected_Customer_Code.label == '' || selected_Customer_Code.label == null){

            setCustomer_Code=''
        }else{

            Customer_Code = selected_Customer_Code.label.split(":")
            setCustomer_Code = Customer_Code[0];
            console.log("Customer_Code ", Customer_Code[0])
        }

        //Select WKO Labor Account
        let Labor_Account, setLabor_Account;
        if(selected_Labor_Account.label == '' || selected_Labor_Account.label == null){

            setLabor_Account=''
        }else{

            Labor_Account = selected_Labor_Account.label.split(":")
            setLabor_Account = Labor_Account[0];
            console.log("Labor_Account ", Labor_Account[0])
        }

        //Select WKO Material Account
        let Material_Account, setMaterial_Account;
        if(selected_Material_Account.label == '' || selected_Material_Account.label == null){

            setMaterial_Account=''
        }else{

            Material_Account = selected_Material_Account.label.split(":")
            setMaterial_Account = Material_Account[0];
            console.log("Material_Account ", Material_Account[0])
        }

        //Select WKO Credit Cost Center
        let Credit_Cost_Center, setCredit_Cost_Center;
        if(selected_Credit_Cost_Center.label == '' || selected_Credit_Cost_Center.label == null){

            setCredit_Cost_Center=''
        }else{

            Credit_Cost_Center = selected_Credit_Cost_Center.label.split(":")
            setCredit_Cost_Center = Credit_Cost_Center[0];
            console.log("Credit_Cost_Center ", Credit_Cost_Center[0])
        }

        //Select WKO Contract Account
        let Contract_Account, setContract_Account;
        if(selected_Contract_Account.label == '' || selected_Contract_Account.label == null){

            setContract_Account=''
        }else{

            Contract_Account = selected_Contract_Account.label.split(":")
            setContract_Account = Contract_Account[0];
            console.log("Contract_Account ", Contract_Account[0])
        }

        //Select WKO Miscellaneous Account
        let Miscellaneous_Account, setMiscellaneous_Account;
        if(selected_Miscellaneous_Account.label == '' || selected_Miscellaneous_Account.label == null){

            setMiscellaneous_Account=''
        }else{

            Miscellaneous_Account = selected_Miscellaneous_Account.label.split(":")
            setMiscellaneous_Account = Miscellaneous_Account[0];
            console.log("Miscellaneous_Account ", Miscellaneous_Account[0])
        }


        //Select Date 1
        let date_1 = ''
        if (UDFDate_1 == '' || UDFDate_1 == null) {

            date_1 = '';
        } else {

            date_1 = Moment(UDFDate_1).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date1 ", date_1);
        }

        //Select Date 2
        let date_2 = ''
        if (UDFDate_2 == '' || UDFDate_2 == null) {

            date_2 = '';
        } else {

            date_2 = Moment(UDFDate_2).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date2 ", date_2);
        }

        //Select Date 3
        let date_3 = ''
        if (UDFDate_3 == '' || UDFDate_3 == null) {

            date_3 = '';
        } else {

            date_3 = Moment(UDFDate_3).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date3 ", date_3);
        }

        //Select Date 4
        let date_4 = ''
        if (UDFDate_4 == '' || UDFDate_4 == null) {

            date_4 = '';
        } else {

            date_4 = Moment(UDFDate_4).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date4 ", date_4);
        }

        //Select Date 5
        let date_5 = ''
        if (UDFDate_5 == '' || UDFDate_5 == null) {

            date_5 = '';
        } else {

            date_5 = Moment(UDFDate_5).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("Date5 ", date_5);
        }



    var json_workorder ={


        "site_cd": site_ID,
      
        "wko_mst_wo_no": WorkOrderNo.trim(),
        "wko_mst_assetno":setAsset_No.trim(),
        "wko_mst_status":setStatus.trim(),
        "wko_mst_asset_status":setAsset_Status.trim(),
        "wko_mst_plan_priority":setPlan_Priority.trim(),
        "wko_mst_asset_group_code":setAsset_Group_Code.trim(),
        "wko_mst_org_date":date_of_origination,
        "wko_mst_chg_costcenter":Charge_Cost_Center[0].trim(),
        "wko_mst_due_date":date_of_due,
        "wko_mst_work_area":setWork_Area.trim(),
        "wko_mst_originator":setOriginator.trim(),
        "wko_mst_asset_level":setAsset_Level.trim(),
        "wko_mst_phone":Phone.trim(),
        "wko_mst_asset_location":setAsset_Location.trim(),
        "wko_mst_flt_code":Fault_Code[0].trim(),
        "wko_mst_descs":Description.trim(),
       

        "wko_det_corr_action":CorrectiveAction,
        "wko_mst_project_id":setProject_ID.trim(),
        "wko_mst_orig_priority":Original_Periority[0].trim(),
        "wko_det_cause_code":setCause_Code.trim(),
        "wko_det_sched_date":date_of_schedule,
        "wko_det_act_code":setAction_Code.trim(),
        "wko_det_exc_date":date_of_exception,
        "wko_det_delay_cd":setDelay_Code.trim(),
        "wko_det_sc_date":date_of_status_change,
        "wko_det_work_type":Work_Type[0].trim(),
        "wko_det_cmpl_date":date_of_completion,
        "wko_det_work_class":setWork_Class.trim(),
        "wko_det_clo_date":date_of_close,
        "wko_det_work_grp":Work_Group[0].trim(),
        "wko_det_supv_id":setSupervisor_ID.trim(),
        "wko_det_planner":setPlanner.trim(),
        "wko_det_approver":setApprover.trim(),
        "wko_det_assign_to":setAssign_To.trim(),
        "wko_det_perm_id":Permanent_ID,
        "wko_det_temp_asset":CheckBox_Temporary_Asset,
        "wko_det_approved":CheckBox_Approved,
        "wko_det_safety":CheckBox_Safety,


        "wko_det_customer_cd":setCustomer_Code.trim(),
        "wko_det_laccount":setLabor_Account.trim(),
        "wko_det_maccount":setMaterial_Account.trim(),
        "wko_det_crd_costcenter":setCredit_Cost_Center.trim(),
        "wko_det_caccount":setContract_Account.trim(),
        "wko_det_saccount":setMiscellaneous_Account.trim(),            


        "wko_det_note1":UDFNote1,
        "wko_det_varchar1":UDFText_1,
        "wko_det_varchar2":UDFText_2,
        "wko_det_varchar3":UDFText_3,
        "wko_det_varchar4":UDFText_4,
        "wko_det_varchar5":UDFText_5,
        "wko_det_varchar6":UDFText_6,
        "wko_det_varchar7":UDFText_7,
        "wko_det_varchar8":UDFText_8,
        "wko_det_varchar9":UDFText_9,
        "wko_det_varchar10":UDFText_10,

        "wko_det_numeric1":UDFNumber_1,
        "wko_det_numeric2":UDFNumber_2,
        "wko_det_numeric3":UDFNumber_3,
        "wko_det_numeric4":UDFNumber_4,
        "wko_det_numeric5":UDFNumber_5,
       
        "wko_det_datetime1":date_1,
        "wko_det_datetime2":date_2,
        "wko_det_datetime3":date_3,
        "wko_det_datetime4":date_4,
        "wko_det_datetime5":date_5,
       

        "asset_type_ID":AutoNumring.trim(),

        "audit_user":emp_mst_login_id.trim(),
        "wko_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "wko_mst_create_date":get_date,
     
        
        "RowID":location.state.RowID,

        
    }

    console.log("Update : "+JSON.stringify(json_workorder))

    APIServices.update_workorder(JSON.stringify(json_workorder)).then((responseJson)=>{
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
          title: 'Oops get_WorkOrder_select...',
          text: e,          
        })
      });


  }

  
    const resetData = () => {

        setSelected_Asset_No(0);
        setSelected_Status(0);
        setSelected_Asset_Status(0);
        setSelected_Plan_Priority(0);
        setSelected_Asset_Group_Code(0);
    
        setSelected_Charge_Cost_Center(0);

        setSelected_Work_Area(0);
        setSelected_Originator(0);
        setSelected_Asset_Level(0);
        setPhone('');
        setSelected_Asset_Location(0);
        setSelected_Fault_Code(0);
        setDescription('');

        setCorrectiveAction('');
        setSelected_Project_ID(0);
        setSelected_Original_Periority(0);
        setSelected_Cause_Code(0);
        setScheduleDate('');
        setSelected_Action_Code(0);
        setExceptionDate('');
        setSelected_Delay_Code(0);
        setStatusChangeDate('');
        setSelected_Work_Type(0);
        setCompletionDate('');
        setSelected_Work_Class(0);
        setCloseDate('');
        setSelected_Work_Group(0);
        setSelected_Supervisor_ID(0);
        setTemporary_Asset('');
        setSelected_Planner(0);
        setApproved('');
        setSelected_Approver(0);
        setSelected_Assign_To(0);
        setSafety('');
        setPermanent_ID('');

        setSelected_Customer_Code(0);
        setSelected_Labor_Account(0);
        setSelected_Material_Account(0);
        setSelected_Credit_Cost_Center(0);
        setSelected_Contract_Account(0);
        setSelected_Miscellaneous_Account(0);
        
        setUDFNote1('');
        setUDFText_1('');
        setUDFText_2('');
        setUDFText_3('');
        setUDFText_4('');
        setUDFText_5('');
        setUDFText_6('');
        setUDFText_7('');
        setUDFText_8('');
        setUDFText_9('');
        setUDFText_10('');
        setUDFNumber_1('');
        setUDFNumber_2('');
        setUDFNumber_3('');
        setUDFNumber_4('');
        setUDFNumber_5('');
        setUDFDate_1('');
        setUDFDate_2('');
        setUDFDate_3('');
        setUDFDate_4('');
        setUDFDate_5('');

        setButton_save('Save');
    }
  

    const handleOnChangeTemporaryAsset = () => {
    setTemporary_Asset(!Temporary_Asset);
    
    if(!Temporary_Asset){
        console.log('1')
        setCheckBox_Temporary_Asset('1')
    }else{
        console.log('0')
        setCheckBox_Temporary_Asset('0')
    }
    }

    const handleOnChangeApproved = () => {
    setApproved(!Approved);

    if(!Approved){
        console.log('1')
        setCheckBox_Approved('1')
    }else{
        console.log('0')
        setCheckBox_Approved('0')
    }
    }

    const handleOnChangeSafety = () => {
    setSafety(!Safety);

    if(!Safety){
        console.log('1')
        setCheckBox_Safety('1')
    }else{
        console.log('0')
        setCheckBox_Safety('0')
    }
    }


    const get_assetmaster_select = (selected_asset)=>{

        let site_ID = localStorage.getItem("site_ID");
        
        var json ={

            "site_cd": site_ID,
            "ast_mst_asset_no": selected_asset,
            "asset_shortdesc":"",
            "cost_center":"",
            "asset_status":"",
            "asset_type":"",
            "asset_grpcode":"",
            "work_area":"",
            "asset_locn":"",
            "asset_code":"",
            "ast_lvl":"",
            "ast_sts_typ_cd":"",
            "createby":"",
            "service_type":"",
            "block":"",
            "floor":""
        }

        console.log('select Asset',json)
        
        APIServices.get_assetmaster_select(JSON.stringify(json)).then((responseJson)=>{   
            
            console.log('select Asset',responseJson)

            if (responseJson.data.status === 'SUCCESS') {             
               
               for (var index in responseJson.data.data) {

                setRowID(responseJson.data.data[index].RowID)
                console.log('select Asset',responseJson.data.data[index].ast_mst_asset_no )
                
                setSelected_Asset_No( {label:responseJson.data.data[index].ast_mst_asset_no} )
                setSelected_Asset_Status({label:responseJson.data.data[index].ast_mst_asset_status } )
                setSelected_Asset_Group_Code( responseJson.data.data[index].ast_mst_asset_grpcode+" : "+ responseJson.data.data[index]. ast_grp_desc )
                setSelected_Charge_Cost_Center( {label:responseJson.data.data[index].ast_mst_cost_center +" : "+ responseJson.data.data[index].descs})
                setSelected_Work_Area( {label:responseJson.data.data[index].ast_mst_work_area +" : "+ responseJson.data.data[index].mst_war_desc} )
                setSelected_Asset_Level({ label:responseJson.data.data[index].ast_mst_ast_lvl +" : "+ responseJson.data.data[index].ast_lvl_desc})
                setSelected_Asset_Location( {label:responseJson.data.data[index].ast_mst_asset_locn +" : "+ responseJson.data.data[index].ast_loc_desc})
                setSelected_Work_Group( {label:responseJson.data.data[index].ast_mst_wrk_grp+" : "+ responseJson.data.data[index].wrk_grp_desc })

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
              title: 'Oops get_assetmaster_select...',
              text: e,          
            })
          });

    }


    const handleSelectedAssetNo = (selectedOption) => {
        console.log(selectedOption)

        get_assetmaster_select(selectedOption.value);

        //setSelected_Asset_No(selectedOption);
        setSelected_Status(Status[0]);
        setSelected_Asset_Status(Asset_Status[0]);
        setSelected_Asset_Group_Code(Asset_Group_Code[0]);
        setSelected_Charge_Cost_Center(Charge_Cost_Center[0]);
        setSelected_Work_Area(Work_Area[0]);
        setSelected_Asset_Level(Asset_Level[0]);
        setSelected_Asset_Location(Asset_Location[0]);
    }

    const handleSelectedFaultCode = (selectedOption) => {
        setSelected_Fault_Code(selectedOption);

        console.log(selectedOption.value);
        setDescription(selectedOption.value);
    }







  return (   

        <div>
            <div className="page-header">
            <h3 className="page-title">Work Order Master</h3>   

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <div className="template-demo">

                        <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                            <i className="mdi mdi-file-check btn-icon-prepend" ></i>  {Button_save}
                        </button>

                        <button type="button" className="btn btn-danger btn-icon-text">
                            <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i> Cancel 
                        </button>
                    
                    </div>
                </ol>
            </nav>       
        
        </div> 

    <div className="col-12 grid-margin">
        <div className="card">
            <div className="card-body"> 
            <form className="form-sample" validated={validated}>  

                    
                    
                <div className="row">

                    <div className="col-md-10">

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_WorkOrderNo">
                                    <label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Work Order No:</label>
                                    <div className="col-sm-8">
                                            <Form.Control style={{ fontSize: "13px" }} type="text" value={WorkOrderNo} onChange={(e) => setWorkOrderNo(e.target.value)}  disabled={WorkOrderNo_disabled}/>
                                        </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">                                
                                <Form.Group className="row" controlId="validation_Asset_No">
                                    <Form.Label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset No:</Form.Label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Asset_No}
                                            value={selected_Asset_No}
                                            onChange={handleSelectedAssetNo} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Status">                                  
                                    <Form.Label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Status:</Form.Label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Status}
                                            value={selected_Status}
                                            onChange={setSelected_Status}// using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                    
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Asset_Status"> 
                                    <label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Asset Status:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Asset_Status}
                                            value={selected_Asset_Status}
                                            onChange={setSelected_Asset_Status} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>  
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Plan_Priority">
                                    <label className="col-sm-4 col-form-label">Plan Periority:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Plan_Priority}
                                            value={selected_Plan_Priority}
                                            onChange={setSelected_Plan_Priority} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>                        
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Asset_Group_Code">
                                    <label className="col-sm-4 col-form-label">Asset Group Code:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Asset_Group_Code}
                                            value={selected_Asset_Group_Code}
                                            onChange={setSelected_Asset_Group_Code} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>  
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_OriginationDate">
                                    <label className="col-sm-4 col-form-label">Origination Date:</label>
                                    <div className="col-sm-8">
                                                <Form.Control
                                                type="datetime-local"  
                                                value={OriginationDate} 
                                                onChange={(date) => setOriginationDate(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                style={{ fontSize: "13px" }}
                                                /> 
                                            </div>
                                </Form.Group>
                            </div> 

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Charge_Cost_Center">
                                    <label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Charge Cost Center:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Charge_Cost_Center}
                                            value={selected_Charge_Cost_Center}
                                            onChange={setSelected_Charge_Cost_Center} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">                         
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_DueDate">
                                    <label className="col-sm-4 col-form-label">Due Date:</label>
                                    <div className="col-sm-8">
                                            <Form.Control
                                            type="datetime-local"
                                            value ={DueDate} 
                                            onChange={date => setDueDate(Moment().utcOffset('+08:00').format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                            style={{ fontSize: "13px" }}
                                            />
                                        </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Work_Area">
                                    <label className="col-sm-4 col-form-label">Work Area:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Work_Area}
                                            value={selected_Work_Area}
                                            onChange={setSelected_Work_Area} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>  

                        <div className="row">                 
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Originator">
                                    <label className="col-sm-4 col-form-label">Originator:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Originator}
                                            value={selected_Originator}
                                            onChange={setSelected_Originator} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>  

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Asset_Level">
                                    <label className="col-sm-4 col-form-label">Asset Level:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Asset_Level}
                                            value={selected_Asset_Level}
                                            onChange={setSelected_Asset_Level} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>  

                        <div className="row">                        
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Phone">
                                    <label className="col-sm-4 col-form-label">Phone:</label>
                                    <div className="col-sm-8">
                                        <Form.Control style={{ fontSize: "13px" }} type="number" value={Phone} onChange={(e) => setPhone(e.target.value)}/>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Asset_Location">
                                    <label className="col-sm-4 col-form-label">Asset Location:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Asset_Location}
                                            value={selected_Asset_Location}
                                            onChange={setSelected_Asset_Location} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>  

                        <div className="row">             
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Fault_Code">
                                    <label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Fault Code:</label>
                                    <div className="col-sm-8">
                                        <Select  
                                            isClearable={true}  
                                            options={Fault_Code}
                                            value={selected_Fault_Code}
                                            onChange={handleSelectedFaultCode} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                        />
                                    </div>
                                </Form.Group>
                            </div>  

                            <div className="col-md-3">
                                <Form.Group className="row" controlId="validation_CreatedBy">
                                    <label className="col-sm-6 col-form-label"><span style={{color: "blue"}} class="required-asterisk"> Created By: </span></label>
                                </Form.Group>
                            </div>

                            <div className="col-md-3">
                                <Form.Group className="row" controlId="validation_CreatedDate">
                                    <label className="col-sm-6 col-form-label"><span style={{color: "blue"}} class="required-asterisk"> Created Date: </span></label>
                                </Form.Group>
                            </div>
                        </div>  

                        <div className="row">
                            <div className="col-md-12">
                                <Form.Group className="row" controlId="validation_Description">
                                    <label className="col-sm-2 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Description:</label>
                                    <div className="col-sm-10">
                                    <Form.Control 
                                        style={{ fontSize: "13px" }}
                                        as="textarea" 
                                        rows={12} 
                                        value={Description}
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            setDescription(e.target.value);
                                          }}
                                    />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>        

                    </div>

                {/* ************************************* img ******************************************* */}

                    <div className="col-md-2">

                        <div className="row">

                            <AliceCarousel 
                                autoPlay 
                                autoPlayInterval="3000"  
                                animationDuration={1000}
                                animationType="fadeout"
                                infinite
                                touchTracking={false}
                                disableDotsControls
                                >
                                <img src={require("../../assets/images/product_images_2/thumb_image1.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image2.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image3.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image4.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image5.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image6.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image7.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image8.jpg")} className="sliderimg" alt=""/>                                    
                                <img src={require("../../assets/images/product_images_2/thumb_image9.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image10.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image11.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image12.jpg")} className="sliderimg" alt=""/>
                                
                                </AliceCarousel>
                                
                        </div>

                    </div>
                    
                </div>  

                <section id="tab-menus">

                    <Tabs defaultActiveKey="Details" id="uncontrolled-tab-example" className="mb-4">


                        {/* ************************************* Details **************************************** */}

                        <Tab eventKey="Details" title="Details" class="nav-link active">
                            
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Form.Group className="row">
                                                <label className="col-sm-2 col-form-label">Corrective Action:</label>
                                                <div className="col-sm-10">
                                                <Form.Control 
                                                    style={{ fontSize: "13px" }}
                                                    as="textarea" 
                                                    rows={12} 
                                                    value={CorrectiveAction}
                                                    onChange={(e) => setCorrectiveAction(e.target.value)}
                                                />
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>  

                                    <div className="row">                      
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Project ID:</label>
                                                <div className="col-sm-8">
                                                    <Select  
                                                        isClearable={true}  
                                                        options={Project_ID}
                                                        value={selected_Project_ID}
                                                        onChange={setSelected_Project_ID} // using id as it is unique
                                                        required
                                                        styles={{ 
                                                            control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                            singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                          }}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_AssetStatus">
                                                <label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Original Periority:</label>
                                                <div className="col-sm-8">
                                                    <Select  
                                                        isClearable={true}  
                                                        options={Original_Periority}
                                                        value={selected_Original_Periority}
                                                        onChange={setSelected_Original_Periority} // using id as it is unique
                                                        required
                                                        styles={{ 
                                                            control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                            singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                          }}
                                                    />
                                                </div>
                                            </Form.Group>                        
                                        </div>
                                    </div>  

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Cause Code:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                   isClearable={true}  
                                                   options={Cause_Code}
                                                   value={selected_Cause_Code}
                                                   onChange={setSelected_Cause_Code} // using id as it is unique
                                                   required
                                                   styles={{ 
                                                    control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                    singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                  }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Schedule Date:</label>
                                                <div className="col-sm-8">
                                                <Form.Control  
                                                    style={{ fontSize: "13px" }}                                          
                                                    type="datetime-local"  
                                                    value={ScheduleDate} 
                                                    onChange={(e) => setScheduleDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                    /> 
                                                </div>
                                            </Form.Group>
                                        </div>  
                                    </div> 

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Action Code:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Action_Code}
                                                    value={selected_Action_Code}
                                                    onChange={setSelected_Action_Code} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Exception Date:</label>
                                                <div className="col-sm-8">
                                                <Form.Control       
                                                    style={{ fontSize: "13px" }}                                     
                                                    type="datetime-local"  
                                                    value={ExceptionDate} 
                                                    onChange={(e) => setExceptionDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                    /> 
                                                </div>
                                            </Form.Group>
                                        </div>  
                                    </div>  

                                    <div className='row'>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Delay Code:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                     isClearable={true}  
                                                     options={Delay_Code}
                                                     value={selected_Delay_Code}
                                                     onChange={setSelected_Delay_Code} // using id as it is unique
                                                     required
                                                     styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Status Change Date:</label>
                                                <div className="col-sm-8">
                                                <Form.Control 
                                                    style={{ fontSize: "13px" }}                                           
                                                    type="datetime-local"  
                                                    value={StatusChangeDate} 
                                                    onChange={(e) => setStatusChangeDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                    /> 
                                                </div>
                                            </Form.Group>
                                        </div>   
                                    </div>

                                    <div className='row'>                           
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Work Type:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Work_Type}
                                                    value={selected_Work_Type}
                                                    onChange={setSelected_Work_Type} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Completion Date:</label>
                                                <div className="col-sm-8">
                                                <Form.Control    
                                                    style={{ fontSize: "13px" }}                                        
                                                    type="datetime-local"  
                                                    value={CompletionDate} 
                                                    onChange={(e) => setCompletionDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                    /> 
                                                </div>
                                            </Form.Group>
                                        </div>                                    
                                    </div>

                                    <div className='row'>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Work Permit Type:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Work_Class}
                                                    value={selected_Work_Class}
                                                    onChange={setSelected_Work_Class} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>    

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Close Date:</label>
                                                <div className="col-sm-8">
                                                <Form.Control     
                                                    style={{ fontSize: "13px" }}                                       
                                                    type="datetime-local"  
                                                    value={CloseDate} 
                                                    onChange={(e) => setCloseDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                    /> 
                                                </div>
                                            </Form.Group>
                                        </div>     
                                    </div>

                                    <div className='row'>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Work Group:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Work_Group}
                                                    value={selected_Work_Group}
                                                    onChange={setSelected_Work_Group} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">WO Print:</label>
                                                <div className="col-sm-8"></div>
                                            </Form.Group>
                                        </div>                                          
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Supervisor ID:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Supervisor_ID}
                                                    value={selected_Supervisor_ID}
                                                    onChange={setSelected_Supervisor_ID} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Temporary Asset:</label>
                                                <div className="col-sm-4 form-check">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={Temporary_Asset}
                                                    onChange={handleOnChangeTemporaryAsset}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </Form.Group>
                                        </div> 
                                    </div>  

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Planner:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Planner}
                                                    value={selected_Planner}
                                                    onChange={setSelected_Planner} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Approved:</label>
                                                <div className="col-sm-4 form-check">
                                                <label className="form-check-label">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={Approved}
                                                    onChange={handleOnChangeApproved}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                                </div>
                                            </Form.Group>
                                            
                                        </div> 
                                    </div>  

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Approver:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Approver}
                                                    value={selected_Approver}
                                                    onChange={setSelected_Approver} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">WO Open:</label>
                                                <div className="col-sm-4 form-check">
                                                    Y
                                                </div>
                                            </Form.Group>

                                        </div> 
                                    </div>  

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Assign To:</label>
                                                <div className="col-sm-8">
                                                <Select  
                                                    isClearable={true}  
                                                    options={Assign_To}
                                                    value={selected_Assign_To}
                                                    onChange={setSelected_Assign_To} // using id as it is unique
                                                    required
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                      }}
                                                />
                                            </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Safety:</label>
                                                <div className="col-sm-4 form-check">
                                                    <label className="form-check-label">
                                                        <input type="checkbox" 
                                                        className="form-check-input"
                                                        checked={Safety}
                                                        onChange={handleOnChangeSafety}
                                                        />
                                                        <i className="input-helper"></i>
                                                    </label>
                                                </div>
                                            </Form.Group>
                                            
                                        </div> 
                                    </div>  

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Permanent ID:</label>
                                                <div className="col-sm-8">
                                                    <Form.Control style={{ fontSize: "13px" }} type="text" value={Permanent_ID} onChange={(e) => setPermanent_ID(e.target.value)}/>
                                                </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">Parent WO:</label>
                                                <div className="col-sm-6"></div>
                                            </Form.Group>
                                        </div> 
                                    </div>  

                                    <div className="row">
                                        <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-4 col-form-label">Work Request No:</label>
                                                    <div className="col-sm-8"></div>
                                                </Form.Group>
                                        </div> 

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">WR Origination Date:</label>
                                                <div className="col-sm-6"></div>
                                            </Form.Group>
                                        </div> 
                                    </div> 

                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-4 col-form-label">WR Due Date:</label>
                                                <div className="col-sm-8"></div>
                                            </Form.Group>
                                        </div> 
                                    </div> 
                
                        </Tab>


                        {/* ************************************* Financial *************************************** */}

                        <Tab eventKey="Financial" title="Financial" class="nav nav-tabs nav-item nav-link active">
                            

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-6 col-form-label">
                                        Customer Code:
                                    </label>
                                    <div className="col-sm-6">
                                            <Select  
                                                isClearable={true}  
                                                options={Customer_Code}
                                                value={selected_Customer_Code}
                                                onChange={setSelected_Customer_Code} // using id as it is unique
                                                required
                                                styles={{ 
                                                    control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                    singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                  }}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-6 col-form-label">
                                        Labor Account:
                                    </label>
                                    <div className="col-sm-6">
                                            <Select  
                                                isClearable={true}  
                                                options={Labor_Account}
                                                value={selected_Labor_Account}
                                                onChange={setSelected_Labor_Account} // using id as it is unique
                                                required
                                                styles={{ 
                                                    control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                    singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                  }}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-6 col-form-label">
                                        Material Account:
                                    </label>
                                    <div className="col-sm-6">
                                            <Select  
                                            isClearable={true}  
                                            options={Material_Account}
                                            value={selected_Material_Account}
                                            onChange={setSelected_Material_Account} // using id as it is unique
                                            required
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                              }}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-6 col-form-label">
                                        Credit Cost Center:
                                    </label>
                                    <div className="col-sm-6">
                                            <Select  
                                                isClearable={true}  
                                                options={Credit_Cost_Center}
                                                value={selected_Credit_Cost_Center}
                                                onChange={setSelected_Credit_Cost_Center} // using id as it is unique
                                                required
                                                styles={{ 
                                                    control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                    singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                  }}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-6 col-form-label">
                                        Contract Account:
                                    </label>
                                    <div className="col-sm-6">
                                            <Select  
                                                isClearable={true}  
                                                options={Contract_Account}
                                                value={selected_Contract_Account}
                                                onChange={setSelected_Contract_Account} // using id as it is unique
                                                required
                                                styles={{ 
                                                    control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                    singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                  }}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-6 col-form-label">
                                        Miscellaneous Account:
                                    </label>
                                    <div className="col-sm-6">
                                            <Select  
                                                isClearable={true}  
                                                options={Miscellaneous_Account}
                                                value={selected_Miscellaneous_Account}
                                                onChange={setSelected_Miscellaneous_Account} // using id as it is unique
                                                required
                                                styles={{ 
                                                    control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                    singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                  }}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                        </Tab>


                        {/* ************************************* UDF ******************************************* */}

                        <Tab eventKey="UDF1" title="UDF1" class="nav-link active">


                            <div className="row">
                                <div className='col'>
                                    <div className="col-md-13">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar1:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px" }}
                                                type="text"
                                                value={UDFText_1}
                                                onChange={(e) => setUDFText_1(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar2:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                type="text"
                                                value={UDFText_2}
                                                onChange={(e) => setUDFText_2(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar3:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                type="text"
                                                value={UDFText_3}
                                                onChange={(e) => setUDFText_3(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar4:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                type="text"
                                                value={UDFText_4}
                                                onChange={(e) => setUDFText_4(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar5:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                type="text"
                                                value={UDFText_5}
                                                onChange={(e) => setUDFText_5(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                    <label className="col-sm-2 col-form-label">
                                            Note1:
                                    </label>
                                    <div className="col-sm-10">
                                        <Form.Control 
                                            style={{ fontSize: "13px" }}
                                            as="textarea" 
                                            rows={26} 
                                            value={UDFNote1}
                                            onChange={(e) => setUDFNote1(e.target.value)}
                                        />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar6:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="text"
                                            value={UDFText_6}
                                            onChange={(e) => setUDFText_6(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric1:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control  
                                            style={{ fontSize: "13px" }}
                                            type="number"  
                                            placeholder=".0000" 
                                            value={UDFNumber_1} 
                                            onChange={(e) => setUDFNumber_1(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Date1:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control  
                                        style={{ fontSize: "13px" }}                                          
                                        type="datetime-local"  
                                        value={UDFDate_1} 
                                        onChange={(e) => setUDFDate_1(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Wko Det Varchar7:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="text"
                                            value={UDFText_7}
                                            onChange={(e) => setUDFText_7(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric2:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control
                                        style={{ fontSize: "13px" }}  
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_2} 
                                        onChange={(e) => setUDFNumber_2(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Date2:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="datetime-local"
                                            value={UDFDate_2} 
                                            onChange={(e) => setUDFDate_2(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date 
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Wko Det Varchar8:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="text"
                                            value={UDFText_8}
                                            onChange={(e) => setUDFText_8(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric3:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control 
                                        style={{ fontSize: "13px" }}
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_3} 
                                        onChange={(e) => setUDFNumber_3(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Date3:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="datetime-local"
                                            value={UDFDate_3} 
                                            onChange={(e) => setUDFDate_3(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date 
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar9:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="text"
                                            value={UDFText_9}
                                            onChange={(e) => setUDFText_9(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric4:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control  
                                        style={{ fontSize: "13px" }}
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_4} 
                                        onChange={(e) => setUDFNumber_4(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Date4:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="datetime-local"
                                            value={UDFDate_4} 
                                            onChange={(e) => setUDFDate_4(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar10:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="text"
                                            value={UDFText_10}
                                            onChange={(e) => setUDFText_10(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric5:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control 
                                        style={{ fontSize: "13px" }} 
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_5} 
                                        onChange={(e) => setUDFNumber_5(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Date5:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                            style={{ fontSize: "13px" }}
                                            type="datetime-local"
                                            value={UDFDate_5} 
                                            onChange={(e) => setUDFDate_5(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date 
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Tab>


                        {/* ************************************* Material ************************************ */}

                        <Tab eventKey="Material" title="Material" class="nav-link active">

                            <WorkOrderMaterial name={'WorkOrderFrom'} />

                        </Tab>


                        {/* ************************************* Special Order (PR) ************************************ */}

                        <Tab eventKey="Special Order (PR)" title="Special Order (PR)" class="nav-link active" >

                            <WorkOrderSpecialOrder name={'WorkOrderFrom'} />

                        </Tab>


                        {/* ************************************* Outsource Contract (PR) ************************************ */}

                        <Tab eventKey="Outsource Contract (PR)" title="Outsource Contract (PR)" class="nav-link active">

                            <WorkOrderOutsourceContract name={'WorkOrderFrom'} />

                        </Tab>


                        {/* ************************************* Time Card ********************************* */}

                        <Tab eventKey="Time Card" title="Time Card" class="nav-link active" >

                            <WorkOrderTimeCard name={'WorkOrderFrom'} />

                        </Tab>


                        {/* ************************************* Misc ************************************** */}

                        <Tab eventKey="Misc" title="Misc" class="nav-link active" >

                            <WorkOrderMisc name={'WorkOrderFrom'} />

                        </Tab>

                        {/* ************************************* Reference ************************************** */}

                        <Tab eventKey="Reference" title="Reference" class="nav-link active" >
                            
                            <Form.Group>
                                <label>File upload</label>
                                <div className="custom-file">
                                    <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                                    <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                </div>
                            </Form.Group> 
                        </Tab>
                        

                        {/* ************************************* Status Audit ************************************** */}

                        <Tab eventKey="Status Audit" title="Status Audit" class="nav-link active" >

                            <WorkOrderStatusAudit name={'WorkOrderFrom'} />

                        </Tab>


                    </Tabs>
                    </section>
                    </form>


                        {/* ************************************* button ***************************************** */}

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
                            {Button_save}
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
                </div>
            </div>
        </div>
    );
};

export default WorkOrderFrom;
