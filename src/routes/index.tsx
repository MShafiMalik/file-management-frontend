import loadable from "@loadable/component";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Protected from "./Protected";

const Login = loadable(() => import("../pages/LoginPage"));
const Signup = loadable(() => import("../pages/SignupPage"));
const Home = loadable(() => import("../pages/HomePage"));
const NotFound = loadable(() => import("../pages/NotFoundPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Protected Routes */}
      <Route element={<Protected />}>
        <Route index element={<Home />} />
      </Route>

      {/* Public Routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
