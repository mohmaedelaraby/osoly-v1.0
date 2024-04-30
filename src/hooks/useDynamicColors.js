import { useEffect } from "react";

export const useColors = () => {
    useEffect(() => {
        let dashboardSettings = localStorage.getItem("dashboardSettings");
        dashboardSettings = JSON.parse(dashboardSettings)
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
            }        }
    }, [])

    return ({
        primaryBackGround: 'bg_primary',
        secondryBackGround: 'bg_secondry',
        primaryFont: 'fo_primary',
        secondryFont: 'fo_primary',

    })

}