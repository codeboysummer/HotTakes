import { Heading, HStack, Tag, TagCloseButton, TagLabel, VStack } from "@chakra-ui/react";
import HotTakes from "../comps/HotTakes";
export default function PostFeed({ posts,filterValue }) {
  
  return (
    <>
      <>

     

        {posts?.filter((post)=>post?.take.toLowerCase().includes(filterValue.toLowerCase())).map((post) => {
          const postId = post.id;
          console.log(typeof post.take);
          const {whoLiked,whoDisliked}=post
          return (
            <>

            <HotTakes
            whoLiked={whoLiked}
            whoDisliked={whoDisliked}
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
