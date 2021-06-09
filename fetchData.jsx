const Pagination = ({ items, pageSize, onPageChange }) => {
  const { Button } = ReactBootstrap;
  if (items.length <= 1) return null;

  let num = Math.ceil(items.length / pageSize);
  let pages = range(1, num + 1);
  const list = pages.map((page) => {
    return (
      <Button key={page} onClick={onPageChange} className="page-item">
        {page}
      </Button>
    );
  });
  return (
    <nav>
      <ul className="pagination">{list}</ul>
    </nav>
  );
};
const range = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};

function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      // Part 1, step 1 code goes here
            dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

// App that gets data from Hacker News url
function App() {
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState('MIT');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    http://api.citybik.es/v2/networks
    {
      "networks": [
        {
            "company": "JCDecaux", 
            "href": "/v2/networks/velib", 
            "location": {
              "latitude": 48.856612, 
              "city": "Paris", 
              "longitude": 2.352233, 
              "country": "FRA"
            }, 
            "name": "Vélib'", 
            "id": "velib"
        },
        {...}
      ]
    }
    http://api.citybik.es/v2/networks/network_id
    {
      "network": {
        "name": "Vélib'", 
        "stations": [
          {
              "name": "00903 - QUAI MAURIAC  / PONT DE BERCY",  
              "timestamp": "2014-04-14T12:10:17.622Z", 
              "longitude":                        
              "free_bikes": 
              "latitude":  
              "empty_slots": 19,  
              "id": "f5a551a87eec15155d6409fe9d0ff8e2"
          },
          {...}
        ], 
        "company": "JCDecaux",           
        "href": "/v2/networks/velib",       
        "location": {                    
          "latitude": 48.856612,        
          "city": "Paris",               
          "longitude": 2.352233,         
          "country": "FRA"              
        },                               
        "id": "velib"                    
      }
    }
  );
  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data.hits;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }
  return (
    <Fragment>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        // Part 1, step 2 code goes here
        <ul className="list-group">
          {page.map((item) => (
            <li key={item.objectID} className="list-group-item">
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        items={data.hits}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      ></Pagination>
    </Fragment>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById('root'));
