import React from 'react'
import {Formik, Form} from 'formik'
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/dist/client/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [,login] = useLoginMutation();
        return (
          <Wrapper variant='small'>
          <Formik
              initialValues={{ username: "", password: ""}}
              onSubmit={async (values, {setErrors}) => {
                  const response = await login({ options: values })
                  
                  if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors));
                  } else if (response.data?.login.user) {
                    // register succ
                    router.push("/")
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField name='username' placeholder='username' label='Username'/>
                    <Box mt={4}>
                    <InputField name='password' placeholder='password' label='Password' type='password'/>
                    </Box>
                    <Button mt={4} type='submit' isLoading={isSubmitting}>Login</Button>
                  </Form>
              )}
          </Formik>   
          </Wrapper>   
        );
}
export default withUrqlClient(createUrqlClient)(Login)
