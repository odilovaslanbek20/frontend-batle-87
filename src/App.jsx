import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layout/main-layout'
import LoginPage from './pages/Auth/login'
import RegisterPage from './pages/Auth/register'
import DashboardPage from './pages/dashboard/dashboardPage'
import ProtectedRoute from './components/Auth/protected/protected-route'
import PublicOnlyRoute from './components/Auth/protected/public-only'
import Profile from './components/Dashboard/profile'
import NotFoundPage from './pages/Notfound/not-found-page'
import Groups from './pages/dashboard/groups'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="register" element={ <PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>}/>
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}>
          <Route index element={<Profile />} />
          <Route path='group' element={<Groups />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
