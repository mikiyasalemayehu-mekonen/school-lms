import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'
import parse from "html-react-parser";

type JSONContent = {
  type?: string;
  attrs?: Record<string, any>;
  content?: JSONContent[];
  marks?: Array<{
    type: string;
    attrs?: Record<string, any>;
  }>;
  text?: string;
};


export function RenderDescription({json}:{json:JSONContent}){
    const outPut = generateHTML(json,[StarterKit,
        TextAlign.configure({types: ['heading', 'paragraph']}),
    ]);

    return (
        <div className="prose dark:prose-invert prose-li:marker:text-primary">
            {parse(outPut)}
        </div>
    )
}
