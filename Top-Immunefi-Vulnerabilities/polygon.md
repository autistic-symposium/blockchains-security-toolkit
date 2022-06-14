## Polygon Consensus Bypass Bugfix Review

<br>

* [Imunnefi blog post](https://medium.com/immunefi/polygon-consensus-bypass-bugfix-review-7076ce5047fe)

<br>

* What would happen if someone were able to bypass checks in the consensus requirement check to gain an advantage over the underline blockchain?

* This was a vulnerability in the proof of stake (PoS) system in Polygon’s smart contract on Ethereum, which would have allowed an attacker to decrease the total staking power, allowing a consensus (⅔ threshold) bypass that could potentially have allowed an attacker to drain all funds from the deposit manager, engage in unlimited withdrawals, DoS and more.

* For the attacker to have exploited this vulnerability, specific market conditions would have had to have been met. For example, a validator spot had to have been open, and the capital requirements were high (less capital means longer the attack takes). The amount to pay the miners directly to stay in the validator spot using flashbots was also high. 

* A consensus mechanism helps prevent certain kinds of economic attacks. In theory, an attacker can compromise consensus by controlling 51% of the network. It was designed to make this “51% attack” unfeasible. A similar attack could be performed on the PoS consensus mechanism but instead of holding 51% of nodes, you need ⅔ +1 of the total staked amount.

* With an Ethereum Layer-1 PoW consensus mechanism, transactions are broadcasted to the mempools, with miners picking the transactions and processing them. However, due to high demand, this process is slower because of network congestion and nonviable gas prices. The goal of the scalability solution is to increase the transaction speed without sacrificing security or decentralization.

* Polygon PoS is a Layer-2 scalability solution that relies on a set of validators, who act like operators by staking the tokens into the system to secure the network.

* Those who are interested in securing the network but are not running a validator node can participate as delegators. The delegator role stakes their MATIC tokens to secure the Polygon network with existing validators without running the nodes themselves.

<br>

### Vulnerability analysis

* Polygon’s staking manager contract is the main contract for handling validator-related activities like checkpoint signature verification, reward distribution, slashing validators, and stake management.

* Validators are nodes that, among other things, send signed Polygon checkpoints to Ethereum that contain Merkle Tree hashes of the blocks in Polygon. 

* For every validator participating in the contract via stakeFor() function, the contract asks the validator if they want to allow delegators to stake tokens into the validators acceptDelegation(bool). If the validator wants to accept delegators, then the contract creates a validatorShare delegator contract for the validators. The following screenshot represents the stakeFor() function and the described behavior.

* The StakingManager contract holds information about the validator state in the validatorState struct. The following are the two variables that are important to the vulnerability:

  - validatorState.amount — The total number of tokens staked by the validators. In other words, it represents the total staking power.
  - validatorState.stakerCount — Represents the total number of stakers in the contract.


* When a validator unstakes, the counter of the total staking power updates together with the delegated amount and the amount of the validator. This can be seen in the following line:


```
updateTimeline(-(int256(amount) + delegationAmount), -1, targetEpoch);
```

* The vulnerability arises when delegators migrate their delegations from one validator to another. The contract calls updateTimeline(-amount), which ends up subtracting the total validator power from the stakeManager contract, and once that validator unstakes, the counter of total staking power will be updated again by decreasing the validator amount + delegated amount again from the contract.

* So the exact issue lies in the updateValidatorState(validatorId, -int256(amount)) function on the stakeManager contract, where it modifies the timeline updateTimeline(amount, 0, 0); which reduces the total staking power validatorState.amount with the amount the delegator is migrating, without first checking if the current validator is currently staking or not in the contract.


<br>

### Steps to Reproduce

1. Create a new validator using the stakeFor function.
2. Call the buyVoucher function with a big delegated amount to buy the shares of the validators by staking tokens.
3. The attacker can now repeat the following steps until validatorState.amount (total staking power) is low enough to bypass the consensus majority check (⅔) requirement.
   a. Catch an available validator slot via an on-chain auction process which happens at regular intervals.
   b. Migrate staking tokens into that validator by calling a migrateDelegation function.
   c. Unstake the validator. (validatorState.amount is decreased again)
   d. Wait for a checkpoint (for this validator slot to open)

* These steps will repeatedly decrease the total staking power by the same amount of delegated amount for each iteration. An attacker can repeat this until the total staking power is low enough to start accepting new checkpoints. He can bypass the required ⅔ consensus majority check. An attacker can lower the total staking power up to a low point that a sole validator can pass the majority check.





