/**
 * @description Cosine Similarity computation for vector responses of LLms
 */

export function consineSimilarity(vecA: number[], vecB: number[]): number{
    if(vecA.length !== vecB.length){
        throw new Error('Vectors must be of smae length');
    }


    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudB = Math.sqrt(vecA.reduce((sum, b) => sum + b * b, 0));

    if(magnitudA === 0 || magnitudB === 0){
        throw new Error('One of the vectors has zero magnitud')
    }

    return dotProduct / (magnitudA * magnitudB);

}