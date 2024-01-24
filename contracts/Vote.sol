//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Vote {
    struct candidate {         //struct of candidate
        string name;
        uint256 voteCount;
    }

    candidate[] public Candidates; //array of candidates
    mapping(address=>bool) public voters; //adddress of voter and they have voted or not
    address owner; //owner of blockchain

    uint256 startTime; //starttime of contract
    uint256 endTime; //endtime of contract

    constructor(string[] memory _candidateName , uint256 _durationinMinutes) {
        for(uint256 i=0 ; i<_candidateName.length ; i++){   //adding values to the candidate array
            Candidates.push(candidate({
                name: _candidateName[i],
                voteCount: 0
            }));
        }

        owner = msg.sender;   //assingnig the owner
        startTime = block.timestamp;   //start time of a contract
        endTime = block.timestamp + (_durationinMinutes * 1 minutes);  //end time of a contract
    }

    modifier onlyOwner {   //to verify the owner while adding candidate
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {  //to add a new candidate
        Candidates.push(candidate({
            name: _name,
            voteCount: 0
        }));
    }

    function addVote(uint256 index) public {  //to cast vote to a candidate
        require(!voters[msg.sender] , "You have already voted");
        require(index < Candidates.length , "Invalid index");

        Candidates[index].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesofCandidate() public view returns(candidate[] memory) {  //returns all the candidates
        return Candidates;
    }

    function getVotingStatus() public view returns(bool) {  //if voting can go on or not
        return (block.timestamp >= startTime && block.timestamp < endTime);
    }

    function getRemainingVoteTime() public view returns(uint256) {  //time remaining for voting
        require(block.timestamp >= startTime , "Voting has not started yet");
        if(block.timestamp > endTime){
            return 0;
        }
        return endTime-block.timestamp;
    }

}