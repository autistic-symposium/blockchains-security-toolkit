## 🐊 Proxies

<br>

### TL;DR Proxies Patterns

<br>

#### Transparent Proxy Pattern (TPP)

1. upgrade logic is stored in proxy itself.
2. gas-inefficient

<br>

#### Universal Upgradable Proxy Standard (UUPS)

1. upgrade logic is stored in logic itself
2. gas-efficient


<br>

---

### Unitialized proxy bug

<br>

* Developers might leave proxies unitialized - this can be a problem when it leads to changes such as granting ownership to the caller
* the owners of the contract can upgrade the implementation contract
* this bug can lead to the self-destruction of the implementation contract (proxy contract is bricked)


---

### Resources

<br>

* [Wormhole bridge protocol](https://github.com/immunefi-team/wormhole-uninitialized)


