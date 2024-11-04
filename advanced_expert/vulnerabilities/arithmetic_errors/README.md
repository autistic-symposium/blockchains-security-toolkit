## arithmetic errors

<br>

* defaults:
    * solidity < 0.8: integers in overflow / underflow without any errors.
    * solidity >= 0.8: default behaviour of for overflow / underflow is to throw an error.
* use **[SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol)** to prevent arithmetic overflow and underflow.

<br>

---

### chapters

<br>

* **[overflow](overflow)**
  
