import React, { useEffect, useState, useRef } from 'react';
// Api
import { fetchCharacter } from './api';
// Components
import Card from './components/Card';
// Types
import { Character } from './api';
// Context hook
import { useCharacterId } from './context';
// Styles
import { Wrapper } from './App.styles';

import Item from './components/Item';

const App: React.FC = () => {
  const [char, setChar] = useState<Character>({} as Character);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [characterId, setCharacterId] = useState<number>(1);
  const { characterId, setCharacterId } = useCharacterId();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await fetchCharacter(characterId);
      setIsLoading(false);
      setChar(res);
    };

    fetch();
  }, [characterId]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e.currentTarget);
    setCharacterId(Number(inputRef.current?.value));
  };

  return (
    <Wrapper characterId={characterId}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card name={char.name} imgUrl={char.img_url} gender={char.gender} />
          <Item item={char} onClick={(item) => console.log(item.origin)} />
          <input type="text" ref={inputRef} />
          <button onClick={handleButtonClick}>Get Character</button>
        </>
      )}
    </Wrapper>
  );
};

export default App;
