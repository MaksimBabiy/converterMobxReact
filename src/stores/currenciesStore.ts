import  { observable, computed, action, toJS } from 'mobx';
import { Tcoin, TCoinDiff } from '../interface';
import axios from 'axios'
class CurrenciesStore {
    @observable private items: Tcoin[] = [];
    @observable private currentCoin: Tcoin | object = this.items[0];
    @observable private mainValue: number = 0
    @observable private secondValue: number = 0
    @observable private diffArr : TCoinDiff = {}

    @computed
    get getItems() {
        return toJS(this.items)
    }
    @computed
    get getCurrencyCoin() {
        return toJS(this.currentCoin)
    }
    @computed
    get getSecondValue() {
        return this.secondValue
    }
    @computed
    get getDiffArr() {
        return toJS(this.diffArr)
    }
    @computed
    get getMainValue() {
        return this.mainValue
    }
    @action
    setMainValue = (value: number, coinPrice: number) => {
        coinPrice ? this.mainValue = value / coinPrice : this.mainValue = value
    } 
    @action
    setCurrency = (item: Tcoin): void => {
        this.currentCoin = item
    }
    @action
    setItems = (items: Tcoin[]) :void => {
        this.diffArr = this.diffFunc(this.items, items).reduce(
            (initObj: TCoinDiff, obj: Tcoin) => {
                const newObj: Tcoin = items.find(o => o.name === obj.name)!
                const oldObj: Tcoin = this.items.find(o => o.name === newObj.name)!
                const color: string = newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? 'green' : 'red';
                initObj[newObj.name] = color;
                return initObj
            }
        ,{})
        this.items = items;
        setTimeout(() => this.diffArr = {}, 4000)
    }
    @action
    setSecondValue = (value: number, coinPrice: number) => {
        coinPrice ? this.secondValue = value * coinPrice : this.secondValue = value
    }
    @action
    fetchItems = () => {
    axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=15&tsym=USD`).then(({data}) => {
      const coins: Tcoin[] = data.Data.map((coin: any) => {
        const obj: Tcoin = {
          name: coin.CoinInfo.Name,
          fullname: coin.CoinInfo.FullName,
          imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
          price: coin.RAW.USD.PRICE.toFixed(2),
          volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR)
        }
        return obj;
      });
      this.setItems(coins)
    }
    )
    }
    diffFunc = (arr1: Tcoin[], arr2: Tcoin[]) => {
       return arr1.filter( (obj, index) => obj.price !== arr2[index].price ? true : false )
    }
}

export default CurrenciesStore
