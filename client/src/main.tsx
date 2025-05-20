import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import AskAI from "./pages/AskAI/AskAI";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { ThemeProvider } from "./components/theme-provider";
import Chat from "./pages/AskAI/Chat/Chat";
import Profile from "./pages/Profile/Profile";
import Email from "./pages/Profile/Email";
import Password from "./pages/Profile/Password";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/ask-ai/:id" element={<Chat />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/email" element={<Email />} />
          <Route path="/profile/password" element={<Password />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
