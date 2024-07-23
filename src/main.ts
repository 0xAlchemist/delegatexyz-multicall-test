import { multicall } from "./utils";
import { getEthersProvider } from "./ethers-provider";
import { CONTRACT_ADDRESSES, TEST_ACCOUNTS, DELEGATE_V2_ABI } from "./constants";
import { config } from "./wagmi";
import { Address } from "viem";

const provider = getEthersProvider(config);
const blockTag = 'latest';

try {
  const response = await multicall(
    "1",
    provider,
    DELEGATE_V2_ABI,
    TEST_ACCOUNTS.map((address: Address) => [
      CONTRACT_ADDRESSES.DELEGATE_CONTRACT_ADDRESS,
      'getIncomingDelegations',
      [address]
    ]),
    { blockTag }
  );
  console.log(response);
} catch(error) {
  console.error(error);
}