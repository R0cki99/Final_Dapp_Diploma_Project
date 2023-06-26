import '../styles/globals.css'
import { useState } from 'react'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { ownerAddress } from '../config'
import 'easymde/dist/easymde.min.css'
import detectEthereumProvider from '@metamask/detect-provider';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
//Passed
const providerOptions = {
  /* See Provider Options Section */
};
//const provider = await detectEthereumProvider();

function MyApp({ Component, pageProps }) {

    /* create local state to save account information after signin */
  const [account, setAccount] = useState(null)
  const [account2, setAccount2] = useState(null)
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { 
            infuraId: "d87294daaf084c3da8c85d9bba4382ec"
          },
        },
      },
    })
    return web3Modal
  }
  let ok=0;
    /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await new getWeb3Modal({
        providerOptions
      })
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
      console.log(window.ethereum)
      ok=1;
    } catch (err) {
      console.log('error:', err)
    }
  }
  async function logout() {
    try {
       const web3Modal = await getWeb3Modal()
       const clear = await web3Modal.clearCachedProvider();
       setAccount()
    } catch (err) {
      console.log('error:', err)
    }
  }

return(   
   <div className='bodyOfAppJS'>
     <>
        <ToastContainer />
     </>
      <nav className="nav">
        <div className="header">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
          <div className='navIcon'>
              <i className="fa fa-industry fa-3x" aria-hidden="true"></i>
          </div>
          <Link href="/">
            <a>
              <div className="titleContainer">
                <h2 className="title">Contract Factory</h2>
              </div>
            </a>
          </Link>
          {
            !account && (
              <div className="buttonContainer">
                <button className="btn btn-gradient btn-glow" onClick={connect}>Connect</button>
              </div>
            )
          }

          {
            account && <p className="accountInfo">{account}</p>
          }
                    {
          account && (
              <div className="buttonContainer">
                <button className="btn btn-gradient btn-glow" onClick={logout}>Logout</button>
              </div>
            )
          }
        </div>

     

      </nav>
      <div>
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  )
}

export default MyApp
