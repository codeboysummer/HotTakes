import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import {DeleteIcon} from '@chakra-ui/icons'
import Comment from "./Comment";

const SwipeAbleComponent = ({comment, postComments,deleteComment}) => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info("swipe action triggered")}>
        Action name
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {deleteComment(comment)}}
      >
        <DeleteIcon alignSelf={'center'} color={'red'} bgSize={"cover"}/>
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <>
      <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
         <Comment postComments={postComments}
                      comment={comment}
                      deleteComment={deleteComment}/>
        </SwipeableListItem>
      </SwipeableList>
      ;
    </>
  );
};

export default SwipeAbleComponent;
