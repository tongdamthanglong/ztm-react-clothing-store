import React from "react";
import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.container.scss";

const defaultFormFields = {
  email: "",
  password: "",
};
// ##########################################

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  console.log(formFields);

  // ##########################################
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // distructure 'response' and take user
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();

      //*********CATCH ERROR********* */
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Incorrect email");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;

        default:
          console.log("Error: ", error.message);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // ##########################################

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
          {/* set là type button là vì khi ta submit form thì tất cả các button có default type đều là submit, để tránh điều này thì ta chủ động set type là button */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
