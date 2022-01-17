import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sign } from '../../Reducer/login';
import {
  ChakraProvider,
  Box,
  Link,
  VStack,
  theme,
  Button,
  Input,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [local, setLocal] = useState('');
  console.log(local);
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const Nav = useNavigate();
  const re = () => {
    Nav('/reset');
  };
  const re1 = () => {
    Nav('/Register');
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLocal(token);
  }, []);
  const logIn = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/login`, {
        email,
        username: email,
        password,
      });
      const data = {
        user: result.data.result,
        token: result.data.token,
      };
      Nav('/');
      dispatch(sign(data));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login success',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'worng Email or password',
        confirmButtonColor: 'black',
      });
    }
  };
  return (
    <VStack>
      <Box bg="rgba(242, 242, 242, 1)" w="100%" h="100%">
        <ChakraProvider theme={theme}>
          <VStack>
            {' '}
            <Box
              borderRadius="3px"
              boxShadow="md"
              textAlign="center"
              w="300px"
              mt="100px"
              mb="40"
              bg="#fffb"
              color="black"
            >
              <VStack mt="4">
                {!state.token ? (
                  <>
                    <h1>Login</h1>
                    <VStack mt="4">
                      <Input
                        bg="rgb(48,47,47)"
                        w="197px"
                        color="white"
                        textAlign="center"
                        placeholder="enter Email"
                        onChange={e => {
                          setEmail(e.target.value);
                        }}
                      />
                      <br />

                      <Input
                        bg="rgb(48,47,47)"
                        color="white"
                        textAlign="center"
                        type="password"
                        w="197px"
                        placeholder="enter Password"
                        onChange={e => {
                          setPassword(e.target.value);
                        }}
                      />

                      <br />
                      <Button
                        _hover={{ background: 'rgb(48,47,47)' }}
                        color="white"
                        bg="#777"
                        onClick={logIn}
                      >
                        Login
                      </Button>
                      <Link fontSize={'14px'} onClick={re1}>
                        Don't Have Account
                      </Link>

                      <Link fontSize={'14px'} onClick={re}>
                        Forget password
                      </Link>
                      <br />
                    </VStack>
                  </>
                ) : (
                  <></>
                )}
              </VStack>
            </Box>
          </VStack>
        </ChakraProvider>
      </Box>
    </VStack>
  );
};

export default Login;
