import React from "react";
import Loader from "../Loader/Loader";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Comments = (props) => {
    const [name, setName] = React.useState("");
    const [comment, setComment] = React.useState("");

    const [nameInputDisabled, setNameInputDisabled] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorText, setNameErrorText] = React.useState("");

    const [commentInputDisabled, setCommentInputDisabled] =
        React.useState(false);
    const [commentError, setCommentError] = React.useState(false);
    const [commentErrorText, setCommentErrorText] = React.useState("");

    const [comments, setComments] = React.useState();
    const [commentsLoading, setCommentsLoading] = React.useState(true);

    React.useEffect(() => {
        setCommentsLoading(true);
        fetch(
            `https://demo-api.vsdev.space/api/articles/${props.article_id}/comments`,
        )
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setComments(data);
                    setCommentsLoading(false);
                }, 1000);
            });
    }, [props.article_id]);

    const addComment = () => {
        if (name.length > 0 && comment.length > 0) {
            // setCommentsLoading(true);
            setCommentInputDisabled(true);
            setNameInputDisabled(true);
            fetch(
                `https://demo-api.vsdev.space/api/articles/${props.article_id}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_name: name,
                        comment: comment,
                    }),
                },
            )
                .then((res) => res.json())
                .then(() => {
                    setComments((prev) => [
                        ...prev,
                        {
                            id: comments.length,
                            user_name: name,
                            comment: comment,
                        },
                    ]);
                    setCommentInputDisabled(false);
                    setNameInputDisabled(false);
                    setComment("");
                    setName("");
                });
        }
        if (name.length === 0) {
            setNameError(true);
            setNameErrorText("Comment cannot be empty");
        } else {
            setNameError(false);
            setNameErrorText("");
        }
        if (comment.length === 0) {
            setCommentError(true);
            setCommentErrorText("Comment cannot be empty");
        } else {
            setCommentError(false);
            setCommentErrorText("");
        }
    };

    return (
        <>
            {commentsLoading ? (
                <Loader />
            ) : (
                <>
                    <Typography
                        variant="h4"
                        style={{ margin: "30px 0 10px" }}
                        gutterBottom
                    >
                        Comments
                    </Typography>
                    {comments.map((comment) => (
                        <div key={comment.id} style={{ marginBottom: "20px" }}>
                            <Typography variant="h6">
                                {comment.user_name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {comment.comment}
                            </Typography>
                        </div>
                    ))}
                    <Typography variant="h5" style={{ margin: "40px 0 20px" }}>
                        Send your comment
                    </Typography>
                    <Box component="form">
                        <TextField
                            disabled={nameInputDisabled}
                            type="text"
                            value={name}
                            label="Your name"
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginBottom: "20px" }}
                            required
                            error={nameError}
                            helperText={nameErrorText}
                        />
                        <br />
                        <TextField
                            disabled={commentInputDisabled}
                            label="Comment text"
                            multiline
                            maxRows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            variant="outlined"
                            style={{ marginBottom: "20px" }}
                            required
                            error={commentError}
                            helperText={commentErrorText}
                        />
                    </Box>
                    <br />
                    <Button onClick={addComment} variant="contained">
                        Add comment
                    </Button>
                </>
            )}
        </>
    );
};

export default Comments;
