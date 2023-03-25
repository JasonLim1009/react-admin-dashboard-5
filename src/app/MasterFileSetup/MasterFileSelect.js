import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import APIServices from "../services/APIServices";
import Moment from 'moment';

const MasterFileSelect = (props) => {
  const history = useHistory();
  const [title, settitle] = useState("");
  const [ButtonName, setButtonName] = useState("");
  const [show, setShow] = useState(false);
  const [Check_box, setcheckbox] = useState(false);

  //Master

  
  const [show_Master_UserGroup, setshow_Master_UserGroup] = useState(false);
  const [show_Master_AutoNumber, setshow_Master_AutoNumber] = useState(false);
  const [show_Master_CraftCode, setshow_Master_CraftCode] = useState(false);
  const [show_Master_statusCategory, setshow_Master_statusCategory] =useState(false);
  const [show_Master_StatusType, setshow_Master_StatusType] = useState(false);
  const [show_Master_CostCenter, setshow_Master_CostCenter] = useState(false);
  const [show_Master_Account, setshow_Master_Account] = useState(false);
  const [show_Master_CurrencyCode, setshow_Master_CurrencyCode] =useState(false);
  const [show_Master_TaxCode, setshow_Master_TaxCode] = useState(false);
  const [show_Master_UOMType, setshow_Master_UOMType] = useState(false);
  const [show_Master_UOMMaster, setshow_Master_UOMMaster] = useState(false);
  const [show_Master_UOMConFactor, setshow_Master_UOMConFactor] =useState(false);
  const [show_Master_BillTo, setshow_Master_BillTo] = useState(false);
  const [show_Master_ShipTo, setshow_Master_ShipTo] = useState(false);
  const [show_Master_SupplierStatus, setshow_Master_SupplierStatus] =useState(false);
  const [show_Master_ProjectMaster, setshow_Master_ProjectMaster] =useState(false);
  const [show_Master_CustomerStatus, setshow_Master_CustomerStatus] =useState(false);

  //Asset
  const [show_AssetCode, setshow_AssetCode] = useState(false);
  const [show_AssetCriticalFactor, setshow_AssetCriticalFactor] =useState(false);
  const [show_AssetGroupCode, setshow_AssetGroupCode] = useState(false);
  const [show_AssetLevel, setshow_AssetLevel] = useState(false);
  const [show_AssetLocation, setshow_AssetLocation] = useState(false);
  const [show_AssetStatus, setshow_AssetStatus] = useState(false);
  const [show_AssetType, setshow_AssetType] = useState(false);
  const [show_AssetWorkArea, setshow_AssetWorkArea] = useState(false);

  //Work
  const [show_Workstatus, setshow_Workstatus] = useState(false);
  const [show_WorkPriority, setshow_WorkPriority] = useState(false);
  const [show_WorkGroup, setshow_WorkGroup] = useState(false);
  const [show_WorkClass, setshow_WorkClass] = useState(false);
  const [show_WorkType, setshow_WorkType] = useState(false);
  const [show_WorkFaultCode, setshow_WorkFaultCode] = useState(false);
  const [show_WorkCauseCode, setshow_WorkCauseCode] = useState(false);
  const [show_WorkActionCode, setshow_WorkActionCode] = useState(false);
  const [show_WorkDelayCode, setshow_WorkDelayCode] = useState(false);

  //Material
  const [show_Material_LocationCategory, setshow_Material_LocationCategory] =useState(false);
  const [show_Material_Location, setshow_Material_Location] = useState(false);
  const [show_Material_Status, setshow_Material_Status] = useState(false);
  const [show_Material_CommodityCode, setshow_Material_CommodityCode] =useState(false);
  const [show_Material_GroupCode, setshow_Material_GroupCode] = useState(false);

  //PM
  const [show_PM_FrequencyCode, setshow_PM_FrequencyCode] = useState(false);
  const [show_PM_GroupMaster, setshow_PM_GroupMaster] = useState(false);
  const [show_PM_TaskGroup, setshow_PM_TaskGroup] = useState(false);

  //Purchasing
  const [show_Purchasing_PRStatus, setshow_Purchasing_PRStatus] = useState(false);
  const [show_Purchasing_POStatus, setshow_Purchasing_POStatus] = useState(false);
  const [show_Purchasing_ConstractStatus, setshow_Purchasing_ConstractStatus] = useState(false);
  const [show_Purchasing_ConstractGroup, setshow_Purchasing_ConstractGroup] = useState(false);
  const [show_Purchasing_Type, setshow_Purchasing_Type] = useState(false);
  const [show_Purchasing_Priority, setshow_Purchasing_Priority] = useState(false);

  // Personnal
  const [show_Personnal_EmployeeStatus, setshow_Personnal_EmployeeStatus] = useState(false);

  // Invoice
  const [show_Invoice_PaymentMethod, setshow_Invoice_PaymentMethod] = useState(false);

//-----------------------------------------------------------------Master------------------------------------------------
  //Master User Group

  const[Master_UserGroup,setMaster_UserGroup]= useState({
    User_Group:'',
    UserGroup_readOnly: false,
    UserGroup_Description:'',
    UserGroup_Disable_Checkbox:false
  })

  const{User_Group,UserGroup_readOnly,UserGroup_Description,DisabUserGroup_Disable_Checkboxle_Checkbox} = Master_UserGroup;

  const [Master_User_Group_UserGroup, setMaster_User_Group_UserGroup]=useState("");
  const [Master_User_Group_UserGroup_readOnly, setMaster_User_Group_UserGroup_readOnly]=useState(false);
  const [Master_User_Group_Description, setMaster_User_Group_Description]=useState("");
  const [Master_User_Group_Disable_Checkbox, setMaster_User_Group_Disable_checkbox]=useState(false)

  //Master Auto Number
  const [ModuleCode, setModuleCode]=useState("");
  const [ModuleCode_readOnly, setModuleCode_readOnly]=useState(false);
  const [Master_AutoNumber_Description, setMaster_AutoNumber_Description]=useState("");
  const [AutoNumbering, setAutoNumbering]=useState([ { value: 'A', label: 'Auto' },{ value: 'M', label: 'Manual'},]);
  const [selected_AutoNumbering, setSelected_AutoNumbering] = useState([]);
  const [Prefix, setPrefix]=useState("");
  const [Master_AutoNumber_Counter, setMaster_AutoNumber_Counter]=useState("");
  const [Master_AutoNumber_Counter_readOnly, setMaster_AutoNumber_Counter_readOnly]=useState(false);
  const [Option, setOption]=useState("");

  //Master Craft Code
  const [CraftCode, setCraftCode]=useState("");
  const [CraftCode_readOnly, setCraftCode_readOnly]=useState(false);
  const [Master_CraftCode_Description, setMaster_CraftCode_Description]=useState("");
  const [EstimateRate, setEstimateRate]=useState("");
  const [EstimateRate_readOnly, setEstimateRate_readOnly]=useState(false);
  const [ChangeDate, setChangeDate]=useState("");
  const [Master_CraftCode_DisableFlag_Checkbox, setMaster_CraftCode_DisableFlag_checkbox]=useState(false)

  //Master status category
  const [Master_statusCategoryCategoryCode, setMaster_statusCategoryCategoryCode]=useState("");
  const [Master_statusCategoryCategoryCode_readOnly, setMaster_statusCategoryCategoryCode_readOnly]=useState(false);
  const [Master_statusCategory_Description, setMaster_statusCategory_Description]=useState("");

  //Master status type
  const [Master_StatusType_CategoryCode, setMaster_StatusType_CategoryCode]=useState("");
  const [Master_StatusType_CategoryCode_readOnly, setMaster_StatusType_CategoryCode_readOnly]=useState(false);
  const [Master_StatusType_TypeCode, setMaster_StatusType_TypeCode]=useState("");
  const [Master_StatusType_TypeCode_readOnly, setMaster_StatusType_TypeCode_readOnly]=useState(false);
  const [Master_StatusType_Description, setMaster_StatusType_Description]=useState("");

  //Master Cost Center
  const [Master_CostCenter_CostCenter, setMaster_CostCenter_CostCenter]=useState("");
  const [Master_CostCenter_CostCenter_readOnly, setMaster_CostCenter_CostCenter_readOnly]=useState(false);
  const [Master_CostCenter_Description, setMaster_CostCenter_Description]=useState("");
  const [Master_CostCenter_Disable_Checkbox, setMaster_CostCenter_Disable_checkbox]=useState(false)

  //Master Account
  const [Master_Account_Account, setMaster_Account_Account]=useState("");
  const [Master_Account_Account_readOnly, setMaster_Account_Account_readOnly]=useState(false);
  const [Master_Account_Description, setMaster_Account_Description]=useState("");
  const [Master_Account_Disable_Checkbox, setMaster_Account_Disable_checkbox]=useState(false)

  //Master Currency Code
  const [CurrencyCode, setCurrencyCode]=useState("");
  const [CurrencyCode_readOnly, setCurrencyCode_readOnly]=useState(false);
  const [CurrencyDescription, setCurrencyDescription]=useState("");
  const [CurrencyLabel, setCurrencyLabel]=useState("");
  const [ExchangeRate, setExchangeRate]=useState("");
  const [ExchangeRate_readOnly, setExchangeRate_readOnly]=useState(false);
  const [ExchangeRateDate, setExchangeRateDate]=useState("");
  const [FormatString, setFormatString]=useState("");
  const [BaseCurrency_Checkbox, setBaseCurrency_checkbox]=useState(false)

  //Master Tax Code
  const [TypeOfTax, setTypeOfTax]=useState([ { value: 'S', label: 'Supply' },{ value: 'P', label: 'Purchase'},{ value: 'A', label: 'All'},]);
  const [selected_TypeOfTax, setSelected_TypeOfTax] = useState([]);
  const [TypeOfTax_readOnly, setTypeOfTax_readOnly]=useState(false);
  const [TaxCode, setTaxCode]=useState("");
  const [TaxCode_readOnly, setTaxCode_readOnly]=useState(false);
  const [Master_TaxCode_Description, setMaster_TaxCode_Description]=useState("");
  const [TaxRate, setTaxRate]=useState("");
  const [TaxRate_readOnly, setTaxRate_readOnly]=useState(false);
  const [Master_TaxCode_DisableFlag_Checkbox, setMaster_TaxCode_DisableFlag_checkbox]=useState(false)

  //Master UOM Type
  const [Master_UOM_TypeCode, setMaster_UOM_TypeCode]=useState("");
  const [Master_UOM_TypeCode_readOnly, setMaster_UOM_TypeCode_readOnly]=useState(false);
  const [Master_UOMType_Description, setMaster_UOMType_Description]=useState("");
  const [Master_UOMType_DisableFlag_Checkbox, setMaster_UOMType_DisableFlag_checkbox]=useState(false)

  //Master UOM Master
  const [Master_UOMMaster_TypeCode, setMaster_UOMMaster_TypeCode]=useState("");
  const [Master_UOMMaster_TypeCode_readOnly, setMaster_UOMMaster_TypeCode_readOnly]=useState(false);
  const [UomCode, setUomCode]=useState("");
  const [UomCode_readOnly, setUomCode_readOnly]=useState(false);
  const [Master_UOMMaster_Description, setMaster_UOMMaster_Description]=useState("");
  const [Master_UOMMaster_DisableFlag_Checkbox, setMaster_UOMMaster_DisableFlag_checkbox]=useState(false)

  //Master UOM Con Factor
  const [FromUom, setFromUom]=useState([]);
  const [selected_FromUom, setselected_FromUom]=useState([]);
  const [FromUom_readOnly, setFromUom_readOnly]=useState(false);
  const [ToUom, setToUom]=useState([]);          
  const [selected_ToUom, setselected_ToUom]=useState([]);
  const [ConversionFactor, setConversionFactor]=useState()

        
  //Master Bill To 
  const [BillTo, setBillTo]=useState("");
  const [BillTo_readOnly,setBillTo_readOnly]=useState(false);     
  const [Contact, setContact]=useState("");
  const [Phone, setPhone]=useState("");
  const [Address1, setAddress1]=useState("");
  const [Address2, setAddress2]=useState("");
  const [City, setCity]=useState("");
  const [State, setState]=useState("");
  const [PostalCode, setPostalCode]=useState("");
  const [Province, setProvince]=useState("");
  const [Country, setCountry]=useState("");
  const [Note, setNote]=useState("");
  const [Master_BillTo_DisableFlag_Checkbox, setMaster_BillTo_DisableFlag_checkbox]=useState(false)

  //Master Ship To  
  const [ShipTo, setShipTo]=useState("");
  const [ShipTo_readOnly,setShipTo_readOnly]=useState(false);
  const [Master_ShipTo_Contact, setMaster_ShipTo_Contact]=useState("");
  const [Master_ShipTo_Phone, setMaster_ShipTo_Phone]=useState("");
  const [Master_ShipTo_Address1, setMaster_ShipTo_Address1]=useState("");
  const [Master_ShipTo_Address2, setMaster_ShipTo_Address2]=useState("");
  const [Master_ShipTo_City, setMaster_ShipTo_City]=useState("");
  const [Master_ShipTo_State, setMaster_ShipTo_State]=useState("");
  const [Master_ShipTo_PostalCode, setMaster_ShipTo_PostalCode]=useState("");
  const [Master_ShipTo_Province, setMaster_ShipTo_Province]=useState("");
  const [Master_ShipTo_Country, setMaster_ShipTo_Country]=useState("");
  const [Master_ShipTo_Note, setMaster_ShipTo_Note]=useState("");
  const [Master_ShipTo_DisableFlag_Checkbox, setMaster_ShipTo_DisableFlag_checkbox]=useState(false)
     
  //Master Supplier Status
  const [Master_SupplierStatus_TypeCode, setMaster_SupplierStatus_TypeCode]=useState("");
  const [Master_SupplierStatus_catcd, setMaster_SupplierStatus_catcd]=useState("");
  const [Master_SupplierStatus_TypeCode_readOnly, setMaster_SupplierStatus_TypeCode_readOnly]=useState(false);
  const [Master_SupplierStatus_Status, setMaster_SupplierStatus_Status]=useState("");
  const [Master_SupplierStatus_Status_readOnly, setMaster_SupplierStatus_Status_readOnly]=useState(false);
  const [Master_SupplierStatus_Description, setMaster_SupplierStatus_Description]=useState("");
  const [Master_SupplierStatus_DisableFlag_Checkbox, setMaster_SupplierStatus_DisableFlag_checkbox]=useState(false)
    
  //Master Project Master 
  const [ProjectCode, setProjectCode]=useState("");
  const [ProjectCode_readOnly,setProjectCode_readOnly]=useState(false);
  const [Master_ProjectMaster_Description, setMaster_ProjectMaster_Description]=useState("");
  const [ProjectDate, setProjectDate]=useState("");
  const [DueDate, setDueDate]=useState("");
  const [ProjectBudget, setProjectBudget]=useState("");
  const [ProjectBudget_readOnly,setProjectBudget_readOnly]=useState(false);
  const [Master_ProjectMaster_CostCenter, setMaster_ProjectMaster_CostCenter]=useState([]);
  const [selected_Master_ProjectMaster_CostCenter, setselected_Master_ProjectMaster_CostCenter]=useState([]);
  const [LaborAccount, setLaborAccount]=useState([]);
  const [selected_LaborAccount, setselected_LaborAccount]=useState([]);
  const [MaterialAccount, setMaterialAccount]=useState([]);
  const [selected_MaterialAccount, setselected_MaterialAccount]=useState([]);
  const [ContractAccount, setContractAccount]=useState([]);
  const [selected_ContractAccount, setselected_ContractAccount]=useState([]);
  const [Approved_Checkbox, setApproved_checkbox]=useState(false)
  const [Master_ProjectMaster_DisableFlag_Checkbox, setMaster_ProjectMaster_DisableFlag_checkbox]=useState(false)

  //Master Customer Status
  const [Master_CustomerStatus_TypeCode, setMaster_CustomerStatus_TypeCode]=useState("");
  const [Master_CustomerStatus_catcd, setMaster_CustomerStatus_catcd]=useState("");
  const [Master_CustomerStatus_TypeCode_readOnly, setMaster_CustomerStatus_TypeCode_readOnly]=useState(false);
  const [Master_CustomerStatus_Status, setMaster_CustomerStatus_Status]=useState("");
  const [Master_CustomerStatus_Status_readOnly, setMaster_CustomerStatus_Status_readOnly]=useState(false);
  const [Master_CustomerStatus_Description, setMaster_CustomerStatus_Description]=useState("");
  const [Master_CustomerStatus_DisableFlag_Checkbox, setMaster_CustomerStatus_DisableFlag_checkbox]=useState(false)



  //--------------------------------------------------------------Asset--------------------------------------------------
  //TypeCode
  const [Type_Code, setType_Code] = useState("");
  const [Type_Code_readOnly, setType_Code_readOnly] = useState(false);
  const [Description, setDescription] = useState("");
  const [TypeCode_Checkbox, setTypeCode_checkbox] = useState(false);

  //Asset_Group_Code
  const [AssetGroupCode, setAssetGroupCode] = useState("");
  const [AssetGroupCode_readOnly, setAssetGroupCode_readOnly] = useState(false);
  const [AssetGroupCode_Description, setAssetGroupCod_Description] = useState("");
  const [AssetGroupCode_Report_Description,setAssetGroupCode_Report__Description] = useState("");
  const [Counter, setCounter] = useState("");
  const [Seperator, setSeperator] = useState([]);
  const [Sample_Format, setSample_Format] = useState("");

  const Seperator12 = [
    { value: "-", label: "-" },
    { value: "/", label: "/" },
    { value: "|", label: "|" },
  ];

  const [Auto_no_Checkbox, setAuto_no_Checkbox] = useState(false);
  const [Generate_serialize_stock_Checkbox,setGenerate_serialize_stock_caheckbox] = useState(false);
const [Disable_Checkbox, setDisable_Checkbox ]=useState(false)

  //AssetCode
  const [AssetCode, setAssetCode] = useState("");
  const [AssetCode_readOnly, setAssetCode_readOnly] = useState(false);
  const [AssetCode_Description, setAssetCode_Description] = useState("");
  const [AssetCode_Checkbox, setAssetCode_checkbox] = useState(false);

  //CriticalFactor
  const [CriticalFactor, setCriticalFactor] = useState("");
  const [CriticalFactor_readOnly, setCriticalFactor_readOnly] = useState(false);
  const [CriticalFactor_Description, setCriticalFactor_Description] = useState("");
  const [CriticalFactor_Checkbox, setCriticalFactor_checkbox] = useState(false);

  //AssetStatus
  const [AssetType, setAssetType ]=useState("");
  const [AssetType_readOnly, setAssetType_readOnly ]=useState(false);
  const [AssetStatus, setAssetStatus ]=useState("");
  const [AssetStatus_readOnly, setAssetStatus_readOnly ]=useState(false);
  const [AssetStatus_Description, setAssetStatus_Description ]=useState("");
  const [CountDownTime_Checkbox, setCountDownTime_checkbox ]=useState(false)
  const [AS_Disable_Checkbox, setAS_Disable_Checkbox ]=useState(false)

  //AssetWorkArea
  const [AssetWorkArea, setAssetWorkArea] = useState("");
  const [AssetWorkArea_readOnly, setAssetWorkArea_readOnly] = useState(false);
  const [AssetWorkArea_Description, setAssetWorkArea_Description] = useState("");
  const [AssetWorkArea_Checkbox, setAssetWorkArea_checkbox] = useState(false);

  //AssetLocation
  const [AssetLocation, setAssetLocation] = useState("");
  const [AssetLocation_readOnly, setAssetLocation_readOnly] = useState(false);
  const [AssetLocation_Description, setAssetLocation_Description] = useState("");
  const [AssetLocation_Checkbox, setAssetLocation_checkbox] = useState(false);

  //AssetLevel
  const [AssetLevel, setAssetLevel] = useState("");
  const [AssetLevel_readOnly, setAssetLevel_readOnly] = useState(false);
  const [AssetLevel_Description, setAssetLevel_Description] = useState("");
  const [AssetLevel_Checkbox, setAssetLevel_checkbox] = useState(false);

  //-----------------------------------------------------------------------Work----------------------------------------------------------
  //Work Status
  const [Statustype, setStatustype]=useState([]);
  const [Statustype_readOnly, setStatustype_readOnly]=useState(false);
  const [selected_Statustype, setselected_Statustype]=useState([]);
  const [Status, setStatus]=useState("");
  const [Status_readOnly, setStatus_readOnly]=useState(false);
  const [WorkStatus_Description, setWorkStatus_Description]=useState("");
  const [EmailStatus_Checkbox, setEmailStatus_checkbox ]=useState()
  const [AutoSendEmail_Checkbox, setAutoSendEmail_checkbox ]=useState()
  const [EmailTemplate, setEmailTemplate]=useState("");
  const [EmailTemplate_readOnly, setEmailTemplate_readOnly]=useState(false);
  const [WorkStatus_Disable_Checkbox, setWorkStatus_Disable_checkbox ]=useState(false)

  //Work Priority
  const [PriorityCode, setPriorityCode]=useState("");
  const [PriorityCode_readOnly, setPriorityCode_readOnly]=useState(false);
  const [WorkPriority_Description, setWorkPriority_Description]=useState("");
  const [DueDateCount, setDueDateCount]=useState("");
  const [DueDateCount_readOnly, setDueDateCount_readOnly]=useState(false);
  const [WorkPriority_DisableFlag_Checkbox, setWorkPriority_DisableFlag_checkbox]=useState(false)

  //Work Group
  const [GroupCode, setGroupCode]=useState("");
  const [GroupCode_readOnly, setGroupCode_readOnly]=useState(false);
  const [WorkGroup_Description, setWorkGroup_Description]=useState("");
  const [ForemanEmployeeID, setForemanEmployeeID]=useState([]);
  const [selected_ForemanEmployeeID, setselected_ForemanEmployeeID]=useState([]);
  const [WorkGroup_DisableFlag_Checkbox, setWorkGroup_DisableFlag_checkbox]=useState(false)

  //Work Class
  const [ClassCode, setClassCode]=useState("");
  const [ClassCode_readOnly, setClassCode_readOnly]=useState(false);
  const [WorkClass_Description, setWorkClass_Description]=useState("");
  const [WorkClass_DisableFlag_Checkbox, setWorkClass_DisableFlag_checkbox]=useState(false)

  //Work Type
  const [TypeCode, setTypeCode]=useState("");
  const [TypeCode_readOnly, setTypeCode_readOnly]=useState(false);
  const [WorkType_Description, setWorkType_Description]=useState("");
  const [WorkType_DisableFlag_Checkbox, setWorkType_DisableFlag_checkbox]=useState(false)

  //Work Fault Code
  const [FaultCode, setFaultCode]=useState("");
  const [FaultCode_readOnly, setFaultCode_readOnly]=useState(false);
  const [WorkFaultCode_Description, setWorkFaultCode_Description]=useState("");
  const [WorkFaultCode_DisableFlag_Checkbox, setWorkFaultCode_DisableFlag_checkbox]=useState(false)

  //Work Cause Code
  const [CauseCode, setCauseCode]=useState("");
  const [CauseCode_readOnly, setCauseCode_readOnly]=useState(false);
  const [WorkCauseCode_Type, setWorkCauseCode_Type]=useState([ { value: 'C', label: 'Contingency' },{ value: 'R', label: 'Repair'},]);
  const [selected_WorkCauseCode_Type, setSelected_WorkCauseCode_Type] = useState([]);
  const [WorkCauseCode_Description, setWorkCauseCode_Description]=useState("");
  const [WorkCauseCode_DisableFlag_Checkbox, setWorkCauseCode_DisableFlag_checkbox]=useState(false)

  //Work Action Code
  const [ActionCode, setActionCode]=useState("");
  const [ActionCode_readOnly, setActionCode_readOnly]=useState(false);
  const [WorkActionCode_Description, setWorkActionCode_Description]=useState("");
  const [WorkActionCode_DisableFlag_Checkbox, setWorkActionCode_DisableFlag_checkbox]=useState(false)

  //Work Delay Code
  const [DelayCode, setDelayCode]=useState("");
  const [DelayCode_readOnly, setDelayCode_readOnly]=useState("");
  const [WorkDelayCode_Description, setWorkDelayCode_Description]=useState("");
  const [WorkDelayCode_DisableFlag_Checkbox, setWorkDelayCode_DisableFlag_checkbox]=useState(false)

  //-----------------------------------------------------------------Material-------------------------------------------------
   //Material Location Category
   const [LocationCategory, setLocationCategory]=useState("");
   const [LocationCategory_readOnly, setLocationCategory_readOnly]=useState(false);
   const [LocationCategory_Description, setLocationCategory_Description]=useState("");
   const [LocationCategory_ttloh, setLocationCategory_ttloh]=useState("");
   const [LocationCategory_usage, setLocationCategory_usage]=useState("");
   const [LocationCategory_val, setLocationCategory_val]=useState("");
   const [LocationCategory_rcv, setLocationCategory_rcv]=useState("");
   const [LocationCategory_consigned, setLocationCategory_consigned]=useState("");
   const [LocationCategory_DisableFlag_Checkbox, setLocationCategory_DisableFlag_checkbox]=useState(false)

    //Material Location 
    const [StockLocation, setStockLocation]=useState("");
    const [StockLocation_readOnly, setStockLocation_readOnly]=useState(false);
    const [MasterLocation, setMasterLocation]=useState("");
    const [MasterLocation_readOnly, setMasterLocation_readOnly]=useState(false);
    const [AreaCode, setAreaCode]=useState("");
    const [AreaCode_readOnly, setAreaCode_readOnly]=useState(false);
    const [BinID, setBinID]=useState("");
    const [BinID_readOnly, setBinID_readOnly]=useState(false);
    const [MaterialLocation_Seperator, setMaterialLocation_Seperator]=useState([ { value: 'N', label: 'None' },{ value: '-', label: '-'},{ value: '/', label: '/'},]);
    const  [selected_MaterialLocation_Seperator, setSelected_MaterialLocation_Seperator] = useState([]);
    const [StorageType, setStorageType]=useState("");
    const [StorageType_readOnly, setStorageType_readOnly]=useState(false);
    const [MaterialLocation_Description, setMaterialLocation_Description]=useState("");
    const [Capacity, setCapacity]=useState("");
    const [Capacity_readOnly, setCapacity_readOnly]=useState(false);
    const [CapacityUOM, setCapacityUOM]=useState([]);
    const [selected_CapacityUOM, setselected_CapacityUOM]=useState([]);
    const [Supplier, setSupplier]=useState([]);
    const [selected_Supplier, setselected_Supplier]=useState([]);
    const [CostCenter, setCostCenter]=useState([]);
    const [selected_CostCenter, setselected_CostCenter]=useState([]);
    const [Account, setAccount]=useState([]);
    const [selected_Account, setselected_Account]=useState([]);
    const [UpdateStockCosting_Checkbox, setUpdateStockCosting_checkbox]=useState(false)
    const [OnHold_Checkbox, setOnHold_checkbox]=useState(false)
    const [MaterialLocation_DisableFlag_Checkbox, setMaterialLocation_DisableFlag_checkbox]=useState(false)

    //Material Status
    const [StatusType, setStatusType]=useState("");
    const [Material_catcd, setMaterial_catcd]=useState("");
    const [StatusType_readOnly, setStatusType_readOnly]=useState(false);
    const [Material_Status, setMaterial_Status]=useState("");
    const [Material_Status_readOnly, setMaterial_Status_readOnly]=useState(false);
    const [MaterialStatus_Description, setMaterialStatus_Description]=useState("");
    const [MaterialStatus_DisableFlag_Checkbox, setMaterialStatus_DisableFlag_checkbox]=useState(false)

     //Material Commodity Code
     const [CommodityCode, setCommodityCode]=useState("");
     const [CommodityCode_cost, setCommodityCode_cost]=useState("");
     const [CommodityCode_readOnly, setCommodityCode_readOnly]=useState(false);
     const [MaterialCommodityCode_Description, setMaterialCommodityCode_Description]=useState("");
     const [MaterialCommodityCode_DisableFlag_Checkbox, setMaterialCommodityCode_DisableFlag_checkbox]=useState(false)

     //Material Group Code
     const [StockGroupCode, setStockGroupCode]=useState("");
     const [StockGroupCode_readOnly, setStockGroupCode_readOnly]=useState(false);
     const [MaterialGroupCode_Description, setMaterialGroupCode_Description]=useState("");
     const [MaterialGroupCode_DisableFlag_Checkbox, setMaterialGroupCode_DisableFlag_checkbox]=useState(false)

  //-----------------------------------------------------------------PM-------------------------------------------------
  //PM_FrequencyCode
  const [FrequencyCode, setFrequencyCode]=useState("");
  const [FrequencyCode_readOnly, setFrequencyCode_readOnly]=useState(false);
  const [PM_FrequencyCode_Description, setPM_FrequencyCode_Description]=useState("");
  const [FrequencyType, setFrequencyType]=useState("");
  const [Band, setBand]=useState("");
  const [Band_readOnly, setBand_readOnly]=useState(false);
  const [Lead, setLead]=useState("");
  const [Lead_readOnly, setLead_readOnly]=useState(false);
  const [PM_FrequencyCode_DisableFlag_Checkbox, setPM_FrequencyCode_DisableFlag_checkbox]=useState(false)

  //PM Group Master
  const [PMGroupCode, setPMGroupCode]=useState("");
  const [PMGroupCode_readOnly, setPMGroupCode_readOnly]=useState(false);
  const [PMGroupMaster_Description, setPMGroupMaster_Description]=useState("");
  const [PMGroupMaster_AssetLocation, setPMGroupMaster_AssetLocation]=useState([]);
  const [selected_PMGroupMaster_AssetLocation, setselected_PMGroupMaster_AssetLocation]=useState([]);
  const [PMGroupMaster_DisableFlag_Checkbox, setPMGroupMaster_DisableFlag_checkbox]=useState(false)

  //Task Group Code
   const [TaskGroupCode, setTaskGroupCode]=useState("");
   const [TaskGroupCode_readOnly, setTaskGroupCode_readOnly]=useState(false);
   const [TaskGroupCode_Description, setTaskGroupCode_Description]=useState("");
   const [TaskGroupCode_DisableFlag_Checkbox, setTaskGroupCode_DisableFlag_checkbox]=useState(false)

    //-----------------------------------------------------------------Purchasing-------------------------------------------------
  //Purchasing PR Status
  const [Purchasing_PRStatus_StatusType, setPurchasing_PRStatus_StatusType]=useState("");
  const [Purchasing_PRStatus_StatusType_readOnly, setPurchasing_PRStatus_StatusType_readOnly]=useState(false);
  const [Purchasing_PRStatus_Status, setPurchasing_PRStatus_Status]=useState("");
  const [Purchasing_PRStatus_Status_readOnly, setPurchasing_PRStatus_Status_readOnly]=useState(false);
  const [Purchasing_PRStatus_Description, setPurchasing_PRStatus_Description]=useState("");
  const [Purchasing_PRStatus_EmailStatus_Checkbox, setPurchasing_PRStatus_EmailStatus_checkbox]=useState(false)
  const [Purchasing_PRStatus_Disable_Checkbox, setPurchasing_PRStatus_Disable_checkbox]=useState(false)

  //Purchasing PO Status
  const [Purchasing_POStatus_StatusType, setPurchasing_POStatus_StatusType]=useState("");
  const [Purchasing_POStatus_StatusType_readOnly, setPurchasing_POStatus_StatusType_readOnly]=useState(false);
  const [Purchasing_POStatus_cat, setPurchasing_POStatus_cat]=useState("");
  const [Purchasing_POStatus_Status, setPurchasing_POStatus_Status]=useState("");
  const [Purchasing_POStatus_Status_readOnly, setPurchasing_POStatus_Status_readOnly]=useState(false);
  const [Purchasing_POStatus_Description, setPurchasing_POStatus_Description]=useState("");
  const [Purchasing_POStatus_EmailStatus_Checkbox, setPurchasing_POStatus_EmailStatus_checkbox]=useState(false)
  const [Purchasing_POStatus_Disable_Checkbox, setPurchasing_POStatus_Disable_checkbox]=useState(false)

  //Purchasing contract Status
  const [Purchasing_ConstractStatus_StatusType, setPurchasing_ConstractStatus_StatusType]=useState("");
  const [Purchasing_ConstractStatus_StatusType_readOnly, setPurchasing_ConstractStatus_StatusType_readOnly]=useState(false);
  const [Purchasing_ConstractStatus_cat, setPurchasing_ConstractStatus_cat]=useState("");
  const [Purchasing_ConstractStatus_Status, setPurchasing_ConstractStatus_Status]=useState("");
  const [Purchasing_ConstractStatus_Status_readOnly, setPurchasing_ConstractStatus_Status_readOnly]=useState(false);
  const [Purchasing_ConstractStatus_Description, setPurchasing_ConstractStatus_Description]=useState("");
  const [Purchasing_ConstractStatus_EmailFlag_Checkbox, setPurchasing_ConstractStatus_EmailFlag_checkbox]=useState(false)
  const [Purchasing_ConstractStatus_DisableFlag_Checkbox, setPurchasing_ConstractStatus_DisableFlag_checkbox]=useState(false)

  //Purchasing Constract Group
  const [Purchasing_ConstractGroup_GroupCode, setPurchasing_ConstractGroup_GroupCode]=useState("");
  const [Purchasing_ConstractGroup_GroupCode_readOnly, setPurchasing_ConstractGroup_GroupCode_readOnly]=useState(false);
  const [Purchasing_ConstractGroup_Description, setPurchasing_ConstractGroup_Description]=useState("");
  const [Purchasing_ConstractGroup_DisableFlag_Checkbox, setPurchasing_ConstractGroup_DisableFlag_checkbox]=useState(false)

  //Purchasing Type
  const [Purchasing_Type_GroupCode, setPurchasing_Type_GroupCode]=useState("");
  const [Purchasing_Type_GroupCode_readOnly, setPurchasing_Type_GroupCode_readOnly]=useState(false);
  const [Purchasing_Type_Description, setPurchasing_Type_Description]=useState("");
  const [Purchasing_Type_DisableFlag_Checkbox, setPurchasing_Type_DisableFlag_checkbox]=useState(false)

  //Purchasing Priority
  const [Purchasing_Priority_PriorityCode, setPurchasing_Priority_PriorityCode]=useState("");
  const [Purchasing_Priority_PriorityCode_readOnly, setPurchasing_Priority_PriorityCode_readOnly]=useState(false);
  const [Purchasing_Priority_Description, setPurchasing_Priority_Description]=useState("");
  const [RequiredDateCount, setRequiredDateCount]=useState("");
  const [RequiredDateCount_readOnly, setRequiredDateCount_readOnly]=useState(false);
  const [Purchasing_Priority_DisableFlag_Checkbox, setPurchasing_Priority_DisableFlag_checkbox]=useState(false)

  //Personnal Employee Status
  const [Personnal_EmployeeStatus_StatusType, setPersonnal_EmployeeStatus_StatusType]=useState("");
  const [Personnal_EmployeeStatus_StatusType_readOnly, setPersonnal_EmployeeStatus_StatusType_readOnly]=useState(false);
  const [Personnal_EmployeeStatus_Status, setPersonnal_EmployeeStatus_Status]=useState("");
  const [Personnal_EmployeeStatus_Status_readOnly, setPersonnal_EmployeeStatus_Status_readOnly]=useState(false);
  const [Personnal_EmployeeStatus_Description, setPersonnal_EmployeeStatus_Description]=useState("");
  const [Personnal_EmployeeStatus_DisableFlag_Checkbox, setPersonnal_EmployeeStatus_DisableFlag_checkbox]=useState(false)

  //Invoice Payment Method
  const [PaymentMethod, setPaymentMethod]=useState("");
  const [PaymentMethod_readOnly, setPaymentMethod_readOnly]=useState(false);
  const [Invoice_PaymentMethod_Description, setInvoice_PaymentMethod_Description]=useState("");
  const [Invoice_PaymentMethod_DisableFlag_Checkbox, setInvoice_PaymentMethod_DisableFlag_checkbox]=useState(false)



  useEffect(() => {
    let site_ID = localStorage.getItem("site_ID");
    let rowid = props.location.state.select.Rowid;

    console.log(props.location.state.select.Rowid);
    console.log(props.location.state.select.ScreenName);

     if(props.location.state.select.ScreenName == 'Asset_Type'){


            settitle('Asset Type')
            setType_Code_readOnly(true)
            setButtonName("Update")
            setShow(true)

            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(true)
            setshow_AssetWorkArea(false)
            get_asset_type_select(site_ID,rowid)
            
      }else if(props.location.state.select.ScreenName == 'Asset_Type_New'){
          console.log("comeing");
          settitle('Create New Asset Type')
          setButtonName("New")
          setShow(false)

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(true)
          setshow_AssetWorkArea(false)

          setType_Code_readOnly(false)
      }     
      if(props.location.state.select.ScreenName == 'Asset_GroupCode'){
          settitle('Asset GroupCode')
          setButtonName("Update")
          setAssetGroupCode_readOnly(true)

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(true)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          get_asset_group_cd_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'Asset_GroupCode_New'){
          settitle('Create New Asset GroupCode')
          setButtonName("New")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(true)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
      }
      if(props.location.state.select.ScreenName == 'Asset_Code'){
          settitle('Asset Code')
          setButtonName("Update")
          setAssetCode_readOnly(true)

          setshow_AssetCode(true)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          get_asset_code_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'Asset_Code_New'){
          settitle('Create New Asset Code')
          setButtonName("New")

          setshow_AssetCode(true)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
      }
      if(props.location.state.select.ScreenName == 'Asset_CriticalFactor'){
          settitle('Asset CriticalFactor')
          setButtonName("Update")
          setCriticalFactor_readOnly(true)

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(true)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          get_asset_critical_select(site_ID,rowid)
      }else if(props.location.state.select.ScreenName == 'Asset_CriticalFactor_New'){
          settitle('Create New Asset CriticalFactor')
          setButtonName("New")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(true)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
      }
      if(props.location.state.select.ScreenName == 'Asset_Status'){
          settitle('Asset Status')
          setButtonName("Update")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(true)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
          setAssetType_readOnly(true)
          setAssetStatus_readOnly(true)
          get_asset_status_select(site_ID,rowid)
      }else if(props.location.state.select.ScreenName == 'Asset_Status_New') {
          settitle('Create New Asset Status')
          setButtonName("New")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(true)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
      }
      if(props.location.state.select.ScreenName == 'Asset_WorkArea'){
          settitle('Asset WorkArea')
          setButtonName("Update")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(true)

          get_asset_workarea_select(site_ID,rowid)
      }else if(props.location.state.select.ScreenName == 'Asset_WorkArea_New'){
          settitle('Create New Asset WorkArea')
          setButtonName("New")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(true)
      }
      if(props.location.state.select.ScreenName == 'Asset_Location'){
          settitle('Asset Location')
          setButtonName("Update")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(true)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
          setAssetLocation_readOnly(true)

          get_asset_location_select(site_ID,rowid)
      }else if(props.location.state.select.ScreenName == 'Asset_Location_New'){
          settitle('Create New Asset Location')
          setButtonName("New")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(true)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
      }
      if(props.location.state.select.ScreenName == 'Asset_Level'){
          settitle('Asset Level')
          setButtonName("Update")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(true)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
          
          get_asset_level_select(site_ID,rowid)
      }else if(props.location.state.select.ScreenName == 'Asset_Level_New'){
          settitle('Create New Asset Level')
          setButtonName("New")

          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(true)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
      }

      if(props.location.state.select.ScreenName == 'WorkStatus'){
          settitle('Work Status')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(true)
          setStatustype_readOnly(true)
          setStatus_readOnly(true)
          get_work_workstatus_select(site_ID,rowid)

          
          
      }else if(props.location.state.select.ScreenName == 'WorkStatus_New'){
          settitle('New Work Status')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(true)

          get_status_type(site_ID)
      }

      if(props.location.state.select.ScreenName == 'WorkPriority'){
          settitle('Work Priority')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)
          setPriorityCode_readOnly(true)
          setDueDateCount_readOnly(true)
          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(true)
          setPriorityCode_readOnly(true)
          get_work_workpriority_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'WorkPriority_New'){
          settitle('New Work Priority')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(true)

      }

      if(props.location.state.select.ScreenName == 'WorkGroup'){
          settitle('Work Group')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(true)
          setGroupCode_readOnly(true)
          get_work_workgroup_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'WorkGroup_New'){
          settitle('New Work Group')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(true)

          get_ForemanEmployeeID(site_ID)
      }
      
      if(props.location.state.select.ScreenName == 'WorkClass'){
          settitle('Work Class')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(true)
          setClassCode_readOnly(true)

          get_work_workclass_select(site_ID,rowid)

          
          
      }else if(props.location.state.select.ScreenName == 'WorkClass_New'){
          settitle('New Work Class')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(true)


      }

      if(props.location.state.select.ScreenName == 'WorkType'){
          settitle('Work Type')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(true)
          setTypeCode_readOnly(true)

          get_work_worktype_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'WorkType_New'){
          settitle('New Work Type')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(true)


      }

      if(props.location.state.select.ScreenName == 'WorkFaultCode'){
          settitle('Work Fault Code')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(true)
          setFaultCode_readOnly(true)
          get_work_workfaultcode_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'WorkFaultCode_New'){
          settitle('New Work Fault Code')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(true)


      }

      if(props.location.state.select.ScreenName == 'WorkCauseCode'){
          settitle('Work Cause Code')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(true)
          setCauseCode_readOnly(true)

          get_work_workcausecode_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'WorkCauseCode_New'){
          settitle('New Work Cause Code')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(true)


      }

      if(props.location.state.select.ScreenName == 'WorkActionCode'){
          settitle('Work Action Code')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(true)
          setActionCode_readOnly(true)

          get_work_workactioncode_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'WorkActionCode_New'){
          settitle('New Work Action Code')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(true)



      }

      if(props.location.state.select.ScreenName == 'WorkDelayCode'){
          settitle('Work Delay Code')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(true)
          setDelayCode_readOnly(true)
          get_work_workdelaycode_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'WorkDelayCode_New'){
          settitle('New Work Delay Code')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(true)



      }

      if(props.location.state.select.ScreenName == 'Material_LocationCategory'){
          settitle('Material Location Category')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)
        
          //Material
          setshow_Material_LocationCategory(true)
          setLocationCategory_readOnly(true)

          get_material_locationcategory_select(site_ID,rowid)
          
          
          
      }else if(props.location.state.select.ScreenName == 'Material_LocationCategory_New'){
          settitle('New Material Location Category')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(true)

      }

      if(props.location.state.select.ScreenName == 'Material_Location'){
          settitle('Material Location ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(true)
          setStockLocation_readOnly(true)
          setMasterLocation_readOnly(true)
          setAreaCode_readOnly(true)
          setBinID_readOnly(true)
          setStorageType_readOnly(true)
          setCapacity_readOnly(true)
          get_material_location_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'Material_Location_New'){
          settitle('New Material Location ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(true)

          get_CapacityUOM(site_ID)
          get_supplier(site_ID)
          get_CostCenter(site_ID)
          get_Account(site_ID)
          

      }

      if(props.location.state.select.ScreenName == 'Material_Status'){
          settitle('Material Status ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(true)
          setStatusType_readOnly(true)
          setMaterial_Status_readOnly(true)

          get_material_status_select(site_ID,rowid)

      }else if(props.location.state.select.ScreenName == 'Material_Status_New'){
          settitle('New Material Status ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(true)
          

      }

      if(props.location.state.select.ScreenName == 'Material_CommodityCode'){
          settitle('Material Commodity Code ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(true)
          setCommodityCode_readOnly(true)
          get_material_commoditycode_select(site_ID,rowid)

      }else if(props.location.state.select.ScreenName == 'Material_CommodityCode_New'){
          settitle('New Material Commodity Code ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(true)
          

      }

      if(props.location.state.select.ScreenName == 'Material_GroupCode'){
          settitle('Material Group Code ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(true)
          setStockGroupCode_readOnly(true)
          get_material_groupcode_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'Material_GroupCode_New'){
          settitle('New Material Group Code ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(true)
          

      }

      if(props.location.state.select.ScreenName == 'PM_FrequencyCode'){
          settitle('PM Frequency Code ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(true)
          setFrequencyCode_readOnly(true)
          setBand_readOnly(true)
          setLead_readOnly(true)
          
          get_pm_frequencycode_select(site_ID,rowid)
          
      }else if(props.location.state.select.ScreenName == 'PM_FrequencyCode_New'){
          settitle('New PM Frequency Code ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(true)
          

      }

      if(props.location.state.select.ScreenName == 'PM_GroupMaster'){
          settitle('PM Group Master ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(true)
          setPMGroupCode_readOnly(true)
          get_pm_groupmaster_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'PM_GroupMaster_New'){
          settitle('New PM Group Master ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(true)
          
          get_AssetLocation(site_ID)

      }

      if(props.location.state.select.ScreenName == 'PM_TaskGroup'){
          settitle('PM Task Group ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(true)
          setTaskGroupCode_readOnly(true)
          get_pm_taskgroup_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'PM_TaskGroup_New'){
          settitle('New PM Task Group  ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(true)
          

      }

      if(props.location.state.select.ScreenName == 'Purchasing_PRStatus'){
          settitle('Purchasing PR Status ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)
          setPurchasing_PRStatus_StatusType_readOnly(true)
          setPurchasing_PRStatus_Status_readOnly(true)
          //Purchasing
          setshow_Purchasing_PRStatus(true)

          get_purchasing_prstatus_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'Purchasing_PRStatus_New'){
          settitle('New Purchasing PR Status  ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(true)
          

      }

      if(props.location.state.select.ScreenName == 'Purchasing_POStatus'){
          settitle('Purchasing PO Status ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(true)
          setPurchasing_POStatus_StatusType_readOnly(true)
          setPurchasing_POStatus_Status_readOnly(true)

          get_purchasing_postatus_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'Purchasing_POStatus_New'){
          settitle('New Purchasing PO Status  ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(true)
          

      }

      if(props.location.state.select.ScreenName == 'Purchasing_ConstractStatus'){
          settitle('Purchasing Contract Status ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(true)
          setPurchasing_ConstractStatus_StatusType_readOnly(true)
          setPurchasing_ConstractStatus_Status_readOnly(true)
          get_purchasing_contractstatus_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'Purchasing_ConstractStatus_New'){
          settitle('New Purchasing Contract Status  ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(true)
          

      }

      if(props.location.state.select.ScreenName == 'Purchasing_ConstractGroup'){
          settitle('Purchasing Constract Group ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(true)
          setPurchasing_ConstractGroup_GroupCode_readOnly(true)
          get_purchasing_contractgroup_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'Purchasing_ConstractGroup_New'){
          settitle('New Purchasing Constract Group ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(true)
          

      }

      if(props.location.state.select.ScreenName == 'Purchasing_Type'){
          settitle('Purchasing Type ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(true)
          setPurchasing_Type_GroupCode_readOnly(true)

          get_purchasing_type_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'Purchasing_Type_New'){
          settitle('New Purchasing Type ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(true)
          

      }

      if(props.location.state.select.ScreenName == 'Purchasing_Priority'){
          settitle('Purchasing Priority ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(true)
          setPurchasing_Priority_PriorityCode_readOnly(true)
          setRequiredDateCount_readOnly(true)
          get_purchasing_priority_select(site_ID,rowid)
          

          
          
      }else if(props.location.state.select.ScreenName == 'Purchasing_Priority_New'){
          settitle('New Purchasing Priority ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(true)
          

      }

      if(props.location.state.select.ScreenName == 'Master_UserGroup'){
          settitle('Master User Group ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
          // Master
          setshow_Master_UserGroup(true)
          setMaster_User_Group_UserGroup_readOnly(true)
          get_master_usergroup_select(site_ID,rowid)
          
          
      }else if(props.location.state.select.ScreenName == 'Master_UserGroup_New'){
          settitle('New Master User Group ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
          // Master
          setshow_Master_UserGroup(true)

          

      }

      
      if(props.location.state.select.ScreenName == 'Master_AutoNumber'){
          settitle('Master Auto Number ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(true)
          setModuleCode_readOnly(true)
          setMaster_AutoNumber_Counter_readOnly()
          get_master_autonumber_select(site_ID,rowid)
          
          
      }else if(props.location.state.select.ScreenName == 'Master_AutoNumber_New'){
          settitle('New Master Auto Number ')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
        // Master
        setshow_Master_UserGroup(false)
        setshow_Master_AutoNumber(true)
          

      }

      
      if(props.location.state.select.ScreenName == 'Master_CraftCode'){
          settitle('Master Craft Code ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(true)
          setCraftCode_readOnly(true)
          setEstimateRate_readOnly(true)
          get_master_craftcode_select(site_ID,rowid)
          
          
      }else if(props.location.state.select.ScreenName == 'Master_CraftCode_New'){
          settitle('New Master Craft Code')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
          
        // Master
        setshow_Master_UserGroup(false)
        setshow_Master_AutoNumber(false)
        setshow_Master_CraftCode(true)
          

      }

      if(props.location.state.select.ScreenName == 'Master_statusCategory'){
          settitle('Master Status Category ')
          setButtonName("Update")
          setShow(true)
          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          //Work
          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(true)
          setMaster_statusCategoryCategoryCode_readOnly(true)
          get_master_statuscategory_select(site_ID,rowid)
          
          
      }else if(props.location.state.select.ScreenName == 'Master_statusCategory_New'){
          settitle('New Master Status Category')
          setButtonName("New")

          //Asset
          setshow_AssetCode(false)
          setshow_AssetCriticalFactor(false)
          setshow_AssetGroupCode(false)
          setshow_AssetLevel(false)
          setshow_AssetLocation(false)
          setshow_AssetStatus(false)
          setshow_AssetType(false)
          setshow_AssetWorkArea(false)

          setshow_Workstatus(false)
          setshow_WorkPriority(false)
          setshow_WorkGroup(false)
          setshow_WorkClass(false)
          setshow_WorkType(false)
          setshow_WorkFaultCode(false)
          setshow_WorkCauseCode(false)
          setshow_WorkActionCode(false)
          setshow_WorkDelayCode(false)

          //Material
          setshow_Material_LocationCategory(false)
          setshow_Material_Location(false)
          setshow_Material_Status(false)
          setshow_Material_CommodityCode(false)
          setshow_Material_GroupCode(false)

          //PM
          setshow_PM_FrequencyCode(false)
          setshow_PM_GroupMaster(false)
          setshow_PM_TaskGroup(false)

          //Purchasing
          setshow_Purchasing_PRStatus(false)
          setshow_Purchasing_POStatus(false)
          setshow_Purchasing_ConstractStatus(false)
          setshow_Purchasing_ConstractGroup(false)
          setshow_Purchasing_Type(false)
          setshow_Purchasing_Priority(false)
          
          
        // Master
        setshow_Master_UserGroup(false)
        setshow_Master_AutoNumber(false)
        setshow_Master_CraftCode(false)
        setshow_Master_statusCategory(true)
          

      }

        if(props.location.state.select.ScreenName == 'Master_StatusType'){
            settitle('Master Status Type ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(true)
           setMaster_StatusType_CategoryCode_readOnly(true)
           setMaster_StatusType_TypeCode_readOnly(true)
           get_master_statustype_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_StatusType_New'){
            settitle('New Master Status Type')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
           setshow_Master_StatusType(true)
           

        }

        if(props.location.state.select.ScreenName == 'Master_CostCenter'){
            settitle('Master Cost Center ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(true)
           setMaster_CostCenter_CostCenter_readOnly(true)

           get_master_costcenter_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_CostCenter_New'){
            settitle('New Master Cost Center')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(true)
           

        }

        if(props.location.state.select.ScreenName == 'Master_Account'){
            settitle('Master Account ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(true)
           setMaster_Account_Account_readOnly(true)

           get_master_account_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_Account_New'){
            settitle('New Master Account')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(true)
           

        }

        if(props.location.state.select.ScreenName == 'Master_CurrencyCode'){
            settitle('Master Currency Code ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(true)
           setCurrencyCode_readOnly(true)
           setExchangeRate_readOnly(true)
           get_master_currencycode_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_CurrencyCode_New'){
            settitle('New Master Currency Code')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(true)
           

        }

        if(props.location.state.select.ScreenName == 'Master_TaxCode'){
            settitle('Master Tax Code ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(true)
           setTaxRate_readOnly(true)
           setTaxCode_readOnly(true)

           get_master_taxcode_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_TaxCode_New'){
            settitle('New Master Tax Code')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(true)
           

        }

        if(props.location.state.select.ScreenName == 'Master_UOMType'){
            settitle('Master UOM Type ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(true)
           setMaster_UOM_TypeCode_readOnly(true)

           get_master_uomtype_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_UOMType_New'){
            settitle('New Master UOM Type')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(true)
           

        }

        if(props.location.state.select.ScreenName == 'Master_UOMMaster'){
            settitle('Master UOM Master ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(true)
           setMaster_UOMMaster_TypeCode_readOnly(true)
           setUomCode_readOnly(true)
           get_master_uommaster_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_UOMMaster_New'){
            settitle('New Master UOM Master')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(true)
           

        }

        if(props.location.state.select.ScreenName == 'Master_UOMConFactor'){
            settitle('Master UOM Con Factor ')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(true)
            
           get_master_uomconfactor_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_UOMConFactor_New'){
            settitle('New Master UOM Con Factor')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(true)
           
          get_fromUOM(site_ID)
        }

        if(props.location.state.select.ScreenName == 'Master_BillTo'){
            settitle('Master Bill To')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(false)
           setshow_Master_BillTo(true)
           setBillTo_readOnly(true)
           get_master_billto_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_BillTo_New'){
            settitle('New Master Bill To')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(false)
          setshow_Master_BillTo(true)
           

        }

        
        if(props.location.state.select.ScreenName == 'Master_ShipTo'){
            settitle('Master Ship  To')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(false)
           setshow_Master_BillTo(false)
           setshow_Master_ShipTo(true)
           setShipTo_readOnly(true)

           get_master_shipto_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_ShipTo_New'){
            settitle('New Master Ship To')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(false)
          setshow_Master_BillTo(false)
          setshow_Master_ShipTo(true)

        }

        if(props.location.state.select.ScreenName == 'Master_SupplierStatus'){
            settitle('Master Supplier Status')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(false)
           setshow_Master_BillTo(false)
           setshow_Master_ShipTo(false)
           setshow_Master_SupplierStatus(true)
           setMaster_SupplierStatus_TypeCode_readOnly(true)
           setMaster_SupplierStatus_Status_readOnly(true)

           get_master_supplierstatus_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_SupplierStatus_New'){
            settitle('New Master Supplier Status')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(false)
          setshow_Master_BillTo(false)
          setshow_Master_ShipTo(false)
          setshow_Master_SupplierStatus(true)

        }

        if(props.location.state.select.ScreenName == 'Master_ProjectMaster'){
            settitle('Master Project Master')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(false)
           setshow_Master_BillTo(false)
           setshow_Master_ShipTo(false)
           setshow_Master_SupplierStatus(false)
           setshow_Master_ProjectMaster(true)
           setProjectCode_readOnly(true)
           setProjectBudget_readOnly(true)
           get_master_projectmaster_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_ProjectMaster_New'){
            settitle('New Master Project Master')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(false)
          setshow_Master_BillTo(false)
          setshow_Master_ShipTo(false)
          setshow_Master_SupplierStatus(false)
           setshow_Master_ProjectMaster(true)

           get_ProjectMasterCostCenter(site_ID)
           get_labourAccount(site_ID)
           get_MaterialAccount(site_ID)
           get_ContractAccount(site_ID)

        }

        if(props.location.state.select.ScreenName == 'Master_CustomerStatus'){
            settitle('Master Customer Status')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(false)
           setshow_Master_BillTo(false)
           setshow_Master_ShipTo(false)
           setshow_Master_SupplierStatus(false)
           setshow_Master_ProjectMaster(false)
           setshow_Master_CustomerStatus(true)
           setMaster_CustomerStatus_TypeCode_readOnly(true)
           setMaster_CustomerStatus_Status_readOnly(true)
           get_master_customerstatus_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Master_CustomerStatus_New'){
            settitle('New Master Customer Status')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(false)
          setshow_Master_BillTo(false)
          setshow_Master_ShipTo(false)
          setshow_Master_SupplierStatus(false)
          setshow_Master_ProjectMaster(false)
           setshow_Master_CustomerStatus(true)

        }

        if(props.location.state.select.ScreenName == 'Personnal_EmployeeStatus'){
            settitle('Personnal Employee Status')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(false)
           setshow_Master_BillTo(false)
           setshow_Master_ShipTo(false)
           setshow_Master_SupplierStatus(false)
           setshow_Master_ProjectMaster(false)
           setshow_Master_CustomerStatus(false)
            // Personnal
           setshow_Personnal_EmployeeStatus(true)
           setPersonnal_EmployeeStatus_StatusType_readOnly(true)
           setPersonnal_EmployeeStatus_Status_readOnly(true)
           get_personnel_employeestatus_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Personnal_EmployeeStatus_New'){
            settitle('New Personnal Employee Status')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(false)
          setshow_Master_BillTo(false)
          setshow_Master_ShipTo(false)
          setshow_Master_SupplierStatus(false)
          setshow_Master_ProjectMaster(false)
          setshow_Master_CustomerStatus(false)
          // Personnal
         setshow_Personnal_EmployeeStatus(true)
        }

        if(props.location.state.select.ScreenName == 'Invoice_PaymentMethod'){
            settitle('Invoice Payment Method')
            setButtonName("Update")
            setShow(true)
            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            //Work
            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

            //PM
            setshow_PM_FrequencyCode(false)
            setshow_PM_GroupMaster(false)
            setshow_PM_TaskGroup(false)

            //Purchasing
            setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
           // Master
           setshow_Master_UserGroup(false)
           setshow_Master_AutoNumber(false)
           setshow_Master_CraftCode(false)
           setshow_Master_statusCategory(false)
           setshow_Master_StatusType(false)
           setshow_Master_CostCenter(false)
           setshow_Master_Account(false)
           setshow_Master_CurrencyCode(false)
           setshow_Master_TaxCode(false)
           setshow_Master_UOMType(false)
           setshow_Master_UOMMaster(false)
           setshow_Master_UOMConFactor(false)
           setshow_Master_BillTo(false)
           setshow_Master_ShipTo(false)
           setshow_Master_SupplierStatus(false)
           setshow_Master_ProjectMaster(false)
           setshow_Master_CustomerStatus(false)
            // Personnal
           setshow_Personnal_EmployeeStatus(false)
           // Invoice
            setshow_Invoice_PaymentMethod(true)
            setPaymentMethod_readOnly(true)
           get_invoice_paymentmethod_select(site_ID,rowid)
           
           
        }else if(props.location.state.select.ScreenName == 'Invoice_PaymentMethod_New'){
            settitle('New Invoice Payment Method')
            setButtonName("New")

            //Asset
            setshow_AssetCode(false)
            setshow_AssetCriticalFactor(false)
            setshow_AssetGroupCode(false)
            setshow_AssetLevel(false)
            setshow_AssetLocation(false)
            setshow_AssetStatus(false)
            setshow_AssetType(false)
            setshow_AssetWorkArea(false)

            setshow_Workstatus(false)
            setshow_WorkPriority(false)
            setshow_WorkGroup(false)
            setshow_WorkClass(false)
            setshow_WorkType(false)
            setshow_WorkFaultCode(false)
            setshow_WorkCauseCode(false)
            setshow_WorkActionCode(false)
            setshow_WorkDelayCode(false)

            //Material
            setshow_Material_LocationCategory(false)
            setshow_Material_Location(false)
            setshow_Material_Status(false)
            setshow_Material_CommodityCode(false)
            setshow_Material_GroupCode(false)

           //PM
           setshow_PM_FrequencyCode(false)
           setshow_PM_GroupMaster(false)
           setshow_PM_TaskGroup(false)

           //Purchasing
           setshow_Purchasing_PRStatus(false)
           setshow_Purchasing_POStatus(false)
           setshow_Purchasing_ConstractStatus(false)
           setshow_Purchasing_ConstractGroup(false)
           setshow_Purchasing_Type(false)
           setshow_Purchasing_Priority(false)
            
            
          // Master
          setshow_Master_UserGroup(false)
          setshow_Master_AutoNumber(false)
          setshow_Master_CraftCode(false)
          setshow_Master_statusCategory(false)
          setshow_Master_StatusType(false)
          setshow_Master_CostCenter(false)
          setshow_Master_Account(false)
          setshow_Master_CurrencyCode(false)
          setshow_Master_TaxCode(false)
          setshow_Master_UOMType(false)
          setshow_Master_UOMMaster(false)
          setshow_Master_UOMConFactor(false)
          setshow_Master_BillTo(false)
          setshow_Master_ShipTo(false)
          setshow_Master_SupplierStatus(false)
          setshow_Master_ProjectMaster(false)
          setshow_Master_CustomerStatus(false)
         // Personnal
         setshow_Personnal_EmployeeStatus(false)
         // Invoice
          setshow_Invoice_PaymentMethod(true)
        }
  }, []);

  const handleChange = (e) => {
    // this.setState({id:e.value, name:e.label})
    setSeperator(e.label);

    setSample_Format(AssetGroupCode + e.label + Counter);
    console.log({ id: e.value, name: e.label });
  };

  const onClickChange = () => {
    let site_ID = localStorage.getItem("site_ID");
    let rowid = props.location.state.select.Rowid;
    let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
    let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");

    if (props.location.state.select.ScreenName === "Asset_Type") {
      get_asset_type_Update(site_ID, rowid, emp_mst_login_id);
    } else if (props.location.state.select.ScreenName === "Asset_Type_New") {
      get_asset_type_insert(site_ID, emp_mst_login_id);
    }

    if (props.location.state.select.ScreenName === "Asset_GroupCode") {

    } else if (props.location.state.select.ScreenName === "Asset_GroupCode_New") {

    }

    if (props.location.state.select.ScreenName === "Asset_Code") {
      get_asset_code_update(site_ID, rowid, emp_mst_login_id);
    } else if (props.location.state.select.ScreenName === "Asset_Code_New") {
      get_asset_code_insert(site_ID, emp_mst_login_id);
    }

    if (props.location.state.select.ScreenName === "Asset_CriticalFactor") {
      get_asset_criticalfactor_update(site_ID, rowid, emp_mst_login_id);
    } else if (
      props.location.state.select.ScreenName === "Asset_CriticalFactor_New"
    ) {
      get_asset_criticalfactor_insert(site_ID, emp_mst_login_id);
    }

    if (props.location.state.select.ScreenName === "Asset_Status") {
      get_asset_status_update(site_ID, rowid, emp_mst_login_id);
    } else if (props.location.state.select.ScreenName === "Asset_Status_New") {
      get_asset_status_insert(site_ID, emp_mst_login_id);
    }

    if (props.location.state.select.ScreenName === "Asset_WorkArea") {
      get_asset_workarea_update(site_ID, rowid, emp_mst_login_id);
    } else if (
      props.location.state.select.ScreenName === "Asset_WorkArea_New"
    ) {
      get_asset_workarea_insert(site_ID, emp_mst_login_id);
    }

    if (props.location.state.select.ScreenName === "Asset_Location") {
      get_asset_location_update(site_ID, rowid, emp_mst_login_id);
    } else if (
      props.location.state.select.ScreenName === "Asset_Location_New"
    ) {
      get_asset_location_insert(site_ID, emp_mst_login_id);
    }

    if (props.location.state.select.ScreenName === "Asset_Level") {
      get_asset_level_update(site_ID, rowid, emp_mst_login_id);
    } else if (props.location.state.select.ScreenName === "Asset_Level_New") {
      get_asset_level_insert(site_ID, emp_mst_login_id);
    }

    if(props.location.state.select.ScreenName == 'WorkStatus'){

      get_work_workstatus_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'WorkStatus_New'){

      get_work_workstatus_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkPriority'){

      get_work_workpriority_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'WorkPriority_New'){

      get_work_workpriority_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkGroup'){
      get_work_workgroup_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'WorkGroup_New'){

      get_work_workgroup_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkClass'){
      get_work_workclass_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'WorkClass_New'){

      get_work_workclass_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkType'){

      get_work_worktype_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'WorkType_New'){

      get_work_worktype_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkFaultCode'){

      get_work_workfaultcode_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'WorkFaultCode_New'){

      get_work_workfaultcode_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkCauseCode'){
      get_work_workcausecode_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'WorkCauseCode_New'){

      get_work_workcausecode_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkActionCode'){

      get_work_workactioncode_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'WorkActionCode_New'){

      get_work_workactioncode_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'WorkDelayCode'){
      get_work_workdelaycode_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'WorkDelayCode_New'){

      get_work_workdelaycode_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'Master_UserGroup'){
      get_master_usergroup_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_UserGroup_New'){


    if(Master_User_Group_UserGroup === ''){
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Enter the Required Value (User Group) ',
          showConfirmButton: false,
          timer: 2000
          
        })
    }else if(Master_User_Group_Description === ''){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Enter the Required Value (Description) ',
        showConfirmButton: false,
        timer: 2000
        
      })
    }else{
      get_master_usergroup_insert(site_ID,emp_mst_login_id);
    }

     

  } 

  if(props.location.state.select.ScreenName == 'Master_AutoNumber'){
      get_master_autonumber_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_AutoNumber_New'){

     

  } 

  if(props.location.state.select.ScreenName == 'Master_CraftCode'){
      get_master_craftcode_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_CraftCode_New'){


    if(CraftCode === ''){
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Enter the Required Value (User Group) ',
          showConfirmButton: false,
          timer: 2000
          
        })
    }else if(Master_CraftCode_Description === ''){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Enter the Required Value (Description) ',
        showConfirmButton: false,
        timer: 2000
        
      })
    }else{
      get_master_craftcode_insert(site_ID,emp_mst_login_id);
    }

      

  } 

  if(props.location.state.select.ScreenName == 'Master_statusCategory'){
      get_master_statuscategory_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_statusCategory_New'){

      

  }

  if(props.location.state.select.ScreenName == 'Master_StatusType'){
      get_master_statustype_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_StatusType_New'){

      

  }

  if(props.location.state.select.ScreenName == 'Master_CostCenter'){
      get_master_costcenter_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_CostCenter_New'){

      get_master_costcenter_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'Master_Account'){
      get_master_account_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_Account_New'){

      get_master_account_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'Master_CurrencyCode'){
      get_master_currencycode_update(site_ID,rowid,emp_mst_login_id);
     
     
      
  }else if(props.location.state.select.ScreenName == 'Master_CurrencyCode_New'){

      get_master_currencycode_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'Master_TaxCode'){
      get_master_taxcode_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_TaxCode_New'){

      get_master_taxcode_insert(site_ID,emp_mst_login_id);

  } 

  if(props.location.state.select.ScreenName == 'Master_UOMType'){

      get_master_uomtype_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Master_UOMType_New'){

      

  }

  if(props.location.state.select.ScreenName == 'Master_UOMMaster'){

      get_master_uommaster_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Master_UOMMaster_New'){

      get_master_uommaster_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Master_UOMConFactor'){

      get_master_uomconfactor_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Master_UOMConFactor_New'){

      get_master_uomconfactor_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Master_BillTo'){
      get_master_billto_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_BillTo_New'){

      get_master_billto_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Master_ShipTo'){
      get_master_shipto_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Master_ShipTo_New'){

      get_master_shipto_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Master_SupplierStatus'){

      get_master_supplierstatus_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Master_SupplierStatus_New'){

      get_master_supplierstatus_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Master_ProjectMaster'){

      get_master_projectmaster_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Master_ProjectMaster_New'){

      get_master_projectmaster_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Master_CustomerStatus'){

      get_master_customerstatus_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Master_CustomerStatus_New'){

      get_master_customerstatus_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Material_LocationCategory'){

      get_material_locationcategory_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Material_LocationCategory_New'){

      get_material_locationcategory_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Material_Location'){

      get_material_location_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Material_Location_New'){

      get_material_location_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Material_Status'){
      get_material_status_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Material_Status_New'){

      get_material_status_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Material_CommodityCode'){
      get_material_commoditycode_update(site_ID,rowid,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Material_CommodityCode_New'){

      get_material_commoditycode_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Material_GroupCode'){

      get_material_groupcode_update(site_ID,rowid,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Material_GroupCode_New'){

      get_material_groupcode_insert(site_ID,emp_mst_login_id);

  }

  

  if(props.location.state.select.ScreenName == 'PM_GroupMaster'){

      get_pm_groupmaster_update(site_ID,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'PM_GroupMaster_New'){

      get_pm_groupmaster_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'PM_TaskGroup'){

      get_pm_taskgroup_update(site_ID,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'PM_TaskGroup_New'){

      get_pm_taskgroup_insert(site_ID,emp_mst_login_id);

  }

  
  if(props.location.state.select.ScreenName == 'Purchasing_PRStatus'){
      get_purchasing_prstatus_update(site_ID,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_PRStatus_New'){

      get_purchasing_prstatus_insert(site_ID,emp_mst_login_id);

  }
  
  if(props.location.state.select.ScreenName == 'Purchasing_POStatus'){

      get_purchasing_postatus_update(site_ID,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_POStatus_New'){

      get_purchasing_postatus_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Purchasing_ConstractStatus'){

      get_purchasing_contractstatus_update(site_ID,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_ConstractStatus_New'){

      get_purchasing_contractstatus_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Purchasing_ConstractGroup'){

      get_purchasing_contractgroup_update(site_ID,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_ConstractGroup_New'){

      get_purchasing_contractgroup_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Purchasing_Type'){

      get_purchasing_type_update(site_ID,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_Type_New'){

      get_purchasing_type_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Purchasing_Priority'){

      get_purchasing_priority_update(site_ID,emp_mst_login_id);
      
                            } else if(props.location.state.select.ScreenName == 'Purchasing_Priority_New'){

      get_purchasing_priority_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Personnal_EmployeeStatus'){
      get_personnel_employeestatus_update(site_ID,emp_mst_login_id);
     
      
  }else if(props.location.state.select.ScreenName == 'Personnal_EmployeeStatus_New'){

      get_personnel_employeestatus_insert(site_ID,emp_mst_login_id);

  }

  if(props.location.state.select.ScreenName == 'Invoice_PaymentMethod'){

      get_invoice_paymentmethod_update(site_ID,emp_mst_login_id);
      
  }else if(props.location.state.select.ScreenName == 'Invoice_PaymentMethod_New'){

      get_invoice_paymentmethod_insert(site_ID,emp_mst_login_id);

  }
  };

  const Delete_onClickChange = () => {
    let site_ID = localStorage.getItem("site_ID");
    let rowid = props.location.state.select.Rowid;
    let emp_mst_login_id = localStorage.getItem("emp_mst_login_id");
    let emp_mst_empl_id = localStorage.getItem("emp_mst_empl_id");

    if (props.location.state.select.ScreenName === "Asset_Type") {
      get_asset_type_delete(site_ID, rowid);
    } else if (props.location.state.select.ScreenName === "Asset_Type_New") {
    }

    if (props.location.state.select.ScreenName === "Asset_GroupCode") {
    } else if (
      props.location.state.select.ScreenName === "Asset_GroupCode_New"
    ) {
    }

    if (props.location.state.select.ScreenName === "Asset_Code") {
      get_asset_code_delete(site_ID, rowid);
    } else if (props.location.state.select.ScreenName === "Asset_Code_New") {
    }

    if (props.location.state.select.ScreenName === "Asset_CriticalFactor") {
      get_asset_criticalfactor_delete(site_ID, rowid);
    } else if (
      props.location.state.select.ScreenName === "Asset_CriticalFactor_New"
    ) {
    }

    if (props.location.state.select.ScreenName === "Asset_Status") {
      get_asset_status_delete(site_ID, rowid);
    } else if (props.location.state.select.ScreenName === "Asset_Status_New") {
    }

    if (props.location.state.select.ScreenName === "Asset_WorkArea") {
      get_asset_workarea_delete(site_ID, rowid);
    } else if (
      props.location.state.select.ScreenName === "Asset_WorkArea_New"
    ) {
    }

    if (props.location.state.select.ScreenName === "Asset_Location") {
      get_asset_location_delete(site_ID, rowid);
    } else if (
      props.location.state.select.ScreenName === "Asset_Location_New"
    ) {
    }

    if (props.location.state.select.ScreenName === "Asset_Level") {
      get_asset_level_delete(site_ID, rowid);
    } else if (props.location.state.select.ScreenName === "Asset_Level_New") {
    }

    if(props.location.state.select.ScreenName == 'WorkStatus'){

      get_work_workstatus_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkStatus_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkPriority'){

      get_work_workpriority_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkPriority_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkGroup'){

      get_work_workgroup_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkGroup_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkClass'){

      get_work_workclass_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkClass_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkType'){

      get_work_worktype_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkType_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkFaultCode'){

      get_work_workfaultcode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkFaultCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkCauseCode'){

      get_work_workcausecode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkCauseCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkActionCode'){

      get_work_workactioncode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkActionCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'WorkDelayCode'){

      get_work_workdelaycode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'WorkDelayCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_UserGroup'){

      get_master_usergroup_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_UserGroup_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_CraftCode'){

      get_master_craftcode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_CraftCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_CostCenter'){

      get_master_costcenter_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_CostCenter_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_Account'){

      get_master_account_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_Account_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_CurrencyCode'){

      get_master_currencycode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_CurrencyCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_TaxCode'){

      get_master_taxcode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_TaxCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_UOMMaster'){

      get_master_uommaster_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_UOMMaster_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_UOMConFactor'){

      get_master_uomconfactor_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_UOMConFactor_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_BillTo'){

      get_master_billto_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_BillTo_New'){

  

  }

  
  if(props.location.state.select.ScreenName == 'Master_ShipTo'){

      get_master_shipto_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_ShipTo_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_SupplierStatus'){

      get_master_supplierstatus_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_SupplierStatus_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_ProjectMaster'){

      get_master_projectmaster_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_ProjectMaster_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Master_CustomerStatus'){

      get_master_customerstatus_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Master_CustomerStatus_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Material_LocationCategory'){

      get_material_locationcategory_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Material_LocationCategory_New'){

  

  }

  
  if(props.location.state.select.ScreenName == 'Material_Location'){

      get_material_location_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Material_Location_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Material_Status'){

      get_material_status_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Material_Status_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Material_CommodityCode'){

      get_material_commoditycode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Material_CommodityCode_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Material_GroupCode'){

      get_material_groupcode_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Material_GroupCode_New'){

  

  }


  if(props.location.state.select.ScreenName == 'PM_GroupMaster'){

      get_pm_groupmaster_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'PM_GroupMaster_New'){

  

  }

  if(props.location.state.select.ScreenName == 'PM_TaskGroup'){

      get_pm_taskgroup_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'PM_TaskGroup_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Purchasing_PRStatus'){

      get_purchasing_prstatus_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_PRStatus_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Purchasing_POStatus'){

      get_purchasing_postatus_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_POStatus_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Purchasing_ConstractStatus'){

      get_purchasing_contractstatus_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_ConstractStatus_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Purchasing_ConstractGroup'){

      get_purchasing_contractgroup_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_ConstractGroup_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Purchasing_Type'){

      get_purchasing_type_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_Type_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Purchasing_Priority'){

      get_purchasing_priority_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Purchasing_Priority_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Personnal_EmployeeStatus'){

      get_personnel_employeestatus_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Personnal_EmployeeStatus_New'){

  

  }

  if(props.location.state.select.ScreenName == 'Invoice_PaymentMethod'){

      get_invoice_paymentmethod_delete(site_ID,rowid);
      
  }else if(props.location.state.select.ScreenName == 'Invoice_PaymentMethod_New'){

  

  }
  };

  //-----------------------------------------------------------CHECK-BOX--------------------------------------------------------------------------------------------------------------------------------------

  //Asset-Type Checkbox
 const CheckBox_handleOnChange = () => {

       
    setcheckbox(!Check_box);       
}; 
const CheckBox_WorkStatus = () => {

   
    setWorkStatus_Disable_checkbox(!WorkStatus_Disable_Checkbox);       
}; 
const CheckBox_EmailStatus = () => {

   
    setEmailStatus_checkbox(!EmailStatus_Checkbox);       
};
const CheckBox_AutoSendEmail = () => {

   
    setAutoSendEmail_checkbox(!AutoSendEmail_Checkbox);       
};
const CheckBox_WorkPriority = () => {

   
    setWorkPriority_DisableFlag_checkbox(!WorkPriority_DisableFlag_Checkbox);       
};
const CheckBox_WorkGroup = () => {

   
    setWorkGroup_DisableFlag_checkbox(!WorkGroup_DisableFlag_Checkbox);       
};
const CheckBox_WorkClass = () => {

   
    setWorkClass_DisableFlag_checkbox(!WorkClass_DisableFlag_Checkbox);       
};
const CheckBox_WorkType = () => {

   
    setWorkType_DisableFlag_checkbox(!WorkType_DisableFlag_Checkbox);       
};
const CheckBox_WorkFaultCode = () => {

   
    setWorkFaultCode_DisableFlag_checkbox(!WorkFaultCode_DisableFlag_Checkbox);       
};
const CheckBox_WorKCauseCode = () => {

   
    setWorkCauseCode_DisableFlag_checkbox(!WorkCauseCode_DisableFlag_Checkbox);       
};
const CheckBox_WorKActionCode = () => {

   
    setWorkActionCode_DisableFlag_checkbox(!WorkActionCode_DisableFlag_Checkbox);       
};
const CheckBox_WorKDelayCode = () => {

   
    setWorkDelayCode_DisableFlag_checkbox(!WorkDelayCode_DisableFlag_Checkbox);       
};
const CheckBox_LocationCategory = () => {

   
    setLocationCategory_DisableFlag_checkbox(!LocationCategory_DisableFlag_Checkbox);       
};
const CheckBox_OnHold = () => {

   
    setOnHold_checkbox(!OnHold_Checkbox);       
};
const CheckBox_MaterialLocation= () => {

   
    setMaterialLocation_DisableFlag_checkbox(!MaterialLocation_DisableFlag_Checkbox);       
};
const CheckBox_UpdateStockCosting= () => {

   
    setUpdateStockCosting_checkbox(!UpdateStockCosting_Checkbox);       
};
const CheckBox_MaterialStatus= () => {

   
    setMaterialStatus_DisableFlag_checkbox(!MaterialStatus_DisableFlag_Checkbox);       
};
const CheckBox_MaterialCommodityCode= () => {

   
    setMaterialCommodityCode_DisableFlag_checkbox(!MaterialCommodityCode_DisableFlag_Checkbox);       
};
const CheckBox_MaterialGroupCode= () => {

   
    setMaterialGroupCode_DisableFlag_checkbox(!MaterialGroupCode_DisableFlag_Checkbox);       
};
const CheckBox_PM_FrequencyCode= () => {

   
    setPM_FrequencyCode_DisableFlag_checkbox(!PM_FrequencyCode_DisableFlag_Checkbox);       
};
const CheckBox_PM_GroupMaster= () => {

   
    setPMGroupMaster_DisableFlag_checkbox(!PMGroupMaster_DisableFlag_Checkbox);       
};
const CheckBox_TaskGroupCode= () => {

   
    setTaskGroupCode_DisableFlag_checkbox(!TaskGroupCode_DisableFlag_Checkbox);       
};
const CheckBox_Purchasing_PRStatus= () => {

   
    setPurchasing_PRStatus_EmailStatus_checkbox(!Purchasing_PRStatus_EmailStatus_Checkbox);       
};
const CheckBox_Disable= () => {

   
    setPurchasing_PRStatus_Disable_checkbox(!Purchasing_PRStatus_Disable_Checkbox);       
};
const CheckBox_POStatus_EmailStatus= () => {

   
    setPurchasing_POStatus_EmailStatus_checkbox(!Purchasing_POStatus_EmailStatus_Checkbox);       
};
const CheckBox_Purchasing_POStatus= () => {

   
    setPurchasing_POStatus_Disable_checkbox(!Purchasing_POStatus_Disable_Checkbox);       
};
const CheckBox_ConstractStatus_EmailFlag= () => {

   
    setPurchasing_ConstractStatus_EmailFlag_checkbox(!Purchasing_ConstractStatus_EmailFlag_Checkbox);       
};
const CheckBox_Purchasing_ConstractStatus= () => {

   
    setPurchasing_ConstractStatus_DisableFlag_checkbox(!Purchasing_ConstractStatus_DisableFlag_Checkbox);       
};
const CheckBox_Purchasing_ConstractGroup= () => {

   
    setPurchasing_ConstractGroup_DisableFlag_checkbox(!Purchasing_ConstractGroup_DisableFlag_Checkbox);       
};
const CheckBox_Purchasing_Type= () => {

   
    setPurchasing_Type_DisableFlag_checkbox(!Purchasing_Type_DisableFlag_Checkbox);       
};
const CheckBox_Purchasing_Priority= () => {

   
    setPurchasing_Priority_DisableFlag_checkbox(!Purchasing_Priority_DisableFlag_Checkbox);       
};
const CheckBox_Master_User_Group = () => {

   
    setMaster_User_Group_Disable_checkbox(!Master_User_Group_Disable_Checkbox);       
}; 
const CheckBox_Master_CraftCode = () => {

   
    setMaster_CraftCode_DisableFlag_checkbox(!Master_CraftCode_DisableFlag_Checkbox);       
}; 
const CheckBox_Master_CostCenter = () => {

   
    setMaster_CostCenter_Disable_checkbox(!Master_CostCenter_Disable_Checkbox);       
}; 
const CheckBox_Master_Account = () => {

   
    setMaster_Account_Disable_checkbox(!Master_Account_Disable_Checkbox);       
};
const CheckBox_BaseCurrency = () => {

   
    setBaseCurrency_checkbox(!BaseCurrency_Checkbox);       
};
const CheckBox_TaxCode = () => {

   
    setMaster_TaxCode_DisableFlag_checkbox(!Master_TaxCode_DisableFlag_Checkbox);       
};
const CheckBox_Master_UOMType = () => {

   
    setMaster_UOMType_DisableFlag_checkbox(!Master_UOMType_DisableFlag_Checkbox);       
};
const CheckBox_Master_UOMMaster = () => {

   
    setMaster_UOMMaster_DisableFlag_checkbox(!Master_UOMMaster_DisableFlag_Checkbox);       
};
const CheckBox_Master_BillTo = () => {

   
    setMaster_BillTo_DisableFlag_checkbox(!Master_BillTo_DisableFlag_Checkbox);       
};
const CheckBox_Master_ShipTo = () => {

   
    setMaster_ShipTo_DisableFlag_checkbox(!Master_ShipTo_DisableFlag_Checkbox);       
};
const CheckBox_Master_SupplierStatus = () => {

   
    setMaster_SupplierStatus_DisableFlag_checkbox(!Master_SupplierStatus_DisableFlag_Checkbox);       
};
const CheckBox_Master_ProjectMaster = () => {

    setMaster_ProjectMaster_DisableFlag_checkbox(!Master_ProjectMaster_DisableFlag_Checkbox);
  
};
const CheckBox_Master_Approved = () => {

   
    setApproved_checkbox(!Approved_Checkbox);       
};
const CheckBox_Master_CustomerStatus = () => {

    setMaster_CustomerStatus_DisableFlag_checkbox(!Master_CustomerStatus_DisableFlag_Checkbox);
  
};
const CheckBox_Personnal_EmployeeStatus = () => {

    setPersonnal_EmployeeStatus_DisableFlag_checkbox(!Personnal_EmployeeStatus_DisableFlag_Checkbox);
  
};
const CheckBox_Invoice_PaymentMethod = () => {

    setInvoice_PaymentMethod_DisableFlag_checkbox(!Invoice_PaymentMethod_DisableFlag_Checkbox);
  
};



  //-----------------------------------------------------------API SERVICES--------------------------------------------------------------------------------------------------------------------------------------
  //-------------------------------------------MasterFile Master-----------------------------------------------------------------------
  //Master User Group select
  const get_master_usergroup_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_usergroup_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_UserGroup.User_Group(
              responseJson.data.data[index].usr_grp_usr_grp
            );
            setMaster_User_Group_Description(
              responseJson.data.data[index].usr_grp_desc
            );

            if (responseJson.data.data[index].usr_grp_disable_flag == 0) {
              setMaster_User_Group_Disable_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].usr_grp_disable_flag
              );
            } else {
              setMaster_User_Group_Disable_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].usr_grp_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master User Group insert
  const get_master_usergroup_insert = (site_ID, emp_mst_login_id) => {
    let Usr_dcd_disableFlag;
    if (Master_User_Group_Disable_Checkbox) {
      Usr_dcd_disableFlag = 1;
    } else {
      Usr_dcd_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      usr_grp_usr_grp: Master_User_Group_UserGroup,
      usr_grp_desc: Master_User_Group_Description,
      usr_grp_disable_flag: Usr_dcd_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_usergroup_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UserGroup",
              state: { data: "Master_UserGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master User Group
  const get_master_usergroup_update = (site_ID, rowid, emp_mst_login_id) => {
    let Usr_dcd_disableFlag;
    if (Master_User_Group_Disable_Checkbox) {
      Usr_dcd_disableFlag = 1;
    } else {
      Usr_dcd_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      usr_grp_usr_grp: Master_User_Group_UserGroup,
      usr_grp_desc: Master_User_Group_Description,
      usr_grp_disable_flag: Usr_dcd_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_usergroup_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UserGroup",
              state: { data: "Master_UserGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master User Group
  const get_master_usergroup_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_usergroup_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UserGroup",
              state: { data: "Master_UserGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Auto Number select
  const get_master_autonumber_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_autonumber_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setModuleCode(responseJson.data.data[index].cnt_mst_module_cd);
            setMaster_AutoNumber_Description(
              responseJson.data.data[index].cnt_mst_desc
            );



            setAutoNumbering(responseJson.data.data[index].cnt_mst_numbering);
            setPrefix(responseJson.data.data[index].cnt_mst_prefix);
            setMaster_AutoNumber_Counter(
              responseJson.data.data[index].cnt_mst_counter
            );
            setOption(responseJson.data.data[index].cnt_mst_option);
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Update Master Auto Number
  const get_master_autonumber_update = (site_ID, rowid, emp_mst_login_id) => {
    var json = {
      site_cd: site_ID,
      cnt_mst_module_cd: ModuleCode,
      cnt_mst_prefix: Prefix,
      cnt_mst_desc: Master_AutoNumber_Description,
      cnt_mst_counter: Master_AutoNumber_Counter,
      cnt_mst_numbering: AutoNumbering,
      cnt_mst_option: Option,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_autonumber_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_AutoNumber",
              state: { data: "Master_AutoNumber" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };

  //Master Craft Code select
  const get_master_craftcode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_craftcode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setCraftCode(responseJson.data.data[index].crf_mst_crf_cd);
            setMaster_CraftCode_Description(
              responseJson.data.data[index].crf_mst_desc
            );
            setEstimateRate(responseJson.data.data[index].crf_mst_crf_est_rate);
            setChangeDate(responseJson.data.data[index].crf_mst_change_date);

            if (responseJson.data.data[index].crf_mst_disable_flag == 0) {
              setMaster_CraftCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].crf_mst_disable_flag
              );
            } else {
              setMaster_CraftCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].crf_mst_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Craft Code
  const get_master_craftcode_insert = (site_ID, emp_mst_login_id) => {
    let Crf_mst_disableFlag;
    if (Master_CraftCode_DisableFlag_Checkbox) {
      Crf_mst_disableFlag = 1;
    } else {
      Crf_mst_disableFlag = 0;
    }
    // console.log(Moment(ChangeDate).format('yyyy-MM-DD HH:mm:ss'))

    var json = {
      site_cd: site_ID,
      crf_mst_crf_cd: CraftCode,
      crf_mst_desc: Master_CraftCode_Description,
      crf_mst_crf_est_rate: EstimateRate,
      crf_mst_change_date: Moment(ChangeDate).format("yyyy-MM-DD HH:mm:ss"),
      crf_mst_disable_flag: Crf_mst_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_craftcode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CraftCode",
              state: { data: "Master_CraftCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Craft Code
  const get_master_craftcode_update = (site_ID, rowid, emp_mst_login_id) => {
    let Crf_mst_disableFlag;
    if (Master_CraftCode_DisableFlag_Checkbox) {
      Crf_mst_disableFlag = 1;
    } else {
      Crf_mst_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      crf_mst_crf_cd: CraftCode,
      crf_mst_desc: Master_CraftCode_Description,
      crf_mst_crf_est_rate: EstimateRate,
      crf_mst_change_date: ChangeDate,
      crf_mst_disable_flag: Crf_mst_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_craftcode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CraftCode",
              state: { data: "Master_CraftCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Craft Code
  const get_master_craftcode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_craftcode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CraftCode",
              state: { data: "Master_CraftCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Status Category select
  const get_master_statuscategory_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_statuscategory_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_statusCategoryCategoryCode(
              responseJson.data.data[index].sts_cat_cat_cd
            );
            setMaster_statusCategory_Description(
              responseJson.data.data[index].sts_cat_desc
            );
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Update Master Status Category
  const get_master_statuscategory_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    var json = {
      site_cd: site_ID,
      sts_cat_cat_cd: Master_statusCategoryCategoryCode,
      sts_cat_desc: Master_statusCategory_Description,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_statuscategory_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_statusCategory",
              state: { data: "Master_statusCategory" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };

  //Master Status Type select
  const get_master_statustype_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_statustype_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_StatusType_CategoryCode(
              responseJson.data.data[index].sts_typ_cat_cd
            );
            setMaster_StatusType_TypeCode(
              responseJson.data.data[index].sts_typ_typ_cd
            );
            setMaster_StatusType_Description(
              responseJson.data.data[index].sts_typ_desc
            );
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Update Master Status Type
  const get_master_statustype_update = (site_ID, rowid, emp_mst_login_id) => {
    var json = {
      site_cd: site_ID,
      sts_typ_cat_cd: Master_StatusType_CategoryCode,
      sts_typ_typ_cd: Master_StatusType_TypeCode,
      sts_typ_desc: Master_StatusType_Description,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_statustype_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_StatusType",
              state: { data: "Master_StatusType" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };

  //Master Cost Center select
  const get_master_costcenter_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_costcenter_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_CostCenter_CostCenter(
              responseJson.data.data[index].costcenter
            );
            setMaster_CostCenter_Description(
              responseJson.data.data[index].descs
            );

            if (responseJson.data.data[index].disable_flag == 0) {
              setMaster_CostCenter_Disable_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].disable_flag
              );
            } else {
              setMaster_CostCenter_Disable_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Cost Center insert
  const get_master_costcenter_insert = (site_ID, emp_mst_login_id) => {
    let Cf_disableFlag;
    if (Master_CostCenter_Disable_Checkbox) {
      Cf_disableFlag = 1;
    } else {
      Cf_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      costcenter: Master_CostCenter_CostCenter,
      descs: Master_CostCenter_Description,
      disable_flag: Cf_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_costcenter_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CostCenter",
              state: { data: "Master_CostCenter" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Cost Center
  const get_master_costcenter_update = (site_ID, rowid, emp_mst_login_id) => {
    let Cf_disableFlag;
    if (Master_CostCenter_Disable_Checkbox) {
      Cf_disableFlag = 1;
    } else {
      Cf_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      costcenter: Master_CostCenter_CostCenter,
      descs: Master_CostCenter_Description,
      disable_flag: Cf_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_costcenter_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CostCenter",
              state: { data: "Master_CostCenter" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Cost Center
  const get_master_costcenter_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_costcenter_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CostCenter",
              state: { data: "Master_CostCenter" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Account select
  const get_master_account_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_account_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_Account_Account(responseJson.data.data[index].account);
            setMaster_Account_Description(responseJson.data.data[index].descs);

            if (responseJson.data.data[index].disable_flag == 0) {
              setMaster_Account_Disable_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].disable_flag
              );
            } else {
              setMaster_Account_Disable_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Account insert
  const get_master_account_insert = (site_ID, emp_mst_login_id) => {
    let Account_disableFlag;
    if (Master_Account_Disable_Checkbox) {
      Account_disableFlag = 1;
    } else {
      Account_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      account: Master_Account_Account,
      descs: Master_Account_Description,
      disable_flag: Account_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_account_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_Account",
              state: { data: "Master_Account" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Account
  const get_master_account_update = (site_ID, rowid, emp_mst_login_id) => {
    let Account_disableFlag;
    if (Master_Account_Disable_Checkbox) {
      Account_disableFlag = 1;
    } else {
      Account_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      account: Master_Account_Account,
      descs: Master_Account_Description,
      disable_flag: Account_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_account_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_Account",
              state: { data: "Master_Account" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Account
  const get_master_account_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_account_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_Account",
              state: { data: "Master_Account" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Currency Code select
  const get_master_currencycode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_currencycode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setCurrencyCode(responseJson.data.data[index].cur_mst_cur_code);
            setCurrencyDescription(responseJson.data.data[index].cur_mst_desc);
            setCurrencyLabel(responseJson.data.data[index].cur_mst_label);
            setExchangeRate(
              responseJson.data.data[index].cur_mst_exchange_rate
            );
            setExchangeRateDate(
              responseJson.data.data[index].cur_mst_exchange_rate_date
            );
            setFormatString(
              responseJson.data.data[index].cur_mst_format_string
            );

            if (responseJson.data.data[index].cur_mst_base_cur == 0) {
              setBaseCurrency_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].cur_mst_base_cur
              );
            } else {
              setBaseCurrency_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].cur_mst_base_cur
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Currency Code
  const get_master_currencycode_insert = (site_ID, emp_mst_login_id) => {
    let cur_mst_disableFlag;
    if (BaseCurrency_Checkbox) {
      cur_mst_disableFlag = 1;
    } else {
      cur_mst_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      cur_mst_cur_code: CurrencyCode,
      cur_mst_desc: CurrencyDescription,
      cur_mst_label: CurrencyLabel,
      cur_mst_exchange_rate: ExchangeRate,
      cur_mst_exchange_rate_date: Moment(ExchangeRateDate).format(
        "yyyy-MM-DD HH:mm:ss"
      ),
      cur_mst_format_string: FormatString,
      cur_mst_base_cur: cur_mst_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_currencycode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CurrencyCode",
              state: { data: "Master_CurrencyCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Currency Code
  const get_master_currencycode_update = (site_ID, rowid, emp_mst_login_id) => {
    let cur_mst_disableFlag;
    if (BaseCurrency_Checkbox) {
      cur_mst_disableFlag = 1;
    } else {
      cur_mst_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      cur_mst_cur_code: CurrencyCode,
      cur_mst_desc: CurrencyDescription,
      cur_mst_label: CurrencyLabel,
      cur_mst_exchange_rate: ExchangeRate,
      cur_mst_exchange_rate_date: ExchangeRateDate,
      cur_mst_format_string: FormatString,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_currencycode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CurrencyCode",
              state: { data: "Master_CurrencyCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Currency Code
  const get_master_currencycode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_currencycode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CurrencyCode",
              state: { data: "Master_CurrencyCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Tax Code select
  const get_master_taxcode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_taxcode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setTypeOfTax(responseJson.data.data[index].tax_mst_type);
            setTaxCode(responseJson.data.data[index].tax_mst_tax_cd);
            setMaster_TaxCode_Description(
              responseJson.data.data[index].tax_mst_desc
            );
            setTaxRate(responseJson.data.data[index].tax_mst_tax_rate);

            if (responseJson.data.data[index].tax_mst_disable_flag == 0) {
              setMaster_TaxCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].tax_mst_disable_flag
              );
            } else {
              setMaster_TaxCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].tax_mst_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Tax Code insert
  const get_master_taxcode_insert = (site_ID, emp_mst_login_id) => {
    let tax_mst_disableFlag;
    if (Master_TaxCode_DisableFlag_Checkbox) {
      tax_mst_disableFlag = 1;
    } else {
      tax_mst_disableFlag = 0;
    }

    console.log(selected_TypeOfTax.value);
    var json = {
      site_cd: site_ID,
      tax_mst_type: selected_TypeOfTax.value,
      tax_mst_tax_cd: TaxCode,
      tax_mst_desc: Master_TaxCode_Description,
      tax_mst_tax_rate: TaxRate,
      tax_mst_disable_flag: tax_mst_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_taxcode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_TaxCode",
              state: { data: "Master_TaxCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Tax Code
  const get_master_taxcode_update = (site_ID, rowid, emp_mst_login_id) => {
    let tax_mst_disableFlag;
    if (Master_TaxCode_DisableFlag_Checkbox) {
      tax_mst_disableFlag = 1;
    } else {
      tax_mst_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      tax_mst_tax_cd: TaxCode,
      tax_mst_desc: Master_TaxCode_Description,
      tax_mst_tax_rate: TaxRate,
      tax_mst_disable_flag: tax_mst_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_taxcode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_TaxCode",
              state: { data: "Master_TaxCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Tax Code
  const get_master_taxcode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_taxcode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_TaxCode",
              state: { data: "Master_TaxCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master UOM Type select
  const get_master_uomtype_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_uomtype_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_UOM_TypeCode(responseJson.data.data[index].uom_type_cd);
            setMaster_UOMType_Description(
              responseJson.data.data[index].uom_type_desc
            );

            if (responseJson.data.data[index].uom_type_disable_flag == 0) {
              setMaster_UOMType_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].uom_type_disable_flag
              );
            } else {
              setMaster_UOMType_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].uom_type_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Update Master UOM Type
  const get_master_uomtype_update = (site_ID, rowid, emp_mst_login_id) => {
    let Uom_type_disableFlag;
    if (Master_UOMType_DisableFlag_Checkbox) {
      Uom_type_disableFlag = 1;
    } else {
      Uom_type_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      uom_type_cd: Master_UOM_TypeCode,
      uom_type_desc: Master_UOMType_Description,
      uom_type_disable_flag: Uom_type_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_uomtype_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UOMMaster",
              state: { data: "Master_UOMMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };

  //Master UOM Master select
  const get_master_uommaster_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_uommaster_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_UOMMaster_TypeCode(
              responseJson.data.data[index].uom_mst_type
            );
            setUomCode(responseJson.data.data[index].uom_mst_uom);
            setMaster_UOMMaster_Description(
              responseJson.data.data[index].uom_mst_desc
            );

            if (responseJson.data.data[index].uom_mst_disable_flag == 0) {
              setMaster_UOMMaster_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].uom_mst_disable_flag
              );
            } else {
              setMaster_UOMMaster_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].uom_mst_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master UOM Master
  const get_master_uommaster_insert = (site_ID, emp_mst_login_id) => {
    let Uom_mst_disableFlag;
    if (Master_UOMMaster_DisableFlag_Checkbox) {
      Uom_mst_disableFlag = 1;
    } else {
      Uom_mst_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      uom_mst_type: Master_UOMMaster_TypeCode,
      uom_mst_uom: UomCode,
      uom_mst_desc: Master_UOMMaster_Description,
      uom_mst_disable_flag: Uom_mst_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_uommaster_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UOMMaster",
              state: { data: "Master_UOMMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master UOM Master
  const get_master_uommaster_update = (site_ID, rowid, emp_mst_login_id) => {
    let Uom_mst_disableFlag;
    if (Master_UOMMaster_DisableFlag_Checkbox) {
      Uom_mst_disableFlag = 1;
    } else {
      Uom_mst_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      uom_mst_type: Master_UOMMaster_TypeCode,
      uom_mst_uom: UomCode,
      uom_mst_desc: Master_UOMMaster_Description,
      uom_mst_disable_flag: Uom_mst_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_uommaster_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UOMMaster",
              state: { data: "Master_UOMMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master UOM Master
  const get_master_uommaster_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_uommaster_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UOMMaster",
              state: { data: "Master_UOMMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master UOM Con Factor select
  const get_master_uomconfactor_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_uomconfactor_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setFromUom(responseJson.data.data[index].uom_con_from_uom);
            setToUom(responseJson.data.data[index].uom_con_to_uom);
            setConversionFactor(responseJson.data.data[index].uom_con_factor);
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master UOM Con Factor
  const get_master_uomconfactor_insert = (site_ID, emp_mst_login_id) => {
    var json = {
      site_cd: site_ID,
      uom_con_from_uom: selected_FromUom.value,
      uom_con_to_uom: selected_ToUom.value,
      uom_con_factor: ConversionFactor,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_uomconfactor_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UOMConFactor",
              state: { data: "Master_UOMConFactor" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master UOM Con Factor
  const get_master_uomconfactor_update = (site_ID, rowid, emp_mst_login_id) => {
    var json = {
      site_cd: site_ID,
      uom_con_from_uom: FromUom,
      uom_con_to_uom: ToUom,
      uom_con_factor: ConversionFactor,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_uomconfactor_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UOMConFactor",
              state: { data: "Master_UOMConFactor" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Con Factor
  const get_master_uomconfactor_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_uomconfactor_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_UOMConFactor",
              state: { data: "Master_UOMConFactor" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Bill To select
  const get_master_billto_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_billto_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setBillTo(responseJson.data.data[index].sup_bil_billto);
            setContact(responseJson.data.data[index].sup_bil_contact);
            setPhone(responseJson.data.data[index].sup_bil_phone);
            setAddress1(responseJson.data.data[index].sup_bil_address1);
            setAddress2(responseJson.data.data[index].sup_bil_address2);
            setCity(responseJson.data.data[index].sup_bil_city);
            setState(responseJson.data.data[index].sup_bil_state);
            setPostalCode(responseJson.data.data[index].sup_bil_postal_code);
            setProvince(responseJson.data.data[index].sup_bil_province);
            setCountry(responseJson.data.data[index].sup_bil_country);
            setNote(responseJson.data.data[index].sup_bil_note);

            if (responseJson.data.data[index].sup_bil_disable_flag == 0) {
              setMaster_BillTo_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].sup_bil_disable_flag
              );
            } else {
              setMaster_BillTo_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].sup_bil_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Bill To insert
  const get_master_billto_insert = (site_ID, emp_mst_login_id) => {
    let Sup_disable_flag;
    if (Master_BillTo_DisableFlag_Checkbox) {
      Sup_disable_flag = 1;
    } else {
      Sup_disable_flag = 0;
    }

    var json = {
      site_cd: site_ID,
      sup_bil_billto: BillTo,
      sup_bil_contact: Contact,
      sup_bil_phone: Phone,
      sup_bil_address1: Address1,
      sup_bil_address2: Address2,
      sup_bil_city: City,
      sup_bil_state: State,
      sup_bil_postal_code: PostalCode,
      sup_bil_province: Province,
      sup_bil_country: Country,
      sup_bil_note: Note,
      sup_bil_disable_flag: Sup_disable_flag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_billto_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_BillTo",
              state: { data: "Master_BillTo" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Bill To
  const get_master_billto_update = (site_ID, rowid, emp_mst_login_id) => {
    var json = {
      site_cd: site_ID,
      sup_bil_billto: BillTo,
      sup_bil_contact: Contact,
      sup_bil_phone: Phone,
      sup_bil_address1: Address1,
      sup_bil_address2: Address2,
      sup_bil_city: City,
      sup_bil_state: State,
      sup_bil_postal_code: PostalCode,
      sup_bil_country: Country,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_billto_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_BillTo",
              state: { data: "Master_BillTo" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Bill To
  const get_master_billto_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_billto_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_BillTo",
              state: { data: "Master_BillTo" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Ship To select
  const get_master_shipto_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_shipto_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setShipTo(responseJson.data.data[index].sup_shi_shipto);
            setMaster_ShipTo_Contact(
              responseJson.data.data[index].sup_shi_contact
            );
            setMaster_ShipTo_Phone(responseJson.data.data[index].sup_shi_phone);
            setMaster_ShipTo_Address1(
              responseJson.data.data[index].sup_shi_address1
            );
            setMaster_ShipTo_Address2(
              responseJson.data.data[index].sup_shi_address2
            );
            setMaster_ShipTo_City(responseJson.data.data[index].sup_shi_city);
            setMaster_ShipTo_State(responseJson.data.data[index].sup_shi_state);
            setMaster_ShipTo_PostalCode(
              responseJson.data.data[index].sup_shi_postal_code
            );
            setMaster_ShipTo_Province(
              responseJson.data.data[index].sup_shi_province
            );
            setMaster_ShipTo_Country(
              responseJson.data.data[index].sup_shi_country
            );
            setMaster_ShipTo_Note(responseJson.data.data[index].sup_shi_note);

            if (responseJson.data.data[index].sup_shi_disable_flag == 0) {
              setMaster_ShipTo_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].sup_shi_disable_flag
              );
            } else {
              setMaster_ShipTo_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].sup_shi_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Ship To insert
  const get_master_shipto_insert = (site_ID, emp_mst_login_id) => {
    let Shi_disable_flag;
    if (Master_ShipTo_DisableFlag_Checkbox) {
      Shi_disable_flag = 1;
    } else {
      Shi_disable_flag = 0;
    }

    var json = {
      site_cd: site_ID,
      sup_shi_shipto: ShipTo,
      sup_shi_contact: Master_ShipTo_Contact,
      sup_shi_phone: Master_ShipTo_Phone,
      sup_shi_address1: Master_ShipTo_Address1,
      sup_shi_address2: Master_ShipTo_Address2,
      sup_shi_city: Master_ShipTo_City,
      sup_shi_state: Master_ShipTo_State,
      sup_shi_postal_code: Master_ShipTo_PostalCode,
      sup_shi_province: Master_ShipTo_Province,
      sup_shi_country: Master_ShipTo_Country,
      sup_shi_note: Master_ShipTo_Note,
      sup_shi_disable_flag: Shi_disable_flag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_shipto_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_ShipTo",
              state: { data: "Master_ShipTo" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Ship To
  const get_master_shipto_update = (site_ID, rowid, emp_mst_login_id) => {
    var json = {
      site_cd: site_ID,
      sup_shi_shipto: ShipTo,
      sup_shi_contact: Master_ShipTo_Contact,
      sup_shi_phone: Master_ShipTo_Phone,
      sup_shi_address1: Master_ShipTo_Address1,
      sup_shi_address2: Master_ShipTo_Address2,
      sup_shi_city: Master_ShipTo_City,
      sup_shi_state: Master_ShipTo_State,
      sup_shi_postal_code: Master_ShipTo_PostalCode,
      sup_shi_country: Master_ShipTo_Country,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_shipto_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_ShipTo",
              state: { data: "Master_ShipTo" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Ship To
  const get_master_shipto_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_shipto_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_ShipTo",
              state: { data: "Master_ShipTo" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Supplier Status select
  const get_master_supplierstatus_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_supplierstatus_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_SupplierStatus_TypeCode(
              responseJson.data.data[index].sup_sts_typ_cd
            );
            setMaster_SupplierStatus_Status(
              responseJson.data.data[index].sup_sts_status
            );
            setMaster_SupplierStatus_Description(
              responseJson.data.data[index].sup_sts_desc
            );

            if (responseJson.data.data[index].sup_sts_disable_flag == 0) {
              setMaster_SupplierStatus_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].sup_sts_disable_flag
              );
            } else {
              setMaster_SupplierStatus_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].sup_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Supplier Status insert
  const get_master_supplierstatus_insert = (site_ID, emp_mst_login_id) => {
    let Sts_disable_flag;
    if (Master_UOMMaster_DisableFlag_Checkbox) {
      Sts_disable_flag = 1;
    } else {
      Sts_disable_flag = 0;
    }

    var json = {
      site_cd: site_ID,
      sup_sts_typ_cd: Master_SupplierStatus_TypeCode,
      sup_sts_status: Master_SupplierStatus_Status,
      sup_sts_desc: Master_SupplierStatus_Description,
      sup_sts_disable_flag: Sts_disable_flag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_supplierstatus_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_SupplierStatus",
              state: { data: "Master_SupplierStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Supplier Status
  const get_master_supplierstatus_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Sts_disable_flag;
    if (Master_UOMMaster_DisableFlag_Checkbox) {
      Sts_disable_flag = 1;
    } else {
      Sts_disable_flag = 0;
    }

    var json = {
      site_cd: site_ID,
      sup_sts_typ_cd: Master_SupplierStatus_TypeCode,
      sup_sts_status: Master_SupplierStatus_Status,
      sup_sts_desc: Master_SupplierStatus_Description,
      sup_sts_disable_flag: Sts_disable_flag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_supplierstatus_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_SupplierStatus",
              state: { data: "Master_SupplierStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Supplier Status
  const get_master_supplierstatus_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_supplierstatus_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_SupplierStatus",
              state: { data: "Master_SupplierStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Project Master select
  const get_master_projectmaster_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_projectmaster_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setProjectCode(responseJson.data.data[index].prj_mst_prj_cd);
            setMaster_ProjectMaster_Description(
              responseJson.data.data[index].prj_mst_desc
            );
            setProjectDate(responseJson.data.data[index].prj_mst_prj_date);
            setDueDate(responseJson.data.data[index].prj_mst_due_date);
            setProjectBudget(responseJson.data.data[index].prj_mst_budget);
            setMaster_ProjectMaster_CostCenter(
              responseJson.data.data[index].prj_mst_costcenter
            );
            setLaborAccount(responseJson.data.data[index].prj_mst_laccount);
            setMaterialAccount(responseJson.data.data[index].prj_mst_maccount);
            setContractAccount(responseJson.data.data[index].prj_mst_caccount);

            if (responseJson.data.data[index].prj_mst_approved == 0) {
              setApproved_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prj_mst_approved
              );
            } else {
              setApproved_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prj_mst_approved
              );
            }

            if (responseJson.data.data[index].prj_mst_disable_flag == 0) {
              setMaster_ProjectMaster_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prj_mst_disable_flag
              );
            } else {
              setMaster_ProjectMaster_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prj_mst_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Project Master insert
  const get_master_projectmaster_insert = (site_ID, emp_mst_login_id) => {
    let Mst_Approved, Mst_disable_flag;
    if (Approved_Checkbox) {
      Mst_Approved = 1;
    } else {
      Mst_Approved = 0;
    }
    if (Master_ProjectMaster_DisableFlag_Checkbox) {
      Mst_disable_flag = 1;
    } else {
      Mst_disable_flag = 0;
    }

    var json = {
      site_cd: site_ID,
      prj_mst_prj_cd: ProjectCode,
      prj_mst_desc: Master_ProjectMaster_Description,
      prj_mst_prj_date: Moment(ProjectDate).format("yyyy-MM-DD HH:mm:ss"),
      prj_mst_due_date: Moment(DueDate).format("yyyy-MM-DD HH:mm:ss"),
      prj_mst_budget: ProjectBudget,
      prj_mst_costcenter: selected_Master_ProjectMaster_CostCenter.value,
      prj_mst_laccount: selected_LaborAccount.value,
      prj_mst_maccount: selected_MaterialAccount.value,
      prj_mst_caccount: selected_ContractAccount.value,
      prj_mst_approved: Mst_Approved,
      prj_mst_disable_flag: Mst_disable_flag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_projectmaster_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_ProjectMaster",
              state: { data: "Master_ProjectMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Project Master
  const get_master_projectmaster_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Mst_Approved, Mst_disable_flag;
    if (Approved_Checkbox) {
      Mst_Approved = 1;
    } else {
      Mst_Approved = 0;
    }
    if (Master_ProjectMaster_DisableFlag_Checkbox) {
      Mst_disable_flag = 1;
    } else {
      Mst_disable_flag = 0;
    }

    var json = {
      site_cd: site_ID,
      prj_mst_prj_cd: ProjectCode,
      prj_mst_desc: Master_ProjectMaster_Description,
      prj_mst_prj_date: ProjectDate,
      prj_mst_due_date: DueDate,
      prj_mst_budget: ProjectBudget,
      prj_mst_costcenter: Master_ProjectMaster_CostCenter,
      prj_mst_laccount: LaborAccount,
      prj_mst_maccount: MaterialAccount,
      prj_mst_caccount: ContractAccount,
      prj_mst_approved: Mst_Approved,
      prj_mst_disable_flag: Mst_disable_flag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_projectmaster_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_ProjectMaster",
              state: { data: "Master_ProjectMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Project Master
  const get_master_projectmaster_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_projectmaster_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_ProjectMaster",
              state: { data: "Master_ProjectMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Master Customer Status select
  const get_master_customerstatus_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_customerstatus_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setMaster_CustomerStatus_TypeCode(
              responseJson.data.data[index].cus_sts_typ_cd
            );
            setMaster_CustomerStatus_Status(
              responseJson.data.data[index].cus_sts_status
            );
            setMaster_CustomerStatus_Description(
              responseJson.data.data[index].cus_sts_desc
            );

            if (responseJson.data.data[index].cus_sts_disable_flag == 0) {
              setMaster_CustomerStatus_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].cus_sts_disable_flag
              );
            } else {
              setMaster_CustomerStatus_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].cus_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Master Customer Status insert
  const get_master_customerstatus_insert = (site_ID, emp_mst_login_id) => {
    let Cus_disableFlag;
    if (Master_CustomerStatus_DisableFlag_Checkbox) {
      Cus_disableFlag = 1;
    } else {
      Cus_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      cus_sts_typ_cd: Master_CustomerStatus_TypeCode,
      cus_sts_status: Master_CustomerStatus_Status,
      cus_sts_desc: Master_CustomerStatus_Description,
      cus_sts_disable_flag: Cus_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_master_customerstatus_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CustomerStatus",
              state: { data: "Master_CustomerStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Master Customer Status
  const get_master_customerstatus_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Cus_disableFlag;
    if (Master_CustomerStatus_DisableFlag_Checkbox) {
      Cus_disableFlag = 1;
    } else {
      Cus_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      cus_sts_typ_cd: Master_CustomerStatus_TypeCode,
      cus_sts_status: Master_CustomerStatus_Status,
      cus_sts_desc: Master_CustomerStatus_Description,
      cus_sts_disable_flag: Cus_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_master_customerstatus_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CustomerStatus",
              state: { data: "Master_CustomerStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Master Customer Status
  const get_master_customerstatus_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_master_customerstatus_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Master_CustomerStatus",
              state: { data: "Master_CustomerStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //-------------------------------------------MasterFile Asset-----------------------------------------------------------------------

  //Asset type Select
  const get_asset_type_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_type_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setType_Code(responseJson.data.data[index].ast_type_cd);
            setDescription(responseJson.data.data[index].ast_type_descs);
            if (responseJson.data.data[index].ast_type_disable_flag == 0) {
              setTypeCode_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            } else {
              setTypeCode_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert Asset Type
  const get_asset_type_insert = (site_ID, emp_mst_login_id) => {
    let flg;
    if (TypeCode_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_type_cd: Type_Code,
      ast_type_descs: Description,
      ast_type_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_type_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetType",
              state: { data: "Asset_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Asset Type
  const get_asset_type_Update = (site_ID, rowid, emp_mst_login_id) => {
    let flg;
    if (TypeCode_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_type_descs: Description,
      ast_type_disable_flag: flg,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_type_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetType",
              state: { data: "Asset_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Asset Type
  const get_asset_type_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_type_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetType",
              state: { data: "Asset_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Asset Group Code Select
  const get_asset_group_cd_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_group_cd_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setAssetGroupCode(responseJson.data.data[index].ast_grp_grp_cd);
            setAssetGroupCod_Description(
              responseJson.data.data[index].ast_grp_desc
            );
            setAssetGroupCode_Report__Description(
              responseJson.data.data[index].column2
            );
            setCounter(responseJson.data.data[index].ast_grp_counter);
            setSeperator(responseJson.data.data[index].ast_grp_separator);
            setSample_Format(
              responseJson.data.data[index].ast_grp_grp_cd +
                responseJson.data.data[index].ast_grp_grp_cd +
                responseJson.data.data[index].ast_grp_counter
            );

            if (responseJson.data.data[index].ast_grp_option == 0) {
              setAuto_no_Checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            } else {
              setAuto_no_Checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            }

            if (responseJson.data.data[index].ast_grp_serial == 0) {
              setGenerate_serialize_stock_caheckbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            } else {
              setGenerate_serialize_stock_caheckbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            }

            if (responseJson.data.data[index].ast_grp_disable_flag == 0) {
              setDisable_Checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            } else {
              setDisable_Checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert Asset Group Code
  const get_asset_groupcode_insert = (site_ID, emp_mst_login_id) => {
    let flg;
    if (TypeCode_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_grp_grp_cd: AssetGroupCode,
      ast_grp_desc: AssetGroupCode_Description,
      ast_grp_counter: Type_Code,
      ast_grp_serial: Description,
      ast_grp_separator: Type_Code,
      ast_grp_option: Description,
      ast_grp_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_groupcode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetType",
              state: { data: "Asset_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Asset Group Code
  const get_asset_groupcode_update = (site_ID, rowid, emp_mst_login_id) => {
    let flg;
    if (TypeCode_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_type_descs: Description,
      ast_type_disable_flag: flg,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_type_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetType",
              state: { data: "Asset_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Asset Group Code
  const get_asset_groupcode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_type_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetType",
              state: { data: "Asset_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Asset Code Select
  const get_asset_code_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_code_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setAssetCode(responseJson.data.data[index].ast_cod_ast_cd);
            setAssetCode_Description(
              responseJson.data.data[index].ast_cod_desc
            );
            if (responseJson.data.data[index].ast_cod_disable_flag == 0) {
              setAssetCode_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            } else {
              setAssetCode_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert Asset Code
  const get_asset_code_insert = (site_ID, emp_mst_login_id) => {
    let flg;
    if (AssetCode_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_cod_ast_cd: AssetCode,
      ast_cod_desc: AssetCode_Description,
      ast_cod_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_code_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetCode",
              state: { data: "Asset_Code" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Asset Code
  const get_asset_code_update = (site_ID, rowid, emp_mst_login_id) => {
    let flg;
    if (AssetCode_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_cod_desc: AssetCode_Description,
      ast_cod_disable_flag: flg,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_code_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetCode",
              state: { data: "Asset_Code" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Asset Code
  const get_asset_code_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_code_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetCode",
              state: { data: "Asset_Code" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Asset Critical Select
  const get_asset_critical_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_critical_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setCriticalFactor(responseJson.data.data[index].ast_cri_cri_factor);
            setCriticalFactor_Description(
              responseJson.data.data[index].ast_cri_desc
            );
            if (responseJson.data.data[index].ast_cri_disable_flag == 0) {
              setAssetCode_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            } else {
              setAssetCode_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_type_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert Critical Factor
  const get_asset_criticalfactor_insert = (site_ID, emp_mst_login_id) => {
    let flg;
    if (CriticalFactor_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_cri_cri_factor: CriticalFactor,
      ast_cri_min_delay: "0",
      ast_cri_emergency: "0",
      ast_cri_desc: CriticalFactor_Description,
      ast_cri_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_criticalfactor_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetCriticalFactor",
              state: { data: "Asset_CriticalFactor" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Critical Factor
  const get_asset_criticalfactor_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let flg;
    if (CriticalFactor_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_cri_desc: CriticalFactor_Description,
      ast_cri_disable_flag: flg,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_criticalfactor_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetCriticalFactor",
              state: { data: "Asset_CriticalFactor" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Critical Factor
  const get_asset_criticalfactor_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_criticalfactor_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetCriticalFactor",
              state: { data: "Asset_CriticalFactor" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Asset Status Select
  const get_asset_status_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_status_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setselected_Statustype({
              label: responseJson.data.data[index].ast_sts_typ_cd,
            });
            setAssetStatus(responseJson.data.data[index].ast_sts_status);

            setAssetStatus_Description(
              responseJson.data.data[index].ast_sts_desc
            );
            if (responseJson.data.data[index].ast_sts_count_dwn_time == 0) {
              setCountDownTime_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_sts_count_dwn_time
              );
            } else {
              setCountDownTime_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_sts_count_dwn_time
              );
            }

            if (responseJson.data.data[index].ast_sts_disable_flag == 0) {
              setAS_Disable_Checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_sts_disable_flag
              );
            } else {
              setAS_Disable_Checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Status Type
  const get_status_type = (site_ID) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_status_type(site_ID)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          let StatusType = responseJson.data.data.map((item) => ({
            label: item.sts_typ_typ_cd,
            value: item.sts_typ_desc,
          }));
          setStatusType(StatusType);

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert Asset Status
  const get_asset_status_insert = (site_ID, emp_mst_login_id) => {
    let flg, flg1;

    let ast_sts_typ_cd = selected_Statustype.label;

    if (AS_Disable_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    if (CountDownTime_Checkbox) {
      flg1 = 1;
    } else {
      flg1 = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_sts_cat_cd: "ASSET",
      ast_sts_typ_cd: ast_sts_typ_cd,
      ast_sts_status: AssetStatus,
      ast_sts_desc: AssetStatus_Description,
      ast_sts_isf_flag: "0",
      ast_sts_count_dwn_time: flg1,
      ast_sts_generate_pm: "0",
      ast_sts_generate_route: "0",
      ast_sts_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_status_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetStatus",
              state: { data: "Asset_Status" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Asset Status
  const get_asset_status_update = (site_ID, rowid, emp_mst_login_id) => {
    let flg, flg1;
    if (CountDownTime_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    if (AS_Disable_Checkbox) {
      flg1 = 1;
    } else {
      flg1 = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_sts_desc: AssetStatus_Description,
      ast_sts_count_dwn_time: flg,
      ast_sts_disable_flag: flg1,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_status_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetStatus",
              state: { data: "Asset_Status" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Asset Status
  const get_asset_status_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_status_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetStatus",
              state: { data: "Asset_Status" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Asset Work Select
  const get_asset_workarea_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_workarea_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setAssetWorkArea(responseJson.data.data[index].mst_war_work_area);
            setAssetWorkArea_Description(
              responseJson.data.data[index].mst_war_desc
            );
            if (responseJson.data.data[index].mst_war_disable_flag == 0) {
              setAssetWorkArea_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].mst_war_disable_flag
              );
            } else {
              setAssetWorkArea_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].mst_war_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert Work Area
  const get_asset_workarea_insert = (site_ID, emp_mst_login_id) => {
    let flg;
    if (AssetWorkArea_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      mst_war_work_area: AssetWorkArea,
      mst_war_desc: AssetWorkArea_Description,
      mst_war_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_workarea_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetWorkArea",
              state: { data: "Asset_WorkArea" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Area
  const get_asset_workarea_update = (site_ID, rowid, emp_mst_login_id) => {
    let flg;
    if (AssetWorkArea_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      mst_war_desc: AssetWorkArea_Description,
      mst_war_disable_flag: flg,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_workarea_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetWorkArea",
              state: { data: "Asset_WorkArea" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Work Area
  const get_asset_workarea_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_workarea_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetWorkArea",
              state: { data: "Asset_WorkArea" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Asset Location Select
  const get_asset_location_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_location_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setAssetLocation(responseJson.data.data[index].ast_loc_ast_loc);

            setAssetLocation_Description(
              responseJson.data.data[index].ast_loc_desc
            );
            if (responseJson.data.data[index].ast_loc_disable_flag == 0) {
              setAssetLocation_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_loc_disable_flag
              );
            } else {
              setAssetLocation_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_loc_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert asset location
  const get_asset_location_insert = (site_ID, emp_mst_login_id) => {
    let flg;
    if (AssetLocation_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_loc_ast_loc: AssetLocation,
      ast_loc_desc: AssetLocation_Description,
      ast_loc_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_location_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetLocation",
              state: { data: "Asset_Location" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update asset location
  const get_asset_location_update = (site_ID, rowid, emp_mst_login_id) => {
    let flg;
    if (AssetLocation_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_loc_desc: AssetLocation_Description,
      ast_loc_disable_flag: flg,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_location_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetLocation",
              state: { data: "Asset_Location" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete asset location
  const get_asset_location_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_location_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetLocation",
              state: { data: "Asset_Location" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Asset Level Select
  const get_asset_level_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_level_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setAssetLevel(responseJson.data.data[index].ast_lvl_ast_lvl);

            setAssetLevel_Description(
              responseJson.data.data[index].ast_lvl_desc
            );
            if (responseJson.data.data[index].ast_lvl_disable_flag == 0) {
              setAssetLevel_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_lvl_disable_flag
              );
            } else {
              setAssetLevel_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].ast_lvl_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //Insert asset Level
  const get_asset_level_insert = (site_ID, emp_mst_login_id) => {
    let flg;
    if (AssetLevel_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_lvl_ast_lvl: AssetLevel,
      ast_lvl_desc: AssetLevel_Description,
      ast_lvl_disable_flag: flg,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_asset_level_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetLevel",
              state: { data: "Asset_Level" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update asset Level
  const get_asset_level_update = (site_ID, rowid, emp_mst_login_id) => {
    let flg;
    if (AssetLevel_Checkbox) {
      flg = 1;
    } else {
      flg = 0;
    }

    var json = {
      site_cd: site_ID,
      ast_lvl_desc: AssetLevel_Description,
      ast_lvl_disable_flag: flg,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_asset_level_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetLevel",
              state: { data: "Asset_Level" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete asset Level
  const get_asset_level_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_asset_level_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/AssetLevel",
              state: { data: "Asset_Level" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //-------------------------------------------MasterFile Work-----------------------------------------------------------------------
  //Work Status Select
  const get_work_workstatus_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workstatus_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setStatustype(responseJson.data.data[index].wrk_sts_typ_cd);
            setStatus(responseJson.data.data[index].wrk_sts_status);
            setWorkStatus_Description(
              responseJson.data.data[index].wrk_sts_desc
            );

            if (responseJson.data.data[index].wrk_sts_email_flag == 0) {
              setEmailStatus_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_sts_email_flag
              );
            } else {
              setEmailStatus_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_sts_email_flag
              );
            }
            if (responseJson.data.data[index].wrk_sts_auto_send == 0) {
              setAutoSendEmail_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_sts_auto_send
              );
            } else {
              setAutoSendEmail_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_sts_auto_send
              );
            }

            setEmailTemplate(responseJson.data.data[index].wrk_sts_template);
            if (responseJson.data.data[index].wrk_sts_disable_flag == 0) {
              setWorkStatus_Disable_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_sts_disable_flag
              );
            } else {
              setWorkStatus_Disable_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work Status
  const get_work_workstatus_insert = (site_ID, emp_mst_login_id) => {
    let flg_email, flg_autosendEmail, flg_disable;
    if (EmailStatus_Checkbox) {
      flg_email = 1;
    } else {
      flg_email = 0;
    }
    if (AutoSendEmail_Checkbox) {
      flg_autosendEmail = 1;
    } else {
      flg_autosendEmail = 0;
    }
    if (WorkStatus_Disable_Checkbox) {
      flg_disable = 1;
    } else {
      flg_disable = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_sts_typ_cd: selected_Statustype.value,
      wrk_sts_status: Status,
      wrk_sts_desc: WorkStatus_Description,
      wrk_sts_email_flag: flg_email,
      wrk_sts_auto_send: flg_autosendEmail,
      wrk_sts_template: EmailTemplate,
      wrk_sts_disable_flag: flg_disable,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workstatus_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkStatus",
              state: { data: "WorkStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Status
  const get_work_workstatus_update = (site_ID, rowid, emp_mst_login_id) => {
    let flg_email, flg_autosendEmail, flg_disable;
    if (EmailStatus_Checkbox) {
      flg_email = 1;
    } else {
      flg_email = 0;
    }
    if (AutoSendEmail_Checkbox) {
      flg_autosendEmail = 1;
    } else {
      flg_autosendEmail = 0;
    }
    if (WorkStatus_Disable_Checkbox) {
      flg_disable = 1;
    } else {
      flg_disable = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_sts_typ_cd: Statustype,
      wrk_sts_status: Status,
      wrk_sts_desc: WorkStatus_Description,
      wrk_sts_email_flag: flg_email,
      wrk_sts_auto_send: flg_autosendEmail,
      wrk_sts_email_flag: EmailTemplate,
      wrk_sts_disable_flag: flg_disable,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workstatus_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkStatus",
              state: { data: "WorkStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Status
  const get_work_workstatus_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workstatus_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkStatus",
              state: { data: "WorkStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work Priority Select
  const get_work_workpriority_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workpriority_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPriorityCode(responseJson.data.data[index].wrk_pri_pri_cd);
            setWorkPriority_Description(
              responseJson.data.data[index].wrk_pri_desc
            );
            setDueDateCount(
              responseJson.data.data[index].wrk_pri_due_date_count
            );

            if (responseJson.data.data[index].wrk_pri_disable_flag == 0) {
              setWorkPriority_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_pri_disable_flag
              );
            } else {
              setWorkPriority_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_pri_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work Priority
  const get_work_workpriority_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_disableFlag;
    if (WorkPriority_DisableFlag_Checkbox) {
      Wrk_disableFlag = 1;
    } else {
      Wrk_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_pri_pri_cd: PriorityCode,
      wrk_pri_desc: WorkPriority_Description,
      wrk_pri_due_date_count: DueDateCount,
      wrk_pri_disable_flag: Wrk_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workpriority_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          console.log(responseJson.data.status);

          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkPriority",
              state: { data: "WorkPriority" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Priority
  const get_work_workpriority_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_disableFlag;
    if (WorkPriority_DisableFlag_Checkbox) {
      Wrk_disableFlag = 1;
    } else {
      Wrk_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_pri_pri_cd: PriorityCode,
      wrk_pri_desc: WorkPriority_Description,
      wrk_pri_due_date_count: DueDateCount,
      wrk_pri_disable_flag: Wrk_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workpriority_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkPriority",
              state: { data: "WorkPriority" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Priority
  const get_work_workpriority_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workpriority_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkPriority",
              state: { data: "WorkPriority" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work Group Select
  const get_work_workgroup_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workgroup_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setGroupCode(responseJson.data.data[index].wrk_grp_grp_cd);
            setWorkGroup_Description(
              responseJson.data.data[index].wrk_grp_desc
            );
            setForemanEmployeeID(responseJson.data.data[index].wrk_grp_empl_id);

            if (responseJson.data.data[index].wrk_grp_disable_flag == 0) {
              setWorkGroup_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_grp_disable_flag
              );
            } else {
              setWorkGroup_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_grp_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work  Group
  const get_work_workgroup_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_grp_disableFlag;
    if (WorkGroup_DisableFlag_Checkbox) {
      Wrk_grp_disableFlag = 1;
    } else {
      Wrk_grp_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_grp_grp_cd: GroupCode,
      wrk_grp_desc: WorkGroup_Description,
      wrk_grp_empl_id: selected_ForemanEmployeeID.value,
      wrk_grp_disable_flag: Wrk_grp_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workgroup_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkGroup",
              state: { data: "WorkGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Group
  const get_work_workgroup_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_grp_disableFlag;
    if (WorkGroup_DisableFlag_Checkbox) {
      Wrk_grp_disableFlag = 1;
    } else {
      Wrk_grp_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_grp_grp_cd: GroupCode,
      wrk_grp_desc: WorkGroup_Description,
      wrk_grp_disable_flag: Wrk_grp_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workgroup_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkGroup",
              state: { data: "WorkGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Group
  const get_work_workgroup_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workgroup_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkGroup",
              state: { data: "WorkGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work Class Select
  const get_work_workclass_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workclass_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setClassCode(responseJson.data.data[index].wrk_cls_cls_cd);
            setWorkClass_Description(
              responseJson.data.data[index].wrk_cls_desc
            );

            if (responseJson.data.data[index].wrk_cls_disable_flag == 0) {
              setWorkClass_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_cls_disable_flag
              );
            } else {
              setWorkClass_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_cls_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work  Class
  const get_work_workclass_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_cls_disableFlag;
    if (WorkClass_DisableFlag_Checkbox) {
      Wrk_cls_disableFlag = 1;
    } else {
      Wrk_cls_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_cls_cls_cd: ClassCode,
      wrk_cls_desc: WorkClass_Description,
      wrk_cls_disable_flag: Wrk_cls_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workclass_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkClass",
              state: { data: "WorkClass" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Class
  const get_work_workclass_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_cls_disableFlag;
    if (WorkClass_DisableFlag_Checkbox) {
      Wrk_cls_disableFlag = 1;
    } else {
      Wrk_cls_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_cls_cls_cd: ClassCode,
      wrk_cls_desc: WorkClass_Description,
      wrk_cls_disable_flag: Wrk_cls_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workclass_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkClass",
              state: { data: "WorkClass" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Class
  const get_work_workclass_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workclass_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkClass",
              state: { data: "WorkClass" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work Type Select
  const get_work_worktype_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_worktype_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setTypeCode(responseJson.data.data[index].wrk_typ_typ_cd);
            setWorkType_Description(responseJson.data.data[index].wrk_typ_desc);

            if (responseJson.data.data[index].wrk_typ_disable_flag == 0) {
              setWorkType_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_typ_disable_flag
              );
            } else {
              setWorkType_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_typ_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work  Type
  const get_work_worktype_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_typ_disableFlag;
    if (WorkType_DisableFlag_Checkbox) {
      Wrk_typ_disableFlag = 1;
    } else {
      Wrk_typ_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_typ_typ_cd: TypeCode,
      wrk_typ_desc: WorkType_Description,
      wrk_typ_disable_flag: Wrk_typ_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_worktype_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkType",
              state: { data: "WorkType" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Type
  const get_work_worktype_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_typ_disableFlag;
    if (WorkType_DisableFlag_Checkbox) {
      Wrk_typ_disableFlag = 1;
    } else {
      Wrk_typ_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_typ_typ_cd: TypeCode,
      wrk_typ_desc: WorkType_Description,
      wrk_typ_disable_flag: Wrk_typ_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_worktype_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkType",
              state: { data: "WorkType" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Type
  const get_work_worktype_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_worktype_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkType",
              state: { data: "WorkType" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work fault Code Select
  const get_work_workfaultcode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workfaultcode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setFaultCode(responseJson.data.data[index].wrk_flt_fault_cd);
            setWorkFaultCode_Description(
              responseJson.data.data[index].wrk_flt_desc
            );

            if (responseJson.data.data[index].wrk_flt_disable_flag == 0) {
              setWorkFaultCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_flt_disable_flag
              );
            } else {
              setWorkFaultCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_flt_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work Fault Code
  const get_work_workfaultcode_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_flt_disableFlag;
    if (WorkFaultCode_DisableFlag_Checkbox) {
      Wrk_flt_disableFlag = 1;
    } else {
      Wrk_flt_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_flt_fault_cd: FaultCode,
      wrk_flt_desc: WorkFaultCode_Description,
      wrk_flt_disable_flag: Wrk_flt_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workfaultcode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkFaultCode",
              state: { data: "WorkFaultCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Fault Code
  const get_work_workfaultcode_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_flt_disableFlag;
    if (WorkFaultCode_DisableFlag_Checkbox) {
      Wrk_flt_disableFlag = 1;
    } else {
      Wrk_flt_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_flt_fault_cd: FaultCode,
      wrk_flt_desc: WorkFaultCode_Description,
      wrk_flt_disable_flag: Wrk_flt_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workfaultcode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkType",
              state: { data: "WorkType" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Fault Code
  const get_work_workfaultcode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workfaultcode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkFaultCode",
              state: { data: "WorkFaultCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work Cause code Select
  const get_work_workcausecode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workcausecode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setCauseCode(responseJson.data.data[index].wrk_ccd_cause_cd);
            setWorkCauseCode_Type(responseJson.data.data[index].wrk_ccd_type);
            setWorkCauseCode_Description(
              responseJson.data.data[index].wrk_ccd_desc
            );

            if (responseJson.data.data[index].wrk_ccd_disable_flag == 0) {
              setWorkCauseCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_ccd_disable_flag
              );
            } else {
              setWorkCauseCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_ccd_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work Cause Code
  const get_work_workcausecode_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_ccd_disableFlag;
    if (WorkCauseCode_DisableFlag_Checkbox) {
      Wrk_ccd_disableFlag = 1;
    } else {
      Wrk_ccd_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_ccd_cause_cd: CauseCode,
      wrk_ccd_type: selected_WorkCauseCode_Type.value,
      wrk_ccd_desc: WorkCauseCode_Description,
      wrk_ccd_disable_flag: Wrk_ccd_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workcausecode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkCauseCode",
              state: { data: "WorkCauseCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Cause Code
  const get_work_workcausecode_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_ccd_disableFlag;
    if (WorkCauseCode_DisableFlag_Checkbox) {
      Wrk_ccd_disableFlag = 1;
    } else {
      Wrk_ccd_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_ccd_cause_cd: CauseCode,
      wrk_ccd_desc: WorkCauseCode_Description,
      wrk_ccd_disable_flag: Wrk_ccd_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workcausecode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkCauseCode",
              state: { data: "WorkCauseCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Cause Code
  const get_work_workcausecode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workcausecode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkCauseCode",
              state: { data: "WorkCauseCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work Action Code Select
  const get_work_workactioncode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workactioncode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setActionCode(responseJson.data.data[index].wrk_act_action_cd);
            setWorkActionCode_Description(
              responseJson.data.data[index].wrk_act_desc
            );

            if (responseJson.data.data[index].wrk_act_disable_flag == 0) {
              setWorkActionCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_act_disable_flag
              );
            } else {
              setWorkActionCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_act_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work Action Code
  const get_work_workactioncode_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_act_disableFlag;
    if (WorkActionCode_DisableFlag_Checkbox) {
      Wrk_act_disableFlag = 1;
    } else {
      Wrk_act_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_act_action_cd: ActionCode,
      wrk_act_desc: WorkActionCode_Description,
      wrk_act_disable_flag: Wrk_act_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workactioncode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkActionCode",
              state: { data: "WorkActionCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Action Code
  const get_work_workactioncode_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_act_disableFlag;
    if (WorkActionCode_DisableFlag_Checkbox) {
      Wrk_act_disableFlag = 1;
    } else {
      Wrk_act_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_act_action_cd: ActionCode,
      wrk_act_desc: WorkActionCode_Description,
      wrk_act_disable_flag: Wrk_act_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workactioncode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkActionCode",
              state: { data: "WorkActionCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Action Code
  const get_work_workactioncode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workactioncode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkActionCode",
              state: { data: "WorkActionCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Work Delay Code Select
  const get_work_workdelaycode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workdelaycode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setDelayCode(responseJson.data.data[index].wrk_dcd_delay_cd);
            setWorkDelayCode_Description(
              responseJson.data.data[index].wrk_dcd_desc
            );

            if (responseJson.data.data[index].wrk_dcd_disable_flag == 0) {
              setWorkDelayCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_dcd_disable_flag
              );
            } else {
              setWorkDelayCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].wrk_dcd_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Work Delay Code
  const get_work_workdelaycode_insert = (site_ID, emp_mst_login_id) => {
    let Wrk_dcd_disableFlag;
    if (WorkDelayCode_DisableFlag_Checkbox) {
      Wrk_dcd_disableFlag = 1;
    } else {
      Wrk_dcd_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_dcd_delay_cd: DelayCode,
      wrk_dcd_desc: WorkDelayCode_Description,
      wrk_dcd_disable_flag: Wrk_dcd_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_work_workdelaycode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkDelayCode",
              state: { data: "WorkDelayCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Work Delay Code
  const get_work_workdelaycode_update = (site_ID, rowid, emp_mst_login_id) => {
    let Wrk_dcd_disableFlag;
    if (WorkDelayCode_DisableFlag_Checkbox) {
      Wrk_dcd_disableFlag = 1;
    } else {
      Wrk_dcd_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      wrk_dcd_delay_cd: DelayCode,
      wrk_dcd_desc: WorkDelayCode_Description,
      wrk_dcd_disable_flag: Wrk_dcd_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_work_workdelaycode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkDelayCode",
              state: { data: "WorkDelayCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Work Delay Code
  const get_work_workdelaycode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_work_workdelaycode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/WorkDelayCode",
              state: { data: "WorkDelayCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //-------------------------------------------MasterFile Material-----------------------------------------------------------------------
  //Material Location Category select
  const get_material_locationcategory_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_locationcategory_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setLocationCategory(responseJson.data.data[index].loc_cat_loc_cat);
            setLocationCategory_Description(
              responseJson.data.data[index].loc_cat_desc
            );

            if (responseJson.data.data[index].loc_cat_disable_flag == 0) {
              setLocationCategory_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_cat_disable_flag
              );
            } else {
              setLocationCategory_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_cat_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Material Location Category insert
  const get_material_locationcategory_insert = (site_ID, emp_mst_login_id) => {
    let Category_disableFlag;
    if (LocationCategory_DisableFlag_Checkbox) {
      Category_disableFlag = 1;
    } else {
      Category_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      loc_cat_loc_cat: LocationCategory,
      loc_cat_desc: LocationCategory_Description,
      loc_cat_disable_flag: Category_disableFlag,
      loc_cat_inc_ttloh: LocationCategory_ttloh,
      loc_cat_mtl_usage: LocationCategory_usage,
      loc_cat_inc_ttl_val: LocationCategory_val,
      loc_cat_inc_rcv: LocationCategory_rcv,
      loc_cat_consigned: LocationCategory_consigned,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_material_locationcategory_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_LocationCategory",
              state: { data: "Material_LocationCategory" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Material Location Category
  const get_material_locationcategory_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Category_disableFlag;
    if (LocationCategory_DisableFlag_Checkbox) {
      Category_disableFlag = 1;
    } else {
      Category_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      loc_cat_loc_cat: LocationCategory,
      loc_cat_desc: LocationCategory_Description,
      loc_cat_disable_flag: Category_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_material_locationcategory_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_LocationCategory",
              state: { data: "Material_LocationCategory" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Material Location Category
  const get_material_locationcategory_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_locationcategory_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_LocationCategory",
              state: { data: "Material_LocationCategory" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Material Location Select
  const get_material_location_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_location_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setStockLocation(responseJson.data.data[index].loc_mst_stk_loc);
            setMasterLocation(responseJson.data.data[index].loc_mst_mst_loc_cd);
            setAreaCode(responseJson.data.data[index].loc_mst_area_loc_cd);
            setBinID(responseJson.data.data[index].loc_mst_bin_id);
            setMaterialLocation_Seperator(
              responseJson.data.data[index].loc_mst_separator
            );
            setStorageType(responseJson.data.data[index].loc_mst_storage_type);
            setMaterialLocation_Description(
              responseJson.data.data[index].loc_mst_desc
            );
            setCapacity(responseJson.data.data[index].loc_mst_capacity);
            setCapacityUOM(responseJson.data.data[index].loc_mst_capacity_uom);
            setSupplier(responseJson.data.data[index].loc_mst_supplier);
            setCostCenter(responseJson.data.data[index].loc_mst_costcenter);
            setAccount(responseJson.data.data[index].loc_mst_account);

            if (responseJson.data.data[index].loc_mst_stock_cost_flag == 0) {
              setUpdateStockCosting_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_mst_stock_cost_flag
              );
            } else {
              setUpdateStockCosting_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_mst_stock_cost_flag
              );
            }

            if (responseJson.data.data[index].loc_mst_onhold == 0) {
              setOnHold_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_mst_onhold
              );
            } else {
              setOnHold_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_mst_onhold
              );
            }

            if (responseJson.data.data[index].loc_mst_disable_flag == 0) {
              setMaterialLocation_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_mst_disable_flag
              );
            } else {
              setMaterialLocation_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].loc_mst_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Material Location  insert
  const get_material_location_insert = (site_ID, emp_mst_login_id) => {
    let Location_stock_cost_flag, Location_onhold, Location_disable_flag;
    if (UpdateStockCosting_Checkbox) {
      Location_stock_cost_flag = 1;
    } else {
      Location_stock_cost_flag = 0;
    }
    if (OnHold_Checkbox) {
      Location_onhold = 1;
    } else {
      Location_onhold = 0;
    }
    if (MaterialLocation_DisableFlag_Checkbox) {
      Location_disable_flag = 1;
    } else {
      Location_disable_flag = 0;
    }
    var json = {
      site_cd: site_ID,
      loc_mst_stk_loc: StockLocation,
      loc_mst_mst_loc_cd: MasterLocation,
      loc_mst_area_loc_cd: AreaCode,
      loc_mst_bin_id: BinID,
      loc_mst_separator: selected_MaterialLocation_Seperator.value,
      loc_mst_storage_type: StorageType,
      loc_mst_desc: MaterialLocation_Description,
      loc_mst_capacity: Capacity,
      loc_mst_capacity_uom: selected_CapacityUOM.value,
      loc_mst_supplier: selected_Supplier.value,
      loc_mst_costcenter: selected_CostCenter.value,
      loc_mst_account: selected_Account.value,
      loc_mst_stock_cost_flag: Location_stock_cost_flag,
      loc_mst_onhold: Location_onhold,
      loc_mst_disable_flag: Location_disable_flag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_material_location_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_Location",
              state: { data: "Material_Location" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Material Location
  const get_material_location_update = (site_ID, rowid, emp_mst_login_id) => {
    let Location_stock_cost_flag, Location_onhold, Location_disable_flag;
    if (UpdateStockCosting_Checkbox) {
      Location_stock_cost_flag = 1;
    } else {
      Location_stock_cost_flag = 0;
    }
    if (OnHold_Checkbox) {
      Location_onhold = 1;
    } else {
      Location_onhold = 0;
    }
    if (MaterialLocation_DisableFlag_Checkbox) {
      Location_disable_flag = 1;
    } else {
      Location_disable_flag = 0;
    }

    var json = {
      site_cd: site_ID,
      loc_mst_stk_loc: StockLocation,
      loc_mst_mst_loc_cd: MasterLocation,
      loc_mst_area_loc_cd: AreaCode,
      loc_mst_bin_id: BinID,
      loc_mst_separator: MaterialLocation_Seperator,
      loc_mst_storage_type: StorageType,
      loc_mst_desc: MaterialLocation_Description,
      loc_mst_capacity: Capacity,
      loc_mst_capacity_uom: CapacityUOM,
      loc_mst_supplier: Supplier,
      loc_mst_costcenter: CostCenter,
      loc_mst_account: Account,
      loc_mst_stock_cost_flag: Location_stock_cost_flag,
      loc_mst_onhold: Location_onhold,
      loc_mst_disable_flag: Location_disable_flag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_material_location_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_Location",
              state: { data: "Material_Location" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete Material Location
  const get_material_location_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_location_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_Location",
              state: { data: "Material_Location" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Material Status select
  const get_material_status_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_status_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setStatusType(responseJson.data.data[index].itm_sts_typ_cd);
            setMaterial_Status(responseJson.data.data[index].itm_sts_status);
            setMaterialStatus_Description(
              responseJson.data.data[index].itm_sts_desc
            );

            if (responseJson.data.data[index].itm_sts_disable_flag == 0) {
              setMaterialStatus_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].itm_sts_disable_flag
              );
            } else {
              setMaterialStatus_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].itm_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Material Status insert
  const get_material_status_insert = (site_ID, emp_mst_login_id) => {
    let Status_disableFlag;
    if (MaterialStatus_DisableFlag_Checkbox) {
      Status_disableFlag = 1;
    } else {
      Status_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      itm_sts_typ_cd: StatusType,
      itm_sts_status: Material_Status,
      itm_sts_desc: MaterialStatus_Description,
      itm_sts_disable_flag: Status_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_material_status_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_Status",
              state: { data: "Material_Status" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Material Status
  const get_material_status_update = (site_ID, rowid, emp_mst_login_id) => {
    let Status_disableFlag;
    if (MaterialStatus_DisableFlag_Checkbox) {
      Status_disableFlag = 1;
    } else {
      Status_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      itm_sts_typ_cd: StatusType,
      itm_sts_status: Material_Status,
      itm_sts_desc: MaterialStatus_Description,
      itm_sts_disable_flag: Status_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_material_status_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_Status",
              state: { data: "Material_Status" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Material Status
  const get_material_status_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_status_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_Status",
              state: { data: "Material_Status" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Material Commodity Code select
  const get_material_commoditycode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_commoditycode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setCommodityCode(responseJson.data.data[index].com_mst_com_code);
            setMaterialCommodityCode_Description(
              responseJson.data.data[index].com_mst_desc
            );

            if (responseJson.data.data[index].com_mst_disable_flag == 0) {
              setMaterialCommodityCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].com_mst_disable_flag
              );
            } else {
              setMaterialCommodityCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].com_mst_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Material Commodity Code
  const get_material_commoditycode_insert = (site_ID, emp_mst_login_id) => {
    let Commodity_disableFlag;
    if (MaterialCommodityCode_DisableFlag_Checkbox) {
      Commodity_disableFlag = 1;
    } else {
      Commodity_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      itm_sts_typ_cd: CommodityCode,
      itm_sts_status: MaterialCommodityCode_Description,
      itm_sts_disable_flag: Commodity_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_material_commoditycode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_CommodityCode",
              state: { data: "Material_CommodityCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Material Commodity Code
  const get_material_commoditycode_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Commodity_disableFlag;
    if (MaterialCommodityCode_DisableFlag_Checkbox) {
      Commodity_disableFlag = 1;
    } else {
      Commodity_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      itm_sts_typ_cd: CommodityCode,
      itm_sts_status: MaterialCommodityCode_Description,
      itm_sts_disable_flag: Commodity_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_material_commoditycode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_CommodityCode",
              state: { data: "Material_CommodityCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Material Commodity Code
  const get_material_commoditycode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_commoditycode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_CommodityCode",
              state: { data: "Material_CommodityCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Material group Code select
  const get_material_groupcode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_groupcode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setStockGroupCode(responseJson.data.data[index].itm_grp_cd);
            setMaterialGroupCode_Description(
              responseJson.data.data[index].itm_grp_desc
            );

            if (responseJson.data.data[index].itm_grp_disable_flag == 0) {
              setMaterialGroupCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].itm_grp_disable_flag
              );
            } else {
              setMaterialGroupCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].itm_grp_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Material Group Code
  const get_material_groupcode_insert = (site_ID, emp_mst_login_id) => {
    let Group_disableFlag;
    if (MaterialGroupCode_DisableFlag_Checkbox) {
      Group_disableFlag = 1;
    } else {
      Group_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      itm_grp_cd: StockGroupCode,
      itm_grp_desc: MaterialGroupCode_Description,
      itm_grp_disable_flag: Group_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_material_groupcode_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_GroupCode",
              state: { data: "Material_GroupCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Material Group Code
  const get_material_groupcode_update = (site_ID, rowid, emp_mst_login_id) => {
    let Group_disableFlag;
    if (MaterialGroupCode_DisableFlag_Checkbox) {
      Group_disableFlag = 1;
    } else {
      Group_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      itm_grp_cd: StockGroupCode,
      itm_grp_desc: MaterialGroupCode_Description,
      itm_grp_disable_flag: Group_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_material_groupcode_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_GroupCode",
              state: { data: "Material_GroupCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Material Group Code
  const get_material_groupcode_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_material_groupcode_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Material_GroupCode",
              state: { data: "Material_GroupCode" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //-------------------------------------------MasterFile PM-----------------------------------------------------------------------
  //PM Frequency Code select
  const get_pm_frequencycode_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_pm_frequencycode_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setFrequencyCode(responseJson.data.data[index].prm_fcd_freq_code);
            setPM_FrequencyCode_Description(
              responseJson.data.data[index].prm_fcd_desc
            );
            setFrequencyType(responseJson.data.data[index].prm_fcd_freq_type);
            setBand(responseJson.data.data[index].prm_fcd_band);
            setLead(responseJson.data.data[index].prm_fcd_lead_pct);

            if (responseJson.data.data[index].prm_fcd_disable_flag == 0) {
              setPM_FrequencyCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prm_fcd_disable_flag
              );
            } else {
              setPM_FrequencyCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prm_fcd_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //PM Group Master select
  const get_pm_groupmaster_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_pm_groupmaster_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPMGroupCode(responseJson.data.data[index].prm_grp_grp_cd);
            setPMGroupMaster_Description(
              responseJson.data.data[index].prm_grp_desc
            );
            setPMGroupMaster_AssetLocation(
              responseJson.data.data[index].prm_grp_ast_loc
            );

            if (responseJson.data.data[index].prm_grp_disable_flag == 0) {
              setPMGroupMaster_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prm_grp_disable_flag
              );
            } else {
              setPMGroupMaster_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].prm_grp_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert PM Group Master
  const get_pm_groupmaster_insert = (site_ID, emp_mst_login_id) => {
    let PM_Group__disableFlag;
    if (PMGroupMaster_DisableFlag_Checkbox) {
      PM_Group__disableFlag = 1;
    } else {
      PM_Group__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      prm_grp_grp_cd: PMGroupCode,
      prm_grp_desc: PMGroupMaster_Description,
      prm_grp_ast_loc: selected_PMGroupMaster_AssetLocation.value,
      prm_grp_disable_flag: PM_Group__disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_pm_groupmaster_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/PM_GroupMaster",
              state: { data: "PM_GroupMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update PM Group Master
  const get_pm_groupmaster_update = (site_ID, rowid, emp_mst_login_id) => {
    let PM_Group__disableFlag;
    if (PMGroupMaster_DisableFlag_Checkbox) {
      PM_Group__disableFlag = 1;
    } else {
      PM_Group__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      prm_grp_grp_cd: PMGroupCode,
      prm_grp_desc: PMGroupMaster_Description,
      prm_grp_disable_flag: PM_Group__disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_pm_groupmaster_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/PM_GroupMaster",
              state: { data: "PM_GroupMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete PM Group Master
  const get_pm_groupmaster_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_pm_groupmaster_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/PM_GroupMaster",
              state: { data: "PM_GroupMaster" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //PM Task Group select
  const get_pm_taskgroup_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_pm_taskgroup_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setTaskGroupCode(responseJson.data.data[index].dts_grp_cd);
            setTaskGroupCode_Description(
              responseJson.data.data[index].dts_grp_desc
            );

            if (responseJson.data.data[index].dts_grp_disable_flag == 0) {
              setTaskGroupCode_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].dts_grp_disable_flag
              );
            } else {
              setTaskGroupCode_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].dts_grp_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert PM Task Group
  const get_pm_taskgroup_insert = (site_ID, emp_mst_login_id) => {
    let Task_Group__disableFlag;
    if (TaskGroupCode_DisableFlag_Checkbox) {
      Task_Group__disableFlag = 1;
    } else {
      Task_Group__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      dts_grp_cd: TaskGroupCode,
      dts_grp_desc: TaskGroupCode_Description,
      dts_grp_disable_flag: Task_Group__disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_pm_taskgroup_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/PM_TaskGroup",
              state: { data: "PM_TaskGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update PM Task Group
  const get_pm_taskgroup_update = (site_ID, rowid, emp_mst_login_id) => {
    let Task_Group__disableFlag;
    if (TaskGroupCode_DisableFlag_Checkbox) {
      Task_Group__disableFlag = 1;
    } else {
      Task_Group__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      dts_grp_cd: TaskGroupCode,
      dts_grp_desc: TaskGroupCode_Description,
      dts_grp_disable_flag: Task_Group__disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_pm_taskgroup_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/PM_TaskGroup",
              state: { data: "PM_TaskGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  // Delete PM Task Group
  const get_pm_taskgroup_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_pm_taskgroup_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/PM_TaskGroup",
              state: { data: "PM_TaskGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //-------------------------------------------MasterFile Purchasing-----------------------------------------------------------------------
  //Purchasing PR Status select
  const get_purchasing_prstatus_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_prstatus_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPurchasing_PRStatus_StatusType(
              responseJson.data.data[index].pur_sts_status_type
            );
            setPurchasing_PRStatus_Status(
              responseJson.data.data[index].pur_sts_status
            );
            setPurchasing_PRStatus_Description(
              responseJson.data.data[index].pur_sts_description
            );

            if (responseJson.data.data[index].pur_sts_email_flag == 0) {
              setPurchasing_PRStatus_EmailStatus_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].pur_sts_email_flag
              );
            } else {
              setPurchasing_PRStatus_EmailStatus_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].pur_sts_email_flag
              );
            }

            if (responseJson.data.data[index].pur_sts_disable_flag == 0) {
              setPurchasing_PRStatus_Disable_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].pur_sts_disable_flag
              );
            } else {
              setPurchasing_PRStatus_Disable_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].pur_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Purchasing Pr Status
  const get_purchasing_prstatus_insert = (site_ID, emp_mst_login_id) => {
    let PrStatus_email_flag, PrStatus__disableFlag;
    if (Purchasing_PRStatus_EmailStatus_Checkbox) {
      PrStatus_email_flag = 1;
    } else {
      PrStatus_email_flag = 0;
    }
    if (Purchasing_PRStatus_Disable_Checkbox) {
      PrStatus__disableFlag = 1;
    } else {
      PrStatus__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      pur_sts_status: Purchasing_PRStatus_Status,
      pur_sts_description: Purchasing_PRStatus_Description,
      pur_sts_status_type: Purchasing_PRStatus_StatusType,
      pur_sts_email_flag: PrStatus_email_flag,
      pur_sts_disable_flag: PrStatus__disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_purchasing_prstatus_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_PRStatus",
              state: { data: "Purchasing_PRStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Purchasing Pr Status
  const get_purchasing_prstatus_update = (site_ID, rowid, emp_mst_login_id) => {
    let PrStatus_email_flag, PrStatus__disableFlag;
    if (Purchasing_PRStatus_EmailStatus_Checkbox) {
      PrStatus_email_flag = 1;
    } else {
      PrStatus_email_flag = 0;
    }
    if (Purchasing_PRStatus_Disable_Checkbox) {
      PrStatus__disableFlag = 1;
    } else {
      PrStatus__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      pur_sts_status: Purchasing_PRStatus_Status,
      pur_sts_description: Purchasing_PRStatus_Description,
      pur_sts_status_type: Purchasing_PRStatus_StatusType,
      pur_sts_email_flag: PrStatus_email_flag,
      pur_sts_disable_flag: PrStatus__disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_purchasing_prstatus_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_PRStatus",
              state: { data: "Purchasing_PRStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Purchasing PR Status
  const get_purchasing_prstatus_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_prstatus_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_PRStatus",
              state: { data: "Purchasing_PRStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Purchasing PO Status select
  const get_purchasing_postatus_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_postatus_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPurchasing_POStatus_StatusType(
              responseJson.data.data[index].puo_sts_status_type
            );
            setPurchasing_POStatus_Status(
              responseJson.data.data[index].puo_sts_status
            );
            setPurchasing_POStatus_Description(
              responseJson.data.data[index].puo_sts_description
            );

            if (responseJson.data.data[index].puo_sts_email_flag == 0) {
              setPurchasing_POStatus_EmailStatus_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_sts_email_flag
              );
            } else {
              setPurchasing_POStatus_EmailStatus_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_sts_email_flag
              );
            }

            if (responseJson.data.data[index].puo_sts_disable_flag == 0) {
              setPurchasing_POStatus_Disable_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_sts_disable_flag
              );
            } else {
              setPurchasing_POStatus_Disable_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Purchasing Po Status insert
  const get_purchasing_postatus_insert = (site_ID, emp_mst_login_id) => {
    let PoStatus_email_flag, PoStatus__disableFlag;
    if (Purchasing_POStatus_EmailStatus_Checkbox) {
      PoStatus_email_flag = 1;
    } else {
      PoStatus_email_flag = 0;
    }
    if (Purchasing_POStatus_Disable_Checkbox) {
      PoStatus__disableFlag = 1;
    } else {
      PoStatus__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      puo_sts_status: Purchasing_POStatus_StatusType,
      puo_sts_description: Purchasing_POStatus_Status,
      puo_sts_status_type: Purchasing_POStatus_Description,
      puo_sts_email_flag: PoStatus_email_flag,
      puo_sts_disable_flag: PoStatus__disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_purchasing_postatus_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_POStatus",
              state: { data: "Purchasing_POStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Purchasing Po Status
  const get_purchasing_postatus_update = (site_ID, rowid, emp_mst_login_id) => {
    let PoStatus_email_flag, PoStatus__disableFlag;
    if (Purchasing_POStatus_EmailStatus_Checkbox) {
      PoStatus_email_flag = 1;
    } else {
      PoStatus_email_flag = 0;
    }
    if (Purchasing_POStatus_Disable_Checkbox) {
      PoStatus__disableFlag = 1;
    } else {
      PoStatus__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      puo_sts_status: Purchasing_POStatus_StatusType,
      puo_sts_description: Purchasing_POStatus_Status,
      puo_sts_status_type: Purchasing_POStatus_Description,
      puo_sts_email_flag: PoStatus_email_flag,
      puo_sts_disable_flag: PoStatus__disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_purchasing_postatus_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_POStatus",
              state: { data: "Purchasing_POStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Purchasing PO Status
  const get_purchasing_postatus_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_postatus_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_POStatus",
              state: { data: "Purchasing_POStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Purchasing Contract Status select
  const get_purchasing_contractstatus_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_contractstatus_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPurchasing_ConstractStatus_StatusType(
              responseJson.data.data[index].con_sts_type
            );
            setPurchasing_ConstractStatus_Status(
              responseJson.data.data[index].con_sts_status
            );
            setPurchasing_ConstractStatus_Description(
              responseJson.data.data[index].con_sts_description
            );

            if (responseJson.data.data[index].con_sts_email_flag == 0) {
              setPurchasing_ConstractStatus_EmailFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].con_sts_email_flag
              );
            } else {
              setPurchasing_ConstractStatus_EmailFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].con_sts_email_flag
              );
            }

            if (responseJson.data.data[index].con_sts_disable_flag == 0) {
              setPurchasing_ConstractStatus_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].con_sts_disable_flag
              );
            } else {
              setPurchasing_ConstractStatus_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].con_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Purchasing Contract Status
  const get_purchasing_contractstatus_insert = (site_ID, emp_mst_login_id) => {
    let Contract_Status_email_flag, Contract_Status__disableFlag;
    if (Purchasing_ConstractStatus_EmailFlag_Checkbox) {
      Contract_Status_email_flag = 1;
    } else {
      Contract_Status_email_flag = 0;
    }
    if (Purchasing_ConstractStatus_DisableFlag_Checkbox) {
      Contract_Status__disableFlag = 1;
    } else {
      Contract_Status__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      con_sts_type: Purchasing_ConstractStatus_StatusType,
      con_sts_status: Purchasing_ConstractStatus_Status,
      con_sts_description: Purchasing_ConstractStatus_Description,
      con_sts_email_flag: Contract_Status_email_flag,
      con_sts_disable_flag: Contract_Status__disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_purchasing_contractstatus_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_ConstractStatus",
              state: { data: "Purchasing_ConstractStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Purchasing Contract Status
  const get_purchasing_contractstatus_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Contract_Status_email_flag, Contract_Status__disableFlag;
    if (Purchasing_ConstractStatus_EmailFlag_Checkbox) {
      Contract_Status_email_flag = 1;
    } else {
      Contract_Status_email_flag = 0;
    }
    if (Purchasing_ConstractStatus_DisableFlag_Checkbox) {
      Contract_Status__disableFlag = 1;
    } else {
      Contract_Status__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      con_sts_type: Purchasing_ConstractStatus_StatusType,
      con_sts_status: Purchasing_ConstractStatus_Status,
      con_sts_description: Purchasing_ConstractStatus_Description,
      con_sts_email_flag: Contract_Status_email_flag,
      con_sts_disable_flag: Contract_Status__disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_purchasing_contractstatus_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_ConstractStatus",
              state: { data: "Purchasing_ConstractStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Purchasing Contract Status
  const get_purchasing_contractstatus_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_contractstatus_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_ConstractStatus",
              state: { data: "Purchasing_ConstractStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Purchasing Constract Group Select
  const get_purchasing_contractgroup_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_contractgroup_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPurchasing_ConstractGroup_GroupCode(
              responseJson.data.data[index].con_grp_grp_cd
            );
            setPurchasing_ConstractGroup_Description(
              responseJson.data.data[index].con_grp_desc
            );

            if (responseJson.data.data[index].con_grp_disable_flag == 0) {
              setPurchasing_ConstractGroup_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].con_grp_disable_flag
              );
            } else {
              setPurchasing_ConstractGroup_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].con_grp_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Purchasing Constract Group
  const get_purchasing_contractgroup_insert = (site_ID, emp_mst_login_id) => {
    let Constract_Group__disableFlag;
    if (Purchasing_ConstractGroup_DisableFlag_Checkbox) {
      Constract_Group__disableFlag = 1;
    } else {
      Constract_Group__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      con_grp_grp_cd: Purchasing_ConstractGroup_GroupCode,
      con_grp_desc: Purchasing_ConstractGroup_Description,
      con_grp_disable_flag: Constract_Group__disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_purchasing_contractgroup_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_ConstractGroup",
              state: { data: "Purchasing_ConstractGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Purchasing Contract Group
  const get_purchasing_contractgroup_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Constract_Group__disableFlag;
    if (Purchasing_ConstractGroup_DisableFlag_Checkbox) {
      Constract_Group__disableFlag = 1;
    } else {
      Constract_Group__disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      con_grp_grp_cd: Purchasing_ConstractGroup_GroupCode,
      con_grp_desc: Purchasing_ConstractGroup_Description,
      con_grp_disable_flag: Constract_Group__disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_purchasing_contractgroup_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_ConstractGroup",
              state: { data: "Purchasing_ConstractGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Purchasing Contract Group
  const get_purchasing_contractgroup_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_contractgroup_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_ConstractGroup",
              state: { data: "Purchasing_ConstractGroup" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Purchasing Type select
  const get_purchasing_type_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_type_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPurchasing_Type_GroupCode(
              responseJson.data.data[index].puo_grp_grp_cd
            );
            setPurchasing_Type_Description(
              responseJson.data.data[index].puo_grp_desc
            );

            if (responseJson.data.data[index].puo_grp_disable_flag == 0) {
              setPurchasing_Type_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_grp_disable_flag
              );
            } else {
              setPurchasing_Type_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_grp_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Purchasing Type
  const get_purchasing_type_insert = (site_ID, emp_mst_login_id) => {
    let Type_disableFlag;
    if (Purchasing_Type_DisableFlag_Checkbox) {
      Type_disableFlag = 1;
    } else {
      Type_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      puo_grp_grp_cd: Purchasing_Type_GroupCode,
      puo_grp_desc: Purchasing_Type_Description,
      puo_grp_disable_flag: Type_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_purchasing_type_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_Type",
              state: { data: "Purchasing_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Purchasing Type
  const get_purchasing_type_update = (site_ID, rowid, emp_mst_login_id) => {
    let Type_disableFlag;
    if (Purchasing_Type_DisableFlag_Checkbox) {
      Type_disableFlag = 1;
    } else {
      Type_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      puo_grp_grp_cd: Purchasing_Type_GroupCode,
      puo_grp_desc: Purchasing_Type_Description,
      puo_grp_disable_flag: Type_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_purchasing_type_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_Type",
              state: { data: "Purchasing_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Purchasing Type
  const get_purchasing_type_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_type_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_Type",
              state: { data: "Purchasing_Type" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //Purchasing Priority select
  const get_purchasing_priority_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_priority_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPurchasing_Priority_PriorityCode(
              responseJson.data.data[index].puo_pri_pri_cd
            );
            setPurchasing_Priority_Description(
              responseJson.data.data[index].puo_pri_desc
            );
            setRequiredDateCount(
              responseJson.data.data[index].puo_pri_req_date_count
            );

            if (responseJson.data.data[index].puo_pri_disable_flag == 0) {
              setPurchasing_Priority_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_pri_disable_flag
              );
            } else {
              setPurchasing_Priority_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].puo_pri_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Purchasing Priority
  const get_purchasing_priority_insert = (site_ID, emp_mst_login_id) => {
    let Priority_disableFlag;
    if (Purchasing_Priority_DisableFlag_Checkbox) {
      Priority_disableFlag = 1;
    } else {
      Priority_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      puo_pri_pri_cd: Purchasing_Priority_PriorityCode,
      puo_pri_desc: Purchasing_Priority_Description,
      puo_pri_req_date_count: RequiredDateCount,
      puo_pri_disable_flag: Priority_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_purchasing_priority_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_Priority",
              state: { data: "Purchasing_Priority" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update Purchasing Priority
  const get_purchasing_priority_update = (site_ID, rowid, emp_mst_login_id) => {
    let Priority_disableFlag;
    if (Purchasing_Priority_DisableFlag_Checkbox) {
      Priority_disableFlag = 1;
    } else {
      Priority_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      puo_pri_pri_cd: Purchasing_Priority_PriorityCode,
      puo_pri_desc: Purchasing_Priority_Description,
      puo_pri_req_date_count: RequiredDateCount,
      puo_pri_disable_flag: Priority_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_purchasing_priority_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_Priority",
              state: { data: "Purchasing_Priority" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Purchasing Priority
  const get_purchasing_priority_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_purchasing_priority_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Purchasing_Priority",
              state: { data: "Purchasing_Priority" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //-------------------------------------------MasterFile Personnel-----------------------------------------------------------------------

  //Personnal Employee Status Select
  const get_personnel_employeestatus_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_personnel_employeestatus_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPersonnal_EmployeeStatus_StatusType(
              responseJson.data.data[index].emp_sts_typ_cd
            );
            setPersonnal_EmployeeStatus_Status(
              responseJson.data.data[index].emp_sts_status
            );
            setPersonnal_EmployeeStatus_Description(
              responseJson.data.data[index].emp_sts_desc
            );

            if (responseJson.data.data[index].emp_sts_disable_flag == 0) {
              setMaster_CustomerStatus_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].emp_sts_disable_flag
              );
            } else {
              setMaster_CustomerStatus_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].emp_sts_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Personnel Employee status
  const get_personnel_employeestatus_insert = (site_ID, emp_mst_login_id) => {
    let Personnal_disableFlag;
    if (Personnal_EmployeeStatus_DisableFlag_Checkbox) {
      Personnal_disableFlag = 1;
    } else {
      Personnal_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      emp_sts_typ_cd: Personnal_EmployeeStatus_StatusType,
      emp_sts_status: Personnal_EmployeeStatus_Status,
      emp_sts_desc: Personnal_EmployeeStatus_Description,
      emp_sts_disable_flag: Personnal_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_personnel_employeestatus_inserts(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Personnal_EmployeeStatus",
              state: { data: "Personnal_EmployeeStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update  Personnel Employee status
  const get_personnel_employeestatus_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Personnal_disableFlag;
    if (Personnal_EmployeeStatus_DisableFlag_Checkbox) {
      Personnal_disableFlag = 1;
    } else {
      Personnal_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      emp_sts_typ_cd: Personnal_EmployeeStatus_StatusType,
      emp_sts_status: Personnal_EmployeeStatus_Status,
      emp_sts_desc: Personnal_EmployeeStatus_Description,
      emp_sts_disable_flag: Personnal_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_personnel_employeestatus_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Personnal_EmployeeStatus",
              state: { data: "Personnal_EmployeeStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Personnel Employee Status
  const get_personnel_employeestatus_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_personnel_employeestatus_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Personnal_EmployeeStatus",
              state: { data: "Personnal_EmployeeStatus" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  //-------------------------------------------MasterFile Invoice-----------------------------------------------------------------------

  //Invoice Payment Method Select
  const get_invoice_paymentmethod_select = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_invoice_paymentmethod_select(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          for (var index in responseJson.data.data) {
            setPaymentMethod(responseJson.data.data[index].pay_med_cd);
            setInvoice_PaymentMethod_Description(
              responseJson.data.data[index].pay_med_desc
            );

            if (responseJson.data.data[index].pay_med_disable_flag == 0) {
              setInvoice_PaymentMethod_DisableFlag_checkbox(false);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].pay_med_disable_flag
              );
            } else {
              setInvoice_PaymentMethod_DisableFlag_checkbox(true);
              console.log(
                "Login JSON DATA : ",
                responseJson.data.data[index].pay_med_disable_flag
              );
            }
          }

          Swal.close();
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };
  //insert Invoice Payment Method
  const get_invoice_paymentmethod_insert = (site_ID, emp_mst_login_id) => {
    let Invoice_disableFlag;
    if (Invoice_PaymentMethod_DisableFlag_Checkbox) {
      Invoice_disableFlag = 1;
    } else {
      Invoice_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      pay_med_cd: PaymentMethod,
      pay_med_desc: Invoice_PaymentMethod_Description,
      pay_med_disable_flag: Invoice_disableFlag,
      audit_user: emp_mst_login_id,
    };
    console.log("Insert : " + JSON.stringify(json));

    APIServices.get_invoice_paymentmethod_insert(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Invoice_PaymentMethod",
              state: { data: "Invoice_PaymentMethod" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Update  Invoice Payment Method
  const get_invoice_paymentmethod_update = (
    site_ID,
    rowid,
    emp_mst_login_id
  ) => {
    let Invoice_disableFlag;
    if (Invoice_PaymentMethod_DisableFlag_Checkbox) {
      Invoice_disableFlag = 1;
    } else {
      Invoice_disableFlag = 0;
    }

    var json = {
      site_cd: site_ID,
      pay_med_cd: PaymentMethod,
      pay_med_desc: Invoice_PaymentMethod_Description,
      pay_med_disable_flag: Invoice_disableFlag,
      audit_user: emp_mst_login_id,
      RowID: rowid,
    };
    console.log("Update : " + JSON.stringify(json));

    APIServices.get_invoice_paymentmethod_update(JSON.stringify(json))
      .then((responseJson) => {
        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Invoice_PaymentMethod",
              state: { data: "Invoice_PaymentMethod" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_assetmaster_select...",
          text: e,
        });
      });
  };
  //Delete Invoice Payment Method
  const get_invoice_paymentmethod_delete = (site_ID, rowid) => {
    Swal.fire({ title: "Please Wait !", allowOutsideClick: false });
    Swal.showLoading();

    APIServices.get_invoice_paymentmethod_delete(site_ID, rowid)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: responseJson.data.status,
            text: responseJson.data.message,
          }).then(function () {
            history.push({
              pathname: "/Invoice_PaymentMethod",
              state: { data: "Invoice_PaymentMethod" },
            });
          });
        } else {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };



    //Master UOM Con Factor
    const get_fromUOM =(site_ID)=>{ 

      Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
      Swal.showLoading()

      APIServices.get_fromUOM(site_ID).then((responseJson)=>{

          console.log("Login JSON DATA : ",responseJson)

          if (responseJson.data.status === 'SUCCESS') {
              

              let FromUOM =responseJson.data.data.map(item => ({
                  label: item.uom_mst_uom,
                  value: item.uom_mst_desc            
                  }));
                  setFromUom(FromUOM);
                  setToUom(FromUOM);

                        

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
    //ProjectMasterCostCenter
    const get_ProjectMasterCostCenter =(site_ID)=>{ 

      Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
      Swal.showLoading()

      APIServices.get_ProjectMasterCostCenter(site_ID).then((responseJson)=>{

          console.log("Login JSON DATA : ",responseJson)

          if (responseJson.data.status === 'SUCCESS') {
              

              let Master_ProjectMaster_CostCenter =responseJson.data.data.map(item => ({
                  label: item.costcenter,
                  value: item.descs           
                  }));
                  setMaster_ProjectMaster_CostCenter(Master_ProjectMaster_CostCenter);
                  

                        

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
    //Labour Account
    const get_labourAccount =(site_ID)=>{ 

      Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
      Swal.showLoading()

      APIServices.get_labourAccount(site_ID).then((responseJson)=>{

          console.log("Login JSON DATA : ",responseJson)

          if (responseJson.data.status === 'SUCCESS') {
              

              let LaborAccount =responseJson.data.data.map(item => ({
                  label: item.account,
                  value: item.descs           
                  }));
                  setLaborAccount(LaborAccount);
                  

                        

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
    //Material Account
    const get_MaterialAccount =(site_ID)=>{ 

      Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
      Swal.showLoading()

      APIServices.get_MaterialAccount(site_ID).then((responseJson)=>{

          console.log("Login JSON DATA : ",responseJson)

          if (responseJson.data.status === 'SUCCESS') {
              

              let MaterialAccount =responseJson.data.data.map(item => ({
                  label: item.account,
                  value: item.descs           
                  }));
                  setMaterialAccount(MaterialAccount);
                  

                        

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
    //Contract Account
    const get_ContractAccount =(site_ID)=>{ 

      Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
      Swal.showLoading()

      APIServices.get_ContractAccount(site_ID).then((responseJson)=>{

          console.log("Login JSON DATA : ",responseJson)

          if (responseJson.data.status === 'SUCCESS') {
              

              let ContractAccount =responseJson.data.data.map(item => ({
                  label: item.account,
                  value: item.descs           
                  }));
                  setContractAccount(ContractAccount);
                

                        

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
    //Foreman EmployeeID
    const get_ForemanEmployeeID =(site_ID)=>{ 

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_ForemanEmployeeID(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               

                let ForemanEmployeeID =responseJson.data.data.map(item => ({
                    label: item.emp_mst_empl_id,
                    value: item.emp_mst_name           
                    }));
                    setForemanEmployeeID(ForemanEmployeeID);
                  

                          

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
     //Capacity UOM
     const get_CapacityUOM =(site_ID)=>{ 

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_CapacityUOM(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               

                let CapacityUOM =responseJson.data.data.map(item => ({
                    label: item.uom_mst_uom,
                    value: item.uom_mst_desc           
                    }));
                    setCapacityUOM(CapacityUOM);
                  

                          

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
     //Supplier
     const get_supplier =(site_ID)=>{ 

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_supplier(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               

                let Supplier =responseJson.data.data.map(item => ({
                    label: item.sup_mst_supplier_cd,
                    value: item.sup_mst_desc           
                    }));
                    setSupplier(Supplier);
                  

                          

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
     //Cost Center
     const get_CostCenter =(site_ID)=>{ 

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_CostCenter(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               

                let CostCenter =responseJson.data.data.map(item => ({
                    label: item.costcenter,
                    value: item.descs           
                    }));
                    setCostCenter(CostCenter);
                  

                          

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
     //Account
     const get_Account =(site_ID)=>{ 

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_Account(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               

                let Account =responseJson.data.data.map(item => ({
                    label: item.account,
                    value: item.descs           
                    }));
                    setAccount(Account);
                  

                          

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
    //Asset Location
    const get_AssetLocation =(site_ID)=>{ 

        Swal.fire({  title: 'Please Wait !',allowOutsideClick: false})
        Swal.showLoading()

        APIServices.get_AssetLocation(site_ID).then((responseJson)=>{

            console.log("Login JSON DATA : ",responseJson)

            if (responseJson.data.status === 'SUCCESS') {
               

                let PMGroupMaster_AssetLocation =responseJson.data.data.map(item => ({
                    label: item.ast_loc_ast_loc,
                    value: item.ast_loc_desc           
                    }));
                    setPMGroupMaster_AssetLocation(PMGroupMaster_AssetLocation);
                  

                          

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

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">{title}</h3>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <div className="template-demo">
              <button
                type="button"
                className="btn btn-success btn-icon-text"
                onClick={onClickChange}
              >
                <i className="mdi mdi-file-check btn-icon-prepend"></i>{" "}
                {ButtonName}
              </button>

              {show && (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-icon-text"
                  onClick={Delete_onClickChange}
                >
                  <i className="mdi mdi-delete-forever btn-icon-prepend"></i>{" "}
                  Delete
                </button>
              )}
            </div>
          </ol>
        </nav>
      </div>

      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            {show_Master_UserGroup && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span style={{color: "red"}} class="required-asterisk">* </span>User Group:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_User_Group_UserGroup}
                            onChange={(e) =>
                              setMaster_User_Group_UserGroup(e.target.value)
                            }
                            readOnly={Master_User_Group_UserGroup_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                        <span style={{color: "red"}} class="required-asterisk">* </span>Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_User_Group_Description}
                            onChange={(e) =>
                              setMaster_User_Group_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_User_Group_Disable_Checkbox}
                              onChange={CheckBox_Master_User_Group}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_AutoNumber && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Module Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ModuleCode}
                            onChange={(e) => setModuleCode(e.target.value)}
                            readOnly={ModuleCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_AutoNumber_Description}
                            onChange={(e) =>
                              setMaster_AutoNumber_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group
                        className="row"
                        controlId="validation_AutoNumber"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Auto Number:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={AutoNumbering}
                            value={selected_AutoNumbering}
                            onChange={setSelected_AutoNumbering} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Prefix:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Counter:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_AutoNumber_Counter}
                            onChange={(e) =>
                              setMaster_AutoNumber_Counter(e.target.value)
                            }
                            readOnly={Master_AutoNumber_Counter}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Option:
                        </label>
                        <div className="col-md-9">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="ExampleRadio4"
                                id="membershipRadios1"
                                defaultChecked
                              />{" "}
                              Master Counter (Auto Asset No by Master Perfix and
                              Counter)
                              <i className="input-helper"></i>
                            </label>
                          </div>

                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="ExampleRadio4"
                                id="membershipRadios1"
                                defaultChecked
                              />{" "}
                              Asset Group Counter (Auto Asset No by Asset Group
                              Code and Counter)
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_CraftCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                        <span style={{color: "red"}} class="required-asterisk">* </span>Craft Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={CraftCode}
                            onChange={(e) => setCraftCode(e.target.value)}
                            readOnly={CraftCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                        <span style={{color: "red"}} class="required-asterisk">* </span>Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_CraftCode_Description}
                            onChange={(e) =>
                              setMaster_CraftCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Estimate Rate:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={EstimateRate}
                            onChange={(e) => setEstimateRate(e.target.value)}
                            readOnly={EstimateRate_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Change Date:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="datetime-local"
                            value={ChangeDate}
                            onChange={(e) => setChangeDate(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_CraftCode_DisableFlag_Checkbox}
                              onChange={CheckBox_Master_CraftCode}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_statusCategory && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Category Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_statusCategoryCategoryCode}
                            onChange={(e) =>
                              setMaster_statusCategoryCategoryCode(
                                e.target.value
                              )
                            }
                            readOnly={
                              Master_statusCategoryCategoryCode_readOnly
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_statusCategory_Description}
                            onChange={(e) =>
                              setMaster_statusCategory_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_StatusType && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Category Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_StatusType_CategoryCode}
                            onChange={(e) =>
                              setMaster_StatusType_CategoryCode(e.target.value)
                            }
                            readOnly={Master_StatusType_CategoryCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Type Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_StatusType_TypeCode}
                            onChange={(e) =>
                              setMaster_StatusType_TypeCode(e.target.value)
                            }
                            readOnly={Master_StatusType_TypeCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_StatusType_Description}
                            onChange={(e) =>
                              setMaster_StatusType_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_CostCenter && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Cost Center:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_CostCenter_CostCenter}
                            onChange={(e) =>
                              setMaster_CostCenter_CostCenter(e.target.value)
                            }
                            readOnly={Master_CostCenter_CostCenter_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_CostCenter_Description}
                            onChange={(e) =>
                              setMaster_CostCenter_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_CostCenter_Disable_Checkbox}
                              onChange={CheckBox_Master_CostCenter}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_Account && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Account:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_Account_Account}
                            onChange={(e) =>
                              setMaster_Account_Account(e.target.value)
                            }
                            readOnly={Master_Account_Account_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_Account_Description}
                            onChange={(e) =>
                              setMaster_Account_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_Account_Disable_Checkbox}
                              onChange={CheckBox_Master_Account}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_CurrencyCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Currency Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={CurrencyCode}
                            onChange={(e) => setCurrencyCode(e.target.value)}
                            readOnly={CurrencyCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Currency Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={CurrencyDescription}
                            onChange={(e) =>
                              setCurrencyDescription(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Currency label:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={CurrencyLabel}
                            onChange={(e) => setCurrencyLabel(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Exchange Rate:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ExchangeRate}
                            onChange={(e) => setExchangeRate(e.target.value)}
                            readOnly={ExchangeRate_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Exchange Rate Date:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="datetime-local"
                            value={ExchangeRateDate}
                            onChange={(e) =>
                              setExchangeRateDate(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Format String:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={FormatString}
                            onChange={(e) => setFormatString(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Base Currency:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={BaseCurrency_Checkbox}
                              onChange={CheckBox_BaseCurrency}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_TaxCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group
                        className="row"
                        controlId="validation_TypeOfTax"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Type Of Tax:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={TypeOfTax}
                            value={selected_TypeOfTax}
                            onChange={setSelected_TypeOfTax} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Tax Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={TaxCode}
                            onChange={(e) => setTaxCode(e.target.value)}
                            readOnly={TaxCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_TaxCode_Description}
                            onChange={(e) =>
                              setMaster_TaxCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Tax Rate:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={TaxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                            readOnly={TaxRate_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_TaxCode_DisableFlag_Checkbox}
                              onChange={CheckBox_TaxCode}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_UOMType && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Type Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_UOM_TypeCode}
                            onChange={(e) =>
                              setMaster_UOM_TypeCode(e.target.value)
                            }
                            readOnly={Master_UOM_TypeCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_UOMType_Description}
                            onChange={(e) =>
                              setMaster_UOMType_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_UOMType_DisableFlag_Checkbox}
                              onChange={CheckBox_Master_UOMType}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_UOMMaster && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Type Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_UOMMaster_TypeCode}
                            onChange={(e) =>
                              setMaster_UOMMaster_TypeCode(e.target.value)
                            }
                            readOnly={Master_UOMMaster_TypeCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          UOM Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={UomCode}
                            onChange={(e) => setUomCode(e.target.value)}
                            readOnly={UomCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_UOMMaster_Description}
                            onChange={(e) =>
                              setMaster_UOMMaster_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_UOMMaster_DisableFlag_Checkbox}
                              onChange={CheckBox_Master_UOMMaster}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_UOMConFactor && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group
                        className="row"
                        controlId="validation_AssetStatus"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          From UOM:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={FromUom}
                            value={selected_FromUom}
                            onChange={setselected_FromUom} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group
                        className="row"
                        controlId="validation_AssetStatus"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          To UOM:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={ToUom}
                            value={selected_ToUom}
                            onChange={setselected_ToUom} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Conversion Factor:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={ConversionFactor}
                            onChange={(e) =>
                              setConversionFactor(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_BillTo && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Bill To:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={BillTo}
                            onChange={(e) => setBillTo(e.target.value)}
                            readOnly={BillTo_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Contact:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Contact}
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Phone:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Address 1:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Address1}
                            onChange={(e) => setAddress1(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Address 2:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Address2}
                            onChange={(e) => setAddress2(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">City:</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={City}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          State:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={State}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Postal Code:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={PostalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Province:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Province}
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Country:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Note:</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_BillTo_DisableFlag_Checkbox}
                              onChange={CheckBox_Master_BillTo}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_ShipTo && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Ship To:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ShipTo}
                            onChange={(e) => setShipTo(e.target.value)}
                            readOnly={ShipTo_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Contact:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Master_ShipTo_Contact}
                            onChange={(e) =>
                              setMaster_ShipTo_Contact(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Phone:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Master_ShipTo_Phone}
                            onChange={(e) =>
                              setMaster_ShipTo_Phone(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Address 1:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_ShipTo_Address1}
                            onChange={(e) =>
                              setMaster_ShipTo_Address1(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Address 2:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_ShipTo_Address2}
                            onChange={(e) =>
                              setMaster_ShipTo_Address2(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">City:</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Master_ShipTo_City}
                            onChange={(e) =>
                              setMaster_ShipTo_City(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          State:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Master_ShipTo_State}
                            onChange={(e) =>
                              setMaster_ShipTo_State(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Postal Code:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Master_ShipTo_PostalCode}
                            onChange={(e) =>
                              setMaster_ShipTo_PostalCode(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Province:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Master_ShipTo_Province}
                            onChange={(e) =>
                              setMaster_ShipTo_Province(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Country:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Master_ShipTo_Country}
                            onChange={(e) =>
                              setMaster_ShipTo_Country(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Note:</label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_ShipTo_Note}
                            onChange={(e) =>
                              setMaster_ShipTo_Note(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Master_ShipTo_DisableFlag_Checkbox}
                              onChange={CheckBox_Master_ShipTo}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_SupplierStatus && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Type Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_SupplierStatus_TypeCode}
                            onChange={(e) =>
                              setMaster_SupplierStatus_TypeCode(e.target.value)
                            }
                            readOnly={Master_SupplierStatus_TypeCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_SupplierStatus_Status}
                            onChange={(e) =>
                              setMaster_SupplierStatus_Status(e.target.value)
                            }
                            readOnly={Master_SupplierStatus_Status_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_SupplierStatus_Description}
                            onChange={(e) =>
                              setMaster_SupplierStatus_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Master_SupplierStatus_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_Master_SupplierStatus}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_ProjectMaster && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Project Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ProjectCode}
                            onChange={(e) => setProjectCode(e.target.value)}
                            readOnly={ProjectCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_ProjectMaster_Description}
                            onChange={(e) =>
                              setMaster_ProjectMaster_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Project Date:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="datetime-local"
                            value={ProjectDate}
                            onChange={(e) => setProjectDate(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Due Date:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            type="datetime-local"
                            value={DueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Project Budget:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ProjectBudget}
                            onChange={(e) => setProjectBudget(e.target.value)}
                            readOnly={ProjectBudget_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group
                        className="row"
                        controlId="validation_AssetStatus"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Cost Center:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={Master_ProjectMaster_CostCenter}
                            value={selected_Master_ProjectMaster_CostCenter}
                            onChange={
                              setselected_Master_ProjectMaster_CostCenter
                            } // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group
                        className="row"
                        controlId="validation_AssetStatus"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Labor Account:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={LaborAccount}
                            value={selected_LaborAccount}
                            onChange={setselected_LaborAccount} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group
                        className="row"
                        controlId="validation_AssetStatus"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Material Account:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={MaterialAccount}
                            value={selected_MaterialAccount}
                            onChange={setselected_MaterialAccount} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group
                        className="row"
                        controlId="validation_AssetStatus"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Contract Account:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={ContractAccount}
                            value={selected_ContractAccount}
                            onChange={setselected_ContractAccount} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Approved:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Approved_Checkbox}
                              onChange={CheckBox_Master_Approved}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Master_ProjectMaster_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_Master_ProjectMaster}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Master_CustomerStatus && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Type Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_CustomerStatus_TypeCode}
                            onChange={(e) =>
                              setMaster_CustomerStatus_TypeCode(e.target.value)
                            }
                            readOnly={Master_CustomerStatus_TypeCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Master_CustomerStatus_Status}
                            onChange={(e) =>
                              setMaster_CustomerStatus_Status(e.target.value)
                            }
                            readOnly={Master_CustomerStatus_Status_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Master_CustomerStatus_Description}
                            onChange={(e) =>
                              setMaster_CustomerStatus_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Master_CustomerStatus_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_Master_CustomerStatus}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_AssetType &&  <form className="form-sample" >                   
                            <div className="row">
                                <div className="col-md-10">  

                                    <div className="col-md-7">                                
                                        <Form.Group className="row" >
                                            <Form.Label className="col-sm-3 col-form-label">Type Code:</Form.Label>
                                            <div className="col-sm-9">
                                            <Form.Control as="textarea" value={Type_Code} onChange={(e) => setType_Code(e.target.value)} readOnly={Type_Code_readOnly}/>
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-7">
                                        <Form.Group className="row" >
                                            <label className="col-sm-3 col-form-label">Description:</label>
                                            <div className="col-sm-9">
                                                <Form.Control as="textarea" rows={5}  value={Description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                        </Form.Group>

                                        
                                        <div className="col-md-14">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Disable Flag:</label>
                                        <div className="form-check ">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Check_box}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" ></i>
                                            </label>
                                    </div> 
                                    </Form.Group>                                         
                                </div>
                                        
                                    </div>

                                    

                                </div>                       
                            </div> 
                            
                                        
            </form>}               

                    {show_AssetGroupCode &&<form className="form-sample" >                   
                        <div className="row">
                            <div className="col-md-10">  
                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Asset Group:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={AssetGroupCode} onChange={(e) => setAssetGroupCode(e.target.value)} readOnly={AssetGroupCode_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={AssetGroupCode_Description} onChange={(e) => setAssetGroupCod_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Report Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={AssetGroupCode_Report_Description} onChange={(e) => setAssetGroupCode_Report__Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Counter:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={Counter} onChange={(e) => setCounter(e.target.value)} readOnly={Type_Code_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Seperator:</Form.Label>
                                        <div className="col-sm-9">
                                        <Select options={Seperator12} onChange={(e)=> handleChange(e)} required error={true}/>
                                      
                                       </div>
                                    </Form.Group>
                                </div>


                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Sample Format:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={Sample_Format} onChange={(e) => setSample_Format(e.target.value)} readOnly={Type_Code_readOnly}/>
                                        
                                        </div>
                                    </Form.Group>
                                </div>




                                <div className="col-md-6">                        

                                        


                                        <div className="form-check ">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Auto_no_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" >Auto Number</i>
                                            </label>
                                        </div> 

                                        <div className="form-check ">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Generate_serialize_stock_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" >Generate Serialize Stock</i>
                                            </label>
                                        </div>       

                                        <div className="form-check ">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={Disable_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" >Disable</i>
                                            </label>
                                        </div>                                     
                                </div>


                            </div>                       
                        </div>                    
                                    
                    </form>}

                    {show_AssetCode &&<form className="form-sample" >                   
                        <div className="row">
                            <div className="col-md-10">  

                                <div className="col-md-7">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Asset Code:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={AssetCode} onChange={(e) => setAssetCode(e.target.value)} readOnly={AssetCode_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-7">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={AssetCode_Description} onChange={(e) => setAssetCode_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Disable:</label>
                                        <div className="form-check ">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={AssetCode_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" ></i>
                                            </label>
                                    </div> 
                                    </Form.Group>                                         
                                </div>
                               


                            </div>                       
                        </div>                    
                                    
                    </form>}

                    {show_AssetCriticalFactor &&<form className="form-sample" >                   
                        <div className="row">
                            <div className="col-md-10">  

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Cirtical Factor:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={CriticalFactor} onChange={(e) => setCriticalFactor(e.target.value)} readOnly={CriticalFactor_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={CriticalFactor_Description} onChange={(e) => setCriticalFactor_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-9">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Disable Flag:</label>
                                        <div className="form-check ">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={CriticalFactor_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" ></i>
                                            </label>
                                    </div> 
                                    </Form.Group>                                         
                                </div>
                               


                            </div>                       
                        </div>                    
                                    
                    </form>}

                    {show_AssetStatus &&<form className="form-sample" >                   
                        <div className="row">
                            <div className="col-md-10">  

                                <div className="col-md-9">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Status type:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={AssetType} onChange={(e) => setAssetType(e.target.value)} readOnly={AssetType_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-9">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Status:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={AssetStatus} onChange={(e) => setAssetStatus(e.target.value)} readOnly={AssetStatus_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-9">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={AssetStatus_Description} onChange={(e) => setAssetStatus_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-9">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Count Down Time:</label>
                                        <div className="form-check mx-sm-2">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={CountDownTime_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" ></i>
                                            </label>
                                        </div>
                                    </Form.Group>                                         
                                </div>

                                <div className="col-md-9">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Disable:</label>
                                        <div className="form-check mx-sm-2">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={AS_Disable_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" ></i>
                                            </label>
                                        </div>
                                    </Form.Group>                                         
                                </div>

                               


                            </div>                       
                        </div>                    
                                    
                    </form>}

                    {show_AssetWorkArea &&<form className="form-sample" >                   
                        <div className="row">
                            <div className="col-md-10">  

                                <div className="col-md-6">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Work Area:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={AssetWorkArea} onChange={(e) => setAssetWorkArea(e.target.value)} readOnly={AssetWorkArea_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={AssetWorkArea_Description} onChange={(e) => setAssetWorkArea_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">                                         

                                        <div className="form-check ">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={AssetWorkArea_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" >Disable </i>
                                            </label>
                                        </div>                                     
                                </div>


                            </div>                       
                        </div>                    
                                    
                    </form>}

                    {show_AssetLocation &&<form className="form-sample" > 

                        <div className="row">
                            <div className="col-md-10">  

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Asset Location:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={AssetLocation} onChange={(e) => setAssetLocation(e.target.value)} readOnly={AssetLocation_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={AssetLocation_Description} onChange={(e) => setAssetLocation_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Disable:</label>
                                        <div className="form-check mx-sm-2">
                                            <label className="form-check-label ">
                                                <input type="checkbox" 
                                                className="form-check-input"
                                                checked={AssetLocation_Checkbox}
                                                onChange={CheckBox_handleOnChange}/>
                                                <i className="input-helper" ></i>
                                            </label>
                                        </div>
                                    </Form.Group>                                         
                                </div>

                               


                            </div>                       
                        </div>                    
                                    
                    </form>}

                    {show_AssetLevel &&<form className="form-sample" >                   
                        <div className="row">
                            <div className="col-md-10">  

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Asset Level:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={AssetLevel} onChange={(e) => setAssetLevel(e.target.value)} readOnly={AssetLevel_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={AssetLevel_Description} onChange={(e) => setAssetLevel_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Disable:</label>
                                        <div className="col-md-8 mx-sm-2">
                                            <div className="form-check ">
                                                <label className="form-check-label ">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AssetLevel_Checkbox}
                                                    onChange={CheckBox_handleOnChange}/>
                                                    <i className="input-helper" ></i>
                                                </label>
                                            </div> 
                                        </div>
                                    </Form.Group>                                    
                                                                           
                                </div>

                               


                            </div>                       
                        </div>                    
                                    
                    </form>}  

                    {show_Workstatus &&  <form className="form-sample" >                   
                        <div className="row">
                            <div className="col-md-10"> 

                            <div className="col-md-8">
                                    <Form.Group className="row" controlId="validation_AssetStatus">
                                        <label className="col-sm-3 col-form-label"><span style={{color: "red"}} class="required-asterisk">* </span>Status type:</label>
                                        <div className="col-sm-9">
                                            <Select  
                                            
                                                isClearable={true}  
                                                options={Statustype}
                                                value={selected_Statustype}
                                                onChange={setselected_Statustype} // using id as it is unique
                                                required
                                            />                                   
                                        </div>
                                    </Form.Group>                        
                                </div>

                         

                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Status:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={Status} onChange={(e) => setStatus(e.target.value)} readOnly={Status_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Description:</label>
                                        <div className="col-sm-9">
                                            <Form.Control as="textarea" rows={5}  value={WorkStatus_Description} onChange={(e) => setWorkStatus_Description(e.target.value)} />
                                        </div>
                                    </Form.Group>                                    
                                </div>

                                <div className="col-md-8">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Email Status</label>
                                        <div className="col-md-8 mx-sm-2">
                                            <div className="form-check ">
                                                <label className="form-check-label ">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={EmailStatus_Checkbox}
                                                    onChange={CheckBox_EmailStatus}/>
                                                    <i className="input-helper" ></i>
                                                </label>
                                            </div> 
                                        </div>
                                    </Form.Group>                                    
                                                                           
                                </div>


                                <div className="col-md-8">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Auto Send Email</label>
                                        <div className="col-md-8 mx-sm-2">
                                            <div className="form-check ">
                                                <label className="form-check-label ">
                                                    <input type="checkbox" 
                                                    className="form-check-input"
                                                    checked={AutoSendEmail_Checkbox}
                                                    onChange={CheckBox_AutoSendEmail}/>
                                                    <i className="input-helper" ></i>
                                                </label>
                                            </div> 
                                        </div>
                                    </Form.Group>                                         
                                </div>

                                

                               


                                <div className="col-md-8">                                
                                    <Form.Group className="row" >
                                        <Form.Label className="col-sm-3 col-form-label">Email Template:</Form.Label>
                                        <div className="col-sm-9">
                                        <Form.Control as="textarea" value={EmailTemplate} onChange={(e) => setEmailTemplate(e.target.value)} readOnly={EmailTemplate_readOnly}/>
                                        </div>
                                    </Form.Group>
                                </div> 

                                <div className="col-md-8">
                                    <Form.Group className="row" >
                                        <label className="col-sm-3 col-form-label">Disable:</label>
                                        <div className="col-md-8 mx-sm-2">
                                    <div className="form-check ">
                                        <label className="form-check-label ">
                                            <input type="checkbox" 
                                            className="form-check-input"
                                            checked={WorkStatus_Disable_Checkbox}
                                            onChange={CheckBox_WorkStatus}/>
                                            <i className="input-helper" ></i>
                                        </label>
                                    </div> 
                                </div>
                                    </Form.Group>                                    
                                                                           
                            </div>
                                
                                

                            </div>                       
                        </div> 
                        
                                        
                    </form>}

            {show_WorkPriority && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Priority Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={PriorityCode}
                            onChange={(e) => setPriorityCode(e.target.value)}
                            readOnly={PriorityCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkPriority_Description}
                            onChange={(e) =>
                              setWorkPriority_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Due Date Count:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={DueDateCount}
                            onChange={(e) => setDueDateCount(e.target.value)}
                            readOnly={Type_Code_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="col-md-8 mx-sm-2">
                          <div className="form-check ">
                            <label className="form-check-label ">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={WorkPriority_DisableFlag_Checkbox}
                                onChange={CheckBox_handleOnChange}
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_WorkGroup && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-13">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Group Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={GroupCode}
                            onChange={(e) => setGroupCode(e.target.value)}
                            readOnly={Type_Code_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-13">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkGroup_Description}
                            onChange={(e) =>
                              setWorkGroup_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-13">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Foreman Employee ID:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ForemanEmployeeID}
                            onChange={(e) =>
                              setForemanEmployeeID(e.target.value)
                            }
                            readOnly={Type_Code_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-13">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check mx-sm-2">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={WorkGroup_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_WorkClass && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Class Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ClassCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            readOnly={ClassCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkClass_Description}
                            onChange={(e) =>
                              setWorkClass_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={WorkClass_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_WorkType && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Type Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={TypeCode}
                            onChange={(e) => setTypeCode(e.target.value)}
                            readOnly={TypeCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkType_Description}
                            onChange={(e) =>
                              setWorkType_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={WorkType_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_WorkFaultCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Fault Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={FaultCode}
                            onChange={(e) => setFaultCode(e.target.value)}
                            readOnly={FaultCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkFaultCode_Description}
                            onChange={(e) =>
                              setWorkFaultCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={WorkFaultCode_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_WorkCauseCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Cause Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={CauseCode}
                            onChange={(e) => setCauseCode(e.target.value)}
                            readOnly={CauseCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Type:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={WorkCauseCode_Type}
                            onChange={(e) =>
                              setWorkCauseCode_Type(e.target.value)
                            }
                            readOnly={Type_Code_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkCauseCode_Description}
                            onChange={(e) =>
                              setWorkCauseCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={WorkCauseCode_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_WorkActionCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Action Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={ActionCode}
                            onChange={(e) => setActionCode(e.target.value)}
                            readOnly={ActionCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkActionCode_Description}
                            onChange={(e) =>
                              setWorkActionCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={WorkActionCode_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_WorkDelayCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Delay Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={DelayCode}
                            onChange={(e) => setDelayCode(e.target.value)}
                            readOnly={DelayCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={WorkDelayCode_Description}
                            onChange={(e) =>
                              setWorkDelayCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={WorkDelayCode_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Material_LocationCategory && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Location Category:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={LocationCategory}
                            onChange={(e) =>
                              setLocationCategory(e.target.value)
                            }
                            readOnly={LocationCategory_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={LocationCategory_Description}
                            onChange={(e) =>
                              setLocationCategory_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={LocationCategory_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Material_Location && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Stock Location:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={StockLocation}
                            onChange={(e) => setStockLocation(e.target.value)}
                            readOnly={StockLocation_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Master Location:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={MasterLocation}
                            onChange={(e) => setMasterLocation(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Area Code:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={AreaCode}
                            onChange={(e) => setAreaCode(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Bin ID:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={BinID}
                            onChange={(e) => setBinID(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Seperator:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={MaterialLocation_Seperator}
                            onChange={(e) =>
                              setMaterialLocation_Seperator(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Storage Type:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={StorageType}
                            onChange={(e) => setStorageType(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={MaterialLocation_Description}
                            onChange={(e) =>
                              setMaterialLocation_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Capacity:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Capacity UOM:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={CapacityUOM}
                            onChange={(e) => setCapacityUOM(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Supplier:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Cost Center:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={CostCenter}
                            onChange={(e) => setCostCenter(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Account:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Account}
                            onChange={(e) => setAccount(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Update Stock Costing:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={UpdateStockCosting_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          On Hold:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={OnHold_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={MaterialLocation_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Material_Status && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status Type:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={StatusType}
                            onChange={(e) => setStatusType(e.target.value)}
                            readOnly={StatusType_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Status:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={Material_Status}
                            onChange={(e) => setMaterial_Status(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={MaterialStatus_Description}
                            onChange={(e) =>
                              setMaterialStatus_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={MaterialStatus_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Material_CommodityCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-9">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Commodity Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={CommodityCode}
                            onChange={(e) => setCommodityCode(e.target.value)}
                            readOnly={CommodityCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={MaterialCommodityCode_Description}
                            onChange={(e) =>
                              setMaterialCommodityCode_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                MaterialCommodityCode_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Material_GroupCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Stock Group Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={StockGroupCode}
                            onChange={(e) => setStockGroupCode(e.target.value)}
                            readOnly={StockGroupCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={MaterialGroupCode_Description}
                            onChange={(e) =>
                              setMaterialGroupCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={MaterialGroupCode_DisableFlag_Checkbox}
                              onChange={CheckBox_handleOnChange}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_PM_FrequencyCode && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Frequency Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={FrequencyCode}
                            onChange={(e) => setFrequencyCode(e.target.value)}
                            readOnly={FrequencyCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={PM_FrequencyCode_Description}
                            onChange={(e) =>
                              setPM_FrequencyCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Frequency Type:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={FrequencyType}
                            onChange={(e) => setFrequencyType(e.target.value)}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Band:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Band}
                            onChange={(e) => setBand(e.target.value)}
                            readOnly={Band_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Lead %:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Lead}
                            onChange={(e) => setLead(e.target.value)}
                            readOnly={Lead_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={PM_FrequencyCode_DisableFlag_Checkbox}
                              onChange={CheckBox_PM_FrequencyCode}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_PM_GroupMaster && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          PM Group Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={PMGroupCode}
                            onChange={(e) => setPMGroupCode(e.target.value)}
                            readOnly={PMGroupCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={PMGroupMaster_Description}
                            onChange={(e) =>
                              setPMGroupMaster_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group
                        className="row"
                        controlId="validation_AssetStatus"
                      >
                        <label className="col-sm-3 col-form-label">
                          <span
                            style={{ color: "red" }}
                            class="required-asterisk"
                          >
                            *{" "}
                          </span>
                          Asset Location:
                        </label>
                        <div className="col-sm-9">
                          <Select
                            isClearable={true}
                            options={PMGroupMaster_AssetLocation}
                            value={selected_PMGroupMaster_AssetLocation}
                            onChange={setselected_PMGroupMaster_AssetLocation} // using id as it is unique
                            required
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={PMGroupMaster_DisableFlag_Checkbox}
                              onChange={CheckBox_PM_GroupMaster}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_PM_TaskGroup && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Task Group Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={TaskGroupCode}
                            onChange={(e) => setTaskGroupCode(e.target.value)}
                            readOnly={TaskGroupCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={TaskGroupCode_Description}
                            onChange={(e) =>
                              setTaskGroupCode_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={TaskGroupCode_DisableFlag_Checkbox}
                              onChange={CheckBox_TaskGroupCode}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Purchasing_PRStatus && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status Type:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_PRStatus_StatusType}
                            onChange={(e) =>
                              setPurchasing_PRStatus_StatusType(e.target.value)
                            }
                            readOnly={Purchasing_PRStatus_StatusType_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_PRStatus_Status}
                            onChange={(e) =>
                              setPurchasing_PRStatus_Status(e.target.value)
                            }
                            readOnly={Purchasing_PRStatus_Status_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Purchasing_PRStatus_Description}
                            onChange={(e) =>
                              setPurchasing_PRStatus_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Email Status:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Purchasing_PRStatus_EmailStatus_Checkbox}
                              onChange={CheckBox_Purchasing_PRStatus}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Purchasing_PRStatus_Disable_Checkbox}
                              onChange={CheckBox_Disable}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Purchasing_POStatus && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status Type:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_POStatus_StatusType}
                            onChange={(e) =>
                              setPurchasing_POStatus_StatusType(e.target.value)
                            }
                            readOnly={Purchasing_POStatus_StatusType_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_POStatus_Status}
                            onChange={(e) =>
                              setPurchasing_POStatus_Status(e.target.value)
                            }
                            readOnly={Purchasing_POStatus_Status_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Purchasing_POStatus_Description}
                            onChange={(e) =>
                              setPurchasing_POStatus_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Email Status:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Purchasing_POStatus_EmailStatus_Checkbox}
                              onChange={CheckBox_POStatus_EmailStatus}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Purchasing_POStatus_Disable_Checkbox}
                              onChange={CheckBox_Purchasing_POStatus}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Purchasing_ConstractStatus && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status Type:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_ConstractStatus_StatusType}
                            onChange={(e) =>
                              setPurchasing_ConstractStatus_StatusType(
                                e.target.value
                              )
                            }
                            readOnly={
                              Purchasing_ConstractStatus_StatusType_readOnly
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_ConstractStatus_Status}
                            onChange={(e) =>
                              setPurchasing_ConstractStatus_Status(
                                e.target.value
                              )
                            }
                            readOnly={
                              Purchasing_ConstractStatus_Status_readOnly
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Purchasing_ConstractStatus_Description}
                            onChange={(e) =>
                              setPurchasing_ConstractStatus_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Email Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Purchasing_ConstractStatus_EmailFlag_Checkbox
                              }
                              onChange={CheckBox_ConstractStatus_EmailFlag}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Purchasing_ConstractStatus_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_Purchasing_ConstractStatus}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Purchasing_ConstractGroup && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Group Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_ConstractGroup_GroupCode}
                            onChange={(e) =>
                              setPurchasing_ConstractGroup_GroupCode(
                                e.target.value
                              )
                            }
                            readOnly={
                              Purchasing_ConstractGroup_GroupCode_readOnly
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Purchasing_ConstractGroup_Description}
                            onChange={(e) =>
                              setPurchasing_ConstractGroup_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Purchasing_ConstractGroup_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_Purchasing_ConstractGroup}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Purchasing_Type && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-8">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Group Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_Type_GroupCode}
                            onChange={(e) =>
                              setPurchasing_Type_GroupCode(e.target.value)
                            }
                            readOnly={Purchasing_Type_GroupCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-8">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Purchasing_Type_Description}
                            onChange={(e) =>
                              setPurchasing_Type_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-9">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Purchasing_Type_DisableFlag_Checkbox}
                              onChange={CheckBox_Purchasing_Type}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Purchasing_Priority && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Priority Code:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Purchasing_Priority_PriorityCode}
                            onChange={(e) =>
                              setPurchasing_Priority_PriorityCode(
                                e.target.value
                              )
                            }
                            readOnly={Purchasing_Priority_PriorityCode_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Purchasing_Priority_Description}
                            onChange={(e) =>
                              setPurchasing_Priority_Description(e.target.value)
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Required Date Count:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={RequiredDateCount}
                            onChange={(e) =>
                              setRequiredDateCount(e.target.value)
                            }
                            readOnly={RequiredDateCount_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={Purchasing_Priority_DisableFlag_Checkbox}
                              onChange={CheckBox_Purchasing_Priority}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Personnal_EmployeeStatus && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status Type:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Personnal_EmployeeStatus_StatusType}
                            onChange={(e) =>
                              setPersonnal_EmployeeStatus_StatusType(
                                e.target.value
                              )
                            }
                            readOnly={
                              Personnal_EmployeeStatus_StatusType_readOnly
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Status:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={Personnal_EmployeeStatus_Status}
                            onChange={(e) =>
                              setPersonnal_EmployeeStatus_Status(e.target.value)
                            }
                            readOnly={Personnal_EmployeeStatus_Status_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Personnal_EmployeeStatus_Description}
                            onChange={(e) =>
                              setPersonnal_EmployeeStatus_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Personnal_EmployeeStatus_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_Personnal_EmployeeStatus}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {show_Invoice_PaymentMethod && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-10">
                    <div className="col-md-10">
                      <Form.Group className="row">
                        <Form.Label className="col-sm-3 col-form-label">
                          Payment Method:
                        </Form.Label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            value={PaymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            readOnly={PaymentMethod_readOnly}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-10">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Description:
                        </label>
                        <div className="col-sm-9">
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={Invoice_PaymentMethod_Description}
                            onChange={(e) =>
                              setInvoice_PaymentMethod_Description(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-md-11">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">
                          Disable Flag:
                        </label>
                        <div className="form-check ">
                          <label className="form-check-label ">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={
                                Invoice_PaymentMethod_DisableFlag_Checkbox
                              }
                              onChange={CheckBox_Invoice_PaymentMethod}
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterFileSelect;
