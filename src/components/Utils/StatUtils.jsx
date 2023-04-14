import { Button } from "react-bootstrap";
import { XPCrudType } from "../../utils/Common/Enums/alertEnums";

export const getGridHeader = () => {
  return (
    <tr>
      <th>S/N</th>
      <th>Name</th>
      <th>Type</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Status</th>
      <th></th>
    </tr>
  );
};

export const getGridData = ({
  stationeries,
  onStationChanged,
  onRequestUpdate,
}) => {
  return stationeries.map((stationery, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{stationery.Name}</td>
      <td>{stationery.Type}</td>
      <td>{stationery.Quantity}</td>
      <td>{stationery.Price}</td>
      <td>{stationery.IsActive ? "Active" : "In-Active"}</td>
      <td>
        <Button
          variant="danger"
          onClick={() => onStationChanged(stationery, XPCrudType.Delete)}
        >
          <i className="fa fa-trash" aria-hidden="true"></i> Delete
        </Button>
        <span> </span>
        <Button variant="info" onClick={() => onRequestUpdate(stationery)}>
          <i className="fa fa-edit" aria-hidden="true"></i> Update
        </Button>
      </td>
    </tr>
  ));
};
