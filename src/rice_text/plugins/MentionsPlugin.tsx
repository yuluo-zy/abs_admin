import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as ReactDOM from "react-dom";
import {
  LexicalTypeaheadMenuPlugin,
  TypeaheadOption,
  useBasicTypeaheadTriggerMatch
} from "./LexicalTypeaheadMenuPlugin";
import { $createMentionNode } from "@/rice_text/components/MentionNode";
import "./styles/MentionsPlugin.less";
import { getRelatable } from "@/api/demand";
import { ProductStore } from "@/store/product";
import shallow from "zustand/shallow";
import { IconUser } from "@arco-design/web-react/icon";

interface UserInfo {
  id: number,
  username: string,
  email: string
}

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
      {option.picture}
      {option.name.username}
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
            new MentionTypeaheadOption(result, <IconUser />)
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
      const mentionMatch = checkForMatch(text);
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

