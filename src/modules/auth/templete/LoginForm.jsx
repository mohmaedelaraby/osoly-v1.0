import { Card } from '@chakra-ui/react'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useLoginMutation } from '../hooks/useLoginMutation';
import { loginValidation } from '../validation/loginValidation';

function LoginForm() {

    const [show, setShow] = useState(false);

    const { mutate, isLoading } = useLoginMutation();
  
    const handleClick = () => setShow(!show);
  
    const initialValues = {
      username: "",
      password: "",
    };
  
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: loginValidation,
      onSubmit: (values) => {
        ///mutate({ username: values.username, password: values.password });
        console.log(values)
      }
    });
  return (
    <Card>

    </Card>
  )
}

export default LoginForm