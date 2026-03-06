/**
 * ComplexityDetector
 *
 * Analyzes questions to determine their complexity score (0-1).
 * This helps the router select the appropriate model:
 *   - Simple questions (0-0.3) → Fast models (8b-instant)
 *   - Medium questions (0.3-0.6) → Depends on quota, fallback to fast
 *   - Complex questions (0.6-1.0) → Quality models (70b-versatile)
 */

export class ComplexityDetector {
    constructor() {
        // Keywords that indicate complexity
        this.complexKeywords = [
            'analyser', 'expliquer', 'détailler', 'développer', 'comparer',
            'contraster', 'critiquer', 'évaluer', 'justifier', 'argumenter',
            'synthétiser', 'démontrer', 'pourquoi', 'comment', 'en quoi',
            'différence entre', 'relation entre', 'lien entre', 'implications de'
        ];

        this.simpleKeywords = [
            "c'est quoi", 'définir', 'définition de', 'qui est', 'quoi est',
            'quel est', 'quelle est', 'liste', 'énumérer', 'citer', 'nommer',
            'vrai ou faux', 'oui ou non'
        ];

        // Context indicators
        this.contextKeywords = [
            'chapitre', 'page', 'section', 'partie', 'cours', 'selon',
            'référence', 'document', 'texte', 'auteur'
        ];
    }

    /**
     * Analyze a question and return complexity assessment
     * 
     * @param {string} question - The question to analyze
     * @param {object} context - Optional context (courseId, chapterId, pageId)
     * @returns {object} { score: 0-1, category: 'simple'|'medium'|'complex', factors: {...} }
     */
    analyze(question, context = {}) {
        const factors = {
            length: this.analyzeLengthComplexity(question),
            keywords: this.analyzeKeywordComplexity(question),
            structure: this.analyzeStructureComplexity(question),
            context: this.analyzeContextComplexity(question, context),
            questionType: this.analyzeQuestionType(question)
        };

        // Weighted scoring (reduced overall to favor simple/medium)
        const score = (
            factors.length * 0.10 +
            factors.keywords * 0.25 +
            factors.structure * 0.20 +
            factors.context * 0.10 +
            factors.questionType * 0.15
        );

        // Apply dampening factor to reduce scores
        const dampenedScore = score * 0.8;

        // Clamp to 0-1
        const finalScore = Math.max(0, Math.min(1, dampenedScore));

        return {
            score: finalScore,
            category: this.getCategory(finalScore),
            factors,
            recommendation: this.getModelRecommendation(finalScore)
        };
    }

    /**
     * Analyze complexity based on question length
     */
    analyzeLengthComplexity(question) {
        const length = question.length;

        if (length < 80) return 0.1; // Short questions are usually simple
        if (length < 150) return 0.3;
        if (length < 250) return 0.5;
        if (length < 400) return 0.7;
        return 0.9; // Very long questions need detailed answers
    }

    /**
     * Analyze complexity based on keywords
     */
    analyzeKeywordComplexity(question) {
        const lowerQuestion = question.toLowerCase();

        // Check for simple keywords
        const hasSimpleKeywords = this.simpleKeywords.some(keyword =>
            lowerQuestion.includes(keyword)
        );

        if (hasSimpleKeywords) return 0.1;

        // Check for complex keywords
        const complexMatches = this.complexKeywords.filter(keyword =>
            lowerQuestion.includes(keyword)
        );

        if (complexMatches.length === 0) return 0.4; // Neutral
        if (complexMatches.length === 1) return 0.6;
        if (complexMatches.length === 2) return 0.8;
        return 1.0; // Multiple complex keywords
    }

    /**
     * Analyze complexity based on sentence structure
     */
    analyzeStructureComplexity(question) {
        // Split by sentence-ending punctuation
        const sentences = question.split(/[.!?]+/).filter(s => s.trim().length > 0);

        // Single sentence
        if (sentences.length === 1) {
            // Check if it's a compound sentence (with 'et', 'ou', 'mais', etc.)
            const hasConjunctions = /\b(et|ou|mais|donc|car|parce que|puisque|comme)\b/i.test(question);
            return hasConjunctions ? 0.5 : 0.2;
        }

        // Multiple sentences indicate more complex question
        if (sentences.length === 2) return 0.6;
        if (sentences.length === 3) return 0.8;
        return 1.0;
    }

    /**
     * Analyze complexity based on context requirements
     */
    analyzeContextComplexity(question, context) {
        const lowerQuestion = question.toLowerCase();

        // Check if question references specific context
        const hasContextReference = this.contextKeywords.some(keyword =>
            lowerQuestion.includes(keyword)
        );

        // If context is provided and referenced, it's more complex
        if (hasContextReference && (context.courseId || context.chapterId || context.pageId)) {
            return 0.7;
        }

        // If context is referenced but not provided, still somewhat complex
        if (hasContextReference) {
            return 0.5;
        }

        // General question without specific context
        return 0.3;
    }

    /**
     * Analyze question type
     */
    analyzeQuestionType(question) {
        const lowerQuestion = question.toLowerCase();

        // Factual recall (simple)
        if (/^(qui|quoi|quel|quelle|où|quand)\b/i.test(question)) {
            return 0.2;
        }

        // How/why questions (more complex)
        if (/^(comment|pourquoi|en quoi)\b/i.test(question)) {
            return 0.8;
        }

        // Comparison questions
        if (/différence|comparer|contraster|vs|versus/i.test(question)) {
            return 0.7;
        }

        // Explanation requests
        if (/expliqu|détaill|développ/i.test(question)) {
            return 0.6;
        }

        // Default: neutral
        return 0.4;
    }

    /**
     * Get complexity category
     */
    getCategory(score) {
        if (score < 0.4) return 'simple';  // Increased threshold
        if (score < 0.7) return 'medium';  // Increased threshold
        return 'complex';
    }

    /**
     * Get model recommendation based on score
     */
    getModelRecommendation(score) {
        if (score < 0.3) {
            return {
                primary: { provider: 'groq', model: 'llama-3.1-8b-instant' },
                fallback: { provider: 'gemini', model: 'gemini-2.0-flash-exp' }
            };
        }

        if (score < 0.6) {
            return {
                primary: { provider: 'groq', model: 'llama-3.3-70b-versatile' },
                fallback: { provider: 'groq', model: 'llama-3.1-8b-instant' }
            };
        }

        // Complex questions
        return {
            primary: { provider: 'groq', model: 'llama-3.3-70b-versatile' },
            fallback: { provider: 'gemini', model: 'gemini-2.0-flash-exp' }
        };
    }

    /**
     * Batch analyze multiple questions (useful for analytics)
     */
    batchAnalyze(questions) {
        return questions.map(q => ({
            question: q.question,
            analysis: this.analyze(q.question, q.context)
        }));
    }

    /**
     * Get statistics for a batch of analyses
     */
    getStats(analyses) {
        const scores = analyses.map(a => a.analysis.score);
        const categories = analyses.reduce((acc, a) => {
            acc[a.analysis.category] = (acc[a.analysis.category] || 0) + 1;
            return acc;
        }, {});

        return {
            total: analyses.length,
            avgScore: scores.reduce((sum, s) => sum + s, 0) / scores.length,
            minScore: Math.min(...scores),
            maxScore: Math.max(...scores),
            categories
        };
    }
}

// Singleton instance
export const complexityDetector = new ComplexityDetector();
export default complexityDetector;
