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

const TicketCard = ({ item }) => {
  const TICKET_STATUS__KEYS = Object.keys(ticketsStatus);
  const TICKET_STATUS__Values = ticketsStatus;
  const TICKET_TYPES = ticketsTypes; 

  const [name,setName]=useState(item?.name)
  const [type,setType]=useState(item?.type)
  const [status,setStatus]=useState(item?.status)
  const [desc,setDesc]=useState(item?.desc)

  useEffect(() => {
    //
  }, [status]);
  useEffect(() => {
    //
    setName(item.name)
    setType(item.type)
    setStatus(item.status)
    setDesc(item.desc)
  }, [item]);
  return (
    <Card width="95%">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">{name}</Heading>
              <Text color='gray' fontSize='large' fontWeight='bold'>{type== TICKET_TYPES.service ? 'service' : type== TICKET_TYPES.complian ? 'complian' :type == TICKET_TYPES.other ? 'other':''}</Text>
            </Box>
          </Flex>
          <div
            className={
              status === TICKET_STATUS__Values.solved
                ? "review_contianer solved"
                : status === TICKET_STATUS__Values.canceled
                ? "review_contianer canceled"
                : status === TICKET_STATUS__Values.processing
                ? "review_contianer processsing"
                : status === TICKET_STATUS__Values.review
                ? "review_contianer review"
                : " "
            }
          >
            {
              status === TICKET_STATUS__Values.solved
                ? " solved"
                : status === TICKET_STATUS__Values.canceled
                ? " canceled"
                : status === TICKET_STATUS__Values.processing
                ? " processsing"
                : status === TICKET_STATUS__Values.review
                ? " review"
                : " "
            }
          </div>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{desc}</Text>
      </CardBody>
      {status === TICKET_STATUS__Values.processing ? (
        <>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<CheckIcon />} onClick={()=>{setStatus(4);}}>
              Accept 
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<CloseIcon />} onClick={()=>{setStatus(2);}}>
              Reject 
            </Button>
          </CardFooter>
        </>
      ) : (
        <></>
      )}

      {status === TICKET_STATUS__Values.review ? (
        <>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<CheckIcon />} onClick={()=>{setStatus(1);}}>
              solved 
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<CloseIcon />} onClick={()=>{setStatus(2);}}>
              cancel
            </Button>
          </CardFooter>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default TicketCard;
