import React, { useState } from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Component/HomePage";
import SignUpPage from "./Component/SignUpPage";
import SignInPage from "./Component/SignInPage";
import ProfilePage from "./Component/ProfilePage";
import UserSettingsPage from "./Component/ProfilePage/Account";
import BrowserPage_wyd from "./Component/BrowserPage/BrowserPage_wyd";
import PostPage from "./Component/PostPage/PostPage";


// App.js
function App() {
  const [searchResults, setSearchResults] = useState([]);
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/account" element={<UserSettingsPage />} />
        <Route 
          path="/browser" 
          element={<BrowserPage_wyd searchResults={searchResults} setSearchResults={setSearchResults} />} // 添加 setSearchResults
        />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
