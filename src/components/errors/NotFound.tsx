"use client";

import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { MdSearchOff } from "react-icons/md";
import Button from "../ui/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Head>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="The page you are looking for does not exist"
        />
      </Head>

      <div className="bg-gradient-to-tr from-indigo-950 via-violet-950 to-purple-950 rounded-2xl shadow-lg p-4 md:p-8 w-full max-w-md md:min-w-md text-center">
        <div className="flex justify-center mb-4">
          <MdSearchOff className="text-indigo-300 text-8xl drop-shadow-lg" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-indigo-200">
          Page Not Found
        </h1>
        <p className="text-indigo-100 mb-6">
          The page you are looking for might have been moved or deleted.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
          <Link href="/" className="w-full">
            <Button className="w-full">Home</Button>
          </Link>
          <Button
            onClick={() => router.back()}
            variant="danger"
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
