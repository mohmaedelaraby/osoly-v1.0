import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../../assets/styels/components/forms.scss";

const SettingsForm = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [bgColor, setBgcolor] = useState(null);
  const [bgFontColor, setbgFontcolor] = useState(null);
  const [sbColor, setSbcolor] = useState(null);
  const [sbFontColor, setSbFontcolor] = useState(null);

  useEffect(()=>{
    if(sessionStorage.getItem("bgColor")){
        setBgcolor(sessionStorage.getItem("bgColor"))
    }
    if(sessionStorage.getItem("bgFontColor")){
        setbgFontcolor(sessionStorage.getItem("bgFontColor"))
    }
    if(sessionStorage.getItem("sbColor")){
        setSbcolor(sessionStorage.getItem("sbColor"))
    }
    if(sessionStorage.getItem("sbFontColor")){
        setSbFontcolor(sessionStorage.getItem("sbFontColor"))
    }
  },[])

  const handleSubmit = () => {
    sessionStorage.setItem("bgColor", bgColor);
    sessionStorage.setItem("bgFontColor", bgFontColor);
    sessionStorage.setItem("sbColor", sbColor);
    sessionStorage.setItem("sbFontColor", sbFontColor);
  };
  return (
    <Card className="from__card">
      <CardBody>
        <form onSubmit={() => handleSubmit()} className="form">
          <div className="form__header">Dashboard Settings</div>

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  Dashboard Color
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
                  Dashboard Font Color
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

          <div className="form__input form__input__flex">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary">
                  Sidebar Color
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
                  Sidebar Font Color
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

          <div className="form__input">
            <FormControl className="form__input__container">
              <FormLabel>
                <Text className="form__input__container__label fo_primary"> Image </Text>
              </FormLabel>

              {!selectedLogo && (
                <div>
                  <Input
                    className="form__input__container__uploadFile"
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(event) => {
                      setSelectedLogo(event.target.files[0]);
                    }}
                  />
                </div>
              )}

              {selectedLogo && (
                <div className="form__input__container__image">
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedLogo)}
                  />
                  <br />
                  <button
                    className="form__input__container__image__remove"
                    onClick={() => setSelectedLogo(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </FormControl>
          </div>

          <div className="form__btn__container">
            <Button className="form__btn " type="submit">
              Edit Setting
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default SettingsForm;
