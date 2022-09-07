import React, {useState} from "react";
import FirstStep from "./sections/FirstStep";
import SecondStep from "./sections/SecondStep";

function SignUp() {
  const [Step, setStep] = useState<number>(1);
  const [UserType, setUserType] = useState<number>(0);

  return (
    <div className="container">
      {Step === 1 ? (
        <FirstStep setStep={setStep} setUserType={setUserType} />
      ) : Step === 2 ? (
        <SecondStep UserType={UserType} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default SignUp;
