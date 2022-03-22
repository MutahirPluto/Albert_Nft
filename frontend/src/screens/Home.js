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




function Home(){

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

      useEffect(() => {
        injectedConnector
          .isAuthorized()
          .then((isAuthorized) => {
            setLoaded(true)
            if (isAuthorized && !networkActive && !networkError) {
              activateNetwork(injectedConnector)
            }
          })
          .catch(() => {
            setLoaded(true)
          })
      }, [activateNetwork, networkActive, networkError])


      const handleSubmit = (event) => {
          connectWallet()
        event.preventDefault()
      }

    //   const detect = async () => {
    //     const provider = await detectEthereumProvider();
    
    //   if (provider) {
    //     // console.log('Metamask Installed')
    //     return 
    //   } else {
    //     setDetectMetamask("Install Metamask")
    //   }
    //   }
    //   detect()


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

    const [qty,setQty] = useState(0);

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
                            <span>1000</span>
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

                        <form>

                            <div className="price-per-nft">

                                <img src={gif}/>

                                <div className="price">

                                    <p>Price Per NFT</p>
                                    <h3>0.11 ETH Each</h3>

                                </div>

                            </div>

                            <div className="min-max">
                                
                                <div class="increament">
                                    <div class="value-button decrease" id="decrease" value="Decrease Value" onClick={(e)=>decrease()}>-</div>
                                    <input type="number" id="room-number" value={qty} min="1" max="20" class="number" readOnly/>
                                    <div class="value-button increase" id="increase" value="Increase Value" onClick={(e)=>increase()}>+</div>
                                </div>

                                
                                <button className="custom-btn-sm">Set max</button>

                            </div>

                            <div className="total-mint">

                                <p>Total</p>
                                <p>0.11 ETH</p>

                            </div>

                            {/* <input style={{border:"1px solid red"}} onClick={handleSubmit} type="submit" className="custom-btn" value="Mint"/>

                            <div className="mint-num">
                                <span>889</span>
                                <span>/</span>
                                <span>1000</span>
                            </div> */}

                            {
           networkError?<button type="button" className="btn-custom secondary-btn">Connect Wallet</button>:
           active 
            ? (
                <div>
                 <input onClick={handleSubmit} type="submit" className="custom-btn" value="Mint"/>
                <div className="mint-num">
                <span>889</span>
                <span>/</span>
                <span>1000</span>
            </div>
                </div>
            )
             : (

                <div>
                <input   onClick={() => {
              connectWallet(activate);
            }} type="submit" className="custom-btn" value="Mint"/>
               <div className="mint-num">
               <span>889</span>
               <span>/</span>
               <span>1000</span>
           </div>
               </div>

            // <div><button onClick={loadProvider} type="button" className="btn-custom secondary-btn">Connect Wallet</button>
             
            //  </div>
            ) 
         }

                        </form>

                    </div>
                    

                </div>

            </div>

        </section>


        </>

    )

}

export default Home;