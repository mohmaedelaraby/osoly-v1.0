import { Card } from '@chakra-ui/react'
import image from '../../assets/images/houseImg.png'
import "../../assets/styels/components/cards.scss";

import React from 'react'

function CardWithImg({img=image , title , price , address}) {
  return (
    <Card width='-webkit-fit-content'>
        <div className="cardWithimg">
            <div className="cardWithimg_contanier">
                <div className="cardWithimg_contanier__icon">
                    <img src={img} alt="desc"  height='183'/>
                </div>
                <div className="cardWithimg_contanier__text">
                    <div className="cardWithimg_contanier__text_title">{title}</div>
                    <div className="cardWithimg_contanier__text_priceContainer"> <span className='cardWithimg_contanier__text_price'>{price}</span> <span className='cardWithimg_contanier__text_price_desc'>ريال/شهري</span></div>
                    <div className="cardWithimg_contanier__text_address">{address}</div>
                </div>
            </div>
        </div>
  </Card>
  )
}

export default CardWithImg