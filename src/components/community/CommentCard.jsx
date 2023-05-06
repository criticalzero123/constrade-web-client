import React, { useState } from "react";
import useCommentPost from "../../hooks/community/useCommentPost";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import { Spinner } from "flowbite-react";
import useReport from "../../hooks/useReport";
import { ReportEnum } from "../../utilities/enums";
import { RiSendPlaneFill } from "react-icons/ri";

import { MdOutlineDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const CommentCard = ({ communityId, showComment, post, currentMember }) => {
  const [
    commentPost,
    ,
    deleteComment,
    updateComment,
    commentList,
    setCommentList,
  ] = useCommentPost(communityId);
  const { user, person } = useUserInfo();
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { reportById } = useReport();
  const [editModeInfo, setEditModeInfo] = useState({
    active: false,
    commentInfo: null,
  });

  const onPressComment = async () => {
    setCommentLoading(true);

    if (editModeInfo.active) {
      const info = {
        ...editModeInfo.commentInfo,
        comment: comment,
      };
      const flag = await updateComment(info);
      if (flag) {
        setCommentList((prevState) => {
          let _newState = prevState;
          let data = _newState.find(
            (_c) =>
              _c.comment.communityPostCommentId === info.communityPostCommentId
          );

          Object.assign(data, { comment: info, userInfo: data.userInfo });
          return _newState;
        });
      } else {
        alert("Something went wrong in updating");
      }
      setEditModeInfo({ active: false, commentInfo: null });
    } else {
      const info = {
        communityPostId: post.communityPost.communityPostId,
        commentedByUser: currentMember.userId,
        comment: comment.trim(),
        dateCommented: new Date(),
      };
      const id = await commentPost(info);

      if (Number.isInteger(id)) {
        setCommentList([
          {
            comment: { ...info, communityPostCommentId: id },
            userInfo: { user, person },
          },
          ...commentList,
        ]);
      } else {
        alert("Something went wrong in adding the comment");
      }
    }

    setComment("");
    setCommentLoading(false);
  };

  const onDeleteComment = async (commentId) => {
    const flag = await deleteComment(
      post.communityPost.communityPostId,
      commentId
    );
    if (flag) {
      const newData = commentList.filter(
        (_cm) => _cm.comment.communityPostCommentId !== commentId
      );

      setCommentList(newData);
    } else alert("Something went wrong in deleting the comment");
  };

  const onPressEdit = (value, info) => {
    setEditModeInfo({ active: true, commentInfo: info });
    setComment(value);
  };

  return (
    <div className="py-4 px-2">
      {showComment === post.communityPost.communityPostId && commentList && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onPressComment();
            }}
          >
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment here...."
              className="rounded p-2"
            />
            <button disabled={commentLoading}>
              {commentLoading ? (
                <Spinner />
              ) : (
                <RiSendPlaneFill size={20} className="ml-2" color={"gray"} />
              )}
            </button>
          </form>
          {commentList.length > 0 &&
            commentList.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-100 my-2 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex gap-x-2 items-center">
                    <img
                      src={comment.userInfo.user.imageUrl}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <Link
                        className="text-gray-400 hover:text-red-500"
                        to={`/users/o/${comment.userInfo.user.userId}`}
                      >
                        {comment.userInfo.person.firstName}{" "}
                        {comment.userInfo.person.lastName}
                      </Link>

                      <p>{comment.comment.comment}</p>
                    </div>
                  </div>

                  <div>
                    {comment.userInfo.user.userId === user.userId ? (
                      <div>
                        <button
                          onClick={() =>
                            onDeleteComment(
                              comment.comment.communityPostCommentId
                            )
                          }
                        >
                          <MdOutlineDeleteForever color="maroon" size={25} />
                        </button>
                        <button
                          onClick={() =>
                            onPressEdit(
                              comment.comment.comment,
                              comment.comment
                            )
                          }
                          className="ml-4"
                        >
                          <FiEdit
                            size={20}
                            color="gray"
                            className="hover:text-black"
                          />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() =>
                            reportById(
                              currentMember.userId,
                              comment.comment.communityPostCommentId,
                              ReportEnum.CommunityPostComment
                            )
                          }
                        >
                          report
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
