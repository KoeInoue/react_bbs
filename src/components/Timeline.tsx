import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { Grid, Button, Icon, Badge, Chip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import TextsmsTwoToneIcon from '@material-ui/icons/TextsmsTwoTone';
import ChatBubbleOutlineTwoToneIcon from '@material-ui/icons/ChatBubbleOutlineTwoTone';
import { Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Popover from '@material-ui/core/Popover';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import axios from '../common/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Post, PostReaction } from '../model/Models';
import { TimelineComment } from './TimelineComment';

export const Timeline: React.VFC = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState<Post[] | []>([]);
  const user = useSelector(selectUser);
  const emojis = ['smile', 'sweat_smile', 'rolling_on_the_floor_laughing', 'cry', 'rage', 'thumbsup', 'heart'];

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

  const emojiId = 'simple-popover';

  const handleEmojiClick = (event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    const p: Post[] = posts.map((post: Post): Post => {
      if (post.ID == postId) {
        post.AnchorEl = event.currentTarget;
      }
      return post;
    });
    setPosts(p);
  };
  const handleEmojiClose = (postId: number) => {
    const p: Post[] = posts.map((post: Post): Post => {
      if (post.ID == postId) {
        post.AnchorEl = null;
      }
      return post;
    });
    setPosts(p);
  };
  const onEmojiClick = (emojiCode: string | undefined, postId: number) => {
    if (emojiId === undefined) {
      return;
    }
    axios
      .post(
        'api/create-reaction/',
        {
          emojiCode,
          userId: Number(user.id),
          postId,
        },
        config,
      )
      .then((res) => {
        const reaction: PostReaction = res.data.reaction;
        const p: Post[] = posts.map((post: Post): Post => {
          if (post.ID == postId) {
            post.PostReactions.unshift(reaction);
          }
          return post;
        });
        setPosts(p);
      });
  };

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
                  <IconButton edge="end" aria-label="comments" onClick={(e) => handleEmojiClick(e, post.ID)}>
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
                {post.PostReactions.map((reaction) => {
                  return (
                    <div key={reaction.ID}>
                      <Chip
                        variant="outlined"
                        className={classes.emojiReaction}
                        avatar={
                          <Emoji
                            emoji={reaction.EmojiCode}
                            size={20}
                            onClick={(emoji) => alert(JSON.stringify(emoji))}
                          />
                        }
                        label={post.PostReactions.length}
                        // onClick={handleClick}
                      />
                    </div>
                  );
                })}
              </ListItem>
              <TimelineComment post={post} setPosts={setPosts} posts={posts} />
              <Divider variant="inset" component="li" />
              <Popover
                id={String(post.ID)}
                open={Boolean(post.AnchorEl)}
                anchorEl={post.AnchorEl}
                onClose={() => handleEmojiClose(post.ID)}
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
                  {emojis.map((e) => {
                    return (
                      <div className={classes.emojis} key={e}>
                        <Emoji emoji={e} size={20} onClick={(emoji) => onEmojiClick(emoji.id, post.ID)} />
                      </div>
                    );
                  })}
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
    emojiList: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    contentList: {
      paddingBottom: '0px',
    },
    emojiReaction: {
      paddingLeft: theme.spacing(1),
    },
  }),
);
