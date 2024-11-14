"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import { useAuthUserStore } from "@/services/user";
import { submitTourismForm } from "@/services/appwrite";
import BasicInfo from "./BasicInfo";
import Facilities from "./Facilities";
import Rooms from "./Rooms";
import Cottages from "./Cottages";
import Services from "./Services";
import Employees from "./Employees";

export default function TourismForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const methods = useForm();
  const { authUser, clearAuthUser } = useAuthUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/login"); // Redirect to login if no auth user
    }
  }, [authUser, router]);

  const onSubmit = async (data) => {
    try {
      const response = await submitTourismForm(data);
      console.log("Successfully submitted form:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return authUser ? (
    <FormProvider {...methods}>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Tourism Accommodation Inspection Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="rooms">Rooms</TabsTrigger>
                  <TabsTrigger value="cottages">Cottages & Villas</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="employees">Employees</TabsTrigger>
                </TabsList>
                <TabsContent value="basic">
                  <BasicInfo />
                </TabsContent>
                <TabsContent value="facilities">
                  <Facilities />
                </TabsContent>
                <TabsContent value="rooms">
                  <Rooms />
                </TabsContent>
                <TabsContent value="cottages">
                  <Cottages />
                </TabsContent>
                <TabsContent value="services">
                  <Services />
                </TabsContent>
                <TabsContent value="employees">
                  <Employees />
                </TabsContent>
              </Tabs>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab((prevTab) => prevTab)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={() => methods.handleSubmit(onSubmit)()}
                >
                  {activeTab === "employees" ? "Submit" : "Next"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  ) : (
    <Modal isOpen={true} onClose={() => router.push("/login")}>
      <div>
        <h2 className="text-lg font-semibold">Login Required</h2>
        <p className="mt-2">You must be logged in to access this page.</p>
      </div>
    </Modal>
  );
}
