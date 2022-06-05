const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function () {
  it("Should Deposit", async function () {
      const Bank = await ethers.getContractFactory("Bank")
      const BankContract = await Bank.deploy()
      await BankContract.deployed()

      const ana = await BankContract.getAddress()
      //const radu = await BankContract.getBalance()
     // console.log("Balance before", radu)
      BankContract.deposit(0, 1222222, ana)
      const segi = await BankContract.getBalance(0, ana)
      console.log("Balance before", ethers.utils.parseUnits(segi.toString(), 'ether'))
  })
})

/*
describe("NFTMarket", function () {
  it("Should Create and execute market sales", async function () {

    const NFTMarketplace = await ethers.getContractFactory("NFTMarket")
    const nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()
    const marketAddress = nftMarketplace.address;

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await nftMarketplace.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')
    
    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")

    await nftMarketplace.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await nftMarketplace.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})
    const [_, buyerAddress] = await ethers.getSigners()
  
    await nftMarketplace.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice })
  
    let items = await nftMarketplace.fetchMarketItems()

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))

    console.log('items:', items)
  });
});
*/