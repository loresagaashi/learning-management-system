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
import StudentPage from "../page/student/StudentPage";
import LMSPage from "../page/student/LMS/LMSPage";
import SMISPage from "../page/student/SMIS/SMISPage";
import ForgotPassword from "../page/ForgotPassword";
import ResetPassword from "../page/ResetPassword";
import LMSPageProfessor from "../page/professor/LMS/LMSPageProfessor";
import SMISPageProfessor from "../page/professor/SMIS/SMISPageProfessor";
import CoursesView from "../page/professor/SMIS/CoursesView";
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
  <Route path="/student/page" element={<StudentPage />} />,
  <Route path="/student/lms" element={<LMSPage />} />,
  <Route path="/student/smis" element={<SMISPage />} />,

  <Route path="/professor/lms" element={<LMSPageProfessor />} />,
  <Route path="/professor/smis" element={<SMISPageProfessor />} />,
  <Route path="/forgot-password" element={<ForgotPassword />} />,
  <Route path="/reset-password" element={<ResetPassword />} />,
  <Route path="/professor/courses" element={<CoursesView />} />,
 
  // <Route key={11} path="/client/sign-in" element={<ClientSignIn />} />,
  // <Route key={11} path="/client/sign-up" element={<ClientSignUp />} />,
  // <Route key={11} path="/client/profile" element={<ClientProfile />} />,
  // <Route key={11} path="/payment/success" element={<PaymentSuccess />} />,
];

export default AppRoutes;