## smart contract vulnerabilities

<br>


### initial thoughts

<br>

* `tx.origin` needs to be replaced by `msg.sender`, otherwise any contract you call can act on your behalf.
* inline assembly should be used only in rare cases.
* unclear semantics: `now` is alias for `block.timestamp` not current time; use of low level `call`, `callcode`, `delegatecall` should be avoided whenever possible; use `transfer` whenever failure of ether transfer should rollback the whole transaction.
* beware of caller contracts: `selfdestruct` can block calling contracts unexpectedly.
* invocation of local functions via `this`: never use `this` to call functions in the same contract, it only consumes more gas than normal call.
* transferring Ether in a for/while/do-while loop should be avoided due to the block gas limit.
* erc20 `decimals` should have `uint8` as return type.

<br>

---

### chapters

<br>

* **[reentrancy](reentrancy_attacks)**
* **[randomness in ethereum](randomness)**
* **[code injection via `delegatecall`](delegatecall)**
* **[arithmetic errors](arithmetic_errors)**
* **[self_destruct](self_destruct)**
* **[ddos attacks](ddos)**
* **[nonce reuse](nonce)**
* **[replay attacks](replay_attacks)**

<br>

----

###  cool resources

<br>

* **[secureum-mind-map](https://github.com/x676f64/secureum-mind_map/blob/master/3.%20Solidity%20201.md)**
* **[defi hacks & exploits](https://github.com/SunWeb3Sec/DeFiHackLabs/#list-of-defi-hacks--exploits)**
* **[ethereum smart contract security best practices](https://consensys.github.io/smart-contract-best-practices/)**
* **[biased nonce sense lattice attacks against weak ECDSA](https://www.youtube.com/watch?v=6ssTlSSIJQE_)**


