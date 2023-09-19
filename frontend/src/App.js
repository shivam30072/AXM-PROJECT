import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import Userpage from "./Pages/Userpage";
import Adminpage from "./Pages/Adminpage";
import Vendorpage from "./Pages/Vendorpage";
import Profilepage from "./Pages/Profilepage";
import AdminProfilePage from "./Pages/AdminProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<Userpage />} />
        <Route path="/user/profile/:id" element={<UserProfilePage />} />
        <Route path="/admin" element={<Adminpage />} />
        <Route path="/admin/profile/:id" element={<AdminProfilePage />} />
        <Route path="/vendor" element={<Vendorpage />} />
        <Route path="/vendor/profile/:id" element={<Profilepage />} />
      </Routes>
    </>
  );
}

export default App;
