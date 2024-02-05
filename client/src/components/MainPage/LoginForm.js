// lets me use react library
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, useFormik, ErrorMessage } from "formik";
//yup is needed for schema => yup tells formik this is the structure & takes care of validations
import * as yup from "yup";
// remember . represents current directory - this location
// remember .. representsthe parent directory - one level up
import '../../styling/LoginForm.css'


// declares a component - each component is a function - making a separate component for the login form
function LoginForm() {
    const navigate = useNavigate()

    const location = useLocation();

    //for debugging to check path location 
    useEffect(() => {
        console.log('Current pathname:', location.pathname);
    }, [location]);



    // it is going to be an object and that shape of that object will have a bunch of stuff like title or username etc
    // form schema the structure of the JSON that is going to be sent with user's post request save here
    const schema = yup.object().shape({
        // username (type string) is required and if no username will get that error message
        username: yup.string()
            .min(5, "Username is too short")
            .max(20, "Username is too long")
            .matches(/[A-Z]/, "Must contain an uppercase letter")
            .required("Username is required"),

        email: yup.string()
            .min(5, "Email is too short")
            .max(30, "Email too long")
            .required("Email is required")

    })

    // now need to actully use it with the useFormik hook - and takes in a few things:
    // the intial values of the form, the validation schema to take into account and the onsubmit handler
    // useFormik hook helps manage from stae and form submissions
    const formik = useFormik({
        // setting up initial values so that when the login form loads it is empty
        initialValues: {
            username: '',
            email: ''
        },
        // validation schema need to use here is the form schema from above
        validationSchema: schema,
        // here is where I start to define what happens when a form is submitted
        onSubmit: () => {
            // here is were post request is made but not posting a new user I want to get user
            // I am sending request to the backend server /users url to fecth all the user data
            // console.log(values)
            fetch(`/users`)
                // here is the response is successful it will convert the response (res) to JSON notation
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Invalid credentials");
                })
                // here I am processing the returned JSON data and if it was successfully fetch it will navigate to the
                // the next frontend route which is /UserProfile
                .then((data) => {
                    // also passing along the user data retrieved - so that when a user clicks login and is navigated to /UserProfile
                    // the currentUser data is available 
                    navigate(`/User-Profile`, {
                        state: { currentUser: data },
                    });
                })
                //if any errors - errors will be longed to the console
                .catch((error) => {
                    console.log(error.message);
                });
        },
    });


    // now that schema/validations/hook is in place need to put everything inside jsx
    return (
        <div className="login-container">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <input
                        id="username"
                        name="username"
                        typer="test"
                        placeholder="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username && <p className="error">{formik.errors.username}</p>}
                </div>
                <div className="input-group">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <p className="error">{formik.errors.email}</p>}
                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// need to export the fucnction aka component if and when other components may want to use
export default LoginForm;

// need to also import LoginForm  to Login.js