import { Select as SelectRetro } from '@/components/retroui/Select'

export const Select = (props: typeof SelectRetro) => {
  return (
    <SelectRetro>
      <SelectRetro.Trigger>
        <SelectRetro.Value placeholder="Pick your Pokemon" />
      </SelectRetro.Trigger>

      <SelectRetro.Content>
        <SelectRetro.Group>
          <SelectRetro.Item value="pikachu">Pikachu</SelectRetro.Item>
          <SelectRetro.Item value="charizard">Charizard</SelectRetro.Item>
          <SelectRetro.Item value="bulbasaur">Bulbasaur</SelectRetro.Item>
          <SelectRetro.Item value="squirtle">Squirtle</SelectRetro.Item>
        </SelectRetro.Group>
      </SelectRetro.Content>
    </SelectRetro>
  )
}