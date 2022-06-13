## Optimism Infinite Money Duplication 

<br>

* [Immunefi blog post](https://medium.com/immunefi/optimism-infinite-money-duplication-bugfix-review-daa6597146a0)
* [Saurik blog post](https://www.saurik.com/optimism.html)

<br>

* The bug would have allowed an attacker to replicate money continuously on any chain using a vulnerability found in OVM 2.0.
* Executing means advancing the state of a blockchain by running transactions inside the virtual machine. 
* The EVM has a stack-based architecture. We can control the stack by using opcodes. When smart contracts receive a message, their EVM bytecode is run, which allows them to update their state or even send further messages to other contacts.
* Proving is simply the act of convincing L1 contracts that the state produced by executing some transactions is correct.
* Optimism’s approach to this is different from other L2 scaling solutions. Here, executing and proving are done together.
* If there were a dispute between Alice and Bob, the transaction in question would be re-executed (replayed) on the L1 chain. But this introduces some potential issues, as we cannot rely on certain opcodes to return the same value on the L1 chain and the L2 chain. Certain ones like BLOCKNUMBER, for example, won’t produce the same value because they rely on blockchain metadata or information from the time of proving (instead of the time of execution).
* The solution is introducing a mechanism that would help retain the context of the disputed transaction on L2 when verifying it on L1. Optimism Virtual Machine (OVM 2.0) replaces all context-dependent opcodes with OVM counterparts, like ovmBLOCKNUMBER.
* The OVM 1.0 decided to store ETH as ERC-20 tokens instead. This caused some issues for Optimism, as the network needed to support all things that were working on Ethereum but was broken due to this, like gas tokens. When OVM 2.0 launched, OVM 2.0 stopped support for this feature but still stores all of the balances for user accounts in the storage state of an ERC-20 contract.
* Optimism modified Geth, one of the original three implementations of Ethereum protocol, to apply patches to StateDB to store the native balances in an ERC-20 token storage state.

<br>

### The Vulnerability

[Code](https://github.com/MetisProtocol/mvm/blob/46d08bce46d1e0039a64522eb0bd9dfff0e0fc46/l2geth/core/state/statedb.go#L468)

* The `SELFDESTRUCT` opcode causes a contract to self-destruct. deleting its account object. This permits obsolete states to be removed from the active set of the blockchain.
* The `selfdestruct(address)` method, which was renamed from `suicide(address)`, destroys all bytecode from the calling contract address and transfers all Ether held to the target address. No functions (including the fallback) are called if the target address is also a contract.
* The most important thing to note here is that the contract (object) is destroyed at the end of a transaction, meaning we can still perform operations on that contract after calling the selfdestruct function, only if such operations are still in the same transaction.
* The problem is that the Optimism client sets the balance to zero directly on the stateObject instead of checking UsingOVM and redirecting balance modification to the OVM_ETH contract!
* Due to this bug, when a contract is selfdestructed, it gives the balance of the calling contract to the target AND still keeps the original balance. We’re modifying a stateObject balance and not updating native balances in the ERC20 token storage state (OVM_ETH contract).
* An attacker could have used this bug to inflate the balance of the target contract by repeatedly selfdestructing a contract that holds Ether. After several iterations the attacker can then “cash out” the inflated Ether balance, thus creating the money out of thin air.




