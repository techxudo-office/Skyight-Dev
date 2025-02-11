import React, { useState, useEffect, useMemo } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PiBankBold } from "react-icons/pi";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import {
  Input,
  Spinner,
  Button,
  SecondaryButton,
  Select,
  CustomDate,
  TextArea,
} from "../../components/components";

import { createTransaction, getBanks } from "../../utils/api_handler";

import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { transactionInitialValues, transactionSchema } from "../../validations";
import { allowedTypes } from "../../helper/allowedTypes";
import { successToastify, errorToastify } from "../../helper/toast"


const CreateTransaction = () => {
  const navigate = useNavigate();

  const [banksData, setBanksData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      const response = await getBanks();
      if (response.status) {
        setBanksData(response.data);
        console.log('bank', response.data)
      }
    };

    if (banksData.length === 0) {
      fetchBanks();
    }
  }, [banksData]);
  const memoizedBanks = useMemo(() => banksData, [banksData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        errorToastify("Only JPG, JPEG, and PNG formats are allowed.");
      }
    }
  };

  const createTransactionHandler = async (payload) => {
    setLoading(true);
    const response = await createTransaction(payload);
    console.log(response);
    setLoading(false);

    if (response.status) {
      successToastify(response.message);
      setTimeout(() => {
        navigate("/dashboard/transactions");
      }, 2000);
    } else {
      if (Array.isArray(response.message)) {
        response.message.map((error) => {
          return errorToastify(error.toUpperCase());
        });
      } else {
        errorToastify(response.message);
      }
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Values: ", values);

    const formData = new FormData();
    formData.append("bank_name", values.bank_name);
    formData.append("bank_number", values.bank_number);
    formData.append("account_holder_name", values.account_holder_name);
    formData.append("document_number", values.document_number);
    formData.append("payment_date", values.payment_date);
    formData.append("amount", values.amount);
    formData.append("comment", values.comment);

    if (!selectedFile) {
      errorToastify("Please upload transaction receipt");
    } else {
      formData.append("document", selectedFile);
      createTransactionHandler(formData);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <CardLayoutContainer className={"mb-5"}>
          <CardLayoutHeader
            heading="Transaction Receipt"
            className={"flex items-center justify-between"}
          />
          <CardLayoutBody>
            <div className="flex flex-col justify-center items-center gap-4 mt-2">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded Preview"
                  className=" object-cover rounded-xl border-2 border-slate-100"
                />
              ) : (
                <label
                  htmlFor="image-upload"
                  className="p-16 flex flex-col items-center justify-center"
                >
                  <FaCloudUploadAlt className="text-5xl text-slate-400 transition-all mb-3 cursor-pointer upload-icon" />
                  <h2 className="text-md text-center text-slate-500">
                    Upload Transaction Receipt
                  </h2>
                </label>
              )}
            </div>
          </CardLayoutBody>
          <CardLayoutFooter>
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-blue-100 hover:bg-secondary text-primary hover:text-white py-2 font-semibold px-4 rounded-full transition duration-300"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </CardLayoutFooter>
        </CardLayoutContainer>
        <CardLayoutContainer>
          <CardLayoutHeader
            heading="Create Transaction"
            className={"flex items-center justify-between"}
          />
          <Formik
            initialValues={transactionInitialValues}
            validationSchema={transactionSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <CardLayoutBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
                    <div className="relative mb-5">
                      <Select
                        id="bank_name"
                        label="Bank Name"
                        name="bank_name"
                        options={memoizedBanks}
                        value={values.bank_name}
                        placeholder="Select Bank"
                        onChange={(option) =>
                          setFieldValue("bank_name", option.label)
                        }
                        optionIcons={<PiBankBold />}
                      />
                      {touched.bank_name && errors.bank_name && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.bank_name}
                        </div>
                      )}
                    </div>
                    {/* <div className="relative mb-5">
                      <Input
                        id={"bank_name"}
                        name={"bank_name"}
                        label={"Bank Name"}
                        type={"text"}
                        value={values.bank_name}
                        placeholder={"Enter Bank Name"}
                        onChange={(e) =>
                          setFieldValue("bank_name", e.target.value)
                        }
                      />
                      {touched.bank_name && errors.bank_name && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.bank_name}
                        </div>
                      )}
                    </div> */}
                    <div className="relative mb-5">
                      <Input
                        id={"bank_number"}
                        name={"bank_number"}
                        label={"Bank Number"}
                        type={"text"}
                        value={values.bank_number}
                        placeholder={"Enter Bank Number"}
                        onChange={(e) =>
                          setFieldValue("bank_number", e.target.value)
                        }
                      />
                      {touched.bank_number && errors.bank_number && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.bank_number}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        id={"account_holder_name"}
                        name={"account_holder_name"}
                        label={"Account Holder Name"}
                        type={"text"}
                        value={values.account_holder_name}
                        placeholder={"Enter Account Holder Name"}
                        onChange={(e) =>
                          setFieldValue("account_holder_name", e.target.value)
                        }
                      />
                      {touched.account_holder_name &&
                        errors.account_holder_name && (
                          <div className="text-red-500 text-sm mt-2 absolute left-0">
                            {errors.account_holder_name}
                          </div>
                        )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        id={"document_number"}
                        name={"document_number"}
                        label={"Account Number"}
                        type={"text"}
                        value={values.document_number}
                        placeholder={"Enter Account Number"}
                        onChange={(e) =>
                          setFieldValue("document_number", e.target.value)
                        }
                      />
                      {touched.document_number && errors.document_number && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.document_number}
                        </div>
                      )}
                    </div>
                    <div className="relative mb-5">
                      <Input
                        id={"amount"}
                        name={"amount"}
                        label={"Amount"}
                        type={"number"}
                        value={values.amount}
                        placeholder={"Enter Amount"}
                        onChange={(e) =>
                          setFieldValue("amount", e.target.value)
                        }
                      />
                      {touched.amount && errors.amount && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.amount}
                        </div>
                      )}
                    </div>

                    <div className="relative mb-5">
                      {/* <Input
                        id={"payment_date"}
                        name={"payment_date"}
                        label={"Transaction Date"}
                        type={"datetime-local"}
                        value={values.payment_date}
                        placeholder={"Select Transaction Date"}
                        onChange={(e) =>
                          setFieldValue("payment_date", e.target.value)
                        }
                      /> */}
                      <CustomDate
                        label={'Transaction Date'}
                        isTimePicker={true}
                        value={values.payment_date}
                        onChange={(e) =>
                          setFieldValue("payment_date", e.target.value)
                        }

                      />
                      {touched.payment_date && errors.payment_date && (
                        <div className="text-red-500 text-sm mt-2 absolute left-0">
                          {errors.payment_date}
                        </div>
                      )}
                    </div>

                  </div>
                  <div className="relative mb-5">
                    <TextArea
                      id={"comment"}
                      name={"comment"}
                      label={"Comment"}
                      value={values.comment}
                      placeholder={"Enter Comment"}
                      onChange={(e) =>
                        setFieldValue("comment", e.target.value)
                      }
                    />
                    {touched.comment && errors.comment && (
                      <div className="text-red-500 text-sm mt-2 absolute left-0">
                        {errors.comment}
                      </div>
                    )}
                  </div>
                </CardLayoutBody>
                <CardLayoutFooter className={"gap-1"}>
                  <div>
                    <SecondaryButton
                      text={"Cancel"}
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                  </div>
                  <div>
                    <Button
                      text={loading ? <Spinner /> : "Create Transaction"}
                      type="submit"
                      disabled={loading}
                    />
                  </div>
                </CardLayoutFooter>
              </Form>
            )}
          </Formik>
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default CreateTransaction;
