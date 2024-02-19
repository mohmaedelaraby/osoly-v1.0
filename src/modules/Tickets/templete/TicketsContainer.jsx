import React, { useEffect, useState } from "react";
import { tickets } from "../../../mocks/tickets";
import {
  Button,
  CardHeader,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { EditIcon, RepeatIcon, UpDownIcon } from "@chakra-ui/icons";
import { ticketsStatus, ticketsTypes } from "../../../enums/TicketsEnum";
import TicketCard from "./TicketCard";

function TicketsContainer() {
  const [isEditingFilter, setIsEditingFilter] = useBoolean();
  const [isEditingSort, setIsEditingSort] = useBoolean();
  const [statuss, setStatus] = React.useState(0);
  const [typee, setType] = React.useState(0);
  const [filterdTickets, setFilterdTickets] = useState(tickets);
//for filter data
  useEffect(() => {
    // it means show all
    if (statuss !== 0) {
      const newFiltered = tickets.filter((s) => s.status == statuss);
      setFilterdTickets(newFiltered);
    }else{
      setFilterdTickets(tickets)
    }
  }, [statuss]);
//for sorting data
  useEffect(() => {
    // it means show all
    let newFiltered
    if (typee !== 0) {
      if(typee==1){
         newFiltered = tickets.sort(function(a, b) { 
          return a.type - b.type 
        });
      }
      else{
         newFiltered = tickets.sort(function(a, b) { 
          return b.type - a.type 
        });
      }
      setFilterdTickets(newFiltered);
    }/* else{
      setFilterdTickets(tickets)
    } */
  }, [typee]);
  return (
    <>
      <CardHeader>
        <div className="tabel_header">
          <span className="tabel_header_text">
            <Text>Tickets</Text>
          </span>
          <span className="tabel_header_addBtn">
            <Button
              leftIcon={<RepeatIcon />}
              className="tabel_header_addBtn_btn"
              marginRight="8px"
              variant="outline"
              onClick={()=>setStatus(0)}
            >
              Reset
            </Button>

              {/* sort popup */}
              <Popover
              isOpen={isEditingSort}
              onOpen={setIsEditingSort.on}
              onClose={setIsEditingSort.off}
              closeOnBlur={false}
              isLazy
              lazyBehavior="keepMounted"
            >
              <HStack>
                <PopoverTrigger>
                  <Button
                    leftIcon={<UpDownIcon />}
                    className="tabel_header_addBtn_btn"
                    variant="outline"
                    marginRight='8px'
                  >
                    {isEditingSort ? "Save" : "Sort"}
                  </Button>
                </PopoverTrigger>
              </HStack>

              <PopoverContent>
                <PopoverBody>
                  Types:
                  <RadioGroup
                    marginTop="8px"
                    value={typee}
                    onChange={(newType) => setType(parseInt(newType))}
                  >
                    <Radio value={ticketsTypes.service} marginRight="6%">
                    service
                    </Radio>
                    <Radio value={ticketsTypes.complian} marginRight="6%">
                    complian
                    </Radio>
                    <Radio value={ticketsTypes.other} marginRight="6%">
                    other
                    </Radio>
                  </RadioGroup>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            {/* filter popup */}
            <Popover
              isOpen={isEditingFilter}
              onOpen={setIsEditingFilter.on}
              onClose={setIsEditingFilter.off}
              closeOnBlur={false}
              isLazy
              lazyBehavior="keepMounted"
            >
              <HStack>
                <PopoverTrigger>
                  <Button
                    leftIcon={<EditIcon />}
                    className="tabel_header_addBtn_btn"
                    variant="outline"
                  >
                    {isEditingFilter ? "Save" : "Filter"}
                  </Button>
                </PopoverTrigger>
              </HStack>

              <PopoverContent>
                <PopoverBody>
                  Types:
                  <RadioGroup
                    marginTop="8px"
                    value={statuss}
                    onChange={(newType) => setStatus(parseInt(newType))}
                  >
                    <Radio value={ticketsStatus.solved} marginRight="15%">
                      solved
                    </Radio>
                    <Radio value={ticketsStatus.canceled} marginRight="12%">
                      canceled
                    </Radio>
                    <Radio value={ticketsStatus.processing} marginRight="5%">
                      processing
                    </Radio>
                    <Radio value={ticketsStatus.review}>review</Radio>
                  </RadioGroup>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </span>
        </div>
      </CardHeader>

      <div className="tickets_container">
        {filterdTickets.map((item, index) => (
          <>
            <div className="tickets_item">
              <TicketCard item={item} key={index}></TicketCard>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default TicketsContainer;
