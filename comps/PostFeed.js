import { Heading, HStack, Tag, TagCloseButton, TagLabel, VStack } from "@chakra-ui/react";
import HotTakes from "../comps/HotTakes";
import FilterTags from "./FilterTags";
export default function PostFeed({ posts }) {
  
  return (
    <>
      <>
     <FilterTags/>
        {posts?.map((post) => {
          const postId = post.id;
          return (
            <>

            <HotTakes
              key={post.id}
              takeId={post.id}
              take={post.take}
              canComment={post.canComment}
              postUsername={post.username}
            /></>

          );
        })}
      </>
    </>
  );
}
