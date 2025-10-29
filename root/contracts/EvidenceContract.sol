//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EvidenceContract {
    struct Evidence {
        string hash;
        uint timestamp;
    }

    mapping(string => Evidence) public evidences;

    function storeEvidence(string memory caseId, string memory hash) public {
        evidences[caseId] = Evidence(hash, block.timestamp);
    }

    function getEvidence(string memory caseId) public view returns (string memory, uint) {
        Evidence memory ev = evidences[caseId];
        return (ev.hash, ev.timestamp);
    }
}