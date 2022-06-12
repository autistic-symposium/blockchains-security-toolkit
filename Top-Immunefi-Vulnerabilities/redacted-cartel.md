## Redacted Cartel Custom Approval Logic Bugfix Review

<br>

* [Immunefi blog post](https://medium.com/immunefi/redacted-cartel-custom-approval-logic-bugfix-review-9b2d039ca2c5)

<br>

* The vulnerability was rated as critical because it would have allowed a malicious attacker to assign a user’s allowance to themselves, enabling the attacker to steal that user’s funds. 

* The purpose of ERC-20’s `approve(spender, amount)` function is to allow any address to spend the tokens on behalf of the tokens’ owner.

* The vulnerability here consisted of a faulty implementation of standard ERC-20 functions in REDACTED’s wxBTRFLY token, which is a wrapped version of the xBTRFLY.


### Vulnerability

The vulnerability can be seen at the `_approve()` call in the [contract](https://github.com/redacted-cartel/REDACTED-Smart-Contracts/blob/main/contracts/WXBTRFLY.sol#L826):

```
  function transferFrom(address sender, address recipient, uint256 amount) public virtual override onlyAuthorisedOperators returns (bool) {
    _transfer(sender, recipient, amount);
    _approve(sender, msg.sender, allowance(sender, recipient ).sub(amount, "ERC20: transfer amount exceeds allowance"));
    return true;
  }
```

where `allowance(sender, recipient)` should be `allowance(sender, msg.sender)`.


<br>

#### Here is a clarification


|     entity        |    address name     |   description  |
| ----------------- | ------------------- | -------------- |
| sender            | `sender`            | *from*; who holds the tokens before the transaction |
| recipient         | `recipient`         | *to*, who will receive the tokens after the transaction |
| spender           | `msg.sender`        | who is calling `transferFrom()`; the operator; who needs allowance approval |




