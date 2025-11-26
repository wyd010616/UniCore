import React, { useState } from "react";
import MyLikesOrPosts from "./MyLikes";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

// -----never change-----
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// -----never change-----

function Panel({ userInfo }) {
  const [value, setValue] = useState(0); // 这个状态保存当前选择哪个tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "linear-gradient(to right, #2A6FF6, #0ABEBE)",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="profile tabs"
        textColor="secondary"
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab label="Favorites" {...a11yProps(0)} />
        <Tab label="My Posts" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <MyLikesOrPosts type="likes" count={userInfo.like_count} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyLikesOrPosts type="posts" count={userInfo.post_count} />
      </CustomTabPanel>
    </Box>
  );
}

export default Panel;
