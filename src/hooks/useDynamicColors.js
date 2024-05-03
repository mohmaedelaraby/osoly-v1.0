import { useEffect, useState } from "react";

export const useDynamicColors = () => {
    const [dbColors, setDbColors] = useState()
    useEffect(() => {
        let dashboardSettings = sessionStorage.getItem("dashboardSettings");
        dashboardSettings = JSON.parse(dashboardSettings)
        setDbColors(dashboardSettings)
        var bg_elementsecondry = document.getElementsByClassName('bg_secondry')
        if (bg_elementsecondry) {
            for (let i = 0; i < bg_elementsecondry.length; i++) {
                bg_elementsecondry[i].style.backgroundColor = dashboardSettings?.dashboardFontColor;
            }
        }
        var bg_elementprimery = document.getElementsByClassName('bg_primary')
        if (bg_elementprimery) {
            for (let i = 0; i < bg_elementprimery.length; i++) {
                bg_elementprimery[i].style.backgroundColor = dashboardSettings?.dashboardColor;
            }
        }


        var fo_elementsecondry = document.getElementsByClassName('fo_secondry')
        if (fo_elementsecondry) {
            for (let i = 0; i < fo_elementsecondry.length; i++) {
                fo_elementsecondry[i].style.color = dashboardSettings?.dashboardFontColor;
            }
        }
        var fo_elementprimery = document.getElementsByClassName('fo_primary')
        if (fo_elementprimery) {
            for (let i = 0; i < fo_elementprimery.length; i++) {
                fo_elementprimery[i].style.color = dashboardSettings?.dashboardColor;
            }
        }

       /*  var fo_elementprimery_chakra = document.getElementsByClassName('chakra-button__icon')
        if (fo_elementprimery_chakra) {
            for (let i = 0; i < fo_elementprimery_chakra.length; i++) {
                fo_elementprimery_chakra[i].style.color = dashboardSettings?.dashboardColor;
            }
        } */
        
    }, [])

    return ({
        primary: dbColors?.dashboardColor,
        secondry: dbColors?.dashboardFontColor,


    })

}