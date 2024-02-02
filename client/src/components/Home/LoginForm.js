// lets me use react library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik, ErrorMessage } from "formik";
//yup is needed for schema => yup tells formik this is the structure & takes care of validations
import * as yup from "yup";


// declares a component - each component is a function - making a separate component for the login form
function LoginForm() {
    const navigate = useNavigate()

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
    const formik = useFormik({
        initialValues: {
            username: '',
            email: ''
        },
        // validation schema need to use here is the form schema from abaove
        validationSchema: schema,
        onSubmit: () => {
            // here is were post request is made but not posting a new user I want to get user
            // console.log(values)
            fetch(`/users`)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Invalid credentials");
                })
                .then((data) => {
                    navigate(`/UserProfile`, {
                        state: { currentUser: data },
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
    });


    // now that schema/validations/hook is in place need to put everything inside jsx
    return (
        <div className="login">
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