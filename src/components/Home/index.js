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
  const [long, setLong] = useState([
    '500px',
    '500px',
    '500px',
    '500px',
    '500px',
    '500px',
    '500px',
    '500px',
    '500px',
    '500px'
  ]);
let myArr=[];
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
            news.map((e, i) => (
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
                  height={long[i]}
                  borderRadius="3"
                  mb="1"
                  overflow="hidden"
                >
                  <Box>
                    <Image
                      w="100%"
                      height="300"
                      src={e.jetpack_featured_media_url}
                    />
                    <Text wordBreak="break-all" mt="3">
                      {e.title.rendered}
                    </Text>
                    <Box>
                      <Text
                        wordBreak="break-all"
                        mt="5"
                        fontSize="11px"
                        p="3"
                        m="0"
                      >
                        {' '}
                        <h1
                          dangerouslySetInnerHTML={{
                            __html: e.content.rendered,
                          }}
                        />
                      </Text>
                    </Box>
                    <br />
                    <Text fontSize="13px">On :{e.modified}</Text>{' '}
                  </Box>
                </Box>{' '}
                <Box>
                  {long[i] === '500px' ? (
                    <Link
                      p="2"
                      borderRadius="15"
                      color="rgb(57, 123, 245)"
                      target="blank"
                      bottom="0"
                      // href={e.canonical_url}
                      fontSize="15px"
                      onClick={() => {
                        myArr = [...long];
                        myArr[i] = '1000px';
                        setLong(myArr);
                      }}
                      mb="6px"
                      ml="-15px"
                      bg="#302f2f"
                      color="white"
                    >
                      More
                    </Link>
                  ) : (
                    <Link
                      p="2"
                      borderRadius="15"
                      color="rgb(57, 123, 245)"
                      target="blank"
                      bottom="0"
                      // href={e.canonical_url}
                      fontSize="15px"
                      onClick={() => {
                        let myArr1 = [...long];
                        myArr1[i] = '500px';
                        setLong(myArr1);
                      }}
                      mb="6px"
                      ml="-15px"
                      bg="#302f2f"
                      color="white"
                    >
                      Less
                    </Link>
                  )}{' '}
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
