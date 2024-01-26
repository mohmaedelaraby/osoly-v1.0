import IconDashboard from '../assets/icons/IconDashboard';
import IconDashboardActive from '../assets/icons/IconDashboardActive';
import IconSettings from '../assets/icons/IconSettings';
import IconSettingsActive from '../assets/icons/IconSettingsActive';
export const sidebarItems = [

    {
        id: 1,
        name: "Dashboard",
        icon: <IconDashboard/>,
        activeIcon: <IconDashboardActive/>,
        navTo:'/users',
        isActive: false,
        nestedChildern:[{
            name:'users',
            active:['/users','/user'],
            navTo:'/users'
        },{
            name:'owners',
            active:['/owner','/owners'],
            navTo:'/owners'
        },{
            name:'ads',
            active:['/ad','/ads'],
            navTo:'/ads'
        },
        {
            name:'tickets',
            active:['/ticket','/tickets'],
            navTo:'/tickets'
        }]
    },

    {
        id: 2,
        name: "Settings",
        navTo:'/settings',
        icon: <IconSettings/>,
        activeIcon: <IconSettingsActive/>,
        isActive: true
    },

];