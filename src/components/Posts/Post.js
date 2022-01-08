import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import axios from 'axios';
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
} from '@chakra-ui/react';

export default function Post() {
  const [comments, setComments] = useState([]);
  const Nav = useNavigate();

  const [newcomment, setNewComment] = useState('');
  const [post, setPost] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [logedin, setLogedin] = useState(false);

  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  useEffect(() => {
    result1();

    // eslint-disable-next-line
  }, [comments]);
  useEffect(() => {
    if (state.Login.token) {
      setLogedin(true);
    } else {
      setLogedin(false);
    }
  }, [state]);
  const { id } = useParams();
  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, []);

  const result = async () => {
    await axios
      .get(`${BASE_URL}/getComments/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setComments(result.data);
      });
  };
  const result1 = async () => {
    await axios
      .get(`${BASE_URL}/getPostById/${comments[0].postId._id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then(result => {
        setPost(result.data);
      });
  };
  const addcomment = async postId => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addComment`,
        {
          description: newcomment,
          postId,
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
  const redirect = () => {
    Nav('/posts');
  };

  const addVot = async commentId => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addVot`,
        {
          commentId: commentId,
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
  return (
    <Box pb="3" bg="rgba(242, 242, 242, 1)" h="100%">
      <ChakraProvider theme={theme}>
        <VStack>
          <Box
            background="rgba(252, 252, 252, 0.815)"
            w="80%"
            mt="1%"
            border="solid 2px gray"
            padding="20px"
            borderRadius="4"
          >
            {post.map(e => (
              <>
                {
                  <>
                    <HStack mb="5">
                      <Image
                        display="inline"
                        w="8"
                        h="8"
                        borderRadius="full"
                        src={e.userId.img}
                      />
                      <Link
                        onClick={() => Nav(`/profile/${e.userId._id}`)}
                        mr="400"
                        color="black"
                        fontSize="12px"
                        as="strong"
                      >
                        by {e.userId.username}
                      </Link>{' '}
                    </HStack>{' '}
                  </>
                }{' '}
              </>
            ))}
            {comments.length && (
              <>
                {' '}
                {}
                <Text mb="9" color="black" fontFamily="Roman" fontSize="29">
                  {comments[0].postId.title}
                </Text>
                <Text mb="9" color="black" fontFamily="Roman" fontSize="18">
                  {comments[0].postId.description}
                </Text>
              </>
            )}
            <hr />
            <>
              <Box mt="8">
                {' '}
                {!logedin ? (
                  <></>
                ) : (
                  <>
                    <Input
                      onChange={e => {
                        setNewComment(e.target.value);
                      }}
                      placeholder="add comment"
                      w="250"
                      textAlign="center"
                    />
                    <Button
                      bg="rgb(48,47,47)"
                      color="white"
                      ml="4"
                      onClick={e => addcomment(id)}
                    >
                      {' '}
                      Reply
                    </Button>
                  </>
                )}
              </Box>{' '}
            </>{' '}
            {comments
              .map((item, index) => {
                return (
                  <div key={item._id}>
                    {' '}
                    <HStack pt="4">
                      {' '}
                      <Image
                        display="inline"
                        w="8"
                        h="8"
                        borderRadius="full"
                        src={item.userId.img}
                      />{' '}
                      <Link
                        onClick={() => Nav(`/profile/${item.userId._id}`)}
                        mr="400"
                        color="black"
                        fontSize="12px"
                        as="strong"
                      >
                        by {item.userId.username}
                      </Link>{' '}
                      <Text
                        color="black"
                        onClick={() => Nav(`/profile/${item.userId._id}`)}
                        mr="400"
                        fontSize="12px"
                      >
                        on {item.time.slice(0, 10)} {item.time.slice(11, 16)}
                      </Text>
                      <br />
                      <ht />
                    </HStack>
                    <Box mt="5" position="right">
                      <HStack>
                        <StarIcon
                          w="3"
                          cursor="pointer"
                          color="#c5a087"
                          onClick={() => addVot(item._id)}
                        >
                          Like{' '}
                        </StarIcon>
                        <Text
                          as="strong"
                          fontSize="12px"
                          fontFamily="Roman"
                          color="black"
                        >
                          {item.vot.length}
                        </Text>
                      </HStack>{' '}
                    </Box>
                    <Text
                      pt="33"
                      m="5"
                      p="3"
                      boxShadow="md"
                      borderRadius="3"
                      bg="white"
                      color="black"
                      fontSize="15px"
                    >
                      {item.description}
                    </Text>
                    <hr />
                  </div>
                );
              })
              .reverse()}{' '}
            <Button bg="rgb(48,47,47)" color="white" mt="4" onClick={redirect}>
              Back
            </Button>{' '}
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
}
