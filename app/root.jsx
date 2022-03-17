import { useState, useEffect } from 'react';
import { SocketProvider } from './context';
import {
  AppBar,
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useNavigate,
  Outlet
} from 'remix';
import { theme } from './theme';

export function meta() {
  return { title: 'GAAP' };
}

const drawerWidth = 240;


export default function App() {
  const nav = useNavigate();
  const [socket, setSocket] = useState();
  const [interval, createInterval] = useState();

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8080/api/v0/ws');
    setSocket(socket);
    createInterval(setInterval(() => socket.send('echo'), 10000));
    socket.onerror = (error) => {
      console.log('fuck uyou');
      console.log(error.message);
    }
    socket.onclose = (data) => {
      console.log('closing');
      console.log(data);
    }
    return () => {
      socket.close();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.onopen = (data) => {
      console.log('websocket client established');
      console.log(data);
    };
  }, [socket]);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </head>
      <body>
        <CssBaseline />
        <SocketProvider socket={socket}>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
              <AppBar
                position='fixed'
                sx={{
                  width: `calc(100% - ${drawerWidth}px)`,
                  ml: `${drawerWidth}px`
                }}
              >
                <Toolbar>
                  <Typography variant='h6' component='h1' noWrap>
                    GAAP
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                  }
                }}
                variant='permanent'
                anchor='left'
              >
                <Toolbar />
                <Divider />
                <List>
                  <ListItem button onClick={() => nav('/billing-tool')}>
                    <ListItemText>Billing Tool</ListItemText>
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => nav('/dashboard/claims?page=0&pageSize=20')}
                  >
                    <ListItemText>Dashboard</ListItemText>
                  </ListItem>
                  <ListItem button onClick={() => nav('/billing-results')}>
                    <ListItemText>Billing Results</ListItemText>
                  </ListItem>
                </List>
              </Drawer>
              <Box
                component='main'
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
              >
                <Toolbar />
                <Outlet />
              </Box>
            </Box>
          </ThemeProvider>
        </SocketProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
