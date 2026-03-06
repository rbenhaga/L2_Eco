import { Math as LaTeX } from '../../../components/Math';

interface RenderWithMathProps {
    text: string;
    className?: string;
}

export function RenderWithMath({ text, className = '' }: RenderWithMathProps) {
    if (!text) return null;

    // Split by $...$ delimiters to handle inline math
    // e.g. "Calculer $P(X)$" -> ["Calculer ", "$P(X)$"]
    const parts = text.split(/(\$[^\$]+\$)/g);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.startsWith('$') && part.endsWith('$')) {
                    // Extract content between $
                    const content = part.slice(1, -1);
                    return <LaTeX key={index}>{content}</LaTeX>;
                }
                // Render text with line breaks if any
                return <span key={index} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br/>') }} />;
            })}
        </span>
    );
}
