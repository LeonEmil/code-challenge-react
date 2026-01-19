import React from 'react'
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material'
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material'

const drawerWidth = 240

interface Props {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <nav aria-label="Navegación principal">
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Educabot Admin
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {['Dashboard', 'Enrollments', 'Settings'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton aria-label={text} aria-current={index === 1 ? 'page' : undefined}>
                            <ListItemIcon aria-hidden="true">
                                {index === 0 ? <DashboardIcon /> : index === 1 ? <PeopleIcon /> : <SettingsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </nav>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="a"
                href="#main-content"
                className="sr-only"
            >
                Saltar al contenido principal
            </Box>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Abrir menú de navegación"
                        aria-expanded={mobileOpen}
                        aria-controls="navigation-drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Workshop Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="Navegación principal"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    id="navigation-drawer"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                id="main-content"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                tabIndex={-1}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}
