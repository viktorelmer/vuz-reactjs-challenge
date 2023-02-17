import React from "react";
import { MAX_CHARACTER_TO_SELECT } from "../../exports/constants";
import { AbilityName, Character, CharacterAbility, CharacterAbilityObject, ITable } from "../../exports/types";
import { getCharacterById } from "../../exports/utils";
import Table from "../Table";

interface IProps {
  characters: Character[];
  choosedCharacters: Character[];
  setChoosedCharacters: (character: Character[]) => void;
}

// get keys from AbilityName type to add into table config as field
type KeysOfAbility = {
  [key in AbilityName]: null
}

const tableConfig: ITable<Character & KeysOfAbility & CharacterAbility>[] = [
  { field: "name", headerName: "Character", imageKey: "image", width: '200px' },
  { field: "tags", headerName: "Tags", type: "tags" },
  { field: "Power", headerName: "Power", key: "abilityScore" },
  { field: "Mobility", headerName: "Mobility", key: "abilityScore" },
  { field: "Technique", headerName: "Technique", key: "abilityScore" },
  { field: "Survivability", headerName: "Survivability", key: "abilityScore" },
  { field: "Energy", headerName: "Energy", key: "abilityScore" },
];

const CharacterTable:React.FC<IProps> = ({ characters, choosedCharacters, setChoosedCharacters }) => {
  const handleSelectCharacter = (colId: string | number) => {
    const alreadyAddedCharacter = choosedCharacters.find(
      (character) => character.id === colId
    );

    if (alreadyAddedCharacter) {
      setChoosedCharacters(
        choosedCharacters.filter((character) => character.id !== colId)
      );
      return;
    }

    if (choosedCharacters.length < MAX_CHARACTER_TO_SELECT) {

      const user = getCharacterById(colId);
      if (user) setChoosedCharacters([...choosedCharacters, user]);
    }
  }

  return (
    <Table
      table_config={tableConfig}
      table_data={characters.map(character => {
        let tagData: CharacterAbilityObject = {}
        // format abilities to object with key as name to dispaly in table
        if (character.abilities) {
          for (const data of character.abilities) {
            tagData[data.abilityName] = data;
          }
        }
        return {...character, ...tagData}
      })}
      selected_data={choosedCharacters}
      onChange={handleSelectCharacter}
      checkable
    />
  );
}

export default React.memo(CharacterTable);