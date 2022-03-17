import io from 'socket.io-client';
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

  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('confirmation', (data) => {
      console.log(data);
    });
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
                    onClick={() => nav('/dashboard?type=invoice&page=0&pageSize=20')}
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
