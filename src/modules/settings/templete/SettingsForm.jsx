import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import { useTranslation } from "react-i18next";
import "../../../assets/styels/components/forms.scss";
import bell from "../../../assets/images/bell.png";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { useNavigate } from "react-router-dom";
import { useDynamicColors } from "../../../hooks/useDynamicColors";

const SettingsForm = () => {
  const { t } = useTranslation();
  const { primary, secondry } = useDynamicColors();

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [bgColor, setBgcolor] = useState(null);
  const [bgFontColor, setbgFontcolor] = useState(null);
  const [sbColor, setSbcolor] = useState(null);
  const [sbFontColor, setSbFontcolor] = useState(null);

  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess } = useUpdateSettings();

  


const imageUpload = (file) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64StringUS = reader.result
      .replace("data:", "")
      .replace(/^.+,/, "");
    localStorage.setItem("localLogo", base64StringUS);
    const myImage = localStorage.getItem("localLogo");
    var bannerImg = document.getElementById("logoBanner");
    bannerImg = document.getElementById('logoBanner');
    bannerImg.src = "data:image/png;base64," + myImage;
    //document.body.style.background = `url(data:image/png;base64,${base64StringUS})`;
  };
  reader.readAsDataURL(file);
};

  const handleSubmit = () => {
    const formData = new FormData();
    if(selectedLogo)
      {
        formData.append("logo", selectedLogo, selectedLogo?.name);
      }
    formData.append("dashboardColor", bgColor);
    formData.append("dashboardFontColor", bgFontColor);
    formData.append("sidebarColor", sbColor);
    formData.append("sidebarFontColor", sbFontColor);
 
    mutate({ body: formData });
    if(selectedLogo) 
      {imageUpload(selectedLogo)}
    sessionStorage.setItem(
      "dashboardSettings",
      JSON.stringify({
        dashboardColor: bgColor,
        dashboardFontColor: bgFontColor,
        sidebarColor: sbColor,
        sidebarFontColor: sbFontColor,
      })
    );

   navigate("/home")
    //window.location.reload();
    //sessionStorage.removeItem("dashboardSettings")
    
    
  };
  return (
    <div className="page">
      <div className="page_container">
        <div className="page_container_header">
          <PageHeader title={t("sidebar.settings")}></PageHeader>
        </div>

        <div className="page_container_table">
          {!isLoading ? (
            <>
              <Card className="from__card" width="100%">
                <CardBody>
                  <form onSubmit={() => handleSubmit()} className="form">
                    <div className="form__input">
                      <FormControl className="form__input__container">
                        <FormLabel>
                          <Text className="form__input__container__label fo_primary">
                            {t("settings.logo")}
                          </Text>
                        </FormLabel>
                        {!selectedLogo ? (
                          <div className="form__input__flex_fileUpload">
                            <img src={bell} alt="" width={"66px"} />
                            <p className="form__input__flex_fileUpload_text">
                              {t("general.add_image")}
                            </p>
                            <p className="form__input__flex_fileUpload_desc">
                              {t("general.image_disclaimer")}
                            </p>
                            <Input
                              className="form__input__flex_fileUpload_input"
                              type="file"
                              name="image"
                              accept=".png, .jpg, .jpeg"
                              onChange={(e) => {
                                setSelectedLogo(e.target.files[0]);
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              padding: `${selectedLogo ? "0px" : ""}`,
                              borderRadius: "12px",
                            }}
                            className="form__input__flex_fileUpload"
                          >
                            <div className="form__input__flex_fileUpload_image">
                              <img
                                alt="not found"
                                width={"auto"}
                                height={"285px"}
                                src={URL.createObjectURL(selectedLogo)}
                              />
                            </div>
                          </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="form__input form__input__flex">
                      <FormControl className="form__input__container">
                        <FormLabel>
                          <Text className="form__input__container__label fo_primary">
                            {t("settings.primary_dash")}
                          </Text>
                        </FormLabel>

                        <label
                          htmlFor="color"
                          className="form__input__container__colorpicker"
                        >
                          <input
                            type="color"
                            id="color"
                            value={bgColor}
                            onChange={(event) => {
                              setBgcolor(event.target.value);
                            }}
                          />
                          <Text fontSize="14px" fontWeight="normal">
                            {bgColor}
                          </Text>
                        </label>
                      </FormControl>

                      <FormControl className="form__input__container">
                        <FormLabel>
                          <Text className="form__input__container__label fo_primary">
                            {t("settings.sec_dash")}
                          </Text>
                        </FormLabel>
                        <label
                          htmlFor="color"
                          className="form__input__container__colorpicker"
                        >
                          <input
                            type="color"
                            id="color"
                            value={bgFontColor}
                            onChange={(event) => {
                              setbgFontcolor(event.target.value);
                            }}
                          />
                          <Text fontSize="14px" fontWeight="normal">
                            {bgFontColor}
                          </Text>
                        </label>
                      </FormControl>
                    </div>

                    <div className="form__input form__input__flex mt-8">
                      <FormControl className="form__input__container">
                        <FormLabel>
                          <Text className="form__input__container__label fo_primary">
                            {t("settings.primary_sb")}
                          </Text>
                        </FormLabel>

                        <label
                          htmlFor="color"
                          className="form__input__container__colorpicker"
                        >
                          <input
                            type="color"
                            id="color"
                            value={sbColor}
                            onChange={(event) => {
                              setSbcolor(event.target.value);
                            }}
                          />
                          <Text fontSize="14px" fontWeight="normal">
                            {sbColor}
                          </Text>
                        </label>
                      </FormControl>

                      <FormControl className="form__input__container">
                        <FormLabel>
                          <Text className="form__input__container__label fo_primary">
                            {t("settings.primary_sb")}
                          </Text>
                        </FormLabel>

                        <label
                          htmlFor="color"
                          className="form__input__container__colorpicker"
                        >
                          <input
                            type="color"
                            id="color"
                            value={sbFontColor}
                            onChange={(event) => {
                              setSbFontcolor(event.target.value);
                            }}
                          />
                          <Text fontSize="14px" fontWeight="normal">
                            {sbFontColor}
                          </Text>
                        </label>
                      </FormControl>
                    </div>

                    <div className="form__btn__container">
                      <Button  type="submit"  bg={primary} color={secondry}
                    dir="rtl">
                        {t("general.edit")}
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </>
          ) : (
            <>
              <Spinner size="xl" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
