import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useFormContext } from "react-hook-form";

export default function BasicInfo() {
  const { register } = useFormContext();

  return (
    <TabsContent value="basic" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="municipality"
            className="block text-sm font-medium text-gray-700"
          >
            Municipality
          </label>
          <Input id="municipality" {...register("municipality")} />
        </div>
        <div>
          <label
            htmlFor="establishmentName"
            className="block text-sm font-medium text-gray-700"
          >
            Establishment Name
          </label>
          <Input id="establishmentName" {...register("establishmentName")} />
        </div>
        <div>
          <label
            htmlFor="businessAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Business Address
          </label>
          <Input id="businessAddress" {...register("businessAddress")} />
        </div>
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <Input id="contactNumber" {...register("contactNumber")} />
        </div>
        <div>
          <label
            htmlFor="accreditationNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Accreditation Number
          </label>
          <Input
            id="accreditationNumber"
            {...register("accreditationNumber")}
          />
        </div>
        <div>
          <label
            htmlFor="expirationDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiration Date
          </label>
          <Input id="expirationDate" {...register("expirationDate")} />
        </div>
        <div>
          <label
            htmlFor="licenseNumber"
            className="block text-sm font-medium text-gray-700"
          >
            LGU License Number
          </label>
          <Input id="licenseNumber" {...register("licenseNumber")} />
        </div>
        <div>
          <label
            htmlFor="contactPerson"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Person
          </label>
          <Input id="contactPerson" {...register("contactPerson")} />
        </div>
        <div>
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700"
          >
            Designation
          </label>
          <Input id="designation" {...register("designation")} />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input id="email" type="email" {...register("email")} />
        </div>
        <div>
          <label
            htmlFor="facebook"
            className="block text-sm font-medium text-gray-700"
          >
            Facebook
          </label>
          <Input id="facebook" {...register("facebook")} />
        </div>
        <div>
          <label
            htmlFor="instagram"
            className="block text-sm font-medium text-gray-700"
          >
            Instagram
          </label>
          <Input id="instagram" {...register("instagram")} />
        </div>
        <div>
          <label
            htmlFor="twitter"
            className="block text-sm font-medium text-gray-700"
          >
            Twitter
          </label>
          <Input id="twitter" {...register("twitter")} />
        </div>
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Other Website
          </label>
          <Input id="website" {...register("website")} />
        </div>
        <div>
          <label
            htmlFor="bookingCompany"
            className="block text-sm font-medium text-gray-700"
          >
            Booking Company, Please Specify
          </label>
          <Input id="bookingCompany" {...register("bookingCompany")} />
        </div>
      </div>
    </TabsContent>
  );
}
