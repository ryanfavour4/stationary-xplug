import { XPCrudType } from "../../../utils/Common/Enums/alertEnums";

let stationeries = [
  {
    Id: 1,
    Name: "Notebook",
    Type: "Paper Item",
    Quantity: 50,
    Price: 100,
    IsActive: false,
  },
  {
    Id: 2,
    Name: "Writing Pad",
    Type: "Paper Item",
    Quantity: 150,
    Price: 300,
    IsActive: false,
  },
  {
    Id: 3,
    Name: "Small Pen",
    Type: "Ink Item",
    Quantity: 50,
    Price: 80,
    IsActive: false,
  },
];
export const stationObj = {
  Id: 0,
  Name: "",
  Type: "",
  Quantity: 0,
  Price: 0,
  IsActive: false,
};

export const formDef = {
  stat_id: 0,
  stat_name: "",
  stat_type: "-- Please Select --",
  stat_quantity: 0,
  stat_price: 0,
  stat_active: false,
};

export const toFormValues = (statObj) => {
  return {
    stat_id: statObj.Id,
    stat_name: statObj.Name,
    stat_type: statObj.Type,
    stat_quantity: statObj.Quantity,
    stat_price: statObj.Price,
    stat_active: statObj.IsActive,
  };
};

export const toStatObj = (formVal) => {
  return {
    Id: formVal.stat_id,
    Name: formVal.stat_name,
    Type: formVal.stat_type,
    Quantity: formVal.stat_quantity,
    Price: formVal.stat_price,
    IsActive: formVal.stat_active,
  };
};

export const getStationeries = () => {
  return stationeries;
};

export const getStationery = (id) => {
  return stationeries.filter((m) => m.Id === id);
};

export const updateStationery = (stationObj, type) => {
  switch (type) {
    case XPCrudType.Add:
      stationeries.push(stationObj);
      return true;
    case XPCrudType.Update:
      const index = stationeries.findIndex((m) => m.Id === stationObj.Id);
      if (index !== -1) {
        stationeries[index] = stationObj;
      }
      return true;
    case XPCrudType.Delete:
      stationeries = stationeries.filter((m) => m.Id !== stationObj.Id);
      return true;
    default:
      return false;
  }
};
