## bug hunting smart contracts

<br>

### tl; dr

<br>
  
#### initial questions 

* list `external` and `public` functions. 
* when and where external call happens and what changes.
* check `payable` functions.
* how functions are accessed (permissions by who).
* follow the flow for transfers.

<br>

#### look for common vulnerabilities

* reentrancy with flashloans, fallbacks, payables.
* access control.
* arithmetic errors.

<br>

#### create an enviroment for testing

* static analysis
* fuzzing and poc exploits (use foundry)

<br>

---

### bug hunt platforms

<br>

* **[immunefi](https://immunefi.com/)**
* **[hackenproof](https://hackenproof.com/)**
* **[bountycaster](https://www.bountycaster.xyz/)**
* **[certik](https://www.certik.com/products/bug-bounty)**
* **[remedy](https://r.xyz/)**
