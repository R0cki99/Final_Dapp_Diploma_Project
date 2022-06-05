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

    async function InitiateThirdParty(){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const Bankk = new ethers.Contract(BankContract, Bank.abi, signer)
        try{
          const price = ethers.utils.parseUnits(formInput.price, 'ether')
            try{
              const transaction = await Bankk.InitiateThirdPartyDeal(formInput.address, price)
              await transaction.wait()
              toast.success("Party initiated!");
         
            }catch(error){
              toast.error(error.message);
            }
        }catch(error){
          toast.error("Please enter a valid amount")
        }
        


    }

    async function SeeBalanceForMe(){

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const Bankk = new ethers.Contract(BankContract, Bank.abi, signer)
        const price = await Bankk.seeBalanceFromBuyer(formInput.address)
        const transaction = ethers.utils.formatEther(price)
        console.log(transaction);
        document.getElementById("p11").innerHTML = `The balance locked for me is ${transaction} ETH`;
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
                                Here you must input the Buyer address and the Price of your product in order to initiate the Thrid Party interaction.<br></br>
                                <b>Important:</b> Once you initiate the agreement by calling the function inside the smart Contract
                                you will send a notification to the Buyer.<br></br> After that you must wait for a notification
                                from the Buyer that insures you that the money are locked in the contract. <br></br>
                                Then, you can send your package to the buyer.
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
              <h2 className='mt-1 SellerHeading'><b>Address from your Buyer:</b></h2>
              <input 
                placeholder="Address from your Buyer"
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
            <button onClick={InitiateThirdParty} className="btn btn-glow btn-primary font-bold m-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
                InitiateThirdParty (Only the Seller)
            </button>
        </div> <br></br> <br></br> <br></br>
        <div className='flex flex-col Form1TestClass'>
              <h2 className='mt-1 SellerHeading'><b>Address from your Buyer:</b></h2>
              <input 
                placeholder="Address from your Buyer"
                className="m-3 border rounded p-4"
                onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
              />
      
      
                    <p className="SellerHeading" id="p11"></p>
               
      
              
           <button onClick={SeeBalanceForMe} className="btn btn-glow btn-primary font-bold m-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
                SeeBalanceForMe (Only the Seller)
            </button>              
       </div>   
        </div>
      </div>
    )
}