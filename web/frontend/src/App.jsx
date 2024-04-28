import Nav from "./Nav";
import Browse from "./Browse";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-zinc-900 h-full w-screen px-32"> 
        <Routes>
            <Route path="/" element={<Nav />}>
              <Route index element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/profile" element={<Profile/>}/>
            </Route>
        </Routes>
      </div> 
    </BrowserRouter>
  );
}

export default App;
