import Link from 'next/link'



export default function Home() {

     


function modalFunction(){
    var modal = document.getElementById("myModal");
      modal.style.display = "block";
      
}
function spanFunction(){
    var modal = document.getElementById("myModal");
       modal.style.display = "none";
}

function modalFunction2(){
    var modal = document.getElementById("myModal2");
      modal.style.display = "block";
      
}
function spanFunction2(){
    var modal = document.getElementById("myModal2");
       modal.style.display = "none";
}

     return (
      <div className='bodyBuyerSeller'>
         <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <h2 className='BuySellHeadLines'></h2>
            <div className='centerTheButton'>
                <button onClick={modalFunction} className="btn btn-gradient-border btn-glow" id="myBtn">RuleSet: Step by step guide for interacting with the Third Party Contract.</button>
            </div>
           
           <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span onClick={spanFunction} className="close">&times;</span>
                        <h2 className='modalFontSize'>RuleSet</h2>
                    </div>
                    <div className="modal-body">
                            <p className='BuyerSellerParagraps'><b className='Steps'>Step 1:</b> Person_#1(the seller) has to know the Ethereum address of the Person_#2(the buyer).</p>
                            <p className='BuyerSellerParagraps'><b className='Steps'>Step 2:</b> Person_#2(the buyer) has to know the Ethereum address of the Person_#1(the seller).</p>
                            <p className='BuyerSellerParagraps'><b className='Steps'>Step 3:</b> Person_#1(the seller) needs to click on Seller Box and interact with the smart contract.
                                Then, Person_#1(the seller) must input the Person_#2(the buyer) address and the amount of ETH that he needs
                                to receive on his product.</p>
                            <p className='BuyerSellerParagraps'><b className='Steps'>Step 4:</b> Person_#2(the buyer) needs to click on the Buyer Box and also interact with the smart contract.
                                Then, Person_#2(the buyer) must input the Person_#1(the seller) address and lock the required
                                amount of ETH inside the smart contract.</p>
                            <p className='BuyerSellerParagraps'><b className='Steps'>Step 5:</b> Person_#1(the seller) will receive a notification that the money are locked inside the smart contract.
                                Then, Person_#1(the seller) will have to send the product to Person_#2(the buyer), being assured that once
                                the package arrives, he will receive the money from the smart contract.</p>
                            <p className='BuyerSellerParagraps'><b className='Steps'>Step 6:</b> After Person_#2(the buyer) receives the package he must again interact with the smart contract by 
                                approving that he received the package. After the approval is done, the money from the smart contract
                                will be unlocked and sent to Person_#1(the seller) address.</p>
                    </div>
                    <div className="modal-footer">
                        <h3 className='modalFontSize'>Third Party Contract</h3>
                    </div>
                </div>
            </div>
  
         <div className="containerCCC">
          <Link href="/SellerPage" passHref>
            <div className='btn btn-semi-transparent btn-glow marginButton'>
            <i className="fa fa-address-book fa-5x IconBuySell" aria-hidden="true"></i>

                <h4 className="titleButtonBuySell">   I am the Seller</h4>
              
            </div>
          </Link>
         <Link href="/BuyerPage" passHref>
            <div className='btn btn-semi-transparent btn-glow marginButton2'>
            <i className="fa fa-address-book-o fa-5x IconBuySell" aria-hidden="true"></i>
                <h4 className="titleButtonBuySell">     I am the Buyer</h4>
              
            </div>
          </Link>
          </div>

            <div className='centerTheButton2'>
                <button onClick={modalFunction2} className="btn btn-gradient-border btn-glow" id="myBtn">Our Policy.</button>
            </div>
            <div id="myModal2" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span onClick={spanFunction2} className="close">&times;</span>
                        <h2>Our Policy</h2>
                    </div>
                    <div className="modal-body">
                        <p className='BuyerSellerParagraps'>
                        
                            IF the money are locked in the contract and Person #2(the buyer) does not receives the package within 
                            3 months, then, Person #1(the seller) is required to sent us via email the proof that the package was sent,
                            and the proof that the packaged was successfully delivered. <br></br>
                            If the documents are validated by us, we will have the posibility to call the Approve function 
                            from the smart contract in order to unlock and send the money to Person #1(the seller).<br></br>
                            If the documents are not validated or received by us within 1 month from Person #1(the seller),
                            we will have the posibility to call a Decline function from the smart contract in order to unlock 
                            and send back the money to Person #2(the buyer).
                        </p>
                    </div>
                    <div className="modal-footer">
                        <h3>Third Party Contract</h3>
                    </div>
                </div>
            </div>
 
            
        </div>
  )
}