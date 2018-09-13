pragma solidity ^0.4.17;

contract SimpleStorage {
    uint myVariable;

    event Odd();

    event Even();

    function set(uint x) public {
        myVariable = x;
        if (x % 2 == 0) {
            emit Odd();
        } else {
            emit Even();
        }
    }

    function get() public view returns (uint) {
        return myVariable;
    }
}