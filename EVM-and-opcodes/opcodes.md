## Opcodes

<br>

EVM instruction set can be classified into 11 categories:

* Stop and Arithmetic Operations
* Comparison & Bitwise Logic Operations
* SHA3
* Environmental Information
* Block Information
* Stack, Memory, Storage and Flow Operations
* Push Operations
* Duplication Operations
* Exchange Operations
* Logging Operations
* System Operations



<br>

---

### Stop and Arithmetic Operation

0x00 STOP 0 0 Halts execution

0x01 ADD 2 1 Addition operation

0x02 MUL 2 1 Multiplication operation

0x03 SUB 2 1 Subtraction operation

0x04 DIV 2 1 Integer division operation

0x05 SDIV 2 1 Signed integer division operation (truncated)

0x06 MOD 2 1 Modulo remainder operation

0x07 SMOD 2 1 Signed modulo remainder operation

0x08 ADDMOD 3 1 Modulo addition operation

0x09 MULMOD 3 1 Modulo multiplication operation

0x0a EXP 2 1 Exponential operation

0x0b SIGNEXTEND 2 1 Extend length of two’s complement signed integer


<br>

---

## Comparison & Bitwise Logic Operations

0x10 LT 2 1 Less-than comparison

0x11 GT 2 1 Greater-than comparison

0x12 SLT 2 1 Signed less-than comparison

0x13 SGT 2 1 Signed greater-than comparison

0x14 EQ 2 1 Equality comparison

0x15 ISZERO 1 1 Simple not operator

0x16 AND 2 1 Bitwise AND operation

0x17 OR 2 1 Bitwise OR operation

0x18 XOR 2 1 Bitwise XOR operation

0x19 NOT 1 1 Bitwise NOT operation

0x1a BYTE 2 1 Retrieve single byte from word

0x1b SHL 2 1 Left shift operation

0x1c SHR 2 1 Logical right shift operation

0x1d SAR 2 1 Arithmetic (signed) right shift operation

<br>

---

### Environmental Information 

0x30 ADDRESS 0 1 Get address of currently executing account

0x31 BALANCE 1 1 Get balance of the given account

0x32 ORIGIN 0 1 Get execution origination address

0x33 CALLER 0 1 Get caller address

0x34 CALLVALUE 0 1 Get deposited value by the instruction/transaction responsible for this execution

0x35 CALLDATALOAD 1 1 Get input data of current environment

0x36 CALLDATASIZE 0 1 Get size of input data in current environment

0x37 CALLDATACOPY 3 0 Copy input data in current environment to memory

0x38 CODESIZE 0 1 Get size of code running in current environment

0x39 CODECOPY 3 0 Copy code running in current environment to memory

0x3a GASPRICE 0 1 Get price of gas in current environment

0x3b EXTCODESIZE 1 1 Get size of an account’s code

0x3c EXTCODECOPY 4 0 Copy an account’s code to memory

0x3d RETURNDATASIZE 0 1 Get size of output data from the previous call from the current environment

0x3e RETURNDATACOPY 3 0 Copy output data from the previous call to memory

0x3f EXTCODEHASH 1 1 Get hash of an account’s code

<br>

---


### Block Information 

0x40 BLOCKHASH 1 1 Get the hash of one of the 256 most recent complete blocks

0x41 COINBASE 0 1 Get the block’s beneficiary address

0x42 TIMESTAMP 0 1 Get the block’s timestamp

0x43 NUMBER 0 1 Get the block’s number

0x44 DIFFICULTY 0 1 Get the block’s difficulty

0x45 GASLIMIT 0 1 Get the block’s gas limit

<br>

---

### Stack, Memory, Storage and Flow Operations 

0x50 POP 1 0 Remove item from stack

0x51 MLOAD 1 1 Load word from memory

0x52 MSTORE 2 0 Save word to memory

0x53 MSTORE8 2 0 Save byte to memory

0x54 SLOAD 1 1 Load word from storage

0x55 SSTORE 2 0 Save word to storage

0x56 JUMP 1 0 Alter the program counter

0x57 JUMPI 2 0 Conditionally alter the program counter

0x58 PC 0 1 Get the value of the program counter prior to the increment corresponding to this instruction

0x59 MSIZE 0 1 Get the size of active memory in bytes

0x5a GAS 0 1 Get the amount of available gas, including the corresponding reduction for the cost of this instruction

0x5b JUMPDEST 0 0 Mark a valid destination for jumps. This operation has no effect on machine state during execution.

<br>

---

### Push Operations 

0x60 PUSH1 0 1 Place 1 byte item on stack

0x61 PUSH2 0 1 Place 2-byte item on stack

PUSH3, PUSH4, PUSH5…PUSH31 place 3, 4, 5..31 byte items on stack respectively

0x7f PUSH32 0 1 Place 32-byte (full word) item on stack

<br>

---

### Duplication Operations 

0x80 DUP1 1 2 Duplicate 1st stack item

DUP2, DUP3..DUP15 duplicate 2nd, 3rd..15th stack item respectively

0x8f DUP16 16 17 Duplicate 16th stack item

<br>

---

### Exchange Operations

0x90 SWAP1 2 2 Exchange 1st and 2nd stack items

0x91 SWAP2 3 3 Exchange 1st and 3rd stack items

SWAP3, SWAP4..SWAP15 exchange 1st and 4th..15th stack items respectively

0x9f SWAP16 17 17 Exchange 1st and 17th stack items


<br>

---

### Logging Operations

0xa0 LOG0 2 0 Append log record with no topics

0xa1 LOG1 3 0 Append log record with one topic

0xa2 LOG2 4 0 Append log record with two topics

0xa3 LOG3 5 0 Append log record with three topics

0xa4 LOG4 6 0 Append log record with four topics

<br>

---

### System Operations 

0xf0 CREATE 3 1 Create a new account with associated code

0xf1 CALL 7 1 Message-call into an account

0xf2 CALLCODE 7 1 Message-call into this account with an alternative account’s code

0xf3 RETURN 2 0 Halt execution returning output dat

0xf4  DELEGATECALL 6 1 Message-call into this account with an alternative account’s code, but persisting the current values for sender and value

0xf5 CREATE2 4 1 Create a new account with associated code

0xfa STATICCALL 6 1 Static message-call into an account

0xfd REVERT 2 0 Halt execution reverting state changes but returning data and remaining gas

0xfe INVALID ∅ ∅ Designated invalid instruction

0xff SELFDESTRUCT 1 0 Halt execution and register account for later deletion

