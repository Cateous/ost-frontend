
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Fingerprint } from "lucide-react";

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
import { whoisLookupSchema } from "@/lib/schemas";
import { runWhoisLookup } from "@/app/actions";

export default function WhoisLookup() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof whoisLookupSchema>>({
    resolver: zodResolver(whoisLookupSchema),
    defaultValues: {
      domain: "",
    },
  });

  async function onSubmit(values: z.infer<typeof whoisLookupSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const res = await runWhoisLookup(values.domain);
    if ("error" in res) {
      setError(res.error);
    } else {
      setResult(res.data);
    }
    setIsLoading(false);
  }

  return (
    <ToolCard
      title="WHOIS Lookup"
      description="Retrieve registration data for a domain name."
      icon={<Fingerprint className="h-8 w-8 text-primary" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Domain</FormLabel>
                <FormControl>
                  <Input placeholder="google.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Lookup
          </Button>
        </form>
      </Form>
      <ResultsDisplay isLoading={isLoading} result={result} error={error} />
    </ToolCard>
  );
}