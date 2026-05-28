import { cn } from "@/lib/utils";

type AiLoaderProps = {
  className?: string;
  label?: string;
};

export const Component = ({ className, label = "Generating" }: AiLoaderProps) => {
  return (
    <div className={cn("ai-loader-shell", className)} role="status" aria-label={label}>
      <div className="loader-wrapper" aria-hidden="true">
        {label.split("").map((letter, index) => (
          <span
            className="loader-letter"
            style={{ animationDelay: `${index * 0.08}s` }}
            key={`${letter}-${index}`}
          >
            {letter}
          </span>
        ))}

        <div className="loader"></div>
      </div>
    </div>
  );
};

