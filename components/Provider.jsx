"use client";

import { SessionProvider } from "next-auth/react";

// It is higher order component with childrens and current session
const Provider = ({ children, session }) => {
  // works like context api which has the data for all its children
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
