import React, { useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Button,
  Input,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Reset = () => {
  const [email, setEmail] = useState('');
  const checkemail = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/check`, {
        email: email,
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'please check your Email to reset your password',
        showConfirmButton: false,
        timer: 2000,
      });
      console.log(result);
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, please try again.',
        confirmButtonColor: 'black',
      });
    }
  };

  return (
    <Box h="100%" bg="rgba(242, 242, 242, 1)">
      <ChakraProvider>
        <VStack>
          {' '}
          <Box
            borderRadius="3px"
            boxShadow="md"
            textAlign="center"
            w="300px"
            mt="100px"
            mb="180px"
            bg="#fffb"
            color="black"
            p="4"
          >
            <Text>Reset Password</Text>
            <Input
              m="10px"
              w="200px"
              bg="rgb(48,47,47)"
              color="white"
              textAlign="center"
              type="email"
              width="40"
              placeholder="Your Email"
              onChange={e => {
                setEmail(e.target.value);
              }}
            ></Input>
            <Button
              color="white"
              bg="rgb(48,47,47)"
              onClick={checkemail}
              mt="20px"
            >
              Send reset code
            </Button>
          </Box>{' '}
          <br />
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default Reset;
