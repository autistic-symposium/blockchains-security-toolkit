## proxies

### tl; dr 

<br>

* here exists a special variant of a message call, named delegatecall which is identical to a message call apart from the fact that the code at the target address is executed in the context (i.e. at the address) of the calling contract and msg.sender and msg.value do not change their values. This means that a contract can dynamically load code from a different address at runtime. Storage, current address and balance still refer to the calling contract, only the code is taken from the called address.

<br>

---

### proxy patterns

<br>

- the proxy pattern uses data separation to keep business logic and data in separate contracts. 
- however, in a proxy pattern, the storage contract (called a proxy) calls the logic contract during code execution. 
- this is what happens in a proxy pattern:
    - users interact with the proxy contract, which stores data, but doesn't hold the business logic.
    - the proxy contract stores the address of the logic contract and delegates all function calls to the logic contract (which holds the business logic) using the delegatecall function.
    - after the call is forwarded to the logic contract, the returned data from the logic contract is retrieved and returned to the user.
    - using the proxy patterns requires an understanding of the delegatecall function. Basically, delegatecall is an opcode that allows a contract to call another contract, while the actual code execution happens in the context of the calling contract. An implication of using delegatecall in proxy patterns is that the proxy contract reads and writes to its storage and executes logic stored at the logic contract as if calling an internal function.


<br>

#### transparent proxy pattern (TPP)

1. upgrade logic is stored in proxy itself.
2. gas-inefficient

<br>

#### universal upgradable proxy standard (UUPS)

1. upgrade logic is stored in logic itself
2. gas-efficient


<br>

#### diamond pattern


* diamond patterns differ from proxy patterns because the diamond proxy contract can delegates function calls to more than one logic contract.
* when a user makes a function call, the proxy contract checks the mapping to find the facet responsible for executing that function. Then it invokes delegatecall (using the fallback function) and redirects the call to the appropriate logic contract.

<br>

---

### unitialized proxy bug



* Developers might leave proxies unitialized - this can be a problem when it leads to changes such as granting ownership to the caller
* the owners of the contract can upgrade the implementation contract
* this bug can lead to the self-destruction of the implementation contract (proxy contract is bricked)

<br>

---

### resources



* [proxy patterns](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0)
* [how diamond upgrades work](https://dev.to/mudgen/how-diamond-upgrades-work-417j)
* [the state of smart contract updates](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/)
* [multiple ways to update a contract](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/)
* [Web3 Tutorial: write upgradeable smart contract (proxy) using OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916)

