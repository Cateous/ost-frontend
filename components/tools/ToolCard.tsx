import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, children }) => {
  return (
    <Card className="bg-card/40 border-accent/20 backdrop-blur-md hover:border-accent/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-accent/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{icon}</div>
          <div className="flex-grow">
            <CardTitle className="font-headline tracking-tight text-2xl">{title}</CardTitle>
            <CardDescription className="mt-1 text-foreground/70">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default ToolCard;
