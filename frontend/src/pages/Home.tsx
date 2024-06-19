/* eslint-disable no-unused-vars */
import bg from "../assets/Main.jpg";
import { NavBar } from "../component/NavBar";

export function Home() {
  localStorage.removeItem("SignInToken");
  localStorage.removeItem("SignUpToken");
  localStorage.removeItem("Name");

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                    Discover the Best Insights on ThoughtStream
                  </h1>
                  <p className="max-w-lg text-gray-600 md:text-xl dark:text-gray-400">
                    Explore a curated collection of thought-provoking articles and insights.
                  </p>
                </div>
              </div>
              <img
                src={bg}
                alt="Hero"
                className="mx-auto aspect-w-16 aspect-h-9 overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 ThoughtStream. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
