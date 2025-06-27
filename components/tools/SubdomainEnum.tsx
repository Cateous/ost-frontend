
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Network } from "lucide-react";

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
import { subdomainEnumSchema } from "@/lib/schemas";
import { runSubdomainEnumeration } from "@/app/actions";

export default function SubdomainEnum() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof subdomainEnumSchema>>({
    resolver: zodResolver(subdomainEnumSchema),
    defaultValues: {
      domain: "",
    },
  });

  async function onSubmit(values: z.infer<typeof subdomainEnumSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const res = await runSubdomainEnumeration(values.domain);
    if ("error" in res) {
      setError(res.error);
    } else {
      setResult(res.data);
    }
    setIsLoading(false);
  }

  return (
    <ToolCard
      title="Subdomain Enumeration"
      description="Find subdomains for a given domain."
      icon={<Network className="h-8 w-8 text-primary" />}
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
                  <Input placeholder="example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Enumerate
          </Button>
        </form>
      </Form>
      <ResultsDisplay isLoading={isLoading} result={result} error={error} />
    </ToolCard>
  );
}
