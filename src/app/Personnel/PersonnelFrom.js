import React,{useState,useEffect} from 'react'
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

import PersonnelMaintenance from "../tables/PersonnelMaintenance";



const PersonnalFrom = (props) => {

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


    const [Emp_EmployeeID, setEmp_EmployeeID] = useState("");
    const [Emp_Name, setEmp_Name] = useState("");   
    const [Employee_Status, setEmployee_Status] = useState([]);
    const [selected_Employee_Status, setSelected_Employee_Status] = useState([]);
    const [Emp_Title, setEmp_Title] = useState("");
    const [Employee_User_Group, setEmployee_User_Group] = useState([]);
    const [selected_Employee_User_Group, setSelected_Employee_User_Group] = useState([]);
    const [Employee_Login_Id, setEmployee_Login_Id] = useState([]);   
    const [selected_Employee_Login_Id, setSelected_Employee_Login_Id] = useState([]);
    const [dashboard_access, setDashboard_access] = useState([{label:"Gauge Dashboard",value:""},{label:"KPI Dashboard",value:""},{label:"KPI Dashboard Configure",value:""}]);
    const [selected_dashboard_access, setSelected_dashboard_access] = useState([]);

    
    const [Emp_HomePhone, setEmp_HomePhone] = useState("");
    const [BirthDate, setBirthDate] = useState("");
    const [Emp_EmergencyName, setEmp_EmergencyName] = useState("");

    const [HireDate, setHireDate] = useState("");

    const [Emp_EmergencyPhone, setEmp_EmergencyPhone] = useState("");

    const [Emp_PayRate, setEmp_PayRate] = useState("0");

    const [sex, setSex] = useState([{label:"M : Male",value:""},{label:"F : Female",value:""}]);
    const [selected_sex, setSelected_sex] = useState([]);

    const [Emp_PayPeriod, setEmp_PayPeriod] = useState("");

    const [marital_status, setMarital_status] = useState([{label:"S : Single",value:""},{label:"M : Married",value:""},{label:"D : Divorced",value:""}]);
    const [selected_marital_status, setSelected_marital_status] = useState([]);

    const [shift, setShift] = useState([{label:"M : Morning",value:""},{label:"A : Afternoon",value:""},{label:"E : Evening",value:""}]);
    const [selected_shift, setSelected_shift] = useState([]);

    const [Emp_EmailID, setEmp_EmailID] = useState("");

    const [Employee_Supervisor_Id, setEmployee_Supervisor_Id] = useState([]);
    const [selected_Employee_Supervisor_Id, setSelected_Employee_Supervisor_Id] = useState([]);

    const [Employee_Primary_Craft, setEmployee_Primary_Craft] = useState([]);
    const [selected_Employee_Primary_Craft, setSelected_Employee_Primary_Craft] = useState([]);

    const [Employee_Work_Id, setEmployee_Work_Id] = useState([]);
    const [selected_Employee_Work_Id, setSelected_Employee_Work_Id] = useState([]);

    const [Employee_Work_Group, setEmployee_Work_Group] = useState([]);
    const [selected_Employee_Work_Group, setSelected_Employee_Work_Group] = useState([]);

    const [Remarks, setRemarks] = useState("");
   
   
    const [MrApprover, setMrApprover] = useState(false)    
    const [selected_MrApprover, setselected_MrApprover] = useState('0') 
    const [CheckBox_MrApprover, setCheckBox_MrApprover] = useState('')  

    const [WoSched, setWoSched] = useState(false) 
    const [CheckBox_WoSched, setCheckBox_WoSched] = useState('0') 

    const [WoBudgetApprover, setWoBudgetApprover] = useState(false)    
    const [selected_WoBudgetApprover, setselected_WoBudgetApprover] = useState('0') 
    const [CheckBox_WoBudgetApprover, setCheckBox_WoBudgetApprover] = useState('')  

    const [PoBuyer, setPoBuyer] = useState(false) 
    const [CheckBox_PoBuyer, setCheckBox_PoBuyer] = useState('0') 

    const [PrApprover, setPrApprover] = useState(false)    
    const [selected_PrApprover, setselected_PrApprover] = useState('0') 
    const [CheckBox_PrApprover, setCheckBox_PrApprover] = useState('')  

    const [Supervisor, setSupervisor] = useState(false) 
    const [CheckBox_Supervisor, setCheckBox_Supervisor] = useState('0') 

    const [WrApprover, setWrApprover] = useState(false)  
    const [CheckBox_WrApprover, setCheckBox_WrApprover] = useState('0')  

    const [Foreman, setForeman] = useState(false) 
    const [CheckBox_Foreman, setCheckBox_Foreman] = useState('0') 

    const [Planner, setPlanner] = useState(false)  
    const [CheckBox_Planner, setCheckBox_Planner] = useState('0')  

    const [AssetTagFlag, setAssetTagFlag] = useState(false)
    const [CheckBox_AssetTagFlag, setCheckBox_AssetTagFlag] = useState('0')  

    const [WoGenMrPr, setWoGenMrPr] = useState(false)  
    const [CheckBox_WoGenMrPr, setCheckBox_WoGenMrPr] = useState('0')  

    const [MsetupMobileUser, setMsetupMobileUser] = useState(false)
    const [CheckBox_MsetupMobileUser, setCheckBox_MsetupMobileUser] = useState('0')  
    
    const [PmGenerator, setPmGenerator] = useState(false)  
    const [CheckBox_PmGenerator, setCheckBox_PmGenerator] = useState('0')  

    const [TimeCardEnter, setTimeCardEnter] = useState(false)  
    const [CheckBox_TimeCardEnter, setCheckBox_TimeCardEnter] = useState('0')  

    const [Checklist, setChecklist] = useState(false) 
    const [CheckBox_Checklist, setCheckBox_Checklist] = useState('0') 

    const [TimeCardVoid, setTimeCardVoid] = useState(false)  
    const [CheckBox_TimeCardVoid, setCheckBox_TimeCardVoid] = useState('0')  

    const [Mobile, setMobile] = useState(false) 
    const [CheckBox_Mobile, setCheckBox_Mobile] = useState('0') 

    const [Core, setCore] = useState(false) 
    const [CheckBox_Core, setCheckBox_Core] = useState('0')  
    
    const [Webwork, setWebwork] = useState(false) 
    const [CheckBox_Webwork, setCheckBox_Webwork] = useState('0') 


    const [MaintenanceColumns, setMaintenanceColumns]=useState([]);
    const [MaintenanceData, setMaintenanceData]=useState([]);


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

    const [UDFNote2, setUDFNote2] = useState("");
    const [UDFText_11, setUDFText_11] = useState("");
    const [UDFText_12, setUDFText_12] = useState("");
    const [UDFText_13, setUDFText_13] = useState("");
    const [UDFText_14, setUDFText_14] = useState("");
    const [UDFText_15, setUDFText_15] = useState("");
    const [UDFText_16, setUDFText_16] = useState("");
    const [UDFText_17, setUDFText_17] = useState("");
    const [UDFText_18, setUDFText_18] = useState("");
    const [UDFText_19, setUDFText_19] = useState("");
    const [UDFText_20, setUDFText_20] = useState("");

    const [UDFNumber_1, setUDFNumber_1] = useState("0");
    const [UDFNumber_2, setUDFNumber_2] = useState("0");
    const [UDFNumber_3, setUDFNumber_3] = useState("0");
    const [UDFNumber_4, setUDFNumber_4] = useState("0");
    const [UDFNumber_5, setUDFNumber_5] = useState("0");
    const [UDFNumber_6, setUDFNumber_6] = useState("0");
    const [UDFNumber_7, setUDFNumber_7] = useState("0");
    const [UDFNumber_8, setUDFNumber_8] = useState("0");
    const [UDFNumber_9, setUDFNumber_9] = useState("0");
    const [UDFNumber_10, setUDFNumber_10] = useState("0");

    const [UDFDate_1, setUDFDate_1] = useState(new Date());
    const [UDFDate_2, setUDFDate_2] = useState(new Date());
    const [UDFDate_3, setUDFDate_3] = useState(new Date());
    const [UDFDate_4, setUDFDate_4] = useState(new Date());
    const [UDFDate_5, setUDFDate_5] = useState(new Date());
    const [UDFDate_6, setUDFDate_6] = useState(new Date());
    const [UDFDate_7, setUDFDate_7] = useState(new Date());
    const [UDFDate_8, setUDFDate_8] = useState(new Date());
    const [UDFDate_9, setUDFDate_9] = useState(new Date());
    const [UDFDate_10, setUDFDate_10] = useState(new Date());

    

    const get_employee_Status =(site_ID, type, selected_asset) => {


        Swal.fire({  title: 'Please Wait !', allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_dropdown(site_ID,type).then((responseJson)=>{

       
            if (responseJson.data.status === 'SUCCESS') {


               console.log('get_dropdown', responseJson.data)


                let Employee_Status = responseJson.data.data.Employee_Status.map(item => ({
                    label: item.emp_sts_status +" : "+ item.emp_sts_desc,
                    value: item.emp_sts_desc            
                    }));
                    setEmployee_Status(Employee_Status);

                let Employee_User_Group = responseJson.data.data.Employee_User_Group.map(item => ({
                    label: item.usr_grp_usr_grp +" : "+ item.usr_grp_desc,
                    value: item.usr_grp_desc            
                    }));
                    setEmployee_User_Group(Employee_User_Group);

                let Employee_Login_Id = responseJson.data.data.Employee_Login_Id.map(item => ({
                    label: item.empl_id +" : "+ item.name,
                    value: item.name            
                    }));
                    setEmployee_Login_Id(Employee_Login_Id);

                let Employee_Primary_Craft = responseJson.data.data.Employee_Primary_Craft.map(item => ({
                    label: item.crf_mst_crf_cd +" : "+ item.crf_mst_desc ,
                    value: item.crf_mst_desc            
                    }));                   
                    setEmployee_Primary_Craft(Employee_Primary_Craft);

                let Employee_Supervisor_Id = responseJson.data.data.Employee_Supervisor_Id.map(item => ({
                    label: item.emp_mst_empl_id +" : "+ item.emp_mst_name ,
                    value: item.emp_mst_name            
                    }));
                    setEmployee_Supervisor_Id(Employee_Supervisor_Id);

                let Employee_Work_Id = responseJson.data.data.Employee_Work_Id.map(item => ({
                    label: item.mst_war_work_area +" : "+ item.mst_war_desc ,
                    value: item.mst_war_desc            
                    }));
                    setEmployee_Work_Id(Employee_Work_Id);


                let Employee_Work_Group = responseJson.data.data.Employee_Work_Group.map(item => ({
                    label: item.wrk_grp_grp_cd +" : "+ item.wrk_grp_desc ,
                    value: item.wrk_grp_desc            
                    }));                   
                    setEmployee_Work_Group(Employee_Work_Group);

                    
                        if(selected_asset == 'New_Employee'){ 

                            Swal.close();
                            setButton_save("Save")
        
                        }else{
        
                            setButton_save("Update")
                            get_employeemaster_select(site_ID,selected_asset);
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


    const get_employeemaster_select = () => {

      
        console.log('SELECT ROWID: '+ location.state.RowID)

        APIServices.get_employeemaster_select(location.state.RowID).then((responseJson)=>{            

            console.log('SELECT response: '+ JSON.stringify(responseJson));

            if (responseJson.data.status === 'SUCCESS') {     
                

// **************************************** check read data ******************************************
                console.log('SELECT EMP: '+ JSON.stringify(responseJson.data.data))
               
               for (var index in responseJson.data.data) {
               
                
                setRowID( responseJson.data.data[index].RowID )

                setEmp_EmployeeID( responseJson.data.data[index].emp_mst_empl_id )
                setEmp_Name( responseJson.data.data[index].emp_mst_name )
                setSelected_Employee_Status( {label:responseJson.data.data[index].emp_mst_status} )
                setEmp_Title( responseJson.data.data[index].emp_mst_title )
                setSelected_Employee_User_Group( {label:responseJson.data.data[index].emp_mst_usr_grp} )
                setSelected_Employee_Login_Id( {label:responseJson.data.data[index].emp_mst_login_id} )
                setSelected_dashboard_access( {label:responseJson.data.data[index].emp_mst_dash_access} )

                setEmp_HomePhone( responseJson.data.data[index].emp_mst_homephone )

                if(responseJson.data.data[index].emp_mst_date_of_birth == null){
                    setBirthDate('')
                }else{

                    setBirthDate( Moment(responseJson.data.data[index].emp_mst_date_of_birth.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT BD: '+ Moment(responseJson.data.data[index].emp_mst_date_of_birth.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setEmp_EmergencyName( responseJson.data.data[index].emp_mst_emg_name )

                if(responseJson.data.data[index].emp_mst_dateofhire == null){
                    setHireDate('')
                }else{

                    setHireDate( Moment(responseJson.data.data[index].emp_mst_dateofhire.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT HD: '+ Moment(responseJson.data.data[index].emp_mst_dateofhire.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                setEmp_EmergencyPhone( responseJson.data.data[index].emp_mst_emg_phone )
                setEmp_PayRate( responseJson.data.data[index].emp_mst_payrate )
                setSelected_sex( {label:responseJson.data.data[index].emp_mst_sex} )
                setEmp_PayPeriod( responseJson.data.data[index].emp_mst_pay_period )
                setSelected_marital_status( {label:responseJson.data.data[index].emp_mst_marital_status} )
                setSelected_shift( {label:responseJson.data.data[index].emp_det_shift} )
                setEmp_EmailID( responseJson.data.data[index].emp_det_email_id )
                setSelected_Employee_Supervisor_Id( {label:responseJson.data.data[index].emp_det_supervisor_id} )
                setSelected_Employee_Primary_Craft( {label:responseJson.data.data[index].emp_det_craft} )
                setSelected_Employee_Work_Id( {label:responseJson.data.data[index].emp_det_work_area} )
                setSelected_Employee_Work_Group( {label:responseJson.data.data[index].emp_det_work_grp} )
                setRemarks( responseJson.data.data[index].emp_mst_remarks )

                setselected_MrApprover( responseJson.data.data[index].emp_det_mr_limit )
                setMrApprover( responseJson.data.data[index].emp_det_mr_approver )
                
                setselected_WoBudgetApprover( responseJson.data.data[index].emp_det_wo_approval_limit )
                setWoBudgetApprover( responseJson.data.data[index].emp_det_wo_budget_approver )

                setselected_PrApprover( responseJson.data.data[index].emp_det_pr_approval_limit )
                setPrApprover( responseJson.data.data[index].emp_det_pr_approver )

                setWoSched( responseJson.data.data[index].emp_det_wo_sched )
                setPoBuyer( responseJson.data.data[index].emp_det_po_buyer )
                setSupervisor( responseJson.data.data[index].emp_det_supervisor )
                setWrApprover( responseJson.data.data[index].emp_det_wr_approver )
                setForeman( responseJson.data.data[index].emp_det_foreman )
                setPlanner( responseJson.data.data[index].emp_det_planner )
                setAssetTagFlag( responseJson.data.data[index].emp_det_asset_tag_flag )
                setWoGenMrPr( responseJson.data.data[index].emp_det_wo_gen_mr_pr )
                setMsetupMobileUser( responseJson.data.data[index].emp_det_msetup_mobile_user )
                setPmGenerator( responseJson.data.data[index].emp_det_pm_generator )
                setTimeCardEnter( responseJson.data.data[index].emp_det_time_card_enter )
                setChecklist( responseJson.data.data[index].emp_det_checklist )
                setTimeCardVoid( responseJson.data.data[index].emp_det_time_card_void )
                setMobile( responseJson.data.data[index].emp_det_mobile )
                setCore( responseJson.data.data[index].emp_det_core )
                setWebwork( responseJson.data.data[index].emp_det_webwork )

                setUDFNote1( responseJson.data.data[index].emp_det_note1 )
                setUDFText_1( responseJson.data.data[index].emp_det_varchar1 )
                setUDFText_2( responseJson.data.data[index].emp_det_varchar2 )
                setUDFText_3( responseJson.data.data[index].emp_det_varchar3 )
                setUDFText_4( responseJson.data.data[index].emp_det_varchar4 )
                setUDFText_5( responseJson.data.data[index].emp_det_varchar5 )
                setUDFText_6( responseJson.data.data[index].emp_det_varchar6 )
                setUDFText_7( responseJson.data.data[index].emp_det_varchar7 )
                setUDFText_8( responseJson.data.data[index].emp_det_varchar8 )
                setUDFText_9( responseJson.data.data[index].emp_det_varchar9 )
                setUDFText_10( responseJson.data.data[index].emp_det_varchar10 )

                setUDFNote2( responseJson.data.data[index].emp_det_note2 )
                setUDFText_11( responseJson.data.data[index].emp_det_varchar11 )
                setUDFText_12( responseJson.data.data[index].emp_det_varchar12 )
                setUDFText_13( responseJson.data.data[index].emp_det_varchar13 )
                setUDFText_14( responseJson.data.data[index].emp_det_varchar14 )
                setUDFText_15( responseJson.data.data[index].emp_det_varchar15 )
                setUDFText_16( responseJson.data.data[index].emp_det_varchar16 )
                setUDFText_17( responseJson.data.data[index].emp_det_varchar17 )
                setUDFText_18( responseJson.data.data[index].emp_det_varchar18 )
                setUDFText_19( responseJson.data.data[index].emp_det_varchar19 )
                setUDFText_20( responseJson.data.data[index].emp_det_varchar20 )

                setUDFNumber_1( responseJson.data.data[index].emp_det_numeric1 )
                setUDFNumber_2( responseJson.data.data[index].emp_det_numeric2 )
                setUDFNumber_3( responseJson.data.data[index].emp_det_numeric3 )
                setUDFNumber_4( responseJson.data.data[index].emp_det_numeric4 )
                setUDFNumber_5( responseJson.data.data[index].emp_det_numeric5 )
                setUDFNumber_6( responseJson.data.data[index].emp_det_numeric6 )
                setUDFNumber_7( responseJson.data.data[index].emp_det_numeric7 )
                setUDFNumber_8( responseJson.data.data[index].emp_det_numeric8 )
                setUDFNumber_9( responseJson.data.data[index].emp_det_numeric9 )
                setUDFNumber_10( responseJson.data.data[index].emp_det_numeric10 )

                if(responseJson.data.data[index].emp_det_datetime1 == null){
                    setUDFDate_1('')
                }else{

                    setUDFDate_1( Moment(responseJson.data.data[index].emp_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 1 : '+ Moment(responseJson.data.data[index].emp_det_datetime1.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime2 == null){
                    setUDFDate_2('')
                }else{

                    setUDFDate_2( Moment(responseJson.data.data[index].emp_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 2 : '+ Moment(responseJson.data.data[index].emp_det_datetime2.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime3 == null){
                    setUDFDate_3('')
                }else{

                    setUDFDate_3( Moment(responseJson.data.data[index].emp_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 3 : '+ Moment(responseJson.data.data[index].emp_det_datetime3.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime4 == null){
                    setUDFDate_4('')
                }else{

                    setUDFDate_4( Moment(responseJson.data.data[index].emp_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 4 : '+ Moment(responseJson.data.data[index].emp_det_datetime4.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime5 == null){
                    setUDFDate_5('')
                }else{

                    setUDFDate_5( Moment(responseJson.data.data[index].emp_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 5 : '+ Moment(responseJson.data.data[index].emp_det_datetime5.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime6 == null){
                    setUDFDate_6('')
                }else{

                    setUDFDate_6( Moment(responseJson.data.data[index].emp_det_datetime6.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 6 : '+ Moment(responseJson.data.data[index].emp_det_datetime6.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime7 == null){
                    setUDFDate_7('')
                }else{

                    setUDFDate_7( Moment(responseJson.data.data[index].emp_det_datetime7.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 7 : '+ Moment(responseJson.data.data[index].emp_det_datetime7.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime8 == null){
                    setUDFDate_8('')
                }else{

                    setUDFDate_8( Moment(responseJson.data.data[index].emp_det_datetime8.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 8 : '+ Moment(responseJson.data.data[index].emp_det_datetime8.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime9 == null){
                    setUDFDate_9('')
                }else{

                    setUDFDate_9( Moment(responseJson.data.data[index].emp_det_datetime9.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 9 : '+ Moment(responseJson.data.data[index].emp_det_datetime9.date).format('YYYY-MM-DDTHH:mm:ss'))
                }

                if(responseJson.data.data[index].emp_det_datetime10 == null){
                    setUDFDate_10('')
                }else{

                    setUDFDate_10( Moment(responseJson.data.data[index].emp_det_datetime10.date).format('YYYY-MM-DDTHH:mm:ss').trim())
                    console.log('SELECT DTime 10 : '+ Moment(responseJson.data.data[index].emp_det_datetime10.date).format('YYYY-MM-DDTHH:mm:ss'))
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
              title: 'Oops get_employee_select...',
              text: e,          
            })
          });

    }


    useEffect(() => {

        let site_ID = localStorage.getItem("site_ID");

        console.log('select select',location.state.select);
        console.log('select EMPID',location.state.RowID);
    
        get_employee_Status(site_ID,"All",location.state.select);       
       

    },[location]);


    const onClickChange =()=>{

        
    console.log(selected_Employee_Status)
    if(Emp_EmployeeID == ''){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please Enter the Employee ID',
            showConfirmButton: false,
            timer: 2000
            
          })
        } else {

            if(Emp_Name == ''){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Enter the Name',
                    showConfirmButton: false,
                    timer: 2000
                    
                  })
            } else {
    
                if(selected_Employee_Status == 0 || selected_Employee_Status == null){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Please Select the Status',
                        showConfirmButton: false,
                        timer: 2000,
                        
                      })
                }else{

                    if(Emp_Title == ''){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Please Enter the Title',
                            showConfirmButton: false,
                            timer: 2000
                            
                          })
                    } else {

                        if(selected_Employee_User_Group == 0 || selected_Employee_User_Group == null){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Please Select the User Group',
                                showConfirmButton: false,
                                timer: 2000
                                
                              })
                        }else{
                
                            // if(selected_Employee_Login_Id == 0 || selected_Employee_Login_Id == null){
                            //     Swal.fire({
                            //         position: 'top-end',
                            //         icon: 'error',
                            //         title: 'Please Select the Login Id',
                            //         showConfirmButton: false,
                            //         timer: 2000
                                    
                            //       })
                            // }else{
                    
                                // if(selected_Employee_Supervisor_Id == 0 || selected_Employee_Supervisor_Id == null){
                                //     Swal.fire({
                                //         position: 'top-end',
                                //         icon: 'error',
                                //         title: 'Please Select the Supervisor Id',
                                //         showConfirmButton: false,
                                //         timer: 2000
                                        
                                //         })
                                // }else{
            
                                    if(selected_Employee_Primary_Craft == 0 || selected_Employee_Primary_Craft == null){
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'error',
                                            title: 'Please Select the Primary Craft',
                                            showConfirmButton: false,
                                            timer: 2000
                                            
                                            })
                                    }else{
            
                                        if(selected_Employee_Work_Id == 0 || selected_Employee_Work_Id == null){
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'error',
                                                title: 'Please Select the Work Id',
                                                showConfirmButton: false,
                                                timer: 2000
                                                
                                                })
                                        }else{

                                            if(selected_Employee_Work_Group == 0 || selected_Employee_Work_Group == null){
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'error',
                                                    title: 'Please Select the Work Group',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                    
                                                    })
                                            }else{
                                    
                                                if(Button_save ==  "Save"){
            
                                                    New_Employee();
                                                    console.log("Create button clicked!");
                                                    resetData();

                                                }else if(Button_save == "Update"){
            
                                                    Update_Employee();
                                                    console.log("Update button clicked here!");
                                                }
                                            }
                                            
                                
                                        }
                        
                            
                                    }
                                    
                        
                                // }
                                
                    
                            // }
                            
                
                        }
                    }

                }
            }
        }
        
   
  }


    const New_Employee =()=>{

        Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
        Swal.showLoading();


        let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');
        console.log(get_date)

        let site_ID = localStorage.getItem("site_ID");
        let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
        let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");


        console.log("EMP_ID: ", Emp_EmployeeID)
        console.log("EMP_Name: ", Emp_Name)
    
        //Select Employees status value
        let Employee_Status = selected_Employee_Status.label.split(":")
        console.log("EMP_Status: ", Employee_Status[0])

        //Select Employees Title
        console.log("EMP_Title: ", Emp_Title)

        //Select User Group
        let Employee_User_Group = selected_Employee_User_Group.label.split(":")
        console.log("EMP_User_Group: ", Employee_User_Group[0])

        //Select Login Id
        let Employee_Login_Id, setEmployee_Login_Id;
         if(selected_Employee_Login_Id.label == '' || selected_Employee_Login_Id.label == null){
            
            setEmployee_Login_Id = ''
        }else{

            Employee_Login_Id = selected_Employee_Login_Id.label.split(":")
            setEmployee_Login_Id = Employee_Login_Id[0];
            console.log("EMP_Login_ID: ", Employee_Login_Id[0])
        }

        //Select Dashboard Access
        let setDashboard_access = '';
         if(selected_dashboard_access.label == '' || selected_dashboard_access.label == null){
            
            setDashboard_access = ''
        }else{

            let dashboard_access = selected_dashboard_access.label.split(":")
            setDashboard_access = dashboard_access[0];
            console.log("Dashboard_Access: ", dashboard_access[0])
        }

        //Select Employees HomePhone
        console.log("EMP_HomePhone: ", Emp_HomePhone)

        //Select Date of Birth
        let date_of_birth = ''
        if (BirthDate == '' || BirthDate == null) {

            date_of_birth = '';
        } else {

            date_of_birth = Moment(BirthDate).format('YYYY-MM-DDTHH:mm:ss').trim();
            console.log("DB", date_of_birth);
        }

        //Select Employees EmergencyName
        console.log("EMP_EmergencyName: ", Emp_EmergencyName)

        //Select Date of Hire
        let date_of_hire = ''
        if (HireDate == '' || HireDate == null) {

            date_of_hire = '';
        } else {

            date_of_hire = Moment(HireDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("HB ", date_of_hire);
        }

        //Select Employees EmergencyPhone
        console.log("EMP_EmergencyPhone: ", Emp_EmergencyPhone)

        //Select Employees PayRate
        console.log("EMP_PayRate: ", Emp_PayRate)
   

        //Select Sex
        let sex, setSex;
        if(selected_sex == '' || selected_sex == null){

            setSex=''
        }else{

            sex = selected_sex.label.split(":")
            setSex = sex[0];
            console.log("Sex ", sex[0])
        }

        //Select Employees PayPeriod
        console.log("EMP_PayPeriod: ", Emp_PayPeriod)

        //Select Marital Status
        let marital_status, setMarital_status;
        if(selected_marital_status == '' || selected_marital_status == null){

            setMarital_status=''
        }else{

            marital_status = selected_marital_status.label.split(":")
            setMarital_status = marital_status[0];
            console.log("Marital_Status: ", marital_status[0])
        }

        //Select Shift
        let shift, setShift;
        if(selected_shift == '' || selected_shift == null){

            setShift=''
        }else{

            shift = selected_shift.label.split(":")
            setShift = shift[0];
            console.log("Shift ", shift[0])
        }

        //Select Employees EmailID
        console.log("EMP_EmailID: ", Emp_EmailID)

        //Select Employees SupervisorID
        let Employee_Supervisor_Id, setEmployee_Supervisor_Id;
         if(selected_Employee_Supervisor_Id.label == '' || selected_Employee_Supervisor_Id.label == null){
            
            setEmployee_Supervisor_Id = ''
        }else{

            Employee_Supervisor_Id = selected_Employee_Supervisor_Id.label.split(":")
            setEmployee_Supervisor_Id = Employee_Supervisor_Id[0];
            console.log("EMP_Supervisor_Id: ", Employee_Supervisor_Id[0])
        }

        //Select Employees PrimaryCraft
        let Employee_Primary_Craft = selected_Employee_Primary_Craft.label.split(":")
        console.log("EMP_Primary_Craft: ", Employee_Primary_Craft[0])

        //Select Employees WorkID
        let Employee_Work_Id = selected_Employee_Work_Id.label.split(":")
        console.log("EMP_Work_Id: ", Employee_Work_Id[0])

        //Select Employees WorkGroup
        let Employee_Work_Group = selected_Employee_Work_Group.label.split(":")
        console.log("EMP_Work_Group: ", Employee_Work_Group[0])

        //Select Remarks
        console.log("Remarks: ", Remarks)

        
        //Select Date of DTime 1
        let date_of_time1 = ''
        if (UDFDate_1 == '' || UDFDate_1 == null) {

            date_of_time1 = '';
        } else {

            date_of_time1 = Moment(UDFDate_1).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime1 ", date_of_time1);
        }

        //Select Date of DTime 2
        let date_of_time2 = ''
        if (UDFDate_2 == '' || UDFDate_2 == null) {

            date_of_time2 = '';
        } else {

            date_of_time2 = Moment(UDFDate_2).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime2 ", date_of_time2);
        }

        //Select Date of DTime 3
        let date_of_time3 = ''
        if (UDFDate_3 == '' || UDFDate_3 == null) {

            date_of_time3 = '';
        } else {

            date_of_time3 = Moment(UDFDate_3).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime3 ", date_of_time3);
        }

        //Select Date of DTime 4
        let date_of_time4 = ''
        if (UDFDate_4 == '' || UDFDate_4 == null) {

            date_of_time4 = '';
        } else {

            date_of_time4 = Moment(UDFDate_4).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime4 ", date_of_time4);
        }

        //Select Date of DTime 5
        let date_of_time5 = ''
        if (UDFDate_5 == '' || UDFDate_5 == null) {

            date_of_time5 = '';
        } else {

            date_of_time5 = Moment(UDFDate_5).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime5 ", date_of_time5);
        }

        //Select Date of DTime 6
        let date_of_time6 = ''
        if (UDFDate_6 == '' || UDFDate_6 == null) {

            date_of_time6 = '';
        } else {

            date_of_time6 = Moment(UDFDate_6).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime6 ", date_of_time6);
        }

        //Select Date of DTime 7
        let date_of_time7 = ''
        if (UDFDate_7 == '' || UDFDate_7 == null) {

            date_of_time7 = '';
        } else {

            date_of_time7 = Moment(UDFDate_7).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime7 ", date_of_time7);
        }

        //Select Date of DTime 8
        let date_of_time8 = ''
        if (UDFDate_8 == '' || UDFDate_8 == null) {

            date_of_time8 = '';
        } else {

            date_of_time8 = Moment(UDFDate_8).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime8 ", date_of_time8);
        }

        //Select Date of DTime 9
        let date_of_time9 = ''
        if (UDFDate_9 == '' || UDFDate_9 == null) {

            date_of_time9 = '';
        } else {

            date_of_time9 = Moment(UDFDate_9).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime9 ", date_of_time9);
        }

        //Select Date of DTime 10
        let date_of_time10 = ''
        if (UDFDate_10 == '' || UDFDate_10 == null) {

            date_of_time10 = '';
        } else {

            date_of_time10 = Moment(UDFDate_10).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime10 ", date_of_time10);
        }



    var json_employee = {


        "site_cd": site_ID,
        "emp_mst_empl_id":Emp_EmployeeID.trim(),
        "emp_mst_name":Emp_Name.trim(),
        "emp_mst_status":Employee_Status[0].trim(),
        "emp_mst_title":Emp_Title.trim(),
        "emp_mst_usr_grp":Employee_User_Group[0].trim(),
        "emp_mst_login_id":setEmployee_Login_Id.trim(),
        "emp_mst_dash_access":setDashboard_access.trim(),

        "emp_mst_homephone":Emp_HomePhone.trim(),
        "emp_mst_date_of_birth":date_of_birth,
        "emp_mst_emg_name":Emp_EmergencyName.trim(),
        "emp_mst_dateofhire":date_of_hire,
        "emp_mst_emg_phone":Emp_EmergencyPhone.trim(),
        "emp_mst_payrate":Emp_PayRate.trim(),
        "emp_mst_sex":setSex.trim(),
        "emp_mst_pay_period":Emp_PayPeriod.trim(),
        "emp_mst_marital_status":setMarital_status.trim(),
        "emp_det_shift":setShift.trim(),
        "emp_det_email_id":Emp_EmailID.trim(),
        "emp_det_supervisor_id":setEmployee_Supervisor_Id.trim(),            
        "emp_det_craft":Employee_Primary_Craft[0].trim(),
        "emp_det_work_area":Employee_Work_Id[0].trim(),
        "emp_det_work_grp":Employee_Work_Group[0].trim(),
        "emp_mst_remarks":Remarks.trim(),


        "emp_det_mr_limit":selected_MrApprover,
        "emp_det_mr_approver":CheckBox_MrApprover,

        "emp_det_wo_sched":CheckBox_WoSched,

        "emp_det_wo_approval_limit":selected_WoBudgetApprover,
        "emp_det_wo_budget_approver":CheckBox_WoBudgetApprover,

        "emp_det_po_buyer":CheckBox_PoBuyer,

        "emp_det_pr_approval_limit":selected_PrApprover,
        "emp_det_pr_approver":CheckBox_PrApprover,


        "emp_det_supervisor":CheckBox_Supervisor,
        "emp_det_wr_approver":CheckBox_WrApprover,
        "emp_det_foreman":CheckBox_Foreman,
        "emp_det_planner":CheckBox_Planner,
        "emp_det_asset_tag_flag":CheckBox_AssetTagFlag,
        "emp_det_wo_gen_mr_pr":CheckBox_WoGenMrPr,
        "emp_det_msetup_mobile_user":CheckBox_MsetupMobileUser,
        "emp_det_pm_generator":CheckBox_PmGenerator,
        "emp_det_time_card_enter":CheckBox_TimeCardEnter,
        "emp_det_checklist":CheckBox_Checklist,
        "emp_det_time_card_void":CheckBox_TimeCardVoid,
        "emp_det_mobile":CheckBox_Mobile,
        "emp_det_core":CheckBox_Core,
        "emp_det_webwork":CheckBox_Webwork,


        "emp_det_note1":UDFNote1,
        "emp_det_varchar1":UDFText_1,
        "emp_det_varchar2":UDFText_2,
        "emp_det_varchar3":UDFText_3,
        "emp_det_varchar4":UDFText_4,
        "emp_det_varchar5":UDFText_5,
        "emp_det_varchar6":UDFText_6,
        "emp_det_varchar7":UDFText_7,
        "emp_det_varchar8":UDFText_8,
        "emp_det_varchar9":UDFText_9,
        "emp_det_varchar10":UDFText_10,

        "emp_det_note2":UDFNote2,
        "emp_det_varchar11":UDFText_11,         
        "emp_det_varchar12":UDFText_12,
        "emp_det_varchar13":UDFText_13,
        "emp_det_varchar14":UDFText_14,
        "emp_det_varchar15":UDFText_15,
        "emp_det_varchar16":UDFText_16,
        "emp_det_varchar17":UDFText_17,
        "emp_det_varchar18":UDFText_18,
        "emp_det_varchar19":UDFText_19,
        "emp_det_varchar20":UDFText_20,

        "emp_det_numeric1":UDFNumber_1.trim(),
        "emp_det_numeric2":UDFNumber_2.trim(),
        "emp_det_numeric3":UDFNumber_3.trim(),
        "emp_det_numeric4":UDFNumber_4.trim(),
        "emp_det_numeric5":UDFNumber_5.trim(),
        "emp_det_numeric6":UDFNumber_6.trim(),
        "emp_det_numeric7":UDFNumber_7.trim(),
        "emp_det_numeric8":UDFNumber_8.trim(),
        "emp_det_numeric9":UDFNumber_9.trim(),
        "emp_det_numeric10":UDFNumber_10.trim(),

        "emp_det_datetime1":date_of_time1,
        "emp_det_datetime2":date_of_time2,
        "emp_det_datetime3":date_of_time3,
        "emp_det_datetime4":date_of_time4,
        "emp_det_datetime5":date_of_time5,
        "emp_det_datetime6":date_of_time6,
        "emp_det_datetime7":date_of_time7,
        "emp_det_datetime8":date_of_time8,
        "emp_det_datetime9":date_of_time9,
        "emp_det_datetime10":date_of_time10,


        "audit_user":emp_mst_login_id.trim(),
        "ast_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "emp_mst_create_date":get_date,

        
    }

    console.log(JSON.stringify(json_employee))

    APIServices.insert_new_employee(JSON.stringify(json_employee)).then((responseJson)=>{
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
          title: 'Oops get_employee_select...',
          text: e,          
        })
      });

  }
  

    const Update_Employee =()=>{

    Swal.fire({  title: 'Loading.... !',allowOutsideClick: false})
    Swal.showLoading();


    let get_date = moment().utcOffset('+08:00').format('yyyy-MM-DD HH:mm:ss');

    let site_ID = localStorage.getItem("site_ID");
    let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
    let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");
    
    let RowID = localStorage.getItem("RowID");
    console.log('get RowID here...',location.state.RowID);


        console.log("EMP_ID: ", Emp_EmployeeID)
        console.log("EMP_Name: ", Emp_Name)
    
        //Select Employees status value
        let Employee_Status = selected_Employee_Status.label.split(":")
        console.log("EMP_Status: ", Employee_Status[0])

        //Select Employees Title
        console.log("EMP_Title: ", Emp_Title)

        //Select User Group
        let Employee_User_Group = selected_Employee_User_Group.label.split(":")
        console.log("EMP_User_Group: ", Employee_User_Group[0])

        //Select Login Id
        let Employee_Login_Id, setEmployee_Login_Id;

        if(selected_Employee_Login_Id.label == '' || selected_Employee_Login_Id.label == null){

            setEmployee_Login_Id=''
        }else{

            Employee_Login_Id = selected_Employee_Login_Id.label.split(":")
            setEmployee_Login_Id = Employee_Login_Id[0];
            console.log("Employee_Login_Id ", Employee_Login_Id[0])
        }

        //Select Dashboard Access
        let setDashboard_access = '';
         if(selected_dashboard_access.label == '' || selected_dashboard_access.label == null){
            
            setDashboard_access = ''
        }else{

            let dashboard_access = selected_dashboard_access.label.split(":")
            setDashboard_access = dashboard_access[0];
            console.log("Dashboard_Access: ", dashboard_access[0])
        }

        //Select Employees HomePhone
        console.log("EMP_HomePhone: ", Emp_HomePhone)

        //Select Date of Birth
        let date_of_birth = ''
        if (BirthDate == '' || BirthDate == null) {

            date_of_birth = '';
        } else {

            date_of_birth = Moment(BirthDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DB", date_of_birth);
        }

        //Select Employees EmergencyName
        console.log("EMP_EmergencyName: ", Emp_EmergencyName)

        //Select Date of Hire
        let date_of_hire = ''
        if (HireDate == '' || HireDate == null) {

            date_of_hire = '';
        } else {

            date_of_hire = Moment(HireDate).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("HB ", date_of_hire);
        }

        //Select Employees EmergencyPhone
        console.log("EMP_EmergencyPhone: ", Emp_EmergencyPhone)

        //Select Employees PayRate
        console.log("EMP_PayRate: ", Emp_PayRate)
   

        //Select Sex
        let sex, setSex;
        if(selected_sex == '' || selected_sex == null){

            setSex=''
        }else{

            sex = selected_sex.label.split(":")
            setSex = sex[0];
            console.log("Sex ", sex[0])
        }

        //Select Employees PayPeriod
        console.log("EMP_PayPeriod: ", Emp_PayPeriod)

        //Select Marital Status
        let marital_status, setMarital_status;
        if(selected_marital_status == '' || selected_marital_status == null){

            setMarital_status=''
        }else{

            marital_status = selected_marital_status.label.split(":")
            setMarital_status = marital_status[0];
            console.log("Marital_Status: ", marital_status[0])
        }

        //Select Shift
        let shift, setShift;
        if(selected_shift == '' || selected_shift == null){

            setShift=''
        }else{

            shift = selected_shift.label.split(":")
            setShift = shift[0];
            console.log("Shift ", shift[0])
        }

        //Select Employees EmailID
        console.log("EMP_EmailID: ", Emp_EmailID)

        //Select Employees SupervisorID
        let Employee_Supervisor_Id, setEmployee_Supervisor_Id;

        if(selected_Employee_Supervisor_Id.label == '' || selected_Employee_Supervisor_Id.label == null){

            setEmployee_Supervisor_Id=''
        }else{

            Employee_Supervisor_Id = selected_Employee_Supervisor_Id.label.split(":")
            setEmployee_Supervisor_Id = Employee_Supervisor_Id[0];
            console.log("Employee_Supervisor_Id ", Employee_Supervisor_Id[0])
        }

        //Select Employees PrimaryCraft
        let Employee_Primary_Craft, setEmployee_Primary_Craft;

        if(selected_Employee_Primary_Craft.label == '' || selected_Employee_Primary_Craft.label == null){

            setEmployee_Primary_Craft=''
        }else{

            Employee_Primary_Craft = selected_Employee_Primary_Craft.label.split(":")
            setEmployee_Primary_Craft = Employee_Primary_Craft[0];
            console.log("Employee_Primary_Craft ", Employee_Primary_Craft[0])
        }

        //Select Employees WorkID
        let Employee_Work_Id, setEmployee_Work_Id;

        if(selected_Employee_Work_Id.label == '' || selected_Employee_Work_Id.label == null){

            setEmployee_Work_Id=''
        }else{

            Employee_Work_Id = selected_Employee_Work_Id.label.split(":")
            setEmployee_Work_Id = Employee_Work_Id[0];
            console.log("Employee_Work_Id ", Employee_Work_Id[0])
        }

        //Select Employees WorkGroup
        let Employee_Work_Group, setEmployee_Work_Group;

        if(selected_Employee_Work_Group.label == '' || selected_Employee_Work_Group.label == null){

            setEmployee_Work_Group=''
        }else{

            Employee_Work_Group = selected_Employee_Work_Group.label.split(":")
            setEmployee_Work_Group = Employee_Work_Group[0];
            console.log("Employee_Work_Group ", Employee_Work_Group[0])
        }

        //Select Remarks
        console.log("Remarks: ", Remarks)


        //Select Date of DTime 1
        let date_of_time1 = ''
        if (UDFDate_1 == '' || UDFDate_1 == null) {

            date_of_time1 = '';
        } else {

            date_of_time1 = Moment(UDFDate_1).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime1", date_of_time1);
        }

        //Select Date of DTime 2
        let date_of_time2 = ''
        if (UDFDate_2 == '' || UDFDate_2 == null) {

            date_of_time2 = '';
        } else {

            date_of_time2 = Moment(UDFDate_2).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime2 ", date_of_time2);
        }

        //Select Date of DTime 3
        let date_of_time3 = ''
        if (UDFDate_3 == '' || UDFDate_3 == null) {

            date_of_time3 = '';
        } else {

            date_of_time3 = Moment(UDFDate_3).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime3 ", date_of_time3);
        }

        //Select Date of DTime 4
        let date_of_time4 = ''
        if (UDFDate_4 == '' || UDFDate_4 == null) {

            date_of_time4 = '';
        } else {

            date_of_time4 = Moment(UDFDate_4).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime4 ", date_of_time4);
        }

        //Select Date of DTime 5
        let date_of_time5 = ''
        if (UDFDate_5 == '' || UDFDate_5 == null) {

            date_of_time5 = '';
        } else {

            date_of_time5 = Moment(UDFDate_5).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime5 ", date_of_time5);
        }

        //Select Date of DTime 6
        let date_of_time6 = ''
        if (UDFDate_6 == '' || UDFDate_6 == null) {

            date_of_time6 = '';
        } else {

            date_of_time6 = Moment(UDFDate_6).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime6 ", date_of_time6);
        }

        //Select Date of DTime 7
        let date_of_time7 = ''
        if (UDFDate_7 == '' || UDFDate_7 == null) {

            date_of_time7 = '';
        } else {

            date_of_time7 = Moment(UDFDate_7).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime7 ", date_of_time7);
        }

        //Select Date of DTime 8
        let date_of_time8 = ''
        if (UDFDate_8 == '' || UDFDate_8 == null) {

            date_of_time8 = '';
        } else {

            date_of_time8 = Moment(UDFDate_8).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime8 ", date_of_time8);
        }

        //Select Date of DTime 9
        let date_of_time9 = ''
        if (UDFDate_9 == '' || UDFDate_9 == null) {

            date_of_time9 = '';
        } else {

            date_of_time9 = Moment(UDFDate_9).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime9 ", date_of_time9);
        }

        //Select Date of DTime 10
        let date_of_time10 = ''
        if (UDFDate_10 == '' || UDFDate_10 == null) {

            date_of_time10 = '';
        } else {

            date_of_time10 = Moment(UDFDate_10).format('yyyy-MM-DD HH:mm:ss').trim();
            console.log("DTime10 ", date_of_time10);
        }
        


    var json_employee ={


        "site_cd": site_ID,
        "emp_mst_empl_id":Emp_EmployeeID.trim(),
        "emp_mst_name":Emp_Name.trim(),
        "emp_mst_status":Employee_Status[0].trim(),
        "emp_mst_title":Emp_Title,
        "emp_mst_usr_grp":Employee_User_Group[0].trim(),
        "emp_mst_login_id":setEmployee_Login_Id.trim(),
        "emp_mst_dash_access":setDashboard_access.trim(),

        "emp_mst_homephone":Emp_HomePhone,
        "emp_mst_date_of_birth":date_of_birth,
        "emp_mst_emg_name":Emp_EmergencyName,
        "emp_mst_dateofhire":date_of_hire,
        "emp_mst_emg_phone":Emp_EmergencyPhone,
        "emp_mst_payrate":Emp_PayRate.trim(),
        "emp_mst_sex":setSex.trim(),
        "emp_mst_pay_period":Emp_PayPeriod,
        "emp_mst_marital_status":setMarital_status.trim(),
        "emp_det_shift":setShift.trim(),
        "emp_det_email_id":Emp_EmailID,
        "emp_det_supervisor_id":setEmployee_Supervisor_Id.trim(),            
        "emp_det_craft":setEmployee_Primary_Craft.trim(),
        "emp_det_work_area":setEmployee_Work_Id.trim(),
        "emp_det_work_grp":setEmployee_Work_Group.trim(),
        "emp_mst_remarks":Remarks,


        "emp_det_mr_limit":selected_MrApprover,
        "emp_det_mr_approver":CheckBox_MrApprover,

        "emp_det_wo_sched":CheckBox_WoSched,

        "emp_det_wo_approval_limit":selected_WoBudgetApprover,
        "emp_det_wo_budget_approver":CheckBox_WoBudgetApprover,

        "emp_det_po_buyer":CheckBox_PoBuyer,

        "emp_det_pr_approval_limit":selected_PrApprover,
        "emp_det_pr_approver":CheckBox_PrApprover,


        "emp_det_supervisor":CheckBox_Supervisor,
        "emp_det_wr_approver":CheckBox_WrApprover,
        "emp_det_foreman":CheckBox_Foreman,
        "emp_det_planner":CheckBox_Planner,
        "emp_det_asset_tag_flag":CheckBox_AssetTagFlag,
        "emp_det_wo_gen_mr_pr":CheckBox_WoGenMrPr,
        "emp_det_msetup_mobile_user":CheckBox_MsetupMobileUser,
        "emp_det_pm_generator":CheckBox_PmGenerator,
        "emp_det_time_card_enter":CheckBox_TimeCardEnter,
        "emp_det_checklist":CheckBox_Checklist,
        "emp_det_time_card_void":CheckBox_TimeCardVoid,
        "emp_det_mobile":CheckBox_Mobile,
        "emp_det_core":CheckBox_Core,
        "emp_det_webwork":CheckBox_Webwork,


        "emp_det_note1":UDFNote1,
        "emp_det_varchar1":UDFText_1,
        "emp_det_varchar2":UDFText_2,
        "emp_det_varchar3":UDFText_3,
        "emp_det_varchar4":UDFText_4,
        "emp_det_varchar5":UDFText_5,
        "emp_det_varchar6":UDFText_6,
        "emp_det_varchar7":UDFText_7,
        "emp_det_varchar8":UDFText_8,
        "emp_det_varchar9":UDFText_9,
        "emp_det_varchar10":UDFText_10,

        "emp_det_note2":UDFNote2,
        "emp_det_varchar11":UDFText_11,         
        "emp_det_varchar12":UDFText_12,
        "emp_det_varchar13":UDFText_13,
        "emp_det_varchar14":UDFText_14,
        "emp_det_varchar15":UDFText_15,
        "emp_det_varchar16":UDFText_16,
        "emp_det_varchar17":UDFText_17,
        "emp_det_varchar18":UDFText_18,
        "emp_det_varchar19":UDFText_19,
        "emp_det_varchar20":UDFText_20,

        "emp_det_numeric1":UDFNumber_1,
        "emp_det_numeric2":UDFNumber_2,
        "emp_det_numeric3":UDFNumber_3,
        "emp_det_numeric4":UDFNumber_4,
        "emp_det_numeric5":UDFNumber_5,
        "emp_det_numeric6":UDFNumber_6,
        "emp_det_numeric7":UDFNumber_7,
        "emp_det_numeric8":UDFNumber_8,
        "emp_det_numeric9":UDFNumber_9,
        "emp_det_numeric10":UDFNumber_10,

        "emp_det_datetime1":date_of_time1,
        "emp_det_datetime2":date_of_time2,
        "emp_det_datetime3":date_of_time3,
        "emp_det_datetime4":date_of_time4,
        "emp_det_datetime5":date_of_time5,
        "emp_det_datetime6":date_of_time6,
        "emp_det_datetime7":date_of_time7,
        "emp_det_datetime8":date_of_time8,
        "emp_det_datetime9":date_of_time9,
        "emp_det_datetime10":date_of_time10,

        
        "audit_user":emp_mst_login_id.trim(),
        "ast_mst_create_by":emp_mst_login_id.trim(),
        "ast_aud_originator":emp_mst_empl_id.trim(),
        "emp_mst_create_date":get_date,

        "RowID":location.state.RowID,

        
    }

    console.log("Update : "+JSON.stringify(json_employee))

    APIServices.update_employee(JSON.stringify(json_employee)).then((responseJson)=>{
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
          title: 'Oops get_employee_select...',
          text: e,          
        })
      });


  }


  const resetData = () => {
    
    setEmp_EmployeeID('');
    setEmp_Name('');
    setSelected_Employee_Status(0);
    setEmp_Title('');
    setSelected_Employee_User_Group(0);
    setSelected_Employee_Login_Id(0);
    setSelected_dashboard_access(0);

    setEmp_HomePhone('');
    setBirthDate('');
    setEmp_EmergencyName('');
    setHireDate('');
    setEmp_EmergencyPhone('');
    setEmp_PayRate('');
    setSelected_sex(0);
    setEmp_PayPeriod('');
    setSelected_marital_status(0);
    setSelected_shift(0);
    setEmp_EmailID('');
    setSelected_Employee_Supervisor_Id(0);
    setSelected_Employee_Primary_Craft(0);
    setSelected_Employee_Work_Id(0);
    setSelected_Employee_Work_Group(0);
    setRemarks('');

    setCheckBox_MrApprover('');
    setMrApprover('');
    setCheckBox_WoSched('');
    setCheckBox_WoBudgetApprover('');
    setWoBudgetApprover('');
    setCheckBox_PoBuyer('');
    setCheckBox_PrApprover('');
    setPrApprover('');
    setCheckBox_Supervisor('');
    setCheckBox_WrApprover('');
    setCheckBox_Foreman('');
    setCheckBox_Planner('');
    setCheckBox_AssetTagFlag('');
    setCheckBox_WoGenMrPr('');
    setCheckBox_MsetupMobileUser('');
    setCheckBox_PmGenerator('');
    setCheckBox_TimeCardEnter('');
    setCheckBox_Checklist('');
    setCheckBox_TimeCardVoid('');
    setCheckBox_Mobile('');
    setCheckBox_Core('');
    setCheckBox_Webwork('');

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

    setUDFNote2('');
    setUDFText_11('');
    setUDFText_12('');
    setUDFText_13('');
    setUDFText_14('');
    setUDFText_15('');
    setUDFText_16('');
    setUDFText_17('');
    setUDFText_18('');
    setUDFText_19('');
    setUDFText_20('');

    setUDFNumber_1('');
    setUDFNumber_2('');
    setUDFNumber_3('');
    setUDFNumber_4('');
    setUDFNumber_5('');
    setUDFNumber_6('');
    setUDFNumber_7('');
    setUDFNumber_8('');
    setUDFNumber_9('');
    setUDFNumber_10('');

    setUDFDate_1('');
    setUDFDate_2('');
    setUDFDate_3('');
    setUDFDate_4('');
    setUDFDate_5('');
    setUDFDate_6('');
    setUDFDate_7('');
    setUDFDate_8('');
    setUDFDate_9('');
    setUDFDate_10('');
    
    setButton_save('Save');
    
  }


      const handleOnChangeMrApprover = () => {
        setMrApprover(!MrApprover);

        if(!WrApprover){
            console.log('1')
            setCheckBox_MrApprover('1')
        }else{
            console.log('0')
            setCheckBox_MrApprover('0')
        }
      }

      const handleOnChangeWoSched = () => {
        setWoSched(!WoSched);

        if(!WoSched){
            console.log('1')
            setCheckBox_WoSched('1')
        }else{
            console.log('0')
            setCheckBox_WoSched('0')
        }
      }

      const handleOnChangeWoBudgetApprover = () => {
        setWoBudgetApprover(!WoBudgetApprover);

        if(!WrApprover){
            console.log('1')
            setCheckBox_WoBudgetApprover('1')
        }else{
            console.log('0')
            setCheckBox_WoBudgetApprover('0')
        }
      }

      const handleOnChangePoBuyer = () => {
        setPoBuyer(!PoBuyer);

        if(!PoBuyer){
            console.log('1')
            setCheckBox_PoBuyer('1')
        }else{
            console.log('0')
            setCheckBox_PoBuyer('0')
        }
      }

      const handleOnChangePrApprover = () => {
        setPrApprover(!PrApprover);   

        if(!WrApprover){
            console.log('1')
            setCheckBox_PrApprover('1')
        }else{
            console.log('0')
            setCheckBox_PrApprover('0')
        }
      }

      const handleOnChangeSupervisor = () => {
        setSupervisor(!Supervisor);

        if(!Supervisor){
            console.log('1')
            setCheckBox_Supervisor('1')
        }else{
            console.log('0')
            setCheckBox_Supervisor('0')
        }
      }

      const handleOnChangeWrApprover = () => {
        setWrApprover(!WrApprover);  
        
        if(!WrApprover){
            console.log('1')
            setCheckBox_WrApprover('1')
        }else{
            console.log('0')
            setCheckBox_WrApprover('0')
        }
      }

      const handleOnChangeForeman = () => {
        setForeman(!Foreman);

        if(!Foreman){
            console.log('1')
            setCheckBox_Foreman('1')
        }else{
            console.log('0')
            setCheckBox_Foreman('0')
        }
      }

      const handleOnChangePlanner = () => {
        setPlanner(!Planner);
        
        if(!Planner){
            console.log('1')
            setCheckBox_Planner('1')
        }else{
            console.log('0')
            setCheckBox_Planner('0')
        }
      }

      const handleOnChangeAssetTagFlag = () => {
        setAssetTagFlag(!AssetTagFlag);

        if(!AssetTagFlag){
            console.log('1')
            setCheckBox_AssetTagFlag('1')
        }else{
            console.log('0')
            setCheckBox_AssetTagFlag('0')
        }
      }

      const handleOnChangeWoGenMrPr = () => {
        setWoGenMrPr(!WoGenMrPr);

        if(!WoGenMrPr){
            console.log('1')
            setCheckBox_WoGenMrPr('1')
        }else{
            console.log('0')
            setCheckBox_WoGenMrPr('0')
        }
      }

      const handleOnChangeMsetupMobileUser = () => {
        setMsetupMobileUser(!MsetupMobileUser);

        if(!MsetupMobileUser){
            console.log('1')
            setCheckBox_MsetupMobileUser('1')
        }else{
            console.log('0')
            setCheckBox_MsetupMobileUser('0')
        }
      }

      const handleOnChangePmGenerator = () => {
        setPmGenerator(!PmGenerator);

        if(!PmGenerator){
            console.log('1')
            setCheckBox_PmGenerator('1')
        }else{
            console.log('0')
            setCheckBox_PmGenerator('0')
        }
      }

      const handleOnChangeTimeCardEnter = () => {
        setTimeCardEnter(!TimeCardEnter);

        if(!TimeCardEnter){
            console.log('1')
            setCheckBox_TimeCardEnter('1')
        }else{
            console.log('0')
            setCheckBox_TimeCardEnter('0')
        }
      }

      const handleOnChangeChecklist = () => {
        setChecklist(!Checklist);

        if(!Checklist){
            console.log('1')
            setCheckBox_Checklist('1')
        }else{
            console.log('0')
            setCheckBox_Checklist('0')
        }
      }

      const handleOnChangeTimeCardVoid = () => {
        setTimeCardVoid(!TimeCardVoid);

        if(!TimeCardVoid){
            console.log('1')
            setCheckBox_TimeCardVoid('1')
        }else{
            console.log('0')
            setCheckBox_TimeCardVoid('0')
        }
      }

      const handleOnChangeMobile = () => {
        setMobile(!Mobile);

        if(!Mobile){
            console.log('1')
            setCheckBox_Mobile('1')
        }else{
            console.log('0')
            setCheckBox_Mobile('0')
        }
      }

      const handleOnChangeCore = () => {
        setCore(!Core);

        if(!Core){
            console.log('1')
            setCheckBox_Core('1')
        }else{
            console.log('0')
            setCheckBox_Core('0')
        }
      } 

      const handleOnChangeWebwork = () => {
        setWebwork(!Webwork);

        if(!Webwork){
            console.log('1')
            setCheckBox_Webwork('1')
        }else{
            console.log('0')
            setCheckBox_Webwork('0')
        }
      }



      
      


  return (   

        <div>
            <div className="page-header" style={{ marginTop: "-10px", marginBottom:"10px" }}>
            <h3 className="page-title">Personnel Master</h3>   

            <nav aria-label="breadcrumb">
                {/* <ol className="breadcrumb"></ol> */}
                    <div className="template-demo">

                        <button type="button" className="btn btn-success btn-icon-text" onClick={onClickChange}>
                            <i className="mdi mdi-file-check btn-icon-prepend" ></i>  {Button_save}
                        </button>

                        <button type="button" className="btn btn-danger btn-icon-text">
                            <i className="mdi mdi-close-circle-outline btn-icon-prepend"></i> Cancel 
                        </button>
                    
                    </div>
                
            </nav>       
        
        </div> 

    <div className="col-12 grid-margin">
        <div className="card" style={{marginLeft: "-15px", marginRight: "-15px"}}>
            <div className="card-body"> 
            <form className="form-sample" validated={validated}>  

                <div className="row">

                    <div className="col-md-10">

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Emp_EmployeeID">
                                    <label className="col-sm-5 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Employee ID:</label>
                                    <div className="col-sm-7">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" value={Emp_EmployeeID} onChange={(e) => setEmp_EmployeeID(e.target.value)}/>
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Emp_Name">
                                    <label className="col-sm-2 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Name:</label>
                                    <div className="col-sm-10">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" value={Emp_Name} onChange={(e) => setEmp_Name(e.target.value)}/>
                                    </div>
                                </Form.Group>                        
                            </div> 
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Employee_Status">                                  
                                    <Form.Label className="col-sm-5 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Status:</Form.Label>
                                    <div className="col-sm-7">
                                        <Select  
                                            isClearable={true}  
                                            options={Employee_Status}
                                            value={selected_Employee_Status}
                                            onChange={setSelected_Employee_Status} // using id as it is unique
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
                                <Form.Group className="row" controlId="validation_Emp_Title">
                                    <label className="col-sm-2 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Title:</label>
                                    <div className="col-sm-10">
                                        <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" value={Emp_Title} onChange={(e) => setEmp_Title(e.target.value)}/>
                                    </div>
                                </Form.Group>
                            </div>                         
                        </div>

                        <div className="row">
                            <div className="col-md-6">                                
                                <Form.Group className="row" controlId="validation_Employee_User_Group">
                                    <Form.Label className="col-sm-5 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>User Group:</Form.Label>
                                    <div className="col-sm-7">
                                        <Select  
                                            isClearable={true}  
                                            options={Employee_User_Group}
                                            value={selected_Employee_User_Group}
                                            onChange={setSelected_Employee_User_Group} // using id as it is unique
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
                                <Form.Group className="row" controlId="validation_Employee_Login_Id">
                                    <label className="col-sm-2 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Login ID:</label>
                                    <div className="col-sm-5">
                                    <Select  
                                        isClearable={true}  
                                        options={Employee_Login_Id}
                                        value={selected_Employee_Login_Id}
                                        onChange={setSelected_Employee_Login_Id} // using id as it is unique
                                        required
                                        styles={{ 
                                            control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                            singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                          }}
                                    />
                                </div>

                                <div className="col-sm-5">
                                    <label className="col-form-label"><a href="">Create New User Login</a></label>
                                </div>
                                </Form.Group>
                            </div> 
                        </div>

                        <div className="row">              
                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_Dashboard_Access">
                                    <label className="col-sm-5 col-form-label">Dashboard Access:</label>
                                    <div className="col-sm-7">
                                        <Select  
                                            isClearable={true}  
                                            value={selected_dashboard_access}
                                            onChange={setSelected_dashboard_access}
                                            options={dashboard_access}
                                            styles={{ 
                                                control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                }}
                                            />
                                    </div>
                                </Form.Group>
                            </div>  

                            <div className="col-md-6">
                                <Form.Group className="row" controlId="validation_PrivilegeTemplate">
                                    <label className="col-sm-5 col-form-label">Privilege Template:</label>
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
                                {/* <img src={require("../../assets/images/product_images_2/thumb_image5.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image6.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image7.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image8.jpg")} className="sliderimg" alt=""/>                                    
                                <img src={require("../../assets/images/product_images_2/thumb_image9.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image10.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image11.jpg")} className="sliderimg" alt=""/>
                                <img src={require("../../assets/images/product_images_2/thumb_image12.jpg")} className="sliderimg" alt=""/> */}
                                
                            </AliceCarousel>
                                
                        </div>

                    </div>
                    
                </div>  

                <section id="tab-menus">

                    <Tabs defaultActiveKey="Details" id="uncontrolled-tab-example" className="mb-4">


                        {/* ************************************* Details **************************************** */}

                        <Tab eventKey="Details" title="Details" class="nav-link active">
                            
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_Emp_HomePhone">
                                                <label className="col-sm-3 col-form-label">Home Phone:</label>
                                                <div className="col-sm-9">
                                                    <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" value={Emp_HomePhone} onChange={(e) => setEmp_HomePhone(e.target.value)}/>
                                                </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_BirthDate">
                                                <label className="col-sm-3 col-form-label">Date of Birth:</label>
                                                <div className="col-sm-9">
                                                    <Form.Control
                                                        style={{ fontSize: "13px", height: "38px" }}
                                                        type="datetime-local"
                                                        value ={BirthDate} 
                                                        onChange={(e) => setBirthDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                        />
                                                </div>
                                            </Form.Group>
                                        </div> 
                                    </div>

                                    <div className="row" style={{ marginTop: "-20px" }}>
                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_Emp_EmergencyName">
                                                <label className="col-sm-3 col-form-label">Emergency Name:</label>
                                                <div className="col-sm-9">
                                                    <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" value={Emp_EmergencyName} onChange={(e) => setEmp_EmergencyName(e.target.value)}/>
                                                </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_HireDate">
                                                <label className="col-sm-3 col-form-label">Date of Hire:</label>
                                                <div className="col-sm-9">
                                                <Form.Control    
                                                    style={{ fontSize: "13px", height: "38px" }}                                        
                                                    type="datetime-local"  
                                                    value={HireDate} 
                                                    onChange={(e) => setHireDate(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                                    /> 
                                                    </div>
                                            </Form.Group>
                                        </div>  
                                    </div> 

                                    <div className="row" style={{ marginTop: "-20px" }}>
                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_Emp_EmergencyPhone">
                                                <label className="col-sm-3 col-form-label">Emergency Phone:</label>
                                                <div className="col-sm-9">
                                                    <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" value={Emp_EmergencyPhone} onChange={(e) => setEmp_EmergencyPhone(e.target.value)}/>
                                                </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_Emp_PayRate">
                                                <label className="col-sm-3 col-form-label">Pay Rate:</label>
                                                <div className="col-sm-9">
                                                    <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" value={Emp_PayRate} onChange={(e) => setEmp_PayRate(e.target.value)}/>
                                                </div>
                                            </Form.Group>
                                        </div> 
                                    </div>  

                                    <div className='row' style={{ marginTop: "-20px" }}>
                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_sex">
                                                <label className="col-sm-3 col-form-label">Sex:</label>
                                                <div className="col-sm-9">
                                                <Select  
                                                    isClearable={true}  
                                                    value={selected_sex}
                                                    onChange={setSelected_sex}
                                                    options={sex}
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                        }}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_Emp_PayPeriod">
                                                <label className="col-sm-3 col-form-label">Pay Period:</label>
                                                <div className="col-sm-9">
                                                    <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" value={Emp_PayPeriod} onChange={(e) => setEmp_PayPeriod(e.target.value)}/>
                                                </div>
                                            </Form.Group>
                                        </div>  
                                    </div>

                                    <div className='row' style={{ marginTop: "-20px" }}>                                    
                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_marital_statuse">
                                                <label className="col-sm-3 col-form-label">Marital Status:</label>
                                                <div className="col-sm-9">
                                                <Select  
                                                    isClearable={true}  
                                                    value={selected_marital_status}
                                                    onChange={setSelected_marital_status}
                                                    options={marital_status}
                                                    styles={{ 
                                                        control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                        singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                        }}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </div>  

                                        <div className="col-md-6">
                                            <Form.Group className="row" controlId="validation_marital_statuse">
                                                <label className="col-sm-3 col-form-label">Shift:</label>
                                                <div className="col-sm-9">
                                                    <Select  
                                                        isClearable={true}  
                                                        value={selected_shift}
                                                        onChange={setSelected_shift}
                                                        options={shift}
                                                        styles={{ 
                                                            control: (styles) => ({ ...styles, fontSize: "13px" }), 
                                                            singleValue: (styles) => ({ ...styles, fontSize: "13px" })
                                                          }}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </div>                                        
                                    </div>

                                    <div className='row' style={{ marginTop: "-20px" }}>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Email ID:</label>
                                                <div className="col-sm-9">
                                                    <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" value={Emp_EmailID} onChange={(e) => setEmp_EmailID(e.target.value)}/>
                                                </div>
                                            </Form.Group>
                                        </div>    

                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Supervisor ID:</label>
                                                <div className="col-sm-9">
                                                    <Select  
                                                        isClearable={true}  
                                                        options={Employee_Supervisor_Id}
                                                        value={selected_Employee_Supervisor_Id}
                                                        onChange={setSelected_Employee_Supervisor_Id} // using id as it is unique
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

                                    <div className='row' style={{ marginTop: "-20px" }}>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Primary Craft:</label>
                                                <div className="col-sm-9">
                                                    <Select  
                                                        isClearable={true}  
                                                        options={Employee_Primary_Craft}
                                                        value={selected_Employee_Primary_Craft}
                                                        onChange={setSelected_Employee_Primary_Craft} // using id as it is unique
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
                                                <label className="col-sm-3 col-form-label">Supervisor Name:</label>
                                                <div className="col-sm-9"></div>
                                            </Form.Group>
                                        </div>                                      
                                    </div>

                                    <div className='row' style={{ marginTop: "-20px" }}>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Work Area:</label>
                                                <div className="col-sm-9">
                                                    <Select  
                                                        isClearable={true}  
                                                        options={Employee_Work_Id}
                                                        value={selected_Employee_Work_Id}
                                                        onChange={setSelected_Employee_Work_Id} // using id as it is unique
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
                                                <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Work Group:</label>
                                                <div className="col-sm-9">
                                                    <Select  
                                                        isClearable={true}  
                                                        options={Employee_Work_Group}
                                                        value={selected_Employee_Work_Group}
                                                        onChange={setSelected_Employee_Work_Group} // using id as it is unique
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

                                    <div className="row" style={{ marginTop: "-20px" }}>
                                        <div className="col-md-6">
                                            <Form.Group className="row">
                                                <label className="col-sm-3 col-form-label">Remarks:</label>
                                                <div className="col-sm-9">
                                                <Form.Control 
                                                    style={{ fontSize: "13px" }}
                                                    as="textarea" 
                                                    rows={19} 
                                                    value={Remarks}
                                                    onChange={(e) => setRemarks(e.target.value)}
                                                />
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>  
                
                        </Tab>


                        {/* ************************************* Settings *************************************** */}

                        <Tab eventKey="Settings" title="Settings" class="nav nav-tabs nav-item nav-link active">
                            
                            <div className="row">
                                <div className='col-md-3'>
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">MR Approver / Global Limit:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={MrApprover}
                                                onChange={handleOnChangeMrApprover}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>    
                                    </Form.Group>          
                                </div>

                                <div className="col-md-3">
                                    <Form.Group className="mb-3">
                                            <Form.Control style={{ fontSize: "13px", height: "38px" }} type="number" placeholder=".00" value={selected_MrApprover} disabled ={MrApprover} onChange={(e) => setselected_MrApprover(e.target.value)} />
                                    </Form.Group>
                                </div>

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Schedule Work Order:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={WoSched}
                                                onChange={handleOnChangeWoSched}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div> 
                                    </Form.Group>
                                </div>
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">WO Budget Approver / Limit:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={WoBudgetApprover}
                                                onChange={handleOnChangeWoBudgetApprover}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div> 
                                    </Form.Group>
                                </div>   

                                <div className="col-md-3">
                                    <Form.Group className="mb-3">
                                            <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" placeholder=".00" value={selected_WoBudgetApprover} disabled ={WoBudgetApprover} onChange={(e) => setselected_WoBudgetApprover(e.target.value)} />
                                    </Form.Group>
                                </div> 
                                
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">PO Buyer:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={PoBuyer}
                                                onChange={handleOnChangePoBuyer}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div> 
                                    </Form.Group>
                                </div>  
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">PR Approver / Global Limit:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={PrApprover}
                                                onChange={handleOnChangePrApprover}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div> 
                                    </Form.Group>
                                </div>   

                                <div className="col-md-3">
                                    <Form.Group className="mb-3">
                                            <Form.Control style={{ fontSize: "13px", height: "38px" }} type="text" placeholder=".00" value={selected_PrApprover} disabled ={PrApprover} onChange={(e) => setselected_PrApprover(e.target.value)} />
                                    </Form.Group>
                                </div>  

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Supervisor:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Supervisor}
                                                onChange={handleOnChangeSupervisor}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div> 
                                    </Form.Group>
                                </div>   
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">WR Approver:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                 className="form-check-input"
                                                 checked={WrApprover}
                                                 onChange={handleOnChangeWrApprover}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>    

                                <div className="col-md-3"></div> 

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Foreman:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Foreman}
                                                onChange={handleOnChangeForeman}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>   
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Assign To:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Planner}
                                                onChange={handleOnChangePlanner}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>    

                                <div className="col-md-3"></div>  

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Asset Tagging Posting:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={AssetTagFlag}
                                                onChange={handleOnChangeAssetTagFlag}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div> 
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Request Pats & Services:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={WoGenMrPr}
                                                onChange={handleOnChangeWoGenMrPr}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>     

                                <div className="col-md-3"></div> 

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Mobile User:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={MsetupMobileUser}
                                                onChange={handleOnChangeMsetupMobileUser}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>  
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">PM Generator:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={PmGenerator}
                                                onChange={handleOnChangePmGenerator}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>   

                                <div className="col-md-3"></div> 

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Mobile Device ID:</label>
                                        <div className="col-sm-2 form-check"></div>
                                    </Form.Group>
                                </div>   
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Enter Time Card:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={TimeCardEnter}
                                                onChange={handleOnChangeTimeCardEnter}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>   

                                <div className="col-md-3"></div> 

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Add/Delete Check List:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Checklist}
                                                onChange={handleOnChangeChecklist}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div> 
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Void Time Card:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={TimeCardVoid}
                                                onChange={handleOnChangeTimeCardVoid}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>   

                                <div className="col-md-3"></div> 

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Mobile Access:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Mobile}
                                                onChange={handleOnChangeMobile}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>  
                            </div> 

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Core Access:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Core}
                                                onChange={handleOnChangeCore}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>      

                                <div className="col-md-3"></div> 

                                <div className="col-md-3">
                                    <Form.Group className="row">
                                        <label className="col-sm-9 col-form-label">Webwork Access:</label>
                                        <div className="col-sm-2 form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Webwork}
                                                onChange={handleOnChangeWebwork}
                                                />
                                                <i className="input-helper"></i>
                                            </label>
                                        </div>
                                    </Form.Group>
                                </div>    
                            </div> 
                        </Tab>


                        {/* ************************************* UDF1 ******************************************* */}

                        <Tab eventKey="UDF1" title="UDF1" class="nav-link active">


                            <div className="row">
                                <div className='col'>
                                    <div className="col-md-13">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            EPS ID:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_1}
                                                onChange={(e) => setUDFText_1(e.target.value)}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar2:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_2}
                                                onChange={(e) => setUDFText_2(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar3:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_3}
                                                onChange={(e) => setUDFText_3(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar4:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_4}
                                                onChange={(e) => setUDFText_4(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar5:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
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
                                            rows={19} 
                                            value={UDFNote1} 
                                            onChange={(e) => setUDFNote1(e.target.value)}
                                        />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar6:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                            style={{ fontSize: "13px", height: "38px" }}
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
                                        Datetime1:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control   
                                        style={{ fontSize: "13px", height: "38px" }}                                         
                                        type="datetime-local"  
                                        value={UDFDate_1} 
                                        onChange={(e) => setUDFDate_1(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar7:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        Datetime2:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_2} 
                                        onChange={(e) => setUDFDate_2(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date 
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar8:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        Datetime3:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_3} 
                                        onChange={(e) => setUDFDate_3(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date 
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar9:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        Datetime4:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_4} 
                                        onChange={(e) => setUDFDate_4(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar10:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        style={{ fontSize: "13px", height: "38px" }}
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
                                        Datetime5:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_5} 
                                        onChange={(e) => setUDFDate_5(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date 
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Tab>


                        {/* ************************************* UDF2 ******************************************* */}

                        <Tab eventKey="UDF2" title="UDF2" class="nav-link active">


                            <div className="row">
                                <div className='col'>
                                    <div className="col-md-13">
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar11:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_11}
                                                onChange={(e) => setUDFText_11(e.target.value)}
                                            />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar12:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_12}
                                                onChange={(e) => setUDFText_12(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar13:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_13}
                                                onChange={(e) => setUDFText_13(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar14:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_14}
                                                onChange={(e) => setUDFText_14(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-13" style={{ marginTop: "-20px" }}>
                                        <Form.Group className="row">
                                        <label className="col-sm-4 col-form-label">
                                            Varchar15:
                                        </label>
                                        <div className="col-sm-8">
                                            <Form.Control
                                                style={{ fontSize: "13px", height: "38px" }}
                                                type="text"
                                                value={UDFText_15}
                                                onChange={(e) => setUDFText_15(e.target.value)}
                                                />
                                        </div>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row">
                                    <label className="col-sm-2 col-form-label">
                                            Note2:
                                    </label>
                                    <div className="col-sm-10">
                                        <Form.Control 
                                            style={{ fontSize: "13px" }}
                                            as="textarea" 
                                            rows={19} 
                                            value={UDFNote2}
                                            onChange={(e) => setUDFNote2(e.target.value)}
                                        />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar16:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value={UDFText_16}
                                        onChange={(e) => setUDFText_16(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric6:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_6} 
                                        onChange={(e) => setUDFNumber_6(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Datetime6:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_6} 
                                        onChange={(e) => setUDFDate_6(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date 
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar17:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value={UDFText_17}
                                        onChange={(e) => setUDFText_17(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric7:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_7} 
                                        onChange={(e) => setUDFNumber_7(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Datetime7:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_7} 
                                        onChange={(e) => setUDFDate_7(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar18:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value={UDFText_18}
                                        onChange={(e) => setUDFText_18(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric8:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_8} 
                                        onChange={(e) => setUDFNumber_8(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Datetime8:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_8} 
                                        onChange={(e) => setUDFDate_8(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar19:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value={UDFText_19}
                                        onChange={(e) => setUDFText_19(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric9:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control 
                                        style={{ fontSize: "13px", height: "38px" }} 
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_9} 
                                        onChange={(e) => setUDFNumber_9(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Datetime9:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_9} 
                                        onChange={(e) => setUDFDate_9(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Varchar20:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="text"
                                        value={UDFText_20}
                                        onChange={(e) => setUDFText_20(e.target.value)}
                                            />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Numeric10:
                                    </label>
                                    <div className="col-sm-8">
                                    <Form.Control  
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="number"  
                                        placeholder=".0000" 
                                        value={UDFNumber_10} 
                                        onChange={(e) => setUDFNumber_10(e.target.value)}
                                        />
                                    </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-4">
                                    <Form.Group className="row">
                                    <label className="col-sm-4 col-form-label">
                                        Datetime10:
                                    </label>
                                    <div className="col-sm-8">
                                        <Form.Control
                                        style={{ fontSize: "13px", height: "38px" }}
                                        type="datetime-local"
                                        value={UDFDate_10} 
                                        onChange={(e) => setUDFDate_10(Moment(e.target.value).format('YYYY-MM-DDTHH:mm:ss'))} //insert and show date
                                        />
                                    </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Tab>


                        {/* ************************************* Maintenance ************************************ */}

                        <Tab eventKey="Maintenance" title="Maintenance" class="nav-link active">

                            <PersonnelMaintenance name={'PersonnelFrom'} />

                        </Tab>


                        {/* ************************************* PR Approval ************************************ */}

                        <Tab
                            eventKey="PR Approval"
                            title="PR Approval"
                            class="nav-link active"
                        ></Tab>


                        {/* ************************************* MR Approval ************************************ */}

                        <Tab
                            eventKey="MR Approval"
                            title="MR Approval"
                            class="nav-link active"
                        ></Tab>


                        {/* ************************************* Stock Location ********************************* */}

                        <Tab
                            eventKey="Stock Location"
                            title="Stock Location"
                            class="nav-link active"
                        ></Tab>


                        {/* ************************************* Reference ************************************** */}

                        <Tab
                            eventKey="Reference"
                            title="Reference"
                            class="nav-link active"
                        >
                            <Form.Group>
                                <label>File upload</label>
                                <div className="custom-file">
                                    <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                                    <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                                </div>
                            </Form.Group> 
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

export default PersonnalFrom;
