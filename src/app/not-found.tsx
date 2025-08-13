import React from "react";
import { Metadata } from "next";
import NotFound from "@/components/errors/NotFound";
import Container from "@/components/common/Container";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist",
};

export default function NotFoundPage() {
  return (
    <Container>
      <NotFound />
    </Container>
  );
}
