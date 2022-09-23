# Attacks via code injection with `DELEGATECALL`

<br>


#### 🖤 This is my favorite vuln 

<br>

---

### TL;DR

1. Call to untrusted contracts may introduce unexpected risks and errors.
2. External calls controlled by an attacker may force a contract to transition into an undefined state.
3. Types of external calls: `STATIC CALL` and `DELEGATE CALL`.
4. Using DELEGATE CALL, contract can preserve the storage state while using the logic of the contract. This introduces the concept of Proxies.
5. The proxy contract redirects all the calls it receives to an "logic contract", whose address is stored in its "proxy contract". The proxy runs the "logic contract"'s code as its own (modifying its storage and the balance of the "proxy contract").

<img width="956" alt="Screen Shot 2022-09-17 at 5 30 04 PM" src="https://user-images.githubusercontent.com/1130416/190880608-1b511a87-d91e-4ae4-8714-08cd7e8eec89.png">


<br>


---

### Learning resources

<br>

* [SWC docs on DELEGATECALL](https://swcregistry.io/docs/SWC-112)
* [Sigma Prime post on DELEGATECALL](https://blog.sigmaprime.io/solidity-security.html#delegatecall)
