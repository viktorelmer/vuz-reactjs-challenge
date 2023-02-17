import React from "react";

import { Avatar } from "@mui/material";
import { AbilitiesList, AbilityName, Character } from "../../exports/types";

import "./YourChampions.css";

interface IProps {
  choosedCharacter: Character[];
  setChoosedCharacters: (state: Character[]) => void;
}

const YourChampions: React.FC<IProps> = ({
  choosedCharacter,
  setChoosedCharacters,
}) => {
  const countCharactersAbility = (
    characters: Character[],
    abilityName: AbilityName
  ): String => {
    return (
      characters.reduce((abilityValue, character) => {
        const ability = character.abilities.find(
          (ability) => ability.abilityName === abilityName
        )?.abilityScore;
        return ability ? ability + abilityValue : abilityValue;
      }, 0) / choosedCharacter.length
    ).toFixed(2);
  };

  const handleRemoveCharacter = (characterId: string | number) => {
    setChoosedCharacters(choosedCharacter.filter(character => character.id !== characterId));
  };

  return (
    <div className="champions-container">
      <div className="champions-title">
        {choosedCharacter.length
          ? "Your champions!"
          : "Select your squad to defend earthrealm"}
      </div>
      <div className="champions-avatars">
        {choosedCharacter.map((character) => (
          <div className="champions-avatar" key={character.id}>
            <Avatar
              alt={character.name}
              src={character.image}
              sx={{
                width: 80,
                height: 80,
                border: "1px solid #217AFF;",
              }}
            ></Avatar>
            <span
              className="champions-remove"
              onClick={() => handleRemoveCharacter(character.id)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>
      <div className="champions-stats">
        {AbilitiesList.map((ability, index) => (
          <div key={ability} className="stat">
            {index === 2 ? <div className="stat-border"></div> : null}
            <div className="stat-data">
              <div className="stat-title">{ability}</div>
              <div className="stat-value">
                {choosedCharacter.length
                  ? countCharactersAbility(choosedCharacter, ability)
                  : "-"}
              </div>
            </div>
            {index === 2 ? <div className="stat-border"></div> : null}
          </div>
        ))}
      </div>
      <div className="champions-sub-info">* Totals as average for squad</div>
    </div>
  );
};

export default React.memo(YourChampions);
