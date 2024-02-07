import IconDashboard from '../assets/icons/IconDashboard';
import IconDashboardActive from '../assets/icons/IconDashboardActive';
import IconSettings from '../assets/icons/IconSettings';
import IconSettingsActive from '../assets/icons/IconSettingsActive';
export const sidebarItems = [
    
    {
        id: 1,
        name: "Enterprises",
        icon: <IconDashboard/>,
        activeIcon: <IconDashboardActive/>,
        navTo:'/enterprises',
        activeRoutes:['/enterprises','/enterprise'],
        isActive: false,
        nestedChildern:[{
            name:'users',
            active:['/enterprises','/enterprise'],
            navTo:'/enterprise'
        }
    ]
    },

    {
        id: 2,
        name: "Osoly",
        icon: <IconDashboard/>,
        activeIcon: <IconDashboardActive/>,
        navTo:'/users',
        activeRoutes:['/users','/user','/owner','/owners','/ad','/ads','/ticket','/tickets','/unit' ,'/units','/property'],
        isActive: false,
        nestedChildern:[{
            name:'users',
            active:['/users','/user'],
            navTo:'/users'
        },{
            name:'owners',
            active:['/owner','/owners','/property','/units','/unit'],
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
        id: 3,
        name: "Settings",
        navTo:'/settings',
        icon: <IconSettings/>,
        activeIcon: <IconSettingsActive/>,
        isActive: true
    },

];