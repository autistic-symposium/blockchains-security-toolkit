## reentrancy attacks


### tl; dr

* when a contract calls an external function, that external function may itself call the calling function.
* a reentrancy attack may occur when a function makes an external call to another untrusted contract. Then, the unstrusted contract makes a recursive callback to the vulnerable contract function to steal funds.
* to prevent this attack, a contract can implement a lock in storage that prevents re-entrant calls.


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


### resources

* [reentrancy on solidity docs](https://docs.soliditylang.org/en/latest/security-considerations.html#re-entrancy)
* [reentrancy on DASP](https://www.dasp.co/#item-1)
* [reentrancy on SWC](https://swcregistry.io/docs/SWC-107)
* [reentrancy patterns](https://github.com/uni-due-syssec/eth-reentrancy-attack-patterns)
* [list of reentrancy attacks by pcaversaccio](https://github.com/pcaversaccio/reentrancy-attacks)
* [reentrancy on not so smart contract](https://github.com/crytic/not-so-smart-contracts/tree/master/reentrancy)

