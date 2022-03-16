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
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate
} from 'remix';
import { theme } from './theme';

export function meta() {
  return { title: 'GAAP' };
}

const drawerWidth = 240;

export default function App() {
  const nav = useNavigate();

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
                <ListItem button onClick={() => nav('/submit')}>
                  <ListItemText>Submit</ListItemText>
                </ListItem>
                <ListItem button onClick={() => nav('/dashboard')}>
                  <ListItemText>Dashboard</ListItemText>
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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}