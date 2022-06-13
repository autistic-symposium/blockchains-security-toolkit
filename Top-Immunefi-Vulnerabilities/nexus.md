## Yearn.finance / Nexus Mutual Bug Bounty

<br>

* [Immunefi blog post](https://github.com/bt3gl-labs/Blockchain-Hacking-Toolkit/edit/main/Top-Immunefi-Vulnerabilities/nexus.md)

<br>

* The vulnerability consisted of an issue with the Single Sided Balancer (SSB) vaults–specifically in the way the vault decided the number of BAL tokens to sell (LP tokens for Balancer). 

* Before selling the yvUSDT, the attacker could take a flashloan of DAI or USDC to imbalance the pool.

* The attacker could then flash-borrow yvUSDT (this was the only vulnerable vault, due to the amount of liquidity on BentoBox) and withdraw everything. 

The step-by-step guide to exploiting the now-patched bug is as follows:

```
1. Flash borrow yvUSDT and DAI from BentoBox
2. Buy USDT with DAI at Balancer to imbalance the pool
3. Withdraw from yvUSDT. Withdrawal will sell more Balancer LP tokens due to imbalanced pool
4. Buy DAI back with USDT to get a profit. (Pool is slightly more balanced because of previous step)
5. Deposit back to yvUSDT
6. Repay flashloan
```
