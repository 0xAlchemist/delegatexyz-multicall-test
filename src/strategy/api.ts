import { Address, http, formatUnits } from "viem"
import { mainnet } from "viem/chains";
import { DelegateV1, DelegateV2 } from "@delegatexyz/sdk"
import { publicClient } from "../client";
import { balanceOfABI } from "../abi/balanceOf";
import { CONTRACT_ADDRESSES, TEST_ACCOUNTS } from "../constants";

const RPC_URL = mainnet.rpcUrls.default.http.toString();
const v1 = new DelegateV1(http(RPC_URL))
const v2 = new DelegateV2(http(RPC_URL))

const getVaultBalance = async (contract: Address, vault: Address) => {
  return await publicClient.readContract({
    address: contract,
    abi: balanceOfABI,
    functionName: 'balanceOf',
    args: [vault]
  })
}

const checkDelegatedBalances = async (contract: Address, address: Address) => {
  const v1Delegations = await v1.getDelegationsByDelegate(address)
  const v2Delegations = await v2.getIncomingDelegations(address)
  let balance = 0;

  if (v2Delegations.length) {
    for (const delegation of v2Delegations) {
      balance += (parseInt(formatUnits(await getVaultBalance(contract, delegation.from), 0)))
    }
  } else if (v1Delegations.length) {
    for (const delegation of v1Delegations) {
      balance += (parseInt(formatUnits(await getVaultBalance(contract, delegation.vault), 0)))
    }
  }

  return balance;
}

console.log("test should pass", await checkDelegatedBalances(CONTRACT_ADDRESSES.BAYC_CONTRACT, TEST_ACCOUNTS[0]));
console.log("test should pass", await checkDelegatedBalances(CONTRACT_ADDRESSES.MAYC_CONTRACT, TEST_ACCOUNTS[1]));
console.log("test should fail", await checkDelegatedBalances(CONTRACT_ADDRESSES.BAYC_CONTRACT, TEST_ACCOUNTS[2]));
console.log("test should fail", await checkDelegatedBalances(CONTRACT_ADDRESSES.MAYC_CONTRACT, TEST_ACCOUNTS[2]));