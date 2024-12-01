"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  description: string;
  date: string;
  status: "completed" | "current" | "upcoming";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative pl-8 md:pl-12"
        >
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-0.5",
              item.status === "completed"
                ? "bg-[#00C2FF]"
                : item.status === "current"
                ? "bg-gradient-to-b from-[#00C2FF] to-gray-200 dark:to-gray-800"
                : "bg-gray-200 dark:bg-gray-800"
            )}
          />
          <div
            className={cn(
              "absolute left-[-8px] top-1 h-4 w-4 rounded-full border-2",
              item.status === "completed"
                ? "border-[#00C2FF] bg-[#00C2FF]"
                : item.status === "current"
                ? "border-[#00C2FF] bg-white dark:bg-black"
                : "border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
            )}
          />
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h3
                className={cn(
                  "text-lg font-semibold",
                  item.status === "completed" && "text-[#00C2FF]"
                )}
              >
                {item.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.date}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
