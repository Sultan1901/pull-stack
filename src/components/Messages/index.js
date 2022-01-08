import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
const BASE_URL = process.env.REACT_APP_BASE_URL;
let socket;
let CONNECTION_PORT = `${BASE_URL}`;

function Message() {
  const [room, setRoom] = useState(0);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const state = useSelector(state => {
    return {
      Login: state.Login,
      postRD: state.PostRD,
    };
  });
  useEffect(() => {
    socket = io(CONNECTION_PORT);
    // eslint-disable-next-line
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on('recieve_message', data => {
      setMessagesList([...messagesList, data]);
    });
    // eslint-disable-next-line
  }, [messagesList]);

  const send = () => {
    const messageContent = {
      userName: state.Login.user.username,
      content: message,
      room,
    };
    console.log(messageContent, 'messageContent');
    socket.emit('send_message', messageContent);
    setMessagesList([...messagesList, messageContent]);
    setMessage('');
  };

  const connectRoom = room => {
    console.log(state.Login);
    setRoom(room);
    if (state.Login.user.username && room) {
      socket.emit('join_room', { userName: state.Login.user.username, room });
      setLoggedIn(true);
    }
  };

  return (
    <Box bg="rgba(242, 242, 242, 1)" h="100vh">
      <ChakraProvider theme={theme}>
        <VStack>
          {' '}
          <Box color="white" h="200px" m="6" pb="300" w="280px">
            <VStack >
              <>
                {!loggedIn ? (
                  <>
                    <br />
                    <VStack  w="80%">
                      {' '}
                      <Box
                        w="270%"
                        boxShadow="md"
                        bg='white'
                        mt="20px"
                        h="70vh"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                      >
                        <Button
                          _hover={{ background: '#333333' }}
                          w="200px"
                          color="white"
                          mt="5"
                          m="3"
                          bg="#777"
                          onClick={() => connectRoom(1)}
                        >
                          Javascript Room
                        </Button>
                        <Button
                          _hover={{ background: '#333333' }}
                          color="white"
                          mt="5"
                          m="3"
                          w="200px"
                          bg="#777"
                          onClick={() => connectRoom(2)}
                        >
                          Python Room
                        </Button>
                        <Button
                          _hover={{ background: '#333333' }}
                          color="white"
                          mt="5"
                          bg="#777"
                          m="3"
                          w="200px"
                          onClick={() => connectRoom(3)}
                        >
                          Swift Room
                        </Button>
                      </Box>
                    </VStack>
                  </>
                ) : (
                  <>
                    <Box
                      display="flex"
                      position="sticky"
                      justifyContent="space-between"
                      flexDirection="column"
                      alignItems="center"
                      border="black solid 1px"
                      p="2"
                    >
                      <Text color="Gray">Java Script</Text>
                      <Box top="" mb="40">
                        {messagesList.map(msg => (
                          <VStack>
                            <Text color="black">
                              {' '}
                              {msg.userName}: {msg.content}
                            </Text>
                          </VStack>
                        ))}
                      </Box>

                      <HStack>
                        <Input
                          w="200"
                          color="black"
                          m="4"
                          type="text"
                          placeholder="write your message here..."
                          onChange={e => setMessage(e.target.value)}
                        />
                        <Button
                          color="black"
                          bg="gold"
                          onClick={() => {
                            send();
                          }}
                        >
                          Send
                        </Button>
                      </HStack>
                    </Box>
                  </>
                )}
              </>
            </VStack>
          </Box>
        </VStack>
      </ChakraProvider>
    </Box>
  );
}

export default Message;
