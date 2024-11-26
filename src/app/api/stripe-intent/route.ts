import Stripe from "stripe";

import { NextResponse } from 'next/server';

const { STRIPE_SECRET_KEY } = process.env;

export async function POST(req: Request) {
    if (!STRIPE_SECRET_KEY) {
        throw new Error('Stripe secret key not found');
    }

    const stripe = require('stripe')(STRIPE_SECRET_KEY);
    const { buyerWalletAddress } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "thb",
        description: "คูปองใช้งาน KokKok dApp ในรูปแบบของ NFT สินทรัพย์ดิจิทัล",
        payment_method_types: ["card"],
        metadata: { buyerWalletAddress },
    });

    return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
    });
}

const { STRIPE_SECRET_KEY } = process.env;

export async function POST(req: Request) {
    if(!STRIPE_SECRET_KEY){
        throw new Error('Stripe secret key not found');
    }

    const { buyerWalletAddress } = await req.json();
    if (!buyerWalletAddress){
        throw new Error('Buyer wallet address not found');
    }

    const stripe = new Stripe(
        process.env.STRIPE_SECRET_KEY as string,
        {
            apiVersion: "2024-11-20.acacia"    
        }
         
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 10_00,
        currency: "usd",
        description: "คูปองใช้งาน KokKok dApp ในรูปแบบของ NFT สินทรัพย์ดิจิทัล",
        payment_method_types: ["card"],
        metadata: { buyerWalletAddress }
    });

    return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
    })
}