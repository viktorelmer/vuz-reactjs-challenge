import React from "react";
import { CharacterTag, CharacterTagObject } from "../../exports/types";


import './Tags.css'

interface IProps {
  tags: CharacterTagObject;
  selectedTags: CharacterTag[];
  setSelectedTags: (state: CharacterTag[]) => void;
}

const Tags: React.FC<IProps> = ({ tags, selectedTags, setSelectedTags }) => {

  const handleSelectTag = (tagName: string, tagKey: string) => {
    const alreadySelctedTag = selectedTags.find(tag => tag.tag_name === tagName)

    if (alreadySelctedTag) {
      setSelectedTags(selectedTags.filter((tag) => tag.tag_name !== tagName));
      return;
    }

    if (!alreadySelctedTag) {
      setSelectedTags([...selectedTags, tags[tagKey]]);
    }
  }

  const handleClearAllTags = () => setSelectedTags([])

  return (
    <div className="tags-container">
      {Object.keys(tags).map((tag) => (
        <div
          className={`tag ${
            selectedTags.find(
              (selectedTag) => selectedTag.tag_name === tags[tag].tag_name
            ) && "selected-tag"
          }`}
          key={tags[tag].tag_name}
          onClick={() => {
            handleSelectTag(tags[tag].tag_name, tag);
          }}
        >
          <span>{tags[tag].tag_name}</span>
        </div>
      ))}
      <div className="tag-clear-all" onClick={handleClearAllTags}>
        <span>Clear all</span>
      </div>
    </div>
  );
}

export default React.memo(Tags);