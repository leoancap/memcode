import React from "react";
import { useForm, useField } from "react-final-form-hooks";
import styled from "../../styled";

interface IForm {
  onSubmit: (values: any) => void;
  validate: (values: any) => void;
  errors: any;
}

export const InputField = ({ onSubmit, validate }: IForm) => {
  const { form, handleSubmit, submitting }: any = useForm({
    onSubmit,
    validate,
  });
  const email = useField("email", form);
  const password = useField("password", form);

  return (
    <Container>
      <FormStyled onSubmit={handleSubmit}>
        <FieldStyled>
          <LabelStyled>Email:</LabelStyled>
          <InputStyled {...email.input} />
          {email.meta.touched && email.meta.error && (
            <span>{email.meta.error}</span>
          )}
        </FieldStyled>
        <FieldStyled>
          <LabelStyled>Password:</LabelStyled>
          <InputStyled {...password.input} type="password" />
          {password.meta.touched && password.meta.error && (
            <span>{password.meta.error}</span>
          )}
        </FieldStyled>
        <SubmitWrapper>
          <SubmitStyled type="submit" disabled={submitting}>
            Continue
          </SubmitStyled>
        </SubmitWrapper>
        {/* <pre>{JSON.stringify(errors, undefined, 2)}</pre> */}
      </FormStyled>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-content: center;
  grid-row-gap: 1rem;
  background-color: ${(props) => props.theme.bg1};
`;
const LabelStyled = styled.label`
  font-size: 16px;
  text-shadow: 0px 0.5px 0.5px rgba(100, 100, 100, 0.1);
`;
const FormStyled = styled.form`
  display: grid;
  align-content: center;
  justify-content: center;
  grid-row-gap: 1rem;
  width: 35rem;
  max-width: 90vw;
`;

const InputStyled = styled.input`
  padding: 1.75rem 1rem;
  border: 0.5px solid grey;
  outline-offset: -3px;
  min-height: 5rem;
  width: 35rem;
  max-width: 90vw;
  min-height: 6rem;
  font-size: 16px;
  border-radius: 0.8rem;
  opacity: 0.8;
  background-color: ${(props) => props.theme.bg1};
  color: ${(props) => props.theme.co1};
`;
const SubmitWrapper = styled.div`
  display: grid;
  /* margin: 1rem; */
`;
const SubmitStyled = styled.button`
  padding: 1rem;
  border-radius: 0.8rem;
  border: none;
  background-color: ${(props) => props.theme.bg1};
  color: ${(props) => props.theme.co1};
  filter: invert(1);
  font-size: 18px;
  min-height: 6rem;
  margin-top: 2rem;
  box-shadow: 0px 1px 1px 1px rgba(5, 0, 10, 0.15);
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    opacity: 0.9;
  }
`;

const FieldStyled = styled.div`
  display: grid;
  justify-content: space-between;
  grid-row-gap: 0.5rem;
`;
