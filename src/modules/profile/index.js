import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LOCAL_USER_DATA } from "../app/gqlQueries";

export default () => {
  const {
    data: { user }
  } = useQuery(LOCAL_USER_DATA);

  return (
    <div>
      Hello {user.username}
      <div>{user.email}</div>
    </div>
  );
};
