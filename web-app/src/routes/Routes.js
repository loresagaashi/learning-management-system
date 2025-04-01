import { Navigate, Route } from "react-router-dom";
import AdminSignIn from "../page/admin/AdminSignIn";
// import ClientSignIn from "../page/client/ClientSignIn";
// import AdminLayout from "../page/admin/AdminLayout";
// import ClientLayout from "../page/client/ClientLayout";
// import ClientSignUp from "../page/client/ClientSignUp";
import PrivateRoute from "../component/PrivateRoute";
import AdminLayout from "../page/admin/AdminLayout";
import SignInChoicePage from "../page/SignInChoicePage";
import StudentSignIn from "../page/student/StudentSignIn";
import ProfessorSignIn from "../page/professor/ProfessorSignIn";
// import ClientProfile from "../page/client/ClientProfile";
// import PaymentSuccess from "../component/PaymentSuccess";

const AppRoutes = [
  <Route
    key={1}
    path="/"
    exact
    element={<Navigate replace to={"/choice/sign-in"} />}
  />,

  <Route
    key={1}
    path="/choice/sign-in"
    exact
    element={<SignInChoicePage />}
  />,

  // <Route key={2} path="/client/home" element={<ClientLayout />} />,
  // Admin routes
  <Route key={11} path="/admin/*" element={<PrivateRoute element={AdminLayout}/>} />,
  // // Other routes
  <Route key={11} path="/admin/sign-in" element={<AdminSignIn />} />,
  <Route key={11} path="/choice/sign-in" element={<SignInChoicePage />} />,
  <Route key={11} path="/student/sign-in" element={<StudentSignIn />} />,
  <Route key={11} path="/professor/sign-in" element={<ProfessorSignIn />} />,
  // <Route key={11} path="/client/sign-in" element={<ClientSignIn />} />,
  // <Route key={11} path="/client/sign-up" element={<ClientSignUp />} />,
  // <Route key={11} path="/client/profile" element={<ClientProfile />} />,
  // <Route key={11} path="/payment/success" element={<PaymentSuccess />} />,
];

export default AppRoutes;