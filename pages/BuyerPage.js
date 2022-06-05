import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {
   BankContract
} from '../config'

import Bank from '../artifacts/contracts/Bank.sol/Bank.json'

export default function Home() {
    const [formInput, updateFormInput] = useState({ price: '', address: '' })
    //const [loadingState, setLoadingState] = useState('not-loaded')


    async function ENTER(){

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner();

        const Bankk = new ethers.Contract(BankContract, Bank.abi, signer)
       try{
         const price = ethers.utils.parseUnits(formInput.price, 'ether')
         try{ 
            const transaction = await Bankk.LockMoney(formInput.address, price, {value: price})
            await transaction.wait()
            console.log(price.toString())
            toast.success("The money are locked!");
        }catch(error){
            toast.error("Wrong address or amount!",error.message);
        }
       }catch(error){
         toast.error("Please enter a valid amount")
       }


    }

    async function WithDraw(){

      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()

      const Bankk = new ethers.Contract(BankContract, Bank.abi, signer)
      //const price = ethers.utils.parseUnits(formInput.price, 'ether')
      try{
        const transaction2 = await Bankk.sendMoneyToSeller(formInput.address) //formInput.address
        await transaction2.wait()
        toast.success("Deal Approved");
      }catch(error){
        alert(error.message)
      }
      
   }
    function modalFunction(){
        var modal = document.getElementById("myModal");
          modal.style.display = "block";
          
    }
    function spanFunction(){
        var modal = document.getElementById("myModal");
          modal.style.display = "none";
    }

     return (
       <div className="bodyBuyerSeller">
        
         <br></br> 
      <div className="flex flex-col">
          <div className="mb-22 flex flex-row">
            
             <div className='centerTheButton3'>
                <button onClick={modalFunction} className="btn btn-gradient-border btn-glow" id="myBtn">Info</button>
            </div>
              <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span onClick={spanFunction} className="close">&times;</span>
                        <h2 className='modalFontSize'>Additional Information</h2>
                    </div>
                    <div className="modal-body">
                            <p className='BuyerSellerParagraps'>
                                 Here you must input the Seller address and lock the correct amount in the smart contract.<br></br>
                                  <b>Important:</b> If your Seller did not initiate the contract from 
                                  his side with your address, you WILL NOT be able to lock your 
                                  money into the smart contract <br></br>
                                          Once you received the package you have to call the Approve function from the smart contract
            in order to unlock and send the moeny to the seller.
                            </p>
                    </div>
                    <div className="modal-footer">
                        <h3 className='modalFontSize'>Third Party Contract</h3>
                    </div>
               
            </div>
               
            </div>
            <Link href="/BuyerOrSeller" passHref>
              <div className='btn btn-gradient-border btn-glow Sellerback'>
                Back 
              </div>
            </Link>
          </div><br></br> <br></br>
        
         <div className='flex flex-col Form1TestClass'>

            <h2 className='SellerHeading'><b>Address from your Seller:</b></h2>
            <input 
              placeholder="Address from your Seller"
              className="m-3 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
            />
            <h2 className='SellerHeading flex flex-row'><b className='marginffs2'>Asset Price in ETH</b>
                  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
                    <div className='ethIcon'>
                        <i className="fab fa-ethereum"></i>   
                    </div><b>:</b>
           </h2>
            <input
              placeholder="Asset Price in Eth"
              className="m-3 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
            />
          <button onClick={ENTER} className="btn btn-glow btn-primary font-bold m-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
              Lock Money in the Contract (Only Buyer)
          </button>
         

        </div>

        <br></br>  <br></br>  <br></br>

        <div className='flex flex-col Form1TestClass'>
            
            <h2 className='mt-1 SellerHeading'><b>Address from your Seller:</b></h2>
            <input 
              placeholder="Address from your Seller"
              className="m-3 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
              type={"number"}
            />
          <button onClick={WithDraw} className="btn btn-glow btn-primary font-bold m-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
              My delevery has arrived (Only Buyer)
          </button>
        
        </div>

        </div>
      
      </div>
    )
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
 }
/*
import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarket.sol/NFTMarketplace.json'

export default function MyAssets() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await marketplaceContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenURI)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        tokenURI
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  function listNFT(nft) {
    console.log('nft:', nft)
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }  
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>)
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <Image src={nft.image} className="rounded" height="350" width="350" alt="x" />
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                  <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => listNFT(nft)}>List</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
*/