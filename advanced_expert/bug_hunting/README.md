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

#### create an environment for testing

* static analysis
* fuzzing and poc exploits (use foundry)

<br>

---

### cool resources

<br>

* **[solidity bugs by version](https://00xsev.github.io/solidityBugsByVersion/)**

<br>

#### cool bug bounty platforms

* **[immunefi](https://immunefi.com/)**
* **[hackenproof](https://hackenproof.com/)**
* **[bountycaster](https://www.bountycaster.xyz/)**
* **[certik](https://www.certik.com/products/bug-bounty)**
* **[remedy](https://r.xyz/)**

<br>

#### cool communities

* **[eth rangers](https://ethrangers.com/)**
* **[security alliance](https://securityalliance.org/)**
* **[the red guild](https://theredguild.org/)**
