import React from "react";
import styled from "styled-components";

// Define styled components
const ContactWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevent scrollbar from appearing */
`;

const ContactContainer = styled.div`
  max-width: 600px;
  margin: auto; /* Center the container vertically */
  max-height: 100%; /* Set a maximum height to prevent overflow */
  padding: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ContactTitle = styled.h1`
  color: #333;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContactInfoContainer = styled.div`
  margin-bottom: 10px;
`;

const ContactInfoLabel = styled.span`
  color: #666;
  font-size: 18px;
  margin-right: 5px;
`;

const ContactInfoValue = styled.span`
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

const ContactPage = () => {
  return (
    <ContactWrapper>
      <ContactContainer>
        <ContactTitle>Contact Information</ContactTitle>
        <ContactInfoContainer>
          <ContactInfoLabel>Staff:</ContactInfoLabel>
          <ContactInfoValue>Nouri - Essabir - Zaatari</ContactInfoValue>
        </ContactInfoContainer>
        <ContactInfoContainer>
          <ContactInfoLabel>Email:</ContactInfoLabel>
          <ContactInfoValue>pharmacy@example.com</ContactInfoValue>
        </ContactInfoContainer>
        <ContactInfoContainer>
          <ContactInfoLabel>Téléphone:</ContactInfoLabel>
          <ContactInfoValue>0535442342</ContactInfoValue>
        </ContactInfoContainer>
        <ContactInfoContainer>
          <ContactInfoLabel>Addresse:</ContactInfoLabel>
          <ContactInfoValue>
            N1 BIS Av. Bir Anzarane, El Jadida 24000, Morocco
          </ContactInfoValue>
        </ContactInfoContainer>
      </ContactContainer>
    </ContactWrapper>
  );
};

export default ContactPage;
