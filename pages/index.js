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

 