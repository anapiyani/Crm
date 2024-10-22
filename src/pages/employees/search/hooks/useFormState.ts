import { useState } from "react";
import { ISearchFormData } from "@/ts/employee.interface.ts";

const useFormState = () => {
  const [formData, setFormData] = useState<ISearchFormData>({
    search: "",
    phone_number: "",
    whatsapp: "",
    user_id: "",
    email: "",
    is_active: null,
    employmentDateFrom: "",
    employmentDateTo: "",
    age_from: "",
    age_to: "",
    gender: "",
    role: "employee",
    roleEmployee: "",
    reviewFrom: "",
    reviewAbout: "",
    reviewDateFrom: "",
    reviewDateTo: "",
    page: 1,
    page_size: 10,
    works_from: "",
    works_to: "",
    date_of_birth_from: "",
    date_of_birth_to: "",
  });

  return { formData, setFormData };
};

export default useFormState;
