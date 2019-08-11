import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:5000/sushis"

let empty = [];

class App extends Component {

  constructor(){
    super()

    this.state = {
      sushis: [],
      budget: 200,
      startIndex: 0,
      emptyPlates: [], 
      eaten: false
    }
  }

  // componentDidMount() {
  //   {fetch(API)
  //   .then(resp => resp.json())
  //   .then(sushi => this.setState({sushi: sushi}))}
  // }

  componentDidMount() {
    fetch(API)
      .then(r => r.json())
      .then(sushisData => {
        const sushis = sushisData.map(sushiObj => ({
          ...sushiObj,
          eaten: false
        }));
        this.setState({ sushis });
      });
  }

  handleEatSushi=(id, price)=>{
    if(this.state.budget >= price) {
      const newSushiData= this.state.sushis.map(sushiObj => {
        if(sushiObj.id === id) {
          return {...sushiObj, eaten: true }
        } else {
          return sushiObj
        }
      });
      this.setState(currentState => ({
        sushis: newSushiData,
        budget: currentState.budget - price
      }))
    } else {
      alert("Sorry! You don't have enough $ for that sushi!")
    }
  }

  handleMoreSushi=(e)=>{
    this.setState(currentState => {
      return {startIndex: currentState.startIndex + 4}
    })
  }

  sushiToDisplay() {
    return this.state.sushis.slice(
      this.state.startIndex, this.state.startIndex + 4
    )
  }

  handleSushiPlateClick = (sushiObj) => {
    if (sushiObj.img_url !== '') {
      empty.push(sushiObj);
      let index = this.state.sushis.findIndex((s) => s.id == sushiObj.id);
      sushiObj.img_url = '';
      
      let remaining = this.state.budget - sushiObj.price;
      this.state.sushis[index] = sushiObj;
      this.setState({
        sushis: this.state.sushis,
        emptyPlates: empty,
        budget: remaining
      });
    }
  };

  getEatenSushis(){
    return this.state.sushis.filter(sushi =>sushi.eaten)
  }

  render() {
    return (
      <div className="app">
        <SushiContainer  
        getEatenSushis={this.getEatenSushis()}
        sushiToDisplay={this.sushiToDisplay()}
        handleMoreSushi={this.handleMoreSushi}
        handleEatSushi={this.handleEatSushi} 
        handleSushiPlateClick={this.handleSushiPlateClick}/>

        <Table  plates={this.state.emptyPlates} money={this.state.budget} sushis={this.getEatenSushis()}/>
      </div>
    );
  }
}

export default App;