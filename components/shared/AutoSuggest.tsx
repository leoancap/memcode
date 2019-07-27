import Autosuggest from "react-autosuggest"

// const tags = [
//   "Algorithms",
//   "String",
//   "Array",
//   "Mathematics",
//   "Data Structures",
//   "Beginner",
// ]
function tags() {
  return [
    { abbr: "", name: "Algorithms" },
    { abbr: "", name: "String" },
    { abbr: "", name: "Array" },
    { abbr: "", name: "Mathematics" },
    { abbr: "", name: "Data Structures" },
    { abbr: "", name: "Beginner" },
  ]
}

export function autosuggestRenderInput({ addTag, ...props }) {
  const handleOnChange = (e, { newValue, method }) => {
    if (method === "enter") {
      e.preventDefault()
    } else {
      props.onChange(e)
    }
  }

  const inputValue = (props.value && props.value.trim().toLowerCase()) || ""
  const inputLength = inputValue.length

  let suggestions = tags().filter(state => {
    return state.name.toLowerCase().slice(0, inputLength) === inputValue
  })

  return (
    <Autosuggest
      ref={props.ref}
      suggestions={suggestions}
      shouldRenderSuggestions={value => value && value.trim().length > 0}
      getSuggestionValue={suggestion => suggestion.name}
      renderSuggestion={suggestion => <span>{suggestion.name}</span>}
      inputProps={{ ...props, onChange: handleOnChange }}
      onSuggestionSelected={(e, { suggestion }) => {
        addTag(suggestion.name)
      }}
      onSuggestionsClearRequested={() => {}}
      onSuggestionsFetchRequested={() => {}}
    />
  )
}
