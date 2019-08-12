import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor() {
    super()
    this.state = {
      sushis: [],
      sushiIndex: 0,
      wallet: 200
    }
  }

  componentDidMount() {
    fetch(API) 
    .then(resp => resp.json())
    .then(sushis => {
      let sushiArray = sushis.map((sushi) => {return {...sushi, eaten:false}})
      this.setState({sushis: sushiArray})
    })
  }

  getSushis= () => {
    let fourSushis = this.state.sushis.slice(this.state.sushiIndex, (this.state.sushiIndex+4))
    return fourSushis
  }

  eatSushi = (selectedSushi) => {
    if(this.state.wallet >= selectedSushi.price){
    let sushiArray = this.state.sushis.map(sushi => {
      if(sushi.id === selectedSushi.id ){
        sushi.eaten = true
        return sushi
      }
      else
        return sushi
    })
    let newWallet = this.state.wallet - selectedSushi.price
    this.setState({sushis:sushiArray, wallet: newWallet})
  } else {
    return alert("You don't have enough $$$ for that selection!");
  }
  }

  handleMore = () => {
    console.log("inside handleMore")
    let moreSushi = this.state.sushiIndex + 4
    this.setState({sushiIndex: moreSushi})
  }

  render() {
    return (
      <div className="app">
        <SushiContainer  sushis={this.getSushis()} eatSushi={this.eatSushi} handleMore={this.handleMore}/>
        <Table wallet={this.state.wallet}/>
      </div>
    );
  }
}

export default App;