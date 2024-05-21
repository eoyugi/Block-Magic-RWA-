const axios = require('axios');

const verifyAssetValue = async (assetId) => {
  try {
    const response = await axios.get(`https://asset-registry-api.com/value?assetId=${assetId}`);
    return response.data.value;
  } catch (error) {
    console.error('Error fetching asset value:', error);
    throw error;
  }
};

const verifyBorrowerInformation = async (borrowerId) => {
  try {
    const response = await axios.get(`https://borrower-registry-api.com/info?borrowerId=${borrowerId}`);
    return response.data.info;
  } catch (error) {
    console.error('Error fetching borrower information:', error);
    throw error;
  }
};

const verifyLoanTerms = async (loanId) => {
  try {
    const response = await axios.get(`https://loan-registry-api.com/terms?loanId=${loanId}`);
    return response.data.terms;
  } catch (error) {
    console.error('Error fetching loan terms:', error);
    throw error;
  }
};

const approveLoan = async (assetId, borrowerId, loanId) => {
  try {
    const assetValue = await verifyAssetValue(assetId);
    const borrowerInfo = await verifyBorrowerInformation(borrowerId);
    const loanTerms = await verifyLoanTerms(loanId);

    // Perform loan approval logic based on asset value, borrower information, and loan terms
    // This could involve credit checks, loan-to-value ratio checks, etc.

    return true; // Loan approved
  } catch (error) {
    console.error('Error approving loan:', error);
    throw error;
  }
};

exports.handler = async (input) => {
  const { assetId, borrowerId, loanId } = input;

  const isLoanApproved = await approveLoan(assetId, borrowerId, loanId);

  return {
    isLoanApproved,
    message: isLoanApproved ? 'Loan approved successfully' : 'Loan approval failed',
  };
};
