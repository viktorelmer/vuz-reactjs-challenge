import jsonData from '../static/data/characters.json'
import { Character, CharacterTag, CharacterTagObject } from './types'

export const CHARACTER_DATA: Character[] = jsonData as Character[]

export const getCharacterById = (characterId: string | number) => CHARACTER_DATA.find(character => character.id === characterId)

export const getTags = (): CharacterTagObject => {
  const result: CharacterTagObject = {}
  for (const characters of CHARACTER_DATA) {
    if (characters.tags) {
      for (const tag of characters.tags) {
        if (!result[tag.tag_name]) result[tag.tag_name] = tag
      }
    }
  }
  return result
}

export const findCharacterByNameAndTags = (name: string, tags: CharacterTag[]) => {
  const characterByTags = CHARACTER_DATA.filter(character => {
    if (tags && character.tags) {
      let result = true
      for (const selectedTag of tags) {
        if (selectedTag.tag_name !== "my team" && !character.tags.find(charTag => charTag.tag_name === selectedTag.tag_name)) {
          result = false
          break;
        }
      }
      return result
    } else return false
  })
  
  if (name && name.length) {
    return characterByTags.filter(character => character.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  }

  return characterByTags
}