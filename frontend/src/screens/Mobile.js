import Slider from "react-slick";
import slide1 from "../assets/images/slide1.gif"
import slide2 from "../assets/images/slide2.gif"
import slide3 from "../assets/images/slide3.gif"
import slide4 from "../assets/images/slide4.gif"
import slide5 from "../assets/images/slide5.gif"
import slide6 from "../assets/images/slide6.gif"
import gif from "../assets/images/gifius.gif"
import {useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "../utils/connectors"
import NFTSaleAbi from "../contract/NFTsale.json"
import {nFTsale_addr} from "../contract/addresses"  
import {ethers, BigNumber} from "ethers"
import {isMobile} from 'react-device-detect';
import { Container, Form, FormControl, Nav, Navbar,Button, NavDropdown,  Modal } from "react-bootstrap";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3 from "web3"








function Home(){

    
    // const providerOptions = {
    //     walletconnect: {
    //       package: WalletConnectProvider,
    //       options: {
    //         rpc: {
    //           56: 'https://bsc-dataseed1.binance.org'
    //         },
    //         chainId: 56
    //         }
    //     }
    // }

      

    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal,
        active: networkActive, error: networkError, activate: activateNetwork
      } = useWeb3React();


      const [loaded, setLoaded] = useState(false)
      const [salePrice, setSalePrice] = useState("1")
      const [supply, setMaxSupply] = useState("1")
      const [totalEth, setTotalEth] = useState("1")
      const [tokenCount, setTokenCount] = useState("1")
      const [qty,setQty] = useState(0);
      const [show1, setShow1] = useState(false)
      const handleClose1 = () => setShow1(false);
      const handleShow1 = () => setShow1(true);
    


      const modalSubmit = () => {
        handleShow1()
      }

  

   
   

    
   


    const settings = {
        slidesToShow:3,
        autoplay:true,
        autoplaySpeed:0,
        speed:2000,
        cssEase:'linear',
        infinite:true,
        vertical:true,
        arrows:false,
        swipe:false,
        responsive:
        [
            {
                breakpoint:992,
                settings:{
                    slidesToShow:3,
                    slidesToScroll:3,
                    vertical:false,
                }
            }
        ]
      };


    const increase = () => {
        
        if(qty < 20){
            setQty(qty + 1)
        }
    };

    const decrease = () => {
        if(qty > 0){
            setQty(qty - 1)
        }
    };

 
    

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        let difference = +new Date(`4/01/${year}`) - +new Date();
      
        let timeLeft = {};
      
        if (difference > 0) {
          timeLeft = {
            Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            Min: Math.floor((difference / 1000 / 60) % 60),
           
          };
        }
      
        return timeLeft;
      }

      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      
        return () => clearTimeout(timer);
      });

      const timerComponents = [];

      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
      
        timerComponents.push(
          <span className="timer-inner">
            {timeLeft[interval]} <br/>{interval}{" "}
          </span>
        );
      });

    return(

        <>
        
        <section className="main">

            <div className="main-flex">

                <Slider {...settings} className="slider">
            
                    <img src={slide1}/>
                    <img src={slide2}/>
                    <img src={slide3}/>
                    <img src={slide4}/>
                    <img src={slide5}/>
                    <img src={slide6}/>

                </Slider>

                <div className="right-form">

                    <h2>Special Price for Discord Members</h2>
                    <h3>March 18 - 1am EST</h3>

                    
                    <div className="timer">
                        <h2>{timerComponents.length ? timerComponents : <span>Mint Now</span>}</h2>
                    </div>
                   

                    <div className="supply-details">

                        <div>
                            <p>Supply</p>
                            <span>{supply}</span>
                        </div>

                        <div>
                            <p>Price</p>
                            <span>0.11 ETH</span>
                        </div>

                        <div>
                            <p>Max</p>
                            <span>20 per Wallet</span>
                        </div>

                    </div>

                    <div className="form-box">

                        <h1>Bonus Sale</h1>

                        {/* <form> */}

                            <div className="price-per-nft">

                                <img src={gif}/>

                                <div className="price">

                                    <p>Price Per NFT</p>
                                    <h3>{salePrice}</h3>
                                    {/* <h3>{salePrice}</h3> */}

                                </div>

                            </div>

                            <div className="min-max">
                                
                                <div class="increament">
                                    <div class="value-button decrease" id="decrease" value="Decrease Value" onClick={(e)=>decrease()}>-</div>
                                    <input type="number" id="room-number" value={qty}  min="1" max="20" class="number" readOnly/>
                                    <div class="value-button increase" id="increase" value="Increase Value" onClick={(e)=>increase()}>+</div>
                                </div>

                                
                                <button className="custom-btn-sm">Set max</button>

                            </div>

                            <div className="total-mint">

                                <p>Total</p>
                                <p>{qty * salePrice}</p>

                            </div>

                            {/* <input style={{border:"1px solid red"}} onClick={handleSubmit} type="submit" className="custom-btn" value="Mint"/>

                            <div className="mint-num">
                                <span>889</span>
                                <span>/</span>
                                <span>1000</span>
                            </div> */}

                            {/* <button type="button" className="btn-custom secondary-btn">Connect Wallet</button> */}
          
                <div>
                 <input  type="submit" className="custom-btn" value="Mint" onClick={modalSubmit} />
                <div className="mint-num">
                <span>889</span>
                <span>/</span>
                <span>1000</span>
            </div>
                </div>

                <Modal show={show1}  onHide={handleClose1}  className='custom-modal' 
                                aria-labelledby="contained-modal-title-vcenter"
                                centered>
                                    <Modal.Body style={{ backgroundColor:"#05181f"}}>
                                    <div style={{textAlign:"center"}}>
                                       
                                        <div  style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
                                       
                                        <div   style={{marginTop:"20px", display:"flex",justifyContent:"space-between" ,alignItems:"center"}}>
                                        {/* <div style={{ width:"100px"}}>
                                        <img style={{ marginRight:"13rem"}} src="https://airforshare.com/files/idWtvB.png" width="50%"/>
                                        </div> */}

                                        <div style={{ width:"100px"}}>
                                            {window.location.href == "https://albert_nft.surge.sh/" ? <a href = "https://metamask.app.link/dapp/albert_nft.surge.sh/">
                                            <img style={{ marginRight:"13rem"}} src="https://spng.pngfind.com/pngs/s/472-4724730_metamask-red-fox-hd-png-download.png" width="50%"/>
                                            </a>: ""}
                                       
                                        </div>

                                        <div>
                                        <span  style={{color:"white"}}>Metamask</span>
                                        </div>
                                        </div>

                                        <div style={{marginTop:"20px", display:"flex", alignItems:"center"}}>
                                        <div style={{ width:"100px"}}>
                                            {window.location.href == "https://albert_nft.surge.sh/" ? <a href = "https://link.trustwallet.com/open_url?coin_id=60&url=albert_nft.surge.sh/">
                                            <img style={{ marginRight:"13rem"}} src="https://www.pngkit.com/png/detail/359-3599042_trust-badge-png-trust-wallet-logo.png" width="60%" />
                                            </a>: ""}
                                       
                                        </div>
                                        <div>
                                        <span style={{color:"white"}}>TrustWallet</span>
                                        </div>
                                        </div>


                                        </div>

                                    </div>
                                    </Modal.Body>
                                
                            </Modal>
            
            
         


        {/* <div>
                {
                        isMobile == true && window.location.href == "https://albert_nft.surge.sh/" ? <a href="https://metamask.app.link/dapp/albert_nft.surge.sh/">
                        <button  >
                          Connect to MetaMask
                        </button>
                    </a> : console.log("sorry")
                      }
                </div> */}
        

                        {/* </form> */}

                          

                    </div>
                    

                </div>

            </div>

        </section>


        </>

    )

}

export default Home;