##  my favorite opcodes

<br>


| opocde      | name        | min gas     |    details      |
| ----------- | ----------- | ----------- | --------------- |
| 20          | SAH3        | 30          | keccak-256 hash of the given data in memory |
| 31          | BALANCE     | 100         | balance of a given 20-byte address in wei |
| 33          | CALLER      | 33          | the 20-byte address of the last caller account (except delegate call) |
| 3A          | GASPRICE    | 2         | gas price in wei per gas |
| 40          | BLOCKHASH   | 20       | hash of the chosen block, or 0 if the block is not the valid range |
| ~☠️44🪦~           | DIFFICULT   | 😵       | current block difficulty |
| 45          | GASLIIT   | 2       | get gas limit |
| 48          | BASEFEE   | 2       | get base fee in wei |
| 5A          | GAS   | 2       | remaining gas after instructions |
| F0          | CREATE2   | 32000       | create a new contract - the new account's code is set to the return data resulting from executing the inialisation code - the destination address is calculated as `initialisation_code = memory[offset:offset+size]` and `address = keccak256(0xff + sender_address + salt + keccak256(initialisation_code))[12:]` |
| F1          | CALL   | 100       | create a new sub context and execute the code of the given account, then resumes the current one |
| F2          | CALLCODE   | 100       | create a new sub context and execute the code of the given account - the storage remains the same |
| F4          | ✨DELEGATECALL✨   | 100       | create a new sub context and execute the code of the given account - the storage, the current sender, and the current value remain the same |
| FA          | STATICCALL   | 100       | create a new sub context and execute the code of the given account, then resumes the current one - equivalent to CALL, except that it does not allow any state modifying instructions or sending ETH in the sub context |
| FF          | SELFDESTRUCT   | 5000       | the new account is registered to be destroyed at the end of the current transaction |
