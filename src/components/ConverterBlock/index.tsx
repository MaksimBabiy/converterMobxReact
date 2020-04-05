import React from 'react'
import { observer, inject } from 'mobx-react'
import {TextField,MenuItem,Select,FormControl } from '@material-ui/core';
import { Tcoin } from '../../interface/index'
const ConverterBlock = inject('currenciesStore')(observer(({classes,currenciesStore} : any) => {
    React.useEffect(() => {
        currenciesStore.setMainValue('1')
        currenciesStore.setSecondValue(0, 0)
    }, [currenciesStore.getCurrencyCoin])
    const coins = currenciesStore.getItems
    const handleChange = (coin : any) => {
      currenciesStore.setCurrency(currenciesStore.getItems.filter((coins : any) => coin === coins.name)[0])
    }   
    const handleMainChange = (value: number) => {
        currenciesStore.setMainValue(value)
        currenciesStore.setSecondValue(value, Number(currenciesStore.getCurrencyCoin.price))
    }
    const handleSecondChange = (value: number) => {
        currenciesStore.setSecondValue(value)
        currenciesStore.setMainValue(value, Number(currenciesStore.getCurrencyCoin.price))
    }
    return (
        <div className={classes.cryptoInputBox}>
        <FormControl className={classes.currencyInput}>
        <TextField onChange={(e) =>handleMainChange(Number(e.target.value))} value={currenciesStore.mainValue}  label="Сумма"/>
        </FormControl>
        <Select defaultValue="BTC" onChange={(e) => handleChange(e.target.value)} value={currenciesStore.getCurrencyCoin?.name || 'BTC'}>
            {coins?.map((item : Tcoin, id: number) => <MenuItem  value={item.name} key={id}>{item.name}</MenuItem>)}
        </Select>
        <TextField label="Сумма" onChange={(e) => handleSecondChange(Number(e.target.value))} value={currenciesStore.getSecondValue || currenciesStore.getCurrencyCoin?.price} />
        <Select defaultValue="20">
        <MenuItem value={20}>$</MenuItem>
        </Select>
        </div>
    )
})) 


export default ConverterBlock