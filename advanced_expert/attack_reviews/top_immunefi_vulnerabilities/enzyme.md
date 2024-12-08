## Enzyme Finance Price Oracle Manipulation

<br>

* [Immunefi blog post](https://medium.com/immunefi/enzyme-finance-price-oracle-manipulation-bug-fix-postmortem-4e1f3d4201b5)

<br>

* Using a flashloan from `IdleTokenGovernance.sol` affected the `totalSupply` of the Idle tokens, which was used to calculate the price of the token.
* Price calculations were based on the `totalNav / totalSupply` of the tokens.
* It's worth noting the initial Idle Token integration was with v4, which did not have any flashloan logic. That was later added in v5, thus unintentionally introducing a bug into Enzyme's Finance protocol.

<br>

### Oracles and Flashloans

* A price oracle is a tool used to view the price information of a given asset. In the DeFi world, this means that whenever we want to know the price of a token, we use oracles.
* There are two types of oracles: Onchain and Offchain:
  * Onchain oracles are smart contracts.
  * Offchain oracles like Chainlink depend on the data being put into the smart contracts by a decentralized network. E.g. query Chainlink aggregator smart contract and get the latest price reported by the Chainlink nodes.
* Flashloans are a way to borrow a large amount of money from a lending protocol like Aave without collateralization, only for a certain fee paid at the end. The caveat is that it needs to be returned within one transaction.
* Flashloans use smart contracts. The main enforced rule is the borrower must pay back the loan before the transaction ends (otherwise, the contract reverses the transaction).
* The transaction to the flashloan contract can be divided into three parts (all in one transaction):
  1. Receive the loan.
  2. Perform actions with the loan.
  3. Repay the loan.

<br>

#### Use cases

* Primary use case is for arbitrage. You can't purchase anything long-term with a flashloan, but you can make a profit with flashloan with an arbitrage opportunity.
* With substantial WETH/ETH available to us via flashloan, we can exchange them for any other asset we want through an AMM.
* If a token we're interested in only has a pool against DAI, we can swap flashloaned ETH for DAI and use some of the DAI we got for purchasing the token we are interested in, manipulating the price.

<br>

### Vulnerability analysis

* Enzyme Finance is an Ethereum-based protocol for decentralized on-chain asset management. It allows users and investors to create and invest funds.
* A fund owner configures the rules of their fund: fees and policies, the denomination asset by which share price and performance are measured, the time-lock between shares actions for a given user, etc.
* when we want to invest in a fund, we need to send the underlying asset of the fund to the vault. In return, users get shares that represent their part in the fund.
* Users can call `buyShares()` function on the `ComptrollerLib.sol`. We need to provide the amount of underlying assets of the fund with which we will be purchasing the share and the minimal amount of shares.
* How much we will need to pay for a share is calculated by the public function `calcGav()`. This function simply calculates the gross asset value (GAV) of the fund. This function consults `VaultInterpreter.sol` and `IDerivativePriceFeed.sol` for the canonical asset total value in a fund. The price feed we're interested in is `IdlePriceFeed.sol` for Idle Tokens.
* `IdlePriceFeed` gets the unit price of an Idle Token by calling `tokenPrice` function of the token. Return value of this function is something an attacker needs to manipulate to get better prices for a share when buying and selling for a profit.
* Looking at the `totNav` calculations, it seems like we could potentially manipulate one value here. The current balance of the Idle Token contract's backing assets, by using contract's internal flashloan functionality which would temporarily emptied the contract by flash loaning the max amount from the IdleToken.

<br>

### PoC

1. Fund malicious contract with WETH to be able to swap it later for USDC to pay for a flashloan.
2. Make a flashloan of IdleUSDCYield tokens. This will in fact, affect GAV calculations.
3. During a flashloan, call `buyShares`. As GAV calculations are affected, we are buying shares at a discount now.
4. Repay flashloan.
5. Call `redeemShares` to sell all the bought shares of Idle fund for a profit.

<br>

### Fix

* Delist IDLE tokens.











