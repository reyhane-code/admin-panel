import React, { useEffect, useState } from "react";
import { HttpRequest } from "../../helpers/http-request-class.helper";
import useAuth from "../../hooks/useAuth";
import { MdOutlineComment } from "react-icons/md";
import * as Yup from "yup";
import AppForm from "./AppForm";
import Button from "./Button";
import TextArea from "./TextArea";

interface CommentButtonProps {
  initialComments?: number;
  entity: string;
  id: number;
  parentId?: number;
  parentReplyId?: number;
}

const CommentButton: React.FC<CommentButtonProps> = ({
  initialComments = 0,
  entity,
  id,
  parentId = null,
  parentReplyId = null,
}) => {
  const [commentsCount, setCommentsCount] = useState(initialComments);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loginIfNeeded } = useAuth();
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   setCommentsCount(initialComments);
  // }, [initialComments]);

  const comment = async () => {
    const url = `/v1/comments/${entity}/${id}`;
    setLoading(true);
    const data = {
      content,
    }
    try {
      const res = await HttpRequest.post(url, data, { headers: { "Content-Type": "application/json" } });

      if (!res) {
        throw new Error("Network response was not ok");
      }
      console.log('Response:', res);
      setCommentsCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleComment = async (data: { content: string }) => {
    setContent(data.content)
    if (isAuthenticated) {
      await comment();
    } else {
      loginIfNeeded(comment);
    }
  };
  const onSubmit = async (data: { content: string }) => {
    await handleComment(data)
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required("Comment content is required")
      .min(1, "Content must be at least 1 character")
      .max(150, "Content must be at most 150 characters"),
  });

  return (
    <>
      <div className="flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          style={{ cursor: "pointer", padding: "10px", fontSize: "16px" }}
        >
          <div className="w-full flex justify-between items-center">
            {loading ? (
              "Loading..."
            ) : (
              <MdOutlineComment className="text-lg" />
            )}
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="flex w-full">
          <div
            className="w-1/2 flex justify-center items-center mx-auto my-5"
          >
            <AppForm
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <TextArea name="content" placeholder="type your comment here..." />
              <Button color="primary" type="submit">
                Confirm
              </Button>
            </AppForm>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentButton;