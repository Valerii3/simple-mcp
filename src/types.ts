/**
 * Arguments for get_business_knowledge tool
 */
export interface BusinessKnowledgeArgs {
    // No arguments needed for this simple tool
}

/**
 * Business knowledge response structure
 */
export interface BusinessKnowledgeResponse {
    knowledge: string;
    timestamp: string;
}
