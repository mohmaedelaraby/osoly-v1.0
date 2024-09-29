import React from "react";
import PageHeader from "../shared/PageHeader";
import { useTranslation } from "react-i18next";
import { Card, CardBody } from "@chakra-ui/react";

function PravicyPolicy() {
  const { t } = useTranslation();
  return (
    <>
      <div className="page" dir="rtl">
        <div className="page_container">
          <div className="page_container_header">
            <PageHeader title={t("sidebar.settings")}></PageHeader>
          </div>

          <div className="page_container_table">
            <>
              <Card className="from__card" width="100%">
                <CardBody>
                  <div>
                    <h1 className="mb-8">{t("privacyPolicy.introduction")}</h1>
                    <p className="mb-24">{t("privacyPolicy.dataWeCollect")}</p>
                    <ul>
                      {t("privacyPolicy.dataList", { returnObjects: true }).map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>

                    <h2 className="mb-8">
                      {t("privacyPolicy.howWeUseYourData.providingServices")}
                    </h2>
                    <p className="mb-24">
                      {t("privacyPolicy.howWeUseYourData.providingServices")}
                    </p>
                    <p className="mb-24">
                      {t("privacyPolicy.howWeUseYourData.improvingServices")}
                    </p>

                    <h2 className="mb-8">
                      {t("privacyPolicy.sharingWithAnalyticsCompanies")}
                    </h2>
                    <p className="mb-24">
                      {t("privacyPolicy.sharingWithAnalyticsCompanies")}
                    </p>

                    <h2 className="mb-8">{t("privacyPolicy.dataSharing")}</h2>
                    <p className="mb-8">{t("privacyPolicy.dataSharing")}</p>
                    <ul>
                      {t("privacyPolicy.dataShareList", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={index}>
                          <strong>{item.title}:</strong> {item.description}
                        </li>
                      ))}
                    </ul>

                    <h2 className="mb-8">{t("privacyPolicy.dataSecurity")}</h2>
                    <p className="mb-24">{t("privacyPolicy.dataSecurity")}</p>
                    <p className="mb-24">
                      {t("privacyPolicy.dataSecurityDetails")}
                    </p>

                    <h2 className="mb-8">{t("privacyPolicy.userRights")}</h2>
                    <p className="mb-24">
                      {t("privacyPolicy.userRightsDetails.accessToData")}
                    </p>
                    <p className="mb-24">
                      {t("privacyPolicy.userRightsDetails.correctionOfData")}
                    </p>
                    <p className="mb-24">
                      {t("privacyPolicy.userRightsDetails.accountDeletion")}
                    </p>

                    <h2 className="mb-8">
                      {t("privacyPolicy.changesToThisPolicy")}
                    </h2>
                    <p className="mb-24">
                      {t("privacyPolicy.changesToThisPolicy")}
                    </p>

                    <h2 className="mb-8">{t("privacyPolicy.contactUs")}</h2>
                    <p className="mb-24">
                      {t("privacyPolicy.contactUs")}
                      <a href="mailto:com.usooly@Superadmin">
                        com.usooly@Superadmin
                      </a>
                      .
                    </p>
                  </div>
                </CardBody>
              </Card>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default PravicyPolicy;
