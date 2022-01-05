import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import WalletConnectProvider from "@walletconnect/web3-provider";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Fortmatic from "fortmatic";
import { providers } from "ethers";
import Web3Modal from "web3modal";

export default function Header() {
  async function connect() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "process.env.REACT_APP_INFURA_ID",
        },
      },
      burnerconnect: {
        package: BurnerConnectProvider,
        options: {
          defaultNetwork: "100",
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: "FORTMATIC_KEY",
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
      theme: "dark",
    });

    const provider = await web3Modal.connect();
    new providers.Web3Provider(provider);
  }

  return (
    <>
      <div>
        <nav>
          <div>
            <Link>EthStreamShop</Link>
            <ul>
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>Watch</Link>
              </li>
              <li>
                <Link>Add Merch</Link>
              </li>
              <li>
                <Link>Contact</Link>
              </li>
            </ul>
          </div>
          <button onClick={connect}>Connect</button>
        </nav>
      </div>
    </>
  );
}
