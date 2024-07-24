import { multicall } from "./utils";
import { getEthersProvider } from "./ethers-provider";
import {
  CONTRACT_ADDRESSES,
  TEST_ACCOUNTS,
  DELEGATE_V2_ABI,
} from "./constants";
import { config } from "./wagmi";
import { Address } from "viem";
import { BigNumber, Bytes } from "ethers";

const provider = getEthersProvider(config);
const blockTag = "latest";

enum DelegationType {
  NONE,
  ALL,
  CONTRACT,
  ERC721,
  ERC20,
  ERC1155,
}

interface Delegation {
  type_: DelegationType;
  to: Address;
  from: Address;
  rights: Bytes;
  contract_: Address;
  tokenId: BigNumber;
  amount: BigNumber;
}

interface DelegationStruct {
  _: Delegation[];
  delegations_: Delegation[];
}

interface DelegatedMapping {
  [key: Address]: Address[];
}

try {
  const linkedDelegations: DelegatedMapping = {};

  TEST_ACCOUNTS.map((address) => {
    linkedDelegations[address.toLowerCase() as Address] = [];
  });

  const response = await multicall(
    "1",
    provider,
    DELEGATE_V2_ABI,
    TEST_ACCOUNTS.map((address: Address) => [
      CONTRACT_ADDRESSES.DELEGATE_CONTRACT_ADDRESS,
      "getIncomingDelegations",
      [address],
    ]),
    { blockTag },
  );

  if (response.length) {
    response.map((data: DelegationStruct) => {
      data.delegations_.map((delegation: Delegation) => {
        if (delegation.type_ === DelegationType.ALL) {
          linkedDelegations[delegation.to.toLowerCase() as Address].push(
            delegation.from,
          );
        } else if (delegation.type_ === DelegationType.CONTRACT) {
          if (delegation.contract_ !== CONTRACT_ADDRESSES.BAYC_CONTRACT) return;
          if (
            linkedDelegations[delegation.to.toLowerCase() as Address].includes(
              delegation.from,
            )
          )
            return;

          linkedDelegations[delegation.to.toLowerCase() as Address].push(
            delegation.from,
          );
        }
      });
    });
  }

  console.log(linkedDelegations);
} catch (error) {
  console.error(error);
}
