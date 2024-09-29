import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HttpRequest } from "../../helpers/http-request-class.helper";
import useAuth from "../../hooks/useAuth";
import { GenericAbortSignal } from "axios";

interface LikeButtonProps {
  initialLikes?: number;
  entity: string;
  id: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  initialLikes = 0,
  entity,
  id,
}) => {

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loginIfNeeded } = useAuth();

  useEffect(() => {
    setLikes(initialLikes)
  }, [initialLikes])

  const checkIfLiked = async (signal?: GenericAbortSignal) => {
    if (!isAuthenticated) return;

    try {
      const res = await HttpRequest.get<boolean>(
        `/v1/likes/user/liked/${entity}/${id}`,
        { signal }
      );
      if (res && res.data) {
        setLiked(res.data);
      }
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    checkIfLiked(controller.signal);

    return () => {
      controller.abort(); // Cleanup function to abort the fetch request
    };
  }, []);

  const likeOrUnlike = async () => {
    const isLiking = !liked;
    const url = `/v1/likes/${entity}/${id}`;

    setLoading(true);

    try {
      const res = isLiking
        ? await HttpRequest.post(
          url,
          {},
          { headers: { "Content-Type": "application/json" } }
        )
        : await HttpRequest.delete(url, {
          headers: { "Content-Type": "application/json" },
        });

      if (!res) {
        throw new Error("Network response was not ok");
      }

      setLikes(isLiking ? likes + 1 : likes - 1);
      setLiked(isLiking);
    } catch (error) {
      console.error("Error liking/unliking:", error);
      // Optionally, you can show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (isAuthenticated) {
      await likeOrUnlike();
    } else {
      loginIfNeeded(likeOrUnlike);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleLike}
        disabled={loading}
        style={{ cursor: "pointer", padding: "10px", fontSize: "16px" }}
      >
        <div className="w-full flex justify-between items-center">
          {loading ? (
            "Loading..."
          ) : liked ? (
            <FaHeart className="text-lg" />
          ) : (
            <FaRegHeart className="text-lg" />
          )}
          <span className="text-lg mx-2">{likes}</span>
        </div>
      </button>
    </div>
  );
};

export default LikeButton;
