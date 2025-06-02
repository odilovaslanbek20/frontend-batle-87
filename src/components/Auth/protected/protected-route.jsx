import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"

ProtectedRoute.propTypes  = {
  children: PropTypes.node.isRequired
}
export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token")
  return isAuthenticated ? children : <Navigate to="/" />
}
