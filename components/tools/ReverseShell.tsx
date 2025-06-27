
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Terminal } from "lucide-react";

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
import { reverseShellSchema } from "@/lib/schemas";
import { generatePayload } from "@/app/actions";

export default function ReverseShell() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof reverseShellSchema>>({
    resolver: zodResolver(reverseShellSchema),
    defaultValues: {
      ip: "",
      port: "",
    },
  });

  async function onSubmit(values: z.infer<typeof reverseShellSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const res = await generatePayload(values.ip, values.port);
    if ("error" in res) {
      setError(res.error);
    } else {
      setResult(res.data);
    }
    setIsLoading(false);
  }

  return (
    <ToolCard
      title="Reverse Shell Generator"
      description="Generate one-liner reverse shell payloads for various platforms."
      icon={<Terminal className="h-8 w-8 text-primary" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local IP Address</FormLabel>
                  <FormControl>
                    <Input placeholder="10.10.10.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Port</FormLabel>
                  <FormControl>
                    <Input placeholder="4444" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Generate Payload
          </Button>
        </form>
      </Form>
      <ResultsDisplay isLoading={isLoading} result={result} error={error} />
    </ToolCard>
  );
}
