import React from "react";

import { CHARACTER_DATA, findCharacterByNameAndTags } from "./exports/utils";

import YourChampions from "./components/YourChampions";
import FindCharacter from "./components/FindCharacter";

import { Character, CharacterTag } from "./exports/types";

import Tags from "./components/Tags";
import { MY_TEAM_TAG_NAME, TAGS } from "./exports/constants";
import CharacterTable from "./components/CharacterTable";

import AppLogo from "./static/img/Mortal-Kombat-Logo.png";

import "./App.css";

function App() {
  const [choosedCharacters, setChoosedCharacters] = React.useState<Character[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<CharacterTag[]>([]);
  const [findCharacter, setFindCharacter] = React.useState<string>('');
  const [filteredCharacters, setFilteredCharacters] = React.useState<Character[]>(CHARACTER_DATA);

  React.useEffect(() => {
    if (!findCharacter.length && !selectedTags.length) {
      setFilteredCharacters(CHARACTER_DATA)
    } else {
      const result = findCharacterByNameAndTags(findCharacter, selectedTags)
      if (selectedTags.find((tag) => tag.tag_name === MY_TEAM_TAG_NAME)) {
        const newResult = result.filter(character => {
          if (choosedCharacters.find(choosedChar => choosedChar.name === character.name)) return true
          return false
        });
        
        setFilteredCharacters(newResult);
      } else setFilteredCharacters(result)
    }
  }, [findCharacter, selectedTags, choosedCharacters])

  const handleFindCharacter = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFindCharacter(e.currentTarget.value);
  }, [])

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <img src={AppLogo} alt="app-logo" className="logo" />
      </header>

      {/* CHOOSED CHAMPIONS LIST */}
      <YourChampions
        choosedCharacter={choosedCharacters}
        setChoosedCharacters={setChoosedCharacters}
      />

      {/* INPUT TO FIND CHARACTER */}
      <FindCharacter
        placeholder="Search Characters..."
        onChange={handleFindCharacter}
      />

      {/* TAGS LIST */}
      <Tags
        tags={TAGS}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      {/* TABLE */}
      <CharacterTable
        characters={filteredCharacters}
        choosedCharacters={choosedCharacters}
        setChoosedCharacters={setChoosedCharacters}
      />
    </div>
  );
}

export default App;
