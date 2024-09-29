import { useState } from "react";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import { HttpRequest } from "../helpers/http-request-class.helper";
import AppForm from "./common/AppForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const LoginForm = () => {
  const [step, setStep] = useState(1);
  const [validationToken, setValidationToken] = useState("");
  const { setTokens } = useAuth();
  const navigate = useNavigate();

  const getValidationToken = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/get-validation-token", {
      phone: data.phone,
    });
    if (response?.data?.validationToken) {
      setValidationToken(response.data.validationToken);
      setStep((prevStep) => prevStep + 1); // Update step based on previous state
    }
  };

  const loginOrRegister = async (data: any) => {
    const response = await HttpRequest.post("/v1/auth/login-or-register", {
      validationToken,
      code: data.code,
    });
    if (response?.data) {
      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      // navigate("/");
    }
  };

  const onSubmit = async (data: any) => {
    if (step == 1) {
      getValidationToken(data);
    } else {
      loginOrRegister(data);
    }
  };

  // Validation schema for step 1 (phone)
  const step1ValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
  });

  // Validation schema for step 2 (code)
  const step2ValidationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .length(4, "Code must be exactly 6 characters"), // Adjust length as needed
  });

  return (
    <div
      className="w-1/2 flex justify-center items-center mx-auto my-5"
      key={step}
    >
      <AppForm
        onSubmit={onSubmit}
        validationSchema={
          step == 1 ? step1ValidationSchema : step2ValidationSchema
        }
      >
        {step == 1 ? (
          <TextInput
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        ) : (
          <TextInput
            name="code"
            type="text"
            placeholder="Enter the given code"
          />
        )}
        <Button color="primary" type="submit">
          Confirm
        </Button>
      </AppForm>
    </div>
  );
};

export default LoginForm;
