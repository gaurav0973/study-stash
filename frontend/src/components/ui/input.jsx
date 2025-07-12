import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-white placeholder:text-gray-500 selection:bg-white/20 selection:text-white bg-zinc-900 border-zinc-700 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white",
        "focus-visible:border-white focus-visible:ring-white/30 focus-visible:ring-[2px]",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  );
}

export { Input };
