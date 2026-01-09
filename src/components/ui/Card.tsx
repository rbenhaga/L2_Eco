import * as React from "react"
import { cn } from "../../utils/cn"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "ghost";
}

/**
 * Card primitive — Anti-tetris design
 * Default: hairline ring (no visible border), subtle shadow
 * Outline: visible border (rare use)
 * Ghost: no ring, no shadow (for nested surfaces)
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variants = {
            default: [
                "bg-card dark:bg-zinc-900",
                "ring-1 ring-black/[0.05] dark:ring-white/[0.06]",
                "shadow-sm",
                "dark:shadow-none",
                "transition-shadow duration-200"
            ].join(" "),
            outline: [
                "bg-card dark:bg-zinc-900",
                "border border-border dark:border-zinc-800",
                "hover:border-gray-300 dark:hover:border-zinc-700",
                "transition-colors duration-200"
            ].join(" "),
            ghost: [
                "bg-transparent"
            ].join(" ")
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-2xl",
                    variants[variant],
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-5", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-5 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
