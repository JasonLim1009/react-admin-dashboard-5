"use strict";(self.webpackChunkcmms=self.webpackChunkcmms||[]).push([[210],{210:function(e,t,n){n.r(t);var d=n(42982),r=n(45987),s=n(1413),a=n(70885),o=n(72791),c=n(91951),i=n(28742),l=n(72567),_=n(36501),u=n(21830),h=n.n(u),m=n(49643),x=n(80184),j=["indeterminate","onChange"];t.default=function(e){var t=o.useState([]),n=(0,a.Z)(t,2),u=n[0],w=n[1],k=o.useState([]),b=(0,a.Z)(k,2),f=b[0],p=b[1],y=o.useState([]),v=(0,a.Z)(y,2),g=v[0],M=v[1],N=(0,i.k6)(),O=(0,o.useState)(!1),C=(0,a.Z)(O,2),D=C[0],Z=(C[1],(0,o.useState)()),H=(0,a.Z)(Z,2),S=(H[0],H[1],(0,o.useState)(1)),P=(0,a.Z)(S,2),E=P[0],W=P[1],F=(0,o.useState)(""),R=(0,a.Z)(F,2),I=R[0],B=R[1],L=(0,o.useState)(10),A=(0,a.Z)(L,2),T=A[0],q=A[1],U=(0,o.useState)(""),J=(0,a.Z)(U,2),V=J[0],Y=J[1],z=(0,o.useState)(!1),G=(0,a.Z)(z,2),K=G[0],Q=G[1],X=(0,o.useState)(f.map((function(){return!1}))),$=(0,a.Z)(X,2),ee=$[0],te=$[1],ne=(0,o.useState)(!1),de=(0,a.Z)(ne,2),re=de[0],se=de[1],ae=(0,o.useState)(null),oe=(0,a.Z)(ae,2),ce=oe[0],ie=oe[1];(0,o.useEffect)((function(){var t=localStorage.getItem("site_ID");console.log(e.name),function(e){m.Z.get_workordermaster(e,E,T).then((function(e){console.log("Login JSON DATA : ",e),"SUCCESS"===e.data.status?(console.log("RESPONSE",e.data.data.header),console.log(e.data.totalPages),B(e.data.totalPages),w(e.data.data.header),p(e.data.data.result),M(e.data.data.result)):h().fire({icon:"error",title:"Oops...",text:e.data.message})})).catch((function(e){console.log(e),h().fire({icon:"error",title:"Oops get_sitecode...",text:e})}))}(t)}),[E,T]);var le=o.forwardRef((function(e,t){var n=e.indeterminate,d=e.onChange,a=(0,r.Z)(e,j),c=o.useRef(),i=t||c;o.useEffect((function(){i.current.indeterminate=n}),[i,n]);return(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("input",(0,s.Z)({type:"checkbox",ref:i,onChange:function(e){d(e)}},a))})})),_e=function(){Q(!K),te(f.map((function(){return!K})))},ue=function(e){var t=(0,d.Z)(ee);t[e]=!ee[e],te(t)};(0,o.useEffect)((function(){var e=ee.some((function(e){return e}));se(e)}),[ee]);var he=function(e){console.log(e),N.push("/WorkOrderFrom-1",{RowID:e.RowID})},me=function(){N.push("/WorkOrderFrom-1",{select:"New_WorkOrder"})},xe=function(e){N.push("/WorkOrderFrom-1",{RowID:e.RowID})},je=function(e){h().fire({title:"Warning",text:"Are you sure you want to delete the record?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes",cancelButtonText:"No"}).then((function(e){e.value}))};return(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{className:"page-header",children:(0,x.jsx)("h3",{className:"page-title",children:"Work Order"})}),(0,x.jsx)("div",{children:(0,x.jsx)("div",{className:"card",children:(0,x.jsxs)("div",{className:"card-body",children:[(0,x.jsxs)("div",{className:"page-header",children:[(0,x.jsx)("div",{className:"template-demo",children:(0,x.jsxs)("div",{className:"btn-group",role:"group","aria-label":"Basic example",children:[(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary",children:(0,x.jsx)("i",{className:"mdi mdi mdi-code-equal"})}),(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary",children:(0,x.jsx)("i",{className:"mdi mdi mdi-credit-card"})}),(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary",children:(0,x.jsx)("i",{className:"mdi mdi-calendar"})})]})}),(0,x.jsx)("div",{className:"col",children:(0,x.jsx)(_.Z,{className:"form-control",onChange:function(e){return function(e){if(console.log(e),Y(e),""==e)p(g);else{var t=g.filter((function(t){return t.wko_mst_wo_no.toLowerCase().includes(e.toLowerCase())}));p(t)}}(e)},value:V})}),(0,x.jsx)("div",{className:"col",children:(0,x.jsx)("button",{type:"button",className:"btn btn-primary btn-rounded",children:"Search"})}),(0,x.jsx)("nav",{"aria-label":"breadcrumb",children:(0,x.jsx)("ol",{className:"breadcrumb",children:(0,x.jsxs)("div",{className:"template-demo",children:[(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary btn-rounded btn-icon",children:(0,x.jsx)("i",{className:"mdi mdi-filter"})}),(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-primary btn-icon-text",children:[(0,x.jsx)("i",{className:"mdi mdi-mixcloud btn-icon-prepend"})," ","quick filter"]})]})})})]}),(0,x.jsxs)("div",{className:"page-header",children:[(0,x.jsxs)("div",{className:"template-demo",isVisible:D,children:[(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-primary btn-icon-text",onClick:me,children:[(0,x.jsx)("i",{className:"mdi mdi-file-check btn-icon-prepend"})," New Work Order"]}),re&&(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-success btn-icon-text",onClick:me,children:[(0,x.jsx)("i",{className:"mdi mdi-file-check btn-icon-prepend"})," Complete WO"]}),D&&(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-danger btn-icon-text",children:[(0,x.jsx)("i",{className:"mdi mdi-delete-forever btn-icon-prepend"})," ","Delete"]})]}),(0,x.jsx)("nav",{"aria-label":"breadcrumb",children:(0,x.jsxs)("div",{className:"row",children:[(0,x.jsx)(l.Z,{count:I,page:E,siblingCount:1,boundaryCount:1,variant:"outlined",shape:"rounded",onChange:function(e,t){W(t)}}),(0,x.jsx)("select",{onChange:function(e){q(e.target.value),W(1)},value:T,children:[10,20,30,40,50].map((function(e){return(0,x.jsx)("option",{value:e,children:e},e)}))})]})})]}),(0,x.jsx)("div",{className:"table-responsive",children:(0,x.jsxs)("table",{className:"table table-hover table-bordered",style:{color:"#000",border:1},children:[(0,x.jsx)("thead",{style:{color:"#000",fontWeight:"bold",fontFamily:"montserrat",margin:"5px"},children:(0,x.jsx)("tr",{children:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("th",{children:(0,x.jsx)(le,(0,s.Z)((0,s.Z)({},u),{},{checked:K,onChange:_e}))},"select"),Object.keys(u).map((function(e){return(0,x.jsxs)("th",{children:[" ",e.toUpperCase()]},e)}))]})})}),(0,x.jsx)("tbody",{children:f.map((function(e,t){if(null==e.wko_mst_org_date)var n="";else n=(0,c.default)(new Date(e.wko_mst_org_date.date),"dd/MM/yyyy HH:MM");if(null==e.wko_mst_due_date)var d="";else d=(0,c.default)(new Date(e.wko_mst_due_date.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_cmpl_date)var r="";else r=(0,c.default)(new Date(e.wko_det_cmpl_date.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_clo_date)var a="";else a=(0,c.default)(new Date(e.wko_det_clo_date.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_sched_date)var o="";else o=(0,c.default)(new Date(e.wko_det_sched_date.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_exc_date)var i="";else i=(0,c.default)(new Date(e.wko_det_exc_date.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_datetime1)var l="";else l=(0,c.default)(new Date(e.wko_det_datetime1.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_datetime2)var _="";else _=(0,c.default)(new Date(e.wko_det_datetime2.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_datetime3)var u="";else u=(0,c.default)(new Date(e.wko_det_datetime3.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_datetime4)var h="";else h=(0,c.default)(new Date(e.wko_det_datetime4.date),"dd/MM/yyyy HH:MM");if(null==e.wko_det_datetime5)var m="";else m=(0,c.default)(new Date(e.wko_det_datetime5.date),"dd/MM/yyyy HH:MM");if(null==e.wko_mst_create_date)var j="";else j=(0,c.default)(new Date(e.wko_mst_create_date.date),"dd/MM/yyyy HH:MM");return(0,x.jsxs)("tr",{onDoubleClick:function(t){return he(e,t)},onMouseEnter:function(){return ie(e)},onMouseLeave:function(){return ie(null)},style:{backgroundColor:ce===e?"#BCC9F5":"white"},children:[(0,x.jsx)("td",{children:(0,x.jsx)(le,(0,s.Z)((0,s.Z)({},e),{},{checked:ee[t],onChange:function(){return ue(t)}}))}),(0,x.jsxs)("td",{children:[e.wko_mst_wo_no,"  ",ce===e&&(0,x.jsxs)("div",{className:"template-demo",children:[(0,x.jsx)("button",{type:"button",onClick:function(){return xe(e)},className:"btn btn-light btn-icon-text",title:"Edit",style:{padding:"5px"},children:(0,x.jsx)("i",{className:"mdi mdi-file-document btn-icon-prepend"})}),(0,x.jsx)("button",{type:"button",onClick:function(){return je(e)},className:"btn btn-light btn-icon-text",title:"Delete",style:{padding:"5px"},children:(0,x.jsx)("i",{className:"mdi mdi-delete-forever btn-icon-prepend"})})]})]}),(0,x.jsx)("td",{children:e.wko_mst_assetno}),(0,x.jsx)("td",{children:e.wko_det_parent_wo}),(0,x.jsx)("td",{children:e.wko_mst_pm_grp}),(0,x.jsx)("td",{children:e.wko_mst_status}),(0,x.jsx)("td",{children:e.wko_mst_descs}),(0,x.jsx)("td",{children:e.wko_mst_chg_costcenter}),(0,x.jsx)("td",{children:n}),(0,x.jsx)("td",{children:d}),(0,x.jsx)("td",{children:r}),(0,x.jsx)("td",{children:a}),(0,x.jsx)("td",{children:e.wko_mst_originator}),(0,x.jsx)("td",{children:e.wko_det_assign_to}),(0,x.jsx)("td",{children:e.wko_det_planner}),(0,x.jsx)("td",{children:e.wko_mst_flt_code}),(0,x.jsx)("td",{children:e.wko_det_cause_code}),(0,x.jsx)("td",{children:e.wko_det_act_code}),(0,x.jsx)("td",{children:e.wko_det_corr_action}),(0,x.jsx)("td",{children:e.wko_mst_phone}),(0,x.jsx)("td",{children:e.wko_mst_project_id}),(0,x.jsx)("td",{children:e.wko_mst_work_area}),(0,x.jsx)("td",{children:e.wko_mst_asset_location}),(0,x.jsx)("td",{children:e.wko_mst_asset_level}),(0,x.jsx)("td",{children:e.wko_mst_asset_group_code}),(0,x.jsx)("td",{children:e.wko_mst_orig_priority}),(0,x.jsx)("td",{children:e.wko_mst_plan_priority}),(0,x.jsx)("td",{children:e.wko_det_temp_asset}),(0,x.jsx)("td",{children:e.wko_det_wr_no}),(0,x.jsx)("td",{children:e.wko_det_perm_id}),(0,x.jsx)("td",{children:e.wko_det_work_type}),(0,x.jsx)("td",{children:e.wko_det_work_class}),(0,x.jsx)("td",{children:e.wko_det_work_grp}),(0,x.jsx)("td",{children:o}),(0,x.jsx)("td",{children:i}),(0,x.jsx)("td",{children:e.wko_det_contract_no}),(0,x.jsx)("td",{children:e.wko_det_delay_cd}),(0,x.jsx)("td",{children:e.wko_det_customer_cd}),(0,x.jsx)("td",{children:e.wko_det_supv_id}),(0,x.jsx)("td",{children:e.wko_det_est_con_cost}),(0,x.jsx)("td",{children:e.wko_det_con_cost}),(0,x.jsx)("td",{children:e.wko_det_est_mtl_cost}),(0,x.jsx)("td",{children:e.wko_det_mtl_cost}),(0,x.jsx)("td",{children:e.wko_det_est_lab_cost}),(0,x.jsx)("td",{children:e.wko_det_varchar1}),(0,x.jsx)("td",{children:e.wko_det_varchar2}),(0,x.jsx)("td",{children:e.wko_det_varchar3}),(0,x.jsx)("td",{children:e.wko_det_varchar4}),(0,x.jsx)("td",{children:e.wko_det_varchar5}),(0,x.jsx)("td",{children:e.wko_det_varchar6}),(0,x.jsx)("td",{children:e.wko_det_varchar7}),(0,x.jsx)("td",{children:e.wko_det_varchar8}),(0,x.jsx)("td",{children:e.wko_det_varchar9}),(0,x.jsx)("td",{children:e.wko_det_varchar10}),(0,x.jsx)("td",{children:e.wko_det_numeric1}),(0,x.jsx)("td",{children:e.wko_det_numeric2}),(0,x.jsx)("td",{children:e.wko_det_numeric3}),(0,x.jsx)("td",{children:e.wko_det_numeric4}),(0,x.jsx)("td",{children:e.wko_det_numeric5}),(0,x.jsx)("td",{children:l}),(0,x.jsx)("td",{children:_}),(0,x.jsx)("td",{children:u}),(0,x.jsx)("td",{children:h}),(0,x.jsx)("td",{children:m}),(0,x.jsx)("td",{children:e.wko_mst_create_by}),(0,x.jsx)("td",{children:j})]},e.site_cd)}))})]})})]})})})]})}},1413:function(e,t,n){n.d(t,{Z:function(){return s}});var d=n(4942);function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(e);t&&(d=d.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,d)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){(0,d.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);
//# sourceMappingURL=210.3f32a296.chunk.js.map