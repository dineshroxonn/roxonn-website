"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ComingSoonBadgeProps {
  message?: string;
  className?: string;
}

export function ComingSoonBadge({
  message = "This feature will be available after token launch",
  className,
}: ComingSoonBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="secondary"
            className={`cursor-help bg-gradient-to-r from-[#00C2FF] to-[#7000FF] text-white ${className}`}
          >
            Coming Soon
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
