"use strict";(self.webpackChunkcmms=self.webpackChunkcmms||[]).push([[1287],{11287:function(t,e,n){n.r(e);var i=n(42982),s=n(45987),r=n(1413),d=n(70885),c=n(72791),a=n(91951),o=n(28742),l=n(72567),m=n(36501),u=n(21830),_=n.n(u),h=n(49643),x=n(80184),j=["indeterminate","onChange"];e.default=function(t){var e=c.useState([]),n=(0,d.Z)(e,2),u=n[0],b=n[1],p=c.useState([]),f=(0,d.Z)(p,2),y=f[0],v=f[1],g=c.useState([]),w=(0,d.Z)(g,2),N=w[0],C=w[1],M=(0,o.k6)(),S=(0,c.useState)(!1),Z=(0,d.Z)(S,2),O=Z[0],k=(Z[1],(0,c.useState)()),L=(0,d.Z)(k,2),D=(L[0],L[1],(0,c.useState)(1)),H=(0,d.Z)(D,2),I=H[0],E=H[1],P=(0,c.useState)(""),F=(0,d.Z)(P,2),R=F[0],B=F[1],A=(0,c.useState)(10),T=(0,d.Z)(A,2),q=T[0],U=T[1],W=(0,c.useState)(""),J=(0,d.Z)(W,2),V=J[0],Y=J[1],z=(0,c.useState)(!1),G=(0,d.Z)(z,2),K=G[0],Q=G[1],X=(0,c.useState)(y.map((function(){return!1}))),$=(0,d.Z)(X,2),tt=$[0],et=$[1],nt=(0,c.useState)(!1),it=(0,d.Z)(nt,2),st=it[0],rt=it[1],dt=(0,c.useState)(null),ct=(0,d.Z)(dt,2),at=ct[0],ot=ct[1];(0,c.useEffect)((function(){var e=localStorage.getItem("site_ID");console.log(t.name),function(t){h.Z.get_inventorymaster(t,I,q).then((function(t){console.log("Login JSON DATA : ",t),"SUCCESS"===t.data.status?(console.log("RESPONSE",t.data.data.header),console.log(t.data.totalPages),B(t.data.totalPages),b(t.data.data.header),v(t.data.data.result),C(t.data.data.result)):_().fire({icon:"error",title:"Oops...",text:t.data.message})})).catch((function(t){console.log(t),_().fire({icon:"error",title:"Oops get_sitecode...",text:t})}))}(e)}),[I,q]);var lt=c.forwardRef((function(t,e){var n=t.indeterminate,i=t.onChange,d=(0,s.Z)(t,j),a=c.useRef(),o=e||a;c.useEffect((function(){o.current.indeterminate=n}),[o,n]);return(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("input",(0,r.Z)({type:"checkbox",ref:o,onChange:function(t){i(t)}},d))})})),mt=function(){Q(!K),et(y.map((function(){return!K})))},ut=function(t){var e=(0,i.Z)(tt);e[t]=!tt[t],et(e)};(0,c.useEffect)((function(){var t=tt.some((function(t){return t}));rt(t)}),[tt]);var _t=function(t){console.log(t),M.push("/InventoryFrom-1",{RowID:t.RowID})},ht=function(){M.push("/InventoryFrom-1",{select:"New_Inventory"})},xt=function(t){M.push("/InventoryFrom-1",{RowID:t.RowID})},jt=function(t){_().fire({title:"Warning",text:"Are you sure you want to delete the record?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes",cancelButtonText:"No"}).then((function(t){t.value}))};return(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{className:"page-header",children:(0,x.jsx)("h3",{className:"page-title",children:"Inventory"})}),(0,x.jsx)("div",{children:(0,x.jsx)("div",{className:"card",children:(0,x.jsxs)("div",{className:"card-body",children:[(0,x.jsxs)("div",{className:"page-header",children:[(0,x.jsx)("div",{className:"template-demo",children:(0,x.jsxs)("div",{className:"btn-group",role:"group","aria-label":"Basic example",children:[(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary",children:(0,x.jsx)("i",{className:"mdi mdi mdi-code-equal"})}),(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary",children:(0,x.jsx)("i",{className:"mdi mdi mdi-credit-card"})}),(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary",children:(0,x.jsx)("i",{className:"mdi mdi-calendar"})})]})}),(0,x.jsx)("div",{className:"col",children:(0,x.jsx)(m.Z,{className:"form-control",onChange:function(t){return function(t){if(console.log(t),Y(t),""==t)v(N);else{var e=N.filter((function(e){return e.itm_mst_type.toLowerCase().includes(t.toLowerCase())||e.itm_mst_stockno.toLowerCase().includes(t.toLowerCase())||e.itm_mst_mstr_locn.toLowerCase().includes(t.toLowerCase())||e.itm_mst_costcenter.toLowerCase().includes(t.toLowerCase())||e.itm_mst_itm_grp.toLowerCase().includes(t.toLowerCase())||e.itm_mst_com_code.toLowerCase().includes(t.toLowerCase())||e.itm_mst_account.toLowerCase().includes(t.toLowerCase())||e.itm_mst_desc.toLowerCase().includes(t.toLowerCase())||e.itm_mst_partno.toLowerCase().includes(t.toLowerCase())}));v(e)}}(t)},value:V})}),(0,x.jsx)("div",{className:"col",children:(0,x.jsx)("button",{type:"button",className:"btn btn-primary btn-rounded",children:"Search"})}),(0,x.jsx)("nav",{"aria-label":"breadcrumb",children:(0,x.jsx)("ol",{className:"breadcrumb",children:(0,x.jsxs)("div",{className:"template-demo",children:[(0,x.jsx)("button",{type:"button",className:"btn btn-outline-secondary btn-rounded btn-icon",children:(0,x.jsx)("i",{className:"mdi mdi-filter"})}),(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-primary btn-icon-text",children:[(0,x.jsx)("i",{className:"mdi mdi-mixcloud btn-icon-prepend"})," ","quick filter"]})]})})})]}),(0,x.jsxs)("div",{className:"page-header",children:[(0,x.jsxs)("div",{className:"template-demo",isVisible:O,children:[(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-primary btn-icon-text",onClick:ht,children:[(0,x.jsx)("i",{className:"mdi mdi-file-check btn-icon-prepend"})," New Inventory"]}),st&&(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-success btn-icon-text",onClick:ht,children:[(0,x.jsx)("i",{className:"mdi mdi-file-document btn-icon-prepend"})," Edit"]}),O&&(0,x.jsxs)("button",{type:"button",className:"btn btn-outline-danger btn-icon-text",children:[(0,x.jsx)("i",{className:"mdi mdi-delete-forever btn-icon-prepend"})," ","Delete"]})]}),(0,x.jsx)("nav",{"aria-label":"breadcrumb",children:(0,x.jsxs)("div",{className:"row",children:[(0,x.jsx)(l.Z,{count:R,page:I,siblingCount:1,boundaryCount:1,variant:"outlined",shape:"rounded",onChange:function(t,e){E(e)}}),(0,x.jsx)("select",{onChange:function(t){U(t.target.value),E(1)},value:q,children:[10,20,30,40,50].map((function(t){return(0,x.jsx)("option",{value:t,children:t},t)}))})]})})]}),(0,x.jsx)("div",{className:"table-responsive",children:(0,x.jsxs)("table",{className:"table table-hover table-bordered",style:{color:"#000",border:1},children:[(0,x.jsx)("thead",{style:{color:"#000",fontWeight:"bold",fontFamily:"montserrat",margin:"5px"},children:(0,x.jsx)("tr",{children:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("th",{children:(0,x.jsx)(lt,{checked:K,onChange:mt})},"select"),Object.keys(u).map((function(t){return(0,x.jsxs)("th",{children:[" ",t.toUpperCase()]},t)}))]})})}),(0,x.jsx)("tbody",{children:y.map((function(t,e){if(null==t.itm_det_datetime1)var n="";else n=(0,a.default)(new Date(t.itm_det_datetime1.date),"dd/MM/yyyy HH:MM");if(null==t.itm_det_datetime2)var i="";else i=(0,a.default)(new Date(t.itm_det_datetime2.date),"dd/MM/yyyy HH:MM");if(null==t.itm_det_datetime3)var s="";else s=(0,a.default)(new Date(t.itm_det_datetime3.date),"dd/MM/yyyy HH:MM");if(null==t.itm_det_datetime4)var d="";else d=(0,a.default)(new Date(t.itm_det_datetime4.date),"dd/MM/yyyy HH:MM");if(null==t.itm_det_datetime5)var c="";else c=(0,a.default)(new Date(t.itm_det_datetime5.date),"dd/MM/yyyy HH:MM");if(null==t.itm_mst_create_date)var o="";else o=(0,a.default)(new Date(t.itm_mst_create_date.date),"dd/MM/yyyy HH:MM");return(0,x.jsxs)("tr",{onDoubleClick:function(e){return _t(t,e)},onMouseEnter:function(){return ot(t)},onMouseLeave:function(){return ot(null)},style:{backgroundColor:at===t?"#BCC9F5":"white"},children:[(0,x.jsx)("td",{children:(0,x.jsx)(lt,(0,r.Z)((0,r.Z)({},t),{},{checked:tt[e],onChange:function(){return ut(e)}}))}),(0,x.jsx)("td",{children:t.itm_mst_type}),(0,x.jsxs)("td",{children:[t.itm_mst_stockno,"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",at===t&&(0,x.jsxs)("div",{className:"template-demo",children:[(0,x.jsx)("button",{type:"button",onClick:function(){return xt(t)},className:"btn btn-light btn-icon-text",title:"Edit",style:{padding:"5px"},children:(0,x.jsx)("i",{className:"mdi mdi-file-document btn-icon-prepend"})}),(0,x.jsx)("button",{type:"button",onClick:function(){return jt(t)},className:"btn btn-light btn-icon-text",title:"Delete",style:{padding:"5px"},children:(0,x.jsx)("i",{className:"mdi mdi-delete-forever btn-icon-prepend"})})]})]}),(0,x.jsx)("td",{children:t.itm_mst_mstr_locn}),(0,x.jsx)("td",{children:t.itm_mst_costcenter}),(0,x.jsx)("td",{children:t.itm_mst_itm_grp}),(0,x.jsx)("td",{children:t.itm_mst_itm_use}),(0,x.jsx)("td",{children:t.itm_mst_com_code}),(0,x.jsx)("td",{children:t.itm_mst_account}),(0,x.jsx)("td",{children:t.itm_mst_ttl_oh}),(0,x.jsx)("td",{children:t.itm_mst_desc}),(0,x.jsx)("td",{children:t.itm_mst_ext_desc}),(0,x.jsx)("td",{children:t.itm_mst_issue_price}),(0,x.jsx)("td",{children:t.itm_mst_order_rule}),(0,x.jsx)("td",{children:t.itm_mst_partno}),(0,x.jsx)("td",{children:t.itm_det_issue_uom}),(0,x.jsx)("td",{children:t.itm_det_rcv_uom}),(0,x.jsx)("td",{children:t.itm_det_auto_spare}),(0,x.jsx)("td",{children:t.itm_det_critical_spare}),(0,x.jsx)("td",{children:t.itm_det_abc_class}),(0,x.jsx)("td",{children:t.itm_det_storage_type}),(0,x.jsx)("td",{children:t.itm_det_tax_cd}),(0,x.jsx)("td",{children:t.itm_det_part_deac_status}),(0,x.jsx)("td",{children:t.itm_det_order_pt}),(0,x.jsx)("td",{children:t.itm_det_maximum}),(0,x.jsx)("td",{children:t.itm_det_ytd_stockouts}),(0,x.jsx)("td",{children:t.itm_det_std_cost}),(0,x.jsx)("td",{children:t.itm_det_avg_cost}),(0,x.jsx)("td",{children:t.itm_det_last_cost}),(0,x.jsx)("td",{children:t.itm_det_ttl_hard_resrv}),(0,x.jsx)("td",{children:t.itm_det_ttl_short}),(0,x.jsx)("td",{children:t.itm_det_ttl_repair}),(0,x.jsx)("td",{children:t.itm_det_varchar1}),(0,x.jsx)("td",{children:t.itm_det_varchar2}),(0,x.jsx)("td",{children:t.itm_det_varchar3}),(0,x.jsx)("td",{children:t.itm_det_varchar4}),(0,x.jsx)("td",{children:t.itm_det_varchar5}),(0,x.jsx)("td",{children:t.itm_det_varchar6}),(0,x.jsx)("td",{children:t.itm_det_varchar7}),(0,x.jsx)("td",{children:t.itm_det_varchar8}),(0,x.jsx)("td",{children:t.itm_det_varchar9}),(0,x.jsx)("td",{children:t.itm_det_varchar10}),(0,x.jsx)("td",{children:t.itm_det_numeric1}),(0,x.jsx)("td",{children:t.itm_det_numeric2}),(0,x.jsx)("td",{children:t.itm_det_numeric3}),(0,x.jsx)("td",{children:t.itm_det_numeric4}),(0,x.jsx)("td",{children:t.itm_det_numeric5}),(0,x.jsx)("td",{children:n}),(0,x.jsx)("td",{children:i}),(0,x.jsx)("td",{children:s}),(0,x.jsx)("td",{children:d}),(0,x.jsx)("td",{children:c}),(0,x.jsx)("td",{children:t.itm_mst_create_by}),(0,x.jsx)("td",{children:o})]},t.site_cd)}))})]})})]})})})]})}},1413:function(t,e,n){n.d(e,{Z:function(){return r}});var i=n(4942);function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){(0,i.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}}}]);
//# sourceMappingURL=1287.85cd2c7f.chunk.js.map