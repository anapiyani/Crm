import ModalWindow from "@/components/modal-window/modal-window";
import {
  getRolesByDepartments,
  linkRoleToHierarchy,
} from "@/service/hierarchy/hierarchy.service";
import { proccessRoleOptions } from "@/utils/process-role-options";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";

interface AddRoleModalProps {
  categoryId: number;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ categoryId }) => {
  const modal = useModal();
  const [roleId, setRoleId] = useState<number | undefined>(undefined);
  const [node, setNode] = useState<
    {
      nodeType: string;
      nodeName: string;
      nodeId?: number;
    }[]
  >([]);

  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRolesByDepartments(),
  });

  useEffect(() => {
    if (data) {
      setNode(proccessRoleOptions(data));
    }
  }, [data]);

  const linkRole = (categoryId: number, roleId: number) => {
    linkRoleToHierarchy({ department_id: categoryId, role_id: roleId });
  };

  return (
    <ModalWindow
      title={"Добавить Роль"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        linkRole(categoryId, roleId!);
        modal.hide();
      }}
      children={
        <div>
          <Autocomplete
            sx={{ width: 300 }}
            options={node}
            getOptionLabel={(option) => option.nodeName}
            onChange={(event, value) =>
              setRoleId(value ? value.nodeId : undefined)
            }
            renderOption={(props, option) => (
              <li
                {...props}
                key={option.nodeId}
                style={{
                  pointerEvents:
                    option.nodeType === "department" ? "none" : "auto",
                }}
              >
                <p
                  style={{
                    fontSize: "1.6rem",
                    fontWeight:
                      option.nodeType === "department" ? "bold" : "normal",
                    marginLeft: option.nodeType === "department" ? "0" : "1rem",
                  }}
                >
                  {option.nodeName}
                </p>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Выберите должность"
                variant="outlined"
                size="medium"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                    padding: "1rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.6rem",
                    padding: "0 1rem",
                  },
                }}
              />
            )}
          />
        </div>
      }
    ></ModalWindow>
  );
};

export default NiceModal.create(AddRoleModal);
