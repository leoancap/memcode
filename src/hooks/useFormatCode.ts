import React from "react";
import { formatTS } from "src/utils/format";

export function useFormatCode({ code, setCode, language }) {
  const handleFormat = React.useCallback(async () => {
    if (language === "Typescript") {
      const formattedCode = await formatTS(code);
      setCode(formattedCode);
    }
  }, [code, language]);

  return handleFormat;
}
