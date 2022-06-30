import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { ApiService } from "../axios-config";
import { toast } from "react-toastify";

const FoodEntryModal = ({ toggle, isOpen, data, refetch, setWaring }) => {
  const { register, errors, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [currentDateTimeLocal, setCurrentDateTimeLocal] = useState(null);

  const createUpdateFoodEntry = async (values) => {
    try {
      values.userId = "62b848fd58f737232bc5d052";
      values.calorie = parseInt(values?.calorie);
      setLoading(true);
      let res;
      if (!data) {
        res = await ApiService.createFoodEntry(values);
      } else {
        res = await ApiService.updateUserEntry(data?._id, values);
      }
      if (res?.user?.token) {
        localStorage.setItem("calories_token", res?.user?.token);
        localStorage.setItem("user", JSON.stringify(res?.user));
      }
      let thresholdWarning =
        res?.user?.thresholdWarning || res?.entry?.thresholdWarning;
      let priceWarning = res?.user?.priceWarning || res?.entry?.priceWarning;
      setWaring({ thresholdWarning, priceWarning });
      toast.success(
        data ? "Entry Update Successfully!" : "Entry Created Successfully!"
      );
      refetch();
      setLoading(false);
      reset();
      toggle();
    } catch (error) {
      setLoading(false);
    }
  };

  const preFillData = () => {
    if (data) {
      data.foodDate = moment(data?.foodDate).format("YYYY-MM-DDTHH:mm");
      reset({ ...data });
    } else {
      reset({});
    }
  };

  useEffect(() => preFillData(), [data]);

  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(now.getTime() - offset);

    const inputDate = moment(adjustedDate).format("YYYY-MM-DDT12:00");

    setCurrentDateTimeLocal(inputDate);

    // if (candidateId) {
    //   fetchingInterviewList();
    // }

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
        <Form onSubmit={handleSubmit(createUpdateFoodEntry)}>
          <ModalHeader toggle={toggle}>
            {data ? "Update" : "Crate"} Food Entry
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="foodName">
                Food Name<span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                name="foodName"
                innerRef={register({
                  required: {
                    value: true,
                    message: "Please enter the foo name!",
                  },
                })}
                aria-invalid={errors?.foodName ? "true" : "false"}
                placeholder="Food Name"
              />
              <small className="text-danger">{errors?.foodName?.message}</small>
            </FormGroup>

            <FormGroup className="mb-3">
              <Label for="calories">
                Calories<span className="text-danger">*</span>
              </Label>

              <Input
                type="number"
                name="calorie"
                innerRef={register({
                  required: {
                    value: true,
                    message: "Please enter the Calories!",
                  },
                })}
                aria-invalid={errors?.userName ? "true" : "false"}
                placeholder="Calories"
              />
              <small className="text-danger">{errors?.calorie?.message}</small>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="foodDate">
                Date & time<span className="text-danger">*</span>
              </Label>

              <Input
                defaultValue={currentDateTimeLocal}
                step="any"
                max={moment().format("YYY-MM-DDTHH:mm:ss.SSS")}
                min={null}
                type="datetime-local"
                name="foodDate"
                innerRef={register({
                  required: {
                    value: true,
                    message: "Food date & time is required!",
                  },
                })}
              />
              <small className="text-danger">{errors?.foodDate?.message}</small>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label for="price">
                Price<span className="text-danger">*</span>
              </Label>
              <div className="d-flex position-relative">
                <span className="position-absolute addonInput">$</span>
                <Input
                  type="number"
                  name="price"
                  innerRef={register({
                    required: {
                      value: true,
                      message: "Please enter the price!",
                    },
                  })}
                  aria-invalid={errors?.confirmPass ? "true" : "false"}
                  placeholder="Price"
                  style={{ paddingLeft: "20px" }}
                />
              </div>

              <small className="text-danger">{errors?.price?.message}</small>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="success" disabled={isLoading}>
              {isLoading && <Spinner size="sm" />}{" "}
              {data ? "Edit Entry" : "Save Entry"}
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default FoodEntryModal;
