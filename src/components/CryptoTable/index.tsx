import React from 'react'
import { observer, inject } from 'mobx-react'
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@material-ui/core';
import { Tcoin, TCoinDiff } from '../../interface/index'
import CurrenciesStore from '../../stores/currenciesStore';

interface ICryptoTable {
    classes: any,
    currenciesStore?: CurrenciesStore
}
const CryptoTable = inject('currenciesStore')(
    observer(({classes, currenciesStore} : ICryptoTable ) => {
        const items: Tcoin[] = currenciesStore!.getItems
        const diffObj: TCoinDiff = currenciesStore!.getDiffArr
        React.useEffect(() => {
           currenciesStore?.fetchItems()
           setInterval(() => {
            currenciesStore?.fetchItems()
           }, 30 * 1000)
        }, [])
        const handleGhange = (item : any) => {
            currenciesStore?.setCurrency(item)
        }
        return (
            <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center">FullName</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Volume24Hour</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item.name} onClick={handleGhange.bind(null, item)} hover>
                    <TableCell component="th" scope="row">
                      <img src={item.imageUrl} style={{width: 30}} alt=""/>
                    </TableCell>
                    <TableCell align="center" >{item.fullname}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center" className={classes[`${diffObj[item.name]}Collumn`]}>{item.price}$</TableCell>
                    <TableCell align="center">{item.volume24Hour}$</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       )   
    }))
export default CryptoTable
