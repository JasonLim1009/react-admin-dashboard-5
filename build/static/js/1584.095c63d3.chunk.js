"use strict";(self.webpackChunkcmms=self.webpackChunkcmms||[]).push([[1584],{11584:function(e,t,s){s.r(t);var a=s(70885),o=s(72791),n=s(94912),l=s(99410),i=s(43360),r=s(14484),d=s(28742),c=s(49643),m=s(16772),u=s.n(m),h=(s(21397),s(59135)),p=s(66721),x=s(80184);t.default=function(){var e=(0,d.k6)(),t=o.useState([]),m=(0,a.Z)(t,2),g=m[0],j=m[1],f=o.useState(!1),v=(0,a.Z)(f,2),_=v[0],S=v[1],w=o.useState(""),Z=(0,a.Z)(w,2),b=Z[0],N=Z[1],y=o.useState(""),C=(0,a.Z)(y,2),k=C[0],I=C[1],P=o.useState(""),q=(0,a.Z)(P,2),E=q[0],L=q[1],O=o.useState(""),A=(0,a.Z)(O,2),F=A[0],U=A[1],D=o.useState(""),G=(0,a.Z)(D,2),T=G[0],z=G[1],B=o.useState([]),J=(0,a.Z)(B,2),V=(J[0],J[1],(0,o.useState)(!0)),W=(0,a.Z)(V,2),H=W[0],M=W[1];(0,o.useEffect)((function(){function e(){M(window.innerWidth>=768)}return c.Z.get_sitecode().then((function(e){if(console.log(e,"JSON DATA"),"SUCCESS"===e.data.status){console.log(e.data.status);var t=e.data.data.map((function(e){return{label:e.site_name,value:e.site_cd}}));j(t)}else u().fire({icon:"error",title:"Oops get_sitecode123...",text:e.message})})).catch((function(e){console.log(e),u().fire({icon:"error",title:"Oops get_sitecode...",text:e})})),window.addEventListener("resize",e),e(),function(){window.removeEventListener("resize",e)}}),[]);var Y=function(){c.Z.authenticate_login(b,k,F).then((function(t){console.log("Login JSON DATA : ",t),"SUCCESS"===t.data.status?(console.log(t.status),localStorage.setItem("site_ID",F),console.log(t.data.data.emp_mst_login_id),console.log(t.data.data.emp_mst_empl_id),console.log(t.data.data.emp_mst_name),console.log(t.data.data.wkr_mst_wr_status),localStorage.setItem("wkr_mst_wr_status",t.data.data.wkr_mst_wr_status),localStorage.setItem("emp_mst_login_id",t.data.data.emp_mst_login_id),localStorage.setItem("emp_mst_empl_id",t.data.data.emp_mst_empl_id),localStorage.setItem("emp_mst_name",t.data.data.emp_mst_name),localStorage.setItem("site_name",T),e.push("/dashboard")):u().fire({icon:"error",title:"Oops...",text:t.data.message})})).catch((function(e){console.log(e),u().fire({icon:"error",title:"Oops get_sitecode...",text:e})}))};return(0,x.jsx)("div",{className:"content-wrapper",children:(0,x.jsx)("div",{className:"d-flex align-items-center auth px-0 bg-white",children:(0,x.jsxs)("div",{className:"container-fluid",children:[(0,x.jsx)("div",{className:"row",children:(0,x.jsxs)("div",{className:"row w-100 mx-0",children:[(0,x.jsx)("div",{className:"col-lg-3 mx-auto",children:H&&(0,x.jsx)("img",{id:"login-image",src:p,alt:"logo",width:"500",height:"600"})}),(0,x.jsx)("div",{className:"col-lg-5 mx-auto",children:(0,x.jsxs)("div",{className:"auth-form-light text-left py-4 px-4 px-sm-5",children:[(0,x.jsx)("div",{className:"brand-logo",children:(0,x.jsx)("img",{src:s(74427),alt:"logo"})}),(0,x.jsx)("h3",{children:"Hello! let's get started"}),(0,x.jsx)("h6",{className:"font-weight-light",children:"Sign in to continue."}),(0,x.jsxs)(n.Z,{className:"pt-3",noValidatevalidated:_,onSubmit:function(e){e.preventDefault(),!1===e.currentTarget.checkValidity()?e.stopPropagation():""===F?(console.log("EMPTY"),u().fire({position:"top-end",icon:"error",title:"Please Select Site Code",showConfirmButton:!1,timer:3e3})):Y(),S(!0)},children:[(0,x.jsxs)(n.Z.Group,{md:"6",controlId:"validationCustomUsername",children:[(0,x.jsxs)(n.Z.Label,{children:[(0,x.jsx)("span",{style:{color:"red"},class:"required-asterisk",children:"*"})," Username "]}),(0,x.jsx)("div",{className:"col-md-10",children:(0,x.jsx)(n.Z.Control,{type:"text",placeholder:"Username",onChange:function(e){return N(e.target.value)},required:!0})}),(0,x.jsx)(n.Z.Control.Feedback,{type:"invalid",children:" Please provide username. "})]}),(0,x.jsxs)(n.Z.Group,{md:"6",controlId:"validationCustomPassword",children:[(0,x.jsxs)(n.Z.Label,{children:[(0,x.jsxs)("span",{style:{color:"red"},class:"required-asterisk",children:["*"," "]}),"Password"," "]}),(0,x.jsx)("div",{className:"col-md-10",children:(0,x.jsxs)(l.Z,{children:[(0,x.jsx)(n.Z.Control,{type:E?"text":"password",placeholder:"Password",onChange:function(e){return I(e.target.value)},required:!0}),(0,x.jsx)(l.Z.Append,{children:(0,x.jsx)(i.Z,{variant:"outline-secondary",onClick:function(){return L(!E)},children:E?(0,x.jsx)(h.tgn,{}):(0,x.jsx)(h.dSq,{})})})]})}),(0,x.jsx)(n.Z.Control.Feedback,{type:"invalid",children:"Please provide password."})]}),(0,x.jsxs)(n.Z.Group,{className:"mb-3",controlId:"validationsite_code",children:[(0,x.jsxs)(n.Z.Label,{children:[(0,x.jsxs)("span",{style:{color:"red"},class:"required-asterisk",children:["*"," "]}),"Site Code"," "]}),(0,x.jsx)("div",{className:"col-md-10",children:(0,x.jsx)(r.ZP,{options:g,onChange:function(e){return function(e){U(e.value),z(e.label),console.log({id:e.value,name:e.label})}(e)},required:!0,error:!0})}),(0,x.jsx)(n.Z.Control.Feedback,{type:"invalid",children:"Please provide password."})]}),(0,x.jsx)("div",{className:"mt-3",children:(0,x.jsx)("div",{className:"col-md-10",children:(0,x.jsx)(i.Z,{style:{padding:".65rem"},className:"btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn",type:"submit",children:"Login"})})})]}),(0,x.jsxs)("div",{className:"col-md-10",children:[(0,x.jsx)("div",{style:{padding:"1px 0"},children:(0,x.jsx)("a",{href:"#",style:{fontSize:"13px"},children:"Forgotten your password?"})}),(0,x.jsx)("div",{style:{padding:"32px 0"}})]})]})})]})}),(0,x.jsxs)("footer",{className:"footer bg-white",children:[(0,x.jsx)("hr",{}),(0,x.jsxs)("div",{className:"d-sm-flex justify-content-center align-items-center font-weight-bold",children:[(0,x.jsx)("span",{className:"mr-2",children:"\xa9 2023 Evantage Solution Sdn. Bhd. v2.21.3."}),(0,x.jsx)("a",{href:"https://evantage.com.my/",style:{color:"#324F91"},children:"Go to Website"})]})]})]})})})}},66721:function(e,t,s){e.exports=s.p+"static/media/Sample.ec817478eff2d3602cd2.png"}}]);
//# sourceMappingURL=1584.095c63d3.chunk.js.map