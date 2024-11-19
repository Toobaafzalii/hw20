"use client";
import "../globals.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="w-full">
      <div
        className={`w-full h-20 ${
          isAuthPage ? "bg-blue-300" : "bg-orange-300 border-b-2"
        } flex justify-between items-center px-10 shadow-lg`}
      >
        <span className="underline decoration-wavy text-3xl font-bold text-white">
          Task Manager
        </span>
        <div className="flex justify-between items-center gap-y-6">
          {pathname === "/" && (
            <>
              <button
                className="py-1.5 px-3 mx-1 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
                onClick={() => router.push("/login")}
              >
                Log In
              </button>
              <button
                className="py-1.5 px-3 mx-1 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
          {isAuthPage && (
            <>
              <button
                className="py-1.5 px-3 mx-1 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
                onClick={() => router.push("/")}
              >
                Home
              </button>
              {pathname === "/login" ? (
                <button
                  className="py-1.5 px-3 mx-1 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </button>
              ) : (
                <button
                  className="py-1.5 px-3 mx-1 text-lg font-semibold text-gray-800 bg-gray-50 rounded-md shadow-md hover:bg-white hover:shadow-inner"
                  onClick={() => router.push("/login")}
                >
                  Log In
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
