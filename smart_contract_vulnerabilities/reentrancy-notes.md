## 🥛 reeentrancy


<br>

### TL; DR

* When a contract calls an external function, that external function may itself call the calling function.
* A reentrancy attack may occur when a function makes an external call to another untrusted contract. Then, the unstrusted contract makes a recursive callback to the vulnerable contract function to steal funds.
* To prevent this attack, a contract can implement a lock in storage that prevents re-entrant calls.


<br>

---

### Example of re-entrancy attack

<br>

For example, suppose this method:

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

How to fix? 

#### Option 1: Adding a mutex locking:

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

#### Option 2: CEI (checks effects interaction) pattern

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


### Resources

<br>

* [Solidity docs](https://docs.soliditylang.org/en/latest/security-considerations.html#re-entrancy)
* [DASP](https://www.dasp.co/#item-1)
* [SWC](https://swcregistry.io/docs/SWC-107)
* [Not so smart contract](https://github.com/crytic/not-so-smart-contracts/tree/master/reentrancy)
* [reentrancy patterns](https://github.com/uni-due-syssec/eth-reentrancy-attack-patterns)
