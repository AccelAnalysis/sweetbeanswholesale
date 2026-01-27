
import type { AppData } from "./types"

export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzyOc93Go01RYjYbvFA_uoKvwkqu-uJMhBqOsavZ64qdlNK2Ad7DZTSBvHo5VW7VTFs5g/exec';

export interface SubmissionData {
  type: 'quote' | 'application' | 'inquiry' | 'subscription' | 'retail' | 'join_team' | 'sync_data';
  payload?: AppData;
  [key: string]: unknown;
}

export async function submitToGoogleSheet(data: SubmissionData) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data),
    });
    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    throw error;
  }
}

export async function fetchSiteData(): Promise<AppData | null> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function saveSiteData(data: AppData) {
  return submitToGoogleSheet({
    type: 'sync_data',
    payload: data
  });
}
