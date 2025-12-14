import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";


import "./code-theme.css";
import { useEffect } from "react";

interface Props {
  code: string;
  lang: string;
}


export const CodeView = ({ code, lang }: Props) => {
    useEffect(()=>{
        Prism.highlightAll();
    }, [code])
    return (
        <pre className="p-2 bg-transparent border-none rounded-none m-0 text-sm">
            <code className={`language-${lang}`}>
                {code}
            </code>
        </pre>
    )
}