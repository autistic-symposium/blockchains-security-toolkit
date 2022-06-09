## Aurora inflation spend vulnerability

<br>

* [Immunefi blog post](https://medium.com/immunefi/aurora-infinite-spend-bugfix-review-6m-payout-e635d24273d)

<br>

### Bridges

* There aren’t any standardized ways of designing your own bridge. We’re still in uncharted waters.

* Bridges also have additional “attack surface” as compared to “regular” DeFi projects. While a yield farm or a decentralized exchange might have a collection of smart contracts and a dapp web page, a bridge usually needs monitoring nodes, validator keys, and secure communication channels on top of those contracts and dapp.

* Most bridges implement "IOU" approcah: users send funds to the bridge protocol, where those funds are locked by the bridge smart contract. The bridge then issues the user an equivalent asset on the second network from the second bridge smart contract. The tokens on the destination chain are wrapped tokens. Bridges accumulate a lot of funds.

<br>

### Ethereums's `DELEGATECALL` vs. `CALL`


<img width="914" alt="Screen Shot 2022-06-08 at 8 29 36 PM" src="https://user-images.githubusercontent.com/1130416/172758401-b10c11fe-8fb4-42bf-b3be-3ffc4682ef9a.png">
<img width="929" alt="Screen Shot 2022-06-08 at 8 29 55 PM" src="https://user-images.githubusercontent.com/1130416/172758414-6a6d531d-dc6c-4507-b0cf-6cd63e4d0858.png">


<br>

### Aurora

* Aurora is an implementation of an EVM built on the NEAR network that supports all tools available in the Ethereum ecosystem.

* Aurora developed the Rainbow Bridge which allows users to transfers assets between Ethereum, NEAR, and Aurora.

* Two contracts in the Aurora Engine are interesting to us: `ExitToNear` and `ExitToEthereum`. They are special, built-in (precompiled) contracts that handle withdraw requests from the Aurora EVM.

<br>

### Exploit

Step by step:

1. Bridge Ether from Ethereum to Aurora using Rainbow Bridge (Aurora Bridge)
2. Deploy the malicious contract on Aurora that makes the delegatecall to the native contract ExitToNear i.e. 0xe9217bc70b7ed1f598ddd3199e80b093fa71124f
3. Call the exploit function of the malicious contract. Aurora is tricked at this point to send nETH to the caller on NEAR from the Aurora bridge contract. 4. The balance of attacker doesn’t change on Aurora
5. Attacker then deposits back nETH to Aurora, doubling the attacker’s balance
6. Repeat from step 3.



<br>

### Vulnerability fix

* An exit error is returned if the address given does not match the input's address, which disables the ability to call the contract with `DELEGATECALL`.
