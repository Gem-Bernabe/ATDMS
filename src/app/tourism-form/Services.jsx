import { Checkbox } from "@/components/ui/checkbox";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function Services() {
  const { register } = useFormContext();

  return (
    <TabsContent value="services" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rentals Section */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg">Rentals</h3>
          {[
            { id: "videoke", label: "Videoke Rental" },
            { id: "atv", label: "ATV Rental" },
            { id: "bicycle", label: "Bicycle Rental" },
            { id: "motorcycle", label: "Motorcycle Rental" },
          ].map((rental) => (
            <div
              key={rental.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={rental.id}
                  {...register(`rentals.${rental.id}.checked`)}
                />
                <label htmlFor={rental.id} className="text-sm font-medium">
                  {rental.label}
                </label>
              </div>
              <div className="flex space-x-4">
                <Input
                  type="text"
                  placeholder="Availability"
                  {...register(`rentals.${rental.id}.availability`)}
                  className="w-1/2"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  {...register(`rentals.${rental.id}.price`)}
                  className="w-1/2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Parking Space / Campsite Area Section */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg">Parking Space / Campsite Area</h3>
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <label className="block mb-2 text-sm font-medium">
              Parking Space
            </label>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="Capacity"
                {...register("parkingSpace.capacity")}
                className="w-1/2"
              />
              <Input
                type="number"
                placeholder="Price"
                {...register("parkingSpace.price")}
                className="w-1/2"
              />
            </div>
          </div>
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <label className="block mb-2 text-sm font-medium">
              Campsite Area
            </label>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="Capacity"
                {...register("campsiteArea.capacity")}
                className="w-1/2"
              />
              <Input
                type="number"
                placeholder="Price"
                {...register("campsiteArea.price")}
                className="w-1/2"
              />
            </div>
          </div>
        </div>

        {/* Common Areas Section */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg">Common Areas</h3>
          {[
            { id: "commonKitchen", label: "Common Kitchen" },
            { id: "commonSink", label: "Common Sink" },
            { id: "commonGrillingSite", label: "Common Grilling Site" },
            { id: "commonBathroom", label: "Common Bathroom" },
            { id: "commonRestroom", label: "Common Restroom" },
            { id: "openShower", label: "Open Shower" },
          ].map((area) => (
            <div
              key={area.id}
              className="p-4 border rounded-lg bg-white shadow-sm"
            >
              <label className="block mb-2 text-sm font-medium">
                {area.label}
              </label>
              <div className="flex space-x-4">
                <Input
                  type="number"
                  placeholder="Number"
                  {...register(`commonAreas.${area.id}.number`)}
                  className="w-1/2"
                />
                <Input
                  type="number"
                  placeholder="Charge"
                  {...register(`commonAreas.${area.id}.charge`)}
                  className="w-1/2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Available Promos Section */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg">Available Promos</h3>
          {[
            { id: "packages", label: "Packages" },
            { id: "advanceBooking", label: "Advance Booking" },
            { id: "summerPromo", label: "Summer Promo" },
            { id: "holidayPromo", label: "Holiday Promo" },
            { id: "returnClientRate", label: "Return Client Rate" },
          ].map((promo) => (
            <div key={promo.id} className="p-2">
              <Checkbox id={promo.id} {...register(`promos.${promo.id}`)} />
              <label htmlFor={promo.id} className="ml-2 text-sm font-medium">
                {promo.label}
              </label>
            </div>
          ))}

          {/* Discount Fields */}
          {[
            { id: "corporateRate", label: "Corporate Rate" },
            { id: "governmentDiscount", label: "Government Discount" },
            { id: "seniorDiscount", label: "Senior/PWD Discount" },
            { id: "otherPromos", label: "Others, Please Specify" },
          ].map((discount) => (
            <div
              key={discount.id}
              className="p-4 border rounded-lg bg-white shadow-sm space-y-2"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={discount.id}
                  {...register(`promos.${discount.id}.checked`)}
                />
                <label htmlFor={discount.id} className="text-sm font-medium">
                  {discount.label}
                </label>
              </div>
              <Input
                type="number"
                placeholder="Discount Amount"
                {...register(`promos.${discount.id}.amount`)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
}
