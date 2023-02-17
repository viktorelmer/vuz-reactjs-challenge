export type AbilityName = 'Mobility' | 'Technique' | 'Survivability' | 'Power' | 'Energy'


export const AbilitiesList: AbilityName[] = [
  "Power",
  "Mobility",
  "Technique",
  "Survivability",
  "Energy"
]

export interface CharacterAbility {
  abilityName: AbilityName
  abilityScore: number
}

export interface CharacterTag {
  slot: number
  tag_name: string
}

export interface CharacterTagObject {
  [key: string]: CharacterTag
}

export interface CharacterAbilityObject {
  [key: string]: CharacterAbility
}

export interface Character {
  id: number
  name: string
  quote: string
  image: string
  thumbnail: string
  universe: string
  abilities: CharacterAbility[]
  tags: CharacterTag[]
}

export type RowTypes = "tags" | undefined

export interface ITable<Data> {
  field: keyof Data, // field shoud be key from passed data
  headerName: string;
  type?: RowTypes
  key?: keyof Data // possible key that shoud be used by table to access value
  imageKey?: keyof Data // possible key that shoud be used by table to show photo
  width?: string
}