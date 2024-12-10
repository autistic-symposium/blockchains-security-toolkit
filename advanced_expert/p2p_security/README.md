## p2p security

<br>

#### ethereum validator security notes (homestakers)

* while ip address revealing at the execution layer is inevitable, attestations and blocks from validator nodes could leak information that allows an attacker to associate a validator id with an ip address, unless operators utilize sophisticated measures.
* even though a validator can submit the consensus messages to multiple beacon nodes, there are still risks of metadata analysis attacks, including the size of the message (block or attestation), frequency of broadcasting messages (either blocks or attestations), the timing of the message, joining or leaving subnets events, and packet or data size difference between attestation and other messages.
* if the validator ids or wallet addresses on the consensus layer can be linked to the beacon ip address, the validator operator could be de-anonymized, allowing consequences such as the destabilization of the network, (d)ddos of block producers through validator sniping and solo stakes disenfranchisement due to government sanctions (e.g., ofac) - or even having their physical devices stolen.
* a popular scenario is of an attacker watching the beacon chain network by running a node modified to gather ip addresses of all connected peers when they broadcast attestations. the attacker can create a database of ips and public keys, and with this information, they could take the validator offline when it becomes a block proposer.
* in a sophisticated raid, the attacker controls the next validator proposer, taking the mev opportunities.
* various attacks on privacy exploit p2p (meta)data to enhance the privacy of cryptocurrency users. privacy-enhanced broadcast and routing algorithms were proposed (for instance, **[ethp2psim](https://arxiv.org/abs/2306.15024)** discuss implementing and evaluating various privacy-enhanced broadcast).

<br>

----

### cool readings

<br>

* **[consensus layer block proposal privacy using dandelion and rln, by b. dimovski (2022)](https://hackmd.io/CwEll0uLQNm4J4-vfqsnKg)**
