"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 flex flex-col justify-center items-center text-white">
      <h1 className="text-6xl font-bold mb-6 text-center drop-shadow-lg">
        Welcome to{" "}
        <span className="underline decoration-wavy">Task Manager</span>
      </h1>

      <p className="text-lg py-6 text-center px-6 max-w-2xl drop-shadow-md">
        Manage your tasks with ease and stay ahead of your goals. Let’s make
        every day productive and stress-free!
      </p>

      <div className="w-3/4 md:w-1/2">
        <img src="./taskmanagerhomepage.png" className="rounded-lg shadow-xl" />
      </div>

      <footer className="mt-10 text-sm opacity-80 drop-shadow">
        <p className="font-bold text-lg">
          Boosting productivity, one task at a time.
        </p>
      </footer>
    </div>
  );
}
