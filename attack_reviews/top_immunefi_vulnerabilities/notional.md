## Notional Double Counting Free Collateral Bugfix Review

<br>

* [Immunefi report](https://medium.com/immunefi/notional-double-counting-free-collateral-bugfix-review-28b634903934)

<br>


* Bug could have allowed a user to drain almost all liquidity from markets on all currencies. 

<br>

### Notional

* Notional is a fixed-term lending and borrowing platform on Ethereum.
* All operations done on the Notional V2 platform are done using their fCash token.
* fCash tokens are transferable tokens that indicate a claim on a positive or negative cash flow at a future date.
* The interest rate for lending and borrowing on Notional is set by fCash markets.
* Users deposit or receive cash in return for fCash when they lend or borrow at set rates.

<br>

### Bitmap Portfolio

* The portfolio is simply an array of assets, the number of assets is limited by governance-tunable parameters.
* There is a second "asset bitmap" portfolio which can be enabled on any account and is particularly handy for market makers.
* Bitmap portfolios, or asset bitmaps, must be activated as an account activity. Bitmap currencies can only be changed if there are no debts or credits in the bitmap asset.
* Before and after activating a bitmap portfolio, users do not need to make changes how they interact with the platform. Only fCas assets in the bitmap currency can be kept once a bitmap portfolio is activated.
* Only fCash assets in that bitmap currency can be kept once a bitmap portfolio is activated.
* `MAX_BITMAP_ASSETS` is the maximum number of fCash assets a bitmap portfolio can store.


<br>

### Vulnerability analysis

* The vulnerability lies inside the function `AccountContextHandler.enabledBitmapForAccount()` which is called from the account action contract.
* Once a bitmap currency is set, `enableBitmapForAccount` fails to clear the copy of the active bitmap currency in `accountContext.activeCurrencies` when the bitmap currency is changed. This is critical, as we can trigger double accounting of free collateral due to this,

1. Deposit a second currency (the one we want double accounted) by calling `depositUnderlyingToken()`. This will make a call to `setActiveCurrency` as flags argument and `isActive` being true, which will enable the currency in `accountContext.activeCurrencies` only if this currency is not active bitmap currency. One could force this condition to be true by calling `enableBitmapForAccount` with some dummy currency that we don't care about.
2. Then, one can make a second call to `enabledBitmapForAccount` after the deposit to change the bitmap currency to the one we deposited in the previous step. Due to the logic error, the free collateral calculations will be run twice on the asset we deposited: once for the bitmap and once for the `accountContext.activeCurrencies`.
3. This will trigger double account of free collateral of the activated currency. Free collateral represents the amount of collateral denominated in ETH that an account holds beyond what is needs to meet its minimum collateral requirements. If an account's free collateral figure is positive, the account is adequately collateralized. If the account's free collateral figure is negative, it's under-collateralized and eligible for liquidation. If calculation for free collateral are doubled (collateralization is high), this means the attacker could borrow more without actually holding enough collateral currency.








