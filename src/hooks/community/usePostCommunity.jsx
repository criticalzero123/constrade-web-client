import { useState } from "react";
import { useEffect } from "react";
import {
  deletePostInCommunity,
  getPostByCommunityId,
  likePost,
  postCommunity,
  updatePost,
} from "../../redux/action/communityAction";

export default function usePostCommunity(id, userId) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    if (id === undefined) return;
    const fetch = async () => {
      const res = await getPostByCommunityId(id, userId);

      if (res) {
        setPosts(res);
      }
    };

    fetch();
  }, [id, userId]);

  const post = (info) => {
    return postCommunity(id, info);
  };

  const edit = (info) => {
    return updatePost(id, info);
  };

  const deletePost = (postId) => {
    return deletePostInCommunity(id, postId);
  };

  const like = async (postId, userId) => {
    const res = await likePost(id, postId, userId);

    if (res) {
      const updatedData = posts.map((c) => {
        const likeCount = c.communityPost.like;
        const likeFlag = c.isLiked;

        const communityPost = {
          ...c.communityPost,
          like: likeFlag ? likeCount - 1 : likeCount + 1,
        };

        if (c.communityPost.communityPostId === postId) {
          return { ...c, communityPost: communityPost, isLiked: !c.isLiked };
        }

        return c;
      });

      setPosts(updatedData);
    } else {
      alert("Something went wrong.");
    }
  };

  return { posts, setPosts, post, deletePost, like, edit };
}
