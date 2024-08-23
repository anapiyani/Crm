import React, { useEffect, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Paper, IconButton, Typography, CircularProgress } from "@mui/material";
import classes from "./styles.module.scss";
import { DragHandle } from "@mui/icons-material";

interface IConvertedEmployee {
  id: number;
  first_name: string;
  last_name: string;
  position: number;
}

interface EmployeeReorderProps {
  employees: IConvertedEmployee[];
  onReorder: (updatedEmployee: IConvertedEmployee) => void;
  isLoading?: boolean;
}

interface DragItem {
  index: number;
  id: number;
  type: string;
}

const ItemType = "EMPLOYEE";

const EmployeeReorder: React.FC<EmployeeReorderProps> = ({
  employees,
  onReorder,
  isLoading,
}) => {
  const [employeeList, setEmployeeList] = useState<IConvertedEmployee[]>([]);
  const [draggedEmployeeIndex, setDraggedEmployeeIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const sortedEmployees = [...employees].sort(
      (a, b) => a.position - b.position
    );
    setEmployeeList(sortedEmployees);
  }, [employees]);

  const moveEmployee = (dragIndex: number, hoverIndex: number) => {
    const updatedEmployees = [...employeeList];
    const [draggedEmployee] = updatedEmployees.splice(dragIndex, 1);
    updatedEmployees.splice(hoverIndex, 0, draggedEmployee);

    updatedEmployees.forEach((employee, index) => {
      employee.position = index + 1;
    });
    setEmployeeList(updatedEmployees);
  };

  //   const handleDragStart = (index: number) => {
  //     setDraggedEmployeeIndex(index);
  //   };

  const handleDragEnd = () => {
    if (draggedEmployeeIndex !== null) {
      const draggedEmployee = employeeList[draggedEmployeeIndex];
      onReorder(draggedEmployee);
      setDraggedEmployeeIndex(null);
    }
  };

  const renderEmployee = (employee: IConvertedEmployee, index: number) => {
    return (
      <DraggableEmployee
        key={employee.id}
        index={index}
        employee={employee}
        moveEmployee={moveEmployee}
        onDragStart={() => setDraggedEmployeeIndex(index)}
        onDragEnd={handleDragEnd}
      />
    );
  };

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {employeeList.map((employee, index) => renderEmployee(employee, index))}
      </div>
    </DndProvider>
  );
};

interface DraggableEmployeeProps {
  employee: IConvertedEmployee;
  index: number;
  moveEmployee: (dragIndex: number, hoverIndex: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const DraggableEmployee: React.FC<DraggableEmployeeProps> = ({
  employee,
  index,
  moveEmployee,
  onDragStart,
  onDragEnd,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem>({
    accept: ItemType,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveEmployee(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: employee.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: onDragEnd,
  });

  drag(drop(ref));

  return (
    <Paper
      ref={ref}
      className={classes.employeeCard}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <IconButton className={classes.dragHandle}>
        <DragHandle />
      </IconButton>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.6rem",
        }}
      >
        {employee.first_name} {employee.last_name}
      </Typography>
    </Paper>
  );
};

export default EmployeeReorder;
