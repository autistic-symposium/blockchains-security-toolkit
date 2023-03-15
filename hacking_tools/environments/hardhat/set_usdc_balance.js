// function to set USDC balance of ethereum mainnet forks by @janbro


const { ethers } = require("hardhat");

async function setUSDCBalance(account, balance) {
    const balances_index = 9;
    const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // ETH mainnet USDC address

    // modify usdc's storage to give rich account large amount of tokens
    const index = ethers.utils.solidityKeccak256(
        ["uint256", "uint256"],
        [account, balances_index] // key, slot
    );

    await await ethers.provider.send(
        "hardhat_setStorageAt",
        [
            USDC_ADDRESS,
            index,
            ethers.utils.hexlify(ethers.utils.zeroPad(balance.toHexString(), 32)).toString()
        ]
    );
}

module.exports = {
    setUSDCBalance,
};
