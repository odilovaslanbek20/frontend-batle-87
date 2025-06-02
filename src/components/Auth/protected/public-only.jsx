import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"

PublicOnlyRoute.propTypes  = {
  children: PropTypes.node.isRequired
}
export default function PublicOnlyRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}
