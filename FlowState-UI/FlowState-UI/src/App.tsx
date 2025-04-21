import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./app/Auth/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./app/redux/themeSlice";
import LoginPage from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import ThemeToggleButton from "./shared/components/ThemeToggleButton";
import AuthLayout from "./shared/layout/AuthLayout";
import { RootState } from "./app/redux/store";
import DashboardPage from "./pages/DashboardPage";

function PrivateRoute({ children }: { children: React.JSX.Element }) {
  const { isLogged, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return isLogged ? children : <Navigate to="/welcome" replace />;
}

export default function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      <ThemeToggleButton />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AuthLayout>
                  <DashboardPage />
                </AuthLayout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
