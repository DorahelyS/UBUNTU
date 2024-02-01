// lets me use react library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";


// declares a component - each component is a function - making a separate component for the login form
function LoginForm() {
    
}
  
// need to export the fucnction aka component if and when other components may want to use
export default LoginForm;

// need to also import LoginForm  to Login.js