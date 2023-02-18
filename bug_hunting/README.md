## bug hunting smart contracts

<br>

### initial questions  

<br>

* list `external` and `public` functions. 
* when and where external call happens and what changes.
* check `payable` functions.
* how functions are accessed (permissions by who).
* follow the flow for transfers.

<br>

### look for common vulnerabilities

<br>

* reentrancy with flashloans, fallbacks, payables.
* access control.
* arithmetic errors.

<br>

### create an enviroment for testing

<br>

* static analysis
* fuzzing and poc exploits (use foundry)

<br>

---

### resources
