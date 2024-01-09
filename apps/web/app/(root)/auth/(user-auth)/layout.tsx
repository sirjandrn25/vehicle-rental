import { Button } from "@ui/components/Button";
import { Icon } from "@ui/components/Icon";
import Separation from "@ui/components/separation";
import { cn } from "@ui/lib/utils";
import Link from "next/link";

const UserAuthLayout = ({ children, className, props }: any) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col justify-center  sm:w-[350px]  gap-2",
        className
      )}
      {...props}
    >
      <Link href={"/"} className="text-xl mb-2 hover:underline text-center">
        My Drive
      </Link>
      <div className="flex items-center justify-between gap-4">
        <Button className="flex-1" variant="outline" type="button">
          <Icon.github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button className="flex-1" variant="outline" type="button">
          <Icon.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      <Separation className="mt-2" title="Or Continue with" />
      {children}
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default UserAuthLayout;
