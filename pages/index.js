import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import Link from 'next/link'

import {
   BankContract
} from '../config'


import Bank from '../artifacts/contracts/Bank.sol/Bank.json'
//import { link } from 'ethereum-waffle'

export default function Home() {
 

     return (
       <div className='boddy'>
     <div className='bodyINDEX'>
       <div className="background-image"></div>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
        <div className="containerCC">
          <Link href="/BuyerOrSeller" passHref>
            <div className='box'>
              <div className='icon'>
              <i className="fa fa-address-card-o iconColor" aria-hidden="true"></i>
              <div className='content'>
                <h3>Third Party Contract</h3>
              </div>
              </div>
            </div>
          </Link>
          <Link href="/Legacy" passHref>
            <div className='box'>
              <div className='icon'>
              <i className="fa fa-lock iconColor" aria-hidden="true"></i>
              <div className='content'>
                <h3>Legacy Contract</h3>
              </div>
              </div>
            </div>
          </Link>
          <Link href="/Insurance" passHref>
            <div className='box'>
              <div className='icon'>
              <i className="fa fa-medkit iconColor" aria-hidden="true"></i>
              <div className='content'>
                <h3>Insurance Contract</h3>
              </div>
              </div>
            </div>
          </Link>
        </div>
    </div>
    </div>
  )
}
//   /*
//   const [nfts, setNfts] = useState([])
//   const [loadingState, setLoadingState] = useState('not-loaded')
//   useEffect(() => {
//     loadNFTs()
//   }, [])
//   async function loadNFTs() {
//     /* create a generic provider and query for unsold market items */
//     const provider = new ethers.providers.JsonRpcProvider()
//     const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
//     const data = await contract.fetchMarketItems()

//     /*
//     *  map over items returned from smart contract and format 
//     *  them as well as fetch their token metadata
//     */
//     const items = await Promise.all(data.map(async i => {
//       const tokenUri = await contract.tokenURI(i.tokenId)
//       const meta = await axios.get(tokenUri)
//       let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
//       let item = {
//         price,
//         tokenId: i.tokenId.toNumber(),
//         seller: i.seller,
//         owner: i.owner,
//         image: meta.data.image,
//         name: meta.data.name,
//         description: meta.data.description,
//       }
//       return item
//     }))
//     setNfts(items)
//     setLoadingState('loaded') 
//   }
//   async function buyNft(nft) {
//     /* needs the user to sign the transaction, so will use Web3Provider and sign it */
//     const web3Modal = new Web3Modal()
//     const connection = await web3Modal.connect()
//     const provider = new ethers.providers.Web3Provider(connection)
//     const signer = provider.getSigner()
//     const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
//     const contract2 = new ethers.Contract(BankContract, Bank.abi, signer)
//     //const Bank = await ethers.getContractFactory("Bank")
//    // const BankContract = await Bank.deploy()
//    // await BankContract.deployed()

//   //  await BankContract.deposit();
//    // await BankContract.pickWinner();



//     /* user will be prompted to pay the asking proces to complete the transaction */
//     const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
//     const transaction2 = await contract2.enter({value: price})
//     const transaction = await contract.createMarketSale(nft.tokenId, {
//       value: price
//     })
//     await transaction.wait()
//     await transaction2.wait()
//     //loadNFTs()
//   }

//   async function test(nft){
//     const web3Modal = new Web3Modal()
//     const connection = await web3Modal.connect()
//     const provider = new ethers.providers.Web3Provider(connection)
//     const signer = provider.getSigner()
//     const contract2 = new ethers.Contract(BankContract, Bank.abi, signer)
//     const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
//     const transaction2 = await contract2.enter()
//     await transaction2.wait()
//   }
// /*
//     async function buyNft2(nft) {
//     /* needs the user to sign the transaction, so will use Web3Provider and sign it 
//     const web3Modal = new Web3Modal()
//     const connection = await web3Modal.connect()
//     const provider = new ethers.providers.Web3Provider(connection)
//     const signer = provider.getSigner()
//     const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
//     //console.log(contract.address);
//     //console.log(contract.balance);
//     /* user will be prompted to pay the asking proces to complete the transaction 
//     //let nr=0.001;
//     //const price = ethers.utils.parseUnits(nr.toString(), 'ether')   
//     const transaction = await contract.sendToSeller(nft.tokenId)
//     await transaction.wait()
//     //loadNFTs()
//   }*/
  
//   if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
//   return (
//     <div className="flex justify-center">
//       <div className="px-4" style={{ maxWidth: '1600px' }}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
//           {
//             nfts.map((nft, i) => (
//               <div key={i} className="border shadow rounded-xl overflow-hidden">
//                 <Image src={nft.image} height="350" width="350" alt="" />
//                 <div className="p-4">
//                   <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
//                   <div style={{ height: '70px', overflow: 'hidden' }}>
//                     <p className="text-gray-400">{nft.description}</p>
//                   </div>
//                 </div>
//                 <div className="p-4 bg-black">
//                   <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
//                   <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => test(nft)}>Lock Money</button>
//                   <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft2(nft)}>Approve</button>
//                 </div>
//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </div>
//   )
 