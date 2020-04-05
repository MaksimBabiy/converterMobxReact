import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(10),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    cryptoInputBox: {
      marginBottom: 20,
      marginTop: 20,
    },
    currencyInput: {
      minWidth: 'calc(70% - 10px)',
      marginRight: 10,
    },
    currencyType: {
      minWidth: '30%',
    },
    cryptoIndexBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    redCollumn: {
      backgroundColor: '#ffdada'
    },
    greenCollumn: {
      backgroundColor: '#d8ffc4'
    }
  }));