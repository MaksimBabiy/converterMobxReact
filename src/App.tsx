import React from 'react';
import './App.css';
import {Paper,Grid, Container} from '@material-ui/core';
import  { useStyles } from './styles/index'
import { CryptoTable, ConverterBlock } from './components'
const App: React.FC = () => {
  const classes = useStyles()
  return (
    <div className="App">
       <Container maxWidth="md">
       <Grid container>
       <Grid item xs={8}>
        <Paper className={classes.paper}>
        <CryptoTable classes={classes}/>
        </Paper>
       </Grid>
       <Grid item xs={4}>
        <Paper className={classes.paper}>
         <ConverterBlock classes={classes}/>
        </Paper>
       </Grid>
       </Grid>
      </Container>
    </div>
  );
}

export default App;
