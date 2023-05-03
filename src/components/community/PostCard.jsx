import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import CommentCard from "./CommentCard";
import { CommunityRole, ReportEnum } from "../../utilities/enums";
const PostCard = ({
  post,
  like,
  currentMember,
  getComments,
  setShowComment,
  cid,
  showComment,
  onDeletePost,
  setPostEditValue,
  reportById,
}) => {
  return (
    <div className="shadow-lg my-4">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <img
            src={post.user.user.imageUrl}
            alt="userPoster"
            className="w-10 h-10 rounded-full "
          />
          <p>
            {post.user.person.firstName} {post.user.person.lastName}{" "}
            {!post.isMember && (
              <span className="text-gray-300 text-sm">(Removed)</span>
            )}
          </p>
        </div>
        <div className="flex gap-x-2">
          <div>
            {currentMember &&
              (post.user.user.userId === currentMember.userId ||
                currentMember.role === CommunityRole.Owner) && (
                <button
                  onClick={() =>
                    onDeletePost(post.communityPost.communityPostId)
                  }
                >
                  DELETE
                </button>
              )}
          </div>
          <div>
            {post.user.user.userId === currentMember.userId && (
              <button
                onClick={() => {
                  setPostEditValue(post);
                }}
              >
                Edit
              </button>
            )}
          </div>
          <div>
            {post.communityPost.posterUserId !== currentMember.userId && (
              <button
                onClick={() =>
                  reportById(
                    currentMember.userId,
                    post.communityPost.communityPostId,
                    ReportEnum.CommunityPost
                  )
                }
              >
                Report
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="mt-7">{post.communityPost.description}</p>
      <div className="mt-7 flex gap-x-4 ">
        <div
          className={`flex gap-x-1 items-center cursor-pointer ${
            post.isLiked
              ? "text-red-500 hover:text-black"
              : "text-black hover:text-red-500"
          } `}
          onClick={() => {
            if (currentMember)
              like(post.communityPost.communityPostId, currentMember.userId);
            else alert("Please join first");
          }}
        >
          <AiOutlineHeart size={25} />
          <p>{post.communityPost.like}</p>
        </div>
        <div
          className="flex gap-x-2 cursor-pointer"
          onClick={() => {
            getComments(post.communityPost.communityPostId);
            setShowComment(post.communityPost.communityPostId);
          }}
        >
          <GoCommentDiscussion size={25} />{" "}
          <p>
            {post.commentsLength === 0
              ? "No discussion yet"
              : post.commentsLength}
          </p>
        </div>
      </div>
      <CommentCard
        communityId={cid}
        showComment={showComment}
        post={post}
        currentMember={currentMember}
      />
    </div>
  );
};

export default PostCard;
