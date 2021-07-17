const Factory = artifacts.require("EnochV2Factory.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");
const EnochPair = artifacts.require("EnochV2Pair")

const BN = require("bn.js");

module.exports = async function (deployer, network, addresses) {

  await deployer.deploy(Factory, addresses[0]); //send transaction
  const factory = await Factory.deployed(); //gets mined

  await deployer.deploy(EnochPair);
  const Enochpair = await EnochPair.deployed()

  let token1Address, token2Address;
  if(network === 'mainnet'){
      token1Address = '';
      token2Address = '';

  } else {

      await deployer.deploy(Token1);
      await deployer.deploy(Token2);
      const token1 = await Token1.deployed();
      const token2 = await Token2.deployed();
      token1Address = token1.address;
      token2Address = token2.address;

      console.log("Token 1 address", token1Address)
      console.log("Token 2 address", token2Address)
      console.log("Factory address", factory.address)
    
      let T1pairAdddress = await factory.createPair(token1Address, token2Address);
      console.log("",T1pairAdddress);

      console.log("Pair address: ", await factory.getPair(token1Address, token2Address));
      // address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);
      console.log("Creation Code", await factory.getCreationCode())

      console.log("Enoch V2 Pair address", Enochpair.address);
      

  }
};
// .getCreationCode().call()

















// TOKEN_A_AMOUNT = pow(10, 18);
      // a.pow(b) = 10.pow(18)
      // amount = 100 * (10**18);