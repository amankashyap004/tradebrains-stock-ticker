import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineCloudOff } from "react-icons/md";
import Button from "../ui/Button";

interface ApiErrorProps {
  error?: {
    message?: string;
  };
}

export default function ApiError({ error }: ApiErrorProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Head>
        <title>API Error</title>
        <meta
          name="description"
          content="An error occurred while fetching data"
        />
      </Head>

      <div className="bg-gradient-to-tr from-indigo-950 via-blue-950 to-indigo-950 rounded-2xl shadow-lg p-4 md:p-8 w-full max-w-md md:min-w-md text-center">
        <div className="flex justify-center mb-4">
          <MdOutlineCloudOff className="text-pink-400 text-8xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-pink-300">
          API Error
        </h1>
        <p className="text-pink-300 mb-6">
          {error?.message || "An error occurred while fetching data"}
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
