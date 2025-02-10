import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
  isEditing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "editing":
      return { ...state, isEditing: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city._id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function verifyToken() {
  const token = localStorage.getItem("authToken");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // console.log("CurrentCity", currentCity);

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      const headers = verifyToken();

      try {
        const res = await fetch(`${BASE_URL}/app/cities`, { headers });

        const data = await res.json();

        // console.log("Context fetchCities", data.cities);

        dispatch({ type: "cities/loaded", payload: data.cities });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      // console.log("GetCity", id);

      dispatch({ type: "loading" });

      const headers = verifyToken();

      try {
        const res = await fetch(`${BASE_URL}/app/cities/${id}`, { headers });
        if (!res.ok) {
          throw new Error("Failed to fetch city");
        }

        const data = await res.json();

        dispatch({ type: "city/loaded", payload: data.city });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error.message || "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "editing" });

    const headers = verifyToken();

    try {
      const res = await fetch(`${BASE_URL}/app/cities`, {
        method: "POST",
        headers: {
          ...headers,
        },
        body: JSON.stringify(newCity),
      });

      const data = await res.json();

      dispatch({ type: "city/created", payload: data.city });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function updateCity(id, newDate, newNotes) {
    dispatch({ type: "loading" });

    const headers = verifyToken();

    if (!id || (!newDate && !newNotes)) {
      console.error("Invalid input: id, newDate, and newNotes are required.");
      dispatch({
        type: "rejected",
        payload: "Invalid input data. Please provide all required fields.",
      });
      return;
    }

    try {
      await fetch(`${BASE_URL}/app/cities/${id}`, {
        method: "PATCH",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: newNotes, date: newDate }),
      });

      getCity(id);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });

    const headers = verifyToken();

    try {
      const deleteResponse = await fetch(`${BASE_URL}/app/cities/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete city");
      }

      // Directly update the local state
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message || "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
        updateCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    console.error("useCities called outside CitiesProvider");
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
