// // import { Routes, Route } from "react-router-dom";
// // import Navbar from "./Components/Navbar/Navbar";
// // import Login from "./Pages/Login/Login";
// // import Home from "./Home";
// // import Signup from "./Pages/Signup/Signup";
// // import Tasks from "./Pages/Tasks/Tasks";
// // // ...baaki imports...

// // function App() {
// //   return (
// //     <>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<Signup />} />
// //         <Route path="/tasks" element={<Tasks />} />
// //       </Routes>
// //     </>
// //   );
// // }

// export default App; 











import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
