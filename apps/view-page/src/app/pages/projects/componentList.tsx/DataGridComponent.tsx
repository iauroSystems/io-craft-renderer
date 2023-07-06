import { GenericTableWrapper } from "@iocraft/component-library";
import themes from "apps/view-page/src/theme";
import generateRandomString from "apps/view-page/src/utils/randomString";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DataGridDataMapping } from "../data-mapper/data-grid";
import { getGridDataResource } from "../store/gridDataRenderSlice";

export const DataGridComponent = (props: any) => {
  const [tableData, setTableData] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    new Promise((resolve, reject) => {
      if (props && props.rawData) {
        resolve(
          dispatch(
            getGridDataResource({
              label: "",
              report: props.rawData?.report || "",
              widget_id: props.rawData.id || "",
              projections: "",
              filter: "",
              size: "1000",
              page: "0",
            })
          )
        );
      } else {
        const obj = {
          payload: {
            data: [],
          },
        };
        resolve(obj);
      }
    })
      .then((response: any) => {
        const mapperPayload: any = {
          data: props.rawData,
          fontData: {},
        };
        const obj = DataGridDataMapping(
          JSON.parse(JSON.stringify(response)),
          JSON.parse(JSON.stringify(mapperPayload))
        );
        setTableData(obj);
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  }, []);

  return props ? (
    <div
      key={generateRandomString()}
      style={{
        height: "calc(100% - 0px)",
        width: "calc(100% - 0px)",
        display: "flex",
        flexDirection: "row",
        flex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 100,
          overflowX: "auto",
          height: "calc(100% - 0px)",
        }}
      >
        <GenericTableWrapper
          title={"Resource List"}
          canSearch={true}
          canFilter={true}
          canDownload={true}
          pageSizeOptions={[10, 20, 30, 40]}
          tableData={{
            rows: [],
            headers: [],
          }}
          chartProps={{
            background_color: themes.default?.palette?.background?.bacopWhite,
            text_color: "#101425",
            icon_color: "#131ca2",
            icon_background: "#f2f4f8",
          }}
          count={10}
        />
      </div>
    </div>
  ) : (
    <GenericTableWrapper
      title={"Resource list"}
      count={10}
      canSearch={true}
      canFilter={true}
      canDownload={true}
      pageSizeOptions={[10, 20, 30, 40]}
      tableData={{
        rows: [],
        headers: [],
      }}
      chartProps={{
        background_color: themes.default?.palette?.background?.default,
        text_color: "#000000",
      }}
    />
  );
};
