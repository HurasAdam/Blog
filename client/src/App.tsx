import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/home/Home"
import "./App.css"
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";


function App() {


  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App
