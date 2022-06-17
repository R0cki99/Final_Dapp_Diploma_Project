import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {
   InsuranceContract
} from '../config'

import Insurance from '../artifacts/contracts/Insurance.sol/Insurance.json'
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber'

export default function Home() {
    const [formInput, updateFormInput] = useState({ price: '', medicalInstitute: '', pacientId: '', RequestId: '' })

    async function ENTER(){

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const Insurancee = new ethers.Contract(InsuranceContract, Insurance.abi, signer)
        const price = ethers.utils.parseUnits("0.25", 'ether')

        try{
          const transaction = await Insurancee.payMonthlyRate({value: price})
          await transaction.wait()
          console.log(price.toString())
          toast.success("Transaction succsesfull");
        }catch(error){
            toast.error(error.message)
        }

    }
    async function SeeBalance(){

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const Insurancee = new ethers.Contract(InsuranceContract, Insurance.abi, signer)

        try{
          const transaction = await Insurancee.seeBalance()
          const tx = ethers.utils.formatEther(transaction);
          document.getElementById("balancee").innerHTML = `Amount locked: ${tx} ETH`;
        }catch(error){
            toast.error("You are not the manager!", error.message)
        }
    }
 


        async function GetRequest(){

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const Insurancee = new ethers.Contract(InsuranceContract, Insurance.abi, signer)
          let x = 0;
        try{
          const transaction2 = await Insurancee.getRequestsLength();
          var cont = document.getElementById('RequestDiv');
          cont.replaceChildren();
          var ul = document.createElement('ul');
          ul.setAttribute('style', 'padding: 0; margin: 0;');
          //ul.setAttribute('id', 'theUL');
          for(let i=0;i<transaction2.toNumber();i++){
            const transaction = await Insurancee.getRequest(i);
            if(transaction.approved == true){

                x++;
                if(transaction.approved == false){
                  x--;
                }
                var li = document.createElement('li')
                li.setAttribute('id', 'RequestClass2')
                var ul2 = document.createElement('ul');
                ul2.setAttribute('id', 'theUL');

                var li21 = document.createElement('li');
                li21.setAttribute('id', 'theLI');
                var li22 = document.createElement('li');
                li22.setAttribute('id', 'theLI');
                var li23 = document.createElement('li');
                li23.setAttribute('id', 'theLI');
                var li24 = document.createElement('li');
                li24.setAttribute('id', 'theLI');
                
                const tx = ethers.utils.formatEther(transaction.value)

                li21.innerHTML=`Request ID: ${transaction.index}`;
                li22.innerHTML=`Description: ${transaction.description}`;
                li23.innerHTML=`Amount: ${tx} ETH`;
                li24.innerHTML=`Pacient ID: ${transaction.pacientID}`;

                ul2.appendChild(li21);
                ul2.appendChild(li22);
                ul2.appendChild(li23);
                ul2.appendChild(li24);

                li.appendChild(ul2); 
                ul.appendChild(li);
            }

          }
          if(x==0){
            toast.error("No requests in the contract!");
          }
          cont.appendChild(ul);
        }catch(error){
            toast.error(error.message)
        }

    }

        async function WithDraw(){

        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const Insurancee = new ethers.Contract(InsuranceContract, Insurance.abi, signer);
       try{
          const price = ethers.utils.parseUnits(formInput.price, 'ether') 
          try{
              const transaction = await Insurancee.makeRequest(formInput.medicalInstitute, price, formInput.pacientId)
              await transaction.wait()
              toast.success("Request done!");
            }catch(error){
              toast.error("Monthly Costs unpaid!", error.message);
            }
       }catch(error){
          toast.error("Please enter a valid amount")
       }
         


    }

        async function ApproveRequest(){
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            const Insurancee = new ethers.Contract(InsuranceContract, Insurance.abi, signer)
            const requestID = parseInt(formInput.RequestId)
            try{
               const transaction = await Insurancee.approveRequest(requestID)
               await transaction.wait()
               GetRequest()
             }catch(error){
               alert(error.message)
             }
        }

        async function DeclineRequest(){
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()

            const Insurancee = new ethers.Contract(InsuranceContract, Insurance.abi, signer)          
            const requestID = parseInt(formInput.RequestId)
            try{
               const transaction = await Insurancee.declineRequest(requestID)
               await transaction.wait()
               GetRequest()
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
       <div className="bodyBuyerSeller2">
         <br></br>  <br></br>
      <div className="flex flex-col">

            <div className='centerTheButton5'>
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
                     This smart contract was initially designed with the purpose of simulating a medical insurance contract. 
                     <br></br>
                     If any user of the website wants to be insured by the Medical Insurance smart contract, he/she needs to pay the monthly costs of 0.25 ETH. 
                     <br></br>
                     If this requirement is not met, then the user will not be able to request a withdrawal for medical purposes.
                     <br></br><br></br>
                     After an user has requested an withdrawal it’s up to the smart contract’s manager to verify the provided information and approve or decline the request. 
                     <br></br>
                     If the request is approved, the requested amout of money will be sent from the smart contract to that user.
                            </p>
                    </div>
                    <div className="modal-footer">
                        <h3 className='modalFontSize'>Insurance Contract</h3>
                    </div>              
                </div>     
            </div>     
        <div className="mb-22 flex flex-row">
            <div className=" InsuranceFirstDiv flex flex-col pb-12">

        
              
                <h2 className='mt-2 SellerHeading'><b>Monthly costs are: 0.25 ETH</b></h2>
    
                  <button onClick={ENTER} className="btn btn-glow btn-primary font-bold mt-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
                      Pay Monthly Rate
                  </button>
              

            </div>

            <div className="flex flex-col pb-12">
        
              <div className="InsuranceFirstDiv2 mt-5 flex flex-col pb-12">
                <h2 className='mt-2 SellerHeading'><b>Medical institute name:</b></h2>
                <input
                  placeholder="Medical institute that has to receive the payment"
                  className="mt-2 border rounded p-4"
                  onChange={e => updateFormInput({ ...formInput, medicalInstitute: e.target.value })}
                />
                <h2 className='mt-2 SellerHeading flex flex-row'><b className='marginffs'>Asset Price in ETH</b>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous"></link>
                    <div className='ethIcon'>
                        <i className="fab fa-ethereum"></i>   
                    </div><b>:</b>
                </h2>
                <input
                  placeholder="Asset Price in Eth"
                  className="mt-2 border rounded p-4"
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <h2 className='mt-2 SellerHeading'><b>Pacient ID:</b></h2>
                <input
                  placeholder="Your pacient ID number in order for the medic to verify"
                  className="mt-2 border rounded p-4"
                  onChange={e => updateFormInput({ ...formInput, pacientId: e.target.value })}
                />
              <button onClick={WithDraw} className="btn btn-glow btn-primary font-bold mt-4 bg-cyan-400 text-white rounded p-4 shadow-lg">
                  Request to withdraw
              </button>
              </div>          
            </div>
        </div>  
        <div className="InsuranceFirstDiv5 w-full flex flex-row">
          <div className="handlingInsuranceDiv flex flex-col ">
      
      
              <h2 className='m-0 SellerHeading'><b>Only manager acces!</b></h2>
            <button onClick={SeeBalance} className="btn btn-glow btn-primary font-bold mt-4 text-white rounded p-4 shadow-lg">
               Show Contract Balance
            </button>
            <p className='mt-2 SellerHeading' id="balancee"></p>
             <button onClick={GetRequest} className="btn btn-glow btn-primary font-bold mt-4 text-white rounded p-4 shadow-lg">
                Update request box:
            </button>
          </div>
          
            
  

            <div className="InsuranceFirstDiv3 flex flex-col pb-12 ">
                  <input
                    placeholder="Request ID"
                    className="mt-2 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, RequestId: e.target.value })}
                  />
                <button onClick={ApproveRequest} className="btn btn-glow btn-primary2 font-bold mt-4 text-white rounded p-4 shadow-lg">
                    Approve Request
                </button>
                <button onClick={DeclineRequest} className="btn btn-glow btn-primary3 font-bold mt-4 text-white rounded p-4 shadow-lg">
                    Decline Request
                </button>
            </div>
          
      
        </div>
          <div className="RequestClass mt-200 flex flex-col pb-12" id="RequestDiv">

          </div>
        </div>
      
      </div>
    )
}