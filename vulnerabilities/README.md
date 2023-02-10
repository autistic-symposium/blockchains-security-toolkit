## smart contract vulnerabilities


### tl; dr


* `tx.origin` needs to bere placed by `msg.sender`, otherwise any contract you call can act on your behalf.
* inline assembly should be used only in rare cases.
* unclear semantics: `now` is alias for `block.timestamp` not current time; use of low level `call`, `callcode`, `delegatecall` should be avoided whenever possible; use `transfer` whenever failure of ether transfer should rollnack the whole transaction.
* beware of caller contracts: `selfdestruct` can block calling contracts unexpectedly.
* invocation of local functions via `this`: never use `this` to call functions in the same contract, it only consumes more gas than normal call.
* transferring Ether in a for/while/do-while loop should be avoid due to the block gas limit.
* erc20 `decimals` should have `uint8` as return type.

<br>

---

### in this dir


* [reentrancy](reentrancy_attacks)
* [randomness in ethereum](random_numbers.md)
* [code injection via `delegatecall`](delegatecall)
* [ddos attacks](ddos.md)
* [nonce reuse](nonce)




<br>

----

### resources

* [secureum-mind-map](https://github.com/x676f64/secureum-mind_map/blob/master/3.%20Solidity%20201.md)
* [defi hacks & exploits](https://github.com/SunWeb3Sec/DeFiHackLabs/#list-of-defi-hacks--exploits)
* [ethereum smart contract security best practices](https://consensys.github.io/smart-contract-best-practices/)
* [biased nonce sense lattice attacks against weak ECDSA](https://www.youtube.com/watch?v=6ssTlSSIJQE_
