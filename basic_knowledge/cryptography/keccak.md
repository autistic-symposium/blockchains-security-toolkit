## 🥐 keccak

<br>

### hashing

<br>


* hashing is a mathematical op converting an input message into a digest
* the transformation of a str of characters into a (usually shorter) fixed-length value or key that represents the original string.
* used to determine the integrity of a message, fast data retrieval and to encrypt/decrypt digital signatures
* collisions found: MD5 (128, 1992), SHA-1 (160, 1995)
* no collisions found: SHA-2 (224/256/384/512, 2001) 

<br>

### secure hash algorithm (SHA)

<br>

* family of cryptographic hash functions by NIST
* preprocessing: padding the data for blocking (fixed size message blocks)

<br>

### SHA-3/keccak

<br>

* 2012 as the winner of the NIST hash function competition
* based on the sponge function: variable input and output length
* parameters (decides the strength):
     * r bits: rate, defines speed
     * c bits: capacity, defines the security level 
* no key schedule, instead round constants
* state us 5x5x64 bits block
* the rho module rotates each 64-bit element by a triangular number: 0, 1, 3, 6, 10, 15...
* the pi module permutes the 64-bit elements
* the chi module adds a non-linear aspect to the permutation round
* the iota module breaks up any symmetry caused by the other modules, through XORing one of the array elements to a round constant

<br>

##### application & strength

<br>

* high level of parallelism
* flexibility, bit interleaving
* suited for protection against side-channel attack

