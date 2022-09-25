## ⛽️ Tricks to save gas


<br>

- in Solidity, the maximum size of a contract is restricted to 24 KB by [EIP 170](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-170.md).




---



### Function names

- brute force hashes of function names to find those that starts `0000`, so this can save around 50 gas

----

### Other contracts

- avoid calls to other contracts

---

### Pack variables

The below code is an example of poor code and will consume 3 storage slot:

```
uint8 numberOne;
uint256 bigNumber;
uint8 numberTwo;
```

A much more efficient way to do this in solidity will be:

```
uint8 numberOne;
uint8 numberTwo;
uint256 bigNumber;
```

---

### Constant vs. Immutable variables

Constant values can sometimes be cheaper than immutable values:

1. For a constant variable, the expression assigned to it is copied to all the places where it is accessed and also re-evaluated each time, allowing local optimizations.
2. Immutable variables are evaluated once at construction time and their value is copied to all the places in the code where they are accessed. For these values, 32 bytes are reserved, even if they would fit in fewer bytes. 


---

### Mappings are cheaper than Arrays

- avoid dynamically sized arrays
- An array is not stored sequentially in memory but as a mapping.
- You can pack Arrays but not Mappings.
- It’s cheaper to use arrays if you are using smaller elements like `uint8` which can be packed together.
- You can’t get the length of a mapping or parse through all its elements, so depending on your use case, you might be forced to use an Array even though it might cost you more gas.

---

### **Use bytes32 rather than string/bytes**

- If you can fit your data in 32 bytes, then you should use bytes32 datatype rather than bytes or strings as it is much cheaper in solidity.
- Any fixed size variable in solidity is cheaper than variable size.

---

### Use external function modifier

- For all the public functions, the input parameters are copied to memory automatically, and it costs gas.
- If your function is only called externally, then you should explicitly mark it as external.
- External function’s parameters are not copied into memory but are read from `calldata` directly.
- By the way, calling internal functions is cheaper.

---

### Delete variables that you don’t need

- If you don’t need a variable anymore, you should delete it using the delete keyword provided by solidity or by setting it to its default value.

---

### **No need to initialize variables with default values**

- If a variable is not set/initialized, it is assumed to have the default value (0, false, 0x0 etc depending on the data type). If you explicitly initialize it with its default value, you are just wasting gas.

```
uint256 hello = 0; //bad, expensive
uint256 world; //good, cheap
```

---

### Make use of single line swaps 

- This is space-efficient:

```
(hello, world) = (world, hello)
```

<br>

---

## Tools

<br>

* [truffle contract size](https://github.com/IoBuilders/truffle-contract-size)
