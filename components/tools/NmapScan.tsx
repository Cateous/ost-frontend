
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown, Radar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import ToolCard from "./ToolCard";
import ResultsDisplay from "../shared/ResultsDisplay";
import { nmapScanSchema } from "@/lib/schemas";
import { runNmapScan } from "@/app/actions";
import { cn } from "@/lib/utils";

const nmapFlags = [
  { label: "Ping Scan", value: "-sn" },
  { label: "Service Version Detection", value: "-sV" },
  { label: "Fast Scan", value: "-F" },
  { label: "Treat all hosts as online", value: "-Pn" },
  { label: "OS Detection", value: "-O" },
  { label: "Aggressive Scan", value: "-A" },
  { label: "Script Scan", value: "-sC" },
  { label: "Verbose Output", value: "-v" },
];

export default function NmapScan() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof nmapScanSchema>>({
    resolver: zodResolver(nmapScanSchema),
    defaultValues: {
      target: "",
      flags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof nmapScanSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const res = await runNmapScan(values.target, values.flags);
    if ("error" in res) {
      setError(res.error);
    } else {
      setResult(res.data);
    }
    setIsLoading(false);
  }

  return (
    <ToolCard
      title="Nmap Scan"
      description="Run network scans to discover hosts and services."
      icon={<Radar className="h-8 w-8 text-primary" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target IP or Domain</FormLabel>
                <FormControl>
                  <Input placeholder="scanme.nmap.org" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="flags"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Scan Options</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length > 0
                            ? `${field.value.length} selected`
                            : "Select flags"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search flags..." />
                        <CommandList>
                          <CommandEmpty>No flags found.</CommandEmpty>
                          <CommandGroup>
                            {nmapFlags.map((flag) => (
                              <CommandItem
                                key={flag.value}
                                onSelect={() => {
                                  const selectedFlags = field.value || [];
                                  const newFlags = selectedFlags.includes(flag.value)
                                    ? selectedFlags.filter((f) => f !== flag.value)
                                    : [...selectedFlags, flag.value];
                                  form.setValue("flags", newFlags, { shouldValidate: true });
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(flag.value)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {flag.label} ({flag.value})
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                <FormDescription>
                  If no option is selected, a Ping Scan (-sn) will be performed by default.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Run Scan
          </Button>
        </form>
      </Form>
      <ResultsDisplay isLoading={isLoading} result={result} error={error} />
    </ToolCard>
  );
}
