import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import '../../assets/styels/components/pageHeader.scss'

function PageHeader({ title, addtionTitle }) {
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
    <div className="page_heading_header">
      <div className="page_heading_header__title">
        {addtionTitle} {title}
      </div>
      <div className="page_heading_header__icons">
        <div
          className="page_heading_header__icons_lang"
          onClick={handleChangeLanguage}
        >
          {currentLanguage === "en" ? <>US</> : <>AR</>}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
