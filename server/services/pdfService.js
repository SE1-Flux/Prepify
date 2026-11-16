import pdfParse from 'pdf-parse';

/**
 * Extracts raw text and page counts from a PDF buffer.
 * @param {Buffer} dataBuffer - The binary buffer of the uploaded PDF
 * @returns {Promise<{text: string, numPages: number, info: object}>}
 */
export async function extractTextFromPDF(dataBuffer) {
  try {
    const data = await pdfParse(dataBuffer);
    
    // Clean up excessive whitespace and newline repetitions
    const cleanedText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return {
      text: cleanedText,
      numPages: data.numpages,
      info: data.info || {},
      wordCount: cleanedText.split(/\s+/).filter(Boolean).length,
    };
  } catch (error) {
    console.error('Error parsing PDF buffer:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}
