## APWine Incorrect Check of Delegations

<br>

* [Immunefi blog post](https://medium.com/immunefi/apwine-incorrect-check-of-delegations-bugfix-review-7e401a49c04f)

<br>

* The APWine protocol can be used to tokenize future yields.

* APWine operates by storing Interest Bearing Tokens (IBT) or any other yield-bearing asset in a smart contract for a specified period of time and issuing Future Yield Tokens (FYT) in exchange.

* Bug: in the PT tokens, one condition wasn’t checked during the burn of those tokens which could lead to the theft of the yield from the protocol after the two periods, i.e. 6 months. (The condition is a `if` on an not address(0), which is called by a burn method).

* The division of a yield-bearing asset into Principal Tokens (PTs) and Future Yield Tokens is the essential functionality of APWine. A user’s deposits to the protocol are represented by the PTs. At the start of each period, the APWine generates FYT from PTs in a 1:1 ratio.
