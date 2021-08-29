import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Grid, Button, Icon, Badge, Chip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import axios from '../common/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Post, User, Comment } from '../model/Models';
import Swal from 'sweetalert2';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

type Props = {
  post: Post;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const TimelineComment: React.VFC<Props> = ({ post, posts, setPosts }) => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  const config = {
    headers: {
      Token: user.token,
      'User-Id': user.id,
    },
  };

  const handleCommentPopup = async (postId: number) => {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Reply',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      confirmButtonText: 'Send',
    });

    if (text) {
      sendComment(text, postId);
    }
  };

  const handleCommentToggle = (id: number) => {
    const p: Post[] = posts.map((post: Post): Post => {
      if (post.ID == id) {
        post.OpenComment = !post.OpenComment;
      } else {
        post.OpenComment = false;
      }
      return post;
    });
    setPosts(p);
  };

  const sendComment = (content: string, postId: number) => {
    axios
      .post(
        'api/create-comment/',
        {
          content,
          userId: Number(user.id),
          postId,
        },
        config,
      )
      .then((res) => {
        const comment: Comment = res.data.comment;
        const p: Post[] = posts.map((post: Post): Post => {
          if (post.ID == postId) {
            post.Comments.unshift(comment);
          }
          return post;
        });
        setPosts(p);

        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Your reply was sent',
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
      });
  };

  return (
    <Collapse in={post.OpenComment} timeout="auto" unmountOnExit>
      <div className={classes.nested}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.sendButton}
          onClick={() => handleCommentPopup(post.ID)}
        >
          Reply
        </Button>
        <List component="div">
          {post.Comments.map((comment) => {
            return (
              <ListItem key={comment.ID} className={classes.commentList}>
                <Avatar className={classes.smallAvatar} />
                <ListItemText
                  disableTypography={false}
                  className={classes.text}
                  primary={comment.User.Name}
                  secondary={
                    <span className={classes.text}>
                      {comment.Content.split('\n').map((str, index) => (
                        <React.Fragment key={index}>
                          {str}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  }
                />
              </ListItem>
            );
          })}
          <IconButton onClick={() => handleCommentToggle(post.ID)}>
            <ExpandLessIcon />
          </IconButton>
        </List>
      </div>
    </Collapse>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      width: '80%',
      display: 'inline-block',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: '5px',
    },
    sendButton: {
      marginLeft: theme.spacing(5),
    },
    commentList: {
      paddingLeft: theme.spacing(5),
    },
  }),
);
