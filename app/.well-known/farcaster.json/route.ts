import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    // You need to generate your own account association credentials
    accountAssociation: {
      header: "eyJmaWQiOjEwODcyMzIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhlODE1YTkwNzQ4OEIwNzZDMkU0MzljMWQxMDUzZDc5MEJGMUNEOWEwIn0",
      payload: "eyJkb21haW4iOiJyaXNkYWx1LnZlcmNlbC5hcHAifQ",
      signature: "MHg1YTliMzJjZDhjNjQ4NjE2YWI0MzZmZGVmYmEyMmE4Mjk5YzA4YjBhOTc5OWIyZjVkYWY5NTA4YjY2YTdlODEwNTk5ZGI1YTY2ZjBjN2ZlZmQ4YWZkMTBhODQ2NDI1MjZlOTZjZGUyOTU0NjMyZDVmNzhkZmU4YjUyZjlkNTM0ZTFj"
    },
    frame: {
      version: "1",
      name: "Risdalu Token Claim",
      iconUrl: "https://risdalu.vercel.app/images/icon.png",
      homeUrl: "https://risdalu.vercel.app",
      imageUrl: "https://risdalu.vercel.app/images/feed.png",
      screenshotUrls: [],
      tags: ["risdalu", "token", "claim", "defi"],
      primaryCategory: "finance",
      buttonTitle: "Claim RIS Tokens",
      splashImageUrl: "https://risdalu.vercel.app/images/splash.png",
      splashBackgroundColor: "#8B5CF6",
      webhookUrl: "https://risdalu.vercel.app/api/webhook",
      network: "monad-testnet",
      chainId: 10143,
    },
  };

  return NextResponse.json(farcasterConfig);
}
