## Wormhole Uninitialized Proxy Bugfix Review

<br>

* [Immunefi post](https://medium.com/immunefi/wormhole-uninitialized-proxy-bugfix-review-90250c41a43a)

<br>

### Intro to Proxies

* A smart contract upgrade can be simply summarized as: a change in the code at a specific address while preserving the storage state of previous code and the relationship of that address to other contracts.

* A proxy contract and delegate calls can only swap the implementation, not the state of the contract.

* In Ethereum, there are three major types of contract calls: regular CALL, STATICCALL, and DELEGATECALL.

* When contract A makes a CALL to contract B by calling foo(), the function execution relies on contract B’s storage, and the msg.sender is set to contract A.

* However, when the same call is made using DELEGATECALL, the function foo() would be called on contract B but in the context of contract A. This means that the logic of contract B would be used, but any state changes made by the function foo() would affect the storage of contract A. And also, msg.sender would point to the EOA who made the call in the first place.

<img width="875" alt="Screen Shot 2022-06-08 at 10 22 23 PM" src="https://user-images.githubusercontent.com/1130416/172770375-6b99ee39-ebd8-4dc1-b8a1-e7c76f6161f4.png">

<br>

* A delegatecall makes it possible to create upgradeable contracts using a proxy pattern.

<img width="919" alt="Screen Shot 2022-06-08 at 10 23 34 PM" src="https://user-images.githubusercontent.com/1130416/172770543-32f49773-0025-45ae-acb1-5c8032432e96.png">

<br>

* Making an upgrade in this case is quite simple, as we only need to change the stored implementation contract address in order to change its smart contract logic. 

<br>

### Transparent Proxy Pattern (TPP)  

* when a proxy admin wants to call a proxy contract function transferOwnership() which shares a name with a function in the implementation contract, which one would be called? 

* Transparent Proxy Pattern (TPP): calls by a user always execute using the implementation contract’s logic. Calls by the proxy admin always execute using the proxy contract’s logic.

* The transparent proxy needs additional logic in the proxy contract to manage all the upgradability functions, as well as the ability to identify whether the caller is the admin address. TPP is not as gas efficient as UUPS.

<br>

### Universal Upgradeable Proxy Standard (UUPS)

* With TPP, the upgrade logic is located in the proxy contract itself. But with UUPS, the upgrade logic is in the implementation contract.

* UUPS implementations have access to all the storage of the proxy; they can overwrite the storage slot of the proxy contract where the proxy stores the address of the implementation.

* We only check that the caller is the admin when an upgrade is requested. All authorization logic for upgradability is located within the implementation contract to guard against any unintended calls from happening.


<br>


### OpenZeppelin UUPS Uninitialized Proxies Vulnerability


* Wormhole vulnerability was detected by generalizing the pattern of the OpenZeppelin UUPS vulnerability.

* `initialize()` function calls `__Ownable_init, which sets the owner of the implementation contract to the first person to call it. 

* Being an owner of the UUPS implementation contract means you can control the upgrade functions. The owner of the implementation can call upgradeToAndCall() directly on the implementation contract, instead of going through the proxy.

* The vulnerability lies in how `upgradeToAndCall()` works internally. Apart from changing the implementation address to a new one, it atomically executes any migration/initialization function using `DELEGATECALL` and the data passed along it. What would happen if somehow we managed to get the implementation contract to do an `upgradeToAndCall()` in its own context? This would cause the proxy contract to become useless, as it would forward all the calls to an empty address. Upgrading would no longer be possible.

<br>

### An Attack

1. The attacker calls initialize() on the implementation contract to become the owner. Remember the point above where initialize() makes the first person to call it the owner. Since nobody has called this function yet in the context of the implementation, the call works and makes the attacker the owner
Attacker deploys a malicious contract with a selfdestruct() function.
2. The attacker calls upgradeToAndCall() on the implementation contract as an owner, and points it to the malicious selfdestruct contract.
3. During the upgradeToAndCall() execution, DELEGATECALL is called from the implementation contract to the malicious selfdestruct contract using the context of the implementation contract (not the proxy).
4. SELFDESTRUCT is called, destroying the implementation contract.
5. The proxy contract is now rendered useless

<br>

### Wormhole Vulnerability

* Wormhole is also using a UUPS style proxy, where the upgrade logic resides in the implementation contract.

* The main difference is that the upgrade is guarded by Guardians that need to produce a multi-sig message stating the upgrade to the new implementation address is authorized.

* An implementation contract was uninitialized after a previous bugfix had reverted the original initialization. That means an attacker would be able to pass their own Guardian set and proceed with the upgrade as a Guardian they controlled.

* Once in control of the Guardian address, the attacker can use submitContractUpgrade() to force an upgrade attempt, causing a DELEGATECALL to an attacker-submitted address. If this address is a contract that executes a SELFDESTRUCT opcode, the implementation contract will be destroyed.

* The step-by-step guide to exploit is similar to the UUPS issue:

1. The attacker calls initialize() on the implementation contract to set the attacker controllable Guardian set.
2. Attacker deploys a malicious contract with a selfdestruct() function.
3. The attacker calls submitContractUpgrade() on the implementation contract and passes a signature signed by the malicious Guardian, which encodes the address of the malicious implementation contract for an upgrade.
4. During the submitContractUpgrade() execution, DELEGATECALL is called from the regular implementation contract to the malicious implementation contract.
5. SELFDESTRUCT is called, destroying the regular implementation contract.
6. The proxy contract is now rendered useless.


<br>

### Vulnerability fix

* The transaction called initialize() on the implementation contract and set the Guardians.




















