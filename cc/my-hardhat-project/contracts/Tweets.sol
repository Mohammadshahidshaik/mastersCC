// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tweets {
    string public tweet;

    function setTweet(string memory _tweet) public {
        tweet = _tweet;
    }

    function getTweet() public view returns (string memory) {
        return tweet;
    }
}
