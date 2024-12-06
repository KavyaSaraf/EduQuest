"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DownloadReportPage() {
  const handleDownload = () => {
    // Implement the download logic here
    console.log("Downloading progress report...");
  };

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Download Progress Report</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Click the button below to download your progress report.</p>
          <Button onClick={handleDownload}>Download Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}
