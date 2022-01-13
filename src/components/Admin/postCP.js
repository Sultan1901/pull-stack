import React, { useState, useEffect } from 'react';
import { getpost } from '../../Reducer/post';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteIcon, StarIcon, AddIcon } from '@chakra-ui/icons';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  theme,
  HStack,
  Input,
} from '@chakra-ui/react';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE = process.env.REACT_APP_ROLE;


const PostCP = () => {
  const [newpost, setNewPost] = useState('');
  const [newcomment, setNewComment] = useState('');
  const [local, setlocal] = useState(false);

  const dispatch = useDispatch();
  

  const state = useSelector(state => {
    return state;
  });
  useEffect(() => {
    if (state.Login.token) {
      setlocal(true);
    } else {
      setlocal(false);
    }
  }, [state]);

  useEffect(() => {
    setNewPost(' ');
    postshow();
    // eslint-disable-next-line
  }, []);

  const postshow = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/getPostsAdmin`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });

      dispatch(getpost(result.data));
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
      console.log(res);
      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  const delComment = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}/deleteComment/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
      console.log(res);
      postshow();
    } catch (error) {
      console.log(error);
    }
  };

  const addpost = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addPost`,
        {
          description: newpost,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      console.log(res);
      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  const addcomment = async postId => {
    try {
      const res = await axios.post(
        `${BASE_URL}/addComment`,
        {
          description: newcomment,
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      console.log(res);

      postshow();
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
      console.log(res);

      postshow();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      {state?.Login?.user?.role === ROLE && local ? (
        <Box bg="rgba(0, 0, 0, 0.87)">
          <Link color="red" href="/userCp">
            Users cpanel
          </Link>
          <br />
          <Link color="red" href="/postCp">
            Post cpanel
          </Link>{' '}
          <VStack>
            <Box
              bg="rgba(6, 6, 7, 0.226)"
              w="800px"
              mt="1%"
              m="2%"
              border="solid 2px gray"
              padding="20px"
              borderRadius="4"
            >
              <VStack>
                <Text color="white">POSTS</Text>

                <HStack>
                  <Input
                    w="200px"
                    color="white"
                    onChange={e => {
                      setNewPost(e.target.value);
                    }}
                    placeholder="add Post"
                  />
                  <AddIcon cursor="pointer" color="white" onClick={addpost}>
                    add Post
                  </AddIcon>
                </HStack>
                {newpost && newpost.length && (
                  <>
                    {state.postRD.post.map(e => (
                      <>
                        <Box
                          w="750px"
                          p="3"
                          key={e._id}
                          border="solid 2px silver"
                        >
                          {' '}
                          <VStack>
                            {' '}
                            <HStack>
                              {' '}
                              <Text color="white" fontSize="30px">
                                {e.description}
                              </Text>{' '}
                              <DeleteIcon
                                cursor="pointer"
                                fontSize="16px"
                                color="white"
                                onClick={() => {
                                  del(e._id);
                                }}
                              >
                                delete Post
                              </DeleteIcon>
                            </HStack>
                            <Text color="white" fontSize="15px">
                              IsDeleted: {e.isDel.toString()}
                            </Text>{' '}
                            <HStack>
                              {' '}
                              <Text color="red" fontSize="12px">
                                By {e.userId.username}
                              </Text>
                              <Text color="white" fontSize="12px">
                                on {e.time}
                              </Text>
                            </HStack>
                          </VStack>
                          <img alt="img" src={e.img} />
                          {e.commentId.map(s => (
                            <>
                              <VStack key={s._id}>
                                {' '}
                                <HStack>
                                  {' '}
                                  <Text color="white" fontSize="15px">
                                    {' '}
                                    Comment: {s.description}
                                  </Text>{' '}
                                  <DeleteIcon
                                    cursor="pointer"
                                    color="white"
                                    font-size="15px"
                                    onClick={() => {
                                      delComment(s._id);
                                    }}
                                  >
                                    Delete Comment
                                  </DeleteIcon>{' '}
                                </HStack>
                              </VStack>
                            </>
                          ))}
                          <VStack>
                            {' '}
                            <HStack>
                              {' '}
                              <Input
                                m="4"
                                w="200px"
                                color="white"
                                onChange={e => {
                                  setNewComment(e.target.value);
                                }}
                                placeholder="add comment"
                              />
                              <AddIcon
                                cursor="pointer"
                                color="white"
                                onClick={() => addcomment(e._id)}
                              >
                                add
                              </AddIcon>
                              <br />
                              <StarIcon
                                color="gold"
                                cursor="pointer"
                                onClick={() => addlike(e._id)}
                              >
                                Like{' '}
                              </StarIcon>
                              <Text m="2px" color="white">
                                {e.like.length}
                              </Text>
                            </HStack>
                          </VStack>
                        </Box>
                      </>
                    ))}
                  </>
                )}
              </VStack>
            </Box>
          </VStack>
        </Box>
      ) : (
        <Text h="344px" color="red" fontSize="4rem">
          {' '}
          Forbidden 403
        </Text>
      )}
    </ChakraProvider>
  );
};

export default PostCP;
