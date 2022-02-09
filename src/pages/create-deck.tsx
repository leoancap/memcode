import React from "react";
import { Button, Box, Flex, Text } from "rebass";
import Router from "next/router";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.
import { useSession } from "next-auth/react";

export default function CreateDecks() {
  const session = useSession();
  React.useEffect(() => {
    if (session.status === "unauthenticated") {
      Router.push("/");
    }
  }, []);
  const [submitting, setSubmitting] = React.useState(false);

  const [deckData, setDeckData] = React.useState({
    title: "",
    description: "",
    tags: [],
    language: "Typescript",
  });

  const handleChange = ({ target: { name, value } }: any) => {
    setDeckData({
      ...deckData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const res = await (
      await fetch("/api/create-deck", {
        method: "POST",
        body: JSON.stringify(deckData),
      })
    ).json();
    console.log({ res });
    if (!submitting) {
      setSubmitting(true);
      Router.push("/");
    }
  };

  return (
    <Layout>
      <Container>
        <PageHeader alignItems="center">
          <Box mr="auto" pl={[1, 2, 4, 6]}>
            <PageCrumb fontSize={[2, 3, 4, 5]} mr="auto">
              Create a Deck
            </PageCrumb>
          </Box>
        </PageHeader>
        <FormWrapper px={[2, 3, 4]} py={[3, 4, 5]} my={[2, 4]} mx={"auto"}>
          <FormField>
            <Label>Title</Label>
            <InputStyled
              onChange={handleChange}
              name="title"
              value={deckData.title}
            />
          </FormField>
          <FormField>
            <Label>Language</Label>
            <Select
              onChange={handleChange}
              name="language"
              value={deckData.language}
            >
              <option value="Typescript">Typescript</option>
              <option value="Javascript">Javascript</option>
              <option value="Python">Python</option>
              <option value="Reason">Reason</option>
            </Select>
          </FormField>
          <FormField>
            <Label>Tags</Label>
            <TagsTip>
              <TagsInput
                renderInput={autosuggestRenderInput}
                value={deckData.tags}
                onChange={(newTags: string[]) => {
                  setDeckData((oldData) => ({ ...oldData, tags: newTags }));
                }}
              />
            </TagsTip>
          </FormField>
          <FormField>
            <Label>Description</Label>
            <TextAreaStyled
              onChange={handleChange}
              name="description"
              value={deckData.description}
            />
          </FormField>
          <FormField>
            <div />
            <CreateButton onClick={onSubmit}>Create Deck</CreateButton>
          </FormField>
        </FormWrapper>
      </Container>
    </Layout>
  );
}

const Container = styled.div``;
export const PageHeader = styled(Flex)`
  height: 7rem;
  background: ${(props) => props.theme.bg1};
  border-bottom: solid 0.5px ${(props) => props.theme.bo1};
`;

const PageCrumb = styled(Text)`
  color: ${(props) => props.theme.co1};
  font-weight: 500;
`;

const FormWrapper = styled(Flex)`
  background: ${(props) => props.theme.bg1};
  flex-direction: column;
  width: 50rem;
  max-width: 90vw;
  border: 1px solid ${(props) => props.theme.bo1};
  border-radius: 0.5rem;
`;

const FormField = styled(Flex)`
  justify-content: space-between;
`;

const Label = styled(Text)`
  padding-top: 1rem;
  padding-right: 1rem;
  font-size: 16px;
  margin-bottom: 5rem;
  width: 10rem;
  text-align: right;
`;

export const TagsTip = styled.div`
  /* margin: 0; */
  margin-bottom: 2rem;
  width: 75%;
  max-width: 75vw;
  .react-tagsinput {
    padding: 1rem;
    border-radius: 0.9rem;
    border: 1px solid ${(props) => props.theme.bo1};
    background: ${(props) => props.theme.bg1};
  }
  .react-tagsinput-input {
    background: ${(props) => props.theme.bg1};
    color: ${(props) => props.theme.co1};
    border: none;
    height: 2rem;
    margin: 1rem;
    font-size: 18px;
    outline: none;
    /* box-shadow:${(props) => props.theme.bo2}; */
  }
  .react-tagsinput-tag {
    background: ${(props) => props.theme.bg1};
    filter: invert(0.1);
    border-radius: 0.3rem;
    color: ${(props) => props.theme.co1};
    border: 1px solid ${(props) => props.theme.bo1};
    margin: 0.3rem;
    padding: 0.5rem;
    height: 3rem;
    font-size: 16px;
  }
  .react-autosuggest__suggestion--highlighted {
    filter: invert(0.09);
  }
  .react-autosuggest__suggestion {
    cursor: pointer;
    font-size: 14px;
    background: ${(props) => props.theme.bg1};
    color: ${(props) => props.theme.co1};
    border-bottom: 1px solid ${(props) => props.theme.bo1};
    padding: 0.5rem;
  }
  ul {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  li {
    margin: 0.3rem;
    list-style-type: none;
  }
`;

const Select = styled.select`
  height: 4rem;
  border-radius: 0.9rem;
  border: 0px solid ${(props) => props.theme.bo1};
  width: 50%;
  max-width: 75vw;
  margin-right: 25%;
  &:focus {
    outline: none;
  }
  background: ${(props) => props.theme.bg1};
  filter: brightness(90%);
  font-size: 16px;
  padding-left: 2rem;
  color: ${(props) => props.theme.co1};
  option {
    font-size: 16px;
    color: ${(props) => props.theme.co1};
  }
`;

const InputStyled = styled.input`
  height: 4rem;
  border-radius: 0.9rem;
  border: 1px solid ${(props) => props.theme.bo1};
  background: ${(props) => props.theme.bg1};
  width: 75%;
  max-width: 75vw;
  font-size: 16px;
  padding-left: 1rem;
`;

const TextAreaStyled = styled.textarea`
  background: ${(props) => props.theme.bg1};
  font-size: 16px;
  width: 75%;
  max-width: 75vw;
  padding: 0.5rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid ${(props) => props.theme.bo1};
  resize: vertical;
`;

const CreateButton = styled(Button)`
  background: ${(props) => props.theme.bg1};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.co1};
  margin: 0 auto;
  margin-top: 2rem;
  font-size: 18px;
  cursor: pointer;
  filter: invert(1);
  font-weight: 500;
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    filter: invert(0.8);
  }
`;
