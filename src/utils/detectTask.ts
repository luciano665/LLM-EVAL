export function detectTaskType(question: string): 'factual' | 'creative' | 'analytical' {
    // Define keyword groups with regex boundary matching to prevent false positives
    const factualKeywords = /\b(what|when|where|who|which|how many|date|time|year)\b/;
    const creativeKeywords = /\b(write|create|imagine|story|design|describe|generate|compose)\b/;
    const analyticalKeywords = /\b(analyze|compare|evaluate|explain|why|how|assess|critique|interpret)\b/;

    // Normalize the question to lower case for case-insestitive matching
    const normalizedQuestion = question.toLowerCase().trim();

    // Check for exact keyword matched using regex
    if(factualKeywords.test(normalizedQuestion)){
        return 'factual';
    } else if(creativeKeywords.test(normalizedQuestion)){
        return 'creative';
    } else if(analyticalKeywords.test(normalizedQuestion)){
        return 'analytical';
    }

    // If unclear, default case factual
    return 'factual';
}