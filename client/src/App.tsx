import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/home/Home"
import "./App.css"
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/Admin/AdminLayout";
import Admin from "./pages/Admin/views/Admin";
import Comments from "./pages/Admin/views/Comments";
import NewPosts from "./pages/Admin/views/NewPosts";
import ManagePosts from "./pages/Admin/views/ManagePosts";


function App() {


  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<NewPosts />} />
          <Route path="posts/manage" element={<ManagePosts />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
