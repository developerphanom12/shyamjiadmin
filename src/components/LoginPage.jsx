import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../assets/logo.png";
import "./loginpage.css";
import sideCut from "../assets/Vector 95.png";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/auth/useLogin";

const LoginPage = () => {
    const { adminLogin} = useLogin();
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  // Initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // Handle submit
 // Handle submit
const handleSubmit = async (values) => {
  console.log("Form Data:", values);
  try {
    await adminLogin(values.email, values.password); // ✅ correct
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="login-container fullScreen">
      {/* ---------------- Left Section ---------------- */}
      <div className="login-left">
        <div className="yellow-section">
          <img src={sideCut} alt="" className="side-cut" />
          <div className="content">
            <img src={logo} alt="Shyam-G Logo" className="login-logo" />
            <h1 className="title">
              The Best Snack <br /> Manufacturing in India
            </h1>
            <p className="description">
              Shyam-G Snacks has emerged as a shining star in the vibrant and
              diverse world of snacks. Renowned as a leading snacks manufacturer
              in India, Shree Shyam Snacks Food Private Limited, known as Shyam-G
              Snacks, has carved a niche through its commitment to quality and a
              wide array of delectable snack offerings.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- Right Section ---------------- */}
      <div className="login-right">
        <div className="login-card">
          <h2>Login</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label>Username</label>
              <Field
                type="email"
                name="email"
                placeholder="admin@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="p"
                style={{ color: "red", fontSize: "14px" }}
              />

              <label>Password</label>
              <Field
                type="password"
                name="password"
                placeholder="••••••••"
              />
              <ErrorMessage
                name="password"
                component="p"
                style={{ color: "red", fontSize: "14px" }}
              />

              <div className="forgot">
                <a href="#">Forget Password?</a>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
