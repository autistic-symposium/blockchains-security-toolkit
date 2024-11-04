## randomness

<br>

### tl; dr

<br>

#### post-merge notes

<br>

* `BLOCKHASH` opcode will still be available, but given that it will no longer be forged through the proof of work hashing process, the pseudorandomness provided by this opcode will be much weaker.
* `DIFFICULTY` is renamed to `PREVRANDAO`, and return the output of the randomness beacon provided by the beacon chain. It's stronger than `BLOCKHASH` but still biasable.

<br>

----

### cool resources

* **[ethereum randomness ](https://eth2book.info/altair/part2/building_blocks/randomness)**
* **[randao github](https://github.com/randao/randao)**
* **[exploring the randao game in pos ethereum](https://ethereum.github.io/beaconrunner/notebooks/randao/randao.html)**
