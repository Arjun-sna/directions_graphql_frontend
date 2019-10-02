import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "~/modules/app/gqlQueries";
import AuthForm from "~/modules/auth/authForm";
import { parseGraphqlError } from "~/utils";

export default ({ onSuccess }) => {
  const mutationOptions = {
    onCompleted: onSuccess
  };
  const [authAction, { loading, error }] = useMutation(
    SIGN_UP,
    mutationOptions
  );

  return (
    <AuthForm
      isSignInUp
      onSubmit={({ username, userIdentifier, password }) => {
        authAction({ variables: { username, userIdentifier, password } });
      }}
      disabled={loading}
      errorMessage={error && parseGraphqlError(error)}
      showLoader={loading}
    />
  );
};
