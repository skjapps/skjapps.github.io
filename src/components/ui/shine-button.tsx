import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ShineButtonProps extends React.ComponentProps<typeof Button> {
  backgroundImage?: string;
}

const ShineButton = React.forwardRef<HTMLButtonElement, ShineButtonProps>(
  ({ className, backgroundImage, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "group relative overflow-hidden p-0 bg-center bg-no-repeat bg-[length:80%] rounded-2xl text-white shadow-lg transition-colors duration-300 cursor-pointer bg-neutral-200 hover:bg-neutral-300",
          className
        )}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        {...props}
      >
        {/* Shine effect */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white/40 rotate-[30deg] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:translate-x-[200%]"
          style={{ transformOrigin: "50% 50%" }}
        />
        {children}
      </Button>
    );
  }
);
ShineButton.displayName = "ShineButton";

export { ShineButton }; 