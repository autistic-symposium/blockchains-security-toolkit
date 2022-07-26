# 👾 Becoming a Solidity Expert

<br>

*All right, so you are a developer and you feel pretty good about your skills, but now you want to be a Solidity expert.
I hear you, I was there once.
It might take a few months for you to get out of the inertia and actually become good. Or you might just be more like an "enthusiast" and do a thing
here or there. It's all good, here are a few basics about the language, so you don't want to sound dumb when talking to new frens at that ethereum after party.*

<br>

**here.**

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

**Address types**. The address type comes in two types:

1. holds a 20 byte value (the size of an Ethereum address)
2. address payable: with additional members transfer and send. address payable is an address you can send Ether to (while plain address not).

Explicit conversion from address to address payable can be done with payable().
Explicit conversion from or to address is allowed for uint160, integer literals, byte20, and contract types

The members of address type are pretty interesting: .balance, .code, .codehash, .transfer, .send, .call, .delegatecall, .staticcall.

<br>

**Fixed-size Byte Arrays**. bytes1, bytes2, bytes3, …, bytes32 hold a sequence of bytes from one to up to 32. The type byte[] is an array of bytes, but due to padding rules, it wastes 31 bytes of space for each element, so it's better to use bytes()



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

**Events**. An abstraction on top of EVM's logging: emitting events cause the arguments to be stored in the transaction's log (which are associated with the address of the contract). Applications can subscribe and listen to events through the RPC interface of an Ethereum client.

Events are emitted using **emit**.

<br>

**State variables**. Variables that can be accessed by all functions of the contract and values are permanently stored in the contract storage.

**State visibility specifiers.** This is important. These are state variables that define how the methods will be accessed:
- public: part of the contract interface and can be accessed internally or via messages.
- internal: can only be accessed internally from within the current contracts (or contracts deriving from it).
- private: can only be accessed from the contract they are defined in and not in derived contracts.

**Immutability**. State variables can be declared as constant or immutable, so they cannot be modified after the contract has been constructed. Their difference is beautiful:
**for constant variables, the value is fixed at compile-time; for immutable variables, the value can still be assigned at construction time (in the constructor or point of declation)**

There is an entire gas cost thing too. For constant variables, the expression assigned is copied to all the places, and re-evaluated each time (local optimizations are possible). For immutable variables, the expression is evaluated once at constriction time and their value is copied to all the places in the code they are accessed, on a reserved 32 bytes, becoming usually more expensive than constant.

<br>

**Functions modifiers**. Used to change the behavior of functions in a declarative way, so that the function's control flow continues after the "_" in the preceding modifier. This symbol can appear in the modifier multiple times. 

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

**Data structures**.

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

**Call/Delegatecall/Staticall**. Used to interface with contracts that do not adhere to ABI, or to give more direct control over encoding. They all take a single bytes memory parameter and return the success condition (as a bool) and the return data (byte memory).

With delegatecall, only the code of the given address is used but all other aspects are taken from the current contract. The purpose is to use logic code that is stored in the callee contract but operates on the state of the caller contract.

With staticall, the execution will revert if the called function modifies the state in any way.






