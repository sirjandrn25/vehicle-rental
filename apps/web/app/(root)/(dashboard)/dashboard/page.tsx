"use client";
import { StatsTile } from "@components/dashboard/stats.tile";
import { PageHeader } from "@components/pagers/PageHeader";
import { useAuthContext } from "@context/auth.provider";
import { Card } from "@ui/components/Card";
import React from "react";

const DashboardPage = () => {
  const { user } = useAuthContext();
  return (
    <div className="container max-w-6xl py-8">
      <PageHeader
        title={`Dashboard Welcome ${user?.name}`}
        subtitle={`Dashboard Details`}
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <StatsTile
          title="New clients"
          value={344}
          valueFormat="number"
          trend={0.12}
        />
        <StatsTile
          title="Revenue"
          value={5243}
          valueFormat="currency"
          trend={0.6}
        />
        <StatsTile
          title="Churn"
          value={0.03}
          valueFormat="percentage"
          trend={-0.3}
        />
      </div>

      <Card className="mt-8">
        <div className="text-muted-foreground flex h-64 items-center justify-center p-8">
          Place your content here...
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
