## ethereum token standards

### tl; dr

* EIP stands for Ethereum Improvement Proposals.
* ERC stands for Ethereum request for comments (technical documents written by Ethereum developers for Ethereum community).
* Each such document contains a set of rules required to implement tokens for the Ethereum ecosystem.



<br>

---

### erc-20


* In the case of ERC20, a transaction sending ether to an address changes the state of an address.
    - a transaction transferring a token to an address only changes the state of the token contract, not the state of the recipient address.
* one of the main reasons for the success of EIP-20 tokens is in the interplay between `approve` and `transferFrom`, which allows for tokens to not 
only be transferred between externally owned accounts (EOA).
   - but to be used in other contracts under application specific conditions by abstracting away `msg.sender` as the mechanism for token access control.
*  a limiting factor lies from the fact that the EIP-20 `approve` function is defined in terms of `msg.sender`. 
    - this means that user’s initial action involving EIP-20 tokens must be performed by an EOA. 
    - if the user needs to interact with a smart contract, then they need to make 2 transactions (`approve` and the smart contract internal call `transferFrom`), with gas costs.

<br>

---

### in this dir

* [ERC20](erc20.md)
* [ERC777](erc777.md)
* [ERC721](erc721.md)

<br>

---

### resources
