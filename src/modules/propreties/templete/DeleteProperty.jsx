import { Button, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useDynamicColors } from "../../../hooks/useDynamicColors";
import { useTranslation } from "react-i18next";
import "../style/deletePopup.scss";
import { useDeleteProperty } from "../hooks/useDeleteProperties";

const DeleteProperty= ({ onClose, item }) => {
  const { t } = useTranslation();

  // delete user
  const { mutate, isSuccess ,isDeleteLoading } = useDeleteProperty();
  const { primary, secondry } = useDynamicColors();

  useEffect(() => {
    if (isSuccess && !isDeleteLoading) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <div className="deletePopup">
      <div className="deletePopup_container">
        <div className="deletePopup_text_conatnier">
          <p className="deletePopup_text">{t("general.delete_prob")} </p>
          <p className="deletePopup_name">{item?.name ? item?.name : item[0]?.name} </p>
        </div>

        <div className="deletePopup_buttons">
          <Stack direction="row" width="100%" justify="space-between">
            <Button
              padding="0px 49px"
              variant="solid"
              color={secondry}
              bg={primary}
              onClick={() => {
                mutate(item?.id ? item?.id : item[0]?.id);
              }}
              isLoading={isDeleteLoading}
            >
              {t("general.delete")}
            </Button>
            <Button
              onClick={onClose}
              padding="0px 26px"
              color={"#010B38"}
              variant="outline"
            >
              {t("general.cancel")}
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DeleteProperty;
