import React, { useEffect, useState } from "react";
import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ForumIcon from "@mui/icons-material/Forum";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import axios from "../http.js";

const Write = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const WriteIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  paddingRight: `calc(1em + ${theme.spacing(5)})`,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function AppHeader({ setSearchResults }) {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // // add logout function
  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/");
  // };

  useEffect(() => {
    if (!email) {
      // redirect to login
      console.log("No email found in localStorage, redirecting to login");
      navigate("/signin");
    }
  }, [email]);

  const pages = [
    { name: "Posts", url: "/browser" },
    { name: "About", url: "/" },
  ];
  const settings = [
    { name: "Profile", url: "/profile" },
    { name: "Account", url: "/account" },
    { name: "Logout", url: "/", onClick: () => localStorage.clear() },
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null); // 用户菜单的开关

  const handleWriteClick = () => {
    navigate("/post");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async () => {
    const regex = /#\d+/g;
    const matches = searchTerm.match(regex); // 从搜索内容中提取所有#数字

    // 初始化一个数组以存储找到的ID
    let searchIDs = [];
    let searchKeyword = searchTerm.trim(); // 初始搜索关键词为完整的搜索内容
    let allSearchResults = [];

    if (matches && matches.length > 0) {
      // 如果搜索内容中存在任何#数字
      searchIDs = matches.map((match) => match.substring(1)); // 去除每个匹配项的#并收集ID
      searchKeyword = searchTerm.replace(regex, "").trim(); // 从搜索内容中移除所有#数字，并去除首尾空格
    }

    try {
      // Fetch individual posts for each post ID
      for (const id of searchIDs) {
        const response = await axios.get("/post/detail", {
          params: {
            user_id: localStorage.getItem("user_id"),
            post_id: id,
          },
        });
        console.log(
          "SearchPost_id:",
          id,
          "user_id",
          localStorage.getItem("user_id")
        );
        allSearchResults.push(response.data.post);
        // Handle the response data here, update the page accordingly
      }

      if (searchKeyword) {
        // Call the API to search by keyword
        const page = 1; // Assuming starting search from page 1
        const response = await axios.get("/post/search", {
          params: {
            user_id: localStorage.getItem("user_id"),
            page,
            keywords: searchKeyword,
          },
        });
        console.log("Search Keyword:", searchKeyword);
        console.log("Search Response:", response.data.post_list);
        response.data.post_list.map((post) => {
          allSearchResults.push(post);
        });

        // Handle the response data here, update the page accordingly
      }

      setSearchResults(allSearchResults);
      console.log("setSearchResults-header:", allSearchResults);
    } catch (error) {
      console.error("Error handling search:", error);
    }
  };

  const handleLogoClick = () => {
    // const userState = localStorage.getItem('user_state');
    console.log(localStorage);
    // console.log(userState);
    // 根据user_state的值决定跳转的路径
    if (localStorage.getItem("token") != null) {
      navigate("/browser"); // 假设用户已登录，跳转到browse_page
    } else {
      navigate("/"); // 未登录或其他状态，跳转到登录页
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgba(1, 111, 160, 0.3)", width: "100%" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ForumIcon sx={{ display: "flex", mr: 1 }} />
          {/* 左上角主logo */}
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              // mr: 2,
              // display: "flex",
              // fontFamily: "monospace",
              // fontWeight: 700,
              // letterSpacing: ".3rem",
              // color: "inherit",
              textDecoration: "none",
              display: "flex",
              fontFamily: "Bungee Inline",
              color: "rgba(1, 111, 160, 0.56)",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            UNICORE
          </Typography> */}
          <Box onClick={handleLogoClick} sx={{ cursor: "pointer" }}>
            <Typography
              variant="h6"
              noWrap
              component="div" // 使用div替换a，因为我们将通过点击事件进行导航
              sx={{
                display: "flex",
                fontFamily: "Bungee Inline",
                color: "rgba(1, 111, 160, 0.56)",
                fontWeight: "bold",
                fontSize: "22px",
                textDecoration: "none",
              }}
            >
              UNICORE
            </Typography>
          </Box>

          {/* 导航栏 */}
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.url}
                sx={{
                  margin: "0 1em",
                  textDecoration: "underline",
                  fontFamily: "Impact",
                  color: "rgba(1, 111, 160, 0.56)",
                  textTransform: "none",
                  fontSize: "18px",
                }}
              >
                {page.name}
              </Link>
            ))}
          </Box>

          {/* 发帖栏 */}
          <IconButton
            onClick={handleWriteClick}
            sx={{ cursor: "pointer", backgroundColor: "transparent" }}
          >
            <Write>
              <WriteIconWrapper>
                {/* <IconButton> */}
                <BorderColorIcon
                  sx={{ color: "rgb(255,255,255,0.8)", alignSelf: "center" }}
                />
                {/* </IconButton> */}
              </WriteIconWrapper>
            </Write>
          </IconButton>

          {/* 搜索栏 */}
          <Search>
            {/* 当搜索图标被点击时，触发搜索操作 */}
            <IconButton
              onClick={handleSearchSubmit}
              sx={{ p: 0 }}
              data-testid="search-icon-button"
            >
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm} // 绑定搜索输入到状态
              onChange={handleSearchChange} // 更新搜索输入的状态
            />
          </Search>

          {/* 右上角用户菜单 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{(localStorage.getItem("email") || "")[0]}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name}>
                  <Link
                    href={setting.url}
                    onClick={setting.onClick}
                    sx={{
                      margin: "auto",
                      fontFamily: "Impact",
                      color: "rgba(1, 111, 160, 0.56)",
                      textTransform: "none",
                      fontSize: "14px",
                    }}
                  >
                    {setting.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;
