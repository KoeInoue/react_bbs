import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const CreatePost: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid container alignContent="space-between" justifyContent="space-between">
        <div className={classes.title}>Post</div>
        <Button variant="outlined" color="primary" className={classes.title}>
          Send
        </Button>
      </Grid>

      <Container maxWidth="md" className="textContainer">
        <TextField
          id="standard-multiline-static"
          label="What's happening?"
          multiline
          rows={10}
          defaultValue=""
          fullWidth
        />
      </Container>
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
    },
    title: {
      margin: '15px',
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
    button: {
      margin: theme.spacing(1),
    },
    textContainer: {
      marginBottom: '20px',
    },
  }),
);
