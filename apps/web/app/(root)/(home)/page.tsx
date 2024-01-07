"use client";
import { Button } from "@ui/components/Button";
import { useToast } from "@ui/hooks/use-toast";

const HomePage = () => {
  const { toast } = useToast();
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            toast({
              title: "Hello",
              description: "Hello World",
              variant: "error",
            });
          }}
        >
          New Button
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
