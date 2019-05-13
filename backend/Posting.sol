pragma solidity >=0.4.0 <0.6.0;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is coordinates stored as type uint and value is string provided by users
  */
  
  mapping (uint => string) public postReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  uint[] public cooridnateList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  constructor(uint[] memory coordinates) public {
    cooridnateList = coordinates;
  }

  // This function returns the post regarding this coordinates
  function getPost(uint coordinate) view public returns (string memory) {
    //require(validCandidate(cooridnate));
    return postReceived[coordinate];
  }

  // This store posts value to coordinates
  function storePost(uint index, string memory post) public {
    //require(validCandidate(candidate));
    postReceived[index]=post;
  }



  //function validCandidate(string memory candidate) view public returns (bool) {
  //  for(uint i = 0; i < candidateList.length; i++) {
  //    if (candidateList[i] == candidate) {
  //      return true;
  //    }
  //  }
  //  return false;
  //}
}