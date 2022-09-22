## ERC20 

<br>

* The ERC20 standard defines a common interface for contracts implementing this token, such that any compatible token can be accessed and used in the same way. 

<br>

### ERC20-compliant token contract

* totalSupply
Returns the total units of this token that currently exist. ERC20 tokens can have a fixed or a variable supply.

* balanceOf
Given an address, returns the token balance of that address.

* transfer
Given an address and amount, transfers that amount of tokens to that address, from the balance of the address that executed the transfer.

* transferFrom
Given a sender, recipient, and amount, transfers tokens from one account to another. Used in combination with approve.

* approve
Given a recipient address and amount, authorizes that address to execute several transfers up to that amount, from the account that issued the approval.

* allowance
Given an owner address and a spender address, returns the remaining amount that the spender is approved to withdraw from the owner.

* Transfer
Event triggered upon a successful transfer (call to transfer or transferFrom) (even for zero-value transfers).

* Approval
Event logged upon a successful call to approve.

<br>

---

### ERC20 optional functions

In addition to the required functions listed in the previous section, the following optional functions are also defined by the standard:

* name
Returns the human-readable name (e.g., "US Dollars") of the token.

* symbol
Returns a human-readable symbol (e.g., "USD") for the token.

* decimals
Returns the number of decimals used to divide token amounts. For example, if decimals is 2, then the token amount is divided by 100 to get its user representation.

<br>

---

### The ERC20 interface defined in Solidity


```
contract ERC20 {
   function totalSupply() constant returns (uint theTotalSupply);
   function balanceOf(address _owner) constant returns (uint balance);
   function transfer(address _to, uint _value) returns (bool success);
   function transferFrom(address _from, address _to, uint _value) returns
      (bool success);
   function approve(address _spender, uint _value) returns (bool success);
   function allowance(address _owner, address _spender) constant returns
      (uint remaining);
   event Transfer(address indexed _from, address indexed _to, uint _value);
   event Approval(address indexed _owner, address indexed _spender, uint _value);
}
```

