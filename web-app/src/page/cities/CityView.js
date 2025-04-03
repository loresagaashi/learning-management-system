import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { CityService } from "../../../service/CityService";
import { useQuery } from "react-query";

const cityService = new CityService();

export default function CityView({}) {
  const errorRef = useRef();

  const columns = [
    {
      title: "Id",
      field: "id",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "Name",
      field: "name",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
  ];

  return (
    <CustomMaterialTable
      title="Manage Cities"
      columns={columns}
      service={cityService}
      queryKey={QueryKeys.CITY}
      errorRef={errorRef}
    />
  );
}
