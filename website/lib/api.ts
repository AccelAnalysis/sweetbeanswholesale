
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz4aB_eR5i7FCEZiC3B_gf21L5U5qcGQguELzbPKRAQqrmZz6DNNEJO5LfsvnbKH3Ugyw/exec';

export interface SubmissionData {
  type: 'quote' | 'application' | 'inquiry' | 'subscription' | 'retail';
  [key: string]: unknown;
}

export async function submitToGoogleSheet(data: SubmissionData) {
  try {
    // We use no-cors mode because Google Apps Script redirects to a completion page
    // and CORS headers are sometimes tricky with GAS.
    // However, to send data reliable, we use 'text/plain' to avoid preflight options request
    // which GAS often rejects.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Opaque response
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data),
    });

    // With no-cors, we can't check response.ok or response.json()
    // We have to assume if fetch didn't throw, it was sent.
    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    throw error;
  }
}
