import { useState } from 'react';
import './App.css';
import { Wrapper, Row, Header, Form, Search, Button } from "./components/styled/index"
import axios from 'axios';
import { JokeItem } from './components/JokeItem';
import { Joke } from "./common/type";

const BASE_URL = "https://v2.jokeapi.dev/joke/Any";

function App() {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(false)
  const [jokes, setJokes] = useState<Joke[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const getJokes = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const ENDPOINT = `${BASE_URL}?contains=${search}&amount=10`;
      const {data} = await axios.get(ENDPOINT);

      if(data.error) {
        setError(true);
        setJokes([]);
      }
      else {
        setError(false);
        setJokes(data.jokes);
      }

      setSearch("");
  }

  return (
    <div>
      <Wrapper>
        <Row>
          <Header>
            Joker
          </Header>
        </Row>
        <Form onSubmit={getJokes}>
          <Search type="text" placeholder='Search...' value={search} onChange={handleChange}></Search>
          <Button type="submit">Submit</Button>
        </Form>
        <div>
          {error && <p>Sorry, no jokes found</p>}
          {jokes?.length > 0 && jokes?.map(joke => <JokeItem key= {joke.id} joke={joke} />)}
        </div>
      </Wrapper>
    </div>
  );
}

export default App;
