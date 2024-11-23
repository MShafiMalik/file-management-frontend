import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { passwordValidation } from "./helpers/password-validation";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/features/authSlice";

type TFormValues = { email: string; password: string };

const initialValues: TFormValues = { email: "", password: "" };

const Login = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: passwordValidation,
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false);
      setLoading(true);

      try {
        const {
          data: { accessToken, user },
        } = await axios.post(`${apiUrl}/auth/login`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        dispatch(
          login({
            user,
            token: accessToken,
          }),
        );

        formik.resetForm();
        enqueueSnackbar("Login Successful!", { variant: "success" });
        navigate("/");
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
    <AuthLayout title="Login">
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", marginTop: "15px" }}
      >
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
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>

        <Typography variant="body1" textAlign="center" sx={{ marginTop: 3 }}>
          Don&rsquo;t have an account?
          <Link
            to="/signup"
            style={{ fontWeight: "bold", marginLeft: 8, color: "inherit" }}
          >
            Sign Up
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default Login;
