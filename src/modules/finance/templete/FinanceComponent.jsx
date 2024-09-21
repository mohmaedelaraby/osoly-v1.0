import React from "react";
import "../../../assets/styels/components/Table.scss";

import CardWithNumber from "../../../components/Cards/CardWithNumber";

import { useTranslation } from "react-i18next";
import PageHeader from "../../../components/shared/PageHeader";
import financeIcon from "../../../assets/icons-svgs/finance.svg";

const FinanceTable = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="page">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("enterprise.page.header")}></PageHeader>
          </div>
          
          <div className="page_container_cards pb-24 ">
            <CardWithNumber
              icon={financeIcon}
              number={10000}
              desc={t("finance.cards.total_rent_units_profit")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={financeIcon}
              number={25000}
              desc={t("finance.cards.total_profit")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={financeIcon}
              number={440500}
              desc={t("finance.cards.total_adds")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
          </div>
          <div className="page_container_cards page_container_cards_two pb-24 ">
            <CardWithNumber
              icon={financeIcon}
              number={10000}
              desc={t("finance.cards.total_loans_rent")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={financeIcon}
              number={76}
              desc={t("finance.cards.total_rent_units")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
           </div>
          <div className="page_container_cards">
            <CardWithNumber
              icon={financeIcon}
              number={34}
              desc={t("finance.cards.total_free_units")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={financeIcon}
              number={110}
              desc={t("finance.cards.total_contracts")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
            <CardWithNumber
              icon={financeIcon}
              number={3400000}
              desc={t("finance.cards.total_contracts_profits")}
              bg={"#E2FBD7"}
            ></CardWithNumber>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceTable;
