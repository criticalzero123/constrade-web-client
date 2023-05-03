import React, { useState } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import usePostCommunity from "../../hooks/community/usePostCommunity";
import PostCard from "./PostCard";
import useCommentPost from "../../hooks/community/useCommentPost";
import { Spinner } from "flowbite-react";
import Swal from "sweetalert2";
import EditPostCommunity from "./EditPostCommunity";

const CommunityPosts = ({ cid, currentMember }) => {
  const { user, person } = useUserInfo();
  const [postInput, setPostInput] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  const [postEditValue, setPostEditValue] = useState();

  const [editVal, setEditVal] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const { post, deletePost, like, posts, setPosts, edit } = usePostCommunity(
    cid,
    user.userId
  );
  const [showComment, setShowComment] = useState(-1);
  const [, getComments] = useCommentPost(cid);

  const handlePost = async (e) => {
    e.preventDefault();

    setPostLoading(true);
    if (postInput.trim() === "") return;

    const info = {
      communityId: currentMember.communityId,
      posterUserId: currentMember.userId,
      description: postInput,
      createdDate: new Date(),
    };

    const postId = await post(info);
    setPostInput("");

    if (Number.isInteger(postId)) {
      setPosts([
        {
          communityPost: { ...info, communityPostId: postId, like: 0 },
          user: { user: { ...currentMember, ...user }, person: { ...person } },
          isLiked: false,
          commentsLength: 0,
        },
        ...posts,
      ]);
    } else {
      alert("Post Doesn't added successfully");
    }
    setPostLoading(false);
  };

  const onDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const flag = await deletePost(id);
        if (flag) {
          const newPost = posts.filter(
            (_p) => _p.communityPost.communityPostId !== id
          );
          setPosts(newPost);
          Swal.fire("Deleted!", "Post has been deleted.", "success");
        } else alert("Something went wrong in deleting post");
      }
    });
  };

  const handleEdit = (value) => {
    setPostEditValue(value);
    setEditVisible(true);
  };

  const onPostEdit = async () => {
    const info = {
      ...postEditValue.communityPost,
      description: editVal,
    };

    const flag = await edit(info);

    if (flag) {
      setPosts((prevState) => {
        let newState = prevState;
        let data = newState.find(
          (_p) => _p.communityPost.communityPostId === info.communityPostId
        );

        Object.assign(data, {
          user: postEditValue.user,
          communityPost: info,
          commentsLength: postEditValue.commentsLength,
        });

        return newState;
      });
    } else {
      alert("Something went wrong in editing the post.");
    }

    setEditVisible(false);
    setEditVal("");
  };

  if (posts === undefined) return <p>Loading...</p>;

  return (
    <div>
      {currentMember && (
        <form onSubmit={handlePost} className="flex gap-x-2">
          <input
            type="text"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            placeholder="Post something here..."
            className="p-2 border border-gray-300 rounded"
          />
          <button className="px-4 py-2 border border-blue-500 rounded-lg">
            {postLoading ? <Spinner /> : "Post"}
          </button>
        </form>
      )}
      <div>
        {posts.map((post, index) => (
          <PostCard
            cid={cid}
            post={post}
            key={index}
            like={like}
            currentMember={currentMember}
            getComments={getComments}
            setShowComment={setShowComment}
            showComment={showComment}
            onDeletePost={onDeletePost}
            setPostEditValue={handleEdit}
          />
        ))}
      </div>
      <EditPostCommunity
        show={editVisible}
        onClose={() => setEditVisible(false)}
        onSubmit={onPostEdit}
        value={editVal}
        setValue={setEditVal}
      />
    </div>
  );
};

export default CommunityPosts;
