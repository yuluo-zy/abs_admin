import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as ReactDOM from "react-dom";
import {
  LexicalTypeaheadMenuPlugin,
  QueryMatch,
  TypeaheadOption,
  useBasicTypeaheadTriggerMatch
} from "./LexicalTypeaheadMenuPlugin";
import { $createMentionNode } from "@/rice_text/components/MentionNode";
import "./styles/MentionsPlugin.less";
import { getRelatable } from "@/api/demand";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";

const PUNCTUATION =
  "\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%'\"~=<>_:;";

interface UserInfo {
  id: number,
  username: string,
  email: string
}

const NAME = "\\b[A-Z][\u4E00-\u9FA5]{2,4}[^\\s" + PUNCTUATION + "]";
const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION
};

const CapitalizedNameMentionsRegex = new RegExp(
  "(^|[^#])((?:" + DocumentMentionsRegex.NAME + "{" + 1 + ",})$)"
);

const PUNC = DocumentMentionsRegex.PUNCTUATION;

const TRIGGERS = ["@"].join("");

// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = "[^" + TRIGGERS + PUNC + "\\s]";

// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS =
  "(?:" +
  "\\.[ |$]|" + // E.g. "r. " in "Mr. Smith"
  " |" + // E.g. " " in "Josh Duck"
  "[" +
  PUNC +
  "]|" + // E.g. "-' in "Salier-Hellendag"
  ")";

const LENGTH_LIMIT = 75;

const AtSignMentionsRegex = new RegExp(
  "(^|\\s|\\()(" +
  "[" +
  TRIGGERS +
  "]" +
  "((?:" +
  VALID_CHARS +
  VALID_JOINS +
  "){0," +
  LENGTH_LIMIT +
  "})" +
  ")$"
);

// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;

// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp(
  "(^|\\s|\\()(" +
  "[" +
  TRIGGERS +
  "]" +
  "((?:" +
  VALID_CHARS +
  "){0," +
  ALIAS_LENGTH_LIMIT +
  "})" +
  ")$"
);

function useMentionLookupService() {
  const [results, setResults] = useState<Array<UserInfo>>([]);
  const [demandId] = ProductStore(state => [state.demandId], shallow);
  // 进行 人员查询
  useEffect(() => {
    if (demandId) {
      getRelatable({
        demandId
      }).then(res => {
        if (res.data.success) {
          setResults(res.data.result);
        }
      });
    }
  }, [demandId]);
  return results;
}

function checkForCapitalizedNameMentions(
  text: string,
  minMatchLength: number
): QueryMatch | null {
  const match = CapitalizedNameMentionsRegex.exec(text);
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[2];
    if (matchingString != null && matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: matchingString
      };
    }
  }
  return null;
}

function checkForAtSignMentions(
  text: string,
  minMatchLength: number
): QueryMatch | null {
  let match = AtSignMentionsRegex.exec(text);

  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text);
  }
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[3];
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2]
      };
    }
  }
  return null;
}

function getPossibleQueryMatch(text: string): QueryMatch | null {
  const match = checkForAtSignMentions(text, 1);
  return match === null ? checkForCapitalizedNameMentions(text, 3) : match;
}

class MentionTypeaheadOption extends TypeaheadOption {
  name: UserInfo;
  picture: JSX.Element;

  constructor(name: UserInfo, picture: JSX.Element) {
    super(name.id);
    this.name = name;
    this.picture = picture;
  }
}

function MentionsTypeaheadMenuItem({
                                     index,
                                     onClick,
                                     onMouseEnter,
                                     option
                                   }: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: MentionTypeaheadOption;
}) {
  return (
    <li
      aria-selected={false}
      key={option.key}
      tabIndex={-1}
      className={"select-option"}
      ref={option.setRefElement}
      role="option"
      id={"typeahead-item-" + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}>
      {option.name}
    </li>
  );
}

export default function NewMentionsPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  const results = useMentionLookupService();

  const checkForMatch = useBasicTypeaheadTriggerMatch("@", {
    minLength: 0
  });

  const options = useMemo(
    () =>
      results
        .map(
          (result) =>
            new MentionTypeaheadOption(result, <i className="icon user" />)
        ),
    [results]
  );

  const onSelectOption = useCallback(
    (
      selectedOption: MentionTypeaheadOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void
    ) => {
      // 这个是 创建成功了, 然后直接插入了
      editor.update(() => {
        const mentionNode = $createMentionNode({
          mentionName: selectedOption.name.username,
          userId: "" + selectedOption.name.id
        });
        if (nodeToReplace) {
          nodeToReplace.replace(mentionNode);
        }
        mentionNode.select();
        closeMenu();
      });
    },
    [editor]
  );

  const checkForMentionMatch = useCallback(
    (text: string) => {
      const mentionMatch = getPossibleQueryMatch(text);
      return mentionMatch ? mentionMatch : null;
    },
    []
  );

  return (
    <LexicalTypeaheadMenuPlugin<MentionTypeaheadOption>
      onSelectOption={onSelectOption}
      triggerFn={checkForMentionMatch}
      options={options}
      menuRenderFn={(
        anchorElement,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) =>
        anchorElement && results.length
          ? ReactDOM.createPortal(
            <div className={"arco-select-popup"} style={{
              position: "absolute",
              display: "initial",
              pointerEvents: "auto",
              transformOrigin: "100% 100%",
              overflowY: "auto",
              overflowAnchor: "none"
            }}>
              <div className={"arco-select-popup-inner"} style={{
                display: "flex",
                flexDirection: "column"
              }}>
                {options.map((option, i: number) => (
                  <MentionsTypeaheadMenuItem
                    index={i}
                    isSelected={selectedIndex === i}
                    onClick={() => {
                      setHighlightedIndex(i);
                      selectOptionAndCleanUp(option);
                    }}
                    onMouseEnter={() => {
                      setHighlightedIndex(i);
                    }}
                    key={option.key}
                    option={option}
                  />
                ))}
              </div>
            </div>
            ,
            anchorElement
          )
          : null
      }
    />
  );
}

