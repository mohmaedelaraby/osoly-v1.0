import { Avatar, Button, Card, Stack, WrapItem } from "@chakra-ui/react";
import image from "../../assets/images/houseImg.png";
import "../../assets/styels/components/cards.scss";

import React from "react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";

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
  return (
    <Card width="-webkit-fit-content">
      <div className="cardWithimg">
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
                <Stack alignItems={isVertical ? "flex-end" : "center"} direction={isVertical ? "column" : "row"} spacing={4}>
                  <Button
                    width={isVertical ? "50%" : "100%"}
                    leftIcon={<CheckIcon />}
                    backgroundColor="#2EA154"
                    color="white"
                    variant="solid"
                  
                  >
                    قبول
                  </Button>
                  <Button
                    width={isVertical ? "50%" : "100%"}
                    leftIcon={<SmallCloseIcon />}
                    colorScheme="red"
                    variant="outline"
                   
                  >
                    رفض
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
