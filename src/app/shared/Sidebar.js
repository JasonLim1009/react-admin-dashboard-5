import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/AssetRegister", state: "AssetRegisterOpen" },
      { path: "/CheckList", state: "CheckListOpen" },
      { path: "/Maintenance", state: "MaintenanceOpen" },
      { path: "/Inventory", state: "InventoryOpen" },
      { path: "/Purchasing", state: "PurchasingOpen" },
      { path: "/PreventiveSetup", state: "PreventiveSetupOpen" },
      { path: "/Personnal", state: "PersonnalOpen" },
      { path: "/WorkScheduling", state: "WorkSchedulingOpen" },
      { path: "/CustomerInvoice", state: "CustomerInvoiceOpen" },
      { path: "/Dashboard", state: "DashboardOpen" },
      { path: "/KPIReport", state: "KPIReportOpen" },
      { path: "/Notifications", state: "NotificationsOpen" },
      { path: "/MasterFileSetup", state: "MasterFileSetupOpen" },
      { path: "/SystemAdmin", state: "SystemAdminOpen" },
      { path: "/Mobile", state: "MobileOpen" },
      { path: "/Opstions", state: "OpstionsOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand"></a>
          <a
            className="sidebar-brand brand-logo-mini pt-3"
            href="index.html"
          ></a>
        </div>
        <ul className="nav">
          <li
            className={
              this.isPathActive("/AssetRegister")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                this.state.AssetRegisterOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("AssetRegisterOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
              <span className="menu-title">
                {" "}
                <Trans>Asset</Trans>{" "}
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.AssetRegisterOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AssetRegister")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetRegister",
                      state: { data: "Asset Register" },
                    }}
                  >
                    <Trans>Asset Register</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/CheckList") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.CheckListOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("CheckListOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
              <span className="menu-title">
                <Trans>Check List</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.CheckListOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Maintenance") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.MaintenanceOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("MaintenanceOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
              <span className="menu-title">
                <Trans>Maintenance</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.MaintenanceOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Inventory") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.InventoryOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("InventoryOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">
                <Trans>Inventory</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.InventoryOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Purchasing") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.PurchasingOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("PurchasingOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-account-box-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Purchasing</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.PurchasingOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/PreventiveSetup")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                this.state.PreventiveSetupOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("PreventiveSetupOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-chart-line menu-icon"></i>
              <span className="menu-title">
                <Trans>Preventive Setup</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.PreventiveSetupOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Personnel") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.PersonnelOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("PersonnelOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-lock-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Personnel</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.PersonnelOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Personnal_Employee")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Personnal_Employee",
                      state: { data: "Personnal Employee" },
                    }}
                  >
                    <Trans>Employee</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/WorkScheduling")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                this.state.WorkSchedulingOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("WorkSchedulingOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Work Scheduling</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.WorkSchedulingOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/CustomerInvoice")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                this.state.CustomerInvoiceOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("CustomerInvoiceOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Customer Invoice</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.CustomerInvoiceOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.DashboardOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("DashboardOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.DashboardOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Dashboard")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{ pathname: "/Dashboard" }}
                  >
                    <Trans>Dashboard</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/KPIReport") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.KPIReportOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("KPIReportOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>KPI Report</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.KPIReportOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Notifications")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                this.state.NotificationsOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("NotificationsOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Notifications</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.NotificationsOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/MasterFileSetup")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                this.state.MasterFileSetupOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("MasterFileSetupOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Master File Setup</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.MasterFileSetupOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/SystemDefaultSetting")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/SystemDefaultSetting",
                      state: { data: "SystemDefaultSetting" },
                    }}
                  >
                    <Trans>System Default Setting</Trans>
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_UserGroup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_UserGroup",
                      state: { data: "Master_UserGroup" },
                    }}
                  >
                    <Trans>Master-User Group</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_AutoNumber")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_AutoNumber",
                      state: { data: "Master_AutoNumber" },
                    }}
                  >
                    <Trans>Master-Auto Number</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_CraftCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_CraftCode",
                      state: { data: "Master_CraftCode" },
                    }}
                  >
                    <Trans>Master-Craft Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_AccountingPeriod")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_AccountingPeriod",
                      state: { data: "Master_AccountingPeriod" },
                    }}
                  >
                    <Trans>Master-Accounting Period</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_statsCategory")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_statsCategory",
                      state: { data: "Master_statsCategory" },
                    }}
                  >
                    <Trans>Master-Status Category</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_StatusType")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_StatusType",
                      state: { data: "Master_StatusType" },
                    }}
                  >
                    <Trans>Master-Status Type</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_CostCenter")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_CostCenter",
                      state: { data: "Master_CostCenter" },
                    }}
                  >
                    <Trans>Master-CostCenter</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_Account")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_Account",
                      state: { data: "Master_Account" },
                    }}
                  >
                    <Trans>Master-Account</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_CurrencyCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_CurrencyCode",
                      state: { data: "Master_CurrencyCode" },
                    }}
                  >
                    <Trans>Master-Currency Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_TaxCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_TaxCode",
                      state: { data: "Master_TaxCode" },
                    }}
                  >
                    <Trans>Master-Tax Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_Budget")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_Budget",
                      state: { data: "Master_Budget" },
                    }}
                  >
                    <Trans>Master-Budget</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_UOMType")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_UOMType",
                      state: { data: "Master_UOMType" },
                    }}
                  >
                    <Trans>Master-UMO Type</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_UOMMaster")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_UOMMaster",
                      state: { data: "Master_UOMMaster" },
                    }}
                  >
                    <Trans>Master-UMO Master</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_UOMConFactor")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_UOMConFactor",
                      state: { data: "Master_UOMConFactor" },
                    }}
                  >
                    <Trans>Master-UMO Con Factor</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_Manufacturer")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_Manufacturer",
                      state: { data: "Master_Manufacturer" },
                    }}
                  >
                    <Trans>Master-Manufacturer</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_BillTo")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_BillTo",
                      state: { data: "Master_BillTo" },
                    }}
                  >
                    <Trans>Master-Bill To</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_ShipTo")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_ShipTo",
                      state: { data: "Master_ShipTo" },
                    }}
                  >
                    <Trans>Master-Ship To</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_SupplierStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_SupplierStatus",
                      state: { data: "Master_SupplierStatus" },
                    }}
                  >
                    <Trans>Master-Supplier Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_ProjectMaster")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_ProjectMaster",
                      state: { data: "Master_ProjectMaster" },
                    }}
                  >
                    <Trans>Master-Project Master</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Master_CustomerStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Master_CustomerStatus",
                      state: { data: "Master_CustomerStatus" },
                    }}
                  >
                    <Trans>Master-Customer Status</Trans>
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/MasterFileSetup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetType",
                      state: { data: "Asset_Type" },
                    }}
                  >
                    <Trans>Asset Type</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AsseGroupCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AsseGroupCode",
                      state: { data: "Asset_GroupCode" },
                    }}
                  >
                    <Trans>Asset Group Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AssetCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetCode",
                      state: { data: "Asset_Code" },
                    }}
                  >
                    <Trans>Asset Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AssetCriticalFactor")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetCriticalFactor",
                      state: { data: "Asset_CriticalFactor" },
                    }}
                  >
                    <Trans>Asset Critical Factor</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AssetStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetStatus",
                      state: { data: "Asset_Status" },
                    }}
                  >
                    <Trans>Asset Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AssetWorkArea")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetWorkArea",
                      state: { data: "Asset_WorkArea" },
                    }}
                  >
                    <Trans>Asset Work Area</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AssetLocation")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetLocation",
                      state: { data: "Asset_Location" },
                    }}
                  >
                    <Trans>Asset Location</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/AssetLevel")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/AssetLevel",
                      state: { data: "Asset_Level" },
                    }}
                  >
                    <Trans>Asset Level</Trans>
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkStatus",
                      state: { data: "WorkStatus" },
                    }}
                  >
                    <Trans>Work Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkPriority")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkPriority",
                      state: { data: "WorkPriority" },
                    }}
                  >
                    <Trans>Work Priority</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkGroup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkGroup",
                      state: { data: "WorkGroup" },
                    }}
                  >
                    <Trans>Work Group</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkClass")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkClass",
                      state: { data: "WorkClass" },
                    }}
                  >
                    <Trans>Work Class</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkType")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{ pathname: "/WorkType", state: { data: "WorkType" } }}
                  >
                    <Trans>Work Type</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkFaluitCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkFaluitCode",
                      state: { data: "WorkFaluitCode" },
                    }}
                  >
                    <Trans>Work Fault Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkCauseCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkCauseCode",
                      state: { data: "WorkCauseCode" },
                    }}
                  >
                    <Trans>Work Cause Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkActionCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkActionCode",
                      state: { data: "WorkActionCode" },
                    }}
                  >
                    <Trans>Work Action Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkDelayCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkDelayCode",
                      state: { data: "WorkDelayCode" },
                    }}
                  >
                    <Trans>Work Delay Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkFault_Cause_Action")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/WorkFault_Cause_Action",
                      state: { data: "WorkFault_Cause_Action" },
                    }}
                  >
                    <Trans>Work Fault/Cause/Action</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/WorkFlow")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{ pathname: "/WorkFlow", state: { data: "WorkFlow" } }}
                  >
                    <Trans>Work Flow</Trans>
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Material_LocationCategory")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Material_LocationCategory",
                      state: { data: "Material_LocationCategory" },
                    }}
                  >
                    <Trans>Material-Location Category</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Material_Location")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Material_Location",
                      state: { data: "Material_Location" },
                    }}
                  >
                    <Trans>Material-Location</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Material_Status")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Material_Status",
                      state: { data: "Material_Status" },
                    }}
                  >
                    <Trans>Material-Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Material_CommodityCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Material_CommodityCode",
                      state: { data: "Material_CommodityCode" },
                    }}
                  >
                    <Trans>Material-Commodity Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Material_GroupCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Material_GroupCode",
                      state: { data: "Material_GroupCode" },
                    }}
                  >
                    <Trans>Material-Group Code</Trans>
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/PM_FrequencyCode")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/PM_FrequencyCode",
                      state: { data: "PM_FrequencyCode" },
                    }}
                  >
                    <Trans>PM-Frequency Code</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/PM_GroupMaster")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/PM_GroupMaster",
                      state: { data: "PM_GroupMaster" },
                    }}
                  >
                    <Trans>PM-Group Master</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/PM_Grouping")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/PM_Grouping",
                      state: { data: "PM_Grouping" },
                    }}
                  >
                    <Trans>PM-Grouping</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/PM_TaskGroup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/PM_TaskGroup",
                      state: { data: "PM_TaskGroup" },
                    }}
                  >
                    <Trans>PM-Task Group</Trans>
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Purchasing_PRStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Purchasing_PRStatus",
                      state: { data: "Purchasing_PRStatus" },
                    }}
                  >
                    <Trans>Purchasing-PR Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Purchasing_POStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Purchasing_POStatus",
                      state: { data: "Purchasing_POStatus" },
                    }}
                  >
                    <Trans>Purchasing-PO Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Purchasing_ConstractStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Purchasing_ConstractStatus",
                      state: { data: "Purchasing_ConstractStatus" },
                    }}
                  >
                    <Trans>Purchasing-Constract Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Purchasing_ConstractGroup")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Purchasing_ConstractGroup",
                      state: { data: "Purchasing_ConstractGroup" },
                    }}
                  >
                    <Trans>Purchasing-Constract Group</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Purchasing_Type")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Purchasing_Type",
                      state: { data: "Purchasing_Type" },
                    }}
                  >
                    <Trans>Purchasing-Type</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Purchasing_Priority")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Purchasing_Priority",
                      state: { data: "Purchasing_Priority" },
                    }}
                  >
                    <Trans>Purchasing-Priority</Trans>
                  </Link>
                </li>

                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/TimeCard_HoreType")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/TimeCard_HoreType",
                      state: { data: "TimeCard_HoreType" },
                    }}
                  >
                    <Trans>TimeCard-Hore Type</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Personnal_EmployeeStatus")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Personnal_EmployeeStatus",
                      state: { data: "Personnal_EmployeeStatus" },
                    }}
                  >
                    <Trans>Personnal-Employee Status</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/Invoice_PaymentMethod")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/Invoice_PaymentMethod",
                      state: { data: "Invoice_PaymentMethod" },
                    }}
                  >
                    <Trans>Invoice-Payment Method</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/SystemAdmin") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.SystemAdminOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("SystemAdminOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>System Admin</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.SystemAdminOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/MasterFileSetup-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={{
                      pathname: "/MasterFilesetup-1",
                      state: { data: "Asset_GroupCode" },
                    }}
                  >
                    <Trans>Asset Group Code</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Mobile") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.MobileOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("MobileOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Mobile</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.MobileOpen}>
              <ul className="nav flex-column sub-menu"></ul>
            </Collapse>
          </li>

          <li
            className={
              this.isPathActive("/Options") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                this.state.OptionsOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("OptionsOpen")}
              data-toggle="collapse"
            >
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title">
                <Trans>Options</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.OptionsOpen}>
              <ul className="nav flex-column sub-menu"></ul>
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
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
