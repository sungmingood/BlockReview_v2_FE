import {ethers} from "ethers";
import React from "react";

function BNToNum({value}: any) {
  const _value = ethers.utils.formatEther(value);
  return _value;
}

export default BNToNum;
