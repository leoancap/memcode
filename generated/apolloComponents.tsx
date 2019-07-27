export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type IDeck = {
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  bundledExercises: Scalars["String"];
  tags: Array<Scalars["String"]>;
  language: Scalars["String"];
  userId: Scalars["Float"];
  user: IUser;
  exercises: Array<IExercise>;
};

export type IDeckInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  tags: Array<Scalars["String"]>;
  language: Scalars["String"];
};

export type IDeckToReview = {
  id: Scalars["ID"];
  deckToReviewId: Scalars["String"];
  deck: IDeck;
  user: IUser;
  exercisesToReview: Array<IExerciseToReview>;
};

export type IExercise = {
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  code: Scalars["String"];
  solution: Scalars["String"];
  tests: Scalars["String"];
  deckId: Scalars["String"];
  deck: IDeck;
};

export type IExerciseInput = {
  deckId: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  code: Scalars["String"];
  solution: Scalars["String"];
  tests: Scalars["String"];
};

export type IExerciseToReview = {
  id: Scalars["ID"];
  exerciseId: Scalars["String"];
  nextInterval: Scalars["Float"];
  exercise: IExercise;
  lastAttempt: Scalars["Float"];
  deckToReview: IDeckToReview;
};

export type IMutation = {
  changePassword?: Maybe<IUser>;
  forgotPassword: Scalars["Boolean"];
  login?: Maybe<IUser>;
  logout: Scalars["Boolean"];
  register: IUser;
  createDeck?: Maybe<Array<IDeck>>;
  deleteDeck?: Maybe<Array<IDeck>>;
  createExercise?: Maybe<IDeck>;
  deleteExercise?: Maybe<IDeck>;
  addDeckToReview?: Maybe<IUser>;
  addExerciseToReview?: Maybe<IUser>;
  strenghtenExercise?: Maybe<IUser>;
};

export type IMutationChangePasswordArgs = {
  data: IChangePasswordInput;
};

export type IMutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type IMutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type IMutationRegisterArgs = {
  data: IRegisterInput;
};

export type IMutationCreateDeckArgs = {
  data: IDeckInput;
};

export type IMutationDeleteDeckArgs = {
  deckId: Scalars["String"];
};

export type IMutationCreateExerciseArgs = {
  data: IExerciseInput;
};

export type IMutationDeleteExerciseArgs = {
  exerciseId: Scalars["String"];
  deckId: Scalars["String"];
};

export type IMutationAddDeckToReviewArgs = {
  level: Scalars["Float"];
  exerciseId: Scalars["String"];
  deckId: Scalars["String"];
};

export type IMutationAddExerciseToReviewArgs = {
  level: Scalars["Float"];
  exerciseId: Scalars["String"];
  deckId: Scalars["String"];
};

export type IMutationStrenghtenExerciseArgs = {
  level: Scalars["Float"];
  exerciseId: Scalars["String"];
};

export type IQuery = {
  me?: Maybe<IUser>;
  hello: Scalars["String"];
  findDecksByLanguage: Array<IDeck>;
  decks: Array<IDeck>;
  myDecks: Array<IDeck>;
  findDeckByTitle?: Maybe<IDeck>;
  findDeckById?: Maybe<IDeck>;
  findDeckByIdAndUser?: Maybe<IDeck>;
  findDeckByPattern?: Maybe<IDeck>;
  myDecksToReview?: Maybe<Array<IDeckToReview>>;
};

export type IQueryFindDecksByLanguageArgs = {
  language: Scalars["String"];
};

export type IQueryFindDeckByTitleArgs = {
  title: Scalars["String"];
  user: Scalars["String"];
};

export type IQueryFindDeckByIdArgs = {
  deckId: Scalars["String"];
};

export type IQueryFindDeckByIdAndUserArgs = {
  deckId: Scalars["String"];
  user: Scalars["String"];
};

export type IQueryFindDeckByPatternArgs = {
  str: Scalars["String"];
};

export type IRegisterInput = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type IUser = {
  id: Scalars["ID"];
  uuid: Scalars["String"];
  email: Scalars["String"];
  decks: Array<IDeck>;
  decksToReview?: Maybe<Array<IDeckToReview>>;
};
export type ICreateDeckMutationVariables = {
  data: IDeckInput;
};

export type ICreateDeckMutation = { __typename?: "Mutation" } & {
  createDeck: Maybe<
    Array<
      { __typename?: "Deck" } & Pick<
        IDeck,
        | "id"
        | "title"
        | "description"
        | "tags"
        | "language"
        | "bundledExercises"
      > & { user: { __typename?: "User" } & Pick<IUser, "id" | "uuid"> }
    >
  >;
};

export type ICreateExerciseMutationVariables = {
  data: IExerciseInput;
};

export type ICreateExerciseMutation = { __typename?: "Mutation" } & {
  createExercise: Maybe<{ __typename?: "Deck" } & Pick<IDeck, "id">>;
};

export type IDeleteDeckMutationVariables = {
  deckId: Scalars["String"];
};

export type IDeleteDeckMutation = { __typename?: "Mutation" } & {
  deleteDeck: Maybe<
    Array<
      { __typename?: "Deck" } & Pick<
        IDeck,
        | "id"
        | "title"
        | "description"
        | "tags"
        | "language"
        | "bundledExercises"
      > & { user: { __typename?: "User" } & Pick<IUser, "id" | "uuid"> }
    >
  >;
};

export type IDeleteExerciseMutationVariables = {
  deckId: Scalars["String"];
  exerciseId: Scalars["String"];
};

export type IDeleteExerciseMutation = { __typename?: "Mutation" } & {
  deleteExercise: Maybe<
    { __typename?: "Deck" } & Pick<
      IDeck,
      "id" | "title" | "description" | "language" | "bundledExercises" | "tags"
    > & {
        user: { __typename?: "User" } & Pick<IUser, "id" | "uuid">;
        exercises: Array<
          { __typename?: "Exercise" } & Pick<
            IExercise,
            "id" | "title" | "description" | "code" | "solution" | "tests"
          >
        >;
      }
  >;
};

export type IDecksQueryVariables = {};

export type IDecksQuery = { __typename?: "Query" } & {
  decks: Array<
    { __typename?: "Deck" } & Pick<
      IDeck,
      "id" | "title" | "description" | "tags" | "language" | "bundledExercises"
    > & { user: { __typename?: "User" } & Pick<IUser, "id" | "uuid"> }
  >;
};

export type IFindDeckByTitleQueryVariables = {
  user: Scalars["String"];
  title: Scalars["String"];
};

export type IFindDeckByTitleQuery = { __typename?: "Query" } & {
  findDeckByTitle: Maybe<
    { __typename?: "Deck" } & Pick<
      IDeck,
      "id" | "title" | "description" | "language" | "bundledExercises" | "tags"
    > & {
        user: { __typename?: "User" } & Pick<IUser, "id" | "uuid">;
        exercises: Array<
          { __typename?: "Exercise" } & Pick<
            IExercise,
            "id" | "title" | "description" | "code" | "solution" | "tests"
          >
        >;
      }
  >;
};

export type IFindDeckByIdAndUserQueryVariables = {
  user: Scalars["String"];
  deckId: Scalars["String"];
};

export type IFindDeckByIdAndUserQuery = { __typename?: "Query" } & {
  findDeckByIdAndUser: Maybe<
    { __typename?: "Deck" } & Pick<
      IDeck,
      "id" | "title" | "description" | "language" | "bundledExercises" | "tags"
    > & {
        user: { __typename?: "User" } & Pick<IUser, "id" | "uuid">;
        exercises: Array<
          { __typename?: "Exercise" } & Pick<
            IExercise,
            "id" | "title" | "description" | "code" | "solution" | "tests"
          >
        >;
      }
  >;
};

export type IFindDeckByIdQueryVariables = {
  deckId: Scalars["String"];
};

export type IFindDeckByIdQuery = { __typename?: "Query" } & {
  findDeckById: Maybe<
    { __typename?: "Deck" } & Pick<
      IDeck,
      "id" | "title" | "description" | "language" | "bundledExercises" | "tags"
    > & {
        user: { __typename?: "User" } & Pick<IUser, "id" | "uuid">;
        exercises: Array<
          { __typename?: "Exercise" } & Pick<
            IExercise,
            "id" | "title" | "description" | "code" | "solution" | "tests"
          >
        >;
      }
  >;
};

export type IFindDecksByLanguageQueryVariables = {
  language: Scalars["String"];
};

export type IFindDecksByLanguageQuery = { __typename?: "Query" } & {
  findDecksByLanguage: Array<
    { __typename?: "Deck" } & Pick<
      IDeck,
      "id" | "title" | "description" | "language" | "bundledExercises" | "tags"
    > & {
        user: { __typename?: "User" } & Pick<IUser, "id" | "uuid">;
        exercises: Array<
          { __typename?: "Exercise" } & Pick<
            IExercise,
            "id" | "title" | "description" | "code" | "solution" | "tests"
          >
        >;
      }
  >;
};

export type IAddDeckToReviewMutationVariables = {
  exerciseId: Scalars["String"];
  deckId: Scalars["String"];
  level: Scalars["Float"];
};

export type IAddDeckToReviewMutation = { __typename?: "Mutation" } & {
  addDeckToReview: Maybe<{ __typename?: "User" } & Pick<IUser, "id">>;
};

export type ILoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type ILoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "User" } & Pick<IUser, "email" | "uuid">>;
};

export type ILogoutMutationVariables = {};

export type ILogoutMutation = { __typename?: "Mutation" } & Pick<
  IMutation,
  "logout"
>;

export type IRegisterMutationVariables = {
  data: IRegisterInput;
};

export type IRegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & Pick<IUser, "uuid" | "email">;
};

export type IHelloQueryVariables = {};

export type IHelloQuery = { __typename?: "Query" } & Pick<IQuery, "hello">;

export type IMeQueryVariables = {};

export type IMeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & Pick<IUser, "email" | "uuid">>;
};

export type IMyDecksToReviewQueryVariables = {};

export type IMyDecksToReviewQuery = { __typename?: "Query" } & {
  myDecksToReview: Maybe<
    Array<
      { __typename?: "DeckToReview" } & Pick<
        IDeckToReview,
        "id" | "deckToReviewId"
      > & {
          deck: { __typename?: "Deck" } & Pick<
            IDeck,
            "title" | "description" | "language" | "tags" | "id"
          >;
          exercisesToReview: Array<
            { __typename?: "ExerciseToReview" } & Pick<
              IExerciseToReview,
              "id" | "exerciseId" | "nextInterval" | "lastAttempt"
            > & {
                exercise: { __typename?: "Exercise" } & Pick<
                  IExercise,
                  "id" | "title" | "description" | "code" | "solution" | "tests"
                >;
              }
          >;
        }
    >
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CreateDeckDocument = gql`
  mutation CreateDeck($data: DeckInput!) {
    createDeck(data: $data) {
      id
      title
      description
      tags
      language
      bundledExercises
      user {
        id
        uuid
      }
    }
  }
`;
export type ICreateDeckMutationFn = ReactApollo.MutationFn<
  ICreateDeckMutation,
  ICreateDeckMutationVariables
>;

export const CreateDeckComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        ICreateDeckMutation,
        ICreateDeckMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: ICreateDeckMutationVariables }
) => (
  <ReactApollo.Mutation<ICreateDeckMutation, ICreateDeckMutationVariables>
    mutation={CreateDeckDocument}
    {...props}
  />
);

export type ICreateDeckProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ICreateDeckMutation, ICreateDeckMutationVariables>
> &
  TChildProps;
export function withCreateDeck<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ICreateDeckMutation,
    ICreateDeckMutationVariables,
    ICreateDeckProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ICreateDeckMutation,
    ICreateDeckMutationVariables,
    ICreateDeckProps<TChildProps>
  >(CreateDeckDocument, {
    alias: "withCreateDeck",
    ...operationOptions
  });
}

export function useCreateDeckMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ICreateDeckMutation,
    ICreateDeckMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ICreateDeckMutation,
    ICreateDeckMutationVariables
  >(CreateDeckDocument, baseOptions);
}
export const CreateExerciseDocument = gql`
  mutation CreateExercise($data: ExerciseInput!) {
    createExercise(data: $data) {
      id
    }
  }
`;
export type ICreateExerciseMutationFn = ReactApollo.MutationFn<
  ICreateExerciseMutation,
  ICreateExerciseMutationVariables
>;

export const CreateExerciseComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        ICreateExerciseMutation,
        ICreateExerciseMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: ICreateExerciseMutationVariables }
) => (
  <ReactApollo.Mutation<
    ICreateExerciseMutation,
    ICreateExerciseMutationVariables
  >
    mutation={CreateExerciseDocument}
    {...props}
  />
);

export type ICreateExerciseProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ICreateExerciseMutation,
    ICreateExerciseMutationVariables
  >
> &
  TChildProps;
export function withCreateExercise<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ICreateExerciseMutation,
    ICreateExerciseMutationVariables,
    ICreateExerciseProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ICreateExerciseMutation,
    ICreateExerciseMutationVariables,
    ICreateExerciseProps<TChildProps>
  >(CreateExerciseDocument, {
    alias: "withCreateExercise",
    ...operationOptions
  });
}

export function useCreateExerciseMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ICreateExerciseMutation,
    ICreateExerciseMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ICreateExerciseMutation,
    ICreateExerciseMutationVariables
  >(CreateExerciseDocument, baseOptions);
}
export const DeleteDeckDocument = gql`
  mutation deleteDeck($deckId: String!) {
    deleteDeck(deckId: $deckId) {
      id
      title
      description
      tags
      language
      bundledExercises
      user {
        id
        uuid
      }
    }
  }
`;
export type IDeleteDeckMutationFn = ReactApollo.MutationFn<
  IDeleteDeckMutation,
  IDeleteDeckMutationVariables
>;

export const DeleteDeckComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        IDeleteDeckMutation,
        IDeleteDeckMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: IDeleteDeckMutationVariables }
) => (
  <ReactApollo.Mutation<IDeleteDeckMutation, IDeleteDeckMutationVariables>
    mutation={DeleteDeckDocument}
    {...props}
  />
);

export type IDeleteDeckProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<IDeleteDeckMutation, IDeleteDeckMutationVariables>
> &
  TChildProps;
export function withDeleteDeck<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IDeleteDeckMutation,
    IDeleteDeckMutationVariables,
    IDeleteDeckProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    IDeleteDeckMutation,
    IDeleteDeckMutationVariables,
    IDeleteDeckProps<TChildProps>
  >(DeleteDeckDocument, {
    alias: "withDeleteDeck",
    ...operationOptions
  });
}

export function useDeleteDeckMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    IDeleteDeckMutation,
    IDeleteDeckMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    IDeleteDeckMutation,
    IDeleteDeckMutationVariables
  >(DeleteDeckDocument, baseOptions);
}
export const DeleteExerciseDocument = gql`
  mutation deleteExercise($deckId: String!, $exerciseId: String!) {
    deleteExercise(deckId: $deckId, exerciseId: $exerciseId) {
      id
      title
      description
      language
      bundledExercises
      tags
      user {
        id
        uuid
      }
      exercises {
        id
        title
        description
        code
        solution
        tests
      }
    }
  }
`;
export type IDeleteExerciseMutationFn = ReactApollo.MutationFn<
  IDeleteExerciseMutation,
  IDeleteExerciseMutationVariables
>;

export const DeleteExerciseComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        IDeleteExerciseMutation,
        IDeleteExerciseMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: IDeleteExerciseMutationVariables }
) => (
  <ReactApollo.Mutation<
    IDeleteExerciseMutation,
    IDeleteExerciseMutationVariables
  >
    mutation={DeleteExerciseDocument}
    {...props}
  />
);

export type IDeleteExerciseProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    IDeleteExerciseMutation,
    IDeleteExerciseMutationVariables
  >
> &
  TChildProps;
export function withDeleteExercise<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IDeleteExerciseMutation,
    IDeleteExerciseMutationVariables,
    IDeleteExerciseProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    IDeleteExerciseMutation,
    IDeleteExerciseMutationVariables,
    IDeleteExerciseProps<TChildProps>
  >(DeleteExerciseDocument, {
    alias: "withDeleteExercise",
    ...operationOptions
  });
}

export function useDeleteExerciseMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    IDeleteExerciseMutation,
    IDeleteExerciseMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    IDeleteExerciseMutation,
    IDeleteExerciseMutationVariables
  >(DeleteExerciseDocument, baseOptions);
}
export const DecksDocument = gql`
  query Decks {
    decks {
      id
      title
      description
      tags
      language
      bundledExercises
      user {
        id
        uuid
      }
    }
  }
`;

export const DecksComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<IDecksQuery, IDecksQueryVariables>, "query">,
    "variables"
  > & { variables?: IDecksQueryVariables }
) => (
  <ReactApollo.Query<IDecksQuery, IDecksQueryVariables>
    query={DecksDocument}
    {...props}
  />
);

export type IDecksProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IDecksQuery, IDecksQueryVariables>
> &
  TChildProps;
export function withDecks<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IDecksQuery,
    IDecksQueryVariables,
    IDecksProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IDecksQuery,
    IDecksQueryVariables,
    IDecksProps<TChildProps>
  >(DecksDocument, {
    alias: "withDecks",
    ...operationOptions
  });
}

export function useDecksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IDecksQueryVariables>
) {
  return ReactApolloHooks.useQuery<IDecksQuery, IDecksQueryVariables>(
    DecksDocument,
    baseOptions
  );
}
export const FindDeckByTitleDocument = gql`
  query FindDeckByTitle($user: String!, $title: String!) {
    findDeckByTitle(user: $user, title: $title) {
      id
      title
      description
      language
      bundledExercises
      tags
      user {
        id
        uuid
      }
      exercises {
        id
        title
        description
        code
        solution
        tests
      }
    }
  }
`;

export const FindDeckByTitleComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        IFindDeckByTitleQuery,
        IFindDeckByTitleQueryVariables
      >,
      "query"
    >,
    "variables"
  > & { variables: IFindDeckByTitleQueryVariables }
) => (
  <ReactApollo.Query<IFindDeckByTitleQuery, IFindDeckByTitleQueryVariables>
    query={FindDeckByTitleDocument}
    {...props}
  />
);

export type IFindDeckByTitleProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IFindDeckByTitleQuery, IFindDeckByTitleQueryVariables>
> &
  TChildProps;
export function withFindDeckByTitle<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IFindDeckByTitleQuery,
    IFindDeckByTitleQueryVariables,
    IFindDeckByTitleProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IFindDeckByTitleQuery,
    IFindDeckByTitleQueryVariables,
    IFindDeckByTitleProps<TChildProps>
  >(FindDeckByTitleDocument, {
    alias: "withFindDeckByTitle",
    ...operationOptions
  });
}

export function useFindDeckByTitleQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    IFindDeckByTitleQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    IFindDeckByTitleQuery,
    IFindDeckByTitleQueryVariables
  >(FindDeckByTitleDocument, baseOptions);
}
export const FindDeckByIdAndUserDocument = gql`
  query FindDeckByIdAndUser($user: String!, $deckId: String!) {
    findDeckByIdAndUser(user: $user, deckId: $deckId) {
      id
      title
      description
      language
      bundledExercises
      tags
      user {
        id
        uuid
      }
      exercises {
        id
        title
        description
        code
        solution
        tests
      }
    }
  }
`;

export const FindDeckByIdAndUserComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        IFindDeckByIdAndUserQuery,
        IFindDeckByIdAndUserQueryVariables
      >,
      "query"
    >,
    "variables"
  > & { variables: IFindDeckByIdAndUserQueryVariables }
) => (
  <ReactApollo.Query<
    IFindDeckByIdAndUserQuery,
    IFindDeckByIdAndUserQueryVariables
  >
    query={FindDeckByIdAndUserDocument}
    {...props}
  />
);

export type IFindDeckByIdAndUserProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    IFindDeckByIdAndUserQuery,
    IFindDeckByIdAndUserQueryVariables
  >
> &
  TChildProps;
export function withFindDeckByIdAndUser<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IFindDeckByIdAndUserQuery,
    IFindDeckByIdAndUserQueryVariables,
    IFindDeckByIdAndUserProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IFindDeckByIdAndUserQuery,
    IFindDeckByIdAndUserQueryVariables,
    IFindDeckByIdAndUserProps<TChildProps>
  >(FindDeckByIdAndUserDocument, {
    alias: "withFindDeckByIdAndUser",
    ...operationOptions
  });
}

export function useFindDeckByIdAndUserQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    IFindDeckByIdAndUserQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    IFindDeckByIdAndUserQuery,
    IFindDeckByIdAndUserQueryVariables
  >(FindDeckByIdAndUserDocument, baseOptions);
}
export const FindDeckByIdDocument = gql`
  query FindDeckById($deckId: String!) {
    findDeckById(deckId: $deckId) {
      id
      title
      description
      language
      bundledExercises
      tags
      user {
        id
        uuid
      }
      exercises {
        id
        title
        description
        code
        solution
        tests
      }
    }
  }
`;

export const FindDeckByIdComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<IFindDeckByIdQuery, IFindDeckByIdQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables: IFindDeckByIdQueryVariables }
) => (
  <ReactApollo.Query<IFindDeckByIdQuery, IFindDeckByIdQueryVariables>
    query={FindDeckByIdDocument}
    {...props}
  />
);

export type IFindDeckByIdProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IFindDeckByIdQuery, IFindDeckByIdQueryVariables>
> &
  TChildProps;
export function withFindDeckById<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IFindDeckByIdQuery,
    IFindDeckByIdQueryVariables,
    IFindDeckByIdProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IFindDeckByIdQuery,
    IFindDeckByIdQueryVariables,
    IFindDeckByIdProps<TChildProps>
  >(FindDeckByIdDocument, {
    alias: "withFindDeckById",
    ...operationOptions
  });
}

export function useFindDeckByIdQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IFindDeckByIdQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    IFindDeckByIdQuery,
    IFindDeckByIdQueryVariables
  >(FindDeckByIdDocument, baseOptions);
}
export const FindDecksByLanguageDocument = gql`
  query FindDecksByLanguage($language: String!) {
    findDecksByLanguage(language: $language) {
      id
      title
      description
      language
      bundledExercises
      tags
      user {
        id
        uuid
      }
      exercises {
        id
        title
        description
        code
        solution
        tests
      }
    }
  }
`;

export const FindDecksByLanguageComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        IFindDecksByLanguageQuery,
        IFindDecksByLanguageQueryVariables
      >,
      "query"
    >,
    "variables"
  > & { variables: IFindDecksByLanguageQueryVariables }
) => (
  <ReactApollo.Query<
    IFindDecksByLanguageQuery,
    IFindDecksByLanguageQueryVariables
  >
    query={FindDecksByLanguageDocument}
    {...props}
  />
);

export type IFindDecksByLanguageProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    IFindDecksByLanguageQuery,
    IFindDecksByLanguageQueryVariables
  >
> &
  TChildProps;
export function withFindDecksByLanguage<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IFindDecksByLanguageQuery,
    IFindDecksByLanguageQueryVariables,
    IFindDecksByLanguageProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IFindDecksByLanguageQuery,
    IFindDecksByLanguageQueryVariables,
    IFindDecksByLanguageProps<TChildProps>
  >(FindDecksByLanguageDocument, {
    alias: "withFindDecksByLanguage",
    ...operationOptions
  });
}

export function useFindDecksByLanguageQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    IFindDecksByLanguageQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    IFindDecksByLanguageQuery,
    IFindDecksByLanguageQueryVariables
  >(FindDecksByLanguageDocument, baseOptions);
}
export const AddDeckToReviewDocument = gql`
  mutation addDeckToReview(
    $exerciseId: String!
    $deckId: String!
    $level: Float!
  ) {
    addDeckToReview(exerciseId: $exerciseId, deckId: $deckId, level: $level) {
      id
    }
  }
`;
export type IAddDeckToReviewMutationFn = ReactApollo.MutationFn<
  IAddDeckToReviewMutation,
  IAddDeckToReviewMutationVariables
>;

export const AddDeckToReviewComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        IAddDeckToReviewMutation,
        IAddDeckToReviewMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: IAddDeckToReviewMutationVariables }
) => (
  <ReactApollo.Mutation<
    IAddDeckToReviewMutation,
    IAddDeckToReviewMutationVariables
  >
    mutation={AddDeckToReviewDocument}
    {...props}
  />
);

export type IAddDeckToReviewProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    IAddDeckToReviewMutation,
    IAddDeckToReviewMutationVariables
  >
> &
  TChildProps;
export function withAddDeckToReview<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IAddDeckToReviewMutation,
    IAddDeckToReviewMutationVariables,
    IAddDeckToReviewProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    IAddDeckToReviewMutation,
    IAddDeckToReviewMutationVariables,
    IAddDeckToReviewProps<TChildProps>
  >(AddDeckToReviewDocument, {
    alias: "withAddDeckToReview",
    ...operationOptions
  });
}

export function useAddDeckToReviewMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    IAddDeckToReviewMutation,
    IAddDeckToReviewMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    IAddDeckToReviewMutation,
    IAddDeckToReviewMutationVariables
  >(AddDeckToReviewDocument, baseOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      uuid
    }
  }
`;
export type ILoginMutationFn = ReactApollo.MutationFn<
  ILoginMutation,
  ILoginMutationVariables
>;

export const LoginComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<ILoginMutation, ILoginMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: ILoginMutationVariables }
) => (
  <ReactApollo.Mutation<ILoginMutation, ILoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type ILoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ILoginMutation, ILoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ILoginMutation,
    ILoginMutationVariables,
    ILoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ILoginMutation,
    ILoginMutationVariables,
    ILoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ILoginMutation,
    ILoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<ILoginMutation, ILoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type ILogoutMutationFn = ReactApollo.MutationFn<
  ILogoutMutation,
  ILogoutMutationVariables
>;

export const LogoutComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<ILogoutMutation, ILogoutMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: ILogoutMutationVariables }
) => (
  <ReactApollo.Mutation<ILogoutMutation, ILogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type ILogoutProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ILogoutMutation, ILogoutMutationVariables>
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ILogoutMutation,
    ILogoutMutationVariables,
    ILogoutProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ILogoutMutation,
    ILogoutMutationVariables,
    ILogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: "withLogout",
    ...operationOptions
  });
}

export function useLogoutMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ILogoutMutation,
    ILogoutMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ILogoutMutation,
    ILogoutMutationVariables
  >(LogoutDocument, baseOptions);
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      uuid
      email
    }
  }
`;
export type IRegisterMutationFn = ReactApollo.MutationFn<
  IRegisterMutation,
  IRegisterMutationVariables
>;

export const RegisterComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<IRegisterMutation, IRegisterMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: IRegisterMutationVariables }
) => (
  <ReactApollo.Mutation<IRegisterMutation, IRegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
);

export type IRegisterProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<IRegisterMutation, IRegisterMutationVariables>
> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IRegisterMutation,
    IRegisterMutationVariables,
    IRegisterProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    IRegisterMutation,
    IRegisterMutationVariables,
    IRegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: "withRegister",
    ...operationOptions
  });
}

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    IRegisterMutation,
    IRegisterMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    IRegisterMutation,
    IRegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;

export const HelloComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<IHelloQuery, IHelloQueryVariables>, "query">,
    "variables"
  > & { variables?: IHelloQueryVariables }
) => (
  <ReactApollo.Query<IHelloQuery, IHelloQueryVariables>
    query={HelloDocument}
    {...props}
  />
);

export type IHelloProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IHelloQuery, IHelloQueryVariables>
> &
  TChildProps;
export function withHello<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IHelloQuery,
    IHelloQueryVariables,
    IHelloProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IHelloQuery,
    IHelloQueryVariables,
    IHelloProps<TChildProps>
  >(HelloDocument, {
    alias: "withHello",
    ...operationOptions
  });
}

export function useHelloQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IHelloQueryVariables>
) {
  return ReactApolloHooks.useQuery<IHelloQuery, IHelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export const MeDocument = gql`
  query Me {
    me {
      email
      uuid
    }
  }
`;

export const MeComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<IMeQuery, IMeQueryVariables>, "query">,
    "variables"
  > & { variables?: IMeQueryVariables }
) => (
  <ReactApollo.Query<IMeQuery, IMeQueryVariables>
    query={MeDocument}
    {...props}
  />
);

export type IMeProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IMeQuery, IMeQueryVariables>
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IMeQuery,
    IMeQueryVariables,
    IMeProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IMeQuery,
    IMeQueryVariables,
    IMeProps<TChildProps>
  >(MeDocument, {
    alias: "withMe",
    ...operationOptions
  });
}

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IMeQueryVariables>
) {
  return ReactApolloHooks.useQuery<IMeQuery, IMeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export const MyDecksToReviewDocument = gql`
  query myDecksToReview {
    myDecksToReview {
      id
      deckToReviewId
      deck {
        title
        description
        language
        tags
        id
      }
      exercisesToReview {
        id
        exerciseId
        nextInterval
        lastAttempt
        exercise {
          id
          title
          description
          code
          solution
          tests
        }
      }
    }
  }
`;

export const MyDecksToReviewComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        IMyDecksToReviewQuery,
        IMyDecksToReviewQueryVariables
      >,
      "query"
    >,
    "variables"
  > & { variables?: IMyDecksToReviewQueryVariables }
) => (
  <ReactApollo.Query<IMyDecksToReviewQuery, IMyDecksToReviewQueryVariables>
    query={MyDecksToReviewDocument}
    {...props}
  />
);

export type IMyDecksToReviewProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IMyDecksToReviewQuery, IMyDecksToReviewQueryVariables>
> &
  TChildProps;
export function withMyDecksToReview<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IMyDecksToReviewQuery,
    IMyDecksToReviewQueryVariables,
    IMyDecksToReviewProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IMyDecksToReviewQuery,
    IMyDecksToReviewQueryVariables,
    IMyDecksToReviewProps<TChildProps>
  >(MyDecksToReviewDocument, {
    alias: "withMyDecksToReview",
    ...operationOptions
  });
}

export function useMyDecksToReviewQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    IMyDecksToReviewQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    IMyDecksToReviewQuery,
    IMyDecksToReviewQueryVariables
  >(MyDecksToReviewDocument, baseOptions);
}
