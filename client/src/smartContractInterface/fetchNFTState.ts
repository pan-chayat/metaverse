import { ABI } from "./abi";
import { ethers } from "ethers";

export const ContractAddress = "0xe0af15141ABd0B31Fb15e250971936Fe8837230a";
const address = "0x6B2eBFe3FE5c5B84746105421de93Df383b222E8";
const isHolder = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    import.meta.env.VITE_ALCHEMY_API
  );
  let contract = new ethers.Contract(ContractAddress, ABI, provider);
  let value = await contract.balanceOf(address);
  console.log("Value is = > ", value.toString());
  return value > 0;
};

export default isHolder;
