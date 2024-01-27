import { CheckIcon, CloseIcon, DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import '../style/ticketCard.scss'

const TicketCard = ({ item }) => {
  return (
    <Card width='75%'>
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <div className="review_contianer">
            Under Review
          </div>
         
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </Text>
      </CardBody>
     
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<CheckIcon />}>
          Accept
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<CloseIcon />}>
          Reject
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<WarningIcon />}>
          Review
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
