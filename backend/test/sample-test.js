const { expect } = require("chai");
const { ethers } = require("hardhat");

async function mineNBlocks(n) {
  for (let index = 0; index < n; index++) {
    await ethers.provider.send('evm_mine');
  }
}

describe("Albert nft ",  function ()  {

  
  let NFTsale
  let nFTsale
  let NFTpaymentSplitter
  let nFTpaymentSplitter
//   let RewardToken
//   let rewardToken
//   let TicketConsumer;
//   let ticketConsumer;
//   let Factory
//   let factory
//   let CrowdSale
//   let crowdSale
//   let TokenForSale
//   let tokenForSale


//   let [_,per1,per2,per3] = [1,1,1,1]

  it("Should deploy all smart contracts", async function () {

    [_,per1,per2,per3] = await ethers.getSigners()
    
    NFTpaymentSplitter = await ethers.getContractFactory("NFTpaymentSplitter")
    nFTpaymentSplitter =await NFTpaymentSplitter.deploy()
    await nFTpaymentSplitter.deployed()  
  
    NFTsale = await ethers.getContractFactory("NFTsale")
    nFTsale =await NFTsale.deploy(nFTpaymentSplitter.address)
    await nFTsale.deployed()  
    

   
  });
 
  it("Should buy", async function () {
    
    //let _value = await ethers.utils.parseEther('5')
    let approve = await nFTsale.buyToken(50,{value:250})
    await approve.wait()

    let pend = await nFTpaymentSplitter.pendingPayment("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
    console.log("pending",pend.toString())

     approve = await nFTsale.buyToken(1,{value:5})
    await approve.wait()

     pend = await nFTpaymentSplitter.pendingPayment("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
    console.log("pending",pend.toString())
  });
  it("states", async function () {
    let _value = await ethers.utils.parseUnits('30000')
    let tx = await nFTpaymentSplitter.release("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
    await tx.wait()
    
    
    tx = await nFTpaymentSplitter.released("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
    console.log("released :",tx.toString())
    
    
  });
  it("Should buy", async function () {
    
    //let _value = await ethers.utils.parseEther('5')

    let approve = await nFTsale.buyToken(1,{value:5})
    await approve.wait()

    let pend = await nFTpaymentSplitter.pendingPayment("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
    console.log("pending",pend.toString())
  });
  it("states", async function () {
    let _value = await ethers.utils.parseUnits('30000')
    let tx = await nFTpaymentSplitter.release("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
    await tx.wait()
    
    
    tx = await nFTpaymentSplitter.released("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2")
    console.log("released :",tx.toString())
    
    
  });
// //   it("Should stake zpad", async function () {
// //     let _value = await ethers.utils.parseEther('45000')
// //     let approve = await zpad.approve(staking.address,_value)
// //     await approve.wait()
// //     let tx = await staking.stake(_value)
// //     await tx.wait()
// //     await mineNBlocks(10);
// //   });
// //   it("states", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.getUserStakedValue(_.address)
// //     console.log("staked value :",tx.toString())
// //     tx = await staking.TotalBronze()
// //     console.log("bronze value :",tx.toString())
// //     tx = await staking.totalSilver()
// //     console.log("silver value :",tx.toString())
// //     tx = await staking.totalGold()
// //     console.log("Gold value :",tx.toString())
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("1 PendingRewards :",tx.toString())
// //     tx = await staking.calcPendingRewards(per1.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //   });

// //   it("Should stake zpad", async function () {
// //     let _value = await ethers.utils.parseEther('95000')
// //     let approve = await zpad.approve(staking.address,_value)
// //     await approve.wait()
// //     let tx = await staking.stake(_value)
// //     await tx.wait()
// //     await mineNBlocks(10);

// //   });

// //   it("states", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.getUserStakedValue(_.address)
// //     console.log("staked value :",tx.toString())
// //     tx = await staking.TotalBronze()
// //     console.log("bronze value :",tx.toString())
// //     tx = await staking.totalSilver()
// //     console.log("silver value :",tx.toString())
// //     tx = await staking.totalGold()
// //     console.log("Gold value :",tx.toString())
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("1 PendingRewards :",tx.toString())
// //     tx = await staking.calcPendingRewards(per1.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //   });
// //   it("Should unstake zpad", async function () {
// //     let _value = await ethers.utils.parseEther('200')
    
// //     let tx = await staking.connect(per1).unStake(_value)
// //     await tx.wait()

// //   });
// //   it("states", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.getUserStakedValue(_.address)
// //     console.log("staked value :",tx.toString())
// //     tx = await staking.TotalBronze()
// //     console.log("bronze value :",tx.toString())
// //     tx = await staking.totalSilver()
// //     console.log("silver value :",tx.toString())
// //     tx = await staking.totalGold()
// //     console.log("Gold value :",tx.toString())
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("1 PendingRewards :",tx.toString())
// //     tx = await staking.calcPendingRewards(per1.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //   });

// //   it("Should withdraw rewards", async function () {
    
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.withdrawRewards()
// //     await tx.wait()
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //     tx = await rewardToken.balanceOf(_.address)
// //     console.log("Balance Of rewardtoken :",tx.toString())
    
// //   });

// //   it("Should create project IDO", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let approve = await tokenForSale.approve(factory.address,100000);
// //     await approve.wait()
// //     let tx = await factory.create_TokenSale(tokenForSale.address,_.address,1000000000000,100,_.address)
// //     await tx.wait()  
// //   });

// //   it("Should create ico & whitelist", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let approve = await tokenForSale.approve(factory.address,100000);
// //     await approve.wait()
// //     let ico = await factory.ico_addr()
    
// //     crowdSale = await CrowdSale.attach(ico)
// //     let whitelist = await crowdSale.connect(per1).getWhitlisted()
// //     await whitelist.wait()
    
// //     let userIdos = await ticketConsumer.getUserAppliedProjects(_.address)
// //     console.log("user idos",userIdos)

// //     userIdos = await ticketConsumer.getUserAppliedProjects(per1.address)
     
// //     console.log("user idos",typeof(userIdos))
// //   });
  

});
