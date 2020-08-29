#!/usr/bin/env node

import Vibrant from "node-vibrant";
import fetch from "node-fetch";
import Web3 from "web3";
import fs from "fs";
import { TokenData } from ".";

interface ZeroExTokenResponse {
  records: {
    symbol: string;
    address: string;
    decimals: number;
  }[];
}

const fetchDataAndWriteJSON = async () => {
  console.log("Writing Rari tokens file to: " + process.argv[2]);

  const _zeroExResponse = await fetch(
    "https://api.0x.org/swap/v0/tokens"
  ).then((response) => response.json());

  const tokenData = _zeroExResponse as ZeroExTokenResponse;

  let tokens: TokenData = {};

  for (const token of tokenData.records) {
    const logoURL = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${Web3.utils.toChecksumAddress(
      token.address
    )}/logo.png`;

    let color;
    try {
      color = await Vibrant.from(logoURL)
        .getPalette()
        .then((palette) => palette.Vibrant.getHex());
    } catch (error) {
      tokens[token.symbol] = {
        address: token.address,
        decimals: token.decimals,
        color: "#FFFFFF",
        logoURL:
          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg",
      };

      continue;
    }

    tokens[token.symbol] = {
      address: token.address,
      decimals: token.decimals,
      color: color,
      logoURL,
    };
  }

  fs.writeFileSync(process.argv[2], JSON.stringify(tokens));
};

fetchDataAndWriteJSON();
