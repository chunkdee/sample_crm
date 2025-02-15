import React, { useState } from "react";
import { FileTextOutlined, PhoneOutlined, StarOutlined, CheckCircleOutlined, ShakeOutlined, TrophyOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";
import {OpportunityStage} from "../../datagenerator/types/crmTypes";

// Define the prop types
interface SalesPipelineProps {
    DealStage: OpportunityStage;
  }

const LifeCycleStages : React.FC<SalesPipelineProps> =  ({ DealStage }) => {
  const [currentStage, setCurrentStage] = useState<OpportunityStage>(DealStage); // State to track the current stage

  const stages: { id: OpportunityStage; label: string; icon: JSX.Element }[] = [
    { id: "Prospecting", label: "Prospecting", icon: <FileTextOutlined /> },
    { id: "Qualification", label: "Qualification", icon: <PhoneOutlined /> },
    { id: "Proposal", label: "Proposal", icon: <StarOutlined /> },
    { id: "Negotiation", label: "Negotiation", icon: <CheckCircleOutlined /> },
    { id: "Closed Won", label: "Closed Won", icon: <ShakeOutlined /> },
    { id: "Closed Lost", label: "Closed Lost", icon: <TrophyOutlined /> },
  ];

  // Determine the color for each stage based on the currentStage
  const getStageColor = (stageId: OpportunityStage): string => {
    const stageIndex = stages.findIndex((s) => s.id === stageId);
    const currentIndex = stages.findIndex((s) => s.id === currentStage);

    if (currentIndex === -1) return ""; // No current stage

    // Color logic based on the current stage
    if (stageId === "Prospecting" && currentStage === "Prospecting") return "blue";
    if (stageId === "Qualification" && currentStage === "Qualification") return "purple";
    if (stageId === "Proposal" && currentStage === "Proposal") return "orange";
    if (stageId === "Negotiation" && currentStage === "Negotiation") return "yellow";
    if (stageId === "Closed Won" && currentStage === "Closed Won") return "green";
    if (stageId === "Closed Lost" && currentStage === "Closed Lost") return "red";

    if (currentStage === "Qualification" && (stageId === "Prospecting" || stageId === "Qualification")) return "purple";
    if (currentStage === "Proposal" && (stageId === "Prospecting" || stageId === "Qualification" || stageId === "Proposal")) return "orange";
    if (currentStage === "Negotiation" && (stageId === "Prospecting" || stageId === "Qualification" || stageId === "Proposal" || stageId === "Negotiation")) return "yellow";
    if (currentStage === "Closed Won") return "green";
    if (currentStage === "Closed Lost") return "red";

    return ""; // Default color
  };

  // Handle stage click
  const handleStageClick = (stageId: OpportunityStage) => {
    setCurrentStage(stageId); // Update the current stage
  };

  return (
    <PipelineContainer>
      {stages.map((stage) => (
        <Stage
          key={stage.id}
          className={getStageColor(stage.id)}
          onClick={() => handleStageClick(stage.id)} // Add click handler
        >
          {stage.icon} {stage.label}
        </Stage>
      ))}
    </PipelineContainer>
  );
};

export default LifeCycleStages;

// Styled Components
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const colorChange = keyframes`
  from {
    background-color: #f9f9f9;
  }
  to {
    background-color: inherit;
  }
`;

const PipelineContainer = styled.div`
  display: flex;
  gap: 2px; /* Reduced spacing between stages */
  padding: 8px; /* Padding inside the border */
  justify-content: center;
  border: 1px solid #e0e0e0; /* Subtle border */
  border-radius: 12px; /* Rounded corners */
  background-color: #ffffff; /* White background */
  width: fit-content; /* Fit the content width */
   /*  margin: 0px auto;Center the container */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const Stage = styled.div`
  padding: 8px 24px; /* Larger padding for better spacing */
  border-radius: 8px; /* Rounded corners */
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease; /* Smooth transitions */
  border: 1px solid #e0e0e0; /* Subtle border */
  background-color: #f9f9f9; /* Light gray background */
  font-size: 14px; /* Professional font size */
  font-weight: 500; /* Medium font weight */
  color: #333; /* Dark text color */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Spacing between icon and text */
  animation: ${fadeIn} 0.5s ease-in-out; /* Fade-in animation */

  &:hover {
    background-color: #f0f0f0; /* Light hover effect */
    transform: translateY(-2px); /* Slight lift on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow on hover */
  }

  /* Color classes for stages */
  &.blue {
    background: linear-gradient(135deg, #1890ff, #096dd9); /* Blue gradient */
    color: white;
    border-color: #096dd9;
    animation: ${colorChange} 0.5s ease-in-out; /* Color change animation */
  }

  &.purple {
    background: linear-gradient(135deg, #722ed1, #531dab); /* Purple gradient */
    color: white;
    border-color: #531dab;
    animation: ${colorChange} 0.5s ease-in-out; /* Color change animation */
  }

  &.orange {
    background: linear-gradient(135deg, #ffa500, #ff8c00); /* Orange gradient */
    color: white;
    border-color: #ff8c00;
    animation: ${colorChange} 0.5s ease-in-out; /* Color change animation */
  }

  &.yellow {
    background: linear-gradient(135deg, #ffd700, #ffcc00); /* Yellow gradient */
    color: black;
    border-color: #ffcc00;
    animation: ${colorChange} 0.5s ease-in-out; /* Color change animation */
  }

  &.green {
    background: linear-gradient(135deg, #52c41a, #389e0d); /* Green gradient */
    color: white;
    border-color: #389e0d;
    animation: ${colorChange} 0.5s ease-in-out; /* Color change animation */
  }

  &.red {
    background: linear-gradient(135deg, #ff4d4f, #cf1322); /* Red gradient */
    color: white;
    border-color: #cf1322;
    animation: ${colorChange} 0.5s ease-in-out; /* Color change animation */
  }
`;