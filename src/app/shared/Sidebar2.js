import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

//import image
import evantage from '../../assets/images/Full-Logo-Evantage.png';
import collapseLogo from '../../assets/images/logo.png';

//import icon
import IconAsset from '../../assets/images/IconAsset.png';
import IconCheckList from '../../assets/images/IconCheckList.png';
import IconMaintenance from '../../assets/images/IconMaintenance.png';
import IconInventory from '../../assets/images/IconInventory.png';
import IconPurchase from '../../assets/images/IconPurchase.png';
import IconPreventive from '../../assets/images/IconPreventive.png';
import IconPersonnel from '../../assets/images/IconPersonnel.png';
import IconWorkSchedule from '../../assets/images/IconWorkSchedule.png';
import IconCustomerInvoice from '../../assets/images/IconCustomerInvoice.png';
import IconDashboard from '../../assets/images/IconDashboard.png';
import IconKPI from '../../assets/images/IconKPI.png';
import IconNotification from '../../assets/images/IconNotification.png';
import IconMasterFileSetup from '../../assets/images/IconMasterFileSetup.png';
import IconAdmin from '../../assets/images/IconAdmin.png';
import IconMobile from '../../assets/images/IconMobile.png';
import IconOption from '../../assets/images/IconOption.png';


class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});  
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [

      {path:'/AssetRegister', state: 'AssetRegisterOpen'},
      {path:'/CheckList', state: 'CheckListOpen'},
      {path:'/Maintenance', state: 'MaintenanceOpen'},
      {path:'/Inventory', state: 'InventoryOpen'},
      {path:'/Purchasing', state: 'PurchasingOpen'},
      {path:'/PreventiveSetup', state: 'PreventiveSetupOpen'},
      {path:'/Personnal', state: 'PersonnalOpen'},
      {path:'/WorkScheduling', state: 'WorkSchedulingOpen'},
      {path:'/CustomerInvoice', state: 'CustomerInvoiceOpen'},
      {path:'/Dashboard', state: 'DashboardOpen'},
      {path:'/KPIReport', state: 'KPIReportOpen'},
      {path:'/Notifications', state: 'NotificationsOpen'},
      {path:'/MasterFileSetup', state: 'MasterFileSetupOpen'},
      {path:'/SystemAdmin', state: 'SystemAdminOpen'},
      {path:'/Mobile', state: 'MobileOpen'},
      {path:'/Opstions', state: 'OpstionsOpen'},
      
     
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  
  render () {
    const { isSidebarOpen } = this.props;

    const logo = isSidebarOpen ? collapseLogo : evantage;

    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-underline sidebar-brand-wrapper d-flex align-items-center"> {/**** <img src={collapseLogo} ****/}
          <a className="sidebar-brand brand-logo-mini d-block" style={{cursor : "alias"}}> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS47U75WAYlZpId0o8qgK_Y7XD6eKtV6_vQNw&usqp=CAU" className="rounded-full w-100 h-10"/></a>
        </div>
        
        <ul className="nav">  

          <li className={ this.isPathActive('/Asset') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.AssetRegisterOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('AssetRegisterOpen') } data-toggle="collapse">
            <img src={IconAsset}/>
              <span className="menu-title"><Trans>Asset</Trans></span>
              { this.state.AssetRegisterOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.AssetRegisterOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={ this.isPathActive('/AssetRegister') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetRegister",state:{data:"Asset Register"}}}
              onMouseOver={(event) => {event.target.style.color = '#FFF';}}
              onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
              ><Trans>Asset Register</Trans></Link></li>
              
              </ul>
            </Collapse>
          </li>



          {/* <li className={ this.isPathActive('/CheckList') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.CheckListOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('CheckListOpen') } data-toggle="collapse">
            <img src={IconCheckList}/>
              <span className="menu-title"><Trans>Check List</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.CheckListOpen }>
              <ul className="nav flex-column sub-menu">
                
              </ul>
            </Collapse>
          </li> */}


          {/* <li className={ this.isPathActive('/Purchasing') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.PurchasingOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('PurchasingOpen') } data-toggle="collapse">
            <img src={IconPurchase}/>
              <span className="menu-title"><Trans>Purchasing</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.PurchasingOpen }>
              <ul className="nav flex-column sub-menu">
              </ul>
            </Collapse>
          </li> */}


          {/* <li className={ this.isPathActive('/PreventiveSetup') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.PreventiveSetupOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('PreventiveSetupOpen') } data-toggle="collapse">
            <img src={IconPreventive}/>
              <span className="menu-title"><Trans>Preventive Setup</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.PreventiveSetupOpen }>
              <ul className="nav flex-column sub-menu">
              </ul>
            </Collapse>
          </li> */}


          <li className={ this.isPathActive('/Personnel') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.PersonnelOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('PersonnelOpen') } data-toggle="collapse">
            <img src={IconPersonnel}/>
              <span className="menu-title"><Trans>Personnel</Trans></span>
              { this.state.PersonnelOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.PersonnelOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={ this.isPathActive('/Personnal_Employee') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Personnal_Employee",state:{data:"Personnal Employee"}}}
              onMouseOver={(event) => {event.target.style.color = '#FFF';}}
              onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
              ><Trans>Personnal Employee</Trans></Link></li>
              
              </ul>
            </Collapse>
          </li>
          
          
          {/* <li className={ this.isPathActive('/WorkScheduling') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.WorkSchedulingOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('WorkSchedulingOpen') } data-toggle="collapse">
            <img src={IconWorkSchedule}/>
              <span className="menu-title"><Trans>Work Scheduling</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.WorkSchedulingOpen }>
              <ul className="nav flex-column sub-menu">
              </ul>
            </Collapse>
          </li> */}


          {/* <li className={ this.isPathActive('/CustomerInvoice') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.CustomerInvoiceOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('CustomerInvoiceOpen') } data-toggle="collapse">
            <img src={IconCustomerInvoice}/>
              <span className="menu-title"><Trans>Customer Invoice</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.CustomerInvoiceOpen }>
              <ul className="nav flex-column sub-menu">
               </ul>
            </Collapse>
          </li> */}
          

          <li className={ this.isPathActive('/Dashboard') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.DashboardOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('DashboardOpen') } data-toggle="collapse">
            <img src={IconDashboard}/>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              { this.state.DashboardOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.DashboardOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/Dashboard') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Dashboard"}}
                onMouseOver={(event) => {event.target.style.color = '#FFF';}}
                onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
                ><Trans>Dashboard</Trans></Link></li>
              
              </ul>
            </Collapse>
          </li>

          <li className={ this.isPathActive('/Maintenance') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.MaintenanceOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('MaintenanceOpen') } data-toggle="collapse">
            <img src={IconMaintenance}/>
              <span className="menu-title"><Trans>Maintenance</Trans></span>
              { this.state.MaintenanceOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.MaintenanceOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkRequest') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkRequest",state:{data:"WorkRequest"}}}
              onMouseOver={(event) => {event.target.style.color = '#FFF';}}
              onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
              ><Trans>Work Request</Trans></Link></li>
              
              </ul>
            </Collapse>
            <Collapse in={ this.state.MaintenanceOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={ this.isPathActive('/Work_Order') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Work_Order",state:{data:"Work Order"}}}
              onMouseOver={(event) => {event.target.style.color = '#FFF';}}
              onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
              ><Trans>Work Order</Trans></Link></li>
              
              </ul>
            </Collapse>
          </li>

          <li className={ this.isPathActive('/Inventory') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.InventoryOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('InventoryOpen') } data-toggle="collapse">
            <img src={IconInventory}/>
              <span className="menu-title"><Trans>Spare Parts</Trans></span>
              { this.state.InventoryOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.InventoryOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={ this.isPathActive('/Inventory') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Inventory",state:{data:"Inventory"}}}
              onMouseOver={(event) => {event.target.style.color = '#FFF';}}
              onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
              ><Trans>Inventory</Trans></Link></li>

              </ul>
            </Collapse>
          </li>


          {/* <li className={ this.isPathActive('/KPIReport') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.KPIReportOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('KPIReportOpen') } data-toggle="collapse">
            <img src={IconKPI}/>
              <span className="menu-title"><Trans>KPI Report</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.KPIReportOpen }>
              <ul className="nav flex-column sub-menu">
              </ul>
            </Collapse>
          </li>
          

          <li className={ this.isPathActive('/Notifications') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.NotificationsOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('NotificationsOpen') } data-toggle="collapse">
            <img src={IconNotification}/>
              <span className="menu-title"><Trans>Notifications</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.NotificationsOpen }>
              <ul className="nav flex-column sub-menu">
              </ul>
            </Collapse>
          </li> */}
          
          
          <li className={ this.isPathActive('/MasterFileSetup') ? 'nav-item active' : 'nav-item' }> 
            <div className={ this.state.MasterFileSetupOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('MasterFileSetupOpen') } data-toggle="collapse">
            <img src={IconMasterFileSetup}/>
              <span className="menu-title"><Trans>Master File Setup</Trans></span> 
              { this.state.MasterFileSetupOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            
            <Collapse in={ this.state.MasterFileSetupOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={ this.isPathActive('/System_Default_Setting') ? 'nav-link active' : 'nav-link' } to={{pathname:"/System_Default_Setting",state:{data:"System_Default_Setting"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>System Default Setting</Trans></Link></li>
             
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_UserGroup') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_UserGroup",state:{data:"Master_UserGroup"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-User Group</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_AutoNumber') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_AutoNumber",state:{data:"Master_AutoNumber"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Auto Number</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_CraftCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_CraftCode",state:{data:"Master_CraftCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Craft Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_AccountingPeriod') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_AccountingPeriod",state:{data:"Master_AccountingPeriod"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Accounting Period</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_statsCategory') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_statsCategory",state:{data:"Master_statsCategory"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Status Category</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_StatusType') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_StatusType",state:{data:"Master_StatusType"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Status Type</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_CostCenter') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_CostCenter",state:{data:"Master_CostCenter"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-CostCenter</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_Account') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_Account",state:{data:"Master_Account"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Account</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_CurrencyCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_CurrencyCode",state:{data:"Master_CurrencyCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Currency Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_TaxCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_TaxCode",state:{data:"Master_TaxCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Tax Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_Budget') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_Budget",state:{data:"Master_Budget"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Budget</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_UOMType') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_UOMType",state:{data:"Master_UOMType"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-UMO Type</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_UOMMaster') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_UOMMaster",state:{data:"Master_UOMMaster"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-UMO Master</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_UOMConFactor') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_UOMConFactor",state:{data:"Master_UOMConFactor"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-UMO Con Factor</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_Manufacturer') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_Manufacturer",state:{data:"Master_Manufacturer"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Manufacturer</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_BillTo') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_BillTo",state:{data:"Master_BillTo"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Bill To</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_ShipTo') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_ShipTo",state:{data:"Master_ShipTo"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Ship To</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_SupplierStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_SupplierStatus",state:{data:"Master_SupplierStatus"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Supplier Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_ProjectMaster') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_ProjectMaster",state:{data:"Master_ProjectMaster"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Project Master</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Master_CustomerStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Master_CustomerStatus",state:{data:"Master_CustomerStatus"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Master-Customer Status</Trans></Link></li>
             
              <li className="nav-item"> <Link className={ this.isPathActive('/MasterFileSetup') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetType",state:{data:"Asset_Type"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Type</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/AsseGroupCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AsseGroupCode",state:{data:"Asset_GroupCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Group Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/AssetCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetCode",state:{data:"Asset_Code"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/AssetCriticalFactor') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetCriticalFactor",state:{data:"Asset_CriticalFactor"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Critical Factor</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/AssetStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetStatus",state:{data:"Asset_Status"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/AssetWorkArea') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetWorkArea",state:{data:"Asset_WorkArea"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Work Area</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/AssetLocation') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetLocation",state:{data:"Asset_Location"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Location</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/AssetLevel') ? 'nav-link active' : 'nav-link' } to={{pathname:"/AssetLevel",state:{data:"Asset_Level"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Asset Level</Trans></Link></li>
             

              <li className="nav-item"> <Link className={ this.isPathActive('/WorkStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkStatus",state:{data:"WorkStatus"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkPriority') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkPriority",state:{data:"WorkPriority"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Priority</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkGroup') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkGroup",state:{data:"WorkGroup"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Group</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkClass') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkClass",state:{data:"WorkClass"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Class</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkType') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkType",state:{data:"WorkType"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Type</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkFaluitCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkFaluitCode",state:{data:"WorkFaluitCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Fault Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkCauseCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkCauseCode",state:{data:"WorkCauseCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Cause Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkActionCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkActionCode",state:{data:"WorkActionCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Action Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkDelayCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkDelayCode",state:{data:"WorkDelayCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Delay Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkFault_Cause_Action') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkFault_Cause_Action",state:{data:"WorkFault_Cause_Action"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Fault/Cause/Action</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/WorkFlow') ? 'nav-link active' : 'nav-link' } to={{pathname:"/WorkFlow",state:{data:"WorkFlow"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Work Flow</Trans></Link></li>
             

              <li className="nav-item"> <Link className={ this.isPathActive('/Material_LocationCategory') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Material_LocationCategory",state:{data:"Material_LocationCategory"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Material-Location Category</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Material_Location') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Material_Location",state:{data:"Material_Location"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Material-Location</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Material_Status') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Material_Status",state:{data:"Material_Status"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Material-Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Material_CommodityCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Material_CommodityCode",state:{data:"Material_CommodityCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Material-Commodity Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Material_GroupCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Material_GroupCode",state:{data:"Material_GroupCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Material-Group Code</Trans></Link></li>
              
              <li className="nav-item"> <Link className={ this.isPathActive('/PM_FrequencyCode') ? 'nav-link active' : 'nav-link' } to={{pathname:"/PM_FrequencyCode",state:{data:"PM_FrequencyCode"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>PM-Frequency Code</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/PM_GroupMaster') ? 'nav-link active' : 'nav-link' } to={{pathname:"/PM_GroupMaster",state:{data:"PM_GroupMaster"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>PM-Group Master</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/PM_Grouping') ? 'nav-link active' : 'nav-link' } to={{pathname:"/PM_Grouping",state:{data:"PM_Grouping"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>PM-Grouping</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/PM_TaskGroup') ? 'nav-link active' : 'nav-link' } to={{pathname:"/PM_TaskGroup",state:{data:"PM_TaskGroup"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>PM-Task Group</Trans></Link></li>
              
              <li className="nav-item"> <Link className={ this.isPathActive('/Purchasing_PRStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Purchasing_PRStatus",state:{data:"Purchasing_PRStatus"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Purchasing-PR Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Purchasing_POStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Purchasing_POStatus",state:{data:"Purchasing_POStatus"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Purchasing-PO Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Purchasing_ConstractStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Purchasing_ConstractStatus",state:{data:"Purchasing_ConstractStatus"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Purchasing-Constract Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Purchasing_ConstractGroup') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Purchasing_ConstractGroup",state:{data:"Purchasing_ConstractGroup"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Purchasing-Constract Group</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Purchasing_Type') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Purchasing_Type",state:{data:"Purchasing_Type"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Purchasing-Type</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Purchasing_Priority') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Purchasing_Priority",state:{data:"Purchasing_Priority"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Purchasing-Priority</Trans></Link></li>
              
              <li className="nav-item"> <Link className={ this.isPathActive('/TimeCard_HoreType') ? 'nav-link active' : 'nav-link' } to={{pathname:"/TimeCard_HoreType",state:{data:"TimeCard_HoreType"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>TimeCard-Hore Type</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Personnal_EmployeeStatus') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Personnal_EmployeeStatus",state:{data:"Personnal_EmployeeStatus"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Personnal-Employee Status</Trans></Link></li>
              <li className="nav-item"> <Link className={ this.isPathActive('/Invoice_PaymentMethod') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Invoice_PaymentMethod",state:{data:"Invoice_PaymentMethod"}}} onMouseOver={(event) => {event.target.style.color = '#FFF';}} onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}><Trans>Invoice-Payment Method</Trans></Link></li>

            </ul>
            </Collapse>
          </li>
          

          <li className={ this.isPathActive('/SystemAdmin') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.SystemAdminOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('SystemAdminOpen') } data-toggle="collapse">
            <img src={IconAdmin}/>
              <span className="menu-title"><Trans>System Admin</Trans></span>
              { this.state.SystemAdminOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.SystemAdminOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={ this.isPathActive('/MasterFileSetup-1') ? 'nav-link active' : 'nav-link' } to={{pathname:"/MasterFilesetup-1",state:{data:"Asset_GroupCode"}}}
              onMouseOver={(event) => {event.target.style.color = '#FFF';}}
              onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
              ><Trans>Asset Group Code</Trans></Link></li>
             
              </ul>
            </Collapse>
          </li>
          

          <li className={ this.isPathActive('/Mobile') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.MobileOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('MobileOpen') } data-toggle="collapse">
            <img src={IconMobile}/>
              <span className="menu-title"><Trans>Mobile</Trans></span>
              { this.state.MobileOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.MobileOpen }>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"><Link className={ this.isPathActive('/Mobile') ? 'nav-link active' : 'nav-link' } to={{pathname:"/Mobile",state:{data:"Mobile"}}}
              onMouseOver={(event) => {event.target.style.color = '#FFF';}}
              onMouseOut={(event) => {event.target.style.color = '#C0C0C0';}}
              ><Trans>Mobile</Trans></Link></li>
              </ul>
            </Collapse>
          </li>

          
          <li className={ this.isPathActive('/Options') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.OptionsOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('OptionsOpen') } data-toggle="collapse">
            <img src={IconOption}/>
              <span className="menu-title"><Trans>Options</Trans></span>
              { this.state.OptionsOpen ? <i className="menu-arrow-up"></i> : <i className="menu-arrow-down"></i> }
            </div>
            <Collapse in={ this.state.OptionsOpen }>
              <ul className="nav flex-column sub-menu">
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);