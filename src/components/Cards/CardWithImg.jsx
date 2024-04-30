import { Avatar, Button, Card, Stack, WrapItem } from "@chakra-ui/react";
import image from "../../assets/images/houseImg.png";
import "../../assets/styels/components/cards.scss";

import React from "react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../hooks/useDynamicColors";

function CardWithImg({
  img = image,
  header,
  name,
  title,
  price,
  address,
  height = "183px",
  isBtns = false,
  currncy,
  isVertical = false,
 
}) {
  const { t } = useTranslation();
  const {primary,secondry}=useDynamicColors()

  return (
    <Card width={isVertical ? '100%' : '-webkit-fit-content'}>
      <div className="cardWithimg"  style={{width: isVertical ? '100%' : ''}} >
        <div
          className={
            isVertical
              ? "cardWithimg_contanier verticalCard"
              : "cardWithimg_contanier"
          }
        >
          <div className="cardWithimg_contanier__icon">
            <img src={img} alt="desc"  />
          </div>
          <div className="cardWithimg_contanier__text">
            {header ? (
              <div className="cardWithimg_contanier__text_header">{header}</div>
            ) : (
              <></>
            )}
            {title ? (
              <div className="cardWithimg_contanier__text_title">{title}</div>
            ) : (
              <></>
            )}
            {name ? (
              <div className="cardWithimg_contanier__text_name">
                <WrapItem>
                  <Avatar
                    size="xs"
                    marginLeft="4px"
                    name="Kola Tioluwani"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                </WrapItem>
                {name}
              </div>
            ) : (
              <></>
            )}
            {price ? (
              <div className="cardWithimg_contanier__text_priceContainer">
                <span className="cardWithimg_contanier__text_price">
                  {price}
                </span>
                <span className="cardWithimg_contanier__text_price_desc">
                  {currncy}
                </span>
              </div>
            ) : (
              <></>
            )}
            {address ? (
              <div className="cardWithimg_contanier__text_address">
                {address}
              </div>
            ) : (
              <></>
            )}
          </div>
          {isBtns ? (
            <>
              <div className="cardWithimg_contanier__btns">
                <Stack alignItems={isVertical ? "flex-end" : "center"} direction={isVertical ? "column" : "row"} spacing={4} width='100%'>
                  <Button
                    width={isVertical ? "50%" : "100%"}
                    rightIcon={<CheckIcon />}
                    backgroundColor="#2EA154"
                    color={secondry}
                    variant="solid"
                  
                  >
                    {t("general.accept")}
                  </Button>
                  <Button
                    width={isVertical ? "50%" : "100%"}
                    rightIcon={<SmallCloseIcon />}
                    colorScheme="red"
                    variant="outline"
                   
                  >
                    {t("general.reject")}
                  </Button>
                </Stack>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Card>
  );
}

export default CardWithImg;
