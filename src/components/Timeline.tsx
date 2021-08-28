import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { Grid, Button, Icon, Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import TextsmsTwoToneIcon from '@material-ui/icons/TextsmsTwoTone';
import ChatBubbleOutlineTwoToneIcon from '@material-ui/icons/ChatBubbleOutlineTwoTone';
import { Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Popover from '@material-ui/core/Popover';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import axios from '../common/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Post, User, Comment } from '../model/Models';
import Swal from 'sweetalert2';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const Timeline: React.VFC = () => {
  const [chosenEmoji, setChosenEmoji] = useState();
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const user = useSelector(selectUser);

  const config = {
    headers: {
      Token: user.token,
      'User-Id': user.id,
    },
  };

  useEffect(() => {
    const config = {
      headers: {
        Token: user.token,
        'User-Id': user.id,
      },
    };
    const getPosts = () => {
      axios.get('/api/get-posts/', config).then((res) => {
        setPosts(res.data.posts);
      });
    };
    if (user.token) {
      getPosts();
    }
  }, [user]);

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

  const handleEmojiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEmojiClose = () => {
    setAnchorEl(null);
  };
  const onEmojiClick = (emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };
  const openEmoji = Boolean(anchorEl);
  const emojiId = openEmoji ? 'simple-popover' : undefined;

  return (
    <Grid container component="main" className={classes.root}>
      <div className={classes.title}>Timeline</div>
      <List className={classes.root}>
        {posts.map((post: Post) => {
          return (
            <div key={post.ID}>
              <ListItem alignItems="flex-start" key={post.ID} className={classes.contentList}>
                <ListItemAvatar>
                  <Avatar alt="" src="" />
                </ListItemAvatar>
                <ListItemText
                  disableTypography={false}
                  className={classes.text}
                  primary={post.User.Name}
                  secondary={
                    <span className={classes.text}>
                      {post.Content.split('\n').map((str, index) => (
                        <React.Fragment key={index}>
                          {str}
                          <br />
                        </React.Fragment>
                      ))}
                    </span>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments" onClick={handleEmojiClick}>
                    <EmojiEmotionsOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => handleCommentToggle(post.ID)}>
                    <Badge badgeContent={post.Comments.length} color="primary">
                      {post.OpenComment ? <TextsmsTwoToneIcon /> : <ChatBubbleOutlineTwoToneIcon />}
                    </Badge>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.emojiList}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/dummy.png" />
                </ListItemAvatar>
                <Emoji emoji="thinking_face" size={20} onClick={(emoji) => alert(JSON.stringify(emoji))} />
              </ListItem>
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
              <Divider variant="inset" component="li" />
              <Popover
                id={emojiId}
                open={openEmoji}
                anchorEl={anchorEl}
                onClose={handleEmojiClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.emojisContainer}>
                  <div className={classes.emojis}>
                    <Emoji emoji="smile" size={20} onClick={(emoji) => onEmojiClick(emoji)} />
                  </div>
                  <div className={classes.emojis}>
                    <Emoji emoji="sweat_smile" size={20} onClick={(emoji) => onEmojiClick(emoji)} />
                  </div>
                  <div className={classes.emojis}>
                    <Emoji emoji="rolling_on_the_floor_laughing" size={20} onClick={(emoji) => onEmojiClick(emoji)} />
                  </div>
                  <div className={classes.emojis}>
                    <Emoji emoji="cry" size={20} onClick={(emoji) => onEmojiClick(emoji)} />
                  </div>
                  <div className={classes.emojis}>
                    <Emoji emoji="rage" size={20} onClick={(emoji) => onEmojiClick(emoji)} />
                  </div>
                  <div className={classes.emojis}>
                    <Emoji emoji="thumbsup" size={20} onClick={(emoji) => onEmojiClick(emoji)} />
                  </div>
                  <div className={classes.emojis}>
                    <Emoji emoji="heart" size={20} onClick={(emoji) => onEmojiClick(emoji)} />
                  </div>
                </div>
              </Popover>
            </div>
          );
        })}
      </List>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    text: {
      width: '80%',
      display: 'inline-block',
    },
    title: {
      paddingTop: '15px',
      paddingLeft: '15px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    commentArea: {
      marginLeft: theme.spacing(5),
      width: theme.spacing(20),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    emojis: {
      display: 'inline-block',
      padding: '5px',
    },
    emojisContainer: {
      padding: '5px',
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: '5px',
    },
    emojiList: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    contentList: {
      paddingBottom: '0px',
    },
    sendButton: {
      marginLeft: theme.spacing(5),
    },
    commentList: {
      paddingLeft: theme.spacing(5),
    },
  }),
);
