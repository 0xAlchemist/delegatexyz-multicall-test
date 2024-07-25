# Setup

Solution is now working. Issue came from using shorthand ABI for getIncomingDelegations call. 

Ethers interface decoder couldn't handle the return type as it is a custom struct.

<<<<<<< HEAD
===========================================================================
=======
*****
>>>>>>> 49e1f65 (fix line)

Install dependencies
`npm i`

Run the dev server
`npm run dev`

Visit the provided url and open the dev console (Inspect element > console)

You should see the following CALL_EXCEPTION error:
```
main.ts:24 Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="getIncomingDelegations(address)", data="0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000009fbdd6437840641b5dede244b084d31e109a0f230000000000000000000000000c684c80692bb35c07e56b8c86b42906c66ccc1b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000009fbdd6437840641b5dede244b084d31e109a0f23000000000000000000000000719802da35587b75f8c4ef03efcfbfeca18009900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.7.0)
    at _Logger.makeError (chunk-EJAQ4RA2.js?v=67de4bd9:822:19)
    at _Logger.throwError (chunk-EJAQ4RA2.js?v=67de4bd9:831:16)
    at Interface.decodeFunctionResult (chunk-EJAQ4RA2.js?v=67de4bd9:5362:21)
    at utils.ts:44:13
    at Array.map (<anonymous>)
    at multicall (utils.ts:43:22)
    at async main.ts:11:20
```

The correct cold wallet addresses appear in the `data` field, but I'm having trouble figuring out the source of the error beyond the fact that `getIncomingDelegations` is being reverted. ABIs, args and return types seem to be correct.

ABIs
- [getIncomingDelegations](https://github.com/0xAlchemist/delegatexyz-multicall-test/blob/main/src/constants.ts#L23)
- [multicall (from snapshot)](https://github.com/0xAlchemist/delegatexyz-multicall-test/blob/main/src/utils.ts#L5)
