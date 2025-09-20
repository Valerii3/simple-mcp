// Tool definition for getting business knowledge
export const getBusinessKnowledgeToolDefinition = {
    name: "get_business_knowledge",
    description: "Retrieve business knowledge and information",
    inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false
    }
};
// Handler function for the business knowledge tool
export async function handleGetBusinessKnowledge() {
    try {
        const businessKnowledge = `I am a professional photographer based in London, UK. Here are my key business details:

📸 **Services Offered:**
- Portrait photography (individual & family)
- Event photography (weddings, corporate events, parties)
- Commercial photography (product shots, headshots, lifestyle)
- Real estate photography
- Street photography workshops

🕒 **Working Hours:**
- Weekends: 9:00 AM - 5:00 PM (Saturday & Sunday)
- Weekdays: Available for consultations and post-processing
- Emergency shoots: Available with 24-hour notice

📍 **London Coverage Areas:**
- Central London (Westminster, City of London, Camden)
- North London (Islington, Hackney, Haringey)
- South London (Southwark, Lambeth, Wandsworth)
- East London (Tower Hamlets, Newham, Waltham Forest)
- West London (Kensington & Chelsea, Hammersmith & Fulham)

💰 **Pricing Structure:**
- Portrait sessions: £150-300 (1-2 hours)
- Event photography: £400-800 (4-8 hours)
- Commercial shoots: £200-500 per day
- Travel within London: Included
- Travel outside London: £0.50 per mile

📱 **Contact & Booking:**
- Email: hello@londonphotographer.co.uk
- Phone: +44 20 7123 4567
- Website: www.londonphotographer.co.uk
- Instagram: @london_photographer_pro

🎯 **Specializations:**
- Natural light photography
- Studio photography (access to professional studios in Shoreditch)
- Post-processing and retouching
- Photo editing and color grading
- Digital delivery within 48-72 hours

I pride myself on capturing authentic moments and providing a professional, friendly service to clients across London.`;
        return {
            content: [
                {
                    type: "text",
                    text: businessKnowledge
                }
            ]
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error retrieving business knowledge: ${error instanceof Error ? error.message : 'Unknown error'}`
                }
            ],
            isError: true
        };
    }
}
//# sourceMappingURL=business-knowledge.js.map