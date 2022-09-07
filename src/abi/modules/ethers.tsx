import {ethers} from "ethers";
import {authContract, nftContract, serviceContract} from "../contract";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
export const _serviceContract = new ethers.Contract(
  serviceContract.address,
  serviceContract.abi,
  signer
);
export const _authContract = new ethers.Contract(
  authContract.address,
  authContract.abi,
  signer
);
export const _nftContract = new ethers.Contract(
  nftContract.address,
  nftContract.abi,
  signer
);

export const connectMetamask = async (errorMsg: string) => {
  try {
    // Check Metamask Installed
    if (!window.ethereum) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    // Inject Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account: string[] = await provider.send("eth_requestAccounts", []);

    // Check Network & Fit Network
    const {chainId} = await provider.getNetwork();
    if (chainId !== 5) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{chainId: "0x5"}],
      });
    }
    return account[0];
  } catch (error) {
    alert(errorMsg);
    window.location.reload();
  }
};
