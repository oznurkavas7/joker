import styled from "styled-components";
import { DefaultTheme } from "styled-components";

interface SearchProps {
    theme: DefaultTheme
}

const Search = styled.input<SearchProps> `
    margin: 10px 15px 10px 0px;
    padding: 10px;
    width: 15rem;
    border-radius: 5px;
`;

export default Search;