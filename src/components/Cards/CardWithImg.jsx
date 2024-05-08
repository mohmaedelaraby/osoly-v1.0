import {
  Avatar,
  Button,
  Card,
  Spinner,
  Stack,
  WrapItem,
} from "@chakra-ui/react";
import image from "../../assets/images/houseImg.png";
import "../../assets/styels/components/cards.scss";

import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useDynamicColors } from "../../hooks/useDynamicColors";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
  sendDataToParent,
  id,
}) {


  return (
    <Card width={isVertical ? "100%" : "100%"}>
      {title ? (
        <>
          <div
            className="cardWithimg"
            style={{ width: isVertical ? "100%" : "100%" }}
          >
            <div
              className={
                isVertical
                  ? "cardWithimg_contanier verticalCard"
                  : "cardWithimg_contanier"
              }
            >
              <div className="cardWithimg_contanier__icon">
                <img
                  src={img}
                  alt=""
                  className="cardWithimg_contanier__icon_img"
                />
                <div className="cardWithimg_contanier__icon_btns">
                  {!isVertical ? (
                    <>
                      <Stack
                        alignItems={"center"}
                        direction={"row"}
                        spacing={1}
                      >
                        <Button
                          className="table_body_row_item_btns_editbtn"
                          width={"25%"}
                          rightIcon={<EditOutlinedIcon />}
                          paddingRight="8px"
                          color={"white"}
                          variant="solid"
                          alignItems="center"
                          justifyContent="center"
                          bg={"#194C81"}
                          onClick={() => {
                            //(item);
                            sendDataToParent(["edit", id]);
                          }}
                        ></Button>
                        <Button
                          className="table_body_row_item_btns_deletebtn"
                          width={"25%"}
                          rightIcon={<DeleteIcon />}
                          paddingRight="8px"
                          color={"white"}
                          variant="solid"
                          bg={"#CC3636"}
                          alignItems="center"
                          justifyContent="center"
                          onClick={() => {
                            sendDataToParent(["delete", id]);
                            //mutate(item.id);
                          }}
                        ></Button>
                      </Stack>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="cardWithimg_contanier__text">
                {header ? (
                  <div className="cardWithimg_contanier__text_header">
                    {header}
                  </div>
                ) : (
                  <></>
                )}
                {title ? (
                  <div className="cardWithimg_contanier__text_title">
                    {title}
                  </div>
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
                    {/* <Stack
                  alignItems={isVertical ? "flex-end" : "center"}
                  direction={isVertical ? "column" : "row"}
                  spacing={4}
                  width="100%"
                >
                  <Button
                    width={isVertical ? "50%" : "100%"}
                    rightIcon={<CheckIcon />}
                    backgroundColor="#2EA154"
                    color={'white'}
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
                </Stack> */}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <>
            <div className="flex-center ">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          </>
        </>
      )}
    </Card>
  );
}

export default CardWithImg;
