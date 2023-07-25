import { useRouter } from "next/router";

export default function LoginPage() {
    const router = useRouter();

    function login() {
        router.push("/superproctor/dashboard");
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">DEMO</h1>
                <br />
                <button
                    className="px-6 py-3 rounded bg-rose-300 font-semibold"
                    onClick={login}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
