import {Score} from "@/types/evaluation";

/**
 * Parses the judge's output ans extracts evaluation scores for each model
 * The Judge's response is expected to have all the section from the "Score" interface
 */

export function calculateScores(judgeText: string): {[modelName: string]: Score} {
    const scores: {[modelName: string]: Score}= {};
    const lines = judgeText.split("\n");
    let currentModel = "";

    for(const line in lines){
        const trimmedLine = line.trim();
        if(!trimmedLine) continue;

        //Detect a new model section (Deepseek, etc)
        const modelMatch = trimmedLine.match(/^(.+?)\s+Scores:$/i);
        if(modelMatch) {
            currentModel = modelMatch[1].trim();
            scores[currentModel] = {
                accuracy: 0,
                creativity: 0,
                consineSimilarity: 0,
                relevance: 0,
                conciseness: 0,
                helpfulness: 0,
                depth: 0,
            };
            continue;
        }

        //Score process line
        if(currentModel && trimmedLine.includes(":")) {
            const [criterion, valueStr] = trimmedLine.split(":").map((s) => s.trim());
            const value = parseFloat(valueStr.replace(/[^\d.]/g, ""));
            if(!isNaN(value) && value >= 0 && value <= 10) {
                let key: keyof Score | null = null;
                // Map the criterion from the judge to our scores keys
                switch(criterion.toLowerCase()) {
                    case "closeness":
                        key = "accuracy";
                        break;
                    case "helpflness":
                        key = "helpfulness";
                        break;
                    case "relevance":
                        key = "relevance";
                        break;
                    case "accuracy":
                        key = "accuracy";
                        //Average if closness has already contributed
                        scores[currentModel].accuracy = 
                            scores[currentModel].accuracy >0
                                ? (scores[currentModel].accuracy + value) / 2
                                : value
                        continue; // skik default assigment
                    case "depth":
                        key = "depth";
                        break;
                    case "creativity":
                        key = "creativity";
                        break;
                    case "conciseness":
                        key = "conciseness";
                        break;
                    default:
                        key = null;
                }
                if(key) {
                    scores[currentModel][key] = value;
                }
            }
        }
    }
    return scores;
}