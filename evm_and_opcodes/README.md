## the evm


### tl;dr

* EVM is a quasi-Turing complete machine (quasi because computation is intrinsically bounded/limited through a parameter: gas) 
* EVM is the runtime environment for smart contracts.
* "Ethereum virtual machine code" or "EVM code" are cute lil code are written in a low-level, stack-based bytecode language, each byte represents an operation.
* EVM memory is a simple stack-based architecture with: stack, volatile memory, non-volatile storage (word size of 256-bit) and the fearful Calldata.

<br>

---

### in this repo

<br>

* [my favorite opcodes](evm_and_opcodes/my_favorite_opcodes.md)

<br>

---

### resources

<br>

* [opcodes for the evm](https://ethereum.org/en/developers/docs/evm/opcodes/)
* [opcodes and instruction reference](https://github.com/crytic/evm-opcodes)
* [EVM Contract Construction](https://blog.smlxl.io/evm-contract-construction-93c98cc4ca96)
* [ethersplay](https://github.com/crytic/ethersplay)
* [IDA EVM](https://github.com/crytic/ida-evm)
* [Ethereum book](https://github.com/ethereumbook/ethereumbook)
* [Ethereum's Whitepaper](https://ethereum.org/en/whitepaper/)
* [Understanding rollups](https://barnabe.substack.com/p/understanding-rollup-economics-from?s=r)
