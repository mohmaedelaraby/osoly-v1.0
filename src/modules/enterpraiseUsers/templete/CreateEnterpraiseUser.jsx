import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { userEnterpraiseValidation } from "../validation/schema";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import "../../../assets/styels/components/forms.scss";
import close from "../../../assets/icons-svgs/close.svg";
import goldCrown from "../../../assets/icons-svgs/goldCrown.svg";
import silverCrown from "../../../assets/icons-svgs/silverCrown.svg";
import blueCrown from "../../../assets/icons-svgs/blueCrown.svg";
import CardWithNumber from "../../../components/Cards/CardWithNumber";

const CreateEnterpraiseUser = ({ onClose, plans }) => {
  const initialValues = {
    name: "",
    date: "",
    duration: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userEnterpraiseValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const plansWihtCrowns = [];
  useEffect(()=>{
    console.log("first",plans)
  },[])

  const [duration, setDuration] = useState("1");

  return (
    <div className="from__card from__card__full">
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form__header">
          <div className="form__header_text">إضافة مؤسس جديد</div>
          <div className="form__header_close">
            <img src={close} alt="" width="40px" onClick={onClose} />
          </div>
        </div>

        <div className="form__input form__input__flex">
          <FormControl className="form__input__container">
            <Input
              name="name"
              size="lg"
              type="text"
              className="form__input__container__input"
              placeholder="اسم المؤسس "
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />

            <div className="form__input__container__warn">
              {formik.touched.name && formik.errors.name ? (
                <Text color="#EE2E2E" fontSize="sm" className="mt-2">
                  {formik.errors.name}
                </Text>
              ) : null}
            </div>
          </FormControl>
        </div>

        

        <div className="from__card_plans">
          <div className="from__card_plans_title">حدد الباقة</div>
          <div className="from__card_plans_cards">
            {plans ? (
              <>
             
              <div key={plans[0]?.id} className="from__card_plans_cards_planCard">
                <div className="from__card_plans_cards_planCard_contianer">
                  <div className="from__card_plans_cards_planCard_contianer_img" style={{backgroundColor:'#FEF9E2'}}>
                    <img src={goldCrown} alt="gold" width={'32px'} height={'32px'}/>
                  </div>
                  <div className="from__card_plans_cards_planCard_contianer_name">
                    {plans[0]?.name}
                  </div>
                  <div className="from__card_plans_cards_planCard_contianer_desc">
                  {plans[2]?.desc ?  plans[2]?.desc  :' وصف الباقة وصف الباقة وصف الباقة وصف الباقة وصف الباقةوصف الباقة' }
                    </div>
                </div>
              </div>
          
              <div key={plans[1]?.id}  className="from__card_plans_cards_planCard">
                <div className="from__card_plans_cards_planCard_contianer">
                  <div className="from__card_plans_cards_planCard_contianer_img"  style={{backgroundColor:'#EDEEF2'}}>
                    <img src={silverCrown} alt="gold" width={'32px'} height={'32px'}/>
                  </div>
                  <div className="from__card_plans_cards_planCard_contianer_name">
                    {plans[1]?.name}
                  </div>
                  <div className="from__card_plans_cards_planCard_contianer_desc">
                  {plans[1]?.desc ?  plans[1]?.desc  :' وصف الباقة وصف الباقة وصف الباقة وصف الباقة وصف الباقةوصف الباقة' }

                  </div>
                </div>
              </div>
           
              <div key={plans[2]?.id}  className="from__card_plans_cards_planCard">
                <div className="from__card_plans_cards_planCard_contianer">
                  <div className="from__card_plans_cards_planCard_contianer_img" style={{backgroundColor:'#EFF9FF'}}>
                    <img src={blueCrown} alt="gold"  width={'32px'} height={'32px'}/>
                  </div>
                  <div className="from__card_plans_cards_planCard_contianer_name">
                    {plans[2]?.name}
                  </div>
                  <div className="from__card_plans_cards_planCard_contianer_desc">
                    {plans[2]?.desc ?  plans[2]?.desc  :' وصف الباقة وصف الباقة وصف الباقة وصف الباقة وصف الباقةوصف الباقة' }
                    </div>
                </div>
              </div>
                
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="form__btn__container">
          <Stack direction="row" width="100%" justify="space-between">
            <Button
              padding="0px 49px"
              variant="solid"
              color="white"
              bg="#194C81"
              type="submit"
            >
              اضافه
            </Button>
            <Button
              onClick={onClose}
              padding="0px 26px"
              color={"#010B38"}
              variant="outline"
            >
              الغاء
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
};

export default CreateEnterpraiseUser;
