// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;




import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";








contract NFTsale is ReentrancyGuard, Ownable {
    
     
    uint256 public total_supply;
    uint256 public maxSupply = 100;
    uint256 public SalePrice = 0.01 ether;
    address payable receiver1  = payable(address(0x3B2FA3fB4c7eD3bC495F276DC60782b635bB04d9));
    address payable receiver2  = payable(address(0xb55fc27c8d39FA19293f4f5920230D3897B13933));

    mapping(address => uint256) public addressMintedBalance;

     constructor()  {
    }

    function getAmount(uint256 amount) public view 
        returns ( uint256 )
    {
        return (amount * SalePrice ) ;
    }
    
    function buyToken(uint256 amount) public nonReentrant payable {
        
        uint256 weiAmount = getAmount(amount);
        require (weiAmount ==  msg.value,"please provide exact amount for one Token");
        require (total_supply+amount <=  maxSupply,"entered ammount exceed max supply");
        total_supply+=amount;
        (receiver1).transfer(address(this).balance/2);
        (receiver2).transfer(address(this).balance/2);
        addressMintedBalance[msg.sender] += amount;
    }

    

    function settotal_supply(uint256 _total_supply) public onlyOwner {
        total_supply =_total_supply;
    }

    function setmaxSupply(uint256 _maxSupply) public onlyOwner {
       maxSupply =_maxSupply;
    }

    function setSalePrice(uint256 _SalePrice) public onlyOwner {
       SalePrice =_SalePrice;
    }
    function getaddressMintedBalance (address _addressMintedBalance) public view returns (uint256){
        return addressMintedBalance[_addressMintedBalance] ;
    }



}

    