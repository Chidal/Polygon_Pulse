// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AIPredictionOracle {
    event PredictionStored(string modelId, string prediction);

    mapping(string => string) public predictions;  // modelId => prediction JSON

    // Function to add AI model prediction (called off-chain via oracle)
    function storePrediction(string memory modelId, string memory prediction) external {
        predictions[modelId] = prediction;
        emit PredictionStored(modelId, prediction);
    }

    // Get prediction for integration with your main contract
    function getPrediction(string memory modelId) external view returns (string memory) {
        return predictions[modelId];
    }
}