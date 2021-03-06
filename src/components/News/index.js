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
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const News = () => {
  const [text, setText] = useState('');
  const [news, SetNews] = useState([]);
  const [page, setpage] = useState(1);

  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, [text, page]);
  const result = async () => {
    try {
      const data = await axios
        .get(
          `https://techcrunch.com/wp-json/wp/v2/posts?search=${text}&page=${page}`
        )
        .then(result => {
          SetNews(result.data);
          // SetNews(result.data.results);
          console.log(result.data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const Npage = () => {
    setpage(page + 1);
  };
  const Ppage = () => {
    setpage(page - 1);
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
              <>
                <Text fontSize="10">Posted on :{e.modified}</Text>
                <Box
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
                    <Image
                      w="22vw"
                      alt="image"
                      height="22.29vw"
                      src={e.jetpack_featured_media_url}
                    />
                    <VStack w="100%" h="100%">
                      {' '}
                      <Text mb="20">{e.title.rendered}</Text>
                      {/* <Box p="3">
                      {' '}
                      <Text fontSize="12px">{e.description}</Text>
                    </Box> */}
                    </VStack>
                    <Box pt="200px">
                      {' '}
                      <Link
                        target="blank"
                        color="rgb(57, 123, 245)"
                        href={e.canonical_url}
                        fontSize="15px"
                        top="100"
                        pr="3"
                      >
                        More
                      </Link>
                    </Box>
                  </HStack>
                </Box>
              </>
            ))
          )}{' '}
          <VStack>
            <HStack>
              {' '}
              <ArrowBackIcon
                cursor="pointer"
                _hover={{ background: 'rgb(48,47,47)' }}
                color="white"
                bg="#777"
                onClick={Ppage}
              >
                previous
              </ArrowBackIcon>
              <Text> Page {page} of 2322</Text>
              <ArrowForwardIcon
                cursor="pointer"
                _hover={{ background: 'rgb(48,47,47)' }}
                color="white"
                bg="#777"
                onClick={Npage}
              >
                Next
              </ArrowForwardIcon>
            </HStack>{' '}
          </VStack>
        </SimpleGrid>{' '}
      </HStack>
    </Box>
  );
};

export default News;
