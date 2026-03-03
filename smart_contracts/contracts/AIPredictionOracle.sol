pragma solidity ^0.8.20;

contract AIPredictionOracle {
    event AIPredictionStored(string modelId, string predictionHash, address reporter);

    mapping(string => string) public predictions; // modelId => JSON or IPFS hash

    function storePrediction(string memory modelId, string memory prediction) external {
        predictions[modelId] = prediction;
        emit AIPredictionStored(modelId, prediction, msg.sender);
    }

    function getPrediction(string memory modelId) external view returns (string memory) {
        return predictions[modelId];
    }
}