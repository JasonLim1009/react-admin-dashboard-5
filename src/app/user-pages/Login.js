import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import APIServices from "../services/APIServices";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo_images from '../../assets/images/Sample.png';


const Login = () => {
  const history = useHistory();

  const [site_code, setsite_code] = React.useState([]);
  const [validated, setValidated] = React.useState(false);

  const [Username, setUsername] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState("");
  const [site_ID, setsite_ID] = React.useState("");
  const [site_name, setsite_name] = React.useState("");

  const [errors, seterrors] = React.useState([]);

  const [showImage, setShowImage] = useState(true);


  const retrieveAPI = () => {
    APIServices.get_sitecode()
      .then((responseJson) => {
        console.log(responseJson, "JSON DATA");
        if (responseJson.data.status === "SUCCESS") {
          console.log(responseJson.data.status);

          let cities = responseJson.data.data.map((item) => ({
            label: item.site_name,
            value: item.site_cd,
          }));
          setsite_code(cities);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops get_sitecode123...",
            text: responseJson.message,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  useEffect(() => {
    retrieveAPI();

    function handleResize() {
      setShowImage(window.innerWidth >= 768);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    //console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (site_ID === "") {
        console.log("EMPTY");

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please Select Site Code",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        authenticate_login();
      }
      //
    }
    setValidated(true);
  };

  const authenticate_login = () => {
    APIServices.authenticate_login(Username, Password, site_ID)
      .then((responseJson) => {
        console.log("Login JSON DATA : ", responseJson);

        if (responseJson.data.status === "SUCCESS") {
          console.log(responseJson.status);
          localStorage.setItem("site_ID", site_ID);

          console.log(responseJson.data.data.emp_mst_login_id);
          console.log(responseJson.data.data.emp_mst_empl_id);
          console.log(responseJson.data.data.emp_mst_name);
          console.log(responseJson.data.data.wkr_mst_wr_status);
          localStorage.setItem(
            "wkr_mst_wr_status",
            responseJson.data.data.wkr_mst_wr_status
          );
          localStorage.setItem(
            "emp_mst_login_id",
            responseJson.data.data.emp_mst_login_id
          );
          localStorage.setItem(
            "emp_mst_empl_id",
            responseJson.data.data.emp_mst_empl_id
          );
          localStorage.setItem(
            "emp_mst_name",
            responseJson.data.data.emp_mst_name
          );

          localStorage.setItem("site_name", site_name);

          history.push("/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: responseJson.data.message,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops get_sitecode...",
          text: e,
        });
      });
  };

  const handleChange = (e) => {
    // this.setState({id:e.value, name:e.label})
    setsite_ID(e.value);
    setsite_name(e.label);
   
    console.log({ id: e.value, name: e.label });
  };
  


  
  return (
    <div className="content-wrapper">
      <div className="d-flex align-items-center auth px-0 bg-white">

        <div className="container-fluid">

          {/* <header className="header">
            <div className="brand-logo" >
              <img src={require("../../assets/images/logo.png")} alt="logo" width="100" height="85" />
            </div>
          </header> */}

          <div className="row">
            <div className="row w-100 mx-0">

              <div className="col-lg-3 mx-auto">
                {showImage && (
                  <img id="login-image" src={logo_images} alt="logo" width="500" height="600" />
                )}
              </div>
              
              <div className="col-lg-5 mx-auto">
                <div className="auth-form-light text-left py-4 px-4 px-sm-5">

                <div className="brand-logo" >
                  <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>

                  <h3>Hello! let's get started</h3>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <Form className="pt-3" noValidatevalidated={validated} onSubmit={handleSubmit}>

                    <Form.Group md="6" controlId="validationCustomUsername">
                      <Form.Label><span style={{ color: "red" }} class="required-asterisk">*</span> Username </Form.Label>
                      <div className="col-md-10">
                      <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                      </div>
                      <Form.Control.Feedback type="invalid"> Please provide username. </Form.Control.Feedback>
                    </Form.Group>
                    

                    <Form.Group md="6" controlId="validationCustomPassword">
                      <Form.Label>
                        <span style={{ color: "red" }} class="required-asterisk">
                          *{" "}
                        </span>
                        Password{" "}
                      </Form.Label>

                      <div className="col-md-10">
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />

                        <InputGroup.Append>
                          <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                      </div>


                      <Form.Control.Feedback type="invalid">
                        Please provide password.
                      </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="validationsite_code">
                      <Form.Label>
                        <span style={{ color: "red" }} class="required-asterisk">
                          *{" "}
                        </span>
                        Site Code{" "}
                      </Form.Label>
                      {/* <Form.Control as="select" type="select" options={site_code}  value ={site_code} onChange={(e)=> handleChange(e)}  required /> */}
                      <div className="col-md-10">
                        <Select
                          options={site_code}
                          onChange={(e) => handleChange(e)}
                          required
                          error={true}
                        />
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Please provide password.
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    {/* <hr align="left" width="80%"/> */}

                    <div className="mt-3">
                      <div className="col-md-10">
                        <Button
                        style={{padding:".65rem"}}
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </div>
                  </Form>

                  <div className="col-md-10">
                    <div style={{ padding: "1px 0"}}>
                      <a href="#" style={{ fontSize: "13px" }}>Forgotten your password?</a>
                    </div>
                    <div style={{ padding: "32px 0"}}></div>
                  </div>

                </div>
              </div>
              
            </div>
          </div>

          <footer className="footer bg-white">
            <hr />
            <div className="d-sm-flex justify-content-center align-items-center font-weight-bold">
              <span className="mr-2">&copy; 2023 Evantage Solution Sdn. Bhd. v2.21.3.</span>
              <a href="https://evantage.com.my/" style={{ color: "#324F91" }}>Go to Website</a>
            </div>
          </footer>

        </div>
      
      </div>
    </div>
  );
};

export default Login;
