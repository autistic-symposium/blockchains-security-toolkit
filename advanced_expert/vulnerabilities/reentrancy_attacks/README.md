## reentrancy attacks
<br>


### tl; dr

* when a contract calls an external function, that external function may itself call the calling function.
* a reentrancy attack may occur when:
  - a function makes an external call to a untrusted contract
  - the unstrusted contract makes a recursive callback to a vulnerable contract function to steal funds
* to prevent this attack, a contract can implement a lock in storage that prevents re-entrant calls.
* bt3gl's diagram:
<p align="center">
<img src="https://github.com/go-outside-labs/blockchain-auditing/assets/138340846/8f6f4c12-2990-420d-95d6-f3d5379bc72c" width="55%" align="center" style="padding:1px;border:1px solid black;"/>
 </p>

<br>

---

### example

<br>

for example, suppose this method:

```
function withdrawBalance() public {
      uint amountToWithdraw = userBalances[msg.sender];
      (bool success, ) = msg.sender.call.value(amountToWithdraw)("");
      requires(success);
      userBalances[msg.sender] = 0;
}
```

and this exploit:

```
function() public payable {
      if(msg.sender == address(vulnContract)) {
        vulnContract.withdrawBalance();
      }
}
```

<br>

how to fix? 

<br>

#### option 1: Adding a mutex locking:

```
modifier noReentrant() {
  require(!locked, "nooooope");
  locked = true;
  _;
  locked = false;
}
```

so

```
function withdrawBalance() public noReentrant {
    ...
}
```

<br>

#### option 2: CEI (checks effects interaction) pattern

<br>

<p align="center">
<img src="https://github.com/go-outside-labs/blockchain-auditing/assets/138340846/8a57158e-82d8-4be2-bdf1-22faaaab97f7" width="55%" align="center" style="padding:1px;border:1px solid black;"/>
 </p>

 <br>

```
function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    userBalances[msg.sender] = 0; // update state first
    (bool success, ) = msg.sender.call.value(amountToWithdraw)("");
    requires(success);
}
```

<br>

----

### cool resources

<br>

* **[reentrancy on solidity docs](https://docs.soliditylang.org/en/latest/security-considerations.html#re-entrancy)**
* **[reentrancy on DASP](https://www.dasp.co/#item-1)**
* **[reentrancy on SWC](https://swcregistry.io/docs/SWC-107)**
* **[reentrancy patterns](https://github.com/uni-due-syssec/eth-reentrancy-attack-patterns)**
* **[list of reentrancy attacks by pcaversaccio](https://github.com/pcaversaccio/reentrancy-attacks)**
* **[reentrancy on not so smart contract](https://github.com/crytic/not-so-smart-contracts/tree/master/reentrancy)**

