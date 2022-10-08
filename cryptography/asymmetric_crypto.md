## 🍈 asymmetric crypto

<br>

* a private key in etherem is 64 random hex characters (or 32 bytes or 256 bits)
* the public key is derived from the private key using elliptic curve digital signature algorith (ECDSA)
* the ethereum address are the first 20 bytes of the SHA3 hashed public key
* the private key creates a signature, the public key verifies the signature
* when you transfer ether from one address to another, the tx is signed by your private key
