import ConfigForm from "@/components/settings/ConfigForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Chat
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Admin Settings</h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <ConfigForm />
        </div>
      </div>
    </div>
  );
};

export default Admin;