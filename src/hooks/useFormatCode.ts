import React from "react";
import { formatTS } from "src/utils/format";

export function useFormatCode({ code, setCode, language }) {
  const handleFormat = React.useCallback(async () => {
    console.log({ language });
    if (language === "Typescript") {
      const formattedCode = await formatTS(code);
      console.log({ code });
      console.log({ formattedCode });
      setCode(formattedCode);
    }
  }, [code, language]);

  return handleFormat;
}
