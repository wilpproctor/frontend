import { goFullscreen } from "../../lib/utils";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  function login() {
    if (process.env.NEXT_PUBLIC_BROWSER_LOCK == "true") {
      goFullscreen();
    }
    router.push("/student/exam");
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">DEMO</h1>
        <br />
        <button
          className="px-6 py-3 rounded bg-blue-300 font-semibold"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}
