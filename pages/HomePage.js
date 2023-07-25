import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-4">
        You are a:
        <div>
          <Link
            className="px-4 py-2 text-lg bg-blue-600 text-white rounded drop-shadow"
            href="/student/login"
          >
            Student
          </Link>
          <br />
          <br />
          <Link
            className="px-4 py-2 text-lg bg-rose-600 text-white rounded drop-shadow"
            href="/proctor/login"
          >
            Proctor
          </Link>
          <br />
          <br />
          <Link
            className="px-4 py-2 text-lg bg-emerald-500 text-white rounded drop-shadow"
            href="/superproctor/login"
          >
            Superproctor
          </Link>
        </div>
      </div>
    </div>
  );
}
