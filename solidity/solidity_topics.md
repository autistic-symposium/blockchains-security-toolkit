## solidity topics

solidity provides two types of events:

* anonymous 
  * 4 topics may be indexed, and there is not signature hash (no filter)   
* non-anonymous (default)
  * up to 3 topics may be indexed, since the first topic is reserved to the event signature (filter) 
