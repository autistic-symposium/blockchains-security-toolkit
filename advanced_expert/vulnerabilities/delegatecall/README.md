## attacks via code injection with `DELEGATECALL`

<br>

### tl; dr

<br>

1. Call to untrusted contracts may introduce unexpected risks and errors.
2. External calls controlled by an attacker may force a contract to transition into an undefined state.
3. Types of external calls: `STATICCALL` and `DELEGATECALL`.
4. Using `DELEGATECALL`, contract can preserve the storage state while using the logic of the contract. This introduces the concept of Proxies.
5. The proxy contract redirects all the calls it receives to an "logic contract", whose address is stored in its "proxy contract". The proxy runs the "logic contract"'s code as its own (modifying its storage and the balance of the "proxy contract").

<br>

<p align="center">
<img width="500"  src="https://user-images.githubusercontent.com/1130416/190880608-1b511a87-d91e-4ae4-8714-08cd7e8eec89.png">
</p>
<br>

* bt3gl's diagram:

<p align="center">
<img src="https://github.com/go-outside-labs/blockchain-auditing/assets/138340846/405335ca-a1c7-4d3c-83fb-4b96ee13a384" width="55%" align="center" style="padding:1px;border:1px solid black;"/>
</p>
<br>

---

### cool resources

<br>

* **[SWC docs on DELEGATECALL](https://swcregistry.io/docs/SWC-112)**
* **[sigma prime post on DELEGATECALL](https://blog.sigmaprime.io/solidity-security.html#delegatecall)**
* **[understanding DELEGATECALL, by d. arends](https://www.derekarends.com/solidity-vulnerability-understanding-delegatecall/)**
