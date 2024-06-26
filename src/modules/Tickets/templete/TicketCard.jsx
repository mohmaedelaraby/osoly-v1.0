import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Avatar, Button, Card, Spinner, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ticketsStatus } from "../../../enums/TicketsEnum";
import { useUpdateTickets } from "../hooks/useUpdateTickets";
import "../../../assets/styels/components/cards.scss";
import image from "../../../assets/images/houseImg.png";
import { useTranslation } from "react-i18next";

const TicketCard = ({ item, img = image, sendDataToParent }) => {
  const { t } = useTranslation();

  const TICKET_STATUS = ticketsStatus;

  
  const [status, setStatus] = useState(item?.status);

  const { mutate } = useUpdateTickets();

  useEffect(() => {
    //{id: 5, description: ' نريد تغير مفاتيح الشقة', status: 'processing', type: 'complain', createdAt: '2024-02-15T09:33:22.767Z', …}
  }, [status]);
  useEffect(() => {
    //

    setStatus(item.status);
  }, [item]);

  const updateStatus = (status) => {
    let body = { status: status };
    sendDataToParent("data is Send");
    mutate({ id: item?.id, body: body });
  };
  return (
    <>
      <Card width="-webkit-fit-content" bg="white">
        {item ? (
          <>
            <div className="cardWithimg">
              <div className={"cardWithimg_contanier"}>
                <div className="cardWithimg_contanier__icon">
                  <img
                    src={img}
                    alt="desc"
                    className="cardWithimg_contanier__icon_img"
                  />
                  <div
                    className={
                      status == TICKET_STATUS.CLOSED
                        ? "cardWithimg_contanier__icon_stats closed"
                        : status == TICKET_STATUS.ACTIVE
                        ? "cardWithimg_contanier__icon_stats activecard"
                        : status == TICKET_STATUS.PROCESSING
                        ? "cardWithimg_contanier__icon_stats process"
                        : " "
                    }
                  >
                    {t(`tickets.${item.status}`)}
                  </div>
                </div>
                <div className="cardWithimg_contanier__text">
                  <div className="cardWithimg_contanier__text_header">
                    {item.type}
                  </div>
                  <div className="cardWithimg_contanier__text_title">
                    {item.unit.name}
                  </div>

                  <div className="cardWithimg_contanier__text_name">
                    <WrapItem>
                      <Avatar
                        size="xs"
                        marginLeft="4px"
                        name="Kola Tioluwani"
                        src="https://bit.ly/tioluwani-kolawole"
                      />
                    </WrapItem>
                    {item.unit?.tenant?.firstNameAr}
                  </div>

                  <div className="cardWithimg_contanier__text_address">
                    {item.description}
                  </div>
                </div>

                <>
                  <div
                    className="cardWithimg_contanier__btns"
                    style={{
                      marginTop: status === TICKET_STATUS.CLOSED ? "0px" : "",
                    }}
                  >
                    {status === TICKET_STATUS.ACTIVE ||
                    status === TICKET_STATUS.PROCESSING ? (
                      <>
                        <Button
                          variant="solid"
                          rightIcon={<CheckIcon />}
                          colorScheme="blue"
                          marginLeft="8px"
                          width="100%"
                          backgroundColor="#2EA154"
                          color={"white"}
                          onClick={() => {
                            let sentStatus =
                              status === TICKET_STATUS.ACTIVE
                                ? TICKET_STATUS.PROCESSING
                                : TICKET_STATUS.CLOSED;
                            setStatus(sentStatus);
                            updateStatus(sentStatus);
                          }}
                        >
                          {status === TICKET_STATUS.ACTIVE ? (
                            <>{t("general.accept")}</>
                          ) : (
                            <>{t("general.solved")}</>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          rightIcon={<CloseIcon />}
                          colorScheme="red"
                          width="100%"
                          onClick={() => {
                            setStatus(TICKET_STATUS.CLOSED);
                            updateStatus(TICKET_STATUS.CLOSED);
                          }}
                        >
                          {status === TICKET_STATUS.ACTIVE ? (
                            <>{t("general.reject")}</>
                          ) : (
                            <>{t("general.closed")}</>
                          )}
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}

                    {/*  {status === TICKET_STATUS.processing ? (
                  <>
                    <Button
                      variant="solid"
                      rightIcon={<CheckIcon />}
                      colorScheme="blue"
                      marginLeft="8px"
                      width="100%"
                      onClick={() => {
                        setStatus(TICKET_STATUS.review);
                        updateStatus(TICKET_STATUS.review);
                        setData(TICKET_STATUS.review)
                        handleClick()
                      }}
                    >
                      {t("general.accept")}
                    </Button>
                    <Button
                      variant="outline"
                      rightIcon={<CloseIcon />}
                      colorScheme="red"
                      width="100%"
                      onClick={() => {
                        setStatus(TICKET_STATUS.canceled);
                        updateStatus(TICKET_STATUS.canceled);
                        setData(TICKET_STATUS.CLOSED)
                        handleClick()
                      }}
                    >
                      {t("general.reject")}
                    </Button>
                  </>
                ) : (
                  <></>
                )} */}
                  </div>
                </>
              </div>
            </div>
          </>
        ) : (
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
        )}
      </Card>
    </>
  );
};

export default TicketCard;
