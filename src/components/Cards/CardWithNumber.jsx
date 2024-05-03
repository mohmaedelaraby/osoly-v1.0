import { Card, Spinner } from '@chakra-ui/react'
import "../../assets/styels/components/cards.scss";

import React from 'react'

function CardWithNumber({icon , number , desc , bg}) {
  return (
    <Card width='100%'>
        <div className="cardWithNum">
            <div className="cardWithNum_contanier">
                <div style={{'backgroundColor':bg}} className="cardWithNum_contanier__icon">
                    <img src={icon} alt="desc" width='32px' height='32px'/>
                </div>
                <div className="cardWithNum_contanier__text">
                    <div className="cardWithNum_contanier__text_number fo_primary">{number ? (<>{number}</>) : (<><Spinner /></>)}</div>
                    <div className="cardWithNum_contanier__text_desc">{desc}</div>
                </div>
            </div>
        </div>
  </Card>
  )
}

export default CardWithNumber