import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import user from "../../assets/images/user.png";


function PageHeader({title}) {
    const {
        t,
        i18n: { changeLanguage, language },
      } = useTranslation();
      const [currentLanguage, setCurrentLanguage] = useState(language);
      const handleChangeLanguage = () => {
        const newLanguage = currentLanguage === "en" ? "ar" : "en";
        setCurrentLanguage(newLanguage);
        changeLanguage(newLanguage);
      };
  return (
    <div className="home_container_header">
    <div className="home_container_header__title">
      {t("general.hello")} {title}
    </div>
    <div className="home_container_header__icons">
        <div className='home_container_header__icons_lang' onClick={handleChangeLanguage}>
            {currentLanguage === "en" ? (<>US</>):(<>AR</>)}
        </div>
     
    
    </div>
  </div>
  )
}

export default PageHeader