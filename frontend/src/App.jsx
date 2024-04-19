import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import UserPage from "./pages/UserPage"
import "./App.css"
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:username" element={<UserPage />} />
            <Route path="/7a32493ca5058aa7065ab15cb6f91b43193109fd87c7d8fdefb26846acf12cc2" element={<AdminPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
