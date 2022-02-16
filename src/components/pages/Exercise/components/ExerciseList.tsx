import {
  ActionIcon,
  ScrollArea,
  Input,
  useMantineColorScheme,
} from "@mantine/core";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useRef } from "react";
import { DeckContext } from "src/context/DeckContext";
import { TExercise } from "src/types/Domain";

const ExerciseItem = ({
  exercise = null,
  isDark,
  onDeleteExercise = undefined,
  onUpdateExercise = undefined,
  selected = false,
  setCurrentExercise,
}) => {
  const variant = React.useMemo(() => {
    if (isDark) return selected ? "filled" : "default";
    return selected ? "default" : "filled";
  }, [isDark, selected]);

  const [isEditing, setIsEditing] = React.useState(false);

  const [newTitle, setNewTitle] = React.useState(exercise.title);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Input
      onClick={() => setCurrentExercise(exercise)}
      {...(onUpdateExercise && {
        onDoubleClick: () => setIsEditing(!isEditing),
      })}
      {...(isEditing && {
        onChange: (e: { target: { value: any } }) => {
          setNewTitle(e.target.value);
        },
      })}
      value={newTitle}
      variant={variant}
      mb="xs"
      ref={inputRef}
      readOnly={!isEditing}
      sx={{
        input: {
          cursor: "pointer",
          transition: "300ms",
          "&:hover": {
            filter: true ? "invert(0.1)" : "brightness(50%)",
          },
          borderRadius: 0,
        },
      }}
      rightSection={
        selected && !isEditing && onDeleteExercise ? (
          <ActionIcon
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              onDeleteExercise(exercise.id);
            }}
          >
            <Cross1Icon height={20} width={20} />
          </ActionIcon>
        ) : isEditing ? (
          <ActionIcon
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              onUpdateExercise({ title: newTitle });
            }}
          >
            <CheckIcon height={20} width={20} />
          </ActionIcon>
        ) : null
      }
    />
  );
};

export const ExerciseList = () => {
  const { colorScheme } = useMantineColorScheme();
  const scrollAreaRef = useRef<HTMLDivElement>();

  const {
    currentExercise,
    setCurrentExercise,
    deck: { exercises },
    onUpdateExercise,
    onDeleteExercise,
  } = React.useContext(DeckContext);

  // const scrollToBottom = () =>
  //   scrollAreaRef.current.scrollTo({
  //     top: scrollAreaRef.current.scrollHeight,
  //     behavior: "smooth",
  //   });

  // React.useEffect(() => {
  //   if (exercises) scrollToBottom();
  // }, [exercises]);

  return (
    <ScrollArea
      viewportRef={scrollAreaRef}
      offsetScrollbars
      sx={{ height: "100%" }}
    >
      {exercises.map((thisExercise: TExercise, key: number) => (
        <ExerciseItem
          exercise={thisExercise}
          isDark={colorScheme === "dark"}
          key={key + thisExercise.id}
          onDeleteExercise={onDeleteExercise}
          onUpdateExercise={onUpdateExercise}
          selected={currentExercise?.id === thisExercise.id}
          setCurrentExercise={setCurrentExercise}
        />
      ))}
    </ScrollArea>
  );
};
