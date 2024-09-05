import ModalWindow from "@/components/modal-window/modal-window";
import StepForm from "@/pages/employees/salary/_components/stepform/stepform.component";
import { getTemplateList } from "@/service/employee/employee.service";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const StepFormModal = () => {
  const modal = useModal();
  const [templateNameAndId, setTemplateNameAndId] = useState<
    {
      name: string;
      id: number | undefined;
    }[]
  >([]);

  const onHideModal = () => {
    modal.hide();
  };

  const { data: templateList, isLoading } = useQuery({
    queryKey: ["templateList"],
    queryFn: () => getTemplateList(),
  });

  useEffect(() => {
    if (templateList) {
      const templateNameAndId = templateList.map((template) => {
        return {
          name: template.name,
          id: template.id,
        };
      });
      setTemplateNameAndId(templateNameAndId);
    }
  }, [templateList]);

  const choosenTemplate = (id: string) => {
    templateList?.map((template) => {
      if (template.id === Number(id)) {
        console.log(template);
      }
    });
  };

  return (
    <ModalWindow
      title={"Редактировать Категорию"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      withButtons={false}
    >
      <StepForm
        templateNameAndIds={templateNameAndId}
        isInfoPage={true}
        onHideModal={onHideModal}
        choosenTemplate={choosenTemplate}
      />
    </ModalWindow>
  );
};

export default NiceModal.create(StepFormModal);
