import "./App.css";
import { Toaster } from "react-hot-toast";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
// import SchoolCMS from "./pages/cms/dashboard";
import "./i18n";  // 🔹 add this line

function App() {
  return (
    <section>
      <Toaster position="top-right" reverseOrder={false} />

      <div>
        <Routes>
          <Route path="/*" element={<AdminPanel />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/cms" element={<SchoolCMS />} /> */}
          <Route path="*" element={<div>404 error, page not found.</div>} />
        </Routes>
      </div>
    </section>
  );
}

export default App;
