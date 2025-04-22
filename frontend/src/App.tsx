import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/Login"));
const DashboardWeather = lazy(() => import("./pages/DashboardWeather"));
const DashboardDisaster = lazy(() => import("./pages/DashboardDisaster"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const NotFound = lazy(() => import("./pages/Notfound"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard/weather" element={<DashboardWeather />} />
          <Route path="/dashboard/disaster" element={<DashboardDisaster />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="*" element={<NotFound />} />
        </Suspense>
      </Routes>
    </Router>
  );
};
export default App;
