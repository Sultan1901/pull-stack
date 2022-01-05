import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sign } from '../../Reducer/login';

import {
  ChakraProvider,
  Box,
  VStack,
  theme,
  Button,
  Input,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE = process.env.REACT_APP_ROLE;
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [local, setLocal] = useState('');
  const navigate = useNavigate();
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLocal(token);
  }, []);
  const logIn = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/login`, {
        email: username,
        password,
        username,
      });
      const data = {
        user: result.data.result,
        token: result.data.token,
      };
      console.log(result.data ,local);
      if (data.user.role === ROLE) {
        dispatch(sign(data));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login success',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/postCP');
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'worng Email or password ,',
          confirmButtonColor: 'black',
        });
      }
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
    <Box bg="rgba(2, 15, 24, 0.795)" w="100%" h="100%">
      <ChakraProvider theme={theme}>
        <VStack>
          {' '}
          <Box
            borderRadius="3px"
            border="solid black 1px"
            textAlign="center"
            w="300px"
            mt="100px"
            mb="40"
            bg="#fffb"
            color="black"
          >
            <VStack mt="4">
              {!state.token ? (
                <div>
                  <h1>Admin Conterol Panel</h1>
                  <VStack mt="4">
                    <Input
                      bg="#201f1e"
                      w="197px"
                      color="white"
                      textAlign="center"
                      type="username"
                      width="40"
                      placeholder="enter username"
                      onChange={e => {
                        setUsername(e.target.value);
                      }}
                    />
                    <br />

                    <Input
                      bg="#201f1e"
                      color="white"
                      textAlign="center"
                      type="password"
                      width="40"
                      placeholder="enter Password"
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />

                    <br />
                    <Button bg="#777" onClick={logIn}>
                      Login
                    </Button>

                    <br />
                  </VStack>
                </div>
              ) : (
                <></>
              )}
            </VStack>
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default Login;
