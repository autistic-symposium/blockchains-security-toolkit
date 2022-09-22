# 👾 Becoming a Solidity Expert


<br>

## Predefined global variables and functions

<br>

* When a contract is executed in the EVM, it has access to a small set of global objects: block, msg, and tx objects. 
* In addition, Solidity exposes a number of EVM opcodes as predefined functions.


<br>

### msg

* msg object: the transaction that triggered the execution of the contract.
* msg.sender: sender address of the transaction.
* msg.value: ether sent with this call (in wei).
* msg.data: data payload of this call into our contract.
* msg.sig: first four bytes of the data payload, which is the function selector.

<br>

## tx

* tx.gasprice: gas price in the calling transaction.
* tx.origin: address of the originating EOA for this transaction. WARNING: unsafe!

<br>

### block

* block.coinbase: address of the recipient of the current block's fees and block reward.
* block.gaslimit: maximum amount of gas that can be spent across all transactions included in the current block.
* block.number: current block number (blockchain height).
* block.timestamp: timestamp placed in the current block by the miner (number of seconds since the Unix epoch).

<br>

### address

* address.balance: balance of the address, in wei. 
* address.transfer(__amount__): Transfers the amount (in wei) to this address, throwing an exception on any error.
* address.send(__amount__): similar to transfer, only instead of throwing an exception, it returns false on error. WARNING: always check the return value of send.
* address.call(__payload__): low-level CALL function—can construct an arbitrary message call with a data payload. Returns false on error. WARNING: unsafe.
* address.delegatecall(__payload__): low-level DELEGATECALL function, like callcode(...) but with the full msg context seen by the current contract. Returns false on error. WARNING: advanced use only!


<br>

### built-in functions

* addmod, mulmod: for modulo addition and multiplication. For example, addmod(x,y,k) calculates (x + y) % k.
* keccak256, sha256, sha3, ripemd160: calculate hashes with various standard hash algorithms.
* ecrecover: recovers the address used to sign a message from the signature.
* selfdestruct(__recipient_address__): deletes the current contract, sending any remaining ether in the account to the recipient address.
* this: address of the currently executing contract account.



<br>

---

## TL;DR Solidity x Python/C++


<br>

From Python, we get: 
- modifiers
- multiple inheritances

From JavaScript we get:
- function-level scoping
- the `var` keyword

From C/C++ we get:

- scoping: variables are visible from the point right after their declaration until the end of the smallest {}-block that contains the declaration.
- the good ol' value types (passed by value, so they are alway copied to the stack) and reference types (references to the same underlying variable).
- however, look how cool: a variable that is declared will have an initial default value whose byte-representation is all zeros.
- int and uint integers, with uint8 to uint256 in step of 8.

From being statically-typed:
- the type of each variable (local and state) needs to be specified at compile-time (as opposed to runtime).

<br>


You start files with the SPDX License Identifier (`// SPDX-License-Identifier: MIT`). SPDX stands for software package data exchange. The compiler will include this in the bytecode metadata and make it machine readable.

<br>

**Pragmas.** Big thing. Directives that are used to enable certain compiler features and checks. 

Version Pragma indicates the specific Solidity compiler version. It does not change the version of the compiler, though, so yeah, you will get an error if it does not match the compiler.

Other types are Compiler version, ABI coder version, SMTCheker.

<br>

The best-practices for layout in a contract are:
1. state variables
2. events
3. modifiers
4. constructors
5. functions

<br>


**NatSpec comments**. Also known as the "ethereum natural language specification format". Written as triple slashes (`///`) or double asterisk block
`(/**...*/)`, directly above function declarations or statements to generate documentation in `JSON` format for developers and end-users. These are some tags:
* @title: describe the contract/interface
* @author
* @notice: explain to an end user what it does
* @dev: explain to a dev 
* @param: document params
* @return: any returned variable
* @inheritdoc: copies missing tags from the base function (must be followed by contract name)
* @custon: anything application-defined



<br>

**Events**. An abstraction on top of EVM's logging: emitting events cause the arguments to be stored in the transaction's log (which are associated with the address of the contract). Events are emitted using **emit**.

Events are especially useful for light clients and DApp services, which can "watch" for specific events and report them to the user interface, or make a change in the state of the application to reflect an event in an underlying contract.

<br>


---

## Variables

<br>

**Address types**. The address type comes in two types:

1. holds a 20 byte value (the size of an Ethereum address)
2. address payable: with additional members transfer and send. address payable is an address you can send Ether to (while plain address not).

Explicit conversion from address to address payable can be done with payable().
Explicit conversion from or to address is allowed for uint160, integer literals, byte20, and contract types

The members of address type are pretty interesting: .balance, .code, .codehash, .transfer, .send, .call, .delegatecall, .staticcall.

<br>

**Fixed-size Byte Arrays**. bytes1, bytes2, bytes3, …, bytes32 hold a sequence of bytes from one to up to 32. The type byte[] is an array of bytes, but due to padding rules, it wastes 31 bytes of space for each element, so it's better to use bytes()


<br>

**State variables**. Variables that can be accessed by all functions of the contract and values are permanently stored in the contract storage.

**State visibility specifiers.** This is important. These are state variables that define how the methods will be accessed:
- public: part of the contract interface and can be accessed internally or via messages.
- external: like public functions, but cannot be called within the contract.
- internal: can only be accessed internally from within the current contracts (or contracts deriving from it).
- private: can only be accessed from the contract they are defined in and not in derived contracts.
- pure: neither reads nor writes any variables in storage. It can only operate on arguments and return data, without reference to any stored data. Pure functions are intended to encourage declarative-style programming without side effects or state.
- payable: can accept incoming payments. Functions not declared as payable will reject incoming payments. There are two exceptions, due to design decisions in the EVM: coinbase payments and `SELFDESTRUCT` inheritance will be paid even if the fallback function is not declared as payable.



**Immutability**. State variables can be declared as constant or immutable, so they cannot be modified after the contract has been constructed. Their difference is beautiful:
**for constant variables, the value is fixed at compile-time; for immutable variables, the value can still be assigned at construction time (in the constructor or point of declation)**

There is an entire gas cost thing too. For constant variables, the expression assigned is copied to all the places, and re-evaluated each time (local optimizations are possible). For immutable variables, the expression is evaluated once at constriction time and their value is copied to all the places in the code they are accessed, on a reserved 32 bytes, becoming usually more expensive than constant.

<br>

---

## Functions

<br>

**Functions modifiers**. Used to change the behavior of functions in a declarative way, so that the function's control flow continues after the "_" in the preceding modifier. This symbol can appear in the modifier multiple times. 

The underscore followed by a semicolon is a placeholder that is replaced by the code of the function that is being modified. Essentially, the modifier is "wrapped around" the modified function, placing its code in the location identified by the underscore character.

To apply a modifier, you add its name to the function declaration. More than one modifier can be applied to a function; they are applied in the sequence they are declared, as a space-separated list.

```
function destroy() public onlyOwner {
```

<br>

**Function Visibility Specifiers**. Super uber important. These are how visibility works for functions:

- public: part of the contract interface and can be either called internally or via messages. 
- external: part of the contract interface, and can be called from other contracts and via transactions. Here is the interesting part: an external function `func` cannot be called internally, so `func()` would not work. But `this.func()` does.
- internal: can only be accessed from within the current contract or contracts deriving from it.
- private: can only be accessed from the contract they are defined in and not even in derived contracts

<br>

**Function Mutability Specifiers**:

- view functions can read the contract state but not modify it: enforced at runtime via STATICALL opcode.
- pure functions can neither read a contract nor modify it.
- only view can be enforced at the EVM level, not pure.

<br>

**Overloading**. Okay, this one is hardcore: a contract can have multiple functions of the same name but with different parameter types! They are matched by the arguments supplied in the function call 😬.


<br>

---

## Data structures

<br>

- structs: custom-defined types that can group several variables of same/different types together to create a custom data structure.
- enums: used to create custom types with a finite set of constants values. Cannot have more than 256 members.

<br>

**Constructors**. When a contract is created, the function with *constructor* is executed once and then the final code of the contract is stored on the blockchain (all public and external functions, but not the constructor code or internal functions called by it).

<br>

**Receive function**. So this is interesting. A contract can have ONE *receive* function (*receive() external payable {...}*) without the function keyword, and no arguments and no return and... have `external` and `payable`. This is the function on plain Ether transfers via send() or transfer().

Interesting facts:
- Receive is executed on a call to the contract with empty calldata.
- Receive might only rely on 2300 gas being available.
- A contract without Receive can actually receive Ether as a recipient of a coinbase transaction (miner block reward) or as a destination of `selfdestruct`.
- A contract cannot react to the Ether transfer above.

<br>

**Falback function**. Kinda in the same idea, a contract can have ONE *fallback* function, which must have external visibility.

- fallback is executed on a call to the contract if none of the other functions match the given function signature or no data was supplied and there is not receive Ether function.


<br>

**Transfer.** The transfer function fails if the balance of the contract is not enough or if the transfer is rejected by the receiving account, revering on failure.

<br>

**Send.** Low-level counterpart of transfer, however, if the execution fails then send only returns false (return value must be checked by the caller).

<br>

----

## Calling another contract

<br>

**Call/Delegatecall/Staticall**. Used to interface with contracts that do not adhere to ABI, or to give more direct control over encoding. They all take a single bytes memory parameter and return the success condition (as a bool) and the return data (byte memory).

With delegatecall, only the code of the given address is used but all other aspects are taken from the current contract. The purpose is to use logic code that is stored in the callee contract but operates on the state of the caller contract.

With staticall, the execution will revert if the called function modifies the state in any way.

<br>

### Creating a new instance

* The safest way to call another contract is if you create that other contract yourself. 
* To do this, you can simply instantiate it, using the keyword `new`, as in other object-oriented languages. This keyword will create the contract on the blockchain and return an object that you can use to reference it. 

```
contract Token is Mortal {
	Faucet _faucet;

    constructor() {
        _faucet = new Faucet();
    }
}
```

<br>


### Addressing an existing instance

* Another way you can call a contract is by casting the address of an existing instance of the contract. 
* With this method, you apply a known interface to an existing instance.
* This is much riskier than the previous mechanism, because we don’t know for sure whether that address actually is a Faucet object.

```
import "Faucet.sol";

contract Token is Mortal {

    Faucet _faucet;

    constructor(address _f) {
        _faucet = Faucet(_f);
        _faucet.withdraw(0.1 ether);
    }
}

```

<br>


### Raw call, delegatecall

* Solidity offers some even more "low-level" functions for calling other contracts. 
* These correspond directly to EVM opcodes of the same name and allow us to construct a contract-to-contract call manually. 
* As such, they represent the most flexible and the most dangerous mechanisms for calling other contracts.
* It can expose your contract to a number of security risks, most importantly reentrancy.

```
contract Token is Mortal {
	constructor(address _faucet) {
		_faucet.call("withdraw", 0.1 ether);
	}
}
```

* Another variant of call is delegatecall, which replaced the more dangerous callcode. A delegatecall is different from a call in that the msg context does not change.
* Essentially, delegatecall runs the code of another contract inside the context of the execution of the current contract.



<br>

----

## Data

<br>

**Data Location.** Every reference type has an additional annotation with the data location where it is stored:

* memory: lifetime is limited to an external function call
* storage: limited to the lifetime of a contract and the location where the state variables are stored
* calldata: non-modifiable, non-persistent area where function arguments are stored and behaves mostly like memory

<br>

**Block and Transaction Properties.** Cute shit.

- blockhash
- block.chainid
- block.coinbase
- block.difficulty 
- block.gaslimit 
- block.number
- block.timestamp 
- msg.data 
- msg.sender 
- msg.sig 
- msg.value 
- tx.gasprice 
- gasleft
- tx.origin

<br>

**Randomness**. Not cute shit: you cannot rely on block.timestamp or blockhash as a source of randomness, as they can be influenced by miners to some degree.

<br>

---

## ABI Encoding and Decoding Functions

<br>

- abi.decode
- abi.encode
- abi.encodePacked
- abi.encodeWithSelector
- abi.encodeWithSignature

<br>

----

## Error Handling

<br>

- assert(): causes a panic error and revert if the condition is not met
- require(): reverts if the condition is not met
- revert(): abort execution and revert state changes

