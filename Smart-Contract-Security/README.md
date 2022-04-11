## ☠️ Security



### Basic security notes


* `tx.origin` is used: you want to replace it by “msg.sender” because otherwise any contract you call can act on your behalf.
* Avoid potential reetrancy bugs: 
```
msg.sender.transfer(amount);
balances[msg.sender] -= amount;
```
* Inline assembly should be used only in rare cases.
* Unclear semantics: `now` is alias for `block.timestamp` not current time; use of low level `call`, `callcode`, `delegatecall` should be avoided whenever possible; use `transfer` whenever failure of ether transfer should rollnack the whole transaction.
* Beware of caller contracts: `selfdestruct` can block calling contracts unexpectedly.
* Invocation of local functions via `this`: never use `this` to call functions in the same contract, it only consumes more gas than normal call.
* Transferring Ether in a for/while/do-while loop should be avoid due to the block gas limit.
* ERC20 `decimals` should have `uint8` as return type.

<br>

---

<br>



### References

* [Uniswap Oracle Attack Simulator by Euler](https://blog.euler.finance/uniswap-oracle-attack-simulator-42d18adf65af)
   * "Given current concentrated liquidity profile of the ABC/WETH pool, what would it cost the attacker to move a N-minute TWAP of the ABC price to x?" 
* [Hacking the Blockchain by Immunifi](https://medium.com/immunefi/hacking-the-blockchain-an-ultimate-guide-4f34b33c6e8b)
* [Thinking About Smart Contract Security by Vitalik](https://blog.ethereum.org/2016/06/19/thinking-smart-contract-security/)
* [Spoof tokens on Ethereum](https://medium.com/etherscan-blog/spoof-tokens-on-ethereum-c2ad882d9cf6)
