import Link from "next/link";
import FeatureCard from "@/components/dashboard/feature-card";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

import landingimageone from "@/public/assets/landingimageone.png";
import landingimagetwo from "@/public/assets/landingimagetwo.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <main className="max-w-1xl mx-auto w-full flex flex-col items-center gap-10 flex-grow px-4">
        <div className="flex flex-col items-center gap-4 mt-40 mb-40">
          {" "}
          {/* Increased margin-top and margin-bottom */}
          <p className="text-gray-500 text-sm md:text-base">
            we know college isn&apos;t for everybody
          </p>
          <h1 className="text-5xl md:text-5xl font-bold ">
            Unlock Your <span className="text-primary">Future</span> in the
            Trades
          </h1>
          <Button
            variant="outline"
            asChild
            className="bg-primary text-white font-semibold text-lg py-3 px-6 rounded-md hover:bg-primary hover:text-white hover:scale-105"
          >
            <Link href="/dashboard" className="flex items-center justify-between">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <h1 className="text-4xl md:text-4xl font-bold ">
          Our <span className="text-primary">Platform</span>
        </h1>

        <p className="text-gray-700 text-2xl md:text-2xl font-bold leading-relaxed">
          Many students embark on their educational journey without a clear career direction, often overlooking rewarding opportunities in the skilled trades. Meanwhile, industries face critical labor shortages, offering high-demand, well-paying jobs.
        </p>

        <div className="max-w-6xl mx-auto my-12 flex flex-col md:flex-row items-center gap-5 p-6">
          <div className="md:w-1/2 w-full">
            <p className="text-lg md:text-lg font-semibold leading-relaxed">
              contentbridge is here to bridge the gap, helping students explore, evaluate, and connect with the right trade school opportunities through an interactive, data-driven platform. If you'd like to take a dive, click here to
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-gray-600">
                Learn more about how CareerBridge 2025 can help you find the perfect trade career with personalized guidance and resources. If you'd like to take a dive, click here to
              </p>
              <Link href="/signup" className="text-primary hover:underline">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-4xl font-bold ">
          Our <span className="text-primary">Technology</span>
        </h1>

        <FeatureCard
          imageSrc={landingimageone.src} // Replace with your image path (e.g., an orange square)
          imageAlt="AI Skill Matching System"
          title="AI Skill Matching System"
          items={[
            "Get tailored industry and job recommendations based on your skills, interests, and aptitudes.",
            "Navigate different industries with immersive visualization tools.",
          ]}
          flipped={false} // Set to true to flip image to right and text to left
        />
        <FeatureCard
          imageSrc={landingimagetwo.src} // Replace with your image path (e.g., an orange square)
          imageAlt="Interactive Salary and ROI Visualizations"
          title="Interactive Salary and ROI Visualizations"
          items={[
            "Stay informed with up-to-date salary insights, industry demand, and career growth potential.",
            "Evaluate different educational paths side by side to make informed decisions",
          ]}
          flipped={true} // Set to true to flip image to right and text to left
        />
      </main>
    </div>
  );
}
