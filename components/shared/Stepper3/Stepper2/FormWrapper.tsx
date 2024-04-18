import { redirect } from "next/dist/server/api-utils";
import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
        {title}
      </h2>
      <div
        className="flex flex-col gap-5 md:flex-row"
        // style={{
        //   display: "grid",
        //   gap: "1rem .5rem",
        //   justifyContent: "flex-start",
        //   gridTemplateColumns: "auto minmax(auto, 400px)",
        // }}
      >
        {children}
      </div>
    </>
  );
}
