import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Image,
  HStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const User = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [user, setUser] = useState('');
  const [post, setPost] = useState([]);
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  const { id } = useParams();
  useEffect(() => {
    result();
    result1();
    // eslint-disable-next-line
  }, []);
  const result = async () => {
    await axios
      .get(`${BASE_URL}/getUserById/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setUser(result.data);
      });
  };

  const result1 = async () => {
    const data = await axios
      .get(`${BASE_URL}/getPostsUser/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setPost(result.data);
        console.log(data);
      });
  };
  return (
    <Box bg="rgba(242, 242, 242, 1)">
      <ChakraProvider theme={theme}>
        <VStack h="100%">
          <Box w="50%">
            
              {user.length === 0 ? (
                <Box  h="309px">
                  <Text fontSize='3rem' mt='35'>please Login</Text>
                </Box>
              ) : (
                user.map(e => (
                  <Box mt="100" boxShadow="md" mb="250" pb="4">
                    {' '}
                    <>
                      <VStack m="10">
                        <Image
                          w="80px"
                          mt="6"
                          borderRadius="full"
                          src={e.img}
                        />
                        <Text>{e.email}</Text>
                        <Text pb="4">{e.username}</Text>
                        <hr /> <Text> Previous Posts</Text>{' '}
                        <Box
                          pb="3"
                          p="5px"
                          borderRadius="5px"
                          border="solid silver 1px"
                        >
                          {' '}
                          {post.map(e => (
                            <>
                              <HStack>
                                {' '}
                                <StarIcon
                                  w="3"
                                  cursor="pointer"
                                  color="#c5a087"
                                >
                                  Like{' '}
                                </StarIcon>{' '}
                                )
                                <Text
                                  as="strong"
                                  fontSize="15px"
                                  fontFamily="Roman"
                                >
                                  {e.like.length}
                                </Text>{' '}
                                <Text
                                  cursor="pointer"
                                  fontSize="18px"
                                  fontFamily="mono"
                                  color="black"
                                >
                                  {e.title}
                                </Text>
                                <Text color="black" fontSize="12px">
                                  on {e.time.slice(0, 10)}
                                </Text>
                              </HStack>
                            </>
                          ))}
                        </Box>
                      </VStack>{' '}
                    </>
                  </Box>
                ))
              )}
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default User;
