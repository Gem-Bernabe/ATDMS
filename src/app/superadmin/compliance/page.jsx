// pages/compliance-monitoring.jsx
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ComplianceMonitoring() {
  const [complianceRecords, setComplianceRecords] = useState([]);

  useEffect(() => {
    async function fetchCompliance() {
      const response = await fetch("/api/compliance");
      const data = await response.json();
      setComplianceRecords(data);
    }

    fetchCompliance();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Compliance Monitoring</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {complianceRecords.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle>{record.client}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Compliance Status: {record.status}</p>
              <Button className="mt-4">Review Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
