import { create } from "zustand"



const useColorStore = create((set) => ({
  dashboardColor: "",
  dashboardFontColor: "",
  sidebarColor: "",
  sidebarFontColor:"",
  logo:null
  
}));

export default useColorStore;