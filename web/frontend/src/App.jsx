import Nav from "./Nav";
import Browse from "./Browse";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import CreateTournament from "./CreateTournament";
//random 
//random 2
function App() {
  return (
    <BrowserRouter>
      <div className="bg-zinc-900 h-full w-screen px-32 overflow-x-hidden" style={{overflowX:"hidden", minHeight:"100vh"}}> 
        <Routes>
            <Route path="/" element={<Nav />}>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/create" element={<CreateTournament/>} />
              
            </Route>
        </Routes>
      </div> 
    </BrowserRouter>
  );
}

export default App;
