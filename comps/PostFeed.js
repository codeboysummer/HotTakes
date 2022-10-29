import { Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function PostFeed({ posts, admin }) {
  return posts?.map((post) => (
    <PostItem admin={admin} key={post.slug} post={post} />
  ));
}
function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <>
      <Flex>
        <Link href={`/${post.username}`}>
          <Heading size={"sm"}>by @ {post.username}</Heading>
        </Link>
        <Link href={`/${post.username}/${post.slug}`}>
          <Heading>{post.title}</Heading>
        </Link>
        <HStack>
          <Text>
            {wordCount} words.{minutesToRead} min read
          </Text>
          <Text>{post.heartCount} hearts</Text>
        </HStack>
      </Flex>
    </>
  );
}
