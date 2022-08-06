import { useContract, useSigner } from "wagmi";
import { pns_abi } from "../smartContractInterface/pns_abi";

function checkPNS({ addr }: { addr: string }) {
  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    addressOrName: addr,
    contractInterface: pns_abi,
    signerOrProvider: signer,
  });
  return contract;
}
