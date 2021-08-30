import React from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
    },
    paper: {
      // padding: theme.spacing(2),
      // textAlign: 'center',
      // color: theme.palette.text.secondary,
    },
    table: {
      // minWidth: 650,
    },
    currencyIcon: {
      width: 20,
      height: 20,
    },
  }),
);

type TCoin = {
  name: string;
  fullName: string;
  imgUrl: string;
  price: number;
  volume24Hour: number;
};

function App() {
  const classes = useStyles();
  const [allCoins, setAllCoins] = React.useState<TCoin[]>([]);

  React.useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
      .then(({ data }) => {
        const coins: TCoin[] = data.Data.map((coin: any) => {
          const obj: TCoin = {
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imgUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE.toFixed(2),
            volume24Hour: coin.RAW.USD.VOLUME24HOUR.toFixed(2),
          };
          return obj;
        });
        setAllCoins(coins);
      });
  }, [classes]);

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item xs={8}>
          <h1>Сryptocurrency table</h1>

          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">FullName</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">volume24hour</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCoins.map((coin) => (
                  <TableRow key={coin.name}>
                    <TableCell align="left">
                      <img className={classes.currencyIcon} src={coin.imgUrl} alt={coin.name} />
                    </TableCell>
                    <TableCell align="center">{coin.name}</TableCell>
                    <TableCell align="center">{coin.fullName}</TableCell>
                    <TableCell align="center">{coin.price}</TableCell>
                    <TableCell align="center">{coin.volume24Hour}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
