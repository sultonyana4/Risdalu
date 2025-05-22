# Risdalu Token Claim

A Farcaster Mini App that allows users to claim RIS tokens on Monad Testnet.

![Risdalu Logo](public/images/icon.png)

## Overview

Risdalu Token Claim is a Mini App built for the Farcaster ecosystem that enables users to claim RIS tokens on Monad Testnet. Users can claim tokens once per 24-hour period, directly from within the Warpcast client.

## Features

- **Token Claiming**: Claim 1 ETH worth of RIS tokens every 24 hours
- **Wallet Connection**: Seamless connection with Warpcast wallet
- **Network Check**: Automatic verification of Monad Testnet connection
- **Token Balance**: View your current RIS token balance
- **Countdown Timer**: See when you can claim tokens again

## Live Demo

You can try the app live at [https://risdalu.vercel.app](https://risdalu.vercel.app)

## Technology Stack

- **Framework**: Next.js
- **Smart Contract Integration**: Viem, Wagmi
- **Blockchain**: Monad Testnet
- **Farcaster Integration**: Frame SDK

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sultonyana4/Risdalu.git
   cd Risdalu
   ```

2. Install dependencies:
   ```bash
   yarn
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the `NEXT_PUBLIC_URL` in `.env.local` to your deployment URL or local development URL.

4. Start the development server:
   ```bash
   yarn dev
   ```

## Smart Contract

The Risdalu Token Claim contract is deployed on Monad Testnet. It allows users to:
- Claim 1 ETH worth of RIS tokens every 24 hours
- Check their last claim time
- View their token balance

## Testing with Warpcast

To test your local development with Warpcast:

1. Install `cloudflared`:
   ```bash
   # On Windows
   winget install Cloudflare.Cloudflared
   
   # On macOS
   brew install cloudflared
   ```

2. Create a tunnel:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```

3. Update your `.env.local` with the tunnel URL:
   ```
   NEXT_PUBLIC_URL="https://your-tunnel-url.trycloudflare.com"
   ```

4. Test in Warpcast's [Mini App Debug Tool](https://warpcast.com/~/developers/mini-apps/embed)

## Deployment

This app is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set the environment variable `NEXT_PUBLIC_URL` to your production URL

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions, feel free to reach out:
- GitHub: [sultonyana4](https://github.com/sultonyana4)
- Farcaster: @sultonyana4

## Acknowledgements

- Built using the [Monad Farcaster MiniApp Template](https://github.com/monad-developers/monad-miniapp-template)
- Powered by [Farcaster](https://www.farcaster.xyz/)
- Running on [Monad](https://www.monad.xyz/) Testnet