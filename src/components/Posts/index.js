import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AddIcon, ChatIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Input,
  Button,
  Link,
  Image,
  HStack,
  useToast,
  CircularProgress,
  Textarea,
} from '@chakra-ui/react';

const Posts = () => {
  const Nav = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [post, setPost] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [logedin, setLogedin] = useState(false);
  const [show, setshow] = useState(false);

  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  console.log(state);

  useEffect(() => {
    if (state.Login.token) {
      setLogedin(true);
    } else {
      setLogedin(false);
    }
  }, [state]);

  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, []);
  const result = async () => {
    const data = await axios
      .get(`${BASE_URL}/getPosts`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setPost(result.data);
        //  setLikeid()
        console.log(data);
      });
  };
  const addpost = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addPost`,
        {
          description: newPost,
          title: newTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );

      result();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const del = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });

      result();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const addlike = async postId => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addLike`,
        {
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );

      result();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const dellike = async id => {
    console.log(id);
    try {
      const res = await axios.put(
        `${BASE_URL}/deleteLike/${id._id}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );

      result();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const toast = useToast();

  return (
    <ChakraProvider theme={theme}>
      <Box pt="5" pb="6" bg="rgba(242, 242, 242, 1)">
        <VStack>
          <Box
            bg="rgba(252, 252, 252, 0.815)"
            w="80%"
            mt="1%"
            border="solid 1px black"
            padding="20px"
            borderRadius="4"
          >
            <VStack>
              {' '}
              {!logedin ? (
                <></>
              ) : (
                <>
                  {show ? (
                    <>
                      {' '}
                      <Input
                        w="200px"
                        onChange={e => {
                          setNewTitle(e.target.value);
                        }}
                        placeholder="Title"
                        textAlign="center"
                      ></Input>
                      <Textarea
                        w="400px"
                        color="black"
                        onChange={e => {
                          setNewPost(e.target.value);
                        }}
                        placeholder="Description"
                        textAlign="center"
                      />{' '}
                      <Button
                        bg="rgb(48,47,47)"
                        color="white"
                        onClick={() => {
                          addpost();
                          setshow(false);
                          toast({
                            title: 'your post submitted successfully',

                            status: 'success',
                            duration: 4000,
                            isClosable: true,
                          });
                        }}
                      >
                        Submit
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {show ? (
                    <Button
                      color="white"
                      bg="rgb(216, 79, 79)"
                      onClick={() => setshow(false)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      bg="rgb(48,47,47)"
                      color="white"
                      onClick={() => setshow(true)}
                    >
                      Add Post <AddIcon ml="2" />
                    </Button>
                  )}
                </>
              )}
            </VStack>
            {post.length === 0 ? (
              <CircularProgress
                size="120px"
                mt="3"
                mb="3"
                position=""
                isIndeterminate
                color="blue.300"
              />
            ) : (
              post
                .map(e => (
                  <Box
                    bg="white"
                    borderRadius="4"
                    boxShadow="md"
                    p="2"
                    mt="6"
                    key={e._id}
                    transition="0.3s ease-in-out"
                    _hover={{
                      transition: '0.3s ease-in-out',
                      transform: 'scale(1.02)',
                    }}
                  >
                    <HStack>
                      <Image
                        display="inline"
                        w="5"
                        borderRadius="full"
                        src={e.userId.img}
                      />
                      <Link
                        onClick={() =>
                          logedin
                            ? Nav(`/profile/${e.userId._id}`)
                            : toast({
                                position: 'bottom-left',
                                render: () => (
                                  <Box color="white" p={3} bg="red.500">
                                    please log in
                                  </Box>
                                ),
                              })
                        }
                        mr="400"
                        fontSize="12px"
                        as="strong"
                      >
                        {e.userId.username}
                      </Link>
                      <Text color="black" fontSize="12px">
                        on {e.time.slice(0, 10)} {e.time.slice(11, 16)}
                      </Text>
                    </HStack>
                    <Text
                      cursor="pointer"
                      onClick={() => Nav(`/post/${e._id}`)}
                      fontSize="18px"
                      fontFamily="mono"
                    >
                      {e.title}
                    </Text>
                    <HStack>
                      {' '}
                      <ChatIcon
                        cursor="pointer"
                        onClick={() =>
                          logedin
                            ? Nav(`/post/${e._id}`)
                            : toast({
                                position: 'bottom-left',
                                render: () => (
                                  <Box color="white" p={3} bg="red.500">
                                    please log in
                                  </Box>
                                ),
                              })
                        }
                        fontSize="13px"
                        fontFamily="mono"
                        color="black"
                      ></ChatIcon>
                      <Text as="strong" fontSize="12">
                        {e.commentId.length}
                      </Text>{' '}
                     
                      {!e.like.some(l => l.userId === state.Login.user?._id ) ? (
                        <StarIcon
                          w="3"
                          cursor="pointer"
                          color="silver"
                          onClick={() =>
                            logedin
                              ? addlike(e._id)
                              : toast({
                                  position: 'bottom-left',
                                  render: () => (
                                    <Box color="white" p={3} bg="red.500">
                                      please log in
                                    </Box>
                                  ),
                                })
                          }
                        />
                      ) : (
                        <StarIcon
                          w="3"
                          cursor="pointer"
                          color="#c5a087"
                          onClick={() =>
                            logedin
                              ? dellike(
                                  e.like.find(
                                    l => l.userId === state.Login.user._id
                                  )
                                )
                              : toast({
                                  position: 'bottom-left',
                                  render: () => (
                                    <Box color="white" p={3} bg="red.500">
                                      please log in
                                    </Box>
                                  ),
                                })
                          }
                        />
                      )}
                      <Text as="strong" fontSize="12px" fontFamily="Roman">
                        {e.like.length}
                      </Text>
                      <>
                        {' '}
                        {!logedin || e.userId._id !== state.Login.user._id ? (
                          <></>
                        ) : (
                          <DeleteIcon
                            w="3"
                            cursor="pointer"
                            position="end"
                            marginBottom="33"
                            onClick={() => {
                              del(e._id);
                            }}
                         />
                           
                        )}
                      </>
                    </HStack>{' '}
                  </Box>
                ))
                .reverse()
            )}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Posts;
