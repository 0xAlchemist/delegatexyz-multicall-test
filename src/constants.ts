import { Address } from "viem";

const BAYC_CONTRACT: Address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
const MAYC_CONTRACT: Address = "0x60E4d786628Fea6478F785A6d7e704777c86a7c6";
const DELEGATE_CONTRACT_ADDRESS: Address =
  "0x00000000000000447e69651d841bD8D104Bed493";

const BAYCWALLETTEST: Address = "0x9fBDD6437840641B5dEDE244B084D31e109A0F23";
const MAYCWALLETTEST: Address = "0xfcc2a29fe057ad15aaec24db16f382e83d3f28ed";
const NONFTTEST: Address = "0x494651a4d47F0defE93Ad736684fA5a2F2456e52";

const moretest: Address[] = [
  "0x51688cd36c18891167e8036bde2a8fb10ec80c43",
  "0x3e17fac953de2cd729b0ace7f6d4353387717e9e",
  "0x23f67feb67a3aa1e376d23beaa3f241217e427c9",
  "0x54685c62db8e16b1484768db8e0daf3c644d50bf",
  "0x766bc61d3150232f6f4e1d81633d68f3a94879e3",
];

export const CONTRACT_ADDRESSES = {
  BAYC_CONTRACT,
  MAYC_CONTRACT,
  DELEGATE_CONTRACT_ADDRESS,
} as const;

export const TEST_ACCOUNTS = [
  BAYCWALLETTEST,
  MAYCWALLETTEST,
  NONFTTEST,
  ...moretest,
];

export const DELEGATE_V2_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "getIncomingDelegations",
    outputs: [
      {
        components: [
          {
            internalType: "enum IDelegateRegistry.DelegationType",
            name: "type_",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "rights",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "contract_",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct IDelegateRegistry.Delegation[]",
        name: "delegations_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
