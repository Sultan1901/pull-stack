import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
  HStack,
  Input,
  SimpleGrid,
  Image,
  CircularProgress,
} from '@chakra-ui/react';
import axios from 'axios';

const News = () => {
  const [text, setText] = useState('');
  const [news, SetNews] = useState([]);

  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, [text]);
  const result = async () => {
    try {
      const data = await axios
        .get(`http://api.mediastack.com/v1/news?access_key=d92fabe5e337e24d52f512d0cf4d8279&keywords=${text}&languages=en&categories=technology`
        )
        .then(result => {
          SetNews(result.data.data);
          // SetNews(result.data.results);
          console.log(result.data.data);
                    // console.log(result.data);

        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box p="5" bg="rgba(242, 242, 242, 1)">
      <Text mt="0" mb="12" fontSize="3rem">
        Pull-Stack-Developers
      </Text>
      <Input
        placeholder="Search News"
        textAlign="center"
        value={text}
        cursor="default"
        color="white"
        bg="rgb(48,47,47)"
        onChange={e => setText(e.target.value)}
        w="190"
      ></Input>
      <HStack>
        {' '}
        <SimpleGrid m="30" columns={1} spacing={5}>
          {news.length === 0 ? (
            <>
              <VStack alignItems="center" h="100%">
                <CircularProgress
                  p="22px"
                  left="500"
                  size="120px"
                  isIndeterminate
                  color="blue.300"
                />
              </VStack>
            </>
          ) : (
            news.map(e => (
              <Box
                position="relative"
                color="black"
                background="#E2E8F0"
                width="100%"
                height="100%"
                borderRadius="3"
                shadow="md"
                bg="rgba(252, 252, 252, 0.815)"
              >
                <HStack>
                  {' '}
                  <Image w="30vw"  alt="image" height="35.29vw" src={e.image} />
                  <VStack  w="100%" h="100%">
                    {' '}
                    <Text mb="20">{e.title}</Text>
                   <Box p='3'> <Text fontSize="12px">
                      {e.description}
                    </Text></Box>
                  </VStack>
                  <br />
                  <Box pt="200px">
                    {' '}
                    <Link
                      target="blank"
                      color="rgb(57, 123, 245)"
                      href={e.url}
                      fontSize="15px"
                      top="100"
                      pr="3"
                    >
                      More
                    </Link>
                    
                  </Box>
                </HStack>
              </Box>
            ))
          )}{' '}
        </SimpleGrid>{' '}
      </HStack>
    </Box>
  );
};

export default News;
