import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  text: string;
}

const ErrorPage: React.FC<ErrorPageProps> = React.memo(({ text }) => {
  return (
    <section className="bg-destructive p-8 rounded-lg space-y-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-white">{text}</h1>
      <Link to={`/`}>
        <Button variant={"secondary"}>Go to Home page</Button>
      </Link>
    </section>
  );
});

export default ErrorPage;
