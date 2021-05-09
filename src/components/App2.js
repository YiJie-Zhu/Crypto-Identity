import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'
import PersonId from '../abis/PersonId.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    {this.setState({ account: accounts[0]})}
    const networkId = await web3.eth.net.getId()
    const networkData = PersonId.networks[networkId]
    if(networkData){
      const abi = PersonId.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({contract: contract})
      const person = await contract.methods.names(1).call()
      const num = await contract.methods.tokenCounter.call()
      // for (var i = 1; i <= 5; i++){
      //   const person = await contract.methods.names(i - 1).call()
      //   this.setState({names: [...this.state.names, person]})
      // }
      console.log(parseInt(num, 10))
    }else{
      window.alert("contract not on this nework")
    }
  }

  
  mint = (person) => {
    console.log(this.state.account)
    this.state.contract.methods.mint(person).send({from: this.state.account})
    this.setState({totalSupply: this.state.totalSupply + 1})
  }

  constructor(props){
    super(props);
    this.state = {
      account: '',
      contract: null,
      totalSupply: 3,
      names: [],
      name:''
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <form onSubmit={(event) => {
                  event.preventDefault()
                  const person = this.name.value
                  this.mint(person)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. #FFFFFF'
                    ref={(input) => { this.name = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>


        </div>
      </div>
    );
  }
}

export default App;
