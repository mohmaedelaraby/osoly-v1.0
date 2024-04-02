
import homeSB from '../assets/icons-svgs/homeSB.svg'
import usersSB from '../assets/icons-svgs/usersSB.svg'
import ticketSB from '../assets/icons-svgs/ticketsSb.svg'
import buildSB from '../assets/icons-svgs/buildSB.svg'
import settingsSB from '../assets/icons-svgs/settingsSB.svg'
import logoout from '../assets/icons-svgs/logoutSb.svg'
import infoSB from '../assets/icons-svgs/infoSB.svg'
import enterprisesSB from '../assets/icons-svgs/enterpraiseSB.svg'
import HomeSidebar from '../assets/icons/HomeSidebar'
export const sidebarItems = [
    
    {
        id: 1,
        name: "الرئيسية",
        icon:'home',
        activeIcon: homeSB,
        navTo:'/home',
        activeRoutes:['/home'],
        isActive: false,

    },
    {
        id: 2,
        name: "المؤسسة",
        icon: 'enterprise',
        activeIcon: enterprisesSB,
        navTo:'/enterprises',
        activeRoutes:['/enterprises','/enterprise'],
        isActive: false,
    },

    {
        id: 3,
        name: "المستخدمين",
        navTo:'/users',
        icon: 'users',
        activeIcon: usersSB,
        activeRoutes:['/users'],
        isActive: false,
        
    },
    {
        id: 4,
        name: "التذاكر",
        navTo:'/tickets',
        icon: 'tickets',
        activeIcon: ticketSB,
        activeRoutes:['/tickets'],
        isActive: false,
       
    },
    {
        id: 5,
        name: "العقارات",
        navTo:'/propreties',
        icon: 'propreties',
        activeIcon: buildSB,
        isActive: false,
        activeRoutes:['/propreties'],
   
       
    },
  
];

export const sidebarSettings =[{
    id: 6,
    name: "الإعدادات",
    icon:'settings',
    activeIcon: settingsSB,
    navTo:'/settings',
    activeRoutes:['/settings'],
    isActive: false,
}]

export const sidebarBottom =[{
    id: 7,
    name: "مساعدة",
    icon:'info',
    activeIcon: infoSB,
    navTo:'/info',
    activeRoutes:['/info'],
    isActive: false,
}
,
{
    id: 8,
    name: "تسجيل الخروج",
    icon:'logout',
    activeIcon: logoout,
    navTo:'/login',
    activeRoutes:[],
    isActive: false,
}
]
