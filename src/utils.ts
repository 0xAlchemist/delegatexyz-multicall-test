import { Interface } from "@ethersproject/abi"
import { Contract } from "@ethersproject/contracts"
import networks from "./networks.json"

export async function multicall(
    network: string,
    // @ts-ignore
    provider,
    abi: any[],
    calls: any[],
    // @ts-ignore
    options?
  ) {
    const multicallAbi = [
      `function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)`
    ];
   
    const multicallAddress =
    // @ts-ignore
      options?.multicallAddress || networks[network].multicall;
    const multi = new Contract(multicallAddress, multicallAbi, provider);
    const itf = new Interface(abi);
    try {
      const max = options?.limit || 500;
      if (options?.limit) delete options.limit;
      const pages = Math.ceil(calls.length / max);
      const promises: any = [];
      Array.from(Array(pages)).forEach((_, i) => {
        const callsInPage = calls.slice(max * i, max * (i + 1));
        promises.push(
          multi.aggregate(
            callsInPage.map((call) => [
              call[0].toLowerCase(),
              itf.encodeFunctionData(call[1], call[2])
            ]),
            options || {}
          )
        );
      });
      let results: any = await Promise.all(promises);
      results = results.reduce((prev: any, [, res]: any) => prev.concat(res), []);
      // @ts-ignore
      return results.map((call, i) =>
        itf.decodeFunctionResult(calls[i][1], call)
      );
    } catch (e: any) {
      return Promise.reject(e);
    }
  }
  