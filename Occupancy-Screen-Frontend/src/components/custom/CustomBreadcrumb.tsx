import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { NavLink } from "react-router-dom";

const CustomBreadcrumb = ({ currPage }: { currPage: string }) => {
  return (
    <h1 className="font-bold text-gray-800">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <NavLink to={"/admin"} className="text-lg">
              Home
            </NavLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-lg">{currPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </h1>
  );
};

export default CustomBreadcrumb;
