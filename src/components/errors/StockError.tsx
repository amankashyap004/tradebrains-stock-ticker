import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import Button from "../ui/Button";

export default function StockError() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Head>
        <title>Error - Stock Details</title>
        <meta name="description" content="Invalid stock symbol" />
      </Head>

      <div className="bg-gradient-to-tr from-red-950 via-orange-950 to-yellow-950 rounded-2xl shadow-lg p-4 md:p-8 w-full max-w-md md:min-w-md text-center">
        <div className="flex justify-center mb-4">
          <MdErrorOutline className="text-red-400 text-8xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-red-300">
          Error
        </h1>
        <p className="text-red-300 mb-6">No stock symbol provided.</p>
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
