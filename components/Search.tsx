const Search = ({ onChange }: { onChange: (val: string) => void }) => {
  return (
    <div className="input-text relative d-flex max-w-min">
      <div className="flex-grow-1">
        <input
          className="text-secondary rounded p-2 text-xl border-2 border-secondary"
          type="text"
          placeholder="Search Tickets"
          onChange={(v) => {
            return onChange(v.target.value);
          }}
        />
      </div>
      <div className="flex-shrink-1 my-auto mx-4">
        <svg
          className="absolute right-2 top-2"
          xmlns="http://www.w3.org/2000/svg"
          width="30.223"
          height="30.185"
          viewBox="0 0 46.223 46.185"
        >
          <g id="search-svgrepo-com" transform="translate(678 305.8)">
            <g
              id="Group_4"
              data-name="Group 4"
              transform="translate(-678 -305.8)"
            >
              <path
                id="Path_16"
                data-name="Path 16"
                d="M45.64,43.093,32.378,29.822A17.915,17.915,0,0,0,36.565,18.3,18.284,18.284,0,0,0,0,18.312,18.3,18.3,0,0,0,29.622,32.493L42.931,45.8a1.916,1.916,0,1,0,2.709-2.709ZM3.884,18.312a14.39,14.39,0,0,1,28.779,0,14.39,14.39,0,0,1-28.779,0Z"
                transform="translate(0 -0.2)"
                fill="#512888"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Search;
