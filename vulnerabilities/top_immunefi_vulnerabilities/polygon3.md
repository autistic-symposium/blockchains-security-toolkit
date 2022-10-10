## Polygon Double-Spend Bugfix Review 

<br>

* [Immunefi report](https://medium.com/immunefi/polygon-double-spend-bug-fix-postmortem-2m-bounty-5a1db09db7f1)

<br>


* Polygon introduced two bridges: Plasma (more secure) and PoS bridge.
* The main vulnerability lies in how Polygon’s WithdrawManager verifies the inclusion and uniqueness of the burn transaction in previous blocks.

<br>

<img width="904" alt="Screen Shot 2022-06-20 at 12 06 30 AM" src="https://user-images.githubusercontent.com/1130416/174544298-09f1fd2c-8413-497b-acfa-27a88a4980ec.png">

<br>

#### PoC

1. Deposit a large amount of ETH/tokens to Polygon through the Plasma Bridge.
2. After confirmation of the funds being available on the Polygon, start the Withdrawal process.
3. Wait for seven days for an exit to be valid.
4. Resubmit the exit payload but with a modified first byte of the branch mask.
5. The same valid transaction can be resubmitted up to 223 times with different values for the first byte of the HP-encoded path.
6. Profit.

<br>

### Fix

* The first byte of the encoded branch mask is supposed to always be 0x00. 
* The fix is to check if the first byte of the encoded branch mask is 0x00 and not to disregard it as an incorrect mask.

