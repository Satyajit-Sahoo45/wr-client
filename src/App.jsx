import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedProvider from "./Providers/ProtectedProvider";
import Retreat from "./components/Retreat";
import { Login } from "./components/Login";
import Signup from "./components/Signup";
import RetreatDetail from "./components/RetreatDetail";
import { RetreatProvider } from "./context/RetreatContext";
import BookedRetreats from "./components/BookedRetreats";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedProvider><RetreatProvider><Retreat /></RetreatProvider></ProtectedProvider>} />
          <Route path="/retreat/:id" element={<ProtectedProvider><RetreatProvider><RetreatDetail /></RetreatProvider></ProtectedProvider>} />
          <Route path="/booked-retreats" element={<ProtectedProvider><RetreatProvider><BookedRetreats /></RetreatProvider></ProtectedProvider>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
