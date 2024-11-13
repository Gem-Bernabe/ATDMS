import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function Employees() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Number of Employees</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Foreign</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Male</TableCell>
            <TableCell>
              <Input type="number" {...register("employees.localMale")} />
            </TableCell>
            <TableCell>
              <Input type="number" {...register("employees.foreignMale")} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Female</TableCell>
            <TableCell>
              <Input type="number" {...register("employees.localFemale")} />
            </TableCell>
            <TableCell>
              <Input type="number" {...register("employees.foreignFemale")} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
