import { Metadata } from "next";
import App from "@/components/pages/app";

// Use direct URL for production
const APP_URL = "https://risdalu.vercel.app";

const frame = {
  version: "next",
  imageUrl: `${APP_URL}/images/feed.png`,
  button: {
    title: "Claim RIS Tokens",
    action: {
      type: "launch_frame",
      name: "Risdalu Token Claim",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#8B5CF6",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Risdalu Token Claim",
    openGraph: {
      title: "Risdalu Token Claim",
      description: "Claim 1 ETH worth of RIS tokens every 24 hours on Monad Testnet",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}
