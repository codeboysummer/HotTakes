import { Heading, VStack } from "@chakra-ui/react";
import HotTakes from "../comps/HotTakes";
export default function PostFeed({ posts }) {
  
  return (
    <>
      <VStack>
        {posts?.map((post) => {
          const postId = post.id;
          return (
            <HotTakes
              key={post.id}
              takeId={post.id}
              take={post.take}
              canComment={post.canComment}
              postUsername={post.username}
            />
          );
        })}
      </VStack>
    </>
  );
}
