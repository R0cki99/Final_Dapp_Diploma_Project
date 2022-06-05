import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import Link from 'next/link'

import {
   LegacyContract
} from '../config'

import Legacy from '../artifacts/contracts/Legacy.sol/Legacy.json'
import { toast } from 'react-toastify'

export default function Home() {
/*
    Functions:
    -> Check current balance for my address in the contract.
   
    -> Option 2: Alegi optiunea ca banii sa se vireze periodic(odata la X zile) si in valoare de Y pana cand nu mai ramane nimic.
*/
        const [formInput, updateFormInput] = useState({ price: '', address: '', nrMinutes: '' })

        async function MakeDeposit(){
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            const Legacyy = new ethers.Contract(LegacyContract, Legacy.abi, signer)
            try{
              const price = ethers.utils.parseUnits(formInput.price, 'ether')
              try{  
                      const transaction = await Legacyy.deposit(price, parseInt(formInput.nrMinutes),  {value: price})
                      await transaction.wait()
                      toast.success("Money are locked");
                  }catch(error){
                      toast.error(error.message)
                  }
            }catch(error){
               toast.error("Please enter a valid amount")
            }
           
      
        }
        async function MakeDeposit2(){
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            const Legacyy = new ethers.Contract(LegacyContract, Legacy.abi, signer)
            try{
              const price = ethers.utils.parseUnits(formInput.price, 'ether')
              try{  
                      const transaction = await Legacyy.deposit2(formInput.address, price, parseInt(formInput.nrMinutes),  {value: price})
                      await transaction.wait()
                      toast.success("Money are locked");
                  }catch(error){
                      toast.error(error.message)
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

            const Legacyy = new ethers.Contract(LegacyContract, Legacy.abi, signer)
            //const price = ethers.utils.parseUnits(formInput.price, 'ether')
            try{
                const transaction = await Legacyy.withdraw()
                await transaction.wait()
                toast.success("Transaction successfull");
            }catch(error){
                toast.error("Withdrawal attempt too early!", error.message)
            }

        }
        async function WithDraw2(){
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            const Legacyy = new ethers.Contract(LegacyContract, Legacy.abi, signer)
            //const price = ethers.utils.parseUnits(formInput.price, 'ether')
            try{
                const transaction = await Legacyy.withdraw2()
                await transaction.wait()
                toast.success("Transaction successfull");
            }catch(error){
                toast.error("Withdrawal attempt too early!", error.message)
            }

        }
        async function checkBalancee(){
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            const Legacyy = new ethers.Contract(LegacyContract, Legacy.abi, signer)
            const transaction = await Legacyy.checkBalance()
            const tx = ethers.utils.formatEther(transaction)
            console.log(tx)
            document.getElementById("p1").innerHTML = `Amount locked: ${tx} ETH`;
        }
        async function checkBalancee2(){
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            const Legacyy = new ethers.Contract(LegacyContract, Legacy.abi, signer)
            const transaction = await Legacyy.checkBalance2()
            const tx = ethers.utils.formatEther(transaction)
            console.log(tx)
            document.getElementById("p2").innerHTML = `Amount locked: ${tx} ETH`;
        }
        function minutesConvertor(){
            toast.error("adcdscds");
            toast.success("adsacsc");
            toast.info('dcnskdcskdcdsck');
            toast.warn("dscdscdscds")
            const aux = parseInt(formInput.price) * 7 * 24 * 60
            document.getElementById("p3").innerHTML = `${aux} minutes`;
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
       <div className="bodyBuyerSeller2">
        
         <br></br>  <br></br>
      <div className="flex flex-col">

         <div className="w-full flex flex-row pb-12">
            <div className='centerTheButton4'>
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
                <h2>Option 1:</h2> <br></br>
                Lock the money in the contract and you decide when to unlock and
                send them back to your address <br></br>
                           <h2>Option 2:</h2> <br></br>
           Lock the money in the contract and you decide when to unlock and to witch address to
                send them to.
                            </p>
                    </div>
                    <div className="modal-footer">
                        <h3 className='modalFontSize'>Legacy Contract</h3>
                    </div>              
                </div>     
            </div>

            <div className='weekConverter'>
                <div className="flex flex-col">
                <input
              placeholder="Nr of weeks"
              className="mt-2 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                 />
                <button onClick={minutesConvertor} className="btn btn-gradient-border btn-glow font-bold mt-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
                    Convert weeks in minutes
                </button>
                <p className="SellerHeading" id="p3"></p>
            </div>
            </div>
           
         </div>
        
        <div className="w-full flex flex-row pb-12">

          <div className='LegacyDiv1'>
                <h2 className='mt-1 SellerHeading'>Option 1:</h2> <br></br>

                <button onClick={checkBalancee} className="btn btn-glow btn-primary font-bold mt-0 bg-cyan-400 text-white rounded p-4 shadow-lg">
              Amount locked for my address
                </button>
                <br></br>
                <p className="SellerHeading mt-2" id="p1"></p>
              <button onClick={WithDraw} className="btn btn-glow btn-primary LegacyClass font-bold mt-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
                 Unlock Money
              </button>
          </div>
    
          <div className="LegacyDiv2 flex flex-col pb-12">
            <h2 className='mt-2 SellerHeading flex flex-row'><b className='marginffs3'>Price to Lock in ETH</b>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
                    <div className='ethIcon'>
                        <i className="fab fa-ethereum"></i>   
                    </div><b>:</b>
            </h2>
            <input
              placeholder="Price to Lock in Eth"
              className="mt-2 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
            />
            <h2 className='mt-2 SellerHeading'><b>Nr of minutes you want to lock your money</b></h2>
            <input 
              placeholder="Nr of minutes you want to lock your money"
              className="mt-0 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, nrMinutes: e.target.value })}
            />
          <button onClick={MakeDeposit} className="btn btn-glow btn-primary font-bold mt-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
              Lock Money in the Contract
          </button>
          </div>

        </div>
 

        <div className="w-full flex flex-row pb-12">
        <div className='LegacyDiv1'>
           <h2 className='mt-1 SellerHeading'>Option 2:</h2> <br></br>

                <button onClick={checkBalancee2} className="btn btn-glow btn-primary font-bold mt bg-cyan-400 text-white rounded p-4 shadow-lg">
              Amount locked for my address
                </button>  
                <br></br>
                <p className="SellerHeading mt-2" id="p2"></p>         
           <br></br>
            <button onClick={WithDraw2} className="LegacyClass btn btn-glow btn-primary font-bold mt-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
              Unlock Money 
          </button>
        </div>
        <div className="LegacyDiv2 flex flex-col pb-12">
            
            <h2 className='mt-2 SellerHeading'><b>The address of the beneficiary</b></h2>
            <input 
              placeholder="The address of the beneficiary"
              className="mt-0 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
            />
            <h2 className='mt-2 SellerHeading flex flex-row'><b className='marginffs3'>Price to Lock in ETH</b>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
                    <div className='ethIcon'>
                        <i className="fab fa-ethereum"></i>   
                    </div><b>:</b>
            </h2>
            <input
              placeholder="Price to Lock in Eth"
              className="mt-2 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
            />
            <h2 className='mt-2 SellerHeading'><b>Nr of minutes you want to lock your money:</b></h2>
            <input 
              placeholder="Nr of minutes you want to lock your money"
              className="mt-0 border rounded p-4"
              onChange={e => updateFormInput({ ...formInput, nrMinutes: e.target.value })}
            />
          <button onClick={MakeDeposit2} className="btn btn-glow btn-primary font-bold mt-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
              Lock Money in the Contract
          </button>
          </div>
        </div>

        </div>
      
      </div>
    )

}