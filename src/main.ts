import { Address, http, formatUnits } from "viem"
import { mainnet } from "viem/chains";
import { DelegateV1, DelegateV2 } from "@delegatexyz/sdk"
import { publicClient } from "./client";
import { balanceOfABI } from "./abi/balanceOf";

const BAYC_CONTRACT = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
const MAYC_CONTRACT = "0x60E4d786628Fea6478F785A6d7e704777c86a7c6"

const OxALCHEMIST = "0x9fBDD6437840641B5dEDE244B084D31e109A0F23"
const NOBAYCTEST = "0x494651a4d47F0defE93Ad736684fA5a2F2456e52"
const DAREMAYCTEST = "0xfcc2a29fe057ad15aaec24db16f382e83d3f28ed"

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

console.log("test should pass", await checkDelegatedBalances(BAYC_CONTRACT, OxALCHEMIST));
console.log("test should pass", await checkDelegatedBalances(MAYC_CONTRACT, DAREMAYCTEST));
console.log("test should fail", await checkDelegatedBalances(BAYC_CONTRACT, NOBAYCTEST));
console.log("test should fail", await checkDelegatedBalances(MAYC_CONTRACT, NOBAYCTEST));