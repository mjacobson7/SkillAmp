

module.exports = {

    getSideNavList: async (req, res) => {
        try {
            let sideNavs = [
                { route: '/dashboard', name: 'Dashboard', icon: 'icon-speedometer' },
                { route: '/survey', name: 'Surveys', icon: 'icon-speech' },
                { route: '/profile', name: 'Profile', icon: 'icon-user' }
            ];

            if (await req.principal.hasPermission('CAN_VIEW_SUPERVISOR_TOOLS_NAV')) {
                let supervisorToolsNav = { name: 'Supervisor Tools', id: 'supervisorTools', icon: 'icon-wrench', parentNav: true, isOpen: false, children: [] };

                if (await req.principal.hasPermission('CAN_VIEW_TEAM_SURVEYS_SUB_NAV')) {
                    supervisorToolsNav.children.push({ route: '/supervisor_tools/team_surveys', name: 'Team Surveys', icon: 'icon-speech' })
                }

                if (await req.principal.hasPermission('CAN_VIEW_MANAGE_USERS_SUB_NAV')) {
                    supervisorToolsNav.children.push({ route: '/supervisor_tools/manage_users', name: 'Manage Users', icon: 'icon-people' })
                }
                sideNavs.push(supervisorToolsNav);
            }

            if (await req.principal.hasPermission('CAN_VIEW_SYSTEM_MANAGEMENT_NAV')) {
                let systemManagementNav = { name: 'System Management', id: 'systemManagement', icon: 'icon-settings', parentNav: true, isOpen: false, children: [] }

                if (await req.principal.hasPermission('CAN_VIEW_NOTIFICATIONS_SUB_NAV')) {
                    systemManagementNav.children.push({ route: '/system_management/notifications', name: 'Notifications', icon: 'icon-bell' })
                }

                if (await req.principal.hasPermission('CAN_VIEW_PERMISSIONS_SUB_NAV')) {
                    systemManagementNav.children.push({ route: '/system_management/permissions', name: 'Permissions', icon: 'icon-lock' })
                }
                sideNavs.push(systemManagementNav);
            }


            res.status(200).json(sideNavs);

        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}