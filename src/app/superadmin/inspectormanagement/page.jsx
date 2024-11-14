// pages/inspector-management.jsx
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InspectorManagement() {
  const [inspectors, setInspectors] = useState([]);

  useEffect(() => {
    // Fetch inspector data from an API
    async function fetchInspectors() {
      const response = await fetch("/api/inspectors");
      const data = await response.json();
      setInspectors(data);
    }

    fetchInspectors();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Inspector Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {inspectors.map((inspector) => (
          <Card key={inspector.id}>
            <CardHeader>
              <CardTitle>{inspector.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Position: {inspector.position}</p>
              <p>Region: {inspector.region}</p>
              <Button className="mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
