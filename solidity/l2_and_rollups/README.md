# Some security notes on L2s and Rollups

<br>

* The current Ethereum version has low transaction throughput and high latency in processing. This means that transactions are both slow and prohibitively expensive, due to high demand, relative to what the network can take at any given time.


## Scaling solutions

There are two types of scaling solutions:

- On-chain scaling refers to any direct modification made to a blockchain, like data sharding and execution sharding in the incoming Ethereum 2.0.
- Off-chain scaling refers to any innovation outside of a blockchain, i.e., the execution of transaction bytecode happens externally instead of on Ethereum. hese solutions are called L2, because layer 2 works above layer 1 (Ethereum) to optimize and speed up processing. Arbitrum and Optimism Ethereum are two well-known examples of L2 scaling solutions.

Currently, we can distinguish between two leading L2 solutions as:

- Zero-Knowledge (zk) rollups, and
- Optimistic rollups


### Zk-rollups

* zk-rollups bundle together many off-chain transactions into a single verifiable batch using zk-SNARK. 
* zk-SNARK is an extremely efficient, zero-knowledge proof that allows one party to prove it possesses certain information without revealing that information. These validity proofs are then posted to the Ethereum blockchain.


### Optimistic Rollups

* Instead of executing and storing all the data on Ethereum, where transactions are only processed at a premium, we only store a summary.
* All the actual computation and storage of contracts and data is done on L2.
* Rollups inherit Ethereum's security guarantess, while still acting as an efficient scalin solution.
* Optimistic rollup batch together off-chain transactions into braches, without a proof of their validity.
* When assertions of the L2 state are posted on-chain, validators of the rollup can challenge the assetion when they think there is a malicious state (fraud detection).


### Optimism

* Optimism is a scaling solution based on the concept of optimistic rollups.
* It depends on "fault proofs" which is a way of detecting whether a transaction being verified is incorrect.
* Optimism handles fault-proofs using OVM 2.0.
