import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile/Profile";
import Email from "./pages/Profile/Email";
import Password from "./pages/Profile/Password";
import AskAI from "./pages/AskAI/AskAI";
import Chat from "./pages/AskAI/Chat/Chat";
import Notebook from "./pages/Notebooks/Notebook";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
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
      { path: ":id", Component: Chat },
    ],
  },
  {
    path: "/notebook/:id",
    Component: Notebook,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
