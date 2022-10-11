## Polygon Lack of Balance

<br>

* [Immunefi blog post](https://medium.com/immunefi/polygon-lack-of-balance-check-bugfix-postmortem-2-2m-bounty-64ec66c24c7d)


<br>

* This vulnerability consisted of a lack of balance/allowance check in the transfer function of Polygon's MRC20 contract and would have allowed an attacker to steal all MATIC.

<br>

### Vulnerability Analysis

* The MATIC token is like Ether, but for the Polygon network. The MATIC token is used in the Polygon ecosystem for several functions, including voting on PIPs, staking, and gas costs.
* The most interesting thing about MATIC token is its standard. It's the native gas-paying asset of the Polygon network, but it's also a contract deployed on Polygon. The contract is MRC20 contract. This standard is used mainly for the possibility of transferring MATIC gaslessly, which with Ether, is impossible. With Ether, you are making a transaction that a wallet needs to sign.
* Gasless MATIC transfers are facilitated by the `transferWithSig()` function. The user who owns the tokens signs a bundle of parameters, including the operator, amount, nonce, and expiration. This signature can be later passed to the MRC20 contract by the operator to perform a transfer on behalf of the token owner. This is gasless for the token owner because the operator pays for the gas.
* Smart contracts on Ethereum have access to the built-in ECDSA signature verification algorithm through `erecover`. This built-in function lets you verify the integrity of the signature over the hashed data and returns the signer's public key.
* `ecrecovery` is a wrapper function on top of the standard `erecover`, that lets you pass a packed signature without the need to separate V, R, and S.
* The bug in the token could have allowed an attacker to mint an arbitrary number of tokens from the MRC20 contract.
* The main issue is that `_transferFrom` will call the `_transfer` function directly without checking whether the `from` has enough balance. And we can call `transferWithSig()` without a valid signature, thanks to the lack of check to see if `erecovery` returns the zero address. The function takes the balances of `from` and `to` address and passes that to the `_transfer()`, which has the same issue (it doesn't check that the sender has enough balance).


<br>


### PoC

1. Create a byte string of length anything other than 65: `erecovery` returns the zero address if the packed signature does not have length 65. This means we don't need a valid signature to proceed.
2. `amount` passed to the function can be any amount, but we can use the full balance of the MRC20 contract.
3. `to` address will be an attacker address.
4. After `from` is recovered from the invalid signature, `_transferFrom()` is called.
5. As the balances are not checked from `from` and `to`, contracts makes a `_transfer()` call.
6. `_transfer()` only checks if the recipient isn't the MRC20 contract itself and transfers all the amount to the attacker from the MRC20 contract.

<br>

### Fix

* Remove `transferWithSig` function.


