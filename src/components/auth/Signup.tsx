import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { passwordValidation } from "./helpers/password-validation";

type TFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: TFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: passwordValidation,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = values; // Disable unused-vars rule here

      setSubmitting(false);
      setLoading(true);

      try {
        const { data } = await axios.post(`${apiUrl}/auth/signup`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log({ data });
        formik.resetForm();
        enqueueSnackbar("Signup Successful!", { variant: "success" });
        navigate("/login");
      } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
        console.log({ error });
        enqueueSnackbar(error.response?.data?.message || error.message, {
          variant: "error",
        });
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <AuthLayout title="Signup">
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", marginTop: "15px" }}
      >
        <TextField
          fullWidth
          type="text"
          label="Name*"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          type="text"
          label="Email*"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          sx={{ marginBottom: 2 }}
        />

        <TextField
          type="password"
          fullWidth
          label="Password*"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          sx={{ marginBottom: 2 }}
        />

        <TextField
          type="password"
          fullWidth
          label="Confirm Password*"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={Boolean(
            formik.touched.confirmPassword && formik.errors.confirmPassword,
          )}
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""
          }
          sx={{ marginBottom: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup"}
        </Button>

        <Typography variant="body1" textAlign="center" sx={{ marginTop: 3 }}>
          Already have an account?
          <Link
            to="/login"
            style={{ fontWeight: "bold", marginLeft: 8, color: "inherit" }}
          >
            Login
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default Signup;
