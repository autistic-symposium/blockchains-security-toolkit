## ABI encoding

* the solidity built-in function `abi.encode` encodes solidity types into raw bytes, that can be interpreted directly by the EVM.


```
contract StringEncoding {
    bytes public encodedString = abi.encode("hacking");
}
```

* this is what happens:
     1. 1st (32 bytes) word = offset → indicates at which bytes index the string starts. If you count 32 from the beginning (= index 32), you will reach the starting point of where the actual encoded string starts.
     2. 2nd (32 bytes) word = string length → in the case of the string, this indicates how many characters (including whitespaces) are included in the string. 
     3. 3rd (32 bytes) word = the actual utf8 encoded string → each individual bytes corresponds to hex notation of a letter / character encoded in utf8. 

<br>

#### other ABI Encodings

* address payable -> address
* contract -> address
* enum -> uint8
* struct -> tuple of elementry types
