import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import CommentCard from "./CommentCard";
import { CommunityRole, ReportEnum } from "../../utilities/enums";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
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
    <div className="shadow-lg my-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center ">
          <img
            src={post.user.user.imageUrl}
            alt="userPoster"
            className="w-10 h-10 rounded-full "
          />
          <div>
            <div>
              <Link to={`/users/o/${post.user.user.userId}`}>
                {post.user.person.firstName} {post.user.person.lastName}{" "}
              </Link>
              {!post.isMember && (
                <span className="text-gray-300 text-sm">(not-member)</span>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              {new Date(post.communityPost.createdDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-x-2 items-center">
          <div>
            {currentMember &&
              (post.user.user.userId === currentMember.userId ||
                currentMember.role === CommunityRole.Owner) && (
                <button
                  onClick={() =>
                    onDeletePost(post.communityPost.communityPostId)
                  }
                >
                  <MdOutlineDeleteForever color="maroon" size={25} />
                </button>
              )}
          </div>
          <div>
            {currentMember &&
              post.user.user.userId === currentMember.userId && (
                <button
                  onClick={() => {
                    setPostEditValue(post);
                  }}
                >
                  <FiEdit size={20} color="gray" className="hover:text-black" />
                </button>
              )}
          </div>
          <div>
            {currentMember &&
              post.communityPost.posterUserId !== currentMember.userId && (
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
