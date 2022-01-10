import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
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
        .get(
          // `https://newsapi.org/v2/top-headlines?country=sa&category=technology&apiKey=941e34ca80a2416498f8b4c2b895c22d`
          `https://techcrunch.com/wp-json/wp/v2/posts?search=${text}`
        )
        .then(result => {
          // SetNews(result.data.articles);
          SetNews(result.data);
          console.log(data);
          console.log(result.data);
        });
    } catch (error) {}
  };

  return (
    <Box p="5">
      <VStack>
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
        <SimpleGrid mt="20" columns={[1, 2]} spacing={0}>
          {news.length === 0 ? (
            <>
              <VStack bg="white" m="1" h="100%" position="relative">
                <CircularProgress
                  size="120px"
                  mt="3"
                  mb="3"
                  position=""
                  ml="100%"
                  isIndeterminate
                  color="blue.300"
                />
              </VStack>
            </>
          ) : (
            news.map(e => (
              <VStack>
                {' '}
                <Box
                  transition="0.3s ease-in-out"
                  _hover={{
                    transition: '0.3s ease-in-out',
                    transform: 'scale(1.02)',
                  }}
                  mt="10"
                  boxShadow="md"
                  position="relative"
                  color="black"
                  background="rgba(201, 201, 201, 0.471)"
                  width="70%"
                  height="500px"
                  borderRadius="3"
                  mb="10"
                  overflow="hidden"
                >
                  <Box>
                    <Image
                      w="100%"
                      height="300"
                      src={e.jetpack_featured_media_url}
                    />
                    <Text wordBreak='break-all' mt='3'>
                      {e.title.rendered}
                    </Text>
                    {/* <Box><Text wordBreak='break-all' mt="5" fontSize="12px" p="3" m="0">
                      {e.content.rendered}
                    </Text></Box>  */}
                    <br />
                    <Text  fontSize="13px">On :{e.modified}</Text>{' '}
                    <Link
                      position="absolute"
                      color="rgb(57, 123, 245)"
                      target="blank"
                      bottom="0"
                      href={e.canonical_url}
                      fontSize="15px"
                      mb="6px"
                      ml="-15px"
                    >
                      More
                    </Link>
                  </Box>
                </Box>
              </VStack>
            ))
          )}{' '}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default News;
