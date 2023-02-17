import { CharacterTagObject } from "./types";
import { getTags } from "./utils";

export const MY_TEAM_TAG_NAME = "my team"

export const DEFAULT_TAGS: CharacterTagObject = {
  my_team: {
    slot: NaN,
    tag_name: 'my team'
  }
}

export const TAGS = {...getTags(), ...DEFAULT_TAGS}

export const MAX_CHARACTER_TO_SELECT = 6

export const HIGHLIGHT_VALUE_EQUAL = 10