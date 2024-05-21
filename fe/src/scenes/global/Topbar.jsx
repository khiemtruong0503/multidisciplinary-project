import { Box, IconButton, useTheme, InputBase, Popover, Button, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

// Mock notifications data
const notifications = [
  { id: 1, message: "New comment on your post", time: "5m" },
  { id: 2, message: "New follower", time: "20m" },
  { id: 3, message: "Update available", time: "1h" },
];

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handlePersonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };
  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };
   // Styles for dark mode
   const darkModeStyles = {
    backgroundColor: '#1f2a40',
    color: 'white',
  };
  const seeMoreButtonStyles = {
    color: '#6870fa',
    justifyContent: 'flex-start',
  };
  const open = Boolean(anchorEl);
  const notifOpen = Boolean(notifAnchorEl);
  const id = open ? 'person-popover' : undefined;
  const notifId = notifOpen ? 'notifications-popover' : undefined;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
      {/* NotificationsOutlinedIcon */}
        <IconButton onClick={handleNotificationsClick}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <Popover
          id={notifId}
          open={notifOpen}
          anchorEl={notifAnchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style: theme.palette.mode === 'dark' ? darkModeStyles : {
              backgroundColor: 'default background color for light mode', // Replace with actual color
              color: 'default text color for light mode', // Replace with actual color
              
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ p: 2, ...(theme.palette.mode === 'dark' ? darkModeStyles : {}) }}>
            Notifications
          </Typography>
          <Divider />
          <List dense sx={{ ...(theme.palette.mode === 'dark' ? darkModeStyles : {}) }}>
            {notifications.map((notif) => (
              <ListItem key={notif.id} sx={{ ...(theme.palette.mode === 'dark' ? darkModeStyles : {}) }}>
                <ListItemText
                  primary={notif.message}
                  secondary={notif.time}
                />
              </ListItem>
            ))}
          </List>
          <Button onClick={() => navigate('/notifications')} fullWidth sx={theme.palette.mode === 'dark' ? seeMoreButtonStyles : {}}>
            See More
          </Button>
        </Popover>
        <IconButton aria-describedby={id} onClick={handlePersonClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style: {
              backgroundColor: '#ECEFF1',
              width: 'fit-content', // Adjust width to fit the content
              padding: '10px' // Adjust padding as needed
              
            }
          }}
        >
          <Typography component="div">
            <Button onClick={() => handleNavigate('/settings')} startIcon={<SettingsOutlinedIcon />} sx={{ justifyContent: "flex-start" }}>Settings</Button>
            <Button onClick={() => handleNavigate('/help')} startIcon={<HelpOutlineOutlinedIcon />} sx={{ justifyContent: "flex-start" }}>Help</Button>
            <Button onClick={() => handleNavigate('/account')} startIcon={<AccountCircleOutlinedIcon />} sx={{ justifyContent: "flex-start" }}>Account</Button>
            <Button onClick={() => handleNavigate('/logout')} startIcon={<ExitToAppOutlinedIcon />} sx={{ justifyContent: "flex-start" }}>Logout</Button>
          </Typography>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
