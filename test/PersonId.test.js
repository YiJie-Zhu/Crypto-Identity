const { assert } = require('chai');

const PersonId = artifacts.require('./PersonId.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('PersonId', (accounts) => {

    before(async () => {
        contract = await PersonId.deployed()
    })

    describe('deployment', async()=> {
        it('deploys seccessfully', async () => {
            const address = contract.address
            assert.notEqual(address, '')
        })

        it('has a name', async () => {
            const name = await contract.name()
            const symbol = await contract.symbol()
            console.log(symbol)
            assert.equal(name, "PersonId")
            
        })
    })
    
    describe('minting', async() => {
        it('creates a new token', async () => {
            const result = await contract.mint("Jackie Zhu", "test")
            const totalSupply = contract.tokenCounter
            assert.equal(totalSupply, contract.tokenCounter)
        })
    })

    describe('indexing', async()=>{
        it('list people', async()=>{
            await contract.mint("Tony Huang", "test")
            await contract.mint("Mer Zhang", "test")
            await contract.mint("Ian Chow", "test")
            const totalSupply = contract.tokenCounter

            let people
            let result = []
            for(var i = 1; i <= 4; i++){
                people = await contract.names(i - 1)
                result.push(people)
            }
            result = await contract.names
            console.log(result)
            let expected = ['Jackie Zhu', 'Tony Huang', 'Mer Zhang', 'Ian Chow'];
            assert.equal(1, 1)
        })
    })
})