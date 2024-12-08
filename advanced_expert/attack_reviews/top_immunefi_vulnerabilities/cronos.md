## Cronos Theft of Transactions Fees

<br>

* [Immunefi blog post](https://medium.com/immunefi/cronos-theft-of-transactions-fees-bugfix-postmortem-b33f941b9570)

<br>

* Can we create a transaction that would be able to streal fees from the current block?
* By submitting a cosmos-signed `MsgEthereumTx` (with a valid Ethereum signature) without `ExtensionOptionsEthereu, Tx` and a high `GasLimit`, the attacker receives a gas refund even though the gas charge was not taken in the first place.

<br>

### Cronos Blockchain and Ethermint

* Built on the Cosmos SDK while being EVM compatible, Cronos is uniquely positioned to connect to the EVM chains and the Cosmos ecosystem, to enable seamless crypto assets and dApps interoperability in the multichain world.
* Ethermint is the underlying technology that Cronos is built on. Ethermint is a high-throughput, scalable PoS blockchain compatible with Ethereum. The Cosmos SDK, which operates on top of the Tendermint Core consensus engine, was used to create it.
* Since Ethermint is compatible with both EVM-based chains and Cosmos-specific blockchains, this also means the transactions can be bridged and propagated between the two chains. The client needs to parse and handle transactions routed for both the EVM and the Cosmos hub.

<br>

### EVM and Ethermint transactions

* Transactions are one of Ethereum's key functionalities, and they are the only thing that can modify or update the state of the blockchain. They are signed messages sent by the Ethereum network to every node via the "flood routing" protocol.
* New transactions look as follow:

1. Nonce: an originating EOA-issued sequence number used to prevent message replay.
2. Gas price: how much Ether (in Wei) the originator is prepared to pay for each unit of gas.
3. Gas limit: the quantity of gas the originator is prepared to purchase for this transaction.
4. Recipient: the Ethereum address of the final destination (another EOA or contract address).
5. Value: the amount of Ether to transmit to the destination (in Wei).
6. Data: variable-length binary data payload.
7. v,r,s: the three components of the original EOA's ECDSA digital signature.

* The Ethermint's chain performs state transitions by using `MsgEthereumTx`. This message provides the relevant transaction data elements and wraps an Ethereum transaction as an SDK message.
* When transactions are consumed in Ethermint, they pass via a sequence of handlers. The `AnteHandler` is one of these handlers, and it's in change of conducting preliminary message execution business logic such as fee payment, signature verification, and so on. It only applies to transactions conducted through the Cosmos SDK. Because the EVM handles the same business logic, Ethereum routed transactions will be unaffected.

<br>

### Vulnerability Analysis

* Etheremint offers standard JSON-RPC endpoints to utilize whenever we wish to send an Ethereum transaction.
* When an Ethereum transaction is submitted through the compatibility JSON-RPC endpoint, it's reformatted as `MsgEthereumTx` and then has an `ExtensionOptionsEthereumTx` appended to it. When processed by a node, the `ExtensionOptionsEthreumTx` causes the transaction to be processed by the appropriate antehandlers, including the `EthGasConsume` handler. This handler deducts the gas price * gas limit from the originating account. After the transaction execution, the fee is refunded.
* This eliminates the need for a cosmos signature, while also ensuring that the gas limit indicated in the Ethereum message is subtracted first, as it would on Ethereum. 
* However, there is no check to see if a `MsgEthereumTx` has an `ExtensionOptionsEthereumTx`. It's possible to package `MsgEthereumTX` without it, and submit it to the node. This executes only the standard set of antehandlers by omitting this option. As a result, we may skip a few antehandlers that are supposed to run before `MsgEthereumTx` is handled.
* One of the handlers that are called is `EthGasConsumeDecorator(evmkeeper)`. Its purpose is to ensure that the Ethereum transaction message has sufficient funds to cover intrinsic gas and that the sender has the funds to cover the gas cost. The quantity of gas consumed by a transaction before it is completed is referred to as intrinsic gas. This is different from the cosmos fee because it's meant to be refunded.
* But since the gas cost is not deducted, it's possible to specify an arbitrary gas limit and then get refunded gas that wasn't deducted, as the `EthGasConsumeDecorator` handler didn't run because the `ExtensionOptionsEthereumTx` was missing.
* This means that before the malicious transaction is being executed, the transaction fees in the current block might be seized and the attack could be repeated for every block.

<br>

### Vulnerability Fix

* Check if the `MsgEthereumTx` is contained inside the transaction.











