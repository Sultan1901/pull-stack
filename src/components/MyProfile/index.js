import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Input,
  Image,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const MyProfile = () => {
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const [flag, setFlag] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, []);
  const result = async () => {
    await axios
      .get(`${BASE_URL}/getUserById/${state.Login.user._id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setUser(result.data);
      });
  };
  const updateUser = async () => {
    await axios.put(
      `${BASE_URL}/updateUser/${state.Login.user._id}`,
      {
        username: username,
        email,
        img: img,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    setFlag(false);
    result();
  };

  return (
    <Box bg="rgba(242, 242, 242, 1)">
      <ChakraProvider theme={theme}>
        <VStack>
          <Box bg="rgba(242, 242, 242, 1)" h="80%" w="50%">
            {user.length &&
              user.map(e => (
                <Box key={e._id} mt="30" mb="250" pt="20" w="50">
                  <VStack bg="white" boxShadow="md" borderRadius="5">
                    <Image w="80px" mt="5" borderRadius="full" src={e.img} />
                    <Text>{e.username}</Text>
                    <Text>{e.email}</Text>
                    {flag && (
                      <>
                        <Input
                          w="100"
                          textAlign="center"
                          defaultValue={e.username}
                          onChange={e => {
                            setUsername(e.target.value);
                          }}
                          placeholder="username"
                        />
                        <br />
                        <Input
                          w="100"
                          textAlign="center"
                          defaultValue={e.email}
                          onChange={e => {
                            setEmail(e.target.value);
                          }}
                          placeholder="Email"
                        />
                        <Input
                          w="100"
                          Value={e.img}
                          textAlign="center"
                          onChange={e => {
                            setImg(e.target.value);
                          }}
                          placeholder="Image"
                        />
                      </>
                    )}
                    <br />
                    <EditIcon
                      m="4"
                      cursor="pointer"
                      onClick={() => {
                        setFlag(true);
                        if (flag) {
                          updateUser();
                        }
                      }}
                    >
                      update
                    </EditIcon>{' '}
                    <br />
                  </VStack>{' '}
                </Box>
              ))}
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default MyProfile;
