"use client";
import { InputFormField } from "@components/FormElements/input.form.field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/Button";
import { Card, CardContent } from "@ui/components/Card";
import { Form } from "@ui/components/Form";
import { DatePicker } from "@ui/components/datepicker";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  location: z.string(),
  category_id: z.string(),
  pickup_date: z.string(),
  drop_off_date: z.string(),
});
export default function BookVehiclePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className=" py-6 lg:py-12">
      <div className="container grid items-start gap-4 px-4 text-gray-900 md:px-6 dark:text-gray-50">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Vehicle Rentals
          </h1>
          <p className="max-w-3xl text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Find the perfect vehicle for your next adventure. Enter your
            location and dates to get started.
          </p>
        </div>
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-4 md:p-6">
            <Form {...form}>
              <form className="grid gap-4">
                <InputFormField
                  label={"Location"}
                  placeholder="Enter location"
                  name="location"
                />
                <DatePicker />
                <div className="grid gap-4">
                  <Button className="w-full">Search Vehicles</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center justify-center space-y-1">
            <CarIcon className="h-6 w-6" />
            <h3 className="text-sm font-semibold tracking-wide uppercase/none">
              Cars
            </h3>
            <p className="text-sm text-center not-italic">
              Comfortable and fuel-efficient
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <TruckIcon className="h-6 w-6" />
            <h3 className="text-sm font-semibold tracking-wide uppercase/none">
              Trucks
            </h3>
            <p className="text-sm text-center not-italic">
              Tough and ready for heavy loads
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <CarIcon className="h-6 w-6" />
            <h3 className="text-sm font-semibold tracking-wide uppercase/none">
              SUVs
            </h3>
            <p className="text-sm text-center not-italic">
              Spacious and versatile for any terrain
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-1">
            <BikeIcon className="h-6 w-6" />
            <h3 className="text-sm font-semibold tracking-wide uppercase/none">
              Motorcycles
            </h3>
            <p className="text-sm text-center not-italic">
              Freedom on two wheels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BikeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18.5" cy="17.5" r="3.5" />
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="15" cy="5" r="1" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  );
}

function CarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}
