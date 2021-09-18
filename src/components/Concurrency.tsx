import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Switch } from '@material-ui/core';
import moment from 'moment';
import axios from '../common/axios';
import { CalcResult } from '../model/Models';

export const Profile: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [isSending, setIsSending] = useState(false);
  const [isConcurrent, setIsConcurrent] = useState(false);
  const [result, setResult] = useState<CalcResult | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConcurrent(event.target.checked);
  };
  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const config = {
    headers: {
      Token: user.token,
      'User-Id': user.id,
    },
    params: {},
  };

  const sendDate = () => {
    if (!date) {
      return alert('日付を入れてください');
    }
    setResult(null);
    const path = isConcurrent ? 'calc-concurrently' : 'calc-series';
    const name = isConcurrent ? '並行' : '通常';
    const fmtDate = moment(date).format('YYYY-MM-DD');

    config.params = { date: fmtDate };
    setIsSending(true);
    axios
      .get(`/api/${path}/`, config)
      .then((res) => {
        console.log(`${name}`, res.data.result.Spent, 's');
        setResult(res.data.result);
        setIsSending(false);
      })
      .catch(() => {
        alert('error');
        setIsSending(false);
      });
  };

  return (
    <Grid container component="main">
      <div className={classes.root}>
        <div className={classes.title}>Concurrency</div>
        <div className={classes.center}>
          並行性
          <Switch checked={isConcurrent} onChange={handleChange} name="checkedB" color="primary" />
        </div>
        <div className={classes.center}>
          <TextField
            id="datetime-local"
            label="News Date"
            type="date"
            defaultValue={moment().format('YYYY-MM-DD')}
            onChange={handleDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={classes.res}>
          <Button variant="contained" color="primary" onClick={sendDate} disabled={isSending}>
            Start
          </Button>
        </div>
        {isSending ? (
          <Grid container alignItems="center" justifyContent="center">
            <div className={classes.center}>Loading...</div>
          </Grid>
        ) : (
          <Grid>
            <div className={classes.center}>
              <b>2〜1000までの素数を列挙</b>
            </div>
            <div className={classes.res}>{result ? result.PrimeNumbers.join(',') : '--'}</div>

            <div className={classes.center}>
              <b>この日のニュース</b>
            </div>
            <div className={classes.res}>{result ? <a href={result.NewsUrl}>{result.NewsTitle}</a> : '--'}</div>

            <div className={classes.center}>
              <b>今日の天気</b>
            </div>
            <div className={classes.res}>{result ? result.Wheather : '--'}</div>

            <div className={classes.center}>
              <b>上記の処理にかかった時間</b>
            </div>
            <div className={classes.res}>{result ? `${result.Spent}s` : '--'}</div>
          </Grid>
        )}
      </div>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginBottom: theme.spacing(5),
    },
    title: {
      paddingTop: '15px',
      paddingLeft: '15px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    center: {
      textAlign: 'center',
      marginTop: theme.spacing(5),
    },
    res: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: 'center',
      marginTop: theme.spacing(3),
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    },
  }),
);
