'use server';
/**
 * @fileOverview An AI agent to search content from a specific moment in a video using a screenshot.
 *
 * - searchContentFromMoment - A function that handles the content search process.
 * - SearchContentFromMomentInput - The input type for the searchContentFromMoment function.
 * - SearchContentFromMomentOutput - The return type for the searchContentFromMoment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchContentFromMomentInputSchema = z.object({
  screenshotDataUri: z
    .string()
    .describe(
      "A screenshot of a specific moment in a video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SearchContentFromMomentInput = z.infer<typeof SearchContentFromMomentInputSchema>;

const SearchContentFromMomentOutputSchema = z.object({
  relatedInformation: z.string().describe('Related information about the object or moment in the video.'),
  similarContent: z.array(z.string()).describe('A list of URLs of similar content.'),
});
export type SearchContentFromMomentOutput = z.infer<typeof SearchContentFromMomentOutputSchema>;

export async function searchContentFromMoment(input: SearchContentFromMomentInput): Promise<SearchContentFromMomentOutput> {
  return searchContentFromMomentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchContentFromMomentPrompt',
  input: {schema: SearchContentFromMomentInputSchema},
  output: {schema: SearchContentFromMomentOutputSchema},
  prompt: `You are an AI assistant that helps users find related information and similar content based on a screenshot from a video.

  Analyze the following screenshot and identify the objects, people, or scene in it. Then, find related information and similar content on the internet.

  Screenshot: {{media url=screenshotDataUri}}

  Return the related information and a list of URLs of similar content.
  `,
});

const searchContentFromMomentFlow = ai.defineFlow(
  {
    name: 'searchContentFromMomentFlow',
    inputSchema: SearchContentFromMomentInputSchema,
    outputSchema: SearchContentFromMomentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
