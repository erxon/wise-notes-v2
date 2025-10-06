import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";
import Email from "./pages/Profile/Email";
import Password from "./pages/Profile/Password";
import AskAI from "./pages/AskAI/AskAI";
import Notebook from "./pages/Notebooks/Notebook";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Bin from "./pages/Bin/Bin";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    Component: Signin,
  },
  {
    path: "/sign-up",
    Component: Signup,
  },
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/bin",
    Component: Bin,
  },
  {
    path: "/profile",
    children: [
      { index: true, Component: Profile },
      { path: "email", Component: Email },
      { path: "password", Component: Password },
    ],
  },
  {
    path: "/ask-ai",
    children: [
      { index: true, Component: AskAI },
      { path: ":id", Component: AskAI },
    ],
  },
  {
    path: "/notebooks/:id",
    Component: Notebook,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
