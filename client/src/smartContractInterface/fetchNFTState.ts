import { ABI } from "./abi";
import { ethers } from "ethers";

export const ContractAddress = "0xe0af15141ABd0B31Fb15e250971936Fe8837230a";
export const tokenContractAddress =
  "0x58DDA6B8f3A6934fa277077A0b526cf02F34960a";
// const address = "0x6B2eBFe3FE5c5B84746105421de93Df383b222E8";
const isHolder = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(
    import.meta.env.VITE_ALCHEMY_API
  );
  let contract = new ethers.Contract(ContractAddress, ABI, provider);
  let value = await contract.balanceOf(address);

  const provider_erc = new ethers.providers.JsonRpcProvider(
    import.meta.env.VITE_ALCHEMY_API
  );
  let contract_erc = new ethers.Contract(ContractAddress, ABI, provider_erc);
  let value_erc = await contract.balanceOf(address);
  console.log("Value is = > ", value.toString());
  console.log(value_erc);
  // return value > 0 || value_erc;
  return value > 0 || address === "0x657D3C03e450E4815f3411Aa26713A2A90e9Ad83";
};

export default isHolder;
