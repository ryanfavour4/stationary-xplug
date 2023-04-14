import { useState } from "react";
import {
  getStationeries,
  updateStationery,
  formDef,
  toFormValues,
  toStatObj,
} from "../../../services/Apps/ListData/stationList";
import { getGridData, getGridHeader } from "../../Utils/StatUtils";

import XPModal, { useXPModal } from "../../Common/XPModal";
import { useStatForm, RegStatForm } from "./Form/RegStatForm";
import {
  XPAlertObj,
  XPInfoAlert,
  XPConfirmAlert,
} from "../../../utils/Common/Utils/xpAlerts";
import {
  XPAlertIcon,
  XPAlertType,
  XPCrudType,
} from "../../../utils/Common/Enums/alertEnums";
import { Button } from "react-bootstrap";

const StationeriesGrid = () => {
  const [stationeries, setStationeries] = useState(getStationeries);
  const [fTitle, setFTitle] = useState("Add Stationery");
  const { isShown, toggle: onToggleModal } = useXPModal();
  const { form, handleValueChange, initForm, validateForm, setErrors, errors } =
    useStatForm({
      frm: formDef,
    });

  const onSubmitForm = (e) => {
    e.preventDefault();
    const alertObj = XPAlertObj();
    alertObj.icon = XPAlertIcon.byType(XPAlertType.Success);

    //Validate Inputs
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    if (form.stat_id > 0) {
      //Update
      onStationChanged(toStatObj(form), XPCrudType.Update);
      alertObj.message = "Stationery Item Was Updated Suuccessfully";
      alertObj.title = "Stationery Updated";
      alertObj.callback = onToggleModal;
      XPInfoAlert(alertObj);
    } else {
      //Add
      form.stat_id = stationeries.length + 1;
      onStationChanged(toStatObj(form), XPCrudType.Add);
      alertObj.message = "Stationery Item Was Added Suuccessfully";
      alertObj.title = "Stationery Added";
      XPInfoAlert(alertObj);
    }

    //Reset the form values
    initForm(formDef);
  };

  const onRequestUpdate = (stationery) => {
    //Init Update
    initForm(toFormValues(stationery));
    setFTitle("Update Stationery");

    //Display Modal
    onToggleModal();
  };

  const onRequestAdd = () => {
    //Reset the form values
    initForm(formDef);
    setFTitle("Add Stationery");

    //Display Modal
    onToggleModal();
  };

  const onStationChanged = (stationery, caller) => {
    if (caller === XPCrudType.Delete) {
      //Confirm Delete
      const alertObj = XPAlertObj();
      alertObj.icon = XPAlertIcon.byType(XPAlertType.Warning);
      alertObj.message = `Stationery Item:<b>${stationery.Name} </b> would be deleted! <br /> Are you sure?`;
      alertObj.title = "Delete Confirmation";
      alertObj.callback = processItem.bind(null, stationery, caller);
      XPConfirmAlert(alertObj);
      return false;
    }
    processItem(stationery, caller);
  };

  const processItem = (stationery, caller) => {
    updateStationery(stationery, caller);
    setStationeries(getStationeries);
  };

  return (
    <>
      <div className="row p-2">
        <div className="col-md-12 text-end">
          <Button variant="success" onClick={onRequestAdd}>
            <i className="fa fa-plus" aria-hidden="true"></i> Add New
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>{getGridHeader()}</thead>
            <tbody>
              {getGridData({ stationeries, onStationChanged, onRequestUpdate })}
            </tbody>
          </table>
        </div>
      </div>
      <XPModal
        isShown={isShown}
        title={fTitle}
        content={
          <RegStatForm
            form={form}
            handleValueChange={handleValueChange}
            errors={errors}
          />
        }
        onClose={onToggleModal}
        onSubmit={onSubmitForm}
      />
    </>
  );
};

export default StationeriesGrid;
