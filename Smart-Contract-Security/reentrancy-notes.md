## Reentrancy


<br>

* When a contract calls an external function, that external function may itself call the calling function.
* To prevent this attack, a contract can implement a lock in storage that prevents re-entrant calls.

<br>

### References to learn about reentrancy

<br>

* [Solidity docs](https://docs.soliditylang.org/en/latest/security-considerations.html#re-entrancy)
* [DASP](https://www.dasp.co/#item-1)
* [SWC](https://swcregistry.io/docs/SWC-107)
* [Not so smart contract](https://github.com/crytic/not-so-smart-contracts/tree/master/reentrancy)
