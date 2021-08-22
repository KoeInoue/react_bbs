import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextsmsTwoToneIcon from '@material-ui/icons/TextsmsTwoTone';
import ChatBubbleOutlineTwoToneIcon from '@material-ui/icons/ChatBubbleOutlineTwoTone';
import TextField from '@material-ui/core/TextField';
import { Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Popover from '@material-ui/core/Popover';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import axios from '../common/axios';

export const Timeline: React.VFC = () => {
  const [chosenEmoji, setChosenEmoji] = useState();
  const classes = useStyles();
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    // axios.get('/api/');
  }, []);

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

  const handleCommentClick = () => {
    setCommentOpen(!commentOpen);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <div className={classes.title}>Timeline</div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" button>
          <ListItemAvatar>
            <Avatar alt="" src="" />
          </ListItemAvatar>
          <ListItemText
            disableTypography={false}
            className={classes.text}
            primary="Brunch this weekend?"
            secondary={<span className={classes.text}>I will be in your neighborhood doing errands this…</span>}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments" onClick={handleEmojiClick}>
              <EmojiEmotionsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleCommentClick}>
              {commentOpen ? <TextsmsTwoToneIcon /> : <ChatBubbleOutlineTwoToneIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/dummy.png" />
          </ListItemAvatar>
          <Emoji emoji="thinking_face" size={20} onClick={(emoji) => alert(JSON.stringify(emoji))} />
        </ListItem>

        {/* Comments area */}
        <Collapse in={commentOpen} timeout="auto" unmountOnExit>
          <div className={classes.nested}>
            <TextField
              className={classes.commentArea}
              id="outlined-multiline-static"
              label="Write comment"
              multiline
              rows={2}
              defaultValue=""
              variant="outlined"
            />
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemIcon></ListItemIcon>
                <ListItemText secondary="Comments" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments" onClick={handleEmojiClick}>
                    <EmojiEmotionsOutlinedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Collapse>
        <Divider variant="inset" component="li" />
      </List>
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
      marginLeft: '40px',
      width: '85%',
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
  }),
);
