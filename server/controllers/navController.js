module.exports = {

    getSideNavList: async (req, res) => {
        try {
            let sideNavs = [
                { route: '/dashboard', name: 'Dashboard', icon: 'icon-speedometer' },
                { route: '/survey', name: 'Surveys', icon: 'icon-speech' },
                { route: '/profile', name: 'Profile', icon: 'icon-user' }
            ];
            if (await req.principal.hasPermission('CAN_SUPERVISE')) {
                let supervisorToolsNav = { name: 'Supervisor Tools', id: 'supervisorTools', icon: 'icon-wrench', parentNav: true, isOpen: false, children: [] };
                supervisorToolsNav.children.push({ route: '/supervisor_tools/team_surveys', name: 'Team Surveys', icon: 'icon-speech' })
                supervisorToolsNav.children.push({ route: '/supervisor_tools/my_team', name: 'My Team', icon: 'icon-people' })
                sideNavs.push(supervisorToolsNav);
            }
            if (await req.principal.hasPermission('CAN_ADMIN')) {
                let adminToolsNav = { name: 'Admin Tools', id: 'adminTools', icon: 'icon-settings', parentNav: true, isOpen: false, children: [] }
                adminToolsNav.children.push({ route: '/admin_tools/agent_surveys', name: 'Agent Surveys', icon: 'icon-speech' })
                adminToolsNav.children.push({ route: '/admin_tools/manage_users', name: 'Manage Users', icon: 'icon-people' })
                adminToolsNav.children.push({ route: '/admin_tools/notifications', name: 'Notifications', icon: 'icon-bell' })
                adminToolsNav.children.push({ route: '/admin_tools/permissions', name: 'Permissions', icon: 'icon-lock' })
                sideNavs.push(adminToolsNav);
            }
            res.status(200).json(sideNavs);
        }
        catch (error) {
            console.trace(error.stack);
            res.status(500).json(error.stack);
        }
    }
}