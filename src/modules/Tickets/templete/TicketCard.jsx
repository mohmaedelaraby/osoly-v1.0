import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../style/ticketCard.scss";
import { ticketsStatus, ticketsTypes } from "../../../enums/TicketsEnum";
import { useUpdateTickets } from "../hooks/useUpdateTickets";

const TicketCard = ({ item }) => {
  const TICKET_STATUS = ticketsStatus;
  const TICKET_TYPES = ticketsTypes;

  const [name, setName] = useState(item?.name);
  const [type, setType] = useState(item?.type);
  const [status, setStatus] = useState(item?.status);
  const [desc, setDesc] = useState(item?.desc);

  const { mutate } = useUpdateTickets();

  useEffect(() => {
    //{id: 5, description: ' نريد تغير مفاتيح الشقة', status: 'processing', type: 'complain', createdAt: '2024-02-15T09:33:22.767Z', …}
  }, [status]);
  useEffect(() => {
    //
    console.log(item);
    setName(item.name);
    setType(item.type);
    setStatus(item.status);
    setDesc(item.desc);
  }, [item]);

  const updateStatus = (status)=> {
    let body = {'status' : status}
    mutate({id:item?.id , body:body})

  }
  return (
    <>
      <div className="card">
        <div className="card__container">
          <div className="card__container__header">
            <div className="card__container__header__title">
              <span className="card__container__header__title__desc">
                {item?.unit?.name}
              </span>
              (
              <span
                className={
                  item?.type === TICKET_TYPES.complain
                    ? "card__container__header__title__type complain"
                    : item?.type === TICKET_TYPES.service
                    ? "card__container__header__title__type service"
                    : item?.type === TICKET_TYPES.other
                    ? "card__container__header__title__type other"
                    : " "
                }
              >
                {item?.type}
              </span>
              )
            </div>
            <div
              className={
                status === TICKET_STATUS.solved
                  ? "card__container__header__status solved"
                  : status === TICKET_STATUS.canceled
                  ? "card__container__header__status canceled"
                  : status === TICKET_STATUS.processing
                  ? "card__container__header__status processsing"
                  : status === TICKET_STATUS.review
                  ? "card__container__header__status review"
                  : " "
              }
            >
              {status}
            </div>
          </div>

          <div className="card__container__body">
            <div className="card__container__body__desc">
              {item?.description}
            </div>
            <div className="card__container__body__imgs">
              <div className="card__container__body__imgs__container">
                <div className="card__container__body__imgs__container__imgs">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    className="card__container__body__imgs__container__imgs__img"
                  />
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    className="card__container__body__imgs__container__imgs__img"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card_container__btns">
            {status === TICKET_STATUS.review ? (
              <>
                  <Button
                     variant="solid"
                     leftIcon={<CheckIcon />}
                     colorScheme='blue'
                     marginLeft='8px'
                     width='100%'
                    onClick={() => {
                      setStatus(TICKET_STATUS.solved);
                      updateStatus(TICKET_STATUS.solved);
                    }}
                  >
                    solved
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<CloseIcon />}
                    colorScheme='red'
                    width='100%'
                    onClick={() => {
                      setStatus(TICKET_STATUS.canceled);
                      updateStatus(TICKET_STATUS.canceled);
                    }}
                  >
                    cancel
                  </Button>
              </>
            ) : (
              <></>
            )}

            {status === TICKET_STATUS.processing ? (
              <>
                  <Button
                    variant="solid"
                    leftIcon={<CheckIcon />}
                    colorScheme='blue'
                    marginLeft='8px'
                    width='100%'
                    onClick={() => {
                      setStatus(TICKET_STATUS.review);
                      updateStatus(TICKET_STATUS.review);
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<CloseIcon />}
                    colorScheme='red'
                    width='100%'

                    onClick={() => {
                      setStatus(TICKET_STATUS.canceled);
                      updateStatus(TICKET_STATUS.canceled);
                    }}
                  >
                    Reject
                  </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
