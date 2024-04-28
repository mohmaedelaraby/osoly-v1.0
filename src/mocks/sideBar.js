
import homeSB from '../assets/icons-svgs/homeSB.svg'
import usersSB from '../assets/icons-svgs/usersSB.svg'
import ticketSB from '../assets/icons-svgs/ticketsSb.svg'
import buildSB from '../assets/icons-svgs/buildSB.svg'
import settingsSB from '../assets/icons-svgs/settingsSB.svg'
import logoout from '../assets/icons-svgs/logoutSb.svg'
import infoSB from '../assets/icons-svgs/infoSB.svg'
import enterprisesSB from '../assets/icons-svgs/enterpraiseSB.svg'
export const sidebarItems = [
    
    {
        id: 1,
        name:"sidebar.home",
        icon:'home',
        activeIcon: homeSB,
        navTo:'/home',
        activeRoutes:['/home'],
        isActive: false,

    },
    {
        id: 2,
        name: "sidebar.enterprise",
        icon: 'enterprise',
        activeIcon: enterprisesSB,
        navTo:'/enterprises',
        activeRoutes:['/enterprises','/enterprise'],
        isActive: false,
    },

    {
        id: 3,
        name: "sidebar.users",
        navTo:'/users',
        icon: 'users',
        activeIcon: usersSB,
        activeRoutes:['/users'],
        isActive: false,
        
    },
    {
        id: 4,
        name: "sidebar.tickets",
        navTo:'/tickets',
        icon: 'tickets',
        activeIcon: ticketSB,
        activeRoutes:['/tickets'],
        isActive: false,
       
    },
    {
        id: 5,
        name: "sidebar.propreties",
        navTo:'/propreties',
        icon: 'propreties',
        activeIcon: buildSB,
        isActive: false,
        activeRoutes:['/propreties'],
   
       
    },
  
];

export const sidebarSettings =[{
    id: 6,
    name: "sidebar.settings",
    icon:'settings',
    activeIcon: settingsSB,
    navTo:'/settings',
    activeRoutes:['/settings'],
    isActive: false,
}]

export const sidebarBottom =[{
    id: 7,
    name: "sidebar.info",
    icon:'info',
    activeIcon: infoSB,
    navTo:'/info',
    activeRoutes:['/info'],
    isActive: false,
}
,
{
    id: 8,
    name: "sidebar.logout",
    icon:'logout',
    activeIcon: logoout,
    navTo:'/login',
    activeRoutes:[],
    isActive: false,
}
]
