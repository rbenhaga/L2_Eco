/**
 * Input Validation Middleware
 *
 * Validates and sanitizes input for AI requests
 */

/**
 * Validate chat request body
 */
export function validateChatRequest(req, res, next) {
    const { question, context } = req.body;

    // Validate question
    if (!question) {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Missing required field: question',
            field: 'question'
        });
    }

    if (typeof question !== 'string') {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Field "question" must be a string',
            field: 'question'
        });
    }

    if (question.trim().length === 0) {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Question cannot be empty',
            field: 'question'
        });
    }

    if (question.length > 5000) {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Question too long (max 5000 characters)',
            field: 'question',
            maxLength: 5000
        });
    }

    // Validate context (optional)
    if (context !== undefined && typeof context !== 'object') {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Field "context" must be an object',
            field: 'context'
        });
    }

    // Sanitize question
    req.body.question = question.trim();

    // Sanitize context
    if (context) {
        req.body.context = {
            courseId: sanitizeString(context.courseId),
            chapterId: sanitizeString(context.chapterId),
            pageId: sanitizeString(context.pageId)
        };
    } else {
        req.body.context = {};
    }

    next();
}

/**
 * Validate feedback request
 */
export function validateFeedbackRequest(req, res, next) {
    const { chatHistoryId, feedback } = req.body;

    if (!chatHistoryId) {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Missing required field: chatHistoryId',
            field: 'chatHistoryId'
        });
    }

    if (typeof chatHistoryId !== 'number' && typeof chatHistoryId !== 'string') {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Field "chatHistoryId" must be a number or string',
            field: 'chatHistoryId'
        });
    }

    if (!feedback || !['positive', 'negative'].includes(feedback)) {
        return res.status(400).json({
            error: 'ValidationError',
            message: 'Field "feedback" must be "positive" or "negative"',
            field: 'feedback',
            allowedValues: ['positive', 'negative']
        });
    }

    next();
}

/**
 * Sanitize string input
 */
function sanitizeString(value) {
    if (!value || typeof value !== 'string') return null;

    // Remove potentially harmful characters
    return value
        .trim()
        .replace(/[<>]/g, '') // Remove < and >
        .substring(0, 200); // Max length
}

export default { validateChatRequest, validateFeedbackRequest };
