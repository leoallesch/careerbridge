import Link from "next/link";
import FeatureCard from "@/components/dashboard/feature-card";

import landingimageone from "@/public/assets/landingimageone.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <main className="max-w-1xl mx-auto w-full flex flex-col items-center gap-12 flex-grow px-4">
        <div className="flex flex-col items-center gap-4 mt-40 mb-40">
          {" "}
          {/* Increased margin-top and margin-bottom */}
          <p className="text-gray-500 text-sm md:text-base">
            we know college isn&apos;t for everybody
          </p>
          <h1 className="text-5xl md:text-5xl font-bold ">
            Unlock Your <span className="text-blue-600">Future</span> in the
            Trades
          </h1>
        </div>
        <h1 className="text-5xl md:text-5xl font-bold ">
          Our <span className="text-blue-600">Platform</span>
        </h1>

        <div className="max-w-6xl mx-auto my-12 flex flex-col md:flex-row items-center gap-8 p-6">
          <div className="md:w-1/2 w-full">
            <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed">
              Learn more about how CareerBridge 2025 can help you find the
              perfect trade career with personalized guidance and resources.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-gray-600">
                Additional content or components can go here, like:
              </p>
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>

        <FeatureCard
          imageSrc={landingimageone.src} // Replace with your image path (e.g., an orange square)
          imageAlt="Matching System Visualization"
          title="Matching System"
          items={[
            "Get tailored industry and job recommendations based on your skills, interests, and aptitudes.",
            "Navigate different industries with immersive visualization tools.",
          ]}
          flipped={false} // Set to true to flip image to right and text to left
        />
        <FeatureCard
          imageSrc={landingimageone.src} // Replace with your image path (e.g., an orange square)
          imageAlt="Matching System Visualization"
          title="Matching System"
          items={[
            "Get tailored industry and job recommendations based on your skills, interests, and aptitudes.",
            "Navigate different industries with immersive visualization tools.",
          ]}
          flipped={true} // Set to true to flip image to right and text to left
        />
      </main>
    </div>
  );
}
