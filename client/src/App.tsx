import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/home/Home";
import "./App.css";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/Admin/AdminLayout";
import Admin from "./pages/Admin/views/Admin";
import Comments from "./pages/Admin/views/Comments";
import NewPost from "./pages/Admin/views/NewPosts";
import ManagePosts from "./pages/Admin/views/ManagePosts";
import ManageTags from "./pages/Admin/views/ManageTags";
import NewTag from "./pages/Admin/views/NewTag";
import Users from "./pages/Admin/views/Users";
import EditPost from "./pages/Admin/views/EditPost";
import ManageCategories from "./pages/Admin/views/ManageCategories";
import NewCategory from "./pages/Admin/views/NewCategory";
import EditCategory from "./pages/Admin/views/EditCategory";
import EditTag from "./pages/Admin/views/EditTag";


function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="tags/new" element={<NewTag />} />
          <Route path="categories/new" element={<NewCategory />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="tags/manage" element={<ManageTags />} />
          <Route path="categories/manage" element={<ManageCategories />} />
          <Route path="posts/manage/edit/:id" element={<EditPost />} />
          <Route path="categories/manage/edit/:id" element={<EditCategory />} />
          <Route path="tags/manage/edit/:id" element={<EditTag />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
