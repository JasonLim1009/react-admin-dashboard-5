import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Login = lazy(() => import('./user-pages/Login'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const AssetRegister = lazy(() => import('./Asset/AssetRegister'));
const AssetFrom = lazy(() => import('./Asset/AssetFrom'));

const Personnal_Employee = lazy(() => import('./Personnel/Employee'));
const PersonnelFrom = lazy(() => import('./Personnel/PersonnelFrom'));

const WorkRequest = lazy(() => import('./Maintenance/WorkRequest'));
const WorkRequestForm = lazy(() => import('./Maintenance/WorkRequestForm'));

const Work_Order = lazy(() => import('./Maintenance/WorkOrder'));
const WorkOrderFrom = lazy(() => import('./Maintenance/WorkOrderFrom'));

const Inventory = lazy(() => import('./SpareParts/Inventory'));
const InventoryFrom = lazy(() => import('./SpareParts/InventoryFrom'));


const MasterFileSelect =lazy(()=>import('./MasterFileSetup/MasterFileSelect'))

const System_Default_Setting=lazy(()=>import('./MasterFileSetup/MasterFile_Master/System_Default_Setting'))
const Master_UserGroup=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_UserGroup'))
const Master_AutoNumber=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_AutoNumber'))
const Master_CraftCode=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_CraftCode'))
const Master_statusCategory=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_statusCategory'))
const Master_StatusType=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_StatusType'))
const Master_CostCenter=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_CostCenter'))
const Master_Account=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_Account'))
const Master_CurrencyCode=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_CurrencyCode'))
const Master_TaxCode=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_TaxCode'))
const Master_UOMType=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_UOMType'))
const Master_UOMMaster=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_UOMMaster'))
const Master_UOMConFactor=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_UOMConFactor'))
const Master_BillTo=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_BillTo'))
const Master_ShipTo=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_ShipTo'))
const Master_SupplierStatus=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_SupplierStatus'))
const Master_ProjectMaster=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_ProjectMaster'))
const Master_CustomerStatus=lazy(()=>import('./MasterFileSetup/MasterFile_Master/Master_CustomerStatus'))

const AssetType =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetType'))
const AssetGroupCode =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetGroupCode'))
const AssetCode =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetCode'))
const AssetCriticalFactor =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetCriticalFactor'))
const AssetStatus =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetStatus'))
const AssetWorkArea =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetWorkArea'))
const AssetLocation =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetLocation'))
const AssetLevel =lazy(()=>import('./MasterFileSetup/MasterFile_Asset/AssetLevel'))


const WorkStatus=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkStatus'))
const WorkPriority=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkPriority'))
const WorkGroup=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkGroup'))
const WorkClass=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkClass'))
const WorkType=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkType'))
const WorkFaultCode=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkFaultCode'))
const WorkCauseCode=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkCauseCode'))
const WorkActionCode=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkActionCode'))
const WorkDelayCode=lazy(()=>import('./MasterFileSetup/MasterFile_Work/WorkDelayCode'))

const Material_LocationCategory=lazy(()=>import('./MasterFileSetup/MasterFile_Material/Material_LocationCategory'))
const Material_Location=lazy(()=>import('./MasterFileSetup/MasterFile_Material/Material_Location'))
const Material_Status=lazy(()=>import('./MasterFileSetup/MasterFile_Material/Material_Status'))
const Material_CommodityCode=lazy(()=>import('./MasterFileSetup/MasterFile_Material/Material_CommodityCode'))
const Material_GroupCode=lazy(()=>import('./MasterFileSetup/MasterFile_Material/Material_GroupCode'))


const PM_FrequencyCode=lazy(()=>import('./MasterFileSetup/MasterFile_PM/PM_FrequencyCode'))
const PM_GroupMaster=lazy(()=>import('./MasterFileSetup/MasterFile_PM/PM_GroupMaster'))
const PM_TaskGroup=lazy(()=>import('./MasterFileSetup/MasterFile_PM/PM_TaskGroup'))

const Purchasing_PRStatus=lazy(()=>import('./MasterFileSetup/MasterFIle_Purchasing/Purchasing_PRStatus'))
const Purchasing_POStatus=lazy(()=>import('./MasterFileSetup/MasterFIle_Purchasing/Purchasing_POStatus'))
const Purchasing_ConstractStatus=lazy(()=>import('./MasterFileSetup/MasterFIle_Purchasing/Purchasing_ConstractStatus'))
const Purchasing_ConstractGroup=lazy(()=>import('./MasterFileSetup/MasterFIle_Purchasing/Purchasing_ConstractGroup'))
const Purchasing_Type=lazy(()=>import('./MasterFileSetup/MasterFIle_Purchasing/Purchasing_Type'))
const Purchasing_Priority=lazy(()=>import('./MasterFileSetup/MasterFIle_Purchasing/Purchasing_Priority'))

const Personnal_EmployeeStatus=lazy(()=>import('./MasterFileSetup/MasterFile_Personnel/Personnal_EmployeeStatus'))

const Invoice_PaymentMethod=lazy(()=>import('./MasterFileSetup/MasterFile_Invoice/Invoice_PaymentMethod'))




class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>

          <Route exact path="/user-pages/login-1" component={ Login } />
          <Route path="/Dashboard" component={ Dashboard } />
          
          <Route path="/AssetRegister" component={ AssetRegister } />
          <Route path="/AssetFrom-1" component={ AssetFrom } />

          <Route path="/Personnal_Employee" component={ Personnal_Employee } />
          <Route path="/PersonnelFrom-1" component={ PersonnelFrom } />

          <Route path="/MasterFileSelect" component={ MasterFileSelect } />
          <Route path="/WorkRequest" component={ WorkRequest } />
          {/* <Route path="/WorkRequestForm" component={ WorkRequestForm } /> Baru */}
          <Route path="/WorkRequestForm-1" component={ WorkRequestForm } />

          <Route path="/Work_Order" component={ Work_Order } />
          <Route path="/WorkOrderFrom-1" component={ WorkOrderFrom } />

          <Route path="/Inventory" component={ Inventory } />
          <Route path="/InventoryFrom-1" component={ InventoryFrom } />


          <Route path="/System_Default_Setting" component={ System_Default_Setting } />
          <Route path="/Master_UserGroup" component={ Master_UserGroup } />
          <Route path="/Master_AutoNumber" component={ Master_AutoNumber } />
          <Route path="/Master_CraftCode" component={ Master_CraftCode } />
          <Route path="/Master_statusCategory" component={ Master_statusCategory } />
          <Route path="/Master_StatusType" component={ Master_StatusType } />
          <Route path="/Master_CostCenter" component={ Master_CostCenter } />
          <Route path="/Master_Account" component={ Master_Account } />
          <Route path="/Master_CurrencyCode" component={ Master_CurrencyCode } />
          <Route path="/Master_TaxCode" component={ Master_TaxCode } />
          <Route path="/Master_UOMType" component={ Master_UOMType } />
          <Route path="/Master_UOMMaster" component={ Master_UOMMaster } />
          <Route path="/Master_UOMConFactor" component={ Master_UOMConFactor } />
          <Route path="/Master_BillTo" component={ Master_BillTo } />
          <Route path="/Master_ShipTo" component={ Master_ShipTo } />
          <Route path="/Master_SupplierStatus" component={ Master_SupplierStatus } />
          <Route path="/Master_ProjectMaster" component={ Master_ProjectMaster } />
          <Route path="/Master_CustomerStatus" component={ Master_CustomerStatus } />

          
          
          <Route path="/AssetType" component={ AssetType } />
          <Route path="/AsseGroupCode" component={ AssetGroupCode } />
          <Route path="/AssetCode" component={ AssetCode } />
          <Route path="/AssetCriticalFactor" component={ AssetCriticalFactor } />
          <Route path="/AssetStatus" component={ AssetStatus } />
          <Route path="/AssetWorkArea" component={ AssetWorkArea } />
          <Route path="/AssetLocation" component={ AssetLocation } />
          <Route path="/AssetLevel" component={ AssetLevel } />
         
          <Route path="/WorkStatus" component={ WorkStatus } />
          <Route path="/WorkPriority" component={ WorkPriority } />
          <Route path="/WorkGroup" component={ WorkGroup } />
          <Route path="/WorkClass" component={ WorkClass } />
          <Route path="/WorkType" component={ WorkType } />
          <Route path="/WorkFaultCode" component={ WorkFaultCode } />
          <Route path="/WorkCauseCode" component={ WorkCauseCode } />
          <Route path="/WorkActionCode" component={ WorkActionCode } />
          <Route path="/WorkDelayCode" component={ WorkDelayCode } />

          <Route path="/Material_LocationCategory" component={ Material_LocationCategory } />
          <Route path="/Material_Location" component={ Material_Location } />
          <Route path="/Material_Status" component={ Material_Status } />
          <Route path="/Material_CommodityCode" component={ Material_CommodityCode } />
          <Route path="/Material_GroupCode" component={ Material_GroupCode } />

          <Route path="/PM_FrequencyCode" component={ PM_FrequencyCode } />
          <Route path="/PM_GroupMaster" component={ PM_GroupMaster } />
          <Route path="/PM_TaskGroup" component={ PM_TaskGroup } />

          <Route path="/Purchasing_PRStatus" component={ Purchasing_PRStatus } />
          <Route path="/Purchasing_POStatus" component={ Purchasing_POStatus } />
          <Route path="/Purchasing_ConstractStatus" component={ Purchasing_ConstractStatus } />
          <Route path="/Purchasing_ConstractGroup" component={ Purchasing_ConstractGroup } />
          <Route path="/Purchasing_Type" component={ Purchasing_Type } />
          <Route path="/Purchasing_Priority" component={ Purchasing_Priority } />

          <Route path="/Personnal_EmployeeStatus" component={ Personnal_EmployeeStatus } />

          <Route path="/Invoice_PaymentMethod" component={ Invoice_PaymentMethod } />

          <Redirect to="/user-pages/login-1" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;