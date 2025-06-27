
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ToolCard from "./ToolCard";
import ResultsDisplay from "../shared/ResultsDisplay";
import { dirBruteSchema } from "@/lib/schemas";
import { runDirBrute } from "@/app/actions";

export default function DirBrute() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof dirBruteSchema>>({
    resolver: zodResolver(dirBruteSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof dirBruteSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const res = await runDirBrute(values.url);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.data);
    }
    setIsLoading(false);
  }

  return (
    <ToolCard
      title="Directory Brute Force"
      description="Discover hidden directories and files on a web server."
      icon={<KeyRound className="h-8 w-8 text-primary" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Brute Force
          </Button>
        </form>
      </Form>
      <ResultsDisplay isLoading={isLoading} result={result} error={error} />
    </ToolCard>
  );
}
