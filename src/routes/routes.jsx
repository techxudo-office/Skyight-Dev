import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { routesData } from "../data/routesData";
import toast from "react-hot-toast";

const AppRoutes = () => {
  const { userData } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth_token");

  useEffect(() => {
    if (!auth) {
      toast.success("Logout Successfully");
      navigate("/login", { replace: true });
    }
  }, [auth]);

  return (
    <Routes>
      {routesData.map((route, index) => {
        if (route.children) {
          return (
            <Route key={index} path={route.path} element={route.element}>
              {route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  index={child.index}
                  path={child.path}
                  element={
                    child.protected && !userData?.token ? (
                      <Navigate to="/login" replace />
                    ) : (
                      child.element
                    )
                  }
                />
              ))}
            </Route>
          );
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected && !userData?.token ? (
                <Navigate to="/login" replace />
              ) : (
                route.element
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
