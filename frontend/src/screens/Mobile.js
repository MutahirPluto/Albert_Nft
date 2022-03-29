import React from "react";
import Slider from "react-slick";
import slide1 from "../assets/images/slide1.gif"
import slide2 from "../assets/images/slide2.gif"
import slide3 from "../assets/images/slide3.gif"
import slide4 from "../assets/images/slide4.gif"
import slide5 from "../assets/images/slide5.gif"
import slide6 from "../assets/images/slide6.gif"
import gif from "../assets/images/gifius.gif"
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import { injectedConnector } from "../utils/connectors"
import NFTSaleAbi from "../contract/NFTsale.json"
import { nFTsale_addr } from "../contract/addresses"
import { ethers, BigNumber } from "ethers"
import { isMobile } from 'react-device-detect';
import Web3 from "web3";
// import { initWeb3Onboard, initNotify } from './services'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'






// new VConsole()



function Mobile() {

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
    const [qty, setQty] = useState(0);
    









    const settings = {
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 2000,
        cssEase: 'linear',
        infinite: true,
        vertical: true,
        arrows: false,
        swipe: false,
        responsive:
            [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        vertical: false,
                    }
                }
            ]
    };


    const increase = () => {

        if (qty < 20) {
            setQty(qty + 1)
        }
    };

    const decrease = () => {
        if (qty > 0) {
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
                {timeLeft[interval]} <br />{interval}{" "}
            </span>
        );
    });

    const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/c9b9223ea0ee4e159c68d2cd3554a5a5'

    const injected = injectedModule()
    
    const walletConnect = walletConnectModule({
        bridge: 'wc:8a5e5bdc-a0e4-4702-ba63-8f1a5655744f@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a',
        qrcodeModalOptions: {
            mobileLinks: [ 'metamask', 'trust', 'imtoken', 'pillar']
        }
    })

    const onBoard = Onboard({
        wallets: [injected],
        chains: [
            {
                id: '0x1',
                token: "ETH",
                label: "Ethereum Mainnet",
                rpcUrl: MAINNET_RPC_URL
            }
        ],
        appMetadata: {
            name: "Mutahir",
            icon: "https://png.pngtree.com/png-clipart/20190920/original/pngtree-correct-icon-png-image_4602219.jpg",
            description: "Hello<<>>"
        }
    })

    async function connectWallet() {
        const wallets = await onBoard.connectWallet()
        console.log(wallets)
    }
    // connectWallet()

    const metamaskAppDeepLink = "https://metamask.app.link/dapp/albert_nft.surge.sh/";

    return (

        <>

            <section className="main">

                <div className="main-flex">

                    <Slider {...settings} className="slider">

                        <img src={slide1} />
                        <img src={slide2} />
                        <img src={slide3} />
                        <img src={slide4} />
                        <img src={slide5} />
                        <img src={slide6} />

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

                                <img src={gif} />

                                <div className="price">

                                    <p>Price Per NFT</p>
                                    <h3>{salePrice}</h3>
                                    {/* <h3>{salePrice}</h3> */}

                                </div>

                            </div>

                            <div className="min-max">

                                <div class="increament">
                                    <div class="value-button decrease" id="decrease" value="Decrease Value" onClick={(e) => decrease()}>-</div>
                                    <input type="number" id="room-number" value={qty} min="1" max="20" class="number" readOnly />
                                    <div class="value-button increase" id="increase" value="Increase Value" onClick={(e) => increase()}>+</div>
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



                            <div>
                            <a href={metamaskAppDeepLink}>
                                <button className="custom-btn" onClick={connectWallet}>
                                    Connect to MetaMask
                                </button>
                                {/* <input type="submit" className="custom-btn" value="Mint" onClick={connectWallet} /> */}
                            </a>
                                <div className="mint-num">
                                    <span>889</span>
                                    <span>/</span>
                                    <span>1000</span>
                                </div>
                            </div>



                        </div>


                    </div>

                </div>

            </section>


        </>

    )

}

export default Mobile;