import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

interface StatsCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  description,
  icon,
}: StatsCardProps) => {
  return (
    <Card x-chunk="dashboard-05-chunk-1">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardDescription>{description}</CardDescription>
          {icon}
        </div>
        <CardTitle className="text-4xl">{title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default StatsCard;
