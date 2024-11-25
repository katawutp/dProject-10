"use client";

import Image from "next/image";
import { ConnectButton, MediaRenderer, useActiveAccount, useReadContract } from "thirdweb/react";
// import thirdwebIcon from "@public/thirdweb.svg";
import dprojectIcon from "@public/Logo_DProject.svg";
import { client } from "./client";
import { inAppWallet } from "thirdweb/wallets";
import { chain } from "./chain";
import { getContractMetadata } from "thirdweb/extensions/common";
import { contract } from "../../utils/contracts";

export default function Home() {
  const account = useActiveAccount ();

  const { data: contractMetadata } = useReadContract(
    getContractMetadata,
    {
      contract: contract,
    }
  );

  if(!account){
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20">
          <Header />

          <div className="flex justify-center mb-20">
          <ConnectButton locale={"en_US"}
              client={client}
              wallets={[ inAppWallet ({
                auth: {
                  options: [
                    "email",
                    "phone",
                  ]
                }
              }
              ) ]}
            />
            <p>&nbsp;&nbsp;</p>
            <ConnectButton locale={"de_DE"}
              client={client}
              appMetadata={{
                name: "Example App",
                url: "https://example.com",
              }}
            />
          </div>

          <ThirdwebResources />
        </div>
      </main>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "8px",
      }}>
        <ConnectButton locale={"en_US"}
          client={client}
          chain={chain}
        />
        {contractMetadata && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            marginTop: "20px",
          }}>
            <MediaRenderer
              client={client}
              src={contractMetadata.image}
              style={{
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      {/* <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      /> */}

      <Image
        src={dprojectIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />
      <p>&nbsp;&nbsp;</p>
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        dProject Login
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Register </span>
      </h1>

      <p className="text-zinc-300 text-base">
        ล็อกอินด้วยเบอร์โทรศัพท์มือถือ แล้วรอรับ{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          OTP
        </code>{" "}
        จากนำมากรอกในช่องด้านล่าง
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
