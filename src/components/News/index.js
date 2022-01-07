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
  const [text, setText] = useState('google');
  const [news, SetNews] = useState([]);

  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, [text]);
  const result = async () => {
    try {
      const data = await axios
        .get(
          `https://newsapi.org/v2/everything?q=${text}&from=2022-01-07&language=en&pageSize=100&sortBy=publishedAt&apiKey=941e34ca80a2416498f8b4c2b895c22d`
          // `https://newsdata.io/api/1/news?apikey=pub_316749a1f9e311947558934e30ad0011951a&q=${text}`
        )
        .then(result => {
          SetNews(result.data.articles);
          // SetNews(result.data.results);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box p="5" bg="rgba(242, 242, 242, 1)">
      <Text mb="12" color="rgb(100, 107, 119)" fontSize="3rem">
        All News
      </Text>
      <Input
        placeholder="Search News"
        textAlign="center"
        value={text}
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
                  <Image w="200px" height="200px" src={e.urlToImage} />
                  <VStack>
                    {' '}
                    <Text mb="20">{e.title}</Text>
                    <Text mt="5" fontSize="12px">
                      {e.content}
                    </Text>
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
