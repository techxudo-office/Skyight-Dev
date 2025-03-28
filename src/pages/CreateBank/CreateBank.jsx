import React, { useState } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import { Input, Button, Switch, Spinner, SecondaryButton, ConfirmModal } from "../../components/components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createBank } from "../../_core/features/bankSlice";

const CreateBank = () => {
  const navigate = useNavigate();
  const [modalstatus, setModalstatus] = useState(false);
  const [bankName, setBankName] = useState("");
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.auth);
  const { isCreatingbank } = useSelector((state) => state.bank)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bankName.trim()) {
      toast.error("Please enter bank name");
      return;
    } else {
      setModalstatus(true)
    }
  };
  const handleAddBank = () => {

    const payload = {
      bank: bankName
    }
    setModalstatus(false)
    dispatch(createBank({ token: userData?.token, data: payload })).then(() => {
      navigate("/dashboard/banks")
    })
  }

  return (
    <CardLayoutContainer>
      <ConfirmModal
        text={"Is the information you provide correct?"}
        loading={isCreatingbank}
        onConfirm={handleAddBank}
        onAbort={() => setModalstatus(false)}
        status={modalstatus}
      />
      <CardLayoutHeader
        heading="Create Bank"
        className="flex items-center justify-between"
      >
        {/* <span onClick={() => setIsActive(!isActive)}>
          <Switch switchStatus={isActive} />
        </span> */}
      </CardLayoutHeader>

      <CardLayoutBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
          <div>
            <Input
              inputClass={"capitalize"}
              placeholder="Enter Bank"
              label="Bank*"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
        </div>
      </CardLayoutBody>

      <CardLayoutFooter className="flex gap-1">
        <SecondaryButton
          text="Cancel"
          onClick={() => navigate(-1)}
        />
        <Button
          text={isCreatingbank ? <Spinner /> : "Create Bank"}
          disabled={isCreatingbank}
          onClick={handleSubmit}
        />
      </CardLayoutFooter>
    </CardLayoutContainer>
  );
};

export default CreateBank;