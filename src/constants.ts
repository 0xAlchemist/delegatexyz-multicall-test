import { Address } from "viem"

const BAYC_CONTRACT: Address = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
const MAYC_CONTRACT: Address = "0x60E4d786628Fea6478F785A6d7e704777c86a7c6"
const DELEGATE_CONTRACT_ADDRESS: Address = "0x00000000000000447e69651d841bD8D104Bed493"

const BAYCWALLETTEST: Address = "0x9fBDD6437840641B5dEDE244B084D31e109A0F23"
const MAYCWALLETTEST: Address = "0xfcc2a29fe057ad15aaec24db16f382e83d3f28ed"
const NONFTTEST: Address = "0x494651a4d47F0defE93Ad736684fA5a2F2456e52"

export const CONTRACT_ADDRESSES = {
    BAYC_CONTRACT,
    MAYC_CONTRACT,
    DELEGATE_CONTRACT_ADDRESS
} as const;

export const TEST_ACCOUNTS = [
    BAYCWALLETTEST,
    MAYCWALLETTEST,
    NONFTTEST
] as const;

export const DELEGATE_V2_ABI = [
    `function getIncomingDelegations(address to) external view returns (Delegation[] memory delegations)`
];
