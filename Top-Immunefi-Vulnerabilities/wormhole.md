## Wormhole Uninitialized Proxy Bugfix Review

<br>

* [Immunefi post](https://medium.com/immunefi/wormhole-uninitialized-proxy-bugfix-review-90250c41a43a)

<br>

### Intro to Proxies

* A smart contract upgrade can be simply summarized as: a change in the code at a specific address while preserving the storage state of previous code and the relationship of that address to other contracts.

* A proxy contract and delegate calls can only swap the implementation, not the state of the contract.

* In Ethereum, there are three major types of contract calls: regular CALL, STATICCALL, and DELEGATECALL.

* When contract A makes a CALL to contract B by calling foo(), the function execution relies on contract B’s storage, and the msg.sender is set to contract A.

* However, when the same call is made using DELEGATECALL, the function foo() would be called on contract B but in the context of contract A. This means that the logic of contract B would be used, but any state changes made by the function foo() would affect the storage of contract A. And also, msg.sender would point to the EOA who made the call in the first place.

<img width="875" alt="Screen Shot 2022-06-08 at 10 22 23 PM" src="https://user-images.githubusercontent.com/1130416/172770375-6b99ee39-ebd8-4dc1-b8a1-e7c76f6161f4.png">

<br>

* A delegatecall makes it possible to create upgradeable contracts using a proxy pattern.

<img width="919" alt="Screen Shot 2022-06-08 at 10 23 34 PM" src="https://user-images.githubusercontent.com/1130416/172770543-32f49773-0025-45ae-acb1-5c8032432e96.png">

<br>

* Making an upgrade in this case is quite simple, as we only need to change the stored implementation contract address in order to change its smart contract logic. 

<br>

### Transparent Proxy Pattern (TPP) and Universal Upgradeable Proxy Standard (UUPS)

* when a proxy admin wants to call a proxy contract function transferOwnership() which shares a name with a function in the implementation contract, which one would be called? 

* Transparent Proxy Pattern (TPP): calls by a user always execute using the implementation contract’s logic. Calls by the proxy admin always execute using the proxy contract’s logic.


