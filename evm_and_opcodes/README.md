## 🍱 the evm

<br>

### tl;dr

* EVM is a quasi-Turing complete machine (quasi because computation is intrinsically bounded/limited through a parameter: gas) 
* EVM is the runtime environment for smart contracts.
* "Ethereum virtual machine code" or "EVM code" are cute lil code are written in a low-level, stack-based bytecode language, each byte represents an operation.
* EVM memory is a simple stack-based architecture with: stack, volatile memory, non-volatile storage (word size of 256-bit) and the fearful Calldata.

<br>

---

### in this repo

<br>

* [my favorite opcodes](https://github.com/bt3gl-labs/1337_blockchain_hacker_toolkit/tree/main/evm_and_opcodes)

<br>

---

### resources

<br>

* [opcodes for the evm](https://ethereum.org/en/developers/docs/evm/opcodes/)
* [opcodes and instruction reference](https://github.com/crytic/evm-opcodes)


<br>

##### disassemblers

<br>

* [ethersplay](https://github.com/crytic/ethersplay)
* [IDA EVM](https://github.com/crytic/ida-evm)
